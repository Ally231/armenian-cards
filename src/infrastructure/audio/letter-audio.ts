import type { ILetter } from "@/domain/alphabet/letter";

export type LetterAudioKind = "name" | "sound";

export function letterAudioUrl(letter: ILetter, kind: LetterAudioKind): string {
  const prefix = String(letter.number).padStart(2, "0");
  return `${import.meta.env.BASE_URL}audio/letters/${prefix}-${kind}.wav`;
}

let current: HTMLAudioElement | null = null;

/** Играет одну запись за раз: новое нажатие обрывает предыдущую. */
export function playLetterAudio(letter: ILetter, kind: LetterAudioKind): void {
  current?.pause();
  const audio = new Audio(letterAudioUrl(letter, kind));
  current = audio;
  // Автовоспроизведение может быть запрещено браузером; озвучка вторична, падать не нужно.
  audio.play().catch(() => undefined);
}
