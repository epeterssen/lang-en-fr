import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { WineSubHeader } from '@/components/WineSubHeader';
import { wineRegions, bankOf } from '@/data/wineRegions';
import { chateaux, CRU_COLORS, CRU_ORDER } from '@/data/chateaux';

const SECTION_LABEL: Record<string, string> = {
  left: 'Left Bank',
  right: 'Right Bank',
  other: 'Other',
};

const CRU_LABEL: Record<string, string> = {
  '1er Cru':  'Premier Cru',
  '2ème Cru': 'Deuxième Cru',
  '3ème Cru': 'Troisième Cru',
  '4ème Cru': 'Quatrième Cru',
  '5ème Cru': 'Cinquième Cru',
};

const ALL_APPELLATIONS = [...new Set(chateaux.map(c => c.appellation))].sort();

const wineSearcherUrl = (name: string) =>
  'https://www.wine-searcher.com/find/' +
  name.replace(/^ch[âa]teau\s+/i, '').replace(/['']/g, ' ').toLowerCase().replace(/\s+/g, '+');

export function WinePage() {
  const navigate = useNavigate();
  const [classification1855Open, setClassification1855Open] = useState(true);
  const [search1855, setSearch1855] = useState('');
  const [banksOpen, setBanksOpen] = useState<Record<string, boolean>>({ left: true, right: true, other: true });
  const toggleBank = (bank: string, altKey: boolean) => {
    if (altKey) {
      const next = !banksOpen[bank];
      setBanksOpen({ left: next, right: next, other: next });
    } else {
      setBanksOpen(prev => ({ ...prev, [bank]: !prev[bank] }));
    }
  };
  const [selectedAppellations, setSelectedAppellations] = useState<Set<string>>(() => new Set(ALL_APPELLATIONS));

  const toggleAppellation = (app: string) =>
    setSelectedAppellations(prev => {
      const next = new Set(prev);
      if (next.has(app)) next.delete(app); else next.add(app);
      return next;
    });

  const classificationGroups = CRU_ORDER.map(cru => {
    const all = chateaux.filter(c => c.classification === cru);
    const q = search1855.trim().toLowerCase();
    const entries = all.filter(c => selectedAppellations.has(c.appellation) && (!q || c.name.toLowerCase().includes(q) || c.secondWine?.toLowerCase().includes(q)));
    return { cru, label: CRU_LABEL[cru], color: CRU_COLORS[cru], entries, total: all.length };
  });

  const sections = (['other', 'left', 'right'] as const).map(bank => ({
    bank,
    entries: wineRegions
      .map((r, i) => ({ region: r, i }))
      .filter(({ region }) => bankOf(region.name) === bank)
      .sort((a, b) => a.region.name === 'All Regions' ? -1 : b.region.name === 'All Regions' ? 1 : 0),
  }));

  return (
    <div className="flex flex-col">
      <WineSubHeader>
        <h2 className="text-2xl font-semibold">Bordeaux Wines</h2>
      </WineSubHeader>
      <div className="px-4 py-6 border-b border-border">
        <h2 className="text-lg font-semibold mb-4">Bordeaux Wine Classifications</h2>
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
            <button
              onClick={() => setClassification1855Open(o => !o)}
              className="flex items-center gap-1.5 group shrink-0"
            >
              <ChevronRight
                size={14}
                className="text-muted-foreground transition-transform duration-200"
                style={{ transform: classification1855Open ? 'rotate(90deg)' : 'rotate(0deg)' }}
              />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">
                1855 Classification
              </h3>
            </button>
            {classification1855Open && (
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {ALL_APPELLATIONS.map(app => (
                  <label
                    key={app}
                    className="flex items-center gap-1.5 cursor-pointer select-none"
                    onDoubleClick={() => {
                      const allSelected = ALL_APPELLATIONS.every(a => selectedAppellations.has(a));
                      setSelectedAppellations(allSelected ? new Set() : new Set(ALL_APPELLATIONS));
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedAppellations.has(app)}
                      onChange={() => toggleAppellation(app)}
                      className="accent-primary"
                    />
                    <span className="text-xs text-muted-foreground">{app}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
          {classification1855Open && (
            <div className="pl-4 border-l border-border space-y-2">
              <div className="relative">
                <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  value={search1855}
                  onChange={e => setSearch1855(e.target.value)}
                  placeholder="Search selected appellations…"
                  className="w-full rounded-md border border-input bg-background pl-7 pr-3 py-1 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
              {classificationGroups.map(({ cru, label, color, entries, total }) => (
                <div key={cru}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                    <h3 className="text-sm font-semibold" style={{ color }}>{label}</h3>
                    <span className="text-xs text-muted-foreground">({entries.length}/{total})</span>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {entries.map(ch => (
                      <div key={ch.name} className="flex items-center justify-between rounded-md border px-3 py-1" style={{ borderLeftWidth: 3, borderLeftColor: color }}>
                        <div className="flex items-center gap-1.5 min-w-0">
                          <div data-tooltip={ch.secondWine ?? 'No second wine'} className="card-tip min-w-0">
                            <span className="text-sm font-medium truncate block">{ch.name}</span>
                          </div>
                          <a href={wineSearcherUrl(ch.name)} target="_blank" rel="noreferrer" className="shrink-0 text-muted-foreground hover:text-foreground transition-colors">
                            <Search size={12} />
                          </a>
                        </div>
                        <div data-tooltip={ch.commune ?? ch.appellation} className="card-tip card-tip-red shrink-0 ml-2">
                          <Badge variant="secondary" className="text-xs font-mono rounded-sm ![background-color:rgba(0,0,0,0.06)]">
                            {ch.appellation}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="px-4 py-6">
        <h2 className="text-lg font-semibold mb-4">Bordeaux Wine Regions</h2>
        <div className="space-y-8">
        {sections.map(({ bank, entries }) => entries.length === 0 ? null : (
          <div key={bank}>
            <button
              onClick={(e) => toggleBank(bank, e.altKey)}
              className="flex items-center gap-1.5 group mb-3"
            >
              <ChevronRight
                size={14}
                className="text-muted-foreground transition-transform duration-200"
                style={{ transform: banksOpen[bank] ? 'rotate(90deg)' : 'rotate(0deg)' }}
              />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">
                {SECTION_LABEL[bank]}
              </h3>
            </button>
            {banksOpen[bank] && (
              <div className="pl-4 border-l border-border">
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {entries.map(({ region, i }) => (
                  <div
                    key={region.file}
                    onClick={() => navigate(`/wine/region/${i}`)}
                    className="flex items-center justify-between rounded-md border px-3 py-1 cursor-pointer transition-colors hover:[background-color:rgba(139,0,0,0.04)] border-l-[3px] border-l-[rgba(139,0,0,0.5)]"
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
            )}
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}
