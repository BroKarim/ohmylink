/**
 * Editor Types
 * Centralized type definitions for the editor module
 */

export interface LinkItem {
  id: string
  title: string
  url: string
  description?: string
  imageUrl?: string
  videoUrl?: string
  isStripeEnabled?: boolean
  backgroundColor?: string
}

export interface SocialLink {
  id: string
  platform: string
  url: string
}

export interface ProfileData {
  name: string
  description: string
  avatar: string | null
}

export interface BackgroundGradient {
  from: string
  to: string
}

export interface BackgroundEffects {
  blur: number       // 0 - 20
  noise: number      // 0 - 100 (opacity)
  brightness: number // 50 - 150
  saturation: number // 0 - 200
  contrast: number   // 50 - 150
}

export type BackgroundType = "wallpaper" | "color" | "gradient" | "image"
export type ProfileLayout = "center" | "left-stack" | "left-row"
export type CardTexture = "base" | "glassy"

export interface EditorState {
  backgroundType: BackgroundType
  backgroundColor: string
  backgroundGradient: BackgroundGradient
  backgroundWallpaper: string | null
  backgroundImage: string | null
  blurAmount: number
  padding: number
  profile: ProfileData
  profileLayout: ProfileLayout
  socials: SocialLink[]
  cardTexture: CardTexture
  links: LinkItem[]
  bgEffects: BackgroundEffects
}
