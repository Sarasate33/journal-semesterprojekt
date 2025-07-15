
import { EntryForm } from "@/components/EntryForm";

import { prisma } from "@/lib/prisma";

export default async function CreateEntry() {
  const allTags = await prisma.tag.findMany();

  return (
    <div>
      <EntryForm tags={allTags} />
    </div>
  )
}
