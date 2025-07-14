import { prisma } from "@/lib/prisma";
import "./globals.css";

export default async function Page() {
  const entries = await prisma.entry.findMany();

  return (
    <div>
      <div className="flex items-center py-5 ">
        <p className="flex-1 text-right">all</p>
        <p className="text-center px-4">|</p>
        <p className="flex-1 text-left">highlights</p>
      </div>
      <div>
        <ul>
          {entries.map((entry) => (
            <li key={entry.id}>{entry.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
