import { describe, expect, it } from "vitest";
import { buildResources, type Dictionary } from "@/infrastructure/i18n/resources";

const files = import.meta.glob<Dictionary>("/src/**/*.{ru,en}.json", {
  eager: true,
  import: "default",
});

const placeholders = (text: string) => text.match(/{{\w+}}/g)?.sort() ?? [];

describe("buildResources", () => {
  it("should use the file name as the namespace", () => {
    const resources = buildResources({ "/src/components/Foo/Foo.ru.json": { hello: "привет" } });
    expect(resources.ru.Foo).toEqual({ hello: "привет" });
  });

  it("should reject files that do not follow the {Component}.{locale}.json pattern", () => {
    expect(() => buildResources({ "/src/components/Foo/foo.json": {} })).toThrow();
  });
});

describe("translation files", () => {
  const resources = buildResources(files);

  it("should give every Russian namespace an English counterpart", () => {
    expect(Object.keys(resources.en).sort()).toEqual(Object.keys(resources.ru).sort());
  });

  it("should keep the same keys in both languages", () => {
    const mismatched = Object.keys(resources.ru).filter((ns) => {
      const ruKeys = Object.keys(resources.ru[ns] ?? {}).sort();
      const enKeys = Object.keys(resources.en[ns] ?? {}).sort();
      return JSON.stringify(ruKeys) !== JSON.stringify(enKeys);
    });
    expect(mismatched).toEqual([]);
  });

  it("should keep the same interpolation placeholders in both languages", () => {
    const mismatched = Object.entries(resources.ru).flatMap(([ns, dict]) =>
      Object.entries(dict)
        .filter(([key, text]) => {
          const en = resources.en[ns]?.[key] ?? "";
          return JSON.stringify(placeholders(text)) !== JSON.stringify(placeholders(en));
        })
        .map(([key]) => `${ns}.${key}`),
    );
    expect(mismatched).toEqual([]);
  });

  it("should keep translation files in the locales folder of the component with the same name", () => {
    const kebab = (name: string) => name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
    const misplaced = Object.keys(files).filter((path) => {
      // Ожидается <папка-компонента>/locales/<Компонент>.<язык>.json, например cards-mode/locales/CardsMode.ru.json.
      const match = /\/([^/]+)\/locales\/([^/]+)\.(ru|en)\.json$/.exec(path);
      if (!match) return true;
      const [, folder, name] = match;
      return !name || folder !== kebab(name);
    });
    expect(misplaced).toEqual([]);
  });
});
