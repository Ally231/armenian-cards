# Armenian Cards

**Демо:** https://ally231.github.io/armenian-cards/

Тренажёр армянского алфавита в виде карточек — для тех, кто хочет читать вывески и меню в Армении.

## Возможности

- **Карточки**: показывается буква, клик — ответ, затем «Знал / Не знал».
- **Квиз**: буква → звук и звук → буква, 4 варианта ответа.
- **Алфавит**: таблица всех 38 букв с уровнем освоения.
- Озвучка букв: название и звук каждой буквы (файлы в `public/audio/letters`).
- Интервальное повторение по системе Лейтнера (3 коробки): забытые и новые буквы выпадают чаще.
- Транслитерация латиницей или кириллицей, интерфейс на русском и английском.
- Прогресс и настройки хранятся в `localStorage`.

## Запуск

```bash
npm install
npm run dev
```

## Проверки

```bash
npm run typecheck
npm run eslint
npm run prettier:check
npm test
npm run build
```

## CI и публикация

- `.github/workflows/ci.yml` — на каждый push и pull request в `main`: typecheck, eslint, prettier, тесты, сборка.
- `.github/workflows/deploy.yml` — после push в `main` собирает сайт с `BASE_PATH=/armenian-cards/`
  и публикует его на GitHub Pages (Settings → Pages → Source: GitHub Actions).

Локально сборка под Pages (PowerShell):

```powershell
$env:BASE_PATH = "/armenian-cards/"; npm run build; Remove-Item Env:BASE_PATH
```

В Git Bash на Windows добавьте `MSYS_NO_PATHCONV=1`, иначе путь `/armenian-cards/` превратится в путь к папке Git:

```bash
MSYS_NO_PATHCONV=1 BASE_PATH=/armenian-cards/ npm run build
```

## Озвучка

Аудио (76 WAV: `NN-name.wav` и `NN-sound.wav`) лежит в `public/audio/letters`.
Голос синтезированный (`hy+m3`), произношение приблизительное: сверяйте с живой речью.

Озвучка сделана синтезатором [eSpeak NG](https://github.com/espeak-ng/espeak-ng). Сам eSpeak NG
распространяется под GPLv3, в репозиторий он не входит и используется только как инструмент
для генерации файлов.

## Стек

React + Vite + TypeScript (strict), CSS Modules + `clsx`, Vitest + Testing Library.
Тесты лежат в папке `tests/`, её структура повторяет `src/` (например, `tests/lib/leitner.test.ts`).

## Данные

Алфавит — `src/data/letters.ts`. Транслитерация составлена по восточноармянскому произношению.
Придыхательные согласные помечены знаком `ʻ`, чтобы варианты ответа в квизе не повторялись.
Частоты букв пока не используются.
