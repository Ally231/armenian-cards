import type { ILetter } from "@/domain/alphabet/letter";
import { shuffle } from "@/shared/utils/shuffle";

export const OPTIONS_COUNT = 4;

/** Цель + случайные отвлекающие буквы в перемешанном порядке. */
export function buildOptions(
  letters: readonly ILetter[],
  target: ILetter,
  rng: () => number,
): ILetter[] {
  const distractors = shuffle(
    letters.filter((l) => l.id !== target.id),
    rng,
  ).slice(0, OPTIONS_COUNT - 1);
  return shuffle([target, ...distractors], rng);
}
