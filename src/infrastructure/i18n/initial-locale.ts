import { LOCALE_KEY, SETTINGS_KEY } from "@/infrastructure/localStorage/keys";
import { readStorage } from "@/infrastructure/localStorage/storage";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/shared/types/locale";

interface ILegacySettings {
  locale: Locale;
}

function isLegacySettings(value: unknown): value is ILegacySettings {
  return (
    typeof value === "object" && value !== null && isLocale((value as { locale?: unknown }).locale)
  );
}

/**
 * Язык при запуске: сохранённый выбор, иначе язык из старого формата настроек
 * (раньше он хранился вместе с ними), иначе язык по умолчанию.
 */
export function readInitialLocale(): Locale {
  const saved = readStorage<Locale | null>(LOCALE_KEY, null, isLocale);
  if (saved) return saved;
  const legacy = readStorage<ILegacySettings | null>(SETTINGS_KEY, null, isLegacySettings);
  return legacy?.locale ?? DEFAULT_LOCALE;
}
