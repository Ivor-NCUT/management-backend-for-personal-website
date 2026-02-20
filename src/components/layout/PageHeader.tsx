/**
 * [INPUT]: 无外部依赖
 * [OUTPUT]: 对外提供 PageHeader 组件
 * [POS]: layout/ 的页面标题栏
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export default function PageHeader({
  title,
  description,
  action,
}: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-8">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        {description && (
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
