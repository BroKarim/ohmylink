"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Grid3x3, Sparkles, Circle, Waves, StretchHorizontal, Grid2x2, RotateCcw } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { ProfileEditorData } from "@/server/user/profile/payloads";
import { updateBackgroundPattern } from "@/server/user/profile/actions";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

interface BackgroundPatternProps {
  profile: ProfileEditorData;
  onUpdate: (profile: ProfileEditorData) => void;
}

export default function BackgroundPattern({ profile, onUpdate }: BackgroundPatternProps) {
  const [isSaving, setIsSaving] = useState(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const defaultPattern = {
    type: "none",
    color: "#ffffff",
    opacity: 10,
    thickness: 100,
    scale: 100,
  };

  const bgPattern = (profile.bgPattern as any) || defaultPattern;

  // Ensure we have percentage values for thickness and scale
  const safeThickness = typeof bgPattern.thickness === "number" && bgPattern.thickness >= 13 ? bgPattern.thickness : 100;
  const safeScale = typeof bgPattern.scale === "number" && bgPattern.scale >= 13 ? bgPattern.scale : 100;

  const patterns = [
    { id: "none", label: "None", icon: Circle },
    { id: "grid", label: "Grid", icon: Grid3x3 },
    { id: "dots", label: "Dots", icon: Grid2x2 },
    { id: "stripes", label: "Stripes", icon: StretchHorizontal },
    { id: "waves", label: "Waves", icon: Waves },
    { id: "noise", label: "Noise", icon: Sparkles },
  ];

  const debouncedSave = (pattern: any) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    setIsSaving(true);
    saveTimeoutRef.current = setTimeout(async () => {
      const toastId = toast.loading("Saving pattern...");

      try {
        const result = await updateBackgroundPattern(pattern);

        if (result.success) {
          toast.success("Pattern saved", { id: toastId });
        } else {
          toast.error("Failed to save", { id: toastId });
        }
      } catch (error) {
        toast.error("Error saving pattern", { id: toastId });
      } finally {
        setIsSaving(false);
      }
    }, 1500);
  };

  const handleUpdatePattern = (updates: Partial<typeof defaultPattern>) => {
    const newPattern = {
      ...bgPattern,
      ...updates,
    };

    onUpdate({
      ...profile,
      bgPattern: newPattern,
    });

    debouncedSave(newPattern);
  };

  const handleReset = () => {
    onUpdate({
      ...profile,
      bgPattern: defaultPattern,
    });

    debouncedSave(defaultPattern);
    toast.info("Pattern reset to default");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="w-full">
          <Grid3x3 className="h-4 w-4 mr-2" />
          Background Pattern
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h4 className="font-medium text-sm leading-none">Background Pattern</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">Add geometric patterns to your background</p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground" onClick={handleReset} title="Reset to defaults">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

          {/* Pattern Type Selector */}
          <div className="space-y-2">
            <Label className="text-xs">Pattern Type</Label>
            <div className="grid grid-cols-3 gap-2">
              {patterns.map((pattern) => {
                const Icon = pattern.icon;
                const isActive = bgPattern.type === pattern.id;

                return (
                  <button
                    key={pattern.id}
                    onClick={() => handleUpdatePattern({ type: pattern.id })}
                    className={`flex flex-col items-center gap-1.5 p-2 rounded-md border transition-all ${isActive ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/50"}`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-[10px] font-medium">{pattern.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pattern Controls - Only show if not "none" */}
          {bgPattern.type !== "none" && (
            <>
              {/* Color Picker */}
              <div className="space-y-2">
                <Label className="text-xs">Color</Label>
                <div className="flex items-center gap-3">
                  <div className="relative h-8 w-12 overflow-hidden rounded-md border shadow-sm">
                    <Input type="color" value={bgPattern.color || "#ffffff"} onChange={(e) => handleUpdatePattern({ color: e.target.value })} className="absolute -inset-2 h-12 w-16 cursor-pointer" />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">{bgPattern.color}</span>
                </div>
              </div>

              {/* Opacity */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs">Opacity</Label>
                  <span className="text-xs font-mono text-muted-foreground">{bgPattern.opacity}%</span>
                </div>
                <Slider value={[bgPattern.opacity]} min={0} max={50} step={1} onValueChange={(val) => handleUpdatePattern({ opacity: val[0] })} />
              </div>

              {/* Thickness */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs">Thickness</Label>
                  <span className="text-xs font-mono text-muted-foreground">{safeThickness}%</span>
                </div>
                <Slider value={[safeThickness]} min={13} max={200} step={1} onValueChange={(val) => handleUpdatePattern({ thickness: val[0] })} />
              </div>

              {/* Scale */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs">Scale</Label>
                  <span className="text-xs font-mono text-muted-foreground">{safeScale}%</span>
                </div>
                <Slider value={[safeScale]} min={13} max={200} step={1} onValueChange={(val) => handleUpdatePattern({ scale: val[0] })} />
              </div>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
