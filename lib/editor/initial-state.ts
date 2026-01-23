import { EditorState } from "./types"

/**
 * Default initial state for the editor
 */
export const initialEditorState: EditorState = {
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
  cardTexture: "base",
  links: [],
  bgEffects: {
    blur: 8,
    noise: 0,
    brightness: 100,
    saturation: 100,
    contrast: 100,
  },
}
