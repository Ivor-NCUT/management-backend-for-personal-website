/**
 * [INPUT]: 依赖 @/stores, @/components/ui/*, @/components/layout/PageHeader
 * [OUTPUT]: 对外提供 NetworkEditor 组件
 * [POS]: sections/ 的合作伙伴编辑器，含嵌套 articles 数组
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
import { Pencil, Trash2, Plus, X } from "lucide-react";
import type { NetworkPerson } from "@/types";

const EMPTY: NetworkPerson = {
  id: "",
  name: "",
  role: "",
  company: "",
  companyDesc: "",
  location: "",
  teamSize: "",
  valuation: "",
  articles: [],
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
    setEditing({ ...person, articles: person.articles.map((a) => ({ ...a })) });
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
                  {person.company || "未命名"}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {person.name} · {person.role}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  <span className="px-2 py-0.5 rounded-full bg-gray-100 text-[10px] text-gray-600">
                    {person.location}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-gray-100 text-[10px] text-gray-600">
                    {person.teamSize}
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
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="姓名"
                value={editing.name}
                onChange={(e) =>
                  setEditing({ ...editing, name: e.target.value })
                }
              />
              <Input
                label="角色"
                value={editing.role}
                onChange={(e) =>
                  setEditing({ ...editing, role: e.target.value })
                }
              />
            </div>
            <Input
              label="公司"
              value={editing.company}
              onChange={(e) =>
                setEditing({ ...editing, company: e.target.value })
              }
            />
            <Textarea
              label="公司描述"
              value={editing.companyDesc}
              onChange={(e) =>
                setEditing({ ...editing, companyDesc: e.target.value })
              }
            />
            <div className="grid grid-cols-3 gap-3">
              <Input
                label="地点"
                value={editing.location}
                onChange={(e) =>
                  setEditing({ ...editing, location: e.target.value })
                }
              />
              <Input
                label="团队规模"
                value={editing.teamSize}
                onChange={(e) =>
                  setEditing({ ...editing, teamSize: e.target.value })
                }
              />
              <Input
                label="估值"
                value={editing.valuation}
                onChange={(e) =>
                  setEditing({ ...editing, valuation: e.target.value })
                }
              />
            </div>

            {/* ── 文章列表 ── */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  相关文章
                </label>
                <button
                  onClick={() =>
                    setEditing({
                      ...editing,
                      articles: [
                        ...editing.articles,
                        { source: "", title: "" },
                      ],
                    })
                  }
                  className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700"
                >
                  <Plus className="w-3.5 h-3.5" /> 添加
                </button>
              </div>
              <div className="space-y-2">
                {editing.articles.map((article, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      value={article.source}
                      onChange={(e) => {
                        const articles = [...editing.articles];
                        articles[i] = { ...articles[i], source: e.target.value };
                        setEditing({ ...editing, articles });
                      }}
                      placeholder="来源"
                      className="w-28 h-9 px-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                    <input
                      value={article.title}
                      onChange={(e) => {
                        const articles = [...editing.articles];
                        articles[i] = { ...articles[i], title: e.target.value };
                        setEditing({ ...editing, articles });
                      }}
                      placeholder="标题"
                      className="flex-1 h-9 px-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                    <button
                      onClick={() => {
                        const articles = editing.articles.filter(
                          (_, j) => j !== i,
                        );
                        setEditing({ ...editing, articles });
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
