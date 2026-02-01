import React from "react"
import { Icons } from "@/components/icons"

interface ViewModeToggleProps {
  viewMode: "mobile" | "desktop"
  setViewMode: (mode: "mobile" | "desktop") => void
}

export function ViewModeToggle({ viewMode, setViewMode }: ViewModeToggleProps) {
  return (
    <div className="flex justify-center">
      <div className="flex items-center gap-1 rounded-full  p-1">
        <button
          onClick={() => setViewMode("mobile")}
          className={`flex items-center gap-2 rounded-full px-3 py-1.5  font-semibold transition-all ${viewMode === "mobile" ? "bg-[#292a2c] text-white  shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
        >
          <Icons.phone className="h-4 w-4 text-white  " />
          Mobile
        </button>
        <button
          onClick={() => setViewMode("desktop")}
          className={`flex items-center gap-2 rounded-full px-3 py-1.5  font-semibold transition-all ${viewMode === "desktop" ? "bg-[#292a2c] text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
        >
          <Icons.monitor className="h-4 w-4" />
          Desktop
        </button>
      </div>
    </div>
  );
}
