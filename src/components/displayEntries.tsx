import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";

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
  return (
    <div className="grid grid-cols-4 gap-2 px-5">
      {entries.map((entryElement) => (
        <Card key={entryElement.id} className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>{entryElement.title}</CardTitle>
            <CardDescription>
              {entryElement.tags ? (
                entryElement.tags.map((tagElement: Tag) => (
                  <Badge
                    key={tagElement.id}
                    
                  >
                    {tagElement.label}
                  </Badge>
                ))
              ) : (
                <span className="text-gray-500">No tags</span>
              )}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p>{entryElement.content}</p>
          </CardContent>
          <CardFooter>
            <p>
              {entryElement.createdAt
                ? entryElement.createdAt.toLocaleDateString()
                : "No date given"}
            </p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
