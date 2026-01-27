import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Sparkles, Sun, Droplets, Contrast, EyeOff } from "lucide-react";
import type { ProfileEditorData } from "@/server/user/profile/payloads";

interface BackgroundEffectsProps {
  profile: ProfileEditorData;
  onUpdate: (profile: ProfileEditorData) => void;
}

export default function BackgroundEffects({ profile, onUpdate }: BackgroundEffectsProps) {
  const bgEffects = (profile.bgEffects as any) || {
    blur: 0,
    noise: 0,
    brightness: 100,
    saturation: 100,
    contrast: 100,
  };

  const settings = [
    { id: "blur", label: "Blur", icon: EyeOff, min: 0, max: 20, step: 1, unit: "px" },
    { id: "noise", label: "Grain / Noise", icon: Sparkles, min: 0, max: 100, step: 1, unit: "%" },
    { id: "brightness", label: "Brightness", icon: Sun, min: 50, max: 150, step: 1, unit: "%" },
    { id: "saturation", label: "Saturation", icon: Droplets, min: 0, max: 200, step: 1, unit: "%" },
    { id: "contrast", label: "Contrast", icon: Contrast, min: 50, max: 150, step: 1, unit: "%" },
  ];

  const handleUpdateEffect = (id: string, value: number) => {
    onUpdate({
      ...profile,
      bgEffects: {
        ...bgEffects,
        [id]: value,
      },
    });
  };

  return (
    <div className="space-y-6 pt-2">
      {settings.map((item) => {
        const Icon = item.icon;
        const value = bgEffects[item.id] ?? (item.id === "blur" || item.id === "noise" ? 0 : 100);

        return (
          <div key={item.id} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Icon className="h-4 w-4 text-muted-foreground" />
                <Label>{item.label}</Label>
              </div>
              <span className="text-xs font-mono text-muted-foreground">
                {value}
                {item.unit}
              </span>
            </div>
            <Slider value={[value]} min={item.min} max={item.max} step={item.step} onValueChange={(val: any) => handleUpdateEffect(item.id, val[0])} className="py-2" />
          </div>
        );
      })}
    </div>
  );
}
