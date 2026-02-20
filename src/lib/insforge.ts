/**
 * [INPUT]: 依赖 @insforge/sdk
 * [OUTPUT]: 对外提供 insforge storage 实例
 * [POS]: lib/ 的 Insforge 客户端初始化
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { createClient } from "@insforge/sdk";

const INSFORGE_URL = "https://5xp74d7b.ap-southeast.insforge.app";

export const insforge = createClient({
  baseUrl: INSFORGE_URL,
  anonKey: "ik_e6cea9e838f5cb6955859de34f053fb5",
});

export const STORAGE_BUCKET = "portfolio-images";
