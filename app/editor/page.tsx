"use client"
import ControlPanel from "./_components.tsx/control-panel"
import EditorHeader from "./_components.tsx/editor-header"
import Preview from "./_components.tsx/editor-preview"
import { useEditorState } from "@/hooks/use-editor-state"

export default function EditorPage() {
  const { state, updateState } = useEditorState()
  return (
    <main className="min-h-screen flex h-screen flex-col bg-background">
      <EditorHeader />
      <div className="flex flex-1 gap-6 overflow-hidden p-6">
        <Preview state={state} />
        <ControlPanel state={state} onUpdate={updateState} />
      </div>
    </main>
  )
}
