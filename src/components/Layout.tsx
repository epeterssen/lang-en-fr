import { Outlet } from 'react-router-dom'
import { HamburgerMenu } from '@/components/HamburgerMenu'
import { FlagBanner } from '@/components/FlagBanner'

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="relative">
        <FlagBanner />
        <div className="absolute top-1/2 right-4 -translate-y-1/2">
          <HamburgerMenu />
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
