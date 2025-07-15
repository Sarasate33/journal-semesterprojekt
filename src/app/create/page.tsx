import { prisma } from "@/lib/prisma";
import { EntryForm } from "@/components/entryForm";

export default async function CreatePage() {
  const allTags = await prisma.tag.findMany();

  return (
    <div>
      <p className="text-2xl py-5 px-5">Create a new Journal Entry!</p>
      <div>
        <EntryForm tags={allTags} />
      </div>
    </div>
  );
}