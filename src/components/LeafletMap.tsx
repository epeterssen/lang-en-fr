import { useEffect, useRef, useMemo, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import { point as turfPoint } from '@turf/helpers';
import { LEFT_BANK } from '@/data/wineRegions';
import { chateaux, CRU_COLORS } from '@/data/chateaux';

interface LeafletMapProps {
  geojson: object;
  height?: number | string;
  multiRegion?: boolean;
}

const GOLDEN_ANGLE = 137.508;
const regionHueCache = new Map<string, number>();
let regionIndex = 0;

function hueForRegion(name: string): number {
  if (!regionHueCache.has(name)) {
    regionHueCache.set(name, (regionIndex++ * GOLDEN_ANGLE) % 360);
  }
  return regionHueCache.get(name)!;
}

const STYLE_OVERRIDES: Partial<Record<string, L.PathOptions>> = {
  'Pauillac':   { color: 'hsl(210, 80%, 30%)', weight: 1.5, fillColor: 'hsl(210, 80%, 15%)', fillOpacity: 0.15 },
  'St Julien':  { color: 'hsl(210, 80%, 30%)', weight: 1.5, fillColor: 'hsl(210, 80%, 15%)', fillOpacity: 0.15 },
  'St Estephe': { color: 'hsl(210, 80%, 30%)', weight: 1.5, fillColor: 'hsl(210, 80%, 15%)', fillOpacity: 0.15 },
  'Margaux':        { color: 'hsl(210, 80%, 30%)', weight: 1.5, fillColor: 'hsl(210, 80%, 15%)', fillOpacity: 0.15 },
  'Pessac Leognan':      { color: 'hsl(210, 80%, 30%)', weight: 1.5, fillColor: 'hsl(210, 80%, 15%)', fillOpacity: 0.15 },
  'St Emilion':          { color: 'hsl(250, 70%, 35%)', weight: 1.5, fillColor: 'hsl(250, 60%, 55%)', fillOpacity: 0.15 },
  'St Emilion Grand Cru':{ color: 'hsl(210, 80%, 30%)', weight: 1.5, fillColor: 'hsl(210, 80%, 15%)', fillOpacity: 0.15 },
  'Pomerol':             { color: 'hsl(210, 80%, 30%)', weight: 1.5, fillColor: 'hsl(210, 80%, 15%)', fillOpacity: 0.15 },
  'Haut Medoc': { color: 'hsl(263, 90%, 20%)', weight: 1.5, fillColor: 'hsl(263, 60%, 55%)', fillOpacity: 0.15 },
  'Medoc':      { color: 'hsl(263, 90%, 20%)', weight: 1.5, fillColor: 'hsl(263, 60%, 30%)', fillOpacity: 0.30 },
};

function regionStyle(feature?: GeoJSON.Feature): L.PathOptions {
  const name = (feature?.properties as Record<string, unknown>)?.region as string | undefined;
  if (!name) return defaultStyle;
  const h = hueForRegion(name);
  if (STYLE_OVERRIDES[name]) return STYLE_OVERRIDES[name]!;
  return {
    color: `hsl(${h}, 70%, 35%)`,
    weight: 1.5,
    fillColor: `hsl(${h}, 60%, 55%)`,
    fillOpacity: 0.15,
  };
}

const defaultStyle: L.PathOptions = {
  color: 'rgba(139,0,0,0.8)',
  weight: 2,
  fillColor: 'rgba(139,0,0,0.15)',
  fillOpacity: 1,
};

function bboxArea(feature: GeoJSON.Feature): number {
  const bounds = L.geoJSON(feature).getBounds();
  if (!bounds.isValid()) return 0;
  return (bounds.getEast() - bounds.getWest()) * (bounds.getNorth() - bounds.getSouth());
}


type LayerEntry = { layer: L.Path; feature: GeoJSON.Feature };

export function LeafletMap({ geojson, height = 480, multiRegion = false }: LeafletMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const regionLayersRef = useRef<Map<string, LayerEntry[]>>(new Map());
  const [zoomLevel, setZoomLevel] = useState<number | null>(null);

  const regionNames = useMemo(() => {
    if (!multiRegion) return [];
    const fc = geojson as GeoJSON.FeatureCollection;
    return [...new Set(
      (fc.features ?? [])
        .map(f => (f.properties as Record<string, unknown>)?.region as string)
        .filter(Boolean),
    )].sort();
  }, [geojson, multiRegion]);

  const DEFAULT_CHECKED = new Set(['Pauillac', 'St Julien', 'St Estephe', 'Margaux', 'Pessac Leognan', 'St Emilion Grand Cru', 'Pomerol']);

  const [checked, setChecked] = useState<Set<string>>(() => DEFAULT_CHECKED);

  useEffect(() => {
    setChecked(new Set(DEFAULT_CHECKED));
  }, [regionNames]);

  useEffect(() => {
    regionLayersRef.current.forEach((entries, name) => {
      const visible = checked.has(name);
      entries.forEach(({ layer, feature }) => {
        layer.setStyle(visible ? { ...regionStyle(feature), opacity: 1 } : { opacity: 0, fillOpacity: 0 });
      });
    });
  }, [checked]);

  useEffect(() => {
    if (!containerRef.current) return;
    regionLayersRef.current = new Map();

    const map = L.map(containerRef.current);
    mapRef.current = map;

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    type FeatureEntry = { name: string; area: number; feature: GeoJSON.Feature };
    const featureIndex: FeatureEntry[] = [];

    L.geoJSON(geojson as Parameters<typeof L.geoJSON>[0], {
      style: multiRegion ? regionStyle : defaultStyle,
      onEachFeature: multiRegion ? (feature, layer) => {
        const name = (feature.properties as Record<string, unknown>)?.region as string | undefined;
        if (!name) return;
        featureIndex.push({ name, area: bboxArea(feature), feature });
        if (!regionLayersRef.current.has(name)) {
          regionLayersRef.current.set(name, []);
        }
        regionLayersRef.current.get(name)!.push({ layer: layer as L.Path, feature });
      } : undefined,
    }).addTo(map);

    if (multiRegion) {
      const setLabel = (name: string) => {
        if (!labelRef.current) return;
        labelRef.current.textContent = name;
        labelRef.current.style.opacity = name ? '1' : '0';
      };

      map.on('mousemove', (e) => {
        const pt = turfPoint([e.latlng.lng, e.latlng.lat]);
        const hit = featureIndex
          .filter(f => booleanPointInPolygon(pt, f.feature as Parameters<typeof booleanPointInPolygon>[1]))
          .sort((a, b) => a.area - b.area)[0];
        setLabel(hit?.name ?? '');
      });
      map.on('mouseout', () => setLabel(''));
    }

    const allBounds = L.geoJSON(geojson as Parameters<typeof L.geoJSON>[0]).getBounds();
    if (allBounds.isValid()) {
      map.fitBounds(allBounds, { padding: [32, 32] });
    } else {
      map.setView([44.8, -0.6], 9);
    }
    map.once('moveend', () => setZoomLevel(map.getZoom()));

    if (multiRegion) {
      const MIN_ZOOM = 11;
      const dotRadius = (zoom: number) => Math.min(3 + (zoom - MIN_ZOOM), 7);

      const circleMarkers: Array<{ circle: L.CircleMarker; ch: typeof chateaux[0] }> = [];

      chateaux.forEach(ch => {
        const zoom = map.getZoom();
        const dotHex = ch.classification ? (CRU_COLORS[ch.classification] ?? '#8b0000') : '#8b0000';
        const circle = L.circleMarker([ch.lat, ch.lng] as L.LatLngTuple, {
          radius: dotRadius(zoom),
          color: dotHex + 'e6',
          weight: 1.5,
          fillColor: dotHex + 'cc',
          fillOpacity: zoom >= MIN_ZOOM ? 1 : 0,
          opacity: zoom >= MIN_ZOOM ? 1 : 0,
        }).addTo(map);
        const classLine = ch.system && ch.classification ? `${ch.system} ${ch.classification}` : ch.appellation;
        const secondLine = ch.secondWine ? `<br/><span style="font-size:0.7rem;opacity:0.7">2nd: ${ch.secondWine}</span>` : '';
        circle.bindPopup(`<strong>${ch.name}</strong><br/><span style="font-size:0.75rem">${classLine}</span>${secondLine}`);
        const tooltipHtml = `<div style="line-height:1.3">${ch.name}<br/><span style="opacity:0.7">${classLine}</span></div>`;
        circle.bindTooltip(tooltipHtml, { permanent: true, className: 'chateau-tooltip', direction: 'top', offset: [0, -4] });
        circle.openTooltip();
        const tooltipEl = circle.getTooltip()?.getElement();
        if (tooltipEl) tooltipEl.style.opacity = '0';
        circleMarkers.push({ circle, ch });
      });

      map.on('zoomend', () => {
        const zoom = map.getZoom();
        setZoomLevel(zoom);
        const visible = zoom >= MIN_ZOOM;
        circleMarkers.forEach(({ circle }) => {
          circle.setStyle({ opacity: visible ? 1 : 0, fillOpacity: visible ? 1 : 0 });
          if (visible) circle.setRadius(dotRadius(zoom));
          const tooltipEl = circle.getTooltip()?.getElement();
          if (tooltipEl) tooltipEl.style.opacity = zoom >= 15 ? '1' : '0';
        });
      });

    }

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [geojson, multiRegion]);

  const allChecked = regionNames.every(n => checked.has(n));

  const toggleRegion = (name: string) => {
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const toggleAll = () => {
    setChecked(allChecked ? new Set() : new Set(regionNames));
  };

  return (
    <div style={{ height }} className="relative w-full">
      <div ref={containerRef} className="w-full h-full rounded-lg border border-border/50 z-0" />
      {multiRegion && (
        <>
          {zoomLevel !== null && (
            <div className="absolute top-2 right-2 z-[1000] pointer-events-none px-2 py-0.5 rounded text-xs font-mono font-semibold bg-background/90 border border-border shadow-sm">
              z{zoomLevel}
            </div>
          )}
          <div
            ref={labelRef}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[1000] pointer-events-none px-3 py-1.5 rounded-md text-sm font-medium bg-background/90 border border-border shadow-sm transition-opacity duration-75"
            style={{ opacity: 0 }}
          />
          {regionNames.length > 0 && (() => {
            const leftBank = regionNames.filter(n => LEFT_BANK.has(n));
            const rightBank = regionNames.filter(n => !LEFT_BANK.has(n));
            const renderGroup = (names: string[]) => names.map(name => (
              <label key={name} className="flex items-center gap-2 px-2.5 py-0.5 cursor-pointer select-none hover:bg-muted/40">
                <input
                  type="checkbox"
                  checked={checked.has(name)}
                  onChange={() => toggleRegion(name)}
                  className="accent-primary shrink-0"
                />
                <span className="text-xs text-foreground truncate">{name}</span>
              </label>
            ));
            return (
              <div className="absolute top-2 left-2 z-[1000] bg-background/90 border border-border rounded-md shadow-sm w-32 sm:w-44 max-w-[40vw] flex flex-col overflow-hidden" style={{ maxHeight: '80dvh' }}>
                <label className="flex items-center gap-2 px-2.5 py-1.5 border-b border-border cursor-pointer select-none shrink-0">
                  <input type="checkbox" checked={allChecked} onChange={toggleAll} className="accent-primary" />
                  <span className="text-xs font-semibold text-foreground">All Regions</span>
                </label>
                <div className="overflow-y-auto flex-1 min-h-0">
                  <div className="px-2.5 pt-1.5 pb-0.5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Left Bank</span>
                  </div>
                  {renderGroup(leftBank)}
                  <div className="px-2.5 pt-2 pb-0.5 border-t border-border/50 mt-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Right Bank</span>
                  </div>
                  {renderGroup(rightBank)}
                </div>
              </div>
            );
          })()}
        </>
      )}
    </div>
  );
}
