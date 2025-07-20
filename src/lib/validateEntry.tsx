"use server";

import { createEntry } from "@/actions/actions";
import { entrySchema } from "@/lib/entrySchema";

export type EntryActionState =
  | { errors: { title?: string[]; content?: string[] } }
  | { success: string };

export async function validateEntry(
  prevState: EntryActionState,
  formData: FormData
): Promise<EntryActionState> {
  const entryFormData = Object.fromEntries(formData);
  const validatedEntryFormData = entrySchema.safeParse(entryFormData);

  if (!validatedEntryFormData.success) {
    return {
      errors: validatedEntryFormData.error.flatten().fieldErrors,
    };
  }

  await createEntry(formData);
  return {
    success: "Your entry was saved successfully!",
  };
}
