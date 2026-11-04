import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { LOCALE_KEY } from "@/infrastructure/localStorage/keys";
import { usePersistentState } from "@/infrastructure/localStorage/use-persistent-state";
import { isLocale } from "@/shared/types/locale";
import { readInitialLocale } from "./initial-locale";
import { LocaleContext } from "./locale-context";

interface IProps {
  children: ReactNode;
}

/** Хранит выбранный язык, переключает на него i18next и атрибут lang страницы. */
export function LocaleProvider({ children }: IProps) {
  const { i18n } = useTranslation();
  // Начальный язык вычисляем один раз: в нём есть миграция из старого формата настроек.
  const [initialLocale] = useState(readInitialLocale);
  const [locale, setLocale] = usePersistentState(LOCALE_KEY, initialLocale, isLocale);

  useEffect(() => {
    void i18n.changeLanguage(locale);
    document.documentElement.lang = locale;
  }, [i18n, locale]);

  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
