/**
 * [INPUT]: 无外部依赖
 * [OUTPUT]: 后台与主站共享的数据类型定义
 * [POS]: types/ 的作品集数据契约
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
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

export interface StatusCard {
  id: string;
  emoji: string;
  label: string;
  titleEmoji: string;
  title: string;
  description: string;
  image?: string;
}

export interface LinkItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  url?: string;
}

export interface Work {
  id: number;
  title: string;
  image: string;
  category: string;
  link?: string;
}

export interface Filter {
  id: string;
  name: string;
  count: number;
}

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

export interface NetworkLink {
  title: string;
  url?: string;
  image?: string;
}

export interface NetworkPartnerType {
  id: string;
  label: string;
}

export interface NetworkPerson {
  id: string;
  nickname: string;
  recommendation: string;
  baseLocation: string;
  links: NetworkLink[];
  partnerTypeIds: string[];
  avatar?: string;
  tags: string[];
}

export interface PortfolioData {
  hero: HeroData;
  statusCards: StatusCard[];
  socialLinks: LinkItem[];
  aiProducts: LinkItem[];
  works: Work[];
  filters: Filter[];
  experiences: Experience[];
  networkPartnerTypes: NetworkPartnerType[];
  network: NetworkPerson[];
}
