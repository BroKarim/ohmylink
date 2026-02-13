"use client";

import { useState } from "react";
import { TabNavigation, TabType, ProfileTab, ThemeTab, AnalyticsTab, SettingsTab } from "@/components/control-panel";
import { AnalyticsTabSoon } from "@/components/control-panel/analytics-tab-soon";
import type { ProfileEditorData } from "@/server/user/profile/payloads";

interface ControlPanelProps {
  profile: ProfileEditorData;
  onUpdate: (profile: ProfileEditorData) => void;
}

export default function ControlPanel({ profile, onUpdate }: ControlPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [mountedTabs, setMountedTabs] = useState<Partial<Record<TabType, boolean>>>({
    profile: true,
  });

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setMountedTabs((prev) => ({ ...prev, [tab]: true }));
  };

  return (
    <div className="hidden w-[500px] flex-col gap-4 overflow-y-auto bg-[#181819] shadow-[0px_32px_64px_-16px_#0000004c,0px_16px_32px_-8px_#0000004c,0px_8px_16px_-4px_#0000003d,0px_4px_8px_-2px_#0000003d,0px_-8px_16px_-1px_#00000029,0px_2px_4px_-1px_#0000003d,0px_0px_0px_1px_#000000,inset_0px_0px_0px_1px_#ffffff14,inset_0px_1px_0px_#ffffff33] border-none rounded-2xl lg:flex no-scrollbar">
      <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />

      <div className="flex-1">
        <div className={activeTab === "profile" ? "block" : "hidden"}>{mountedTabs.profile && <ProfileTab profile={profile} onUpdate={onUpdate} />}</div>
        <div className={activeTab === "theme" ? "block" : "hidden"}>{mountedTabs.theme && <ThemeTab profile={profile} onUpdate={onUpdate} />}</div>
        <div className={activeTab === "analytic" ? "block" : "hidden"}>{mountedTabs.analytic && <AnalyticsTabSoon />}</div>
        <div className={activeTab === "setting" ? "block" : "hidden"}>{mountedTabs.setting && <SettingsTab profile={profile} />}</div>
      </div>
    </div>
  );
}
