import { useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { CaretRightIcon } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LeafletMap } from '@/components/LeafletMap';
import { WineSubHeader } from '@/components/WineSubHeader';
import { wineRegions } from '@/data/wineRegions';

export function WineRegionPage() {
  const { index } = useParams<{ index: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const region = wineRegions[Number(index)];
  const focusLat = searchParams.get('lat') ? parseFloat(searchParams.get('lat')!) : undefined;
  const focusLng = searchParams.get('lng') ? parseFloat(searchParams.get('lng')!) : undefined;
  const focusZoom = searchParams.get('zoom') ? parseInt(searchParams.get('zoom')!) : undefined;

  const [geojson, setGeojson] = useState<object | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!region) return;
    setGeojson(null);
    setError(null);
    fetch(`/wine/${region.file}?v=3`)
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(data => setGeojson(data))
      .catch(e => setError(e.message));
  }, [region]);

  if (!region) {
    return <div className="px-4 py-8 text-sm text-muted-foreground">Region not found.</div>;
  }

  return (
    <div className="flex flex-col">
      <WineSubHeader>
        <Button variant="ghost" size="sm" className="-ml-2 text-muted-foreground" onClick={() => navigate('/wine')}>
          Bordeaux Wines
        </Button>
        <CaretRightIcon size={14} className="text-muted-foreground/50 shrink-0" />
        <span className="text-sm font-semibold">{region.name}</span>
        {region.designation && (
          <Badge variant="secondary" className="text-xs font-mono rounded-sm ![background-color:rgba(139,0,0,0.10)]">
            {region.designation}
          </Badge>
        )}
      </WineSubHeader>
      <div className="px-4 pb-4">

      {error && (
        <p className="text-sm text-destructive">Failed to load GeoJSON: {error}</p>
      )}

      {geojson && (
        <LeafletMap
          geojson={geojson}
          height="calc(100dvh - 160px)"
          multiRegion={region.file.startsWith('Regions')}
          focusLat={focusLat}
          focusLng={focusLng}
          focusZoom={focusZoom}
        />
      )}
      </div>
    </div>
  );
}
