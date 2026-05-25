/**
 * [INPUT]: 依赖 store、PageHeader 与 UI 组件
 * [OUTPUT]: 对外提供 WorksEditor 组件
 * [POS]: sections/ 的作品编辑器
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { Trash2 } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ImageUploader from "@/components/ui/ImagePreview";
import Input from "@/components/ui/Input";
import SaveButton from "@/components/ui/SaveButton";
import { usePortfolioStore } from "@/stores/usePortfolioStore";

export default function WorksEditor() {
  const { works, addWork, updateWork, deleteWork } = usePortfolioStore();

  const handleSave = () => {
    localStorage.setItem("portfolio-data:updatedAt", String(Date.now()));
  };

  const handleAdd = () => {
    addWork({
      id: Date.now(),
      title: "测试作品",
      image: "",
      category: "未分类",
      link: "",
    });
  };

  return (
    <div>
      <PageHeader
        title="作品"
        description="管理主站作品列表"
        action={
          <div className="flex items-center gap-2">
            <SaveButton onSave={handleSave} />
            <Button type="button" variant="secondary" onClick={handleAdd}>
              添加作品
            </Button>
          </div>
        }
      />
      <div className="space-y-4">
        {works.map((work) => (
          <Card key={work.id} className="grid grid-cols-1 gap-4 lg:grid-cols-[260px_1fr_auto]">
            <ImageUploader
              label="作品图片"
              value={work.image}
              onChange={(image) => updateWork(work.id, { image })}
              aspectRatio={4 / 3}
            />
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <Input
                label="标题"
                value={work.title}
                onChange={(event) => updateWork(work.id, { title: event.target.value })}
              />
              <Input
                label="分类"
                value={work.category}
                onChange={(event) => updateWork(work.id, { category: event.target.value })}
              />
              <Input
                label="链接（可选）"
                value={work.link || ""}
                onChange={(event) => updateWork(work.id, { link: event.target.value })}
                className="md:col-span-2"
              />
            </div>
            <button
              type="button"
              onClick={() => {
                if (confirm("确定删除？")) deleteWork(work.id);
              }}
              className="self-start rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
              aria-label={`删除 ${work.title}`}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </Card>
        ))}
        {works.length === 0 && (
          <Card className="py-12 text-center text-sm text-gray-400">
            暂无作品，点击上方「添加作品」创建
          </Card>
        )}
      </div>
    </div>
  );
}
