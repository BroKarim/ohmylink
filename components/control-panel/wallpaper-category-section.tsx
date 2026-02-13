"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { BackgroundPreset } from "@/server/website/background-presets/schema";
import type { ProfileEditorData } from "@/server/user/profile/payloads";

interface WallpaperCategorySectionProps {
  category: string;
  wallpapers: BackgroundPreset[];
  selectedWallpaper: string | null;
  onSelect: (url: string) => void;
}

export default function WallpaperCategorySection({ category, wallpapers, selectedWallpaper, onSelect }: WallpaperCategorySectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Tampilkan 5 gambar pertama + 1 button expand
  const initialDisplayCount = 5;
  const hasMore = wallpapers.length > initialDisplayCount;
  const displayedWallpapers = isExpanded ? wallpapers : wallpapers.slice(0, initialDisplayCount);

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-3 gap-2">
        {displayedWallpapers.map((preset) => (
          <button
            key={preset.id}
            onClick={() => onSelect(preset.url)}
            className={`relative h-20 overflow-hidden rounded-lg border-2 transition-all ${
              selectedWallpaper === preset.url ? "border-primary ring-2 ring-primary/20 ring-offset-2 ring-offset-background scale-105" : "border-transparent hover:border-primary/50 hover:scale-105"
            }`}
            title={preset.name}
          >
            <Image src={preset.url} fill className="object-cover transition-transform duration-500 group-hover:scale-110" alt={preset.name} sizes="(max-width: 768px) 33vw, 100px" />
            {selectedWallpaper === preset.url && <div className="absolute inset-0 bg-primary/10 border-2 border-primary/30" />}
          </button>
        ))}

        {/* Expand/Collapse Button - Positioned at cell 6 (row 2, col 3) */}
        {hasMore && !isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="relative h-20 overflow-hidden rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 hover:bg-muted/40 hover:border-primary/50 transition-all hover:scale-105 flex flex-col items-center justify-center gap-1"
          >
            <ChevronDown className="h-6 w-6 text-muted-foreground" />
            <span className="text-[10px] font-medium text-muted-foreground">+{wallpapers.length - initialDisplayCount} more</span>
          </button>
        )}
      </div>

      {/* Collapse Button - Shown when expanded */}
      {isExpanded && hasMore && (
        <button
          onClick={() => setIsExpanded(false)}
          className="w-full py-2 rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 hover:bg-muted/40 hover:border-primary/50 transition-all flex items-center justify-center gap-2"
        >
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground">Show Less</span>
        </button>
      )}
    </div>
  );
}
