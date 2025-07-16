"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { Toggle } from "./ui/toggle";
import { useState } from "react";

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

interface EntryFormProps {
  entries: Entry[];
}

export function DisplayEntries({ entries }: EntryFormProps) {
  
    const [stateHighlight, setStateHighlight] = useState<boolean>(false);
  const setString = (text: string) => {
    if (text.length <= 250) {
      return text;
    }

    return text.substring(0, 250) + "...";
  };

  return (
    <div className="px-5 py-5">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {entries.map((entryElement) => (
          <Card className="min-h-70 " key={entryElement.id}>
            <CardHeader>
              <CardTitle className="text-2xl">{entryElement.title}
                <form>            <div className="py-2 px-5">
              <Toggle
                  className="min-w-fit w-auto flex "
                  pressed={stateHighlight}
                  onPressedChange={setStateHighlight}
                >
                  {entryElement.highlight ? "highlighted" : "not highlighted"}
               
              </Toggle>
              <input type="hidden" name="highlight" />
            </div></form>
              </CardTitle>
              <CardDescription className="flex flex-wrap gap-2">
                {entryElement.tags ? (
                  entryElement.tags.map((tagElement: Tag) => (
                    <Badge key={tagElement.id}>{tagElement.label}</Badge>
                  ))
                ) : (
                  <span className="text-gray-500">No tags</span>
                )}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <p className="pb-5">
                {entryElement.createdAt
                  ? entryElement.createdAt.toLocaleDateString()
                  : "No date given"}
              </p>
              <p>{setString(entryElement.content)}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
