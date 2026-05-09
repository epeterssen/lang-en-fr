const FLAG_H = 96

export function FlagBanner() {
  return (
    <div className="relative w-full" style={{ height: FLAG_H }}>
      {/* Single continuous gradient across the full banner */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to right,
            white 8%,
            rgba(0, 35, 149, 0.15) 40%,
            white 48%,
            white 52%,
            rgba(237, 41, 57, 0.15) 60%,
            white 92%
          )`,
        }}
      />
    </div>
  )
}
