/**
 * [INPUT]: 依赖 react-router-dom 与 Sidebar
 * [OUTPUT]: 对外提供 Layout 组件
 * [POS]: layout/ 的后台页面骨架
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar />
        <main className="min-w-0 flex-1 px-6 py-8">
          <div className="mx-auto max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
