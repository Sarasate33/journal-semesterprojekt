"use server";

import { createEntry } from "@/actions/actions";
import { entrySchema } from "@/lib/entrySchema";

export type EntryFormState =
  | { errors: { title?: string[]; content?: string[] } }
  | { success: string };

export async function validateEntry(
  prevState: EntryFormState,
  formData: FormData
): Promise<EntryFormState> {
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

  await createEntry(formData);
  return {
    success: "Your entry was saved successfully!",
  };
}
