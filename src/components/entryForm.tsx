"use client";

import { validateEntry } from "@/lib/validateEntry";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useActionState, useEffect } from "react";
import { EntryFormState } from "@/lib/validateEntry";
import { toast } from "sonner";

type Tag = {
  id: string;
  label: string;
};

interface EntryFormProps {
  tags: Tag[];
}

const initialState: EntryFormState = { errors: {} };

export function EntryForm({ tags }: EntryFormProps) {
  const [state, formAction] = useActionState(validateEntry, initialState);

  const hasErrors = "errors" in state;
  const hasSuccess = "success" in state;

  useEffect(() => {
    if (hasSuccess) {
      toast.success("Successfully submitted!");
      console.log("Server action completed successfully");
    }
  }, [hasSuccess]);

  return (
    <form action={formAction}>
      <div className="py-2 px-5">
        <Label className="py-2">Title</Label>
        <Input id="title" name="title" type="text" placeholder="Title" />
        {hasErrors && state.errors.title && (
          <p className="text-sm text-red-500">{state.errors.title}</p>
        )}
      </div>

      <div className="py-2 px-5">
        <Label htmlFor="tags" className="py-2">
          Tags
        </Label>
        <Select name="tags">
          <SelectTrigger>
            <SelectValue placeholder="Select a tag" />
          </SelectTrigger>
          <SelectContent>
            {tags.map((tagElement) => (
              <SelectItem key={tagElement.id} value={tagElement.id}>
                {tagElement.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
  );
}
