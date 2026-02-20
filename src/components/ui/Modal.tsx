/**
 * [INPUT]: 依赖 lucide-react 的 X
 * [OUTPUT]: 对外提供 Modal 组件
 * [POS]: ui/ 的模态弹窗
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/20" onClick={onClose} />
      <div className="relative w-full max-w-lg mx-4 max-h-[85vh] overflow-y-auto rounded-2xl bg-white shadow-xl">
        <div className="sticky top-0 flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-white rounded-t-2xl">
          <h2 className="text-base font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
