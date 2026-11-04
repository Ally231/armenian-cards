import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";
import i18n from "@/infrastructure/i18n";
import { DEFAULT_LOCALE } from "@/shared/types/locale";

afterEach(async () => {
  cleanup();
  // Сохранённый язык и прогресс не должны переходить из теста в тест; i18next — один на все тесты.
  window.localStorage.clear();
  await i18n.changeLanguage(DEFAULT_LOCALE);
});
