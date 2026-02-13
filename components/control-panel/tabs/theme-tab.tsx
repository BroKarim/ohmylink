import BackgroundOptions from "@/components/control-panel/background-options";
import BackgroundPattern from "@/components/control-panel/background-pattern";
import BackgroundEffect from "@/components/control-panel/background-effect";
import { CardTextureSelector } from "@/components/control-panel/texture-selector";
import { ThemeSelector } from "@/components/control-panel/theme-selector";
import type { ProfileEditorData } from "@/server/user/profile/payloads";

interface ThemeTabProps {
  profile: ProfileEditorData;
  onUpdate: (profile: ProfileEditorData) => void;
}

export function ThemeTab({ profile, onUpdate }: ThemeTabProps) {
  return (
    <div className="px-3 pb-4">
      <div className="space-y-6">
        <div>
          <ThemeSelector profile={profile} onUpdate={onUpdate} />
        </div>

        <div className="w-full flex gap-x-2 justify-between items-center">
          <BackgroundPattern profile={profile} onUpdate={onUpdate} />
          <BackgroundEffect profile={profile} onUpdate={onUpdate} />
        </div>

        <div>
          <BackgroundOptions profile={profile} onUpdate={onUpdate} />
        </div>

        <div>
          <CardTextureSelector profile={profile} onUpdate={onUpdate} />
        </div>
      </div>
    </div>
  );
}
