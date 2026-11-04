import type App from "@/app/app/locales/App.ru.json";
import type AlphabetTable from "@/components/alphabet-table/locales/AlphabetTable.ru.json";
import type CardsMode from "@/components/cards-mode/locales/CardsMode.ru.json";
import type ModeTabs from "@/components/mode-tabs/locales/ModeTabs.ru.json";
import type QuizMode from "@/components/quiz-mode/locales/QuizMode.ru.json";
import type SettingsBar from "@/components/settings-bar/locales/SettingsBar.ru.json";
import type SpeakButtons from "@/components/speak-buttons/locales/SpeakButtons.ru.json";

// Русские файлы задают набор ключей каждого пространства имён; t("…") проверяется по ним.
// Новый компонент с переводами нужно добавить и сюда.
declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "App";
    resources: {
      App: typeof App;
      AlphabetTable: typeof AlphabetTable;
      CardsMode: typeof CardsMode;
      ModeTabs: typeof ModeTabs;
      QuizMode: typeof QuizMode;
      SettingsBar: typeof SettingsBar;
      SpeakButtons: typeof SpeakButtons;
    };
  }
}
