/**
 * [INPUT]: 无外部依赖
 * [OUTPUT]: 所有数据类型定义
 * [POS]: types/ 的唯一文件，定义整个系统的数据契约
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

/* ── Hero ── */
export interface HeroTag {
  emoji: string;
  label: string;
}

export interface HeroIntroLine {
  emoji: string;
  text: string;
}

export interface HeroNavLink {
  label: string;
  href: string;
}

export interface HeroData {
  profileImage: string;
  name: string;
  badge: string;
  introLines: HeroIntroLine[];
  location: string;
  tags: HeroTag[];
  navLinks: HeroNavLink[];
  verifiedTitle: string;
  coffeeChatText: string;
  wechatQrCode?: string;
  feishuLink?: string;
}

/* ── Status ── */
export interface StatusCard {
  id: string;
  emoji: string;
  label: string;
  titleEmoji: string;
  title: string;
  description: string;
  image?: string;
}

/* ── Social & AI (同构) ── */
export interface LinkItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  url?: string;
}

/* ── Works ── */
export interface Work {
  id: number;
  title: string;
  image: string;
  category: string;
  link?: string;
}

/* ── Filters ── */
export interface Filter {
  id: string;
  name: string;
  count: number;
}

/* ── Experience ── */
export type ExperienceColor = "blue" | "dark" | "purple";

export interface Experience {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string;
  initial: string;
  color: ExperienceColor;
  logo?: string;
}

/* ── Network ── */
export interface NetworkLink {
  title: string;
  url: string;
}

export interface NetworkPerson {
  id: string;
  nickname: string;
  recommendation: string;
  baseLocation: string;
  links: NetworkLink[];
  avatar?: string;
}

/* ── Store 全量 ── */
export interface PortfolioData {
  hero: HeroData;
  statusCards: StatusCard[];
  socialLinks: LinkItem[];
  aiProducts: LinkItem[];
  works: Work[];
  filters: Filter[];
  experiences: Experience[];
  network: NetworkPerson[];
}
