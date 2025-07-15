"use server";

import { prisma } from "@/lib/prisma";

export async function createEntry(formData: FormData) {
  const tagId = formData.get("tags") as string;
  

  await prisma.entry.create({
    data: {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      highlight: false,
      tags: {
        connect: {
          id: tagId,
        },
      },
    },
  });
}
