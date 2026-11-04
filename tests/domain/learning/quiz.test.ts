import { describe, expect, it } from "vitest";
import { LETTERS } from "@/domain/alphabet/letters";
import { buildOptions, OPTIONS_COUNT } from "@/domain/learning/quiz";

describe("buildOptions", () => {
  const target = LETTERS[0];
  if (!target) throw new Error("LETTERS is empty");

  it("should return the configured number of options", () => {
    expect(buildOptions(LETTERS, target, Math.random)).toHaveLength(OPTIONS_COUNT);
  });

  it("should include the target exactly once", () => {
    const options = buildOptions(LETTERS, target, Math.random);
    expect(options.filter((l) => l.id === target.id)).toHaveLength(1);
  });

  it("should not contain duplicates", () => {
    const options = buildOptions(LETTERS, target, Math.random);
    expect(new Set(options.map((l) => l.id)).size).toBe(OPTIONS_COUNT);
  });
});
