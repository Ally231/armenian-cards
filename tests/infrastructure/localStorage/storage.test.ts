import { describe, expect, it } from "vitest";
import { readStorage, writeStorage } from "@/infrastructure/localStorage/storage";

const isNumber = (value: unknown): value is number => typeof value === "number";

describe("readStorage", () => {
  it("should return the fallback when the key is missing", () => {
    expect(readStorage("missing", 7, isNumber)).toBe(7);
  });

  it("should return the stored value written by writeStorage", () => {
    writeStorage("count", 42);
    expect(readStorage("count", 0, isNumber)).toBe(42);
  });

  it("should return the fallback when the stored value has the wrong shape", () => {
    window.localStorage.setItem("count", JSON.stringify("not a number"));
    expect(readStorage("count", 0, isNumber)).toBe(0);
  });

  it("should return the fallback when the stored value is not valid JSON", () => {
    window.localStorage.setItem("count", "{broken");
    expect(readStorage("count", 0, isNumber)).toBe(0);
  });
});
