/**
 * [INPUT]: 依赖 @/lib/utils 的 cn
 * [OUTPUT]: 对外提供 Card 组件
 * [POS]: ui/ 的卡片容器
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white border border-gray-100 shadow-sm p-5",
        className,
      )}
    >
      {children}
    </div>
  );
}
