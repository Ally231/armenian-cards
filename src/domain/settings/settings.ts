import { isLetterCase, isScript, type LetterCase, type Script } from "@/domain/alphabet/letter";

/** Настройки отображения букв. Язык интерфейса хранится отдельно (LocaleProvider). */
export interface ISettings {
  script: Script;
  letterCase: LetterCase;
}

export const DEFAULT_SETTINGS: ISettings = { script: "cyrillic", letterCase: "upper" };

// Лишние поля не мешают: в старых сохранениях был ещё и locale, письмо и регистр из них должны читаться.
export function isSettings(value: unknown): value is ISettings {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return isScript(v.script) && isLetterCase(v.letterCase);
}
