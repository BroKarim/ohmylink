import { z } from "zod";

export const SocialLinkSchema = z.object({
  platform: z.string().min(1, "Platform is required"),
  url: z.string().url("Invalid URL"),
  position: z.number().int().min(0).optional(),
});

export const LinkSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  url: z.string().url("Invalid URL"),
  icon: z.string().optional().nullable(),
  description: z.string().max(500).optional().nullable(),
  imageUrl: z.string().url().optional().nullable(),
  videoUrl: z.string().url().optional().nullable(),
  isStripeEnabled: z.boolean().default(false),
  position: z.number().int().min(0).optional(),
  isActive: z.boolean().default(true),
});

export type SocialLinkInput = z.infer<typeof SocialLinkSchema>;
export type LinkInput = z.infer<typeof LinkSchema>;
