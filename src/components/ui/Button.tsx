/**
 * [INPUT]: 依赖 @/lib/utils 的 cn
 * [OUTPUT]: 对外提供 Button 组件
 * [POS]: ui/ 的按钮组件，支持 primary/secondary/danger 三种变体
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { cn } from "@/lib/utils";

const VARIANTS = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
  secondary: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50",
  danger: "bg-red-500 text-white hover:bg-red-600 shadow-sm",
  ghost: "text-gray-600 hover:bg-gray-100",
} as const;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof VARIANTS;
}

export default function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors",
        VARIANTS[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
