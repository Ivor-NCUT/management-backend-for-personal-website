/**
 * [INPUT]: 依赖 @/stores, @/components/ui/*, @/components/layout/PageHeader
 * [OUTPUT]: 对外提供 NetworkEditor 组件
 * [POS]: sections/ 的合作伙伴编辑器，含嵌套 links 数组
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
import { Pencil, Trash2, Plus, X } from "lucide-react";
import type { NetworkPerson } from "@/types";

const EMPTY: NetworkPerson = {
  id: "",
  nickname: "",
  recommendation: "",
  baseLocation: "",
  links: [],
  avatar: "",
};

export default function NetworkEditor() {
  const { network, addNetworkPerson, updateNetworkPerson, deleteNetworkPerson } =
    usePortfolioStore();
  const [editing, setEditing] = useState<NetworkPerson | null>(null);
  const [isNew, setIsNew] = useState(false);

  const openNew = () => {
    setEditing({ ...EMPTY, id: `n${Date.now()}` });
    setIsNew(true);
  };

  const openEdit = (person: NetworkPerson) => {
    setEditing({ 
      ...EMPTY,
      ...person, 
      links: (person.links || []).map((a) => ({ ...a })) 
    });
    setIsNew(false);
  };

  const save = () => {
    if (!editing) return;
    if (isNew) addNetworkPerson(editing);
    else updateNetworkPerson(editing.id, editing);
    setEditing(null);
  };

  return (
    <div>
      <PageHeader
        title="合作伙伴"
        description="管理合作伙伴网络"
        action={<Button onClick={openNew}>添加</Button>}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {network.map((person) => (
          <Card key={person.id}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {person.nickname || "未命名"}
                </p>
                <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">
                  {person.recommendation}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  <span className="px-2 py-0.5 rounded-full bg-gray-100 text-[10px] text-gray-600">
                    {person.baseLocation}
                  </span>
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => openEdit(person)}
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    if (confirm("确定删除？")) deleteNetworkPerson(person.id);
                  }}
                  className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Card>
        ))}
        {network.length === 0 && (
          <Card className="col-span-full text-center py-12 text-gray-400 text-sm">
            暂无合作伙伴
          </Card>
        )}
      </div>

      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title={isNew ? "添加合作伙伴" : "编辑合作伙伴"}
      >
        {editing && (
          <div className="space-y-4">
            <ImageUploader
              label="头像 (1:1)"
              value={editing.avatar || ""}
              onChange={(url) => setEditing({ ...editing, avatar: url })}
              aspectRatio={1}
              className="w-48"
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="昵称"
                value={editing.nickname}
                onChange={(e) =>
                  setEditing({ ...editing, nickname: e.target.value })
                }
              />
              <Input
                label="base 地"
                value={editing.baseLocation}
                onChange={(e) =>
                  setEditing({ ...editing, baseLocation: e.target.value })
                }
              />
            </div>
            <Textarea
              label="推荐语"
              value={editing.recommendation}
              onChange={(e) =>
                setEditing({ ...editing, recommendation: e.target.value })
              }
            />

            {/* ── 链接列表 ── */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  相关链接
                </label>
                <button
                  onClick={() =>
                    setEditing({
                      ...editing,
                      links: [
                        ...editing.links,
                        { title: "", url: "" },
                      ],
                    })
                  }
                  className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700"
                >
                  <Plus className="w-3.5 h-3.5" /> 添加
                </button>
              </div>
              <div className="space-y-2">
                {editing.links.map((link, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      value={link.title}
                      onChange={(e) => {
                        const links = [...editing.links];
                        links[i] = { ...links[i], title: e.target.value };
                        setEditing({ ...editing, links });
                      }}
                      placeholder="标题"
                      className="w-28 h-9 px-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                    <input
                      value={link.url}
                      onChange={(e) => {
                        const links = [...editing.links];
                        links[i] = { ...links[i], url: e.target.value };
                        setEditing({ ...editing, links });
                      }}
                      placeholder="跳转链接"
                      className="flex-1 h-9 px-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                    <button
                      onClick={() => {
                        const links = editing.links.filter(
                          (_, j) => j !== i,
                        );
                        setEditing({ ...editing, links });
                      }}
                      className="p-1 rounded hover:bg-red-50 text-gray-400 hover:text-red-500"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

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
