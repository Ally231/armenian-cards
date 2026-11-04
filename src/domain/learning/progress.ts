import type { ILetter } from "@/domain/alphabet/letter";

export type Box = 1 | 2 | 3;
export type Progress = Readonly<Record<string, Box>>;

// Чем ниже коробка, тем чаще буква попадается: новые и забытые буквы повторяются активнее.
const BOX_WEIGHTS: Readonly<Record<Box, number>> = { 1: 6, 2: 3, 3: 1 };

export function getBox(progress: Progress, id: string): Box {
  return progress[id] ?? 1;
}

export function applyAnswer(progress: Progress, id: string, correct: boolean): Progress {
  const box = getBox(progress, id);
  const next: Box = correct ? (box === 1 ? 2 : 3) : 1;
  return { ...progress, [id]: next };
}

export function countLearned(letters: readonly ILetter[], progress: Progress): number {
  return letters.filter((l) => getBox(progress, l.id) === 3).length;
}

/** Выбирает следующую букву с весами по коробкам; последнюю показанную пропускает. */
export function pickNext(
  letters: readonly ILetter[],
  progress: Progress,
  rng: () => number,
  excludeId?: string,
): ILetter {
  const pool = letters.length > 1 ? letters.filter((l) => l.id !== excludeId) : letters;
  const total = pool.reduce((sum, l) => sum + BOX_WEIGHTS[getBox(progress, l.id)], 0);
  let threshold = rng() * total;
  for (const letter of pool) {
    threshold -= BOX_WEIGHTS[getBox(progress, letter.id)];
    if (threshold < 0) return letter;
  }
  const last = pool[pool.length - 1];
  if (!last) throw new Error("Letters list is empty");
  return last;
}

export function isProgress(value: unknown): value is Progress {
  return (
    typeof value === "object" &&
    value !== null &&
    Object.values(value).every((v) => v === 1 || v === 2 || v === 3)
  );
}
