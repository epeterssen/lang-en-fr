import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSettingsStore } from '@/store/settings'

interface Ring {
  id: number;
  left: string;
  top: string;
  size: number;
  dur: number;
}

interface Drop {
  id: number;
  left: string;
  height: number;
  opacity: number;
  dur: number;
}

let ringSeq = 0;
let dropSeq = 0;

export function Home() {
  const navigate = useNavigate()
  const { animations, toggleAnimations } = useSettingsStore();
  const [rings, setRings] = useState<Ring[]>([]);
  const [drops, setDrops] = useState<Drop[]>([]);
  const spawnRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (window.innerWidth >= 640) return;
    const t = setTimeout(() => {
      if (useSettingsStore.getState().animations) toggleAnimations();
    }, 20000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.body.classList.remove('bg-on');

    if (!animations) {
      setRings([]);
      setDrops([]);
      return () => { document.body.classList.add('bg-on'); };
    }

    const spawnRing = () => {
      const dur = 3.75 + Math.random() * 4;
      const id = ++ringSeq;
      setRings(prev => [...prev, {
        id,
        left: `${4 + Math.random() * 88}%`,
        top: `${62 + Math.random() * 28}%`,
        size: [22, 32, 44, 56, 64][Math.floor(Math.random() * 5)],
        dur,
      }]);
      setTimeout(() => setRings(prev => prev.filter(r => r.id !== id)), dur * 1000);
      spawnRef.current = setTimeout(spawnRing, 200 + Math.random() * 300);
    };

    const spawnDrop = () => {
      const dur = 0.6 + Math.random() * 0.5;
      const id = ++dropSeq;
      setDrops(prev => [...prev, {
        id,
        left: `${Math.random() * 96}%`,
        height: 8 + Math.random() * 8,
        opacity: 0.25 + Math.random() * 0.2,
        dur,
      }]);
      setTimeout(() => setDrops(prev => prev.filter(d => d.id !== id)), dur * 1000);
      dropRef.current = setTimeout(spawnDrop, 50 + Math.random() * 100);
    };

    spawnRef.current = setTimeout(spawnRing, 200 + Math.random() * 300);
    dropRef.current = setTimeout(spawnDrop, 50 + Math.random() * 100);

    return () => {
      if (spawnRef.current) clearTimeout(spawnRef.current);
      if (dropRef.current) clearTimeout(dropRef.current);
      document.body.classList.add('bg-on');
    };
  }, [animations]);

  return (
    <div className="flex-1 relative flex flex-col items-center overflow-hidden pb-16">
      {animations && (
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
      )}
      <div style={{
        position: 'fixed', inset: 0,
        backgroundImage: "url('/EiffelTowerCleanTrans.png')",
        backgroundSize: 'auto 88vh',
        backgroundPosition: 'center calc(100% + 65px)',
        backgroundRepeat: 'no-repeat',
        opacity: 0.2,
        filter: animations
          ? 'url(#flagWave) saturate(0.05) hue-rotate(200deg) brightness(2.5)'
          : 'saturate(0.05) hue-rotate(200deg) brightness(2.5)',
        maskImage: window.innerWidth < 768
          ? 'radial-gradient(ellipse 80% 80% at center 65%, black 0%, transparent 92%)'
          : 'radial-gradient(ellipse 40% 45% at center, black 10%, transparent 100%)',
        WebkitMaskImage: window.innerWidth < 768
          ? 'radial-gradient(ellipse 80% 80% at center 65%, black 0%, transparent 92%)'
          : 'radial-gradient(ellipse 40% 45% at center, black 10%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />
      {animations && rings.map((r, i) => (
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
          animation: `rainRing ${r.dur}s linear 0s 1 forwards`,
        }} />
      ))}
      {animations && drops.map((r) => (
        <div key={r.id} style={{
          position: 'fixed', top: 0, left: r.left,
          opacity: r.opacity, pointerEvents: 'none', zIndex: 0,
          animation: `rainFall ${r.dur}s linear 0s 1 forwards`,
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
        <div className="flex gap-4 sm:gap-6 flex-wrap justify-center w-full">
          {/* Language card */}
          <div
            onClick={() => navigate('/main-menu')}
            className="group cursor-pointer rounded-2xl flex flex-col items-center gap-3 sm:gap-4 p-5 sm:p-8 flex-1 min-w-[8rem] max-w-[14rem] sm:flex-none sm:w-56 transition-all duration-200 hover:scale-105 shadow-lg"
            style={{ background: 'rgba(255,255,255,0.12)', boxShadow: '0 0 0 1px rgba(255,255,255,0.10), 0 8px 32px rgba(0,0,0,0.4)' }}
          >
            <img src="/fleur-de-lis-transp.jpg.png" className="w-auto h-auto max-h-[4rem] sm:max-h-none sm:h-[min(5rem,12dvh)]" style={{ opacity: 0.65 }} />
            <div className="text-center">
              <div className="font-semibold text-base sm:text-lg">French Language</div>
              <div className="text-muted-foreground text-sm mt-1">Vocabulary, grammar &amp; conversation</div>
            </div>
          </div>

          {/* Wine card */}
          <div
            onClick={() => navigate('/wine')}
            className="group cursor-pointer rounded-2xl flex flex-col items-center gap-3 sm:gap-4 p-5 sm:p-8 flex-1 min-w-[8rem] max-w-[14rem] sm:flex-none sm:w-56 transition-all duration-200 hover:scale-105 shadow-lg"
            style={{ background: 'rgba(255,255,255,0.12)', boxShadow: '0 0 0 1px rgba(255,255,255,0.10), 0 8px 32px rgba(0,0,0,0.4)' }}
          >
            <img src="/mk-digital-products-AnRpUiSEv2o-transp-crop.png" className="w-auto h-auto max-h-[4rem] sm:max-h-none sm:h-[min(5rem,12dvh)]" />
            <div className="text-center">
              <div className="font-semibold text-base sm:text-lg">French Wine</div>
              <div className="text-muted-foreground text-sm mt-1">Classifications, regions &amp; châteaux</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
