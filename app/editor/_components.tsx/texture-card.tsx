
import { GlassEffect } from "./glass-effect"

interface TexturedCardProps {
  title: string
  titleColor?: string
  backgroundColor?: string
  imageUrl?: string
  imageAlt?: string
  className?: string
  texture?: "base" | "glassy"
}

export function TexturedCard({
  title,
  titleColor = "text-black",
  backgroundColor = "bg-amber-700",
  imageUrl = "https://images.unsplash.com/photo-1768104591860-67622093a8f7?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  imageAlt = "Card image",
  className = "",
  texture = "base",
}: TexturedCardProps) {
  
  // Konten utama card
  const CardContent = (
    <div className="flex h-full w-full">
      {/* Left section - Title */}
      <div className="flex flex-1 items-center justify-start pl-6">
        <h2
          className={`${texture === "glassy" ? "text-white" : titleColor} text-xl font-black tracking-tighter`}
          style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.05)" }}
        >
          {title}
        </h2>
      </div>

      {/* Right section - Image Area */}
      <div className="flex w-20 items-center justify-center p-2">
        {imageUrl ? (
          <img src={imageUrl} alt={imageAlt} className="h-full w-full rounded-lg object-cover" />
        ) : (
          <div className={`h-full w-full rounded-lg border-2 border-current opacity-10`} />
        )}
      </div>

      {/* Edge highlight effect */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-0"
        style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
        }}
      />
    </div>
  )

  // Jika texture glassy, bungkus dengan GlassEffect
  if (texture === "glassy") {
    return (
      <GlassEffect 
        className={`group relative h-16 w-full cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${className}`}
      >
        {CardContent}
      </GlassEffect>
    )
  }

  // Default (Base) texture
  return (
    <div
      className={`group relative h-16 w-full cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg ${backgroundColor} ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
      {CardContent}
    </div>
  )
}