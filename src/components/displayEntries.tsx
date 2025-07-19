"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { Toggle } from "./ui/toggle";
import { updateHighlight } from "@/actions/actions";
import { Star } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "./ui/scroll-area";

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

const initialDisplayCount = 10;
const loadMoreIncrement = 5;

export function DisplayEntries({ entries }: EntryFormProps) {
  const [displayCount, setDisplayCount] = useState(initialDisplayCount);

  const setString = (text: string) => {
    if (text.length <= 250) {
      return text;
    }

    return text.substring(0, 250) + "...";
  };

  const loadMore = () => {
    setDisplayCount((prev) => prev + loadMoreIncrement);
  };

  const entriesToShow = entries.slice(0, displayCount);
  const hasMoreEntries = displayCount < entries.length;

  return (
    <div className="px-5 py-5">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {entriesToShow.map((entryElement) => (
          <Card className="min-h-70 flex flex-col" key={entryElement.id}>
            <CardHeader>
              <CardTitle
                araia-label="title"
                className="text-2xl flex justify-between"
              >
                <h2>{entryElement.title}</h2>
                <div className="py-2 px-5 ">
                  <input
                    type="hidden"
                    name="id"
                    value={entryElement.id}
                  ></input>
                  <Toggle
                    size="lg"
                    className=" data-[state=on]:bg-[#ffda7d] data-[state=on]:text-[#FFFFFF] rounded-full"
                    pressed={entryElement.highlight}
                    onPressedChange={async (pressed) => {
                      const formData = new FormData();
                      formData.append("id", entryElement.id);
                      formData.append("highlight", pressed.toString());

                      try {
                        await updateHighlight(formData);
                      } catch (error) {
                        console.error("Failed to update highlight:", error);
                      }
                    }}
                  >
                    <Star fill="white" />
                  </Toggle>
                </div>
              </CardTitle>
              <CardDescription className="flex flex-wrap gap-2">
                {entryElement.tags.map((tagElement: Tag) => (
                  <Badge key={tagElement.id} className="mr-2">
                    {tagElement.label}
                  </Badge>
                ))}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex-1">
              <p className="pb-5 text-black/40">
                {entryElement.createdAt.toLocaleDateString()}
              </p>
              <p>{setString(entryElement.content)}</p>
            </CardContent>
            <CardFooter>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" aria-label="read-button">
                    Read
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[95%] max-w-5xl sm:max-w-5xl md:max-w-6xl">
                  <ScrollArea className="h-full w-[95%] max-w-5xl sm:max-w-5xl md:max-w-6xl rounded-md border">
                    <div className="py-5 px-10">
                      <SheetHeader>
                        <SheetTitle>
                          <p className="text-3xl">{entryElement.title}</p>
                        </SheetTitle>
                        <SheetDescription className="flex flex-wrap gap-2">
                          {entryElement.tags.map((tagElement: Tag) => (
                            <Badge key={tagElement.id} className="mr-2">
                              {tagElement.label}
                            </Badge>
                          ))}
                        </SheetDescription>
                      </SheetHeader>
                      <div className="py-2">
                        <p className="text-black/40">
                          {entryElement.createdAt.toLocaleDateString()}
                        </p>
                      </div>
                      <p>{entryElement.content}</p>
                    </div>
                  </ScrollArea>
                </SheetContent>
              </Sheet>
            </CardFooter>
          </Card>
        ))}
      </div>

      {hasMoreEntries && (
        <div className="flex justify-center py-10 px-5">
          <Button onClick={loadMore} variant="outline" className="px-8 py-2">
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
