import React from "react";
import { SOCIAL_PLATFORMS } from "@/lib/sosmed";
import { Dock, DockIcon } from "@/components/ui/dock";
import { Globe } from "lucide-react";

interface PreviewSocialsProps {
  profile: {
    socials: {
      id: string;
      platform: string;
      url: string;
    }[];
  };
}

export function PreviewSocials({ profile }: PreviewSocialsProps) {
  if (!profile.socials || profile.socials.length === 0) return null;

  return (
    <div className="absolute bottom-6 left-0 right-0 z-50 px-4 pointer-events-none">
      <Dock iconSize={40}>
        {profile.socials.map((social) => {
          const platform = SOCIAL_PLATFORMS.find((p) => p.id === social.platform);
          const Icon = platform?.icon || Globe;

          return (
            <DockIcon key={social.id} href={social.url} label={platform?.label || "Link"}>
              <Icon className="h-5 w-5" />
            </DockIcon>
          );
        })}
      </Dock>
    </div>
  );
}
