import { useTranslation } from "react-i18next";
import { isLetterCase, isScript } from "@/domain/alphabet/letter";
import type { ISettings } from "@/domain/settings/settings";
import { useLocale } from "@/infrastructure/i18n/locale-context";
import { isLocale } from "@/shared/types/locale";
import styles from "./settings-bar.module.css";

interface IProps {
  settings: ISettings;
  onSettingsChange: (settings: ISettings) => void;
}

/** Язык интерфейса (через LocaleProvider), письмо транслитерации и регистр букв. */
export function SettingsBar({ settings, onSettingsChange }: IProps) {
  const { t } = useTranslation("SettingsBar");
  const { locale, setLocale } = useLocale();

  return (
    <div className={styles.root}>
      <label>
        {t("language")}{" "}
        <select
          value={locale}
          onChange={(e) => {
            if (isLocale(e.target.value)) setLocale(e.target.value);
          }}
        >
          {/* Названия языков пишутся на самом языке и не переводятся. */}
          <option value="ru">Русский</option>
          <option value="en">English</option>
        </select>
      </label>
      <label>
        {t("script")}{" "}
        <select
          value={settings.script}
          onChange={(e) => {
            if (isScript(e.target.value)) onSettingsChange({ ...settings, script: e.target.value });
          }}
        >
          <option value="latin">{t("scriptLatin")}</option>
          <option value="cyrillic">{t("scriptCyrillic")}</option>
        </select>
      </label>
      <label>
        {t("letterCase")}{" "}
        <select
          value={settings.letterCase}
          onChange={(e) => {
            if (isLetterCase(e.target.value)) {
              onSettingsChange({ ...settings, letterCase: e.target.value });
            }
          }}
        >
          <option value="upper">{t("caseUpper")}</option>
          <option value="lower">{t("caseLower")}</option>
        </select>
      </label>
    </div>
  );
}
