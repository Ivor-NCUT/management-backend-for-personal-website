# admin/ - 管理后台
> L2 | 父级: /CLAUDE.md

React 18 + TypeScript + Vite 6 + TailwindCSS v4 + Zustand

## 成员清单

index.html: 入口 HTML
package.json: 依赖配置
vite.config.ts: Vite 构建配置
tsconfig.json: TypeScript 配置

## src/ 结构

src/main.tsx: React 入口
src/App.tsx: 根组件，8 个编辑器路由
src/index.css: 全局样式（与 web 同构）

src/types/index.ts: 数据类型定义（与 web 同构）
src/stores/usePortfolioStore.ts: Zustand 读写 store，persist 到 localStorage
src/data/defaults.ts: 默认数据集（与 web 同构）
src/lib/utils.ts: cn() 样式合并工具
src/lib/insforge.ts: Insforge 客户端初始化
src/lib/storage.ts: 图片上传/删除服务（Insforge Storage）
src/lib/portfolioSync.ts: 作品集同步桥，向主站 origin 广播最新 localStorage 数据

### components/layout/
Sidebar.tsx: 侧边导航栏，含导出/导入/重置操作
Layout.tsx: 页面骨架，Sidebar + Outlet
PageHeader.tsx: 页面标题栏

### components/ui/
Button.tsx: 按钮（primary/secondary/danger/ghost）
SaveButton.tsx: 带交互反馈的保存按钮
Card.tsx: 卡片容器
Input.tsx: 文本输入框
Textarea.tsx: 多行文本输入
TagInput.tsx: 标签输入（chips）
ImagePreview.tsx: 图片上传组件（支持本地上传、剪贴板粘贴、裁剪、Insforge 云存储）
Modal.tsx: 模态弹窗

### components/sections/
HeroEditor.tsx: 首页信息编辑器（基本信息、介绍行、标签、导航）
StatusEditor.tsx: 状态卡片编辑器（两张卡片内联编辑）
SocialLinksEditor.tsx: 社交媒体编辑器（列表 CRUD）
AIProductsEditor.tsx: AI 产品编辑器（列表 CRUD）
WorksEditor.tsx: 作品管理编辑器（表格 + 模态框）
FiltersEditor.tsx: 筛选器类目编辑器（简单列表）
ExperienceEditor.tsx: 工作经历编辑器（卡片 + 模态框 + 颜色选择）
NetworkEditor.tsx: 合作伙伴编辑器（卡片 + 模态框 + 嵌套文章）

[PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
