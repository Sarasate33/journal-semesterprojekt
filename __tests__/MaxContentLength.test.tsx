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
  const longContent250 = "a".repeat(250);
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
      content: longContent250,
      tags: [],
      highlight: false,
      createdAt: new Date("12.12.2025"),
    },
  ];

  it("text shorter than 250 symbols is displayed in full", () => {
    render(<DisplayEntries entries={shortMockEntry} />);

    expect(shortContent.length).toBeLessThan(250);
    expect(screen.getByText(shortContent)).toBeInTheDocument();
  });

  it("text to be 250 symbols is shortend to 249 symbols with ... at the end", () => {
    render(<DisplayEntries entries={longMockEntry} />);
    expect(longContent250.length).toBe(250);

    const shortendText = longContent250.substring(0, 249) + "...";

    expect(screen.getByText(shortendText)).toBeInTheDocument();
    // queryByText wirft keinen Fehler wenn element not found, wirft null
    expect(screen.queryByText(longContent250)).not.toBeInTheDocument();
  });
  it("full text should be display when Read Button is pressed", () => {
    render(<DisplayEntries entries={longMockEntry} />);

    const readButton = screen.getByText("Read");
    fireEvent.click(readButton);
    expect(screen.getByText(longContent250)).toBeInTheDocument();
  });
});
