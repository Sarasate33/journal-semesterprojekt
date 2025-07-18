/*
Testet Pflichtfeature 1 (testet nicht ordering weil das macht db)
*/

import React from "react";
import { render, screen } from "@testing-library/react";
import { DisplayEntries } from "../src/components/displayEntries";
import "@testing-library/jest-dom";

jest.mock("../src/actions/actions", () => ({
  updateHighlight: jest.fn(),
}));

describe("Correct Display of Entries", () => {
  const mockEntries = [
    {
      id: "1",
      title: "Oldest Entry",
      content: "This is the oldest entry.",
      tags: [{ id: "tag1", label: "Tag1" }],
      highlight: false,
      createdAt: new Date("2023-01-01"),
    },
    {
      id: "2",
      title: "Middle Entry",
      content: "This is the middle entry.",
      tags: [],
      highlight: true,
      createdAt: new Date("2024-01-01"),
    },
    {
      id: "3",
      title: "Newest Entry",
      content: "This is the newest entry.",
      tags: [
        { id: "tag2", label: "Tag2" },
        { id: "tag3", label: "Tag3" },
      ],
      highlight: false,
      createdAt: new Date("2025-01-01"),
    },
  ];

  it("displays all journal entries", () => {
    render(<DisplayEntries entries={mockEntries} />);

    //title
    expect(screen.getByText("Oldest Entry")).toBeInTheDocument();
    expect(screen.getByText("Middle Entry")).toBeInTheDocument();
    expect(screen.getByText("Newest Entry")).toBeInTheDocument();

    //content
    expect(screen.getByText("This is the oldest entry.")).toBeInTheDocument();
    expect(screen.getByText("This is the middle entry.")).toBeInTheDocument();
    expect(screen.getByText("This is the newest entry.")).toBeInTheDocument();

    //tags
    expect(screen.getByText("Tag1")).toBeInTheDocument();
    expect(screen.getByText("Tag2")).toBeInTheDocument();
    expect(screen.getByText("Tag3")).toBeInTheDocument();

    //createdAt
    expect(screen.getByText("1.1.2023")).toBeInTheDocument();
    expect(screen.getByText("1.1.2024")).toBeInTheDocument();
    expect(screen.getByText("1.1.2025")).toBeInTheDocument();
  });
});
