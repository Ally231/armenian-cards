// localStorage может быть недоступен (приватный режим, запрет cookies) или содержать
// мусор от старой версии, поэтому чтение и запись безопасны и валидируют форму данных.
export function readStorage<T>(
  key: string,
  fallback: T,
  isValid: (value: unknown) => value is T,
): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback;
    const parsed: unknown = JSON.parse(raw);
    return isValid(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Квота или запрет хранилища: прогресс просто не переживёт перезагрузку.
  }
}
