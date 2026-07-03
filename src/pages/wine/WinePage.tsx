import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { WineSubHeader } from '@/components/WineSubHeader';
import { wineRegions } from '@/data/wineRegions';

export function WinePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <WineSubHeader>
        <h2 className="text-2xl font-semibold">Bordeaux Wine Regions</h2>
      </WineSubHeader>
      <div className="px-4 py-4">
      <p className="text-sm text-muted-foreground mb-6">
        {wineRegions.length} appellations — click a region to view its boundaries.
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {wineRegions.map((region, i) => (
          <div
            key={region.file}
            onClick={() => navigate(`/wine/region/${i}`)}
            className="flex items-center justify-between rounded-lg border px-4 py-3 cursor-pointer transition-colors hover:[background-color:rgba(139,0,0,0.04)] border-l-4 border-l-[rgba(139,0,0,0.5)]"
          >
            <span className="text-sm font-medium">{region.name}</span>
            {region.designation && (
              <Badge
                variant="secondary"
                className="text-xs font-mono rounded-sm ml-3 shrink-0 ![background-color:rgba(139,0,0,0.10)]"
              >
                {region.designation}
              </Badge>
            )}
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
