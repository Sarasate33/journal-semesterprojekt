"use Server";

import { z } from "zod";

export const entrySchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  tags: z.array(z.string()).optional(),
  highlight: z.string().optional(),
  date: z.string().optional(),
});

export async function validateEntry(prevState: undefined, formData: FormData) {
  const entryFormData = Object.fromEntries(formData);
  const validatedEntryFormData = entrySchema.safeParse(entryFormData);

  if (!validatedEntryFormData.success) {
    const formFieldErrors = validatedEntryFormData.error.flatten().fieldErrors;

    return {
        errors: {
            title: formFieldErrors?.title,
            content: formFieldErrors?.content,
        },
    };
  }

  return {
    success: "Your entry was saved successfully!"
  }
}
