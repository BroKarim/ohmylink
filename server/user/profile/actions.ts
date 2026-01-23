"use server"

import {db} from "@/lib/db";
import { auth } from "@/lib/auth"; // Asumsi path auth kamu
import { ProfileSchema, ProfileInput } from "./schema";
import { revalidatePath } from "next/cache";

export async function updateProfile(data: ProfileInput) {
  try {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    // 1. Validasi input menggunakan Zod
    const validatedData = ProfileSchema.parse(data);

    // 2. Update ke Database
    const updatedProfile = await db.profile.update({
      where: { userId: session.user.id },
      data: {
        displayName: validatedData.displayName,
        bio: validatedData.bio,
        avatarUrl: validatedData.avatarUrl,
        layout: validatedData.layout,
        bgType: validatedData.bgType,
        bgColor: validatedData.bgColor,
        bgGradientFrom: validatedData.bgGradientFrom,
        bgGradientTo: validatedData.bgGradientTo,
        bgWallpaper: validatedData.bgWallpaper,
        bgImage: validatedData.bgImage,
        blurAmount: validatedData.blurAmount,
        padding: validatedData.padding,
        cardTexture: validatedData.cardTexture,
        // bgEffects disimpan sebagai JSON
        bgEffects: validatedData.bgEffects as any, 
      },
    });

    // 3. Refresh cache agar preview terbaru muncul
    revalidatePath("/dashboard");
    revalidatePath(`/${session.user.username}`);

    return { success: true, data: updatedProfile };
  } catch (error) {
    console.error("Failed to update profile:", error);
    return { success: false, error: "Internal Server Error" };
  }
}