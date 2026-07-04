export interface Chateau {
  name: string;
  lat: number;
  lng: number;
  appellation: string;
  classYear?: number;
  classification?: string;
}

export const chateaux: Chateau[] = [
  // Margaux AOC — 1855 Classification
  { name: "Château Margaux",            lat: 45.0330, lng: -0.6700, appellation: 'Margaux', classYear: 1855, classification: '1er Cru' },
  { name: "Château Brane-Cantenac",     lat: 45.0182, lng: -0.6742, appellation: 'Margaux', classYear: 1855, classification: '2ème Cru' },
  { name: "Château Durfort-Vivens",     lat: 45.0340, lng: -0.6700, appellation: 'Margaux', classYear: 1855, classification: '2ème Cru' },
  { name: "Château Lascombes",          lat: 45.0315, lng: -0.6718, appellation: 'Margaux', classYear: 1855, classification: '2ème Cru' },
  { name: "Château Rauzan-Gassies",     lat: 45.0328, lng: -0.6722, appellation: 'Margaux', classYear: 1855, classification: '2ème Cru' },
  { name: "Château Rauzan-Ségla",       lat: 45.0322, lng: -0.6730, appellation: 'Margaux', classYear: 1855, classification: '2ème Cru' },
  { name: "Château Boyd-Cantenac",      lat: 45.0170, lng: -0.6712, appellation: 'Margaux', classYear: 1855, classification: '3ème Cru' },
  { name: "Château Cantenac-Brown",     lat: 45.0122, lng: -0.6718, appellation: 'Margaux', classYear: 1855, classification: '3ème Cru' },
  { name: "Château Desmirail",          lat: 45.0335, lng: -0.6710, appellation: 'Margaux', classYear: 1855, classification: '3ème Cru' },
  { name: "Château d'Issan",            lat: 45.0153, lng: -0.6706, appellation: 'Margaux', classYear: 1855, classification: '3ème Cru' },
  { name: "Château Ferrière",           lat: 45.0320, lng: -0.6714, appellation: 'Margaux', classYear: 1855, classification: '3ème Cru' },
  { name: "Château Giscours",           lat: 44.9970, lng: -0.6720, appellation: 'Margaux', classYear: 1855, classification: '3ème Cru' },
  { name: "Château Kirwan",             lat: 45.0180, lng: -0.6700, appellation: 'Margaux', classYear: 1855, classification: '3ème Cru' },
  { name: "Château Malescot St.-Exupéry", lat: 45.0338, lng: -0.6708, appellation: 'Margaux', classYear: 1855, classification: '3ème Cru' },
  { name: "Château Marquis d'Alesme",   lat: 45.0332, lng: -0.6724, appellation: 'Margaux', classYear: 1855, classification: '3ème Cru' },
  { name: "Château Palmer",             lat: 45.0135, lng: -0.6722, appellation: 'Margaux', classYear: 1855, classification: '3ème Cru' },
  { name: "Château Marquis-de-Terme",   lat: 45.0358, lng: -0.6682, appellation: 'Margaux', classYear: 1855, classification: '4ème Cru' },
  { name: "Château Pouget",             lat: 45.0160, lng: -0.6700, appellation: 'Margaux', classYear: 1855, classification: '4ème Cru' },
  { name: "Château Prieuré-Lichine",    lat: 45.0140, lng: -0.6692, appellation: 'Margaux', classYear: 1855, classification: '4ème Cru' },
  { name: "Château Dauzac",             lat: 44.9975, lng: -0.6748, appellation: 'Margaux', classYear: 1855, classification: '5ème Cru' },
  { name: "Château du Tertre",          lat: 45.0480, lng: -0.6978, appellation: 'Margaux', classYear: 1855, classification: '5ème Cru' },
];
