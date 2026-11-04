export const SCRIPTS = ["latin", "cyrillic"] as const;
export type Script = (typeof SCRIPTS)[number];

export const LETTER_CASES = ["upper", "lower"] as const;
export type LetterCase = (typeof LETTER_CASES)[number];

export interface ILetter {
  /** Строчная форма служит стабильным ключом для хранения прогресса. */
  id: string;
  upper: string;
  lower: string;
  latin: string;
  cyrillic: string;
  /** Порядковый номер в алфавите (с 1); по нему названы аудиофайлы. */
  number: number;
  /** Название буквы армянским письмом (այբ, բեն, …), его читает озвучка. */
  name: string;
}

export function isScript(value: unknown): value is Script {
  return SCRIPTS.some((script) => script === value);
}

export function isLetterCase(value: unknown): value is LetterCase {
  return LETTER_CASES.some((letterCase) => letterCase === value);
}
