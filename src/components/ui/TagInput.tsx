/**
 * [INPUT]: 依赖 lucide-react 的 X
 * [OUTPUT]: 对外提供 TagInput 组件
 * [POS]: ui/ 的标签输入组件，支持添加/删除 chips
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useState } from "react";
import { X } from "lucide-react";

interface TagInputProps {
  label?: string;
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

export default function TagInput({
  label,
  value,
  onChange,
  placeholder = "输入后回车添加",
}: TagInputProps) {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      if (!value.includes(input.trim())) {
        onChange([...value, input.trim()]);
      }
      setInput("");
    }
  };

  const remove = (tag: string) => onChange(value.filter((t) => t !== tag));

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      <div className="flex flex-wrap gap-1.5 p-2 rounded-xl bg-white border border-gray-200 min-h-[40px]">
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-blue-50 text-blue-600 text-xs font-medium"
          >
            {tag}
            <button onClick={() => remove(tag)} className="hover:text-blue-800">
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={value.length === 0 ? placeholder : ""}
          className="flex-1 min-w-[80px] text-sm outline-none bg-transparent"
        />
      </div>
    </div>
  );
}
