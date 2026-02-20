/**
 * [INPUT]: 依赖 @/stores, @/components/ui/*, @/components/layout/PageHeader
 * [OUTPUT]: 对外提供 SocialLinksEditor 组件
 * [POS]: sections/ 的社交媒体编辑器
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { usePortfolioStore } from "@/stores/usePortfolioStore";
import PageHeader from "@/components/layout/PageHeader";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import ImageUploader from "@/components/ui/ImagePreview";
import Button from "@/components/ui/Button";
import { Trash2 } from "lucide-react";

export default function SocialLinksEditor() {
  const { socialLinks, addSocialLink, updateSocialLink, deleteSocialLink } =
    usePortfolioStore();

  const handleAdd = () => {
    addSocialLink({
      id: `s${Date.now()}`,
      name: "",
      description: "",
      icon: "",
    });
  };

  return (
    <div>
      <PageHeader
        title="社交媒体"
        description="管理社交媒体链接"
        action={<Button onClick={handleAdd}>添加</Button>}
      />
      <div className="space-y-3">
        {socialLinks.map((link) => (
          <Card key={link.id} className="flex flex-col md:flex-row gap-4">
            <ImageUploader
              value={link.icon}
              onChange={(url) => updateSocialLink(link.id, { icon: url })}
              aspectRatio={1}
              className="md:w-64"
            />
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                label="名称"
                value={link.name}
                onChange={(e) =>
                  updateSocialLink(link.id, { name: e.target.value })
                }
              />
              <Input
                label="描述"
                value={link.description}
                onChange={(e) =>
                  updateSocialLink(link.id, { description: e.target.value })
                }
              />
              <Input
                label="链接（可选）"
                value={link.url || ""}
                onChange={(e) =>
                  updateSocialLink(link.id, { url: e.target.value })
                }
              />
            </div>
            <button
              onClick={() => {
                if (confirm("确定删除？")) deleteSocialLink(link.id);
              }}
              className="self-start p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </Card>
        ))}
        {socialLinks.length === 0 && (
          <Card className="text-center py-12 text-gray-400 text-sm">
            暂无社交媒体，点击上方「添加」按钮创建
          </Card>
        )}
      </div>
    </div>
  );
}
