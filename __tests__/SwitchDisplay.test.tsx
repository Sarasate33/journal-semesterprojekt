/*
Test von Pflichtfeature 3.1: Filter von highlighted Einträgen
*/

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SwitchDisplay } from "../src/components/switchDisplay";

type Entry = {
  id: string;
  title: string;
  content: string;
  tags: Tag[];
  highlight: boolean;
  createdAt: Date;
};
type Tag = {
  id: string;
  label: string;
};

jest.mock("../src/actions/actions", () => ({
  updateHighlight: jest.fn(),
}))

jest.mock("../src/components/displayEntries", () => ({
  DisplayEntries: ({ entries }: { entries: Entry[] }) => (
    <div>
      {entries.map((entry) => (
        <div key={entry.id}>{entry.title}</div>
      ))}
    </div>
  ),
}));

describe("SwitchDisplay", () => {
  const mockAllEntries = [
    {
      id: "1",
      title: "Test Entry 1",
      content: "Content 1",
      tags: [{ id: "tag1", label: "Tag 1" }],
      highlight: false,
      createdAt: new Date("2023-01-01"),
    },
    {
      id: "2",
      title: "Test Entry 2",
      content: "Content 2",
      tags: [{ id: "tag2", label: "Tag 2" }],
      highlight: true,
      createdAt: new Date("2023-01-02"),
    },
  ];

  const mockHighlightedEntries = [
    {
      id: "2",
      title: "Test Entry 2",
      content: "Content 2",
      tags: [{ id: "tag2", label: "Tag 2" }],
      highlight: true,
      createdAt: new Date("2023-01-02"),
    },
  ];

  it("displays all entries by default", () => {
    render(
      <SwitchDisplay
        allEntries={mockAllEntries}
        highlightedEntries={mockHighlightedEntries}
      />
    );

    expect(screen.getByText("Test Entry 1")).toBeInTheDocument();
    expect(screen.getByText("Test Entry 2")).toBeInTheDocument();
  });

  it("switches to highlights when highlights button is clicked", () => {
    render(
      <SwitchDisplay
        allEntries={mockAllEntries}
        highlightedEntries={mockHighlightedEntries}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "switchHighlight" }));

    expect(screen.getByText("Test Entry 2")).toBeInTheDocument();
    expect(screen.queryByText("Test Entry 1")).not.toBeInTheDocument();
  });

  it("switches back to all entries when all button is clicked", () => {
    render(
      <SwitchDisplay
        allEntries={mockAllEntries}
        highlightedEntries={mockHighlightedEntries}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "switchHighlight" }));
    expect(screen.queryByText("Test Entry 1")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "switchAll" }));

    expect(screen.getByText("Test Entry 1")).toBeInTheDocument();
    expect(screen.getByText("Test Entry 2")).toBeInTheDocument();
  });


});
