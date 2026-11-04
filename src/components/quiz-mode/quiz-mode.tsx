import { useState } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import type { ILetter } from "@/domain/alphabet/letter";
import { LETTERS } from "@/domain/alphabet/letters";
import { glyphOf, transliterationOf } from "@/domain/alphabet/transliteration";
import { applyAnswer, pickNext, type Progress } from "@/domain/learning/progress";
import { buildOptions } from "@/domain/learning/quiz";
import type { ISettings } from "@/domain/settings/settings";
import { SpeakButtons } from "@/components/speak-buttons/speak-buttons";
import { MnemonicHint } from "@/components/mnemonic-hint/mnemonic-hint";
import styles from "./quiz-mode.module.css";

type Direction = "toTranslit" | "toLetter";

interface IQuestion {
  target: ILetter;
  options: ILetter[];
}

function createQuestion(progress: Progress, excludeId?: string): IQuestion {
  const target = pickNext(LETTERS, progress, Math.random, excludeId);
  return { target, options: buildOptions(LETTERS, target, Math.random) };
}

interface IProps {
  settings: ISettings;
  progress: Progress;
  onProgressChange: (progress: Progress) => void;
}

export function QuizMode({ settings, progress, onProgressChange }: IProps) {
  const { t } = useTranslation("QuizMode");
  const [direction, setDirection] = useState<Direction>("toTranslit");
  const [question, setQuestion] = useState(() => createQuestion(progress));
  const [pickedId, setPickedId] = useState<string | null>(null);

  const { target, options } = question;
  const answered = pickedId !== null;

  const promptOf = (letter: ILetter) =>
    direction === "toTranslit"
      ? glyphOf(letter, settings.letterCase)
      : transliterationOf(letter, settings.script);
  const optionLabelOf = (letter: ILetter) =>
    direction === "toTranslit"
      ? transliterationOf(letter, settings.script)
      : glyphOf(letter, settings.letterCase);

  const choose = (letter: ILetter) => {
    if (answered) return;
    setPickedId(letter.id);
    onProgressChange(applyAnswer(progress, target.id, letter.id === target.id));
  };

  const next = () => {
    setQuestion(createQuestion(progress, target.id));
    setPickedId(null);
  };

  return (
    <section className={styles.root}>
      <div className={styles.modes} role="group" aria-label={t("quizDirection")}>
        <button
          type="button"
          aria-pressed={direction === "toTranslit"}
          onClick={() => setDirection("toTranslit")}
        >
          {t("quizToTranslit")}
        </button>
        <button
          type="button"
          aria-pressed={direction === "toLetter"}
          onClick={() => setDirection("toLetter")}
        >
          {t("quizToLetter")}
        </button>
      </div>

      <p className={styles.question}>
        {direction === "toTranslit" ? t("quizWhichSound") : t("quizWhichLetter")}
      </p>
      <div className={styles.prompt} lang={direction === "toTranslit" ? "hy" : undefined}>
        {promptOf(target)}
      </div>

      <div className={styles.options}>
        {options.map((letter) => (
          <button
            key={letter.id}
            type="button"
            lang={direction === "toLetter" ? "hy" : undefined}
            disabled={answered}
            className={clsx(
              styles.option,
              answered && letter.id === target.id && styles.correct,
              answered && letter.id === pickedId && letter.id !== target.id && styles.wrong,
            )}
            onClick={() => choose(letter)}
          >
            {optionLabelOf(letter)}
          </button>
        ))}
      </div>

      <div role="status" className={styles.feedback}>
        {answered && pickedId === target.id && t("correct")}
        {answered && pickedId !== target.id && t("wrong", { answer: optionLabelOf(target) })}
      </div>

      {/* Ассоциация только после ответа: до него слово и подсказка выдали бы правильный вариант. */}
      {answered && (
        <div className={styles.mnemonic}>
          <MnemonicHint letter={target} script={settings.script} />
        </div>
      )}

      {answered && <SpeakButtons letter={target} />}

      {answered && (
        <button type="button" className={styles.next} onClick={next}>
          {t("next")}
        </button>
      )}
    </section>
  );
}
