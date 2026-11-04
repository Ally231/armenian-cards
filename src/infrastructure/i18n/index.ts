import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { DEFAULT_LOCALE } from "@/shared/types/locale";
import { readInitialLocale } from "./initial-locale";
import { buildResources, type Dictionary } from "./resources";

// Переводы лежат рядом с компонентами; Vite подхватывает все {Компонент}.{язык}.json при сборке.
const files = import.meta.glob<Dictionary>("/src/**/*.{ru,en}.json", {
  eager: true,
  import: "default",
});
const resources = buildResources(files);

void i18n.use(initReactI18next).init({
  resources,
  ns: Object.keys(resources.ru),
  defaultNS: "App",
  // Язык берётся из сохранённого выбора, чтобы первый кадр не мигал языком по умолчанию.
  lng: readInitialLocale(),
  fallbackLng: DEFAULT_LOCALE,
  initAsync: false,
  // React сам экранирует значения.
  interpolation: { escapeValue: false },
});

export default i18n;
