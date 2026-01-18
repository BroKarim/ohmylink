"use client"

import React, { useState } from "react"
import { TexturedCard } from './texture-card';
import { Icons } from '@/components/icons';
import {Globe} from "lucide-react"
import { SOCIAL_PLATFORMS } from '@/lib/sosmed';
interface PreviewProps {
  state: {
    backgroundType: string
    backgroundColor: string
    backgroundGradient: { from: string; to: string }
    backgroundWallpaper: string | null
    backgroundImage: string | null
    blurAmount: number
    padding: number
    profile: {
      name: string
      description: string
      avatar: string | null
    }
    profileLayout: "center" | "left-stack" | "left-row"
    socials: {
      id: string
      platform: string
      url: string
    }[]
  } 
}

export default function EditorPreview({ state }: PreviewProps) {
  const [viewMode, setViewMode] = useState<"mobile" | "desktop">("mobile")
  
  const getBackgroundStyle = () => {
  switch (state.backgroundType) {
    case "gradient":
      return { background: `linear-gradient(135deg, ${state.backgroundGradient.from} 0%, ${state.backgroundGradient.to} 100%)` }
    case "wallpaper":
      return { 
        backgroundImage: `url(${state.backgroundWallpaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }
    case "image":
      return { 
        backgroundImage: `url(${state.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }
    default:
      return { backgroundColor: state.backgroundColor }
  }
}

  return (
   <div className="flex flex-1 flex-col gap-4 overflow-hidden">
      {/* View Switcher Toggle */}
      <div className="flex justify-center">
        <div className="flex items-center gap-1 rounded-lg border border-border bg-muted p-1">
          <button
            onClick={() => setViewMode("mobile")}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
              viewMode === "mobile"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icons.phone className="h-4 w-4" />
            Mobile
          </button>
          <button
            onClick={() => setViewMode("desktop")}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
              viewMode === "desktop"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icons.monitor className="h-4 w-4" />
            Desktop
          </button>
        </div>
      </div>

      {/* Preview Container */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden rounded-2xl border border-dashed border-border bg-zinc-50/50 p-4 dark:bg-zinc-900/50">
        <div
          className={`relative transition-all duration-500 ease-in-out overflow-hidden shadow-2xl ${
            viewMode === "mobile"
              ? "aspect-9/19 w-full max-w-[360px] rounded-[2.5rem] border-4 border-zinc-950"
              : "h-full w-full rounded-xl border-border border"
          }`}
          style={{ ...getBackgroundStyle() }}
        >
          {/* Background Blur Overlay */}
          

          {/* Content Scroll Area */}
          <div
            className="relative h-full overflow-y-auto no-scrollbar "
            style={{ padding: `${state.padding}px` }}
          >
            <div className="mx-auto flex w-full max-w-[420px] flex-col items-center pb-10 pt-12">
              {/* Profile Section */}
              <div 
                className={`mb-8 flex w-full gap-4 transition-all duration-300 ${
    state.profileLayout === "center" 
      ? "flex-col items-center text-center" 
      : state.profileLayout === "left-stack"
      ? "flex-col items-start text-left"
      : " items-center justify-between text-left"
  }`}
>
  {/* Avatar */}
  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-full border-4 border-white/20 bg-zinc-200 shadow-xl">
    {state.profile.avatar ? (
      <img src={state.profile.avatar} alt="Avatar" className="h-full w-full object-cover" />
    ) : (
      <div className="flex h-full w-full items-center justify-center bg-zinc-800 text-2xl font-bold text-white">
        {state.profile.name.charAt(0).toUpperCase() || "B"}
      </div>
    )}
  </div>

  {/* Text Info */}
  <div className="flex flex-col">
    <h2 className="text-xl font-bold text-white drop-shadow-md">
      {state.profile.name || "Your Name"}
    </h2>
    <p className="text-sm font-medium text-white/80 drop-shadow-sm line-clamp-2">
      {state.profile.description || "Add your bio here"}
    </p>
  </div>
              </div>
              {/* Social Media Horizontal Scroll */}
{state.socials && state.socials.length > 0 && (
  <div className="mb-8 w-full">
    <div className="no-scrollbar flex w-full flex-row items-center justify-center gap-4 overflow-x-auto pb-2">
      {state.socials.map((social: any) => {
        const platform = SOCIAL_PLATFORMS.find(p => p.id === social.platform)
        const Icon = platform?.icon || Globe
        
        return (
          <a
            key={social.id}
            href={social.url}
            target="_blank"
            className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-transform hover:scale-110 active:scale-95 border border-white/10"
          >
            <Icon className="h-5 w-5" />
          </a>
        )
      })}
    </div>
  </div>
)}
              {/* Links Sectio  n */}
              <div className="w-full space-y-4">
                <TexturedCard
                  title="PROJECTS"
                  backgroundColor="bg-amber-500"
                  titleColor="text-black"
                />
                <TexturedCard
                  title="READ ARTICLES"
                  backgroundColor="bg-zinc-900"
                  titleColor="text-white"
                />
                <TexturedCard
                  title="GET IN TOUCH"
                  backgroundColor="bg-white"
                  titleColor="text-black"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
