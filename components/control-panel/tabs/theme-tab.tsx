import { Palette } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BackgroundOptions from "@/components/control-panel/background-options";
import BackgroundEffect from "@/components/control-panel/background-effect";
import { CardTextureSelector } from "@/components/control-panel/texture-selector";
import type { ProfileEditorData } from "@/server/user/profile/payloads";

interface ThemeTabProps {
  profile: ProfileEditorData;
  onUpdate: (profile: ProfileEditorData) => void;
}

export function ThemeTab({ profile, onUpdate }: ThemeTabProps) {
  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Palette className="h-4 w-4" />
          Background
        </CardTitle>
        <CardDescription>Customize the editor background</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <BackgroundOptions profile={profile} onUpdate={onUpdate} />
        <BackgroundEffect profile={profile} onUpdate={onUpdate} />
        <CardTextureSelector profile={profile} onUpdate={onUpdate} />
      </CardContent>
    </Card>
  );
}
