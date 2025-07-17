import { prisma } from "@/lib/prisma";
import "./globals.css";
import { SwitchDisplay } from "@/components/switchDisplay";

export default async function Page() {
  const allEntries = await prisma.entry.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      tags: true,
    },
  });
  const highlightedEntries = await prisma.entry.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      tags: true,
    },
    where: {
      highlight: true,
    },
  });

  return (
    <div>
      <SwitchDisplay
        allEntries={allEntries}
        highlightedEntries={highlightedEntries}
      />
    </div>
  );
}
