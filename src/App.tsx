/**
 * [INPUT]: 依赖 react-router-dom, layout/Layout, 所有 section editors
 * [OUTPUT]: 对外提供 App 根组件
 * [POS]: 应用根组件，路由配置
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import HeroEditor from "@/components/sections/HeroEditor";
import StatusEditor from "@/components/sections/StatusEditor";
import SocialLinksEditor from "@/components/sections/SocialLinksEditor";
import AIProductsEditor from "@/components/sections/AIProductsEditor";
import WorksEditor from "@/components/sections/WorksEditor";
import FiltersEditor from "@/components/sections/FiltersEditor";
import ExperienceEditor from "@/components/sections/ExperienceEditor";
import NetworkEditor from "@/components/sections/NetworkEditor";

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/hero" replace />} />
          <Route path="/hero" element={<HeroEditor />} />
          <Route path="/status" element={<StatusEditor />} />
          <Route path="/social" element={<SocialLinksEditor />} />
          <Route path="/ai-products" element={<AIProductsEditor />} />
          <Route path="/works" element={<WorksEditor />} />
          <Route path="/filters" element={<FiltersEditor />} />
          <Route path="/experience" element={<ExperienceEditor />} />
          <Route path="/network" element={<NetworkEditor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
