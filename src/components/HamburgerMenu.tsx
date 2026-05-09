import { List } from '@phosphor-icons/react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/auth'

function initials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function HamburgerMenu() {
  const { user, login, logout } = useAuthStore()

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
