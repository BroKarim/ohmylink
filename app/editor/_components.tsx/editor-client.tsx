"use client";

import { useState } from "react";
import EditorHeader from "./editor-header";
import Preview from "./editor-preview";
import ControlPanel from "./control-panel";
import type { ProfileEditorData } from "@/server/user/profile/payloads";

interface EditorClientProps {
  initialProfile: ProfileEditorData;
}

export default function EditorClient({ initialProfile }: EditorClientProps) {
  const [profile, setProfile] = useState<ProfileEditorData>(initialProfile);

  return (
    <main className="min-h-screen flex h-screen flex-col bg-background">
      <EditorHeader />

      <div className="flex flex-1 gap-6 overflow-hidden p-6">
        <Preview profile={profile} />
        <ControlPanel profile={profile} onUpdate={setProfile} />
      </div>
    </main>
  );
}
