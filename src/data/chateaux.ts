export const CRU_COLORS: Record<string, string> = {
  '1er Cru':  '#0f3280',
  '2ème Cru': '#5272c8',
  '3ème Cru': '#8a7aaa',
  '4ème Cru': '#c96060',
  '5ème Cru': '#9e2020',
};

export const CRU_ORDER = ['1er Cru', '2ème Cru', '3ème Cru', '4ème Cru', '5ème Cru'] as const;

export interface Chateau {
  name: string;
  lat: number;
  lng: number;
  appellation: string;
  commune?: string;
  system?: string;
  classification?: string;
  secondWine?: string;
}

export const chateaux: Chateau[] = [
  // ── 1er Cru ────────────────────────────────────────────────────────────────
  { name: "Château Haut-Brion",                          lat: 44.8145, lng: -0.6124, appellation: 'Pessac Leognan', commune: 'Pessac',                    system: '1855', classification: '1er Cru', secondWine: 'Le Clarence de Haut-Brion' },
  { name: "Château Lafite Rothschild",                   lat: 45.2248, lng: -0.7732, appellation: 'Pauillac',       commune: 'Pauillac',                  system: '1855', classification: '1er Cru', secondWine: 'Carruades de Lafite-Rothschild' },
  { name: "Château Latour",                              lat: 45.1759, lng: -0.7446, appellation: 'Pauillac',       commune: 'Pauillac',                  system: '1855', classification: '1er Cru', secondWine: 'Les Forts de Latour' },
  { name: "Château Margaux",                             lat: 45.0444, lng: -0.6688, appellation: 'Margaux',        commune: 'Margaux',                   system: '1855', classification: '1er Cru', secondWine: 'Pavillon Rouge de Château Margaux' },
  { name: "Château Mouton Rothschild",                   lat: 45.2153, lng: -0.7685, appellation: 'Pauillac',       commune: 'Pauillac',                  system: '1855', classification: '1er Cru', secondWine: 'Le Petit Mouton de Mouton Rothschild' },

  // ── 2ème Cru ───────────────────────────────────────────────────────────────
  { name: "Château Brane-Cantenac",                      lat: 45.0239, lng: -0.6737, appellation: 'Margaux',        commune: 'Cantenac',                  system: '1855', classification: '2ème Cru', secondWine: 'Baron de Brane' },
  { name: "Château Cos d'Estournel",                     lat: 45.2308, lng: -0.7758, appellation: 'St Estephe',     commune: 'Saint-Estèphe',             system: '1855', classification: '2ème Cru', secondWine: 'Les Pagodes de Cos' },
  { name: "Château Ducru-Beaucaillou",                   lat: 45.1491, lng: -0.7310, appellation: 'St Julien',      commune: 'Saint-Julien-Beychevelle',  system: '1855', classification: '2ème Cru', secondWine: 'La Croix de Beaucaillou' },
  { name: "Château Durfort-Vivens",                      lat: 45.0400, lng: -0.6745, appellation: 'Margaux',        commune: 'Margaux',                   system: '1855', classification: '2ème Cru', secondWine: 'Vivens de Durfort-Vivens' },
  { name: "Château Gruaud-Larose",                       lat: 45.1445, lng: -0.7510, appellation: 'St Julien',      commune: 'Saint-Julien-Beychevelle',  system: '1855', classification: '2ème Cru', secondWine: 'Sarget de Gruaud-Larose' },
  { name: "Château Lascombes",                           lat: 45.0414, lng: -0.6838, appellation: 'Margaux',        commune: 'Margaux',                   system: '1855', classification: '2ème Cru', secondWine: 'Chevalier de Lascombes' },
  { name: "Château Léoville-Barton",                     lat: 45.1574, lng: -0.7393, appellation: 'St Julien',      commune: 'Saint-Julien-Beychevelle',  system: '1855', classification: '2ème Cru', secondWine: 'La Réserve de Léoville Barton' },
  { name: "Château Léoville-Las-Cases",                  lat: 45.1637, lng: -0.7404, appellation: 'St Julien',      commune: 'Saint-Julien-Beychevelle',  system: '1855', classification: '2ème Cru', secondWine: 'Le Petit Lion de Marquis de las Cases' },
  { name: "Château Léoville-Poyferré",                   lat: 45.1641, lng: -0.7405, appellation: 'St Julien',      commune: 'Saint-Julien-Beychevelle',  system: '1855', classification: '2ème Cru', secondWine: 'Château Moulin Riche' },
  { name: "Château Montrose",                            lat: 45.2469, lng: -0.7623, appellation: 'St Estephe',     commune: 'Saint-Estèphe',             system: '1855', classification: '2ème Cru', secondWine: 'La Dame de Montrose' },
  { name: "Château Pichon Baron",                        lat: 45.1762, lng: -0.7524, appellation: 'Pauillac',       commune: 'Pauillac',                  system: '1855', classification: '2ème Cru', secondWine: 'Les Tourelles de Longueville' },
  { name: "Château Pichon Longueville Comtesse de Lalande", lat: 45.1758, lng: -0.7495, appellation: 'Pauillac',   commune: 'Pauillac',                  system: '1855', classification: '2ème Cru', secondWine: 'Réserve de la Comtesse' },
  { name: "Château Rauzan-Gassies",                      lat: 45.0368, lng: -0.6751, appellation: 'Margaux',        commune: 'Margaux',                   system: '1855', classification: '2ème Cru', secondWine: 'Chevalier de Rauzan-Gassies' },
  { name: "Château Rauzan-Ségla",                        lat: 45.0359, lng: -0.6755, appellation: 'Margaux',        commune: 'Margaux',                   system: '1855', classification: '2ème Cru', secondWine: 'Ségla' },

  // ── 3ème Cru ───────────────────────────────────────────────────────────────
  { name: "Château Boyd-Cantenac",                       lat: 45.0228, lng: -0.6558, appellation: 'Margaux',        commune: 'Cantenac',                  system: '1855', classification: '3ème Cru', secondWine: 'Jacques Boyd' },
  { name: "Château Calon-Ségur",                         lat: 45.2667, lng: -0.7786, appellation: 'St Estephe',     commune: 'Saint-Estèphe',             system: '1855', classification: '3ème Cru', secondWine: 'Château Marquis de Calon' },
  { name: "Château Cantenac-Brown",                      lat: 45.0272, lng: -0.6788, appellation: 'Margaux',        commune: 'Cantenac',                  system: '1855', classification: '3ème Cru', secondWine: 'Brio de Cantenac-Brown' },
  { name: "Château Desmirail",                           lat: 45.0282, lng: -0.6538, appellation: 'Margaux',        commune: 'Margaux',                   system: '1855', classification: '3ème Cru', secondWine: 'Initial de Desmirail' },
  { name: "Château d'Issan",                             lat: 45.0378, lng: -0.6582, appellation: 'Margaux',        commune: 'Cantenac',                  system: '1855', classification: '3ème Cru', secondWine: "Blason d'Issan" },
  { name: "Château Ferrière",                            lat: 45.0436, lng: -0.6764, appellation: 'Margaux',        commune: 'Margaux',                   system: '1855', classification: '3ème Cru', secondWine: 'Les Remparts de Ferrière' },
  { name: "Château Giscours",                            lat: 45.0089, lng: -0.6464, appellation: 'Margaux',        commune: 'Labarde',                   system: '1855', classification: '3ème Cru', secondWine: 'La Sirène de Giscours' },
  { name: "Château Kirwan",                              lat: 45.0271, lng: -0.6584, appellation: 'Margaux',        commune: 'Cantenac',                  system: '1855', classification: '3ème Cru', secondWine: 'Les Charmes de Kirwan' },
  { name: "Château La Lagune",                           lat: 44.9789, lng: -0.6175, appellation: 'Haut Medoc',     commune: 'Ludon-Médoc',               system: '1855', classification: '3ème Cru', secondWine: 'Moulin de la Lagune' },
  { name: "Château Lagrange",                            lat: 45.1494, lng: -0.7733, appellation: 'St Julien',      commune: 'Saint-Julien-Beychevelle',  system: '1855', classification: '3ème Cru', secondWine: 'Les Fiefs de Lagrange' },
  { name: "Château Langoa-Barton",                       lat: 45.1573, lng: -0.7400, appellation: 'St Julien',      commune: 'Saint-Julien-Beychevelle',  system: '1855', classification: '3ème Cru', secondWine: 'Lady Langoa' },
  { name: "Château Malescot St.-Exupéry",                lat: 45.0406, lng: -0.6757, appellation: 'Margaux',        commune: 'Margaux',                   system: '1855', classification: '3ème Cru', secondWine: 'La Dame de Malescot' },
  { name: "Château Marquis d'Alesme",                    lat: 45.0430, lng: -0.6766, appellation: 'Margaux',        commune: 'Margaux',                   system: '1855', classification: '3ème Cru', secondWine: "Marquise d'Alesme" },
  { name: "Château Palmer",                              lat: 45.0367, lng: -0.6693, appellation: 'Margaux',        commune: 'Cantenac',                  system: '1855', classification: '3ème Cru', secondWine: 'Alter Ego de Palmer' },

  // ── 4ème Cru ───────────────────────────────────────────────────────────────
  { name: "Château Beychevelle",                         lat: 45.1450, lng: -0.7350, appellation: 'St Julien',      commune: 'Saint-Julien-Beychevelle',  system: '1855', classification: '4ème Cru', secondWine: 'Amiral de Beychevelle' },
  { name: "Château Branaire-Ducru",                      lat: 45.1444, lng: -0.7391, appellation: 'St Julien',      commune: 'Saint-Julien-Beychevelle',  system: '1855', classification: '4ème Cru', secondWine: 'Duluc de Branaire-Ducru' },
  { name: "Château Duhart-Milon",                        lat: 45.2158, lng: -0.7875, appellation: 'Pauillac',       commune: 'Pauillac',                  system: '1855', classification: '4ème Cru', secondWine: 'Moulin de Duhart' },
  { name: "Château Lafon-Rochet",                        lat: 45.2294, lng: -0.7878, appellation: 'St Estephe',     commune: 'Saint-Estèphe',             system: '1855', classification: '4ème Cru', secondWine: 'Les Pélerins de Lafon-Rochet' },
  { name: "Château La Tour-Carnet",                      lat: 45.1470, lng: -0.7938, appellation: 'Haut Medoc',     commune: 'Saint-Laurent-Médoc',       system: '1855', classification: '4ème Cru', secondWine: 'Les Douves de Carnet' },
  { name: "Château Marquis-de-Terme",                    lat: 45.0381, lng: -0.6779, appellation: 'Margaux',        commune: 'Margaux',                   system: '1855', classification: '4ème Cru', secondWine: 'Les Gondats de Marquis de Terme' },
  { name: "Château Pouget",                              lat: 45.0231, lng: -0.6569, appellation: 'Margaux',        commune: 'Cantenac',                  system: '1855', classification: '4ème Cru', secondWine: 'Antoine Pouget' },
  { name: "Château Prieuré-Lichine",                     lat: 45.0290, lng: -0.6565, appellation: 'Margaux',        commune: 'Cantenac',                  system: '1855', classification: '4ème Cru', secondWine: 'La Cloître Prieuré-Lichine' },
  { name: "Château St.-Pierre",                          lat: 45.1472, lng: -0.7427, appellation: 'St Julien',      commune: 'Saint-Julien-Beychevelle',  system: '1855', classification: '4ème Cru', secondWine: 'Esprit de Saint-Pierre' },
  { name: "Château Talbot",                              lat: 45.1597, lng: -0.7569, appellation: 'St Julien',      commune: 'Saint-Julien-Beychevelle',  system: '1855', classification: '4ème Cru', secondWine: 'Connétable de Talbot' },

  // ── 5ème Cru ───────────────────────────────────────────────────────────────
  { name: "Château Batailley",                           lat: 45.1768, lng: -0.7729, appellation: 'Pauillac',       commune: 'Pauillac',                  system: '1855', classification: '5ème Cru', secondWine: 'Lions de Batailley' },
  { name: "Château Belgrave",                            lat: 45.1512, lng: -0.7797, appellation: 'Haut Medoc',     commune: 'Saint-Laurent-Médoc',       system: '1855', classification: '5ème Cru', secondWine: 'Diane de Belgrave' },
  { name: "Château Cantemerle",                          lat: 44.9934, lng: -0.6252, appellation: 'Haut Medoc',     commune: 'Macau',                     system: '1855', classification: '5ème Cru', secondWine: 'Les Allées de Cantemerle' },
  { name: "Château Clerc-Milon",                         lat: 45.2217, lng: -0.7654, appellation: 'Pauillac',       commune: 'Pauillac',                  system: '1855', classification: '5ème Cru', secondWine: 'Pastourelle de Clerc Milon' },
  { name: "Château Cos Labory",                          lat: 45.2309, lng: -0.7768, appellation: 'St Estephe',     commune: 'Saint-Estèphe',             system: '1855', classification: '5ème Cru', secondWine: 'Le Charme Labory' },
  { name: "Château Croizet-Bages",                       lat: 45.1908, lng: -0.7566, appellation: 'Pauillac',       commune: 'Pauillac',                  system: '1855', classification: '5ème Cru', secondWine: 'La Tourelle de Croizet-Bages' },
  { name: "Château d'Armailhac",                         lat: 45.2111, lng: -0.7699, appellation: 'Pauillac',       commune: 'Pauillac',                  system: '1855', classification: '5ème Cru' },
  { name: "Château Dauzac",                              lat: 45.0194, lng: -0.6233, appellation: 'Margaux',        commune: 'Labarde',                   system: '1855', classification: '5ème Cru', secondWine: 'La Bastide de Dauzac' },
  { name: "Château de Camensac",                         lat: 45.1465, lng: -0.7857, appellation: 'Haut Medoc',     commune: 'Saint-Laurent-Médoc',       system: '1855', classification: '5ème Cru', secondWine: 'La Closerie de Camensac' },
  { name: "Château du Tertre",                           lat: 45.0060, lng: -0.6809, appellation: 'Margaux',        commune: 'Arsac',                     system: '1855', classification: '5ème Cru', secondWine: 'Les Hauts du Tertre' },
  { name: "Château Grand-Puy-Ducasse",                   lat: 45.1999, lng: -0.7466, appellation: 'Pauillac',       commune: 'Pauillac',                  system: '1855', classification: '5ème Cru', secondWine: 'Prélude à Grand-Puy Ducasse' },
  { name: "Château Grand-Puy-Lacoste",                   lat: 45.1900, lng: -0.7691, appellation: 'Pauillac',       commune: 'Pauillac',                  system: '1855', classification: '5ème Cru', secondWine: 'Lacoste-Borie' },
  { name: "Château Haut-Bages-Libéral",                  lat: 45.1824, lng: -0.7492, appellation: 'Pauillac',       commune: 'Pauillac',                  system: '1855', classification: '5ème Cru', secondWine: 'La Chapelle de Bages' },
  { name: "Château Haut-Batailley",                      lat: 45.1733, lng: -0.7709, appellation: 'Pauillac',       commune: 'Pauillac',                  system: '1855', classification: '5ème Cru', secondWine: "Château La Tour l'Aspic" },
  { name: "Château Lynch-Bages",                         lat: 45.1914, lng: -0.7545, appellation: 'Pauillac',       commune: 'Pauillac',                  system: '1855', classification: '5ème Cru', secondWine: 'Echo de Lynch-Bages' },
  { name: "Château Lynch-Moussas",                       lat: 45.1836, lng: -0.7922, appellation: 'Pauillac',       commune: 'Pauillac',                  system: '1855', classification: '5ème Cru', secondWine: 'Les Hauts de Lynch-Moussas' },
  { name: "Château Pédesclaux",                          lat: 45.2120, lng: -0.7567, appellation: 'Pauillac',       commune: 'Pauillac',                  system: '1855', classification: '5ème Cru', secondWine: 'Fleur de Pédesclaux' },
  { name: "Château Pontet-Canet",                        lat: 45.2083, lng: -0.7705, appellation: 'Pauillac',       commune: 'Pauillac',                  system: '1855', classification: '5ème Cru', secondWine: 'Les Hauts de Pontet-Canet' },
];
