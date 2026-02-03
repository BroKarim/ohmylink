interface PatternRendererProps {
  type: string;
  color: string;
  opacity: number;
  thickness: number;
  scale: number;
}

export function PatternRenderer({ type, color, opacity, thickness, scale }: PatternRendererProps) {
  if (type === "none") return null;

  const patternId = `pattern-${type}`;
  const opacityDecimal = opacity / 100;

  // Kalkulasi ukuran asli berdasarkan persentase (100% = base value)
  const actualScale = (scale / 100) * 24;
  const actualThickness = (thickness / 100) * 1;

  // Convert hex color to RGB for opacity control
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 255, g: 255, b: 255 };
  };

  const rgb = hexToRgb(color);
  const rgbaColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacityDecimal})`;

  const renderPattern = () => {
    switch (type) {
      case "grid":
        return (
          <pattern id={patternId} x="0" y="0" width={actualScale} height={actualScale} patternUnits="userSpaceOnUse">
            <path d={`M ${actualScale} 0 L 0 0 0 ${actualScale}`} fill="none" stroke={rgbaColor} strokeWidth={actualThickness} />
          </pattern>
        );

      case "dots":
        return (
          <pattern id={patternId} x="0" y="0" width={actualScale} height={actualScale} patternUnits="userSpaceOnUse">
            <circle cx={actualScale / 2} cy={actualScale / 2} r={actualThickness} fill={rgbaColor} />
          </pattern>
        );

      case "stripes":
        return (
          <pattern id={patternId} x="0" y="0" width={actualScale} height={actualScale} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect x="0" y="0" width={actualThickness} height={actualScale} fill={rgbaColor} />
          </pattern>
        );

      case "waves":
        const waveHeight = actualScale / 4;
        return (
          <pattern id={patternId} x="0" y="0" width={actualScale} height={actualScale} patternUnits="userSpaceOnUse">
            <path d={`M 0 ${actualScale / 2} Q ${actualScale / 4} ${actualScale / 2 - waveHeight}, ${actualScale / 2} ${actualScale / 2} T ${actualScale} ${actualScale / 2}`} fill="none" stroke={rgbaColor} strokeWidth={actualThickness} />
          </pattern>
        );

      case "noise":
        const dots = [];
        const density = 20; // Fixed density per tile
        for (let i = 0; i < density; i++) {
          const x = (i * 137.5) % actualScale; // Pseudo-random positions
          const y = (i * 253.1) % actualScale;
          dots.push(<rect key={i} x={x} y={y} width={actualThickness} height={actualThickness} fill={rgbaColor} />);
        }
        return (
          <pattern id={patternId} x="0" y="0" width={actualScale} height={actualScale} patternUnits="userSpaceOnUse">
            {dots}
          </pattern>
        );

      default:
        return null;
    }
  };

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none">
      <defs>{renderPattern()}</defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
