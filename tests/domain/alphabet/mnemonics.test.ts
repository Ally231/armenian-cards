import { describe, expect, it } from "vitest";
import { LETTERS } from "@/domain/alphabet/letters";
import { MNEMONICS } from "@/domain/alphabet/mnemonics";

describe("MNEMONICS", () => {
  it("should have an entry for every letter", () => {
    expect(Object.keys(MNEMONICS).sort()).toEqual(LETTERS.map((l) => l.id).sort());
  });

  it("should use anchor words that start with their letter", () => {
    // ւ сама слово не начинает, поэтому её слово начинается с пары ու.
    const mismatched = LETTERS.filter((letter) => {
      const prefix = letter.id === "ւ" ? "ու" : letter.lower;
      return !MNEMONICS[letter.id]?.word.toLowerCase().startsWith(prefix);
    }).map((l) => l.id);
    expect(mismatched).toEqual([]);
  });

  it("should write anchor words in Armenian script only", () => {
    const invalid = Object.values(MNEMONICS).filter((m) => !/^[Ա-Ֆա-և]+$/.test(m.word));
    expect(invalid).toEqual([]);
  });
});
