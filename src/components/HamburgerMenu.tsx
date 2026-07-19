import { List } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth';
import { useSettingsStore } from '@/store/settings';

function initials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function HamburgerMenu() {
  const navigate = useNavigate();
  const { user, login, logout } = useAuthStore();
  const { showBackground, toggleBackground, allowCopyPaste, toggleCopyPaste, rolodex, toggleRolodex } = useSettingsStore();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <List size={22} />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-64">
        <div className="mt-6 flex flex-col gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>{initials(user.name)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{user.name}</span>
                <span className="text-xs text-muted-foreground">{user.email}</span>
              </div>
            </div>
          ) : (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => login({ name: 'Eric Petersen', email: 'epeterssen@gmail.com' })}
            >
              Login
            </Button>
          )}

          <div className="flex items-center justify-between px-1">
            <span className="text-sm">Background image</span>
            <button
              onClick={toggleBackground}
              className={`relative w-10 h-6 rounded-full transition-colors ${showBackground ? 'bg-primary' : 'bg-muted'}`}
            >
              <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${showBackground ? 'left-5' : 'left-1'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between px-1">
            <span className="text-sm">Allow copy/paste</span>
            <button
              onClick={toggleCopyPaste}
              className={`relative w-10 h-6 rounded-full transition-colors ${allowCopyPaste ? 'bg-primary' : 'bg-muted'}`}
            >
              <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${allowCopyPaste ? 'left-5' : 'left-1'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between px-1">
            <span className="text-sm">Rolodex</span>
            <button
              onClick={toggleRolodex}
              className={`relative w-10 h-6 rounded-full transition-colors ${rolodex ? 'bg-primary' : 'bg-muted'}`}
            >
              <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${rolodex ? 'left-5' : 'left-1'}`} />
            </button>
          </div>

          <div className="border-t border-border/50 pt-4 mt-2">
            <p className="text-xs text-muted-foreground px-1 mb-2 uppercase tracking-wide">Explore</p>
            <SheetClose asChild>
              <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/')}>
                Home
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/main-menu')}>
                French Language
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button variant="ghost" className="w-full justify-start" onClick={() => navigate('/wine')}>
                French Wine
              </Button>
            </SheetClose>
          </div>

          {user && (
            <Button variant="ghost" className="w-full justify-start" onClick={logout}>
              Sign out
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
