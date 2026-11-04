import clsx from "clsx";
import { useTranslation } from "react-i18next";
import styles from "./mode-tabs.module.css";

export type Mode = "cards" | "quiz" | "alphabet";

const MODES = [
  { id: "cards", label: "tabCards" },
  { id: "quiz", label: "tabQuiz" },
  { id: "alphabet", label: "tabAlphabet" },
] as const satisfies ReadonlyArray<{ id: Mode; label: string }>;

interface IProps {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
}

/** Переключатель режимов обучения: карточки, квиз, алфавит. */
export function ModeTabs({ mode, onModeChange }: IProps) {
  const { t } = useTranslation("ModeTabs");

  return (
    <nav className={styles.root} aria-label={t("label")}>
      {MODES.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          aria-current={mode === id ? "page" : undefined}
          className={clsx(styles.tab, mode === id && styles.active)}
          onClick={() => onModeChange(id)}
        >
          {t(label)}
        </button>
      ))}
    </nav>
  );
}
