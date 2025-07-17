"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { DisplayEntries } from "./displayEntries";

type Tag = {
  id: string | null;
  label: string;
};

type Entry = {
  id: string;
  title: string;
  content: string;
  tags: Tag[];
  highlight: boolean;
  createdAt: Date;
};

interface switchDisplayProps {
  allEntries: Entry[];
  highlightedEntries: Entry[];
}

export function SwitchDisplay({
  allEntries,
  highlightedEntries,
}: switchDisplayProps) {
  const [activeDisplay, setActiveDisplay] = useState<"all" | "highlights">(
    "all"
  );
  const [currentEntries, setCurrentEntries] = useState(allEntries);

  useEffect(() => {
    setCurrentEntries(
      activeDisplay === "all" ? allEntries : highlightedEntries
    );
  }, [activeDisplay, allEntries, highlightedEntries]);

  return (
    <div>
      <div className="flex items-center py-5">
        <Button
          variant="switchAll"
          className="flex-1 text-right"
          onClick={() => setActiveDisplay("all")}
        >
          all ({allEntries.length})
        </Button>
        <p className="text center px-4">|</p>
        <Button
          variant="switchHighlight"
          className="flex-1 text-left"
          onClick={() => setActiveDisplay("highlights")}
        >
          highlights ({highlightedEntries.length})
        </Button>
      </div>
      <div>
        <DisplayEntries entries={currentEntries} />
      </div>
    </div>
  );
}
