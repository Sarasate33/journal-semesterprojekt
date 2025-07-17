"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createEntry(formData: FormData) {
  const tagIds = formData.get("tags") as string;
  const createTag = formData.get("createTag") as string;
  const stringHighlight = formData.get("highlight") as string;
  const boolHighlight: boolean = stringHighlight.toLowerCase() == "true";

  if (tagIds || createTag) {
    await prisma.entry.create({
      data: {
        title: formData.get("title") as string,
        content: formData.get("content") as string,
        highlight: boolHighlight,
        tags: {
          connectOrCreate: tagIds.split(",").map((id) => ({
            where: { id },
            create: { label: formData.get("createTag") as string },
          })),
        },
      },
      include: {
        tags: true,
      },
    });
  } else {
    await prisma.entry.create({
      data: {
        title: formData.get("title") as string,
        content: formData.get("content") as string,
        highlight: boolHighlight,
      },
    });
  }
}

export async function updateHighlight(formData: FormData) {
  const stringHighlight = formData.get("highlight") as string;
  const boolHighlight: boolean = stringHighlight.toLowerCase() == "true";

  await prisma.entry.update({
    where: {
      id: formData.get("id") as string,
    },
    data: {
      highlight: boolHighlight,
    },
  });

  revalidatePath("/");
}
