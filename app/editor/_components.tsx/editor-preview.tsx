"use client";

import { PreviewBackground, PreviewProfile, PreviewSocials, PreviewLinks } from "@/components/preview";
import type { ProfileEditorData } from "@/server/user/profile/payloads";

interface PreviewProps {
  profile: ProfileEditorData;
  viewMode: "mobile" | "desktop";
}

export default function Preview({ profile, viewMode }: PreviewProps) {
  return (
    <div className="flex flex-1 flex-col gap-4 overflow-hidden">
      <div className="relative flex flex-1 items-center justify-center overflow-hidden rounded-2xl border border-dashed border-border bg-card/50 p-4">
        <div
          className={`relative transition-all duration-500 ease-in-out overflow-hidden shadow-2xl ${
            viewMode === "mobile" ? "aspect-9/19 w-full max-w-[360px] rounded-[2.5rem] border-4 border-zinc-950" : "h-full w-full rounded-xl border-border border"
          }`}
        >
          <PreviewBackground profile={profile} />

          <div className="relative h-full overflow-y-auto no-scrollbar" style={{ padding: `${profile.padding}px` }}>
            <div className="mx-auto flex w-full max-w-[420px] flex-col items-center pb-10 pt-12">
              <PreviewProfile profile={profile} />
              <PreviewSocials profile={profile} />
              <PreviewLinks profile={profile} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
