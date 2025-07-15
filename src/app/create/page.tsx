import { createEntry } from "@/actions/actions";
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

export default async function CreateEntry() {
  const allTags = await prisma.tag.findMany();

  return (
    <div>
      <p className="text-2xl py-5 px-5">Create a new Journal Entry!</p>

      <div>
        <form action={createEntry}>
          <div className="py-2 px-5">
            <Label className="py-2">Title</Label>
            <Input name="title" type="text" placeholder="Title"></Input>
          </div>
          <div className="py-2 px-5">
            <Label className="py-2">Tags</Label>
            <Select name="tags">
              <SelectTrigger>
                <SelectValue placeholder="Select a tag" />
              </SelectTrigger>
              <SelectContent >
                {allTags.map((tag) => (
                  <SelectItem key={tag.id} value={tag.id}>
                    <span className="flex items-center gab-2">{tag.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="py-2 px-5">
            <Label className="py-2">Write down your thoughts ...</Label>
            <Textarea name="content" placeholder="Content"></Textarea>
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
