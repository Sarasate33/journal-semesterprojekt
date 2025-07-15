"use server";

import { prisma } from "@/lib/prisma";
import { entrySchema } from "@/lib/entrySchema";

export async function createEntry(formData: FormData) {
  const data = Object.fromEntries(formData);
  
  const validatedFields = entrySchema.safeParse({
    title: data.title,
    content: data.content,
    tags: [data.tags],
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.entry.create({
      data: {
        title: data.title as string,
        content: data.content as string,
        highlight: false,
        tags: {
          connect: {
            id: data.tags as string,
          },
        },
      },
    });

  
    return { success: true };
  } catch {
    return { error: "Failed to create entry" };
  }
}