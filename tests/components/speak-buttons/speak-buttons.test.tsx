import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LETTERS } from "@/domain/alphabet/letters";
import { SpeakButtons } from "@/components/speak-buttons/speak-buttons";

const played: string[] = [];

class FakeAudio {
  constructor(readonly src: string) {}
  pause = vi.fn();
  play = vi.fn(() => {
    played.push(this.src);
    return Promise.resolve();
  });
}

describe("SpeakButtons", () => {
  const letter = LETTERS[1];
  if (!letter) throw new Error("LETTERS is empty");

  beforeEach(() => {
    played.length = 0;
    vi.stubGlobal("Audio", FakeAudio);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("should play the letter name file after clicking the name button", async () => {
    render(<SpeakButtons letter={letter} />);
    await userEvent.click(screen.getByRole("button", { name: /Название/ }));
    expect(played).toEqual(["/audio/letters/02-name.wav"]);
  });

  it("should play the letter sound file after clicking the sound button", async () => {
    render(<SpeakButtons letter={letter} />);
    await userEvent.click(screen.getByRole("button", { name: /Звук/ }));
    expect(played).toEqual(["/audio/letters/02-sound.wav"]);
  });
});
