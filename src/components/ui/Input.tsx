/**
 * [INPUT]: 依赖 @/lib/utils 的 cn
 * [OUTPUT]: 对外提供 Input 组件
 * [POS]: ui/ 的文本输入框
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, className, ...props }: InputProps) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      <input
        className={cn(
          "w-full h-10 px-3 rounded-xl bg-white border border-gray-200 text-sm text-gray-900 placeholder-gray-400",
          "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-colors",
          className,
        )}
        {...props}
      />
    </div>
  );
}
