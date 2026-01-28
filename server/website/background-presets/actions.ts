"use server";

import { db } from "@/lib/db";
import type { BackgroundPreset } from "./schema";

/**
 * Get all background presets from database
 * Returns empty array if no presets found
 */
export async function getBackgroundPresets(): Promise<BackgroundPreset[]> {
  try {
    const presets = await db.backgroundPreset.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return presets;
  } catch (error) {
    console.error("Failed to fetch background presets:", error);
    return [];
  }
}

/**
 * Get background presets by category
 */
export async function getBackgroundPresetsByCategory(category: string): Promise<BackgroundPreset[]> {
  try {
    const presets = await db.backgroundPreset.findMany({
      where: {
        category,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return presets;
  } catch (error) {
    console.error("Failed to fetch background presets by category:", error);
    return [];
  }
}
