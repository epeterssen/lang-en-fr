import { ListIcon } from '@phosphor-icons/react';
import { AIAgentDrawer } from '@/components/AIAgentDrawer';
import { HamburgerMenu } from '@/components/HamburgerMenu';
import { FlagBanner } from '@/components/FlagBanner';
import { Button } from '@/components/ui/button';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-20 relative bg-background">
      <FlagBanner />
      <div className="absolute inset-0 flex items-center px-4 gap-2">
        <div className="flex-none flex items-center gap-1 invisible" aria-hidden="true">
          <Button variant="ghost" size="sm" className="px-2 sm:px-3">
            <span className="hidden sm:inline">AI Agent</span>
            <span className="sm:hidden">✦</span>
          </Button>
          <Button variant="ghost" size="icon"><ListIcon size={22} /></Button>
        </div>
        <h1 className="flex-1 min-w-0 text-center font-bold text-xl sm:text-3xl text-[#333333]">Understanding French</h1>
        <div className="flex-none flex items-center gap-1">
          <AIAgentDrawer />
          <HamburgerMenu />
        </div>
      </div>
    </header>
  );
}
