import { useTranslation } from "react-i18next";
import type { ILetter } from "@/domain/alphabet/letter";
import { playLetterAudio } from "@/infrastructure/audio/letter-audio";
import styles from "./speak-buttons.module.css";

interface IProps {
  letter: ILetter;
}

export function SpeakButtons({ letter }: IProps) {
  const { t } = useTranslation("SpeakButtons");

  return (
    <span className={styles.root}>
      <button
        type="button"
        className={styles.button}
        onClick={() => playLetterAudio(letter, "name")}
      >
        🔊 {t("listenName")}
      </button>
      <button
        type="button"
        className={styles.button}
        onClick={() => playLetterAudio(letter, "sound")}
      >
        🔊 {t("listenSound")}
      </button>
    </span>
  );
}
