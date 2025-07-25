"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createEntry(formData: FormData) {
  const tagLabels = formData.get("tags") as string;
  const labels = tagLabels
    ? tagLabels.split(",").map((label) => label.trim())
    : [];
  const stringHighlight = formData.get("highlight") as string;
  const boolHighlight: boolean = stringHighlight.toLowerCase() == "true";
  const createdAtString = formData.get("createdAt") as string;

  if (tagLabels) {
    await prisma.entry.create({
      data: {
        title: formData.get("title") as string,
        content: formData.get("content") as string,
        highlight: boolHighlight,
        tags: {
          connectOrCreate: labels.map((label) => {
            return {
              where: { label },
              create: { label },
            };
          }),
        },
        createdAt: new Date(createdAtString),
      },
    });
  } else {
    await prisma.entry.create({
      data: {
        title: formData.get("title") as string,
        content: formData.get("content") as string,
        highlight: boolHighlight,
        createdAt: new Date(createdAtString),
      },
    });
  }
  revalidatePath("/");
  redirect("/");
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
