/**
 * [INPUT]: 依赖 zustand, @/types, @/data/defaults
 * [OUTPUT]: 对外提供 usePortfolioStore
 * [POS]: stores/ 的唯一 store，管理全部作品集数据的 CRUD
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_DATA } from "@/data/defaults";
import type {
  PortfolioData,
  HeroData,
  StatusCard,
  LinkItem,
  Work,
  Filter,
  Experience,
  NetworkPerson,
} from "@/types";

const STORAGE_KEY = "portfolio-data";

interface PortfolioStore extends PortfolioData {
  /* ── Hero ── */
  setHero: (data: Partial<HeroData>) => void;

  /* ── Status ── */
  updateStatusCard: (id: string, data: Partial<StatusCard>) => void;

  /* ── Social Links ── */
  setSocialLinks: (items: LinkItem[]) => void;
  addSocialLink: (item: LinkItem) => void;
  updateSocialLink: (id: string, data: Partial<LinkItem>) => void;
  deleteSocialLink: (id: string) => void;

  /* ── AI Products ── */
  setAiProducts: (items: LinkItem[]) => void;
  addAiProduct: (item: LinkItem) => void;
  updateAiProduct: (id: string, data: Partial<LinkItem>) => void;
  deleteAiProduct: (id: string) => void;

  /* ── Works ── */
  setWorks: (items: Work[]) => void;
  addWork: (item: Work) => void;
  updateWork: (id: number, data: Partial<Work>) => void;
  deleteWork: (id: number) => void;

  /* ── Filters ── */
  setFilters: (items: Filter[]) => void;
  addFilter: (item: Filter) => void;
  updateFilter: (id: string, data: Partial<Filter>) => void;
  deleteFilter: (id: string) => void;

  /* ── Experience ── */
  setExperiences: (items: Experience[]) => void;
  addExperience: (item: Experience) => void;
  updateExperience: (id: number, data: Partial<Experience>) => void;
  deleteExperience: (id: number) => void;

  /* ── Network ── */
  setNetwork: (items: NetworkPerson[]) => void;
  addNetworkPerson: (item: NetworkPerson) => void;
  updateNetworkPerson: (id: string, data: Partial<NetworkPerson>) => void;
  deleteNetworkPerson: (id: string) => void;

  /* ── Bulk ── */
  exportData: () => PortfolioData;
  importData: (data: PortfolioData) => void;
  resetToDefaults: () => void;
}

/* ── 通用数组 CRUD 工厂 ── */
const arrayUpdate = <T extends { id: string | number }>(
  arr: T[],
  id: string | number,
  patch: Partial<T>,
): T[] => arr.map((item) => (item.id === id ? { ...item, ...patch } : item));

const arrayDelete = <T extends { id: string | number }>(
  arr: T[],
  id: string | number,
): T[] => arr.filter((item) => item.id !== id);

export const usePortfolioStore = create<PortfolioStore>()(
  persist(
    (set, get) => ({
      ...DEFAULT_DATA,

      /* ── Hero ── */
      setHero: (data) => set((s) => ({ hero: { ...s.hero, ...data } })),

      /* ── Status ── */
      updateStatusCard: (id, data) =>
        set((s) => ({ statusCards: arrayUpdate(s.statusCards, id, data) })),

      /* ── Social Links ── */
      setSocialLinks: (items) => set({ socialLinks: items }),
      addSocialLink: (item) =>
        set((s) => ({ socialLinks: [...s.socialLinks, item] })),
      updateSocialLink: (id, data) =>
        set((s) => ({ socialLinks: arrayUpdate(s.socialLinks, id, data) })),
      deleteSocialLink: (id) =>
        set((s) => ({ socialLinks: arrayDelete(s.socialLinks, id) })),

      /* ── AI Products ── */
      setAiProducts: (items) => set({ aiProducts: items }),
      addAiProduct: (item) =>
        set((s) => ({ aiProducts: [...s.aiProducts, item] })),
      updateAiProduct: (id, data) =>
        set((s) => ({ aiProducts: arrayUpdate(s.aiProducts, id, data) })),
      deleteAiProduct: (id) =>
        set((s) => ({ aiProducts: arrayDelete(s.aiProducts, id) })),

      /* ── Works ── */
      setWorks: (items) => set({ works: items }),
      addWork: (item) => set((s) => ({ works: [...s.works, item] })),
      updateWork: (id, data) =>
        set((s) => ({ works: arrayUpdate(s.works, id, data) })),
      deleteWork: (id) => set((s) => ({ works: arrayDelete(s.works, id) })),

      /* ── Filters ── */
      setFilters: (items) => set({ filters: items }),
      addFilter: (item) => set((s) => ({ filters: [...s.filters, item] })),
      updateFilter: (id, data) =>
        set((s) => ({ filters: arrayUpdate(s.filters, id, data) })),
      deleteFilter: (id) =>
        set((s) => ({ filters: arrayDelete(s.filters, id) })),

      /* ── Experience ── */
      setExperiences: (items) => set({ experiences: items }),
      addExperience: (item) =>
        set((s) => ({ experiences: [...s.experiences, item] })),
      updateExperience: (id, data) =>
        set((s) => ({ experiences: arrayUpdate(s.experiences, id, data) })),
      deleteExperience: (id) =>
        set((s) => ({ experiences: arrayDelete(s.experiences, id) })),

      /* ── Network ── */
      setNetwork: (items) => set({ network: items }),
      addNetworkPerson: (item) =>
        set((s) => ({ network: [...s.network, item] })),
      updateNetworkPerson: (id, data) =>
        set((s) => ({ network: arrayUpdate(s.network, id, data) })),
      deleteNetworkPerson: (id) =>
        set((s) => ({ network: arrayDelete(s.network, id) })),

      /* ── Bulk ── */
      exportData: () => {
        const s = get();
        return {
          hero: s.hero,
          statusCards: s.statusCards,
          socialLinks: s.socialLinks,
          aiProducts: s.aiProducts,
          works: s.works,
          filters: s.filters,
          experiences: s.experiences,
          network: s.network,
        };
      },
      importData: (data) => set(data),
      resetToDefaults: () => set(DEFAULT_DATA),
    }),
    { name: STORAGE_KEY },
  ),
);
