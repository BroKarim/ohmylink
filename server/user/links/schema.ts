import { z } from "zod";

export const SocialLinkSchema = z.object({
  platform: z.string().min(1, "Platform is required"),
  url: z.string().url("Invalid URL"),
  position: z.number().int().min(0).optional(),
});

export const LinkSchema = z
  .object({
    title: z.string().min(1, "Title is required").max(100),
    url: z.string().min(1, "URL is required"),
    icon: z.string().optional().nullable(),
    description: z.string().max(500).optional().nullable(),
    mediaUrl: z.string().optional().nullable(),
    mediaType: z.enum(["image", "video"]).optional().nullable(),
    paymentProvider: z.enum(["stripe", "lemonsqueezy"]).optional().nullable(),
    paymentAccountId: z.string().optional().nullable(),
    position: z.number().int().min(0).optional(),
    isActive: z.boolean().default(true),
  })
  .refine(
    (data) => {
      try {
        new URL(data.url);
        return true;
      } catch {
        return false;
      }
    },
    {
      message: "Invalid URL format",
      path: ["url"],
    },
  );

export type SocialLinkInput = z.infer<typeof SocialLinkSchema>;
export type LinkInput = z.infer<typeof LinkSchema>;
