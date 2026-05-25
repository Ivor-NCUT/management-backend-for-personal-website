/**
 * [INPUT]: 依赖 store、PageHeader 与 UI 组件
 * [OUTPUT]: 对外提供 ExperienceEditor 组件
 * [POS]: sections/ 的经历编辑器
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { Trash2 } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import ImageUploader from "@/components/ui/ImagePreview";
import Input from "@/components/ui/Input";
import SaveButton from "@/components/ui/SaveButton";
import Textarea from "@/components/ui/Textarea";
import { usePortfolioStore } from "@/stores/usePortfolioStore";
import type { ExperienceColor } from "@/types";

const colors: ExperienceColor[] = ["blue", "dark", "purple"];

export default function ExperienceEditor() {
  const { experiences, addExperience, updateExperience, deleteExperience } =
    usePortfolioStore();

  const handleSave = () => {
    localStorage.setItem("portfolio-data:updatedAt", String(Date.now()));
  };

  const handleAdd = () => {
    addExperience({
      id: Date.now(),
      title: "新经历",
      company: "组织名称",
      period: "2026",
      description: "",
      initial: "N",
      color: "blue",
      logo: "",
    });
  };

  return (
    <div>
      <PageHeader
        title="经历"
        description="管理主站经历时间线"
        action={
          <div className="flex items-center gap-2">
            <SaveButton onSave={handleSave} />
            <Button type="button" variant="secondary" onClick={handleAdd}>
              添加经历
            </Button>
          </div>
        }
      />
      <div className="space-y-4">
        {experiences.map((experience) => (
          <Card
            key={experience.id}
            className="grid grid-cols-1 gap-4 lg:grid-cols-[220px_1fr_auto]"
          >
            <ImageUploader
              label="Logo"
              value={experience.logo || ""}
              onChange={(logo) => updateExperience(experience.id, { logo })}
              aspectRatio={1}
            />
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <Input
                label="职位/角色"
                value={experience.title}
                onChange={(event) =>
                  updateExperience(experience.id, { title: event.target.value })
                }
              />
              <Input
                label="公司/组织"
                value={experience.company}
                onChange={(event) =>
                  updateExperience(experience.id, { company: event.target.value })
                }
              />
              <Input
                label="时间"
                value={experience.period}
                onChange={(event) =>
                  updateExperience(experience.id, { period: event.target.value })
                }
              />
              <Input
                label="缩写"
                value={experience.initial}
                onChange={(event) =>
                  updateExperience(experience.id, { initial: event.target.value.slice(0, 2) })
                }
              />
              <label className="text-sm font-medium text-gray-700">
                颜色
                <select
                  value={experience.color}
                  onChange={(event) =>
                    updateExperience(experience.id, {
                      color: event.target.value as ExperienceColor,
                    })
                  }
                  className="mt-1.5 h-10 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm"
                >
                  {colors.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </label>
              <Textarea
                label="描述"
                value={experience.description}
                onChange={(event) =>
                  updateExperience(experience.id, { description: event.target.value })
                }
                className="md:col-span-2"
              />
            </div>
            <button
              type="button"
              onClick={() => {
                if (confirm("确定删除？")) deleteExperience(experience.id);
              }}
              className="self-start rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
              aria-label={`删除 ${experience.title}`}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
