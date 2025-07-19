/*
Test von Pflichtfeature 4: Erstmal nur 249 Zeichen angezeigt, dann nach Button-press komplett
*/


import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DisplayEntries } from "../src/components/displayEntries";

jest.mock("../src/actions/actions", () => ({
  updateHighlight: jest.fn(),
}));

describe("PreviewText max 250 symbols", () => {
  const shortContent = "This is a short content.";
  const longContent251 = "a".repeat(251);
  const shortMockEntry = [
    {
      id: "1",
      title: "Short Entry",
      content: shortContent,
      tags: [],
      highlight: false,
      createdAt: new Date("11.11.2025"),
    },
  ];

  const longMockEntry = [
    {
      id: "2",
      title: "Long Entry",
      content: longContent251,
      tags: [],
      highlight: false,
      createdAt: new Date("12.12.2025"),
    },
  ];

  it("text shorter than or equal 250 symbols is displayed in full", () => {
    render(<DisplayEntries entries={shortMockEntry} />);

    expect(shortContent.length).toBeLessThan(251);
    expect(screen.getByText(shortContent)).toBeInTheDocument();
  });

  it("text to be 251 symbols is shortend to 250 symbols with ... at the end", () => {
    render(<DisplayEntries entries={longMockEntry} />);
    expect(longContent251.length).toBe(251);

    const shortendText = longContent251.substring(0, 250) + "...";

    expect(screen.getByText(shortendText)).toBeInTheDocument();
    // queryByText wirft keinen Fehler wenn element not found, wirft null
    expect(screen.queryByText(longContent251)).not.toBeInTheDocument();
  });
  it("full text should be display when Read Button is pressed", () => {
    render(<DisplayEntries entries={longMockEntry} />);

    const readButton = screen.getByText("Read");
    fireEvent.click(readButton);
    expect(screen.getByText(longContent251)).toBeInTheDocument();
  });
});
