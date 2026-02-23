/**
 * [INPUT]: 依赖 react-image-crop, lucide-react, @/lib/storage
 * [OUTPUT]: 对外提供 ImageUploader 组件
 * [POS]: ui/ 的图片上传组件，支持本地上传、剪贴板粘贴、裁剪、Insforge云存储
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useRef, useState, useCallback } from "react";
import ReactCrop, { type Crop, type PixelCrop, centerCrop, makeAspectCrop } from "react-image-crop";
import { Upload, X, Clipboard, Crop as CropIcon, RotateCcw, Loader2 } from "lucide-react";
import { uploadImage } from "@/lib/storage";
import "react-image-crop/dist/ReactCrop.css";

interface ImageUploaderProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  className?: string;
  aspectRatio?: number;
}

const MAX_SIZE = 2 * 1024 * 1024;

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}

async function getCroppedImg(
  image: HTMLImageElement,
  crop: PixelCrop,
): Promise<string> {
  const canvas = document.createElement("canvas");
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  canvas.width = crop.width * scaleX;
  canvas.height = crop.height * scaleY;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("No 2d context");
  }

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    canvas.width,
    canvas.height,
  );

  return canvas.toDataURL("image/jpeg", 0.9);
}

export default function ImageUploader({
  label,
  value,
  onChange,
  className,
  aspectRatio,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingImage, setPendingImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [uploading, setUploading] = useState(false);

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("请上传图片文件");
      return;
    }
    if (file.size > MAX_SIZE) {
      setError("图片大小不能超过 2MB");
      return;
    }
    setError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPendingImage(result);
      setCrop(undefined);
    };
    reader.readAsDataURL(file);
  }, []);

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (const item of items) {
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (file) {
            processFile(file);
            return;
          }
        }
      }
    },
    [processFile],
  );

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      processFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleCropComplete = async () => {
    if (!imgRef.current || !completedCrop) return;

    try {
      setUploading(true);
      const croppedUrl = await getCroppedImg(imgRef.current, completedCrop);
      
      const res = await fetch(croppedUrl);
      const blob = await res.blob();
      const fileName = `cropped-${Date.now()}.jpg`;
      const file = new File([blob], fileName, { type: "image/jpeg" });

      const result = await uploadImage(file);
      onChange(result.url);
      setPendingImage(null);
      setCrop(undefined);
      setCompletedCrop(undefined);
    } catch (err) {
      setError("上传失败，请重试");
    } finally {
      setUploading(false);
    }
  };

  const handleCancelCrop = () => {
    setPendingImage(null);
    setCrop(undefined);
    setCompletedCrop(undefined);
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const aspect = aspectRatio || 16 / 9;
    setCrop(centerAspectCrop(width, height, aspect));
  };

  return (
    <div 
      className={`${className} outline-none focus:ring-2 focus:ring-blue-500/50 rounded-xl transition-shadow`}
      onPaste={handlePaste}
      tabIndex={0}
    >
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}

      <div
        className={`
          relative border-2 border-dashed rounded-xl transition-all cursor-pointer
          ${
            isDragging
              ? "border-blue-400 bg-blue-50"
              : value
                ? "border-gray-200"
                : "border-gray-200 hover:border-gray-300"
          }
        `}
        onClick={() => !value && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
        />

        {value ? (
          <div className="relative p-2 group">
            <img
              src={value}
              alt="preview"
              className="w-full h-32 rounded-lg object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setPendingImage(value);
                  setCrop(undefined);
                }}
                className="p-2 rounded-lg bg-white/90 hover:bg-white text-gray-700 transition-colors"
                title="裁剪当前图片"
              >
                <CropIcon className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  inputRef.current?.click();
                }}
                className="p-2 rounded-lg bg-white/90 hover:bg-white text-gray-700 transition-colors"
                title="替换图片"
              >
                <Upload className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="p-2 rounded-lg bg-white/90 hover:bg-white text-gray-700 transition-colors"
                title="删除图片"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center">
            <div className="flex justify-center gap-4 mb-3">
              <div className="p-3 rounded-xl bg-gray-50">
                <Upload className="w-5 h-5 text-gray-400" />
              </div>
              <div className="p-3 rounded-xl bg-gray-50">
                <Clipboard className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">
              点击选择文件 或 粘贴图片
            </p>
            <p className="text-xs text-gray-400">支持 PNG、JPG、GIF、WebP，最大 2MB</p>
          </div>
        )}
      </div>

      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}

      {pendingImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="sticky top-0 flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-white rounded-t-2xl">
              <h2 className="text-base font-semibold text-gray-900">裁剪图片</h2>
              <button
                onClick={handleCancelCrop}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            <div className="p-5">
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={aspectRatio}
              >
                <img
                  ref={imgRef}
                  src={pendingImage}
                  alt="crop"
                  className="max-h-[60vh] rounded-lg"
                  onLoad={onImageLoad}
                />
              </ReactCrop>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors flex items-center gap-2 mr-auto"
                  title="选择本地文件"
                >
                  <Upload className="w-4 h-4" />
                  更换图片
                </button>
                <button
                  type="button"
                  onClick={handleCancelCrop}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  取消
                </button>
                <button
                  type="button"
                  onClick={handleCropComplete}
                  disabled={!completedCrop || uploading}
                  className="px-4 py-2 rounded-xl text-sm font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {uploading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {uploading ? "上传中..." : "确认裁剪"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
