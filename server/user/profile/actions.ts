// server/user/profile/actions.ts
"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { ProfileSchema, ProfileInput } from "./schema";
import { profileEditorPayload } from "./payloads";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { ProfileLayout } from "@/lib/generated/prisma/enums";

export async function updateProfile(data: ProfileInput) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    const validatedData = ProfileSchema.parse(data);

    const updatedProfile = await db.profile.update({
      where: { userId: session.user.id },
      data: validatedData,
      select: profileEditorPayload,
    });

    revalidatePath("/dashboard");
    revalidatePath(`/${session.user.username}`);

    return { success: true, data: updatedProfile };
  } catch (error) {
    console.error("Failed to update profile:", error);
    return { success: false, error: "Failed to update profile" };
  }
}

export async function updateLayout(layout: ProfileLayout) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    const updatedProfile = await db.profile.update({
      where: { userId: session.user.id },
      data: { layout },
      select: profileEditorPayload,
    });

    revalidatePath("/dashboard");
    revalidatePath(`/${session.user.username}`);

    return { success: true, data: updatedProfile };
  } catch (error) {
    console.error("Failed to update layout:", error);
    return { success: false, error: "Failed to update layout" };
  }
}

export async function getProfile() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    const profile = await db.profile.findUnique({
      where: { userId: session.user.id },
      select: profileEditorPayload,
    });

    if (!profile) {
      return { success: false, error: "Profile not found" };
    }

    return { success: true, data: profile };
  } catch (error) {
    console.error("Failed to get profile:", error);
    return { success: false, error: "Failed to get profile" };
  }
}
