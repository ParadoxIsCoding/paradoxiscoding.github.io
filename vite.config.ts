import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
  base: "/",                // GitHub user/org pages
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "docs",         // GitHub Pages reads from /docs on main
    emptyOutDir: true,
  },
});
