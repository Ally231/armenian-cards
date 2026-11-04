import { useState } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import type { ILetter } from "@/domain/alphabet/letter";
import { LETTERS } from "@/domain/alphabet/letters";
import { transliterationOf } from "@/domain/alphabet/transliteration";
import { getBox, type Progress } from "@/domain/learning/progress";
import type { ISettings } from "@/domain/settings/settings";
import { SpeakButtons } from "@/components/speak-buttons/speak-buttons";
import { MnemonicHint } from "@/components/mnemonic-hint/mnemonic-hint";
import { COMPACT_QUERY } from "@/shared/constants/media";
import { useMediaQuery } from "@/shared/hooks/use-media-query";
import styles from "./alphabet-table.module.css";

interface IProps {
  settings: ISettings;
  progress: Progress;
}

type DetailColumn = "name" | "sound" | "mnemonic" | "box" | "audio";

const DETAIL_COLUMNS = [
  { id: "name", label: "colName" },
  { id: "sound", label: "colSound" },
  { id: "mnemonic", label: "colMnemonic" },
  { id: "box", label: "colBox" },
  { id: "audio", label: "colAudio" },
] as const satisfies ReadonlyArray<{ id: DetailColumn; label: string }>;

export function AlphabetTable({ settings, progress }: IProps) {
  const { t } = useTranslation("AlphabetTable");
  // На узких экранах все семь столбцов не помещаются: показываем буквы и один выбранный столбец.
  const compact = useMediaQuery(COMPACT_QUERY);
  const [detail, setDetail] = useState<DetailColumn>("name");

  const detailCell = (column: DetailColumn, letter: ILetter) => {
    switch (column) {
      case "name":
        return (
          <td key={column} lang="hy">
            {letter.name}
          </td>
        );
      case "sound":
        return <td key={column}>{transliterationOf(letter, settings.script)}</td>;
      case "mnemonic":
        return (
          <td key={column} className={styles.mnemonic}>
            <MnemonicHint letter={letter} script={settings.script} />
          </td>
        );
      case "box":
        return <td key={column}>{getBox(progress, letter.id)} / 3</td>;
      case "audio":
        return (
          <td key={column}>
            <SpeakButtons letter={letter} />
          </td>
        );
    }
  };

  const changeDetail = (value: string) => {
    const column = DETAIL_COLUMNS.find((c) => c.id === value);
    if (column) setDetail(column.id);
  };

  const columns: readonly DetailColumn[] = compact ? [detail] : DETAIL_COLUMNS.map((c) => c.id);

  return (
    <table className={clsx(styles.table, compact && styles.compact)}>
      <thead>
        <tr>
          <th scope="col">{t("colUpper")}</th>
          <th scope="col">{t("colLower")}</th>
          {compact ? (
            <th scope="col">
              <select
                className={styles.detailSelect}
                aria-label={t("colDetail")}
                value={detail}
                onChange={(e) => changeDetail(e.target.value)}
              >
                {DETAIL_COLUMNS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {t(c.label)}
                  </option>
                ))}
              </select>
            </th>
          ) : (
            DETAIL_COLUMNS.map((c) => (
              <th key={c.id} scope="col">
                {t(c.label)}
              </th>
            ))
          )}
        </tr>
      </thead>
      <tbody>
        {LETTERS.map((letter) => (
          <tr key={letter.id}>
            <td className={styles.glyph} lang="hy">
              {letter.upper}
            </td>
            <td className={styles.glyph} lang="hy">
              {letter.lower}
            </td>
            {columns.map((column) => detailCell(column, letter))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
