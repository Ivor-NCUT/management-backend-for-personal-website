/**
 * [INPUT]: 依赖 @/types
 * [OUTPUT]: 后台可编辑数据的默认值
 * [POS]: data/ 的默认作品集数据
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import type { PortfolioData } from "@/types";

const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 480'%3E%3Crect width='640' height='480' fill='%23f1f5f9'/%3E%3Cpath d='M96 360l128-140 88 96 72-80 160 124z' fill='%2394a3b8'/%3E%3Ccircle cx='448' cy='144' r='48' fill='%23cbd5e1'/%3E%3C/svg%3E";

export const DEFAULT_DATA: PortfolioData = {
  hero: {
    profileImage: PLACEHOLDER_IMAGE,
    name: "泛函",
    badge: "Agent Native CEO",
    introLines: [
      { emoji: "AI", text: "用 AI 工作系统经营长期项目" },
      { emoji: "OS", text: "把内容、服务与工具沉淀成资产" },
    ],
    location: "Shanghai / Remote",
    tags: [
      { emoji: "AI", label: "Agent Workflow" },
      { emoji: "CEO", label: "Business System" },
    ],
    navLinks: [
      { label: "作品", href: "#works" },
      { label: "经历", href: "#experience" },
      { label: "连接", href: "#network" },
    ],
    verifiedTitle: "已验证的长期主义者",
    coffeeChatText: "欢迎交流 AI 原生工作方式",
    wechatQrCode: PLACEHOLDER_IMAGE,
    feishuLink: "",
  },
  statusCards: [
    {
      id: "building",
      emoji: "01",
      label: "当前状态",
      titleEmoji: "->",
      title: "构建 Agent Native 工作系统",
      description: "把真实业务流、知识库和 AI 协作流程对齐。",
      image: PLACEHOLDER_IMAGE,
    },
  ],
  socialLinks: [
    {
      id: "xhs",
      name: "小红书",
      description: "更新 AI 工作流与创业记录",
      icon: PLACEHOLDER_IMAGE,
      url: "https://example.com",
    },
  ],
  aiProducts: [
    {
      id: "agent-os",
      name: "Agent Native OS",
      description: "面向个人 CEO 的 AI 经营操作系统",
      icon: PLACEHOLDER_IMAGE,
      url: "https://example.com",
    },
  ],
  works: [
    {
      id: 1,
      title: "AI 经营操作系统",
      image: PLACEHOLDER_IMAGE,
      category: "系统",
      link: "https://example.com",
    },
  ],
  filters: [
    { id: "all", name: "全部", count: 1 },
    { id: "system", name: "系统", count: 1 },
  ],
  experiences: [
    {
      id: 1,
      title: "Agent Native CEO",
      company: "独立项目",
      period: "2025 - Now",
      description: "用 AI 维护业务系统、知识资产与内容生产链路。",
      initial: "A",
      color: "blue",
      logo: PLACEHOLDER_IMAGE,
    },
  ],
  networkPartnerTypes: [
    { id: "founder", label: "创业者" },
    { id: "creator", label: "创作者" },
  ],
  network: [
    {
      id: "demo-person",
      nickname: "示例伙伴",
      recommendation: "适合一起探索 AI 原生组织方式。",
      baseLocation: "Remote",
      links: [{ title: "个人主页", url: "https://example.com" }],
      partnerTypeIds: ["founder"],
      avatar: PLACEHOLDER_IMAGE,
      tags: ["AI", "系统"],
    },
  ],
};
