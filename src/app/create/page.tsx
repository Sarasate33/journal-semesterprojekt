import { EntryForm } from "@/components/entryForm";

import { prisma } from "@/lib/prisma";

export default async function CreateEntry() {
  const allTags = await prisma.tag.findMany();

  return (
    <div className="py-5">
      <h1 className="px-5 text-center text-4xl font-bold">
        What is on your mind today?
      </h1>
      <EntryForm tags={allTags} />
    </div>
  );
}
