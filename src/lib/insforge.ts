/**
 * [INPUT]: 依赖 @insforge/sdk 与 Vite 环境变量
 * [OUTPUT]: 对外提供 insforge 客户端和 STORAGE_BUCKET
 * [POS]: lib/ 的云存储客户端配置
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { createClient } from "@insforge/sdk";

export const STORAGE_BUCKET =
  import.meta.env.VITE_INSFORGE_STORAGE_BUCKET || "portfolio";

const apiUrl = import.meta.env.VITE_INSFORGE_API_URL || "";
const anonKey = import.meta.env.VITE_INSFORGE_ANON_KEY || "";

export const insforge = createClient({ baseUrl: apiUrl, anonKey });
