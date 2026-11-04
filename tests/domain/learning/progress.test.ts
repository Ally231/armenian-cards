import { describe, expect, it } from "vitest";
import { LETTERS } from "@/domain/alphabet/letters";
import {
  applyAnswer,
  countLearned,
  getBox,
  isProgress,
  pickNext,
} from "@/domain/learning/progress";

describe("applyAnswer", () => {
  it("should move a new letter to box 2 on a correct answer", () => {
    expect(getBox(applyAnswer({}, "ա", true), "ա")).toBe(2);
  });

  it("should cap the box at 3", () => {
    expect(getBox(applyAnswer({ ա: 3 }, "ա", true), "ա")).toBe(3);
  });

  it("should reset the box to 1 on a wrong answer", () => {
    expect(getBox(applyAnswer({ ա: 3 }, "ա", false), "ա")).toBe(1);
  });

  it("should not mutate the original progress", () => {
    const original = { ա: 2 } as const;
    applyAnswer(original, "ա", true);
    expect(original).toEqual({ ա: 2 });
  });
});

describe("pickNext", () => {
  it("should never return the excluded letter", () => {
    for (let i = 0; i < 50; i++) {
      expect(pickNext(LETTERS, {}, () => i / 50, "ա").id).not.toBe("ա");
    }
  });

  it("should favour letters from lower boxes", () => {
    const learned = Object.fromEntries(LETTERS.slice(1).map((l) => [l.id, 3 as const]));
    const hits = Array.from({ length: 100 }, (_, i) => pickNext(LETTERS, learned, () => i / 100));
    expect(hits.filter((l) => l.id === "ա").length).toBeGreaterThan(10);
  });

  it("should return the only letter when the list has one item", () => {
    const only = LETTERS.slice(0, 1);
    expect(pickNext(only, {}, () => 0.5, "ա").id).toBe("ա");
  });
});

describe("countLearned", () => {
  it("should count only letters in box 3", () => {
    expect(countLearned(LETTERS, { ա: 3, բ: 2 })).toBe(1);
  });
});

describe("isProgress", () => {
  it("should reject boxes outside 1..3", () => {
    expect(isProgress({ ա: 5 })).toBe(false);
  });
});
