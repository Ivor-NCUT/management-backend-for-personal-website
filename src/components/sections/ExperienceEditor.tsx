/**
 * [INPUT]: 依赖 @/stores, @/components/ui/*, @/components/layout/PageHeader
 * [OUTPUT]: 对外提供 ExperienceEditor 组件
 * [POS]: sections/ 的工作经历编辑器
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { useState } from "react";
import { usePortfolioStore } from "@/stores/usePortfolioStore";
import PageHeader from "@/components/layout/PageHeader";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import ImageUploader from "@/components/ui/ImagePreview";
import { Pencil, Trash2 } from "lucide-react";
import type { Experience, ExperienceColor } from "@/types";

const COLOR_MAP: Record<string, string> = {
  blue: "#2563eb",
  dark: "#101828",
  purple: "#9333ea",
};

const COLORS: ExperienceColor[] = ["blue", "dark", "purple"];

const EMPTY: Experience = {
  id: 0,
  title: "",
  company: "",
  period: "",
  description: "",
  initial: "",
  color: "blue",
};

export default function ExperienceEditor() {
  const { experiences, addExperience, updateExperience, deleteExperience } =
    usePortfolioStore();
  const [editing, setEditing] = useState<Experience | null>(null);
  const [isNew, setIsNew] = useState(false);

  const openNew = () => {
    setEditing({ ...EMPTY, id: Date.now() });
    setIsNew(true);
  };

  const openEdit = (exp: Experience) => {
    setEditing({ ...exp });
    setIsNew(false);
  };

  const save = () => {
    if (!editing) return;
    if (isNew) addExperience(editing);
    else updateExperience(editing.id, editing);
    setEditing(null);
  };

  return (
    <div>
      <PageHeader
        title="工作经历"
        description="管理职业经历时间线"
        action={<Button onClick={openNew}>添加经历</Button>}
      />

      <div className="space-y-3">
        {experiences.map((exp) => (
          <Card key={exp.id} className="flex items-center gap-4 !p-4">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-semibold flex-shrink-0 overflow-hidden"
              style={{ backgroundColor: exp.logo ? 'transparent' : COLOR_MAP[exp.color] }}
            >
              {exp.logo ? (
                <img src={exp.logo} alt={exp.company} className="w-full h-full object-cover" />
              ) : (
                exp.initial
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900">
                {exp.title || "未命名"}
              </p>
              <p className="text-xs text-gray-400">
                {exp.company} · {exp.period}
              </p>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                onClick={() => openEdit(exp)}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  if (confirm("确定删除？")) deleteExperience(exp.id);
                }}
                className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </Card>
        ))}
        {experiences.length === 0 && (
          <Card className="text-center py-12 text-gray-400 text-sm">
            暂无工作经历
          </Card>
        )}
      </div>

      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title={isNew ? "添加经历" : "编辑经历"}
      >
        {editing && (
          <div className="space-y-4">
            <Input
              label="职位"
              value={editing.title}
              onChange={(e) =>
                setEditing({ ...editing, title: e.target.value })
              }
            />
            <Input
              label="公司"
              value={editing.company}
              onChange={(e) =>
                setEditing({
                  ...editing,
                  company: e.target.value,
                  initial: e.target.value[0]?.toUpperCase() || "",
                })
              }
            />
            <Input
              label="时间段"
              value={editing.period}
              onChange={(e) =>
                setEditing({ ...editing, period: e.target.value })
              }
              placeholder="2023 - Present"
            />
            <Textarea
              label="描述"
              value={editing.description}
              onChange={(e) =>
                setEditing({ ...editing, description: e.target.value })
              }
            />
            <ImageUploader
              label="公司图标 (1:1)"
              value={editing.logo || ""}
              onChange={(url) => setEditing({ ...editing, logo: url })}
              aspectRatio={1}
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
