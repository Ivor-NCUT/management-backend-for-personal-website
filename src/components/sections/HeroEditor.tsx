/**
 * [INPUT]: 依赖 @/stores, @/components/ui/*, @/components/layout/PageHeader
 * [OUTPUT]: 对外提供 HeroEditor 组件
 * [POS]: sections/ 的首页信息编辑器
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { usePortfolioStore } from "@/stores/usePortfolioStore";
import PageHeader from "@/components/layout/PageHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import SaveButton from "@/components/ui/SaveButton";
import Input from "@/components/ui/Input";
import ImageUploader from "@/components/ui/ImagePreview";
import { Plus, X } from "lucide-react";

export default function HeroEditor() {
  const { hero, setHero } = usePortfolioStore();
  const handleSave = () => {
    localStorage.setItem("portfolio-data:updatedAt", String(Date.now()));
  };

  return (
    <div>
      <PageHeader
        title="首页信息"
        description="编辑个人主页的核心展示内容"
        action={
          <SaveButton onSave={handleSave} />
        }
      />

      {/* ── 基本信息 ── */}
      <Card className="mb-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">基本信息</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="姓名"
            value={hero.name}
            onChange={(e) => setHero({ name: e.target.value })}
          />
          <Input
            label="徽章"
            value={hero.badge}
            onChange={(e) => setHero({ badge: e.target.value })}
          />
          <Input
            label="地点"
            value={hero.location}
            onChange={(e) => setHero({ location: e.target.value })}
          />
          <ImageUploader
            label="头像"
            value={hero.profileImage}
            onChange={(url) => setHero({ profileImage: url })}
            aspectRatio={3 / 4}
          />
          <ImageUploader
            label="微信二维码"
            value={hero.wechatQrCode || ""}
            onChange={(url) => setHero({ wechatQrCode: url })}
            aspectRatio={1}
          />
          <Input
            label="飞书添加联系人链接"
            value={hero.feishuLink || ""}
            onChange={(e) => setHero({ feishuLink: e.target.value })}
            placeholder="https://www.feishu.cn/invitation/..."
          />
        </div>
      </Card>

      {/* ── 介绍行 ── */}
      <Card className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-900">介绍行</h3>
          <button
            onClick={() =>
              setHero({
                introLines: [...hero.introLines, { emoji: "", text: "" }],
              })
            }
            className="inline-flex items-center gap-1 text-xs text-green-600 hover:text-green-700"
          >
            <Plus className="w-3.5 h-3.5" /> 添加
          </button>
        </div>
        <div className="space-y-3">
          {hero.introLines.map((line, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                value={line.emoji}
                onChange={(e) => {
                  const lines = [...hero.introLines];
                  lines[i] = { ...lines[i], emoji: e.target.value };
                  setHero({ introLines: lines });
                }}
                placeholder="emoji"
                className="w-14 h-10 px-2 rounded-xl border border-gray-200 text-center text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20"
              />
              <input
                value={line.text}
                onChange={(e) => {
                  const lines = [...hero.introLines];
                  lines[i] = { ...lines[i], text: e.target.value };
                  setHero({ introLines: lines });
                }}
                placeholder="介绍文案"
                className="flex-1 h-10 px-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20"
              />
              <button
                onClick={() => {
                  const lines = hero.introLines.filter((_, j) => j !== i);
                  setHero({ introLines: lines });
                }}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-50 text-gray-400 hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* ── 标签 ── */}
      <Card className="mb-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-900">标签</h3>
          <button
            onClick={() =>
              setHero({ tags: [...hero.tags, { emoji: "", label: "" }] })
            }
            className="inline-flex items-center gap-1 text-xs text-green-600 hover:text-green-700"
          >
            <Plus className="w-3.5 h-3.5" /> 添加
          </button>
        </div>
        <div className="space-y-3">
          {hero.tags.map((tag, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                value={tag.emoji}
                onChange={(e) => {
                  const tags = [...hero.tags];
                  tags[i] = { ...tags[i], emoji: e.target.value };
                  setHero({ tags });
                }}
                placeholder="emoji"
                className="w-14 h-10 px-2 rounded-xl border border-gray-200 text-center text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20"
              />
              <input
                value={tag.label}
                onChange={(e) => {
                  const tags = [...hero.tags];
                  tags[i] = { ...tags[i], label: e.target.value };
                  setHero({ tags });
                }}
                placeholder="标签文案"
                className="flex-1 h-10 px-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20"
              />
              <button
                onClick={() => {
                  const tags = hero.tags.filter((_, j) => j !== i);
                  setHero({ tags });
                }}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-50 text-gray-400 hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* ── 导航链接 ── */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-900">导航链接</h3>
          <button
            onClick={() =>
              setHero({
                navLinks: [...hero.navLinks, { label: "", href: "" }],
              })
            }
            className="inline-flex items-center gap-1 text-xs text-green-600 hover:text-green-700"
          >
            <Plus className="w-3.5 h-3.5" /> 添加
          </button>
        </div>
        <div className="space-y-3">
          {hero.navLinks.map((link, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                value={link.label}
                onChange={(e) => {
                  const links = [...hero.navLinks];
                  links[i] = { ...links[i], label: e.target.value };
                  setHero({ navLinks: links });
                }}
                placeholder="显示文字"
                className="flex-1 h-10 px-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20"
              />
              <input
                value={link.href}
                onChange={(e) => {
                  const links = [...hero.navLinks];
                  links[i] = { ...links[i], href: e.target.value };
                  setHero({ navLinks: links });
                }}
                placeholder="#anchor"
                className="w-32 h-10 px-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20"
              />
              <button
                onClick={() => {
                  const links = hero.navLinks.filter((_, j) => j !== i);
                  setHero({ navLinks: links });
                }}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-50 text-gray-400 hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
