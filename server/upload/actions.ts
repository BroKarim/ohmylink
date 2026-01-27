"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { uploadBase64ToS3 } from "@/lib/s3";

export async function uploadImage(base64: string, fileName: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { success: false, error: "Unauthorized" };
    }

    const url = await uploadBase64ToS3(base64, fileName);

    return { success: true, url };
  } catch (error) {
    console.error("Failed to upload image:", error);
    return { success: false, error: "Failed to upload image" };
  }
}
