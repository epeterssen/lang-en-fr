import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useSettingsStore } from '@/store/settings'

const BG_STYLE = "url('/EiffelTowerClean.jpg') center calc(100% + 65px) / auto 88vh no-repeat";
const LEFT_IMG = '/fleur-de-lis-transp.jpg.png';
const FADE_SCROLL = 500;

export function Home() {
  const navigate = useNavigate()
  const showBackground = useSettingsStore(s => s.showBackground)
  const [bgOpacity, setBgOpacity] = useState(1)

  useEffect(() => {
    setBgOpacity(1);
    const onScroll = () => {
      const progress = Math.min(window.scrollY / FADE_SCROLL, 1);
      setBgOpacity(1 - progress);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="flex flex-col">
      {showBackground && (
        <>
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: BG_STYLE,
              opacity: bgOpacity,
              zIndex: -1,
              pointerEvents: 'none',
            }}
          />
          <img
            src={LEFT_IMG}
            onClick={() => navigate('/main-menu')}
            style={{
              position: 'fixed',
              left: '4%',
              bottom: '40vh',
              height: '31vh',
              width: 'auto',
              opacity: bgOpacity,
              zIndex: 1,
              cursor: 'pointer',
            }}
          />
          <img
            src="/mk-digital-products-AnRpUiSEv2o-unsplash.jpg"
            onClick={() => navigate('/wine')}
            style={{
              position: 'fixed',
              right: '2.5%',
              bottom: '34vh',
              height: '42vh',
              width: 'auto',
              opacity: bgOpacity,
              zIndex: 1,
              cursor: 'pointer',
              mixBlendMode: 'multiply',
            }}
          />
        </>
      )}
      <h2 className="text-2xl font-semibold px-4 pt-4">Home</h2>
      <div className="flex-1 px-8 py-6 space-y-6">
        <p className="text-lg leading-relaxed">
          Welcome to <strong>lang-en-fr</strong> — a modern, structured approach to learning French
          designed for English speakers who want results without the frustration.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          Whether you're a complete beginner or picking up where you left off, the content here is
          organized to build your skills progressively. Each section introduces concepts in a logical
          order — vocabulary, grammar, and conversation — so nothing feels out of place and every
          lesson reinforces the last.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          At the heart of the site is an AI assistant fluent in both the content of these lessons
          and the French language itself. Ask it anything — why a verb conjugates the way it does,
          how to pronounce a tricky word, or what the difference is between <em>savoir</em> and{' '}
          <em>connaître</em>. It's available on every page, always in context.
        </p>
        <p className="leading-relaxed text-muted-foreground">
          The goal is simple: get you speaking, reading, and understanding French as quickly and
          naturally as possible.
        </p>
        <Button onClick={() => navigate('/main-menu')}>Main Menu</Button>
      </div>
    </div>
  )
}
