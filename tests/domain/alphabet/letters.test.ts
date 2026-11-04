import { describe, expect, it } from "vitest";
import { LETTERS } from "@/domain/alphabet/letters";

describe("LETTERS", () => {
  it("should contain 38 letters", () => {
    expect(LETTERS).toHaveLength(38);
  });

  it("should follow the Unicode alphabetical order for capitals", () => {
    const codes = LETTERS.map((l) => l.upper.codePointAt(0));
    expect(codes).toEqual(LETTERS.map((_, i) => 0x531 + i));
  });

  it("should follow the Unicode alphabetical order for lowercase", () => {
    const codes = LETTERS.map((l) => l.lower.codePointAt(0));
    expect(codes).toEqual(LETTERS.map((_, i) => 0x561 + i));
  });

  it("should number the letters from 1 without gaps", () => {
    expect(LETTERS.map((l) => l.number)).toEqual(LETTERS.map((_, i) => i + 1));
  });

  it("should give every letter a non-empty Armenian name", () => {
    expect(LETTERS.every((l) => /^[ա-և]+$/.test(l.name))).toBe(true);
  });

  it("should have unique Latin transliterations", () => {
    expect(new Set(LETTERS.map((l) => l.latin)).size).toBe(LETTERS.length);
  });

  it("should have unique Cyrillic transliterations", () => {
    expect(new Set(LETTERS.map((l) => l.cyrillic)).size).toBe(LETTERS.length);
  });
});
