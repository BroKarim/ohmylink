"use client"

import { useState } from "react"
import EditorHeader from "./editor-header"
import EditorPreview from "./editor-preview"
import ControlPanel from "./control-panel"

interface EditorState {
  backgroundType: "wallpaper" | "color" | "gradient"
  backgroundColor: string
  backgroundGradient: { from: string; to: string }
  backgroundWallpaper: string | null
  backgroundImage: string | null
  blurAmount: number
  padding: number
  // New Profile Data
  profile: {
    name: string
    description: string
    avatar: string | null
  }
  profileLayout: "center" | "left-stack" | "left-row"
  socials: Array<{ id: string; platform: string; url: string }>;
}

export default function DashboardEditor() {
  const [state, setState] = useState<EditorState>({
    backgroundType: "gradient",
    backgroundColor: "#1a1a1a",
    backgroundGradient: { from: "#4f46e5", to: "#ec4899" },
    backgroundWallpaper: null,
    backgroundImage: null,
    blurAmount: 8,
    padding: 16,
    profile: {
      name: "Brokerish",
      description: "Design and build tools people love",
      avatar: null,
    },
    profileLayout: "center",
    socials: [],
  })

  const updateState = (updates: Partial<EditorState>) => {
    setState((prev) => ({ ...prev, ...updates }))
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      <EditorHeader />
      <div className="flex flex-1 gap-6 overflow-hidden p-6">
        <EditorPreview state={state} />
        <ControlPanel state={state} onUpdate={updateState} />
      </div>
    </div>
  )
}
