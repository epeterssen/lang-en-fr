import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { ListIcon } from '@phosphor-icons/react';
import { HamburgerMenu } from '@/components/HamburgerMenu';
import { FlagBanner } from '@/components/FlagBanner';
import { AIAgentDrawer } from '@/components/AIAgentDrawer';
import { Button } from '@/components/ui/button';
import { useSettingsStore } from '@/store/settings';

export function Layout() {
  const showBackground = useSettingsStore((s) => s.showBackground)

  useEffect(() => {
    document.body.classList.toggle('bg-on', showBackground)
  }, [showBackground])

  return (
    <div className="min-h-screen flex flex-col text-foreground">
      <header className="sticky top-0 z-20 relative bg-background">
        <FlagBanner />
        <div className="absolute inset-0 flex items-center px-4 gap-2">
          <div className="flex-none flex items-center gap-1 invisible" aria-hidden="true">
            <Button variant="ghost" size="sm">AI Agent</Button>
            <Button variant="ghost" size="icon"><ListIcon size={22} /></Button>
          </div>
          <h1 className="flex-1 min-w-0 text-center font-bold text-2xl sm:text-4xl truncate">Understanding French</h1>
          <div className="flex-none flex items-center gap-1">
            <AIAgentDrawer />
            <HamburgerMenu />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="sticky bottom-0 bg-background border-t border-border/50 px-4 py-2 text-sm text-muted-foreground text-right">
        Understanding French<sup>&copy;{new Date().getFullYear()}</sup>
      </footer>
    </div>
  )
}
