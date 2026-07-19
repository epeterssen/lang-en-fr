import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { WineSubHeader } from '@/components/WineSubHeader';
import { wineRegions, bankOf } from '@/data/wineRegions';
import { chateaux, CRU_COLORS, CRU_ORDER } from '@/data/chateaux';

const SECTION_LABEL: Record<string, string> = {
  left: 'Left Bank',
  right: 'Right Bank',
  other: 'Maps',
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
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [classification1855Open, setClassification1855Open] = useState(false);
  const [search1855, setSearch1855] = useState('');
  const [classificationSEOpen, setClassificationSEOpen] = useState(false);
  const [searchSE, setSearchSE] = useState('');
  const [banksOpen, setBanksOpen] = useState<Record<string, boolean>>({ left: true, right: true, other: true });
  const toggleBank = (bank: string, altKey: boolean) => {
    if (altKey) {
      const next = !banksOpen[bank];
      setClassification1855Open(next);
      setClassificationSEOpen(next);
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

  const SE_SYSTEMS = new Set(['Saint-Émilion 2022', 'withdrew 2021', 'withdrew 2022']);
  const SE_ORDER = ['Premier Grand Crus Classés A', 'Premier Grand Crus Classés B', 'Grand Crus Classés'] as const;
  const seGroups = SE_ORDER.map(cru => {
    const all = chateaux.filter(c => SE_SYSTEMS.has(c.system ?? '') && c.classification === cru);
    const q = searchSE.trim().toLowerCase();
    const entries = all.filter(c => !q || c.name.toLowerCase().includes(q) || c.secondWine?.toLowerCase().includes(q));
    return { cru, color: CRU_COLORS[cru], entries, total: all.length };
  });

  const appellationsMapIndex = wineRegions.findIndex(r => r.file.startsWith('Regions'));

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
        <h2 className="text-2xl font-semibold">French Wine</h2>
      </WineSubHeader>
      <div className="px-4 py-3 border-b border-border">
        <h2 className="text-lg font-semibold">Bordeaux</h2>
        <div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-4">
            <button
              onClick={(e) => {
                if (e.altKey) {
                  const next = !classification1855Open;
                  setClassification1855Open(next);
                  setClassificationSEOpen(next);
                  setBanksOpen({ left: next, right: next, other: next });
                } else {
                  setClassification1855Open(o => !o);
                }
              }}
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
            <div className="pl-4 border-l border-border space-y-2 mt-2">
              <div className="relative">
                <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  value={search1855}
                  onChange={e => setSearch1855(e.target.value)}
                  placeholder="Search selected (checked) appellations…"
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
                            <span
                              className="text-sm font-medium truncate block cursor-pointer hover:underline"
                              onClick={() => navigate(`/wine/region/${appellationsMapIndex}?lat=${ch.lat}&lng=${ch.lng}&zoom=16`)}
                            >{ch.name}</span>
                          </div>
                          <button
                            onClick={() => {
                              if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
                              searchTimerRef.current = setTimeout(() => {
                                searchTimerRef.current = null;
                                window.open(wineSearcherUrl(ch.name), '_blank', 'noreferrer');
                              }, 220);
                            }}
                            onDoubleClick={() => {
                              if (searchTimerRef.current) { clearTimeout(searchTimerRef.current); searchTimerRef.current = null; }
                              window.open(wineSearcherUrl(ch.secondWine ?? ch.name), '_blank', 'noreferrer');
                            }}
                            data-tooltip="click: grand cru · dbl-click: second wine"
                            className="card-tip shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Search size={12} />
                          </button>
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
        <div className="mt-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
            <button
              onClick={(e) => {
                if (e.altKey) {
                  const next = !classificationSEOpen;
                  setClassification1855Open(next);
                  setClassificationSEOpen(next);
                  setBanksOpen({ left: next, right: next, other: next });
                } else {
                  setClassificationSEOpen(o => !o);
                }
              }}
              className="flex items-center gap-1.5 group shrink-0"
            >
              <ChevronRight
                size={14}
                className="text-muted-foreground transition-transform duration-200"
                style={{ transform: classificationSEOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
              />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">
                Saint-Émilion 2022
              </h3>
            </button>
          </div>
          {classificationSEOpen && (
            <div className="pl-4 border-l border-border space-y-2 mt-2">
              <div className="relative">
                <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  value={searchSE}
                  onChange={e => setSearchSE(e.target.value)}
                  placeholder="Search Saint-Émilion châteaux…"
                  className="w-full rounded-md border border-input bg-background pl-7 pr-3 py-1 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
              {seGroups.map(({ cru, color, entries, total }) => (
                <div key={cru}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                    <h3 className="text-sm font-semibold" style={{ color }}>{cru}</h3>
                    <span className="text-xs text-muted-foreground">({entries.length}/{total})</span>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {entries.map(ch => (
                      <div key={ch.name} className="flex items-center justify-between rounded-md border px-3 py-1" style={{ borderLeftWidth: 3, borderLeftColor: color }}>
                        <div className="flex items-center gap-1.5 min-w-0">
                          <div data-tooltip={ch.secondWine ?? 'No second wine'} className="card-tip min-w-0">
                            <span
                              className={`text-sm font-medium truncate block ${ch.lat !== undefined ? 'cursor-pointer hover:underline' : ''}`}
                              onClick={() => { if (ch.lat !== undefined && ch.lng !== undefined) navigate(`/wine/region/${appellationsMapIndex}?lat=${ch.lat}&lng=${ch.lng}&zoom=16`); }}
                            >{ch.name}</span>
                          </div>
                          <button
                            onClick={() => {
                              if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
                              searchTimerRef.current = setTimeout(() => {
                                searchTimerRef.current = null;
                                window.open(wineSearcherUrl(ch.name), '_blank', 'noreferrer');
                              }, 220);
                            }}
                            onDoubleClick={() => {
                              if (searchTimerRef.current) { clearTimeout(searchTimerRef.current); searchTimerRef.current = null; }
                              window.open(wineSearcherUrl(ch.secondWine ?? ch.name), '_blank', 'noreferrer');
                            }}
                            data-tooltip="click: grand cru · dbl-click: second wine"
                            className="card-tip shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Search size={12} />
                          </button>
                        </div>
                        {ch.system?.startsWith('withdrew') ? (
                          <Badge variant="secondary" className="text-xs font-mono rounded-sm shrink-0 ml-2 ![background-color:rgba(139,0,0,0.08)] ![color:rgba(139,0,0,0.7)]">
                            {ch.system}
                          </Badge>
                        ) : (
                          <div data-tooltip={ch.commune ?? ch.appellation} className="card-tip card-tip-red shrink-0 ml-2">
                            <Badge variant="secondary" className="text-xs font-mono rounded-sm ![background-color:rgba(0,0,0,0.06)]">
                              {ch.appellation}
                            </Badge>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {sections.map(({ bank, entries }) => entries.length === 0 ? null : (
          <div key={bank} className="mt-4">
            <button
              onClick={(e) => toggleBank(bank, e.altKey)}
              className="flex items-center gap-1.5 group"
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
              <div className="pl-4 border-l border-border mt-2">
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
  );
}
