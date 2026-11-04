import { renderWithLocale } from "../../render-with-locale";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { App } from "@/app/app/app";

describe("App cards mode", () => {
  it("should reveal the transliteration after clicking the card", async () => {
    renderWithLocale(<App />);
    expect(screen.getByText(/Нажмите на карточку/)).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /^[Ա-Ֆ]$/ }));

    expect(screen.getByRole("button", { name: "Знал" })).toBeInTheDocument();
  });

  it("should start with zero learned letters", () => {
    renderWithLocale(<App />);
    expect(screen.getByText(/Выучено: 0 \/ 38/)).toBeInTheDocument();
  });

  it("should persist the progress to localStorage after answering", async () => {
    renderWithLocale(<App />);
    await userEvent.click(screen.getByRole("button", { name: /^[Ա-Ֆ]$/ }));
    await userEvent.click(screen.getByRole("button", { name: "Знал" }));

    const stored = window.localStorage.getItem("armenian-cards:progress");
    expect(Object.values(JSON.parse(stored ?? "{}") as Record<string, number>)).toEqual([2]);
  });
});

describe("App settings", () => {
  it("should switch the interface to English", async () => {
    renderWithLocale(<App />);
    await userEvent.selectOptions(screen.getByLabelText(/Язык/), "en");
    expect(await screen.findByRole("heading", { name: "Armenian alphabet" })).toBeInTheDocument();
  });

  it("should translate the tab labels after switching to English", async () => {
    renderWithLocale(<App />);
    await userEvent.selectOptions(screen.getByLabelText(/Язык/), "en");
    expect(await screen.findByRole("button", { name: "Quiz" })).toBeInTheDocument();
  });

  it("should update the html lang attribute after switching to English", async () => {
    renderWithLocale(<App />);
    await userEvent.selectOptions(screen.getByLabelText(/Язык/), "en");
    await screen.findByRole("heading", { name: "Armenian alphabet" });
    expect(document.documentElement.lang).toBe("en");
  });

  it("should interpolate the learned counter in English", async () => {
    renderWithLocale(<App />);
    await userEvent.selectOptions(screen.getByLabelText(/Язык/), "en");
    expect(await screen.findByText(/Learned: 0 \/ 38/)).toBeInTheDocument();
  });
});
