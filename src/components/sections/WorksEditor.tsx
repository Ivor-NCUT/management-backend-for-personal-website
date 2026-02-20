/**
 * [INPUT]: 依赖 @/stores, @/components/ui/*, @/components/layout/PageHeader
 * [OUTPUT]: 对外提供 WorksEditor 组件
 * [POS]: sections/ 的作品管理编辑器，表格 + 模态框
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useState } from "react";
import { usePortfolioStore } from "@/stores/usePortfolioStore";
import PageHeader from "@/components/layout/PageHeader";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import TagInput from "@/components/ui/TagInput";
import ImageUploader from "@/components/ui/ImagePreview";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { Pencil, Trash2 } from "lucide-react";
import type { Work } from "@/types";

const EMPTY_WORK: Work = {
  id: 0,
  location: "",
  title: "",
  tags: [],
  date: "",
  org: "",
  orgInitial: "",
  image: "",
  category: "All",
};

export default function WorksEditor() {
  const { works, filters, addWork, updateWork, deleteWork } =
    usePortfolioStore();
  const [editing, setEditing] = useState<Work | null>(null);
  const [isNew, setIsNew] = useState(false);

  const openNew = () => {
    setEditing({ ...EMPTY_WORK, id: Date.now() });
    setIsNew(true);
  };

  const openEdit = (work: Work) => {
    setEditing({ ...work });
    setIsNew(false);
  };

  const save = () => {
    if (!editing) return;
    if (isNew) addWork(editing);
    else updateWork(editing.id, editing);
    setEditing(null);
  };

  return (
    <div>
      <PageHeader
        title="作品管理"
        description="管理过往作品精选"
        action={<Button onClick={openNew}>添加作品</Button>}
      />

      {/* ── 作品列表 ── */}
      <div className="space-y-2">
        {works.map((work) => (
          <Card
            key={work.id}
            className="flex items-center gap-4 !p-3"
          >
            {work.image && (
              <img
                src={work.image}
                alt={work.title}
                className="w-16 h-11 rounded-lg object-cover border border-gray-100 flex-shrink-0"
              />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {work.title || "未命名"}
              </p>
              <p className="text-xs text-gray-400">
                {work.location} · {work.date} · {work.org}
              </p>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                onClick={() => openEdit(work)}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  if (confirm("确定删除？")) deleteWork(work.id);
                }}
                className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </Card>
        ))}
        {works.length === 0 && (
          <Card className="text-center py-12 text-gray-400 text-sm">
            暂无作品，点击上方「添加作品」按钮创建
          </Card>
        )}
      </div>

      {/* ── 编辑模态框 ── */}
      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title={isNew ? "添加作品" : "编辑作品"}
      >
        {editing && (
          <div className="space-y-4">
            <Input
              label="标题"
              value={editing.title}
              onChange={(e) =>
                setEditing({ ...editing, title: e.target.value })
              }
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="地点"
                value={editing.location}
                onChange={(e) =>
                  setEditing({ ...editing, location: e.target.value })
                }
              />
              <Input
                label="日期"
                value={editing.date}
                onChange={(e) =>
                  setEditing({ ...editing, date: e.target.value })
                }
                placeholder="2024.04.01"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="主办方"
                value={editing.org}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    org: e.target.value,
                    orgInitial: e.target.value[0]?.toUpperCase() || "",
                  })
                }
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  分类
                </label>
                <select
                  value={editing.category}
                  onChange={(e) =>
                    setEditing({ ...editing, category: e.target.value })
                  }
                  className="w-full h-10 px-3 rounded-xl bg-white border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  {filters.map((f) => (
                    <option key={f.id} value={f.name}>
                      {f.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <TagInput
              label="标签"
              value={editing.tags}
              onChange={(tags) => setEditing({ ...editing, tags })}
            />
            <ImageUploader
              label="封面图"
              value={editing.image}
              onChange={(url) => setEditing({ ...editing, image: url })}
              aspectRatio={16 / 9}
            />
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="secondary" onClick={() => setEditing(null)}>
                取消
              </Button>
              <Button onClick={save}>保存</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
