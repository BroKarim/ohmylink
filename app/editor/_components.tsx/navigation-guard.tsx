"use client";

import { useEffect } from "react";
import { useEditorStore } from "@/lib/stores/editor-store";
import { useRouter } from "next/navigation";

export function NavigationGuard() {
  const { isDirty } = useEditorStore();
  const router = useRouter();

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  return null;
}
