const FLAG_H = 96
const FLAG_W = 144
const STRIPE_W = FLAG_W / 3 // 48px each

export function FlagBanner() {
  return (
    <div className="relative w-full" style={{ height: FLAG_H }}>
      {/* Blue: solid at white stripe edge, fades to white going left */}
      <div
        className="absolute inset-y-0"
        style={{
          left: '12%',
          right: `calc(50% + ${STRIPE_W / 2}px)`,
          background: 'linear-gradient(to left, rgba(0, 35, 149, 0.5), white)',
        }}
      />
      {/* Red: solid at white stripe edge, fades to white going right */}
      <div
        className="absolute inset-y-0"
        style={{
          left: `calc(50% + ${STRIPE_W / 2}px)`,
          right: '12%',
          background: 'linear-gradient(to right, rgba(237, 41, 57, 0.5), white)',
        }}
      />
      {/* White center stripe */}
      <div
        className="absolute inset-y-0"
        style={{ left: `calc(50% - ${STRIPE_W / 2}px)`, width: STRIPE_W, background: 'white' }}
      />
    </div>
  )
}
