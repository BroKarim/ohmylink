import { z } from "zod";

export const usernameUpdateSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters")
    .regex(/^[a-z0-9-]+$/, "Username can only contain lowercase letters, numbers, and hyphens")
    .refine((val) => !val.startsWith("-") && !val.endsWith("-"), {
      message: "Username cannot start or end with a hyphen",
    }),
});

export const publishStatusSchema = z.object({
  isPublished: z.boolean(),
});

export type UsernameUpdateInput = z.infer<typeof usernameUpdateSchema>;
export type PublishStatusInput = z.infer<typeof publishStatusSchema>;
