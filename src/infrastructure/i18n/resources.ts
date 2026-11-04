import { isLocale, type Locale } from "@/shared/types/locale";

export type Dictionary = Readonly<Record<string, string>>;
export type Resources = Record<Locale, Record<string, Dictionary>>;

const FILE_PATTERN = /([^/]+)\.([a-z]{2})\.json$/;

/**
 * Собирает ресурсы i18next из файлов {Компонент}.{язык}.json.
 * Имя файла становится пространством имён: CardsMode.ru.json → namespace «CardsMode».
 */
export function buildResources(files: Readonly<Record<string, Dictionary>>): Resources {
  const resources: Resources = { ru: {}, en: {} };
  for (const [path, dictionary] of Object.entries(files)) {
    const match = FILE_PATTERN.exec(path);
    if (!match) throw new Error(`Unexpected translation file name: ${path}`);
    const [, namespace, locale] = match;
    if (!namespace || !isLocale(locale)) throw new Error(`Unknown locale in file name: ${path}`);
    resources[locale][namespace] = dictionary;
  }
  return resources;
}
