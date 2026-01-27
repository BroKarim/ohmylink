"use client";

import { ViewModeToggle } from "@/components/preview";

interface EditorDockProps {
  viewMode: "mobile" | "desktop";
  setViewMode: (mode: "mobile" | "desktop") => void;
}

export function EditorDock({ viewMode, setViewMode }: EditorDockProps) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-card/80 backdrop-blur-xl border border-border rounded-2xl shadow-2xl px-4 py-3">
        <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
      </div>
    </div>
  );
}
