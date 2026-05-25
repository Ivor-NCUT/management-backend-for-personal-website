/**
 * [INPUT]: 依赖 react-router-dom 与 lucide-react
 * [OUTPUT]: 对外提供 Sidebar 组件
 * [POS]: layout/ 的后台导航栏
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { NavLink } from "react-router-dom";
import {
  Briefcase,
  Filter,
  Home,
  Link,
  Network,
  Package,
  Sparkles,
  UserRound,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/hero", label: "首页信息", icon: Home },
  { to: "/status", label: "状态卡片", icon: Sparkles },
  { to: "/social", label: "社交媒体", icon: Link },
  { to: "/ai-products", label: "AI 产品", icon: Package },
  { to: "/works", label: "作品", icon: Briefcase },
  { to: "/filters", label: "筛选器", icon: Filter },
  { to: "/experience", label: "经历", icon: UserRound },
  { to: "/network", label: "连接网络", icon: Network },
];

export default function Sidebar() {
  return (
    <aside className="sticky top-0 h-screen w-64 border-r border-gray-100 bg-white px-3 py-5">
      <div className="mb-6 px-3">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
          Portfolio Admin
        </p>
        <h1 className="mt-1 text-lg font-semibold text-gray-950">个人网站后台</h1>
      </div>
      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex h-10 items-center gap-3 rounded-xl px-3 text-sm transition-colors",
                  isActive
                    ? "bg-gray-950 text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-950",
                )
              }
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
