import { describe, expect, it } from "vitest";
import { shuffle } from "@/shared/utils/shuffle";

describe("shuffle", () => {
  it("should keep every element", () => {
    expect(shuffle([1, 2, 3, 4, 5], Math.random).sort()).toEqual([1, 2, 3, 4, 5]);
  });

  it("should not mutate the original array", () => {
    const items = [1, 2, 3];
    shuffle(items, () => 0);
    expect(items).toEqual([1, 2, 3]);
  });

  it("should be deterministic for the same random source", () => {
    expect(shuffle([1, 2, 3, 4], () => 0)).toEqual(shuffle([1, 2, 3, 4], () => 0));
  });
});
