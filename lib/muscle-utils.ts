/**
 * Utility funkce pro práci se svaly
 */

import { Muscle } from './muscle-parser';

/**
 * Generuje cestu k obrázku svalu na základě jeho názvu nebo ID
 * Obrázky by měly být uloženy v public/images/muscles/
 * 
 * @param muscle - Sval objekt
 * @returns Cesta k obrázku (např. /images/muscles/sval-deltovy.jpg)
 */
export function getMuscleImageUrl(muscle: Muscle): string | null {
  // Pokud má sval explicitně nastavenou imageUrl, použij ji
  if (muscle.imageUrl) {
    return muscle.imageUrl;
  }

  // Vytvoř název souboru z názvu svalu
  // Normalizuj název: odstran diakritiku, převeď na lowercase, nahraď mezery podtržítky
  let normalizedName = muscle.name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Odstran diakritiku
    .replace(/[^a-z0-9]+/g, '_') // Nahraď vše co není písmeno/číslo podtržítkem
    .replace(/^_+|_+$/g, ''); // Odstran podtržítka na začátku/konci

  // Speciální mapování pro názvy, které neodpovídají přesně názvům souborů
  const nameMappings: Record<string, string> = {
    // Zdvihač hlavy -> zvihac_hlavy (chybí 'd' v souboru)
    'zdvihac_hlavy': 'zvihac_hlavy',
    
    // Střední sval hýžďový -> stredni_sval_hyydovy (dvojité 'y')
    'stredni_sval_hyzdovy': 'stredni_sval_hyydovy',
    
    // Šikmý sval břišní vnější/vnitřní -> kombinovaný soubor
    'sikmy_sval_brisni_vnitrni': 'sikmy_sval_brisni_vnejsi_vnitrni',
    'sikmy_sval_brisni_vnejsi': 'sikmy_sval_brisni_vnejsi_vnitrni',
    
    // Pilovitý sval zadní dolní -> použijeme horní (dolní možná není)
    'pilovity_sval_zadni_dolni': 'pilovity_sval_zadni_horni',
    
    // Sval pološlachovitý -> sval_poloslasity (zkrácená verze)
    'sval_poloslachovity': 'sval_poloslasity',
    
    // Čtyřhranný sval bederní -> ctyrhlavy_sval_bederni
    'ctyrhranny_sval_bederni': 'ctyrhlavy_sval_bederni',
    
    // Zdviháč lopatky -> zdvihac_lopatky
    'zdvihac_lopatky': 'zdvihac_lopatky',
    
    // Mezižeberní svaly -> mezireberni_svaly (bez 'z')
    'mezizeberni_svaly': 'mezireberni_svaly',
    
    // Příčný sval břišní -> pricni_sval_brisni (bez 'y')
    'pricny_sval_brisni': 'pricni_sval_brisni',
    
    // Vnitřní hlava čtyřhlavého svalu stehenního -> vnitri_hlava (bez 'n')
    'vnitrni_hlava_ctyrhlaveho_svalu_stehenniho': 'vnitri_hlava_ctyrhlaveho_svalu_stehenniho',
    
    // Dvojhlavý sval lýtkový - pokud máte správný obrázek s jiným názvem, upravte zde
    // Prozatím zůstává mapování na dvojhlavy_sval_lytkovy.jpg
    // Pokud potřebujete použít jiný soubor, změňte hodnotu níže:
    // 'dvojhlavy_sval_lytkovy': 'nazev_spravneho_souboru',
  };

  // Pokud existuje mapování, použij ho
  if (nameMappings[normalizedName]) {
    normalizedName = nameMappings[normalizedName];
  }

  // Zkus různé formáty obrázků
  const possibleExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.svg'];
  
  // Vrátit první možnou cestu (aplikace zkusí načíst, pokud neexistuje, použije se fallback)
  return `/images/muscles/${normalizedName}${possibleExtensions[0]}`;
}

/**
 * Vytvoří alternativní text pro obrázek svalu
 */
export function getMuscleImageAlt(muscle: Muscle): string {
  return `Obrázek svalu: ${muscle.name}${muscle.latinName ? ` (${muscle.latinName})` : ''}`;
}

