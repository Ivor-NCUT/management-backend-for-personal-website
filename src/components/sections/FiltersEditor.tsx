/**
 * [INPUT]: 依赖 @/stores, @/components/ui/*, @/components/layout/PageHeader
 * [OUTPUT]: 对外提供 FiltersEditor 组件
 * [POS]: sections/ 的筛选器类目编辑器
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { usePortfolioStore } from "@/stores/usePortfolioStore";
import PageHeader from "@/components/layout/PageHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import SaveButton from "@/components/ui/SaveButton";
import { Trash2 } from "lucide-react";

export default function FiltersEditor() {
  const { filters, addFilter, updateFilter, deleteFilter } =
    usePortfolioStore();

  const handleSave = () => {
    localStorage.setItem("portfolio-data:updatedAt", String(Date.now()));
  };

  const handleAdd = () => {
    addFilter({ id: `f${Date.now()}`, name: "", count: 0 });
  };

  return (
    <div>
      <PageHeader
        title="筛选器"
        description="管理作品筛选器类目"
        action={
          <div className="flex items-center gap-2">
            <SaveButton onSave={handleSave} />
            <Button variant="secondary" type="button" onClick={handleAdd}>
              添加类目
            </Button>
          </div>
        }
      />
      <Card>
        {/* ── 表头 ── */}
        <div className="flex items-center gap-4 px-2 pb-3 border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase">
          <span className="flex-1">名称</span>
          <span className="w-20 text-center">数量</span>
          <span className="w-10" />
        </div>

        {/* ── 列表 ── */}
        <div className="divide-y divide-gray-50">
          {filters.map((filter) => (
            <div key={filter.id} className="flex items-center gap-4 px-2 py-3">
              <input
                value={filter.name}
                onChange={(e) =>
                  updateFilter(filter.id, { name: e.target.value })
                }
                className="flex-1 h-9 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20"
                placeholder="类目名称"
              />
              <input
                type="number"
                value={filter.count}
                onChange={(e) =>
                  updateFilter(filter.id, {
                    count: parseInt(e.target.value) || 0,
                  })
                }
                className="w-20 h-9 px-3 rounded-lg border border-gray-200 text-sm text-center focus:outline-none focus:ring-2 focus:ring-green-500/20"
              />
              <button
                onClick={() => {
                  if (confirm("确定删除？")) deleteFilter(filter.id);
                }}
                className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {filters.length === 0 && (
          <p className="text-center py-8 text-gray-400 text-sm">
            暂无筛选器类目
          </p>
        )}
      </Card>
    </div>
  );
}
