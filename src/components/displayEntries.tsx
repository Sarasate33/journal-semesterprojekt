import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
                  <span
                    key={tagElement.id}
                    className="inline-block bg-gray-200 rounded px-2 py-1 text-sm mr-2"
                  >
                    {tagElement.label}
                  </span>
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
