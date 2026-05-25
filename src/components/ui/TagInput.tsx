/**
 * [INPUT]: 依赖 Button
 * [OUTPUT]: 对外提供 TagInput 组件
 * [POS]: ui/ 的标签数组输入组件
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useState } from "react";
import { X } from "lucide-react";
import Button from "./Button";

interface TagInputProps {
  label?: string;
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export default function TagInput({
  label,
  value,
  onChange,
  placeholder = "添加标签",
}: TagInputProps) {
  const [draft, setDraft] = useState("");

  const addTag = () => {
    const tag = draft.trim();
    if (!tag || value.includes(tag)) return;
    onChange([...value, tag]);
    setDraft("");
  };

  return (
    <div>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="flex flex-wrap gap-2 rounded-xl border border-gray-200 bg-white p-2">
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex h-7 items-center gap-1 rounded-lg bg-gray-100 px-2 text-xs text-gray-700"
          >
            {tag}
            <button
              type="button"
              onClick={() => onChange(value.filter((item) => item !== tag))}
              className="text-gray-400 hover:text-red-500"
              aria-label={`删除 ${tag}`}
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              addTag();
            }
          }}
          placeholder={placeholder}
          className="min-w-32 flex-1 border-0 bg-transparent text-sm outline-none"
        />
        <Button type="button" variant="secondary" onClick={addTag}>
          添加
        </Button>
      </div>
    </div>
  );
}
