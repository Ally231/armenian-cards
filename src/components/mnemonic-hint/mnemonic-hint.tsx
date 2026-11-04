import type { ILetter, Script } from "@/domain/alphabet/letter";
import { mnemonicOf } from "@/domain/alphabet/mnemonics";
import { useLocale } from "@/infrastructure/i18n/locale-context";
import styles from "./mnemonic-hint.module.css";

interface IProps {
  letter: ILetter;
  script: Script;
}

export function MnemonicHint({ letter, script }: IProps) {
  const { locale } = useLocale();
  const mnemonic = mnemonicOf(letter.id);
  if (!mnemonic) return null;

  return (
    <span className={styles.root}>
      <span className={styles.word}>
        <span lang="hy" className={styles.armenian}>
          {mnemonic.word}
        </span>{" "}
        ({mnemonic.wordTranslit[script]}) — {mnemonic.meaning[locale]}
      </span>
      {mnemonic.shape && <span className={styles.shape}>{mnemonic.shape[locale]}</span>}
    </span>
  );
}
