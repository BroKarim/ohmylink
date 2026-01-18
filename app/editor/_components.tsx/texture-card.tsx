
interface TexturedCardProps {
  title: string
  titleColor?: string
  backgroundColor?: string
  imageUrl?: string
  imageAlt?: string
  className?: string
}

export function TexturedCard({
  title,
  titleColor = "text-black",
  backgroundColor = "bg-amber-700",
  imageUrl,
  imageAlt = "Card image",
  className = "",
}: TexturedCardProps) {
  return (
    <div
      className={`group relative flex h-20 w-full cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg ${backgroundColor} ${className}`}
      style={{
        boxShadow: `
          0 2px 4px rgba(0, 0, 0, 0.08),
          0 4px 8px rgba(0, 0, 0, 0.12),
          0 8px 16px rgba(0, 0, 0, 0.15),
          0 12px 24px rgba(0, 0, 0, 0.1),
          0 20px 40px rgba(0, 0, 0, 0.08),
          inset 0 1px 0 rgba(255, 255, 255, 0.3)
        `,
      }}
    >
      {/* Shadow texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 120% 100% at 50% 100%, 
              rgba(0, 0, 0, 0.15) 0%, 
              rgba(0, 0, 0, 0.08) 30%,
              rgba(0, 0, 0, 0) 70%)
          `,
        }}
      />

      {/* Main container */}
      <div className="flex w-full h-full">
        {/* Left section - Title */}
        <div className="flex flex-1 items-center justify-start pl-6">
          <h2
            className={`${titleColor} text-xl font-black tracking-tighter`}
            style={{
              textShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
            }}
          >
            {title}
          </h2>
        </div>

        {/* Right section - Optional Image / Icon Area */}
        <div className="flex w-20 items-center justify-center bg-black/5">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={imageAlt}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className={`h-8 w-8 rounded-full border-2 border-current opacity-20`} />
          )}
        </div>
        </div>
      {/* Subtle edge highlight for depth */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
        }}
      />
    </div>
  );
}
