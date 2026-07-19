import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface WineSubHeaderProps {
  children: React.ReactNode;
}

export function WineSubHeader({ children }: WineSubHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="sticky top-20 bg-transparent sm:bg-background z-10 flex items-center justify-between px-4 pt-4 pb-2">
      <div className="flex items-center gap-1.5 flex-wrap min-w-0">{children}</div>
      <Button variant="ghost" size="sm" className="shrink-0" onClick={() => navigate('/')}>
        Home
      </Button>
    </div>
  );
}
