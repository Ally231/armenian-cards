import { useCallback, useSyncExternalStore } from "react";

function getMediaQueryList(query: string): MediaQueryList | null {
  // matchMedia нет в jsdom и очень старых браузерах: тогда считаем, что запрос не совпал.
  return typeof window.matchMedia === "function" ? window.matchMedia(query) : null;
}

/** Совпадает ли медиазапрос сейчас; компонент перерисуется при изменении размера окна. */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = getMediaQueryList(query);
      list?.addEventListener("change", onChange);
      return () => list?.removeEventListener("change", onChange);
    },
    [query],
  );
  const getSnapshot = () => getMediaQueryList(query)?.matches ?? false;

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
