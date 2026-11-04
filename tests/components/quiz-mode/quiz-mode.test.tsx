import { renderWithLocale } from "../../render-with-locale";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DEFAULT_SETTINGS } from "@/domain/settings/settings";
import { QuizMode } from "@/components/quiz-mode/quiz-mode";

describe("QuizMode associations", () => {
  beforeEach(() => {
    // rng = 0 делает вопрос детерминированным: целевая буква — Ա, ответ «а».
    vi.spyOn(Math, "random").mockReturnValue(0);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const renderQuiz = () =>
    renderWithLocale(
      <QuizMode settings={DEFAULT_SETTINGS} progress={{}} onProgressChange={vi.fn()} />,
    );

  it("should hide the association before answering", () => {
    renderQuiz();
    expect(screen.queryByText("այո")).not.toBeInTheDocument();
  });

  it("should show the association of the target letter after answering", async () => {
    renderQuiz();
    await userEvent.click(screen.getByRole("button", { name: "а" }));
    expect(screen.getByText("այո")).toBeInTheDocument();
  });
});
