import { createContext, useContext } from "react";
import type { Locale } from "@/shared/types/locale";

export interface ILocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const LocaleContext = createContext<ILocaleContextValue | null>(null);

/** Текущий язык интерфейса и способ его сменить. Единственный источник языка в приложении. */
export function useLocale(): ILocaleContextValue {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("useLocale must be used inside <LocaleProvider>");
  return value;
}
