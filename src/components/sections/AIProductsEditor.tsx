/**
 * [INPUT]: 依赖 @/stores, @/components/ui/*, @/components/layout/PageHeader
 * [OUTPUT]: 对外提供 AIProductsEditor 组件
 * [POS]: sections/ 的 AI 产品编辑器
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { usePortfolioStore } from "@/stores/usePortfolioStore";
import PageHeader from "@/components/layout/PageHeader";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import ImageUploader from "@/components/ui/ImagePreview";
import Button from "@/components/ui/Button";
import SaveButton from "@/components/ui/SaveButton";
import { Trash2 } from "lucide-react";

export default function AIProductsEditor() {
  const { aiProducts, addAiProduct, updateAiProduct, deleteAiProduct } =
    usePortfolioStore();

  const handleSave = () => {
    localStorage.setItem("portfolio-data:updatedAt", String(Date.now()));
  };

  const handleAdd = () => {
    addAiProduct({
      id: `a${Date.now()}`,
      name: "",
      description: "",
      icon: "",
    });
  };

  return (
    <div>
      <PageHeader
        title="AI 产品"
        description="管理最喜欢的小众 AI 产品"
        action={
          <div className="flex items-center gap-2">
            <SaveButton onSave={handleSave} />
            <Button variant="secondary" type="button" onClick={handleAdd}>
              添加
            </Button>
          </div>
        }
      />
      <div className="space-y-3">
        {aiProducts.map((product) => (
          <Card key={product.id} className="flex flex-col md:flex-row gap-4">
            <ImageUploader
              value={product.icon}
              onChange={(url) => updateAiProduct(product.id, { icon: url })}
              aspectRatio={1}
              className="md:w-64"
            />
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                label="名称"
                value={product.name}
                onChange={(e) =>
                  updateAiProduct(product.id, { name: e.target.value })
                }
              />
              <Input
                label="描述"
                value={product.description}
                onChange={(e) =>
                  updateAiProduct(product.id, { description: e.target.value })
                }
              />
              <Input
                label="链接（可选）"
                value={product.url || ""}
                onChange={(e) =>
                  updateAiProduct(product.id, { url: e.target.value })
                }
              />
            </div>
            <button
              onClick={() => {
                if (confirm("确定删除？")) deleteAiProduct(product.id);
              }}
              className="self-start p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </Card>
        ))}
        {aiProducts.length === 0 && (
          <Card className="text-center py-12 text-gray-400 text-sm">
            暂无 AI 产品，点击上方「添加」按钮创建
          </Card>
        )}
      </div>
    </div>
  );
}
