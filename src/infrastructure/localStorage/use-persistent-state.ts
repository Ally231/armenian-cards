import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { readStorage, writeStorage } from "./storage";

export function usePersistentState<T>(
  key: string,
  fallback: T,
  isValid: (value: unknown) => value is T,
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => readStorage(key, fallback, isValid));

  useEffect(() => {
    writeStorage(key, state);
  }, [key, state]);

  return [state, setState];
}
