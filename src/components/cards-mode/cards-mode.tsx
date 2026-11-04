import { useState } from "react";
import { useTranslation } from "react-i18next";
import { LETTERS } from "@/domain/alphabet/letters";
import { glyphOf, transliterationOf } from "@/domain/alphabet/transliteration";
import { applyAnswer, pickNext, type Progress } from "@/domain/learning/progress";
import type { ISettings } from "@/domain/settings/settings";
import { SpeakButtons } from "@/components/speak-buttons/speak-buttons";
import { MnemonicHint } from "@/components/mnemonic-hint/mnemonic-hint";
import styles from "./cards-mode.module.css";

interface IProps {
  settings: ISettings;
  progress: Progress;
  onProgressChange: (progress: Progress) => void;
}

export function CardsMode({ settings, progress, onProgressChange }: IProps) {
  const { t } = useTranslation("CardsMode");
  const [letter, setLetter] = useState(() => pickNext(LETTERS, progress, Math.random));
  const [flipped, setFlipped] = useState(false);

  const answer = (correct: boolean) => {
    const next = applyAnswer(progress, letter.id, correct);
    onProgressChange(next);
    setLetter(pickNext(LETTERS, next, Math.random, letter.id));
    setFlipped(false);
  };

  return (
    <section className={styles.root}>
      <button
        type="button"
        className={styles.card}
        onClick={() => setFlipped((value) => !value)}
        aria-live="polite"
      >
        {flipped ? (
          <span className={styles.answer}>{transliterationOf(letter, settings.script)}</span>
        ) : (
          <span className={styles.glyph} lang="hy">
            {glyphOf(letter, settings.letterCase)}
          </span>
        )}
      </button>
      <SpeakButtons letter={letter} />
      {flipped && (
        <div className={styles.mnemonic}>
          <MnemonicHint letter={letter} script={settings.script} />
        </div>
      )}
      {flipped ? (
        <div className={styles.actions}>
          <button type="button" className={styles.bad} onClick={() => answer(false)}>
            {t("dontKnow")}
          </button>
          <button type="button" className={styles.good} onClick={() => answer(true)}>
            {t("know")}
          </button>
        </div>
      ) : (
        <p className={styles.hint}>{t("flipHint")}</p>
      )}
    </section>
  );
}
