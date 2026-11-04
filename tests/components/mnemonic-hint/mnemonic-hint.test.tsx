import { renderWithLocale } from "../../render-with-locale";
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LETTERS } from "@/domain/alphabet/letters";
import { LOCALE_KEY } from "@/infrastructure/localStorage/keys";
import { MnemonicHint } from "@/components/mnemonic-hint/mnemonic-hint";

function letterById(id: string) {
  const letter = LETTERS.find((l) => l.id === id);
  if (!letter) throw new Error(`Letter ${id} not found`);
  return letter;
}

describe("MnemonicHint", () => {
  it("should show the anchor word with its Russian meaning", () => {
    renderWithLocale(<MnemonicHint letter={letterById("ա")} script="cyrillic" />);
    expect(screen.getByText(/\(айо\) — да/)).toBeInTheDocument();
  });

  it("should show the anchor word transliterated in the selected script", () => {
    renderWithLocale(<MnemonicHint letter={letterById("ա")} script="latin" />);
    expect(screen.getByText(/\(ayo\)/)).toBeInTheDocument();
  });

  it("should show the shape hint when the letter has one", () => {
    renderWithLocale(<MnemonicHint letter={letterById("ս")} script="cyrillic" />);
    expect(screen.getByText(/читается «с»/)).toBeInTheDocument();
  });

  it("should show the English meaning when the interface is in English", () => {
    window.localStorage.setItem(LOCALE_KEY, JSON.stringify("en"));
    renderWithLocale(<MnemonicHint letter={letterById("ա")} script="latin" />);
    expect(screen.getByText(/\(ayo\) — yes/)).toBeInTheDocument();
  });
});
