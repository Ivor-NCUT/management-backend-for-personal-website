import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: "/",
  build: { sourcemap: "hidden" },
  server: { port: 5174 },
  plugins: [tailwindcss(), react(), tsconfigPaths()],
});
