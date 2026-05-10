import { Outlet } from 'react-router-dom'
import { HamburgerMenu } from '@/components/HamburgerMenu'
import { FlagBanner } from '@/components/FlagBanner'

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="relative">
        <FlagBanner />
        <h1 className="absolute inset-0 flex items-center justify-center text-4xl font-bold">lang-en-fr</h1>
        <div className="absolute top-1/2 right-4 -translate-y-1/2">
          <HamburgerMenu />
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="sticky bottom-0 bg-background border-t px-4 py-2 text-sm text-muted-foreground text-right">
        lang-en-fr<sup>&copy;</sup> {new Date().getFullYear()}
      </footer>
    </div>
  )
}
