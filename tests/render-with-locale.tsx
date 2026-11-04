import type { ReactElement } from "react";
import { render } from "@testing-library/react";
import { LocaleProvider } from "@/infrastructure/i18n/locale-provider";

/** Рендер внутри LocaleProvider: компоненты берут язык из useLocale(). Язык задаётся ключом в localStorage. */
export function renderWithLocale(ui: ReactElement) {
  return render(<LocaleProvider>{ui}</LocaleProvider>);
}
