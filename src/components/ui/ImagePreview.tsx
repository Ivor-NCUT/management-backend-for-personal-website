/**
 * [INPUT]: 依赖 uploadImage 与 Button
 * [OUTPUT]: 对外提供 ImageUploader 组件
 * [POS]: ui/ 的图片上传与预览组件
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useRef, useState } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { uploadImage } from "@/lib/storage";
import Button from "./Button";

interface ImageUploaderProps {
  label?: string;
  value?: string;
  onChange: (url: string) => void;
  aspectRatio?: number;
  className?: string;
}

export default function ImageUploader({
  label,
  value,
  onChange,
  aspectRatio = 16 / 9,
  className,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (file: File) => {
    setUploading(true);
    setError("");
    try {
      const result = await uploadImage(file);
      onChange(result.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "图片上传失败");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className={className}>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div
        className={cn(
          "relative overflow-hidden rounded-xl border border-dashed border-gray-200 bg-gray-50",
          "flex items-center justify-center",
        )}
        style={{ aspectRatio }}
      >
        {value ? (
          <img src={value} alt={label || "图片预览"} className="h-full w-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <ImagePlus className="h-6 w-6" />
            <span className="text-xs">上传图片</span>
          </div>
        )}
        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70">
            <Loader2 className="h-5 w-5 animate-spin text-gray-600" />
          </div>
        )}
      </div>
      <div className="mt-2 flex items-center gap-2">
        <Button
          type="button"
          variant="secondary"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
        >
          选择图片
        </Button>
        {value && (
          <Button type="button" variant="ghost" onClick={() => onChange("")}>
            <X className="h-4 w-4" />
            清除
          </Button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void handleFile(file);
        }}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
