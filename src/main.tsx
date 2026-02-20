/**
 * [INPUT]: 依赖 react-dom, @/App
 * [OUTPUT]: 挂载 React 应用到 DOM
 * [POS]: 应用入口
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
