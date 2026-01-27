'use client'

import { useState } from "react";
import EditorHeader from "./editor-header";
import Preview from "./editor-preview";
import ControlPanel from "./control-panel";
import { EditorDock } from "./editor-dock";
import type { ProfileEditorData } from "@/server/user/profile/payloads";

interface EditorClientProps {
  initialProfile: ProfileEditorData;
}

export default function EditorClient({ initialProfile }: EditorClientProps) {
  const [profile, setProfile] = useState<ProfileEditorData>(initialProfile);
  const [viewMode, setViewMode] = useState<"mobile" | "desktop">("mobile");

  return (
    <main className="min-h-screen flex h-screen flex-col bg-background">
      <EditorHeader profile={profile} />

      <div className="flex flex-1 gap-6 overflow-hidden p-6">
        <Preview profile={profile} viewMode={viewMode} />
        <ControlPanel profile={profile} onUpdate={setProfile} />
      </div>

      <EditorDock viewMode={viewMode} setViewMode={setViewMode} />
    </main>
  );
}
