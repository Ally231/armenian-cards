import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist", "coverage"] },
  js.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    extends: [...tseslint.configs.recommendedTypeChecked, jsxA11y.flatConfigs.recommended],
    languageOptions: { parserOptions: { projectService: true } },
    plugins: { "react-hooks": reactHooks, "react-refresh": reactRefresh },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "@typescript-eslint/consistent-type-imports": "error",
    },
  },
  {
    // shared — полностью независимый код: из остального проекта он ничего не импортирует.
    files: ["src/shared/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/*", "!@/shared", "!@/shared/**"],
              message:
                "src/shared не должен зависеть от остального проекта: импортируйте только из @/shared.",
            },
            {
              group: ["../../*", "../../../*"],
              message: "Выход из src/shared запрещён: используйте импорты внутри @/shared.",
            },
          ],
        },
      ],
    },
  },
  {
    // infrastructure — нижний слой: интерфейс и сборку приложения он не знает,
    // иначе замена хранилища потянула бы за собой правки компонентов.
    files: ["src/infrastructure/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/app", "@/app/**", "@/components", "@/components/**"],
              message:
                "src/infrastructure не должен зависеть от app и components: зависимость идёт в обратную сторону.",
            },
            {
              group: [
                "../../app/**",
                "../../components/**",
                "../../../app/**",
                "../../../components/**",
              ],
              message:
                "src/infrastructure не должен зависеть от app и components: зависимость идёт в обратную сторону.",
            },
          ],
        },
      ],
    },
  },
  {
    // domain — правила предметной области: чистый TypeScript без интерфейса, хранилищ и библиотек UI.
    files: ["src/domain/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "@/app",
                "@/app/**",
                "@/components",
                "@/components/**",
                "@/infrastructure",
                "@/infrastructure/**",
                "../../app/**",
                "../../components/**",
                "../../infrastructure/**",
              ],
              message:
                "src/domain зависит только от себя и @/shared: интерфейс и инфраструктура подключаются снаружи.",
            },
            {
              group: ["react", "react-dom", "react-dom/*", "react-i18next", "i18next"],
              message: "src/domain не использует React и i18n: это чистая логика и данные.",
            },
          ],
        },
      ],
    },
  },
  {
    // components не знают о корне приложения: App собирает их, а не наоборот.
    files: ["src/components/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/app", "@/app/**", "../../app/**"],
              message:
                "Компоненты не импортируют app: передайте нужное пропсами или через провайдер.",
            },
          ],
        },
      ],
    },
  },
  prettier,
);
