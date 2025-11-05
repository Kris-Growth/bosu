/**
 * Slovník fitness pojmů s jednoduchými vysvětleními
 */

export interface FitnessTerm {
  term: string;
  description: string;
  example: string;
}

export const fitnessTerms: FitnessTerm[] = [
  {
    term: 'Abdukce',
    description: 'Pohyb, kdy oddaluješ část těla od střední linie těla. Představ si, že máš nohy u sebe a pak jednu nohu dáš do strany - to je abdukce.',
    example: 'Když zvedneš ruku do strany nebo dáš nohu do strany - to jsou abdukční pohyby.',
  },
  {
    term: 'Addukce',
    description: 'Opačný pohyb k abdukci - přibližuješ část těla zpět ke střední linii těla. Jako když máš nohu do strany a pak ji přitáhneš zpět k druhé noze.',
    example: 'Když přitáhneš ruku zpět k tělu nebo nohu zpět k druhé noze - to jsou addukční pohyby.',
  },
  {
    term: 'Flexe',
    description: 'Ohýbání kloubu - zmenšuje se úhel mezi kostmi. Nejjednodušší příklad je ohnutí lokte nebo kolena.',
    example: 'Když ohneš loket (přitáhneš ruku k rameni) nebo koleno (přitáhneš patu k hýždi) - to je flexe.',
  },
  {
    term: 'Extenze',
    description: 'Narovnávání kloubu - zvyšuje se úhel mezi kostmi. Je to opak flexe - narovnáváš, co bylo předtím ohnuté.',
    example: 'Když narovnáš loket nebo koleno - to je extenze. Taky když se narovnáš v zádech po předklonu.',
  },
  {
    term: 'Plantární flexe',
    description: 'To je když jdeš na špičky - špička nohy se pohybuje dolů, od těla. Jako když děláš výpony.',
    example: 'Když jdeš na špičky nebo když kopneš do míče - to je plantární flexe.',
  },
  {
    term: 'Dorzální flexe',
    description: 'Opačný pohyb k plantární flexi - špička nohy jde nahoru, směrem k holeni. Jako když chceš přitáhnout prsty k holeni.',
    example: 'Když jdeš po patách nebo když chceš přitáhnout prsty k holeni - to je dorzální flexe.',
  },
  {
    term: 'Lateroflexe',
    description: 'Uklonění těla nebo části těla do strany. Jako když se nakloníš doleva nebo doprava. Proč se to nazývá "lateroflexe" a ne jen "flexe"? "Latero" znamená "stranový" nebo "boční". Flexe krku je předklon hlavy dopředu (jako když kývneš hlavou "ano"), zatímco lateroflexe je úklon hlavy do strany (jako když ukloníš hlavu na rameno). Proto když ukloníš hlavu doprava nebo doleva, je to lateroflexe, protože jde o boční pohyb do strany, ne o předklon dopředu.',
    example: 'Když se ukloníš do strany nebo když ukloníš hlavu na rameno - to je lateroflexe. Flexe krku by bylo, kdybys sklonil hlavu dopředu (předklon, jako když kývneš hlavou "ano").',
  },
  {
    term: 'Supinace',
    description: 'Otočení ruky tak, že dlaň směřuje nahoru nebo ven. Jako když chceš ukázat, co máš v dlani.',
    example: 'Když otočíš ruku dlaní nahoru nebo když děláš biceps curls - to je supinace.',
  },
  {
    term: 'Pronace',
    description: 'Otočení ruky tak, že dlaň směřuje dolů nebo dovnitř. Opačný pohyb k supinaci.',
    example: 'Když otočíš ruku dlaní dolů nebo když děláš kliky - to je pronace.',
  },
  {
    term: 'Protrakce ramen',
    description: 'Pohyb ramen dopředu - jako když se shrbíš a ramena jdou dopředu. Lopatky se od sebe vzdalují.',
    example: 'Když se shrbíš u počítače nebo když děláš push-up plus - to je protrakce ramen.',
  },
  {
    term: 'Retrakce Ramen',
    description: 'Pohyb ramen dozadu - narovnáš se a stáhneš lopatky k sobě. Opačný pohyb k protrakci.',
    example: 'Když se narovnáš a stáhneš lopatky k sobě, jako když děláš veslování - to je retrakce ramen.',
  },
  {
    term: 'Elevace',
    description: 'Zvedání části těla nahoru. Jako když zvedneš ramena nahoru nebo lopatky.',
    example: 'Když zvedneš ramena nahoru (shrugs) nebo když zvedneš paži nahoru - to je elevace.',
  },
  {
    term: 'Deprese',
    description: 'Snížení části těla dolů. Opačný pohyb k elevaci - když ramena nebo lopatky jdou dolů.',
    example: 'Když snížíš ramena dolů nebo když spustíš paži dolů - to je deprese.',
  },
  {
    term: 'Anteverze',
    description: 'Naklonění pánve dopředu - jako když vyhrneš zadek dozadu a břicho dopředu. Pánev se "naklání" dopředu.',
    example: 'Když stojíš s vyhrnutým zadkem a břichem dopředu, nebo když děláš hip thrust - to je anteverze.',
  },
  {
    term: 'Retroverze',
    description: 'Naklonění pánve dozadu - opačný pohyb k anteverzi. Zatáhneš břicho a pánev se nakloní dozadu.',
    example: 'Když zatáhneš břicho a pánev jde dozadu, nebo když děláš dead bug - to je retroverze.',
  },
  {
    term: 'Rotace vnitřní a vnější',
    description: 'Vnitřní rotace je otočení dovnitř (např. ruka se otáčí tak, že palec směřuje k tělu), vnější rotace je otočení ven (palec směřuje od těla).',
    example: 'Vnitřní rotace: když otočíš ruku tak, že palec směřuje k tělu. Vnější rotace: když otočíš ruku tak, že palec směřuje od těla. Stejně to funguje u nohou - když špička směřuje dovnitř nebo ven.',
  },
];

