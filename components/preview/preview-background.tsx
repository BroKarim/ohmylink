
import type { ProfileEditorData } from "@/server/user/profile/payloads";

interface PreviewBackgroundProps {
  profile: ProfileEditorData;
}

export function PreviewBackground({ profile }: PreviewBackgroundProps) {
  const getBackgroundStyle = () => {
    switch (profile.bgType) {
      case "gradient":
        return { background: `linear-gradient(135deg, ${profile.bgGradientFrom} 0%, ${profile.bgGradientTo} 100%)` };
      case "wallpaper":
        return {
          backgroundImage: `url(${profile.bgWallpaper})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        };
      case "image":
        return {
          backgroundImage: `url(${profile.bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        };
      default:
        return { backgroundColor: profile.bgColor };
    }
  };

  return (
    <>
      <div
        className="absolute inset-0 transition-all duration-500"
        style={{
          ...getBackgroundStyle(),
          filter: `
            blur(${profile.bgEffects.blur}px) 
            brightness(${profile.bgEffects.brightness}%) 
            saturate(${profile.bgEffects.saturation}%) 
            contrast(${profile.bgEffects.contrast}%)
          `,
          transform: profile.bgEffects.blur > 0 ? "scale(1.1)" : "scale(1)",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{
          opacity: profile.bgEffects.noise / 100,
          backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')`,
          filter: "contrast(150%) brightness(100%)",
        }}
      />
    </>
  );
}
