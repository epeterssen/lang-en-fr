import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface LeafletMapProps {
  geojson: object;
  height?: number | string;
}

export function LeafletMap({ geojson, height = 480 }: LeafletMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = L.map(containerRef.current);
    mapRef.current = map;

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    const layer = L.geoJSON(geojson as Parameters<typeof L.geoJSON>[0], {
      style: {
        color: 'rgba(139,0,0,0.8)',
        weight: 2,
        fillColor: 'rgba(139,0,0,0.15)',
        fillOpacity: 1,
      },
    }).addTo(map);

    const bounds = layer.getBounds();
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [32, 32] });
    } else {
      map.setView([44.8, -0.6], 9);
    }

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [geojson]);

  return <div ref={containerRef} style={{ height }} className="w-full rounded-lg border border-border/50 z-0" />;
}
