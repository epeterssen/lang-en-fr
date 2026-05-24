import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { HamburgerMenu } from '@/components/HamburgerMenu'
import { FlagBanner } from '@/components/FlagBanner'
import { AIAgentDrawer } from '@/components/AIAgentDrawer'
import { useSettingsStore } from '@/store/settings'

export function Layout() {
  const showBackground = useSettingsStore((s) => s.showBackground)

  useEffect(() => {
    document.body.classList.toggle('bg-on', showBackground)
  }, [showBackground])

  return (
    <div className="min-h-screen flex flex-col text-foreground">
      <header className="sticky top-0 z-20 relative bg-background">
        <FlagBanner />
        <h1 className="absolute inset-0 flex items-center justify-center text-4xl font-bold">Understanding French</h1>
        <div className="absolute top-1/2 right-4 -translate-y-1/2 flex items-center gap-1">
          <AIAgentDrawer />
          <HamburgerMenu />
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="sticky bottom-0 bg-background border-t border-border/50 px-4 py-2 text-sm text-muted-foreground text-right">
        lang-en-fr<sup>&copy;</sup> {new Date().getFullYear()}
      </footer>
    </div>
  )
}
