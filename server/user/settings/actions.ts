"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function getOnboardingStatus() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) return { isOnboarded: false };

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: {
      isOnboarded: true,
      profiles: {
        select: { username: true },
        take: 1,
      },
    },
  });

  return {
    isOnboarded: user?.isOnboarded ?? false,
    username: user?.profiles[0]?.username,
  };
}

export async function checkUsernameAvailability(username: string) {
  const existing = await db.profile.findUnique({
    where: { username: username.toLowerCase() },
  });
  return !existing;
}

export async function setupUsername(username: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) throw new Error("Unauthorized");

  const formattedUsername = username.toLowerCase();

  // Update User & Create Initial Profile in one transaction
  await db.$transaction([
    db.user.update({
      where: { id: session.user.id },
      data: {
        isOnboarded: true,
      },
    }),
    db.profile.create({
      data: {
        userId: session.user.id,
        username: formattedUsername,
        displayName: session.user.name || formattedUsername,
        // Default design state bisa ditaruh di sini
      },
    }),
  ]);

  revalidatePath("/dashboard");
  return { success: true, username: formattedUsername };
}

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start
    .replace(/-+$/, ""); // Trim - from end
}

export async function ensureUserHasProfile() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) throw new Error("Unauthorized");

  // Check existing
  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: { profiles: { take: 1 } },
  });

  if (!user) throw new Error("User not found");

  if (user.profiles[0]) {
    // Ensure isOnboarded is true if profile exists
    if (!user.isOnboarded) {
      await db.user.update({ where: { id: user.id }, data: { isOnboarded: true } });
    }
    return { success: true, username: user.profiles[0].username };
  }

  // Create new profile
  let baseUsername = slugify(user.name || user.email.split("@")[0] || "user");
  if (baseUsername.length < 3) baseUsername = "user-" + baseUsername; // ensure min length

  let username = baseUsername;
  let counter = 1;

  while (true) {
    const existing = await db.profile.findUnique({ where: { username } });
    if (!existing) break;
    username = `${baseUsername}-${counter}`;
    counter++;
  }

  await db.$transaction([
    db.user.update({
      where: { id: session.user.id },
      data: { isOnboarded: true },
    }),
    db.profile.create({
      data: {
        userId: session.user.id,
        username,
        displayName: user.name || username,
        avatarUrl: user.image,
      },
    }),
  ]);

  return { success: true, username };
}
