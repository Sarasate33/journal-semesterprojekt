import { prisma } from "@/lib/prisma";
import "./globals.css";
import { DisplayEntries } from "@/components/displayEntries";

export default async function Page() {
  const entries = await prisma.entry.findMany({
    include: {
      tags:  true,
    },
  });

  return (
    <div>
      <div className="flex items-center py-5 ">
        <p className="flex-1 text-right">all</p>
        <p className="text-center px-4">|</p>
        <p className="flex-1 text-left">highlights</p>
      </div>
      <div>
        <DisplayEntries entries={entries} />
      </div>
    </div>
  );
}
