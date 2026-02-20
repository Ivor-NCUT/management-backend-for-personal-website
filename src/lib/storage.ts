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

export async function uploadImage(file: File): Promise<UploadResult> {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const ext = file.name.split(".").pop() || "jpg";
  const key = `images/${timestamp}-${random}.${ext}`;

  const { data, error } = await insforge.storage
    .from(STORAGE_BUCKET)
    .upload(key, file);

  if (error || !data) {
    throw new Error(error?.message || "上传失败");
  }

  return {
    url: data.url,
    key: data.key,
  };
}

export async function deleteImage(key: string): Promise<void> {
  const { error } = await insforge.storage.from(STORAGE_BUCKET).remove(key);

  if (error) {
    console.error("删除图片失败:", error);
  }
}
