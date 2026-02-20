/**
 * [INPUT]: 依赖 @/stores, @/components/ui/*, @/components/layout/PageHeader
 * [OUTPUT]: 对外提供 StatusEditor 组件
 * [POS]: sections/ 的状态卡片编辑器
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { usePortfolioStore } from "@/stores/usePortfolioStore";
import PageHeader from "@/components/layout/PageHeader";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import ImageUploader from "@/components/ui/ImagePreview";

export default function StatusEditor() {
  const { statusCards, updateStatusCard } = usePortfolioStore();

  return (
    <div>
      <PageHeader title="状态卡片" description="编辑找人状态和正在 Build 的内容" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {statusCards.map((card) => (
          <Card key={card.id}>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  value={card.emoji}
                  onChange={(e) =>
                    updateStatusCard(card.id, { emoji: e.target.value })
                  }
                  className="w-12 h-10 px-2 rounded-xl border border-gray-200 text-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="🔥"
                />
                <input
                  value={card.label}
                  onChange={(e) =>
                    updateStatusCard(card.id, { label: e.target.value })
                  }
                  className="flex-1 h-10 px-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="标签"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  value={card.titleEmoji}
                  onChange={(e) =>
                    updateStatusCard(card.id, { titleEmoji: e.target.value })
                  }
                  className="w-12 h-10 px-2 rounded-xl border border-gray-200 text-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="🙋"
                />
                <Input
                  value={card.title}
                  onChange={(e) =>
                    updateStatusCard(card.id, { title: e.target.value })
                  }
                  placeholder="标题"
                />
              </div>
              <Textarea
                label="描述"
                value={card.description}
                onChange={(e) =>
                  updateStatusCard(card.id, { description: e.target.value })
                }
              />
              <ImageUploader
                label="图片（可选）"
                value={card.image || ""}
                onChange={(url) => updateStatusCard(card.id, { image: url })}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
