/**
 * [INPUT]: 依赖 store、PageHeader 与 UI 组件
 * [OUTPUT]: 对外提供 StatusEditor 组件
 * [POS]: sections/ 的状态卡片编辑器
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import PageHeader from "@/components/layout/PageHeader";
import Card from "@/components/ui/Card";
import ImageUploader from "@/components/ui/ImagePreview";
import Input from "@/components/ui/Input";
import SaveButton from "@/components/ui/SaveButton";
import Textarea from "@/components/ui/Textarea";
import { usePortfolioStore } from "@/stores/usePortfolioStore";

export default function StatusEditor() {
  const { statusCards, updateStatusCard } = usePortfolioStore();

  const handleSave = () => {
    localStorage.setItem("portfolio-data:updatedAt", String(Date.now()));
  };

  return (
    <div>
      <PageHeader
        title="状态卡片"
        description="编辑主页当前状态展示"
        action={<SaveButton onSave={handleSave} />}
      />
      <div className="space-y-4">
        {statusCards.map((card) => (
          <Card key={card.id} className="grid grid-cols-1 gap-4 lg:grid-cols-[240px_1fr]">
            <ImageUploader
              label="配图"
              value={card.image || ""}
              onChange={(image) => updateStatusCard(card.id, { image })}
              aspectRatio={4 / 3}
            />
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <Input
                label="角标"
                value={card.emoji}
                onChange={(event) => updateStatusCard(card.id, { emoji: event.target.value })}
              />
              <Input
                label="标签"
                value={card.label}
                onChange={(event) => updateStatusCard(card.id, { label: event.target.value })}
              />
              <Input
                label="标题符号"
                value={card.titleEmoji}
                onChange={(event) =>
                  updateStatusCard(card.id, { titleEmoji: event.target.value })
                }
              />
              <Input
                label="标题"
                value={card.title}
                onChange={(event) => updateStatusCard(card.id, { title: event.target.value })}
              />
              <Textarea
                label="描述"
                value={card.description}
                onChange={(event) =>
                  updateStatusCard(card.id, { description: event.target.value })
                }
                className="md:col-span-2"
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
