"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { SocialLinkSchema, LinkSchema, SocialLinkInput, LinkInput } from "./schema";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

// ============= SOCIAL LINKS =============

export async function createSocialLink(data: SocialLinkInput) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    const profile = await db.profile.findUnique({
      where: { userId: session.user.id },
      select: { id: true },
    });

    if (!profile) {
      return { success: false, error: "Profile not found" };
    }

    const validatedData = SocialLinkSchema.parse(data);

    const socialLink = await db.socialLink.create({
      data: {
        ...validatedData,
        profileId: profile.id,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath(`/${session.user.username}`);

    return { success: true, data: socialLink };
  } catch (error) {
    console.error("Failed to create social link:", error);
    return { success: false, error: "Failed to create social link" };
  }
}

export async function updateSocialLink(id: string, data: SocialLinkInput) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    const validatedData = SocialLinkSchema.parse(data);

    const socialLink = await db.socialLink.update({
      where: { id },
      data: validatedData,
    });

    revalidatePath("/dashboard");
    revalidatePath(`/${session.user.username}`);

    return { success: true, data: socialLink };
  } catch (error) {
    console.error("Failed to update social link:", error);
    return { success: false, error: "Failed to update social link" };
  }
}

export async function deleteSocialLink(id: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    await db.socialLink.delete({
      where: { id },
    });

    revalidatePath("/dashboard");
    revalidatePath(`/${session.user.username}`);

    return { success: true };
  } catch (error) {
    console.error("Failed to delete social link:", error);
    return { success: false, error: "Failed to delete social link" };
  }
}

// ============= LINKS =============

export async function createLink(data: LinkInput) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    const profile = await db.profile.findUnique({
      where: { userId: session.user.id },
      select: { id: true },
    });

    if (!profile) {
      return { success: false, error: "Profile not found" };
    }

    const validatedData = LinkSchema.parse(data);

    const link = await db.link.create({
      data: {
        ...validatedData,
        profileId: profile.id,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath(`/${session.user.username}`);

    return { success: true, data: link };
  } catch (error) {
    console.error("Failed to create link:", error);
    return { success: false, error: "Failed to create link" };
  }
}

export async function updateLink(id: string, data: Partial<LinkInput>) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    const link = await db.link.update({
      where: { id },
      data,
    });

    revalidatePath("/dashboard");
    revalidatePath(`/${session.user.username}`);

    return { success: true, data: link };
  } catch (error) {
    console.error("Failed to update link:", error);
    return { success: false, error: "Failed to update link" };
  }
}

export async function deleteLink(id: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    await db.link.delete({
      where: { id },
    });

    revalidatePath("/dashboard");
    revalidatePath(`/${session.user.username}`);

    return { success: true };
  } catch (error) {
    console.error("Failed to delete link:", error);
    return { success: false, error: "Failed to delete link" };
  }
}
