import { renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useMediaQuery } from "@/shared/hooks/use-media-query";

function stubMatchMedia(matches: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn((query: string) => ({
      matches,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  );
}

describe("useMediaQuery", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("should return false when matchMedia is unavailable", () => {
    vi.stubGlobal("matchMedia", undefined);
    const { result } = renderHook(() => useMediaQuery("(max-width: 720px)"));
    expect(result.current).toBe(false);
  });

  it("should return true when the query matches", () => {
    stubMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery("(max-width: 720px)"));
    expect(result.current).toBe(true);
  });

  it("should return false when the query does not match", () => {
    stubMatchMedia(false);
    const { result } = renderHook(() => useMediaQuery("(max-width: 720px)"));
    expect(result.current).toBe(false);
  });
});
