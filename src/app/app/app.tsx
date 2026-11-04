import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AlphabetTable } from "@/components/alphabet-table/alphabet-table";
import { CardsMode } from "@/components/cards-mode/cards-mode";
import { ModeTabs, type Mode } from "@/components/mode-tabs/mode-tabs";
import { QuizMode } from "@/components/quiz-mode/quiz-mode";
import { SettingsBar } from "@/components/settings-bar/settings-bar";
import { LETTERS } from "@/domain/alphabet/letters";
import { countLearned, isProgress, type Progress } from "@/domain/learning/progress";
import { DEFAULT_SETTINGS, isSettings } from "@/domain/settings/settings";
import { PROGRESS_KEY, SETTINGS_KEY } from "@/infrastructure/localStorage/keys";
import { usePersistentState } from "@/infrastructure/localStorage/use-persistent-state";
import { Header } from "@/shared/ui/header/header";
import styles from "./app.module.css";

const EMPTY_PROGRESS: Progress = {};

/** Корень приложения: хранит настройки, прогресс и режим и собирает страницу из компонентов. */
export function App() {
  const { t } = useTranslation("App");
  const [settings, setSettings] = usePersistentState(SETTINGS_KEY, DEFAULT_SETTINGS, isSettings);
  const [progress, setProgress] = usePersistentState(PROGRESS_KEY, EMPTY_PROGRESS, isProgress);
  const [mode, setMode] = useState<Mode>("cards");

  const modeProps = { settings, progress, onProgressChange: setProgress };

  return (
    <div className={styles.app}>
      <Header title={t("title")} subtitle={t("subtitle")}>
        <p className={styles.stats}>
          {t("learned", { learned: countLearned(LETTERS, progress), total: LETTERS.length })}{" "}
          <button type="button" className={styles.link} onClick={() => setProgress({})}>
            {t("reset")}
          </button>
        </p>
        <SettingsBar settings={settings} onSettingsChange={setSettings} />
        <ModeTabs mode={mode} onModeChange={setMode} />
      </Header>

      <main>
        {mode === "cards" && <CardsMode {...modeProps} />}
        {mode === "quiz" && <QuizMode {...modeProps} />}
        {mode === "alphabet" && <AlphabetTable settings={settings} progress={progress} />}
      </main>
    </div>
  );
}
