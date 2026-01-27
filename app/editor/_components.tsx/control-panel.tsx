"use client";

import { useState } from "react";
import { TabNavigation, TabType, ProfileTab, ThemeTab, AnalyticsTab, SettingsTab } from "@/components/control-panel";
import type { ProfileEditorData } from "@/server/user/profile/payloads";

interface ControlPanelProps {
  profile: ProfileEditorData;
  onUpdate: (profile: ProfileEditorData) => void;
}

export default function ControlPanel({ profile, onUpdate }: ControlPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>("profile");

  return (
    <div className="hidden w-[560px] flex-col gap-4 overflow-y-auto bg-card/50 rounded-2xl lg:flex no-scrollbar">
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1">
        {activeTab === "profile" && <ProfileTab profile={profile} onUpdate={onUpdate} />}
        {activeTab === "theme" && <ThemeTab profile={profile} onUpdate={onUpdate} />}
        {activeTab === "analytic" && <AnalyticsTab profileId={profile.id} links={profile.links} />}
        {activeTab === "setting" && <SettingsTab />}
      </div>
    </div>
  );
}
