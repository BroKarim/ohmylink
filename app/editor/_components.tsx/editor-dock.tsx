import { ViewModeToggle } from "@/components/preview";

interface EditorDockProps {
  viewMode: "mobile" | "desktop";
  setViewMode: (mode: "mobile" | "desktop") => void;
}

export function EditorDock({ viewMode, setViewMode }: EditorDockProps) {
  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-zinc-900/80 backdrop-blur-md rounded-full shadow-dzenn border border-white/5 p-2">
        <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
      </div>
    </div>
  );
}
