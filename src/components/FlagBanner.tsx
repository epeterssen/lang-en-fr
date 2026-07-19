const FLAG_H = 80

export function FlagBanner() {
  return (
    <div className="relative w-full" style={{ height: FLAG_H }}>
      {/* Single continuous gradient across the full banner */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to right,
            oklch(0.990 0.001 286.375) 20%,
            rgba(0, 35, 149, 0.12) 38%,
            oklch(0.990 0.001 286.375) 50%,
            rgba(237, 41, 57, 0.12) 62%,
            oklch(0.990 0.001 286.375) 80%
          )`,
          maskImage: 'linear-gradient(to bottom, black 68%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 68%, transparent 100%)',
        }}
      />
    </div>
  )
}
