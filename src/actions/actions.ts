"use server";

import { prisma } from "@/lib/prisma";

export async function createEntry(formData: FormData) {
  const tagIds = formData.get("tags") as string;

  if (tagIds) {
    await prisma.entry.create({
      data: {
        title: formData.get("title") as string,
        content: formData.get("content") as string,
        highlight: false,
        tags: {
          connect: tagIds.split(",").map(id => ({ id }))
        },
      },
    });
  } else {
    await prisma.entry.create({
      data: {
        title: formData.get("title") as string,
        content: formData.get("content") as string,
        highlight: false,
      },
    });
  }
}
