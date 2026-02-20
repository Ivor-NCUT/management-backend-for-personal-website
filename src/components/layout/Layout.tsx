/**
 * [INPUT]: 依赖 react-router-dom 的 Outlet, layout/Sidebar
 * [OUTPUT]: 对外提供 Layout 组件
 * [POS]: layout/ 的页面骨架，侧边栏 + 内容区
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <Sidebar />
      <main className="md:ml-60 min-h-screen">
        <div className="max-w-[960px] mx-auto px-5 md:px-8 py-6 md:py-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
