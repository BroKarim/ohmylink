"use client";

import { Label } from "@/components/ui/label";
import { THEMES, ProfileTheme } from "@/lib/themes";
import type { ProfileEditorData } from "@/server/user/profile/payloads";
import { updateTheme } from "@/server/user/profile/actions";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Icons } from "@/components/icons";

interface ThemeSelectorProps {
  profile: ProfileEditorData;
  onUpdate: (profile: ProfileEditorData) => void;
}

export function ThemeSelector({ profile, onUpdate }: ThemeSelectorProps) {
  const themes = Object.values(THEMES);
  const saveTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    // Debounce save to database
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(async () => {
      const result = await updateTheme(profile.theme);
      if (!result.success) {
        toast.error(result.error || "Failed to save theme");
      }
    }, 500);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [profile.theme]);

  const renderIcon = (theme: ProfileTheme) => {
    if (theme.icon && Icons[theme.icon as keyof typeof Icons]) {
      const Icon = Icons[theme.icon as keyof typeof Icons];
      return <Icon className="h-4 w-4 shrink-0" />;
    }
    return <div className="h-4 w-4 shrink-0 rounded-full border border-black/5 dark:border-white/10 shadow-sm" style={{ background: theme.variables["--primary"] || theme.variables["--foreground"] }} />;
  };

  return (
    <div className="space-y-3">
      <Label className="text-xs tracking-wider text-muted-foreground  font-semibold">Theme Preset</Label>
      <Select value={profile.theme} onValueChange={(value) => onUpdate({ ...profile, theme: value })}>
        <SelectTrigger className="w-full h-12 bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors">
          <SelectValue placeholder="Select a theme">
            {profile.theme && (
              <div className="flex items-center gap-3">
                {renderIcon(THEMES[profile.theme] || THEMES["default"])}
                <span className="font-medium">{(THEMES[profile.theme] || THEMES["default"]).name}</span>
              </div>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent side="bottom" align="start" className="rounded-xl border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl">
          {themes.map((theme) => (
            <SelectItem key={theme.id} value={theme.id} className="focus:bg-zinc-100 dark:focus:bg-zinc-800 rounded-lg m-1 py-3 px-3 cursor-pointer">
              <div className="flex items-center gap-3">
                {renderIcon(theme)}
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{theme.name}</span>
                  <span className="text-[10px] text-muted-foreground capitalize opacity-70">{theme.type} mode</span>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
