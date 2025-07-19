import React from "react";
import { render, screen } from "@testing-library/react";
import { DisplayEntries } from "../src/components/displayEntries";
import "@testing-library/jest-dom";


jest.mock("../src/actions/actions", () => ({
    updateHighlight: jest.fn(),
}));

describte("Correct Display of Entries", () => {
    const mockEntries = [
        {
            id: "1",
            title: "Oldest Entry",
            content: "This is the oldest entry.",
            tags: [{ id: "tag1", label:"Tag1"}],
            highlight: false, 
            createdAt: new Date("2023-01-01"),
        },
        {id: "2",
            title: "Middle Entry",
            content: "This is the middle entry.",
            tags: [],
            highlight: true,
            createdAt: new Date("2024-01-01"),
        },
        {id: "3",
            title: "Newest Entry",
            content: "This is the newest entry.",
            tags: [{id: "tag2", label: "Tag2"}, {id: "tag3", label: "Tag3"}],
            highlight: false
            createdAt: new Date("2025-01-01"),
        },
    ];

    describe("Display all entries correctly", () => {
        it("displays all journal entries", () => {
            render(<DisplayEntrie entries={mockEntries}/>);

            expect(screen.getByText("Oldest Entry")).toBeInTheDocument();
            
        })
    })
})