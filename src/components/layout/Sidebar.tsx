/**
 * [INPUT]: 依赖 react-router-dom 的 NavLink/useLocation, lucide-react 的图标, @/stores
 * [OUTPUT]: 对外提供 Sidebar 组件
 * [POS]: layout/ 的侧边导航栏
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { NavLink } from "react-router-dom";
import {
  User,
  Zap,
  Share2,
  Sparkles,
  FolderOpen,
  Filter,
  Briefcase,
  Users,
  Download,
  Upload,
  RotateCcw,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { usePortfolioStore } from "@/stores/usePortfolioStore";

const NAV_ITEMS = [
  { to: "/hero", label: "首页信息", icon: User },
  { to: "/status", label: "状态卡片", icon: Zap },
  { to: "/social", label: "社交媒体", icon: Share2 },
  { to: "/ai-products", label: "AI 产品", icon: Sparkles },
  { to: "/works", label: "作品管理", icon: FolderOpen },
  { to: "/filters", label: "筛选器", icon: Filter },
  { to: "/experience", label: "工作经历", icon: Briefcase },
  { to: "/network", label: "合作伙伴", icon: Users },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const { exportData, resetToDefaults } = usePortfolioStore();

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio-data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target?.result as string);
          usePortfolioStore.getState().importData(data);
        } catch {
          alert("JSON 格式错误");
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleReset = () => {
    if (confirm("确定恢复默认数据？所有修改将丢失。")) {
      resetToDefaults();
    }
  };

  const navContent = (
    <>
      {/* ── Logo ── */}
      <div className="px-5 py-6 border-b border-gray-100">
        <h1 className="text-base font-semibold text-gray-900">管理后台</h1>
        <p className="text-xs text-gray-400 mt-0.5">泛函的个人网站</p>
      </div>

      {/* ── Nav ── */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-50"
              }`
            }
          >
            <Icon className="w-4 h-4" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* ── Actions ── */}
      <div className="px-3 py-4 border-t border-gray-100 space-y-1">
        <button
          onClick={handleExport}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <Download className="w-4 h-4" /> 导出 JSON
        </button>
        <button
          onClick={handleImport}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <Upload className="w-4 h-4" /> 导入 JSON
        </button>
        <button
          onClick={handleReset}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-colors"
        >
          <RotateCcw className="w-4 h-4" /> 恢复默认
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* ── 移动端 hamburger ── */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden w-10 h-10 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center"
      >
        <Menu className="w-5 h-5 text-gray-600" />
      </button>

      {/* ── 移动端 overlay ── */}
      {open && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`fixed top-0 left-0 h-full w-60 bg-white border-r border-gray-100 flex flex-col z-50 transition-transform md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* 移动端关闭按钮 */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-3 md:hidden"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>
        {navContent}
      </aside>
    </>
  );
}
