/**
 * [INPUT]: 依赖 @/lib/utils 的 cn
 * [OUTPUT]: 对外提供 Input 组件
 * [POS]: ui/ 的单行输入组件
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
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        className={cn(
          "h-10 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500/20",
          className,
        )}
        {...props}
      />
    </div>
  );
}
