import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { WineSubHeader } from '@/components/WineSubHeader';
import { wineRegions, bankOf } from '@/data/wineRegions';

const SECTION_LABEL: Record<string, string> = {
  left: 'Left Bank',
  right: 'Right Bank',
  other: 'Other',
};

export function WinePage() {
  const navigate = useNavigate();

  const sections = (['left', 'right', 'other'] as const).map(bank => ({
    bank,
    entries: wineRegions
      .map((r, i) => ({ region: r, i }))
      .filter(({ region }) => bankOf(region.name) === bank)
      .sort((a, b) => a.region.name === 'All Regions' ? -1 : b.region.name === 'All Regions' ? 1 : 0),
  }));

  return (
    <div className="flex flex-col">
      <WineSubHeader>
        <h2 className="text-2xl font-semibold">Bordeaux Wine Regions</h2>
      </WineSubHeader>
      <div className="px-4 py-4 space-y-8">
        {sections.map(({ bank, entries }) => entries.length === 0 ? null : (
          <div key={bank}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              {SECTION_LABEL[bank]}
            </h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {entries.map(({ region, i }) => (
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
        ))}
      </div>
    </div>
  );
}
