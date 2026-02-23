/**
 * [INPUT]: 依赖 @/types 的所有数据类型
 * [OUTPUT]: 对外提供 DEFAULT_DATA 默认数据集
 * [POS]: data/ 的默认数据源，从主站组件提取的硬编码数据
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import type { PortfolioData } from "@/types";

export const DEFAULT_DATA: PortfolioData = {
  /* ── Hero ── */
  hero: {
    profileImage: "/.figma/image/mlqnrv6p-t5b6tvc.png",
    name: "泛函",
    badge: "奇绩创坛 S25 校友",
    introLines: [
      { emoji: "👋🏻", text: "CMO@Bonjour!｜00 后创业" },
      { emoji: "🧑🏻‍🚀", text: "在帮助 GenAI 公司招聘年轻有创造力的 Builder" },
      { emoji: "🏛️", text: "同时在帮助年轻 Builder 寻找高增长的科技公司" },
    ],
    location: "杭州·西湖·云谷中心",
    tags: [
      { emoji: "🕵️‍♀️️", label: "CMO@Bonjour!" },
      { emoji: "🧙‍♂️", label: "商业化" },
      { emoji: "💡", label: "AI行业招聘与求职" },
      { emoji: "😎", label: "他" },
    ],
    navLinks: [
      { label: "关于我", href: "#about" },
      { label: "精选作品", href: "#works" },
      { label: "人际网络", href: "#network" },
      { label: "职业经历", href: "#experience" },
    ],
    verifiedTitle: "Full-time Builder",
    coffeeChatText: "可约线上coffee chat",
    wechatQrCode: "",
    feishuLink: "",
  },

  /* ── Status ── */
  statusCards: [
    {
      id: "status-1",
      emoji: "🔥",
      label: "最近的找人状态",
      titleEmoji: "🙋️",
      title: "项目合作",
      description:
        "想认识有自己的服务项目、能够灵活进行付费合作的工作室 & 一人公司朋友，无论你是擅长做活动策划与执行、独立开发、各类设计、搭建多维表格，我们都有能付费合作的项目。",
    },
    {
      id: "status-2",
      emoji: "⚡",
      label: "正在 Build",
      titleEmoji: "",
      title: "Bonjour!",
      description:
        "Bonjour! 是最酷的 GenZ Builder 与 Founder 使用的「新一代社交名片网络」，通过数字名片、Bonjour Card、AI 匹配与社区系统，我们让 Builder 更快被看见，更快找到同类，更快开始构建。Find the Others. Build Together.",
      image: "/.figma/image/mlqnrv6p-q181oh6.png",
    },
  ],

  /* ── Social Links ── */
  socialLinks: [
    { id: "s1", name: "小红书", description: "工作日常与生活碎片", icon: "/.figma/image/mlqnrv6p-6ti0gll.png" },
    { id: "s2", name: "公众号", description: "深度思考与年度长文", icon: "/.figma/image/mlqnrv6p-ifdzucz.png" },
    { id: "s3", name: "即刻", description: "一个公开的朋友圈", icon: "/.figma/image/mlqnrv6p-yf0d5ul.png" },
    { id: "s4", name: "Bonjour! 社区", description: "半职业化社交", icon: "/.figma/image/mlqnrv6p-4bldnr5.png" },
    { id: "s5", name: "X.com", description: "Build everything in pubic", icon: "/.figma/image/mlqnrv6p-yraz72p.png" },
  ],

  /* ── AI Products ── */
  aiProducts: [
    { id: "a1", name: "Typless", description: "让我做一切工作都从说开始", icon: "/.figma/image/mlqnrv6p-kj33p6i.png" },
    { id: "a2", name: "Youware", description: "Vibe coding 从此方便太多", icon: "/.figma/image/mlqnrv6p-cxfmgz8.png" },
    { id: "a3", name: "Youmind", description: "知识管理与内容创作 AI 系统", icon: "/.figma/image/mlqnrv6p-ukaveaa.png" },
    { id: "a4", name: "Zeabur", description: "解决产品上线部署的一切问题", icon: "/.figma/image/mlqnrv6p-xh3vajs.png" },
    { id: "a5", name: "Insforge", description: "后端和数据库开发竟然那么容易", icon: "/.figma/image/mlqnrv6p-t67y9cm.png" },
  ],

  /* ── Works ── */
  works: [
    { id: 1, title: "SparkLab A.I.R 招募", image: "/.figma/image/mlqnrv6p-qk5kvki.png", category: "All", link: "https://example.com" },
    { id: 2, title: "Disrupt Beyond Borders: Antler 全球化交流会", image: "/.figma/image/mlqnrv6p-yo8wat8.png", category: "All", link: "https://example.com" },
    { id: 3, title: "Wine Coding: 醉后写代码", image: "/.figma/image/mlqnrv6p-5mjfki0.png", category: "All", link: "https://example.com" },
    { id: 4, title: "AI Hackathon Tour 上海站", image: "/.figma/image/mlqnrv6p-ad8dqr6.png", category: "All", link: "https://example.com" },
    { id: 5, title: "Workshop: Coding For Art", image: "/.figma/image/mlqnrv6p-d2quume.png", category: "All", link: "https://example.com" },
    { id: 6, title: "2026「女子力」计划回顾 | Skyscanner 携手 Coding Girls", image: "/.figma/image/mlqnrv6p-0ganx29.png", category: "All", link: "https://example.com" },
  ],

  /* ── Filters ── */
  filters: [
    { id: "f1", name: "All", count: 30 },
    { id: "f2", name: "AI行业思考", count: 10 },
    { id: "f3", name: "异类年轻人生存法则", count: 5 },
    { id: "f4", name: "一人公司", count: 4 },
    { id: "f5", name: "增长与运营", count: 3 },
    { id: "f6", name: "Bonjour! 第一人称视角", count: 2 },
    { id: "f7", name: "人生节点", count: 2 },
    { id: "f8", name: "策划过的创意活动", count: 1 },
    { id: "f9", name: "真心安利的产品与服务", count: 1 },
  ],

  /* ── Experience ── */
  experiences: [
    { id: 1, title: "Product Manager", company: "Bonjour!", period: "2023 - Present", description: "Leading the product vision and development of the next-gen social platform for creators. Managed a cross-functional team of 10+.", initial: "B", color: "blue" },
    { id: 2, title: "Product Designer", company: "Freelance", period: "2021 - 2023", description: "Designed user interfaces and experiences for various startups in FinTech and EdTech sectors. Delivered 15+ successful projects.", initial: "F", color: "dark" },
    { id: 3, title: "Frontend Developer Intern", company: "TechCorp", period: "2020 - 2021", description: "Assisted in the development of the company's main marketing website using React and Tailwind CSS.", initial: "T", color: "purple" },
  ],

  /* ── Network ── */
  network: [
    {
      id: "n1", nickname: "Vincent", recommendation: "领先的思维导图软件，帮助用户轻松捕捉灵感，激发创意、提高生产力。",
      baseLocation: "深圳",
      links: [
        { title: "不上大学的 00 后 CEO：用数字名...", url: "https://example.com" },
        { title: "不上大学的 00 后 CEO：用数字名片...", url: "https://example.com" },
        { title: "不上大学的 00 后 CEO：用数字名...", url: "https://example.com" },
      ],
    },
    {
      id: "n2", nickname: "Vincent", recommendation: "领先的思维导图软件，帮助用户轻松捕捉灵感，激发创意、提高生产力。",
      baseLocation: "深圳",
      links: [
        { title: "不上大学的 00 后 CEO：用数字名...", url: "https://example.com" },
        { title: "不上大学的 00 后 CEO：用数字名片...", url: "https://example.com" },
        { title: "不上大学的 00 后 CEO：用数字名...", url: "https://example.com" },
      ],
    },
  ],
};
