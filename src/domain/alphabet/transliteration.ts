import type { ILetter, LetterCase, Script } from "./letter";

export function glyphOf(letter: ILetter, letterCase: LetterCase): string {
  return letterCase === "upper" ? letter.upper : letter.lower;
}

export function transliterationOf(letter: ILetter, script: Script): string {
  return script === "latin" ? letter.latin : letter.cyrillic;
}
