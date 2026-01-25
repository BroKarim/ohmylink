"use client";

import { AlignCenter, AlignRight, LayoutDashboard } from "lucide-react";
import { Label } from "@/components/ui/label";
import type { ProfileEditorData } from "@/server/user/profile/payloads";
import { ProfileLayout } from "@/lib/generated/prisma/enums";
import { updateLayout } from "@/server/user/profile/actions";
import { toast } from "sonner";
import { useState } from "react";

interface ProfileLayoutSelectorProps {
  profile: ProfileEditorData;
  onUpdate: (profile: ProfileEditorData) => void;
}

export function ProfileLayoutSelector({ profile, onUpdate }: ProfileLayoutSelectorProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const layouts = [
    { id: ProfileLayout.center, icon: AlignCenter, label: "Centered" },
    { id: ProfileLayout.left_stack, icon: AlignRight, label: "Left Stack" },
    { id: ProfileLayout.left_row, icon: LayoutDashboard, label: "Left Row" },
  ];

  const handleLayoutChange = async (layout: ProfileLayout) => {
    setIsUpdating(true);
    try {
      const result = await updateLayout(layout);

      if (result.success && result.data) {
        onUpdate(result.data);
        toast.success("Layout updated!");
      } else {
        toast.error(result.error || "Failed to update layout");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating layout");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-3">
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">Profile Layout</Label>
      <div className="grid grid-cols-3 gap-2">
        {layouts.map((layout) => {
          const Icon = layout.icon;
          return (
            <button
              key={layout.id}
              onClick={() => handleLayoutChange(layout.id)}
              disabled={isUpdating}
              className={`flex flex-col items-center justify-center gap-2 rounded-lg border-2 p-3 transition-all disabled:opacity-50 ${
                profile.layout === layout.id ? "border-primary bg-primary/5 text-primary" : "border-muted bg-transparent text-muted-foreground hover:border-border hover:text-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{layout.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
