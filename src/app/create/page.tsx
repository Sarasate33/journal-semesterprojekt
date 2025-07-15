import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { prisma } from "@/lib/prisma";
import { EntryForm } from "@/components/entryForm";

export default async function CreatePage() {
  const allTags = await prisma.tag.findMany();

  return (
    <div>
      <p className="text-2xl py-5 px-5">Create a new Journal Entry!</p>
      <div>
        <form>
          <div className="py-2 px-5">
            <Label className="py-2">Title</Label>
            <Input type="text" placeholder="Title"></Input>
          </div>
          <div className="py-2 px-5">
            <Label className="py-2">Tags</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a tag" />
              </SelectTrigger>
              <SelectContent>
                {allTags.map((tag) => (
                  <SelectItem key={tag.id} value={tag.label}>
                    <span className="felx items-center gab-2">{tag.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="py-2 px-5">
            <Label className="py-2">Write down your thoughts ...</Label>
            <Textarea placeholder="Content"></Textarea>
          </div>
          <div className="py-2 px-5">
            <Button type="submit" variant="default">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}