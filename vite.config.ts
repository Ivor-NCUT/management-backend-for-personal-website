import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  build: { sourcemap: "hidden" },
  plugins: [tailwindcss(), react(), tsconfigPaths()],
});
