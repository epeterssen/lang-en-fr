import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const RINGS = Array.from({ length: 30 }, () => {
  const dur = 1.5 + Math.random() * 5;
  return {
    left: `${4 + Math.random() * 88}%`,
    top: `${62 + Math.random() * 28}%`,
    size: 24 + Math.random() * 38,
    dur: `${dur}s`,
    delay: `${-(Math.random() * dur)}s`,
  };
});

const RAIN = Array.from({ length: 28 }, (_, i) => ({
  left: `${((i * 100 / 28) + (i % 7) * 1.5) % 100}%`,
  height: 8 + (i * 2) % 8,
  dur: `${0.6 + (i % 6) * 0.1}s`,
  delay: `${-((i * 7) % 15) / 10}s`,
  opacity: 0.15 + (i % 4) * 0.04,
}));

export function Home() {
  const navigate = useNavigate()

  useEffect(() => {
    document.body.classList.remove('bg-on');
    return () => document.body.classList.add('bg-on');
  }, []);

  return (
    <div className="flex-1 relative flex flex-col items-center overflow-hidden pb-16">
      <svg style={{ position: 'fixed', width: 0, height: 0 }}>
        <defs>
          <filter id="flagWave">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.04" numOctaves="2" result="noise">
              <animate attributeName="baseFrequency" values="0.012 0.04;0.018 0.06;0.012 0.04" dur="120s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="18" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      <div style={{
        position: 'fixed', inset: 0,
        backgroundImage: "url('/EiffelTowerCleanTrans.png')",
        backgroundSize: 'auto 88vh',
        backgroundPosition: 'center calc(100% + 65px)',
        backgroundRepeat: 'no-repeat',
        opacity: 0.2,
        filter: 'url(#flagWave) saturate(0.05) hue-rotate(200deg) brightness(2.5)',
        maskImage: 'radial-gradient(ellipse 40% 45% at center, black 10%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 40% 45% at center, black 10%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />
      {/* Rain rings */}
      {RINGS.map((r, i) => (
        <div key={i} style={{
          position: 'fixed',
          left: r.left,
          top: r.top,
          width: r.size,
          height: r.size * 0.35,
          border: '1.5px solid rgba(80,120,160,1)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0,
          animation: `rainRing ${r.dur} ease-out ${r.delay} infinite`,
        }} />
      ))}
      {/* Rain */}
      {RAIN.map((r, i) => (
        <div key={i} style={{
          position: 'fixed', top: 0, left: r.left,
          opacity: r.opacity, pointerEvents: 'none', zIndex: 0,
          animation: `rainFall ${r.dur} linear ${r.delay} infinite`,
        }}>
          <div style={{
            width: 1.5, height: r.height,
            background: 'rgba(80,120,160,1)',
            borderRadius: 1,
            transform: 'rotate(12deg)',
          }} />
        </div>
      ))}
      {/* Content */}
      <div className="flex flex-col items-center gap-3 px-6" style={{ position: 'fixed', bottom: '7rem', left: 0, right: 0, zIndex: 1 }}>
        <div className="flex gap-6 flex-wrap justify-center">
          {/* Language card */}
          <div
            onClick={() => navigate('/main-menu')}
            className="group cursor-pointer rounded-2xl flex flex-col items-center gap-4 p-8 w-56 transition-all duration-200 hover:scale-105 shadow-lg"
            style={{ background: 'rgba(255,255,255,0.12)', boxShadow: '0 0 0 1px rgba(255,255,255,0.10), 0 8px 32px rgba(0,0,0,0.4)' }}
          >
            <img src="/fleur-de-lis-transp.jpg.png" className="h-20 w-auto" style={{ opacity: 0.65 }} />
            <div className="text-center">
              <div className="font-semibold text-lg">French Language</div>
              <div className="text-muted-foreground text-sm mt-1">Vocabulary, grammar &amp; conversation</div>
            </div>
          </div>

          {/* Wine card */}
          <div
            onClick={() => navigate('/wine')}
            className="group cursor-pointer rounded-2xl flex flex-col items-center gap-4 p-8 w-56 transition-all duration-200 hover:scale-105 shadow-lg"
            style={{ background: 'rgba(255,255,255,0.12)', boxShadow: '0 0 0 1px rgba(255,255,255,0.10), 0 8px 32px rgba(0,0,0,0.4)' }}
          >
            <img src="/mk-digital-products-AnRpUiSEv2o-transp-crop.png" className="h-20 w-auto" />
            <div className="text-center">
              <div className="font-semibold text-lg">French Wine</div>
              <div className="text-muted-foreground text-sm mt-1">Classifications, regions &amp; châteaux</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
