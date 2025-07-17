"use client";

import { validateEntry } from "@/lib/validateEntry";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useActionState, useEffect } from "react";
import { EntryFormState } from "@/lib/validateEntry";
import { toast } from "sonner";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { Toggle } from "./ui/toggle";
import { useState } from "react";
import { Card } from "./ui/card";
import { Star } from "lucide-react";
type Tag = {
  id: string;
  label: string;
};

interface EntryFormProps {
  tags: Tag[];
}

const initialState: EntryFormState = { errors: {} };

export function EntryForm({ tags }: EntryFormProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [stateHighlight, setStateHighlight] = useState<boolean>(false);
  const [newTagInput, setNewTagInput] = useState<string>("");
  const [allTags, setAllTags] = useState<Tag[]>(tags);
  const [state, formAction] = useActionState(validateEntry, initialState);

  const hasErrors = "errors" in state;
  const hasSuccess = "success" in state;

  //source: Bijay Kumar from https://www.spguides.com/typescript-date-format/
  function formatISODate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const today = formatISODate(new Date());

  useEffect(() => {
    if (hasSuccess) {
      toast.success("Successfully submitted!");
      console.log("Server action completed successfully");
    }
  }, [hasSuccess]);

  const handleAddNewTag = () => {
    const trimmedInput = newTagInput.trim();
    if (!trimmedInput) {
      toast.error("Please name your Tag!");
      return;
    }

    const newTag: Tag = {
      id: Date.now().toString(),
      label: trimmedInput,
    };

    setAllTags((prev) => [...prev, newTag]);
    setSelectedTags((prev) => [...prev, newTag.label]);
    setNewTagInput("");
    toast.success("Tag added successfully!");
  };

  return (
    <div className="py-5 px-5">
      <Card>
        <form action={formAction}>
          <Label className="px-5">Title</Label>
          <div className="py-2 px-5 flex  gap-4">
            <div className="flex-1">
              <Input id="title" name="title" type="text" placeholder="Title" />
              {hasErrors && state.errors.title && (
                <p className="text-sm text-red-500">{state.errors.title}</p>
              )}
            </div>
            <div>
              <div>
                <Toggle
                  size="lg"
                  className=" data-[state=on]:bg-[#ffda7d] data-[state=on]:text-[#FFFFFF] rounded-full"
                  pressed={stateHighlight}
                  onPressedChange={setStateHighlight}
                >
                  <Star fill="white" />
                </Toggle>
                <input
                  type="hidden"
                  name="highlight"
                  value={stateHighlight.toString()}
                />
              </div>
            </div>
          </div>

          <div className="py-2 px-5">
            <Label htmlFor="tags" className="py-2">
              Tags
            </Label>
            <ToggleGroup
              type="multiple"
              id="tags"
              size="lg"
              value={selectedTags}
              onValueChange={setSelectedTags}
            >
              {allTags.map((tagElement) => (
                <ToggleGroupItem
                  className="min-w-fit w-auto flex "
                  key={tagElement.id}
                  value={tagElement.label}
                >
                  {tagElement.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            <input type="hidden" name="tags" value={selectedTags.join(",")} />
          </div>
          <div className="px-5 w-fit">
            <Input
              type="text"
              value={newTagInput}
              onChange={(e) => setNewTagInput(e.target.value)}
              placeholder="create a new Tag"
            />
            <Button type="button" onClick={handleAddNewTag}>
              +
            </Button>
          </div>

          <div className="py-2 px-5">
            <Label className="py-2">Set Date</Label>
            <Input
              className="w-fit"
              id="createdAt"
              name="createdAt"
              type="date"
              defaultValue={today}
            />
          </div>

          <div className="py-2 px-5">
            <Label className="py-2">Write down your thoughts ...</Label>
            <Textarea id="content" name="content" placeholder="Content" />
            {hasErrors && state.errors.content && (
              <p className="text-sm text-red-500">{state.errors.content}</p>
            )}
          </div>

          <div className="py-2 px-5">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
