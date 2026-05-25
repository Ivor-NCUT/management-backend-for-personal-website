/**
 * [INPUT]: 依赖 @/lib/utils 的 cn
 * [OUTPUT]: 对外提供 Textarea 组件
 * [POS]: ui/ 的多行文本输入
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { cn } from "@/lib/utils";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export default function Textarea({
  label,
  className,
  ...props
}: TextareaProps) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      <textarea
        className={cn(
          "w-full px-3 py-2.5 rounded-xl bg-white border border-gray-200 text-sm text-gray-900 placeholder-gray-400 resize-none",
          "focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-300 transition-colors",
          className,
        )}
        rows={3}
        {...props}
      />
    </div>
  );
}
