import { Outlet } from 'react-router-dom'
import { HamburgerMenu } from '@/components/HamburgerMenu'
import flagFr from '@/assets/flag-fr.svg'

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="relative flex items-center justify-center px-4 py-3">
        <img src={flagFr} alt="French flag" width={144} height={96} />
        <div className="absolute right-4">
          <HamburgerMenu />
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
