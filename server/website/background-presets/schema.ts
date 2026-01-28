import { z } from "zod";

export const backgroundPresetSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string().url(),
  category: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type BackgroundPreset = z.infer<typeof backgroundPresetSchema>;
