import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { prisma } from "@/lib/prisma";

export default async function CreateEntry() {
  const allTags = await prisma.entry.findMany({select: {tags}});

  return (
    <div>
      <p className="text-2xl py-5 px-5">Create a new Journal Entry!</p>

      <div>
        <form>
      
          <div className="py-2 px-5">
            <Label>Title</Label>
            <Input
              type="text"
              placeholder="Title"
              className="mt-4 w-full"
            ></Input>
          </div>
           <div className="py-2 px-5">
            <Label>Tags</Label>
            <Select >
                  <SelectTrigger
                  >
                    <SelectValue placeholder="Select a tag" />
                  </SelectTrigger>
                  <SelectContent>
                    {entries[tags].map((entry) => {
                      return (
                        <SelectItem key={entry.id} value={tag.id}>
                          <span className="felx items-center gab-2">
                            {tag.label}
                          </span>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
          </div>
          <div className="py-2 px-5">
            <Label>Content</Label>
            <Input
              type="text"
              placeholder="Content"
              className="mt-4 w-full"
            ></Input>
          </div>
        </form>
      </div>
    </div>
  );
}
