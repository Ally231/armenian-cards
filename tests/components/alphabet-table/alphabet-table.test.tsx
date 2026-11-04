import { renderWithLocale } from "../../render-with-locale";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DEFAULT_SETTINGS } from "@/domain/settings/settings";
import { AlphabetTable } from "@/components/alphabet-table/alphabet-table";

const renderTable = () =>
  renderWithLocale(<AlphabetTable settings={DEFAULT_SETTINGS} progress={{}} />);

function firstRow() {
  const row = screen.getAllByRole("row")[1];
  if (!row) throw new Error("No table rows");
  return row;
}

describe("AlphabetTable", () => {
  it("should show a name column header", () => {
    renderTable();
    expect(screen.getByRole("columnheader", { name: "Название" })).toBeInTheDocument();
  });

  it("should show the Armenian name of the first letter", () => {
    renderTable();
    expect(within(firstRow()).getByRole("cell", { name: "այբ" })).toBeInTheDocument();
  });

  describe("when the screen is narrow", () => {
    beforeEach(() => {
      vi.stubGlobal(
        "matchMedia",
        vi.fn((query: string) => ({
          matches: true,
          media: query,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        })),
      );
    });

    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it("should show only three columns", () => {
      renderTable();
      expect(screen.getAllByRole("columnheader")).toHaveLength(3);
    });

    it("should show letter names by default", () => {
      renderTable();
      expect(within(firstRow()).getByRole("cell", { name: "այբ" })).toBeInTheDocument();
    });

    it("should switch the third column to sounds", async () => {
      renderTable();
      await userEvent.selectOptions(screen.getByLabelText("Показать столбец"), "sound");
      expect(within(firstRow()).getByRole("cell", { name: "а" })).toBeInTheDocument();
    });

    it("should switch the third column to associations", async () => {
      renderTable();
      await userEvent.selectOptions(screen.getByLabelText("Показать столбец"), "mnemonic");
      expect(within(firstRow()).getByText("այո")).toBeInTheDocument();
    });
  });
});
