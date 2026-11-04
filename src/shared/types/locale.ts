// Языки интерфейса. Тип нужен и предметным данным (переводы ассоциаций), и i18n, поэтому живёт в shared.
export const LOCALES = ["ru", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "ru";

export function isLocale(value: unknown): value is Locale {
  return LOCALES.some((locale) => locale === value);
}
