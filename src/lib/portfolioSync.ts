/**
 * [INPUT]: 依赖浏览器 localStorage/postMessage，依赖 web/public/admin-sync.html 作为跨 origin 落盘桥
 * [OUTPUT]: 对外提供 broadcastPortfolioSync 常量与同步函数
 * [POS]: lib/ 的作品集同步桥，负责把 admin 的最新数据广播到主站 origin
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
const STORAGE_KEY = "portfolio-data";
const SIGNAL_KEY = "portfolio-data:updatedAt";
const SYNC_MESSAGE_TYPE = "portfolio:sync";
const SYNC_BRIDGE_PATH = "/admin-sync.html";
const LOCAL_WEB_ORIGINS = ["http://localhost:5173", "http://127.0.0.1:5173"];
const SYNC_TARGET_ORIGINS = (
  import.meta.env.VITE_PORTFOLIO_SYNC_TARGET_ORIGINS ?? ""
)
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

type SyncMessage = {
  type: typeof SYNC_MESSAGE_TYPE;
  storageKey: typeof STORAGE_KEY;
  signalKey: typeof SIGNAL_KEY;
  payload: string;
  updatedAt: string;
};

const frameLoadMap = new Map<string, Promise<HTMLIFrameElement>>();

function isBrowserReady() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

function getSyncTargetOrigins() {
  if (!isBrowserReady()) return [];

  const origins = [...SYNC_TARGET_ORIGINS, ...LOCAL_WEB_ORIGINS];
  const uniqueOrigins = Array.from(new Set(origins));
  return uniqueOrigins.filter((origin) => origin !== window.location.origin);
}

function getBridgeUrl(targetOrigin: string) {
  const params = new URLSearchParams({
    allowedOrigin: window.location.origin,
  });
  return `${targetOrigin}${SYNC_BRIDGE_PATH}?${params.toString()}`;
}

function createBridgeFrame(targetOrigin: string): Promise<HTMLIFrameElement> {
  const existing = frameLoadMap.get(targetOrigin);
  if (existing) return existing;

  const promise = new Promise<HTMLIFrameElement>((resolve, reject) => {
    const iframe = document.createElement("iframe");
    iframe.hidden = true;
    iframe.setAttribute("aria-hidden", "true");
    iframe.dataset.portfolioSyncOrigin = targetOrigin;
    iframe.src = getBridgeUrl(targetOrigin);

    iframe.addEventListener("load", () => resolve(iframe), { once: true });
    iframe.addEventListener(
      "error",
      () => {
        frameLoadMap.delete(targetOrigin);
        reject(new Error(`sync bridge failed: ${targetOrigin}`));
      },
      { once: true },
    );

    document.body.appendChild(iframe);
  });

  frameLoadMap.set(targetOrigin, promise);
  return promise;
}

async function postToBridge(targetOrigin: string, message: SyncMessage) {
  const iframe = await createBridgeFrame(targetOrigin);
  iframe.contentWindow?.postMessage(message, targetOrigin);
}

export function broadcastPortfolioSync() {
  if (!isBrowserReady()) return;

  const payload = window.localStorage.getItem(STORAGE_KEY);
  if (!payload) return;

  const updatedAt = String(Date.now());
  window.localStorage.setItem(SIGNAL_KEY, updatedAt);

  const message: SyncMessage = {
    type: SYNC_MESSAGE_TYPE,
    storageKey: STORAGE_KEY,
    signalKey: SIGNAL_KEY,
    payload,
    updatedAt,
  };

  for (const targetOrigin of getSyncTargetOrigins()) {
    void postToBridge(targetOrigin, message).catch(() => {
      // 静默降级：目标 origin 不在线时，本 origin 内的同步仍然有效。
    });
  }
}
