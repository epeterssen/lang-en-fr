export interface WineRegion {
  name: string;
  designation: 'AOP' | 'PDO' | null;
  file: string;
}

function parse(filename: string): WineRegion {
  const base = filename.replace('.geojson', '');
  const withoutSuffix = base.replace(/_Bordeaux_France$/, '');

  let designation: WineRegion['designation'] = null;
  let namePart = withoutSuffix;

  if (namePart.endsWith('-AOP')) {
    designation = 'AOP';
    namePart = namePart.slice(0, -4);
  } else if (namePart.endsWith('-PDO')) {
    designation = 'PDO';
    namePart = namePart.slice(0, -4);
  }

  const rawName = namePart.replace(/-/g, ' ');
  const NAME_OVERRIDES: Record<string, string> = {
    'Regions-AOP_Bordeaux_France.geojson': 'Appellations',
    'Communes.geojson': 'Communes',
  };
  const name = NAME_OVERRIDES[filename] ?? rawName;
  return { name, designation, file: filename };
}

const filenames = [
  'Regions-AOP_Bordeaux_France.geojson',
  'Communes.geojson',
];

export const wineRegions: WineRegion[] = filenames.map(parse);

export const LEFT_BANK = new Set([
  'Barsac', 'Cerons', 'Graves', 'Graves Superieures', 'Haut Medoc',
  'Listrac Medoc', 'Loupiac', 'Margaux', 'Medoc', 'Moulis en Medoc',
  'Pauillac', 'Pessac Leognan', 'Sauternes', 'St Croix du Mont',
  'St Estephe', 'St Julien',
]);

export const RIGHT_BANK = new Set([
  'Blaye', 'Canon Fronsac', 'Cotes de Blaye', 'Cotes de Bourg',
  'Fronsac', 'Graves of Vayres', 'Lalande de Pomerol', 'Lussac St Emilion',
  'Pomerol', 'Puisseguin St Emilion', 'St Emilion', 'St Emilion Grand Cru',
  'St Foy Bordeaux', 'St Georges St Emilion',
]);

export function bankOf(name: string): 'left' | 'right' | 'other' {
  if (LEFT_BANK.has(name)) return 'left';
  if (RIGHT_BANK.has(name)) return 'right';
  return 'other';
}
