import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { AppHeader } from '@/components/AppHeader';
import { AppFooter } from '@/components/AppFooter';
import { useSettingsStore } from '@/store/settings';

export function Layout() {
  const showBackground = useSettingsStore((s) => s.showBackground);

  useEffect(() => {
    document.body.classList.toggle('bg-on', showBackground);
  }, [showBackground]);

  return (
    <div className="min-h-dvh flex flex-col text-foreground">
      <AppHeader />
      <main className="flex-1 pb-10">
        <Outlet />
      </main>
      <AppFooter />
    </div>
  );
}
