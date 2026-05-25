/**
 * [INPUT]: 依赖 @/lib/insforge
 * [OUTPUT]: 对外提供 uploadImage, deleteImage 函数
 * [POS]: lib/ 的图片存储服务
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { insforge, STORAGE_BUCKET } from "./insforge";

export interface UploadResult {
  url: string;
  key: string;
}

const INLINE_IMAGE_KEY_PREFIX = "inline:";
const STORAGE_BYPASS_UNTIL_KEY = "portfolio-storage:bypass-until";
const STORAGE_BYPASS_DURATION_MS = 10 * 60 * 1000;

function isLocalPreview(): boolean {
  if (typeof window === "undefined") return false;
  return window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost";
}

function getStorageBypassUntil(): number {
  if (typeof window === "undefined") return 0;
  const raw = window.localStorage.getItem(STORAGE_BYPASS_UNTIL_KEY);
  const value = Number(raw);
  return Number.isFinite(value) ? value : 0;
}

function shouldBypassCloudUpload(): boolean {
  return getStorageBypassUntil() > Date.now();
}

function markCloudUploadUnavailable() {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    STORAGE_BYPASS_UNTIL_KEY,
    String(Date.now() + STORAGE_BYPASS_DURATION_MS),
  );
}

function clearCloudUploadBypass() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_BYPASS_UNTIL_KEY);
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("图片读取失败"));
    reader.readAsDataURL(file);
  });
}

async function uploadInlineImage(
  file: File,
  timestamp: number,
  random: string,
  ext: string,
): Promise<UploadResult> {
  return {
    url: await fileToDataUrl(file),
    key: `${INLINE_IMAGE_KEY_PREFIX}${timestamp}-${random}.${ext}`,
  };
}

export async function uploadImage(file: File): Promise<UploadResult> {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const ext = file.name.split(".").pop() || "jpg";
  const key = `images/${timestamp}-${random}.${ext}`;

  if (isLocalPreview() || shouldBypassCloudUpload()) {
    return uploadInlineImage(file, timestamp, random, ext);
  }

  try {
    const { data, error } = await insforge.storage
      .from(STORAGE_BUCKET)
      .upload(key, file);

    if (error || !data) {
      throw new Error(error?.message || "上传失败");
    }

    const publicUrl = insforge.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(data.key || key);

    clearCloudUploadBypass();

    return {
      url: publicUrl,
      key: data.key || key,
    };
  } catch {
    // 云存储异常时进入短时熔断，避免同一会话反复打到失败链路刷屏。
    markCloudUploadUnavailable();
    return uploadInlineImage(file, timestamp, random, ext);
  }
}

export async function deleteImage(key: string): Promise<void> {
  if (key.startsWith(INLINE_IMAGE_KEY_PREFIX)) return;

  const { error } = await insforge.storage.from(STORAGE_BUCKET).remove(key);

  if (error) {
    console.error("删除图片失败:", error);
  }
}
