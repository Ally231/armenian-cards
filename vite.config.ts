import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  // GitHub Pages отдаёт сайт из подпапки /armenian-cards/; путь задаёт workflow деплоя,
  // локально и в тестах остаётся корень.
  base: process.env.BASE_PATH ?? "/",
  plugins: [react()],
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    css: { modules: { classNameStrategy: "non-scoped" } },
  },
});
