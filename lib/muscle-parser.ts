/**
 * Parser pro data ze Svaly.md a Svaly_list.md
 * Parsuje markdown soubor a extrahuje informace o svalech
 */

export interface Muscle {
  id: string;
  name: string;
  latinName: string; // Latinský název
  group: string;
  origin: string; // Začátek
  insertion: string; // Úpon
  function: string; // Funkce
  imageUrl?: string; // Volitelná cesta k obrázku svalu
}

/**
 * Parsuje markdown tabulku s daty o svalech
 * Formát: | Svalová skupina | Sval | Latinský název | Začátek | Úpon | Funkce |
 */
export function parseMusclesFromMarkdownTable(content: string): Muscle[] {
  const muscles: Muscle[] = [];
  const lines = content.split('\n');
  
  // Najít hlavičku tabulky
  let headerLineIndex = -1;
  let headerColumns: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('|') && line.includes('Svalová skupina')) {
      headerLineIndex = i;
      // Parsovat hlavičku - použít stejnou logiku jako u datových řádků
      const rawCells = line.split('|');
      headerColumns = rawCells.slice(1, -1).map(c => c.trim());
      break;
    }
  }
  
  if (headerLineIndex === -1) {
    return []; // Není tabulka
  }
  
  // Najít indexy sloupců
  const groupIndex = headerColumns.findIndex(col => 
    col.toLowerCase().includes('skupina') || col.toLowerCase().includes('svalová')
  );
  const nameIndex = headerColumns.findIndex(col => 
    col.toLowerCase() === 'sval'
  );
  const latinIndex = headerColumns.findIndex(col => 
    col.toLowerCase().includes('latinský') || col.toLowerCase().includes('latinsky')
  );
  const originIndex = headerColumns.findIndex(col => 
    col.toLowerCase() === 'začátek'
  );
  const insertionIndex = headerColumns.findIndex(col => 
    col.toLowerCase() === 'úpon'
  );
  const functionIndex = headerColumns.findIndex(col => 
    col.toLowerCase() === 'funkce'
  );
  
  // Parsovat řádky dat (přeskočit hlavičku a separator)
  for (let i = headerLineIndex + 2; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Přeskočit prázdné řádky a separátory
    if (!line || line.match(/^\|[\-\s:]+\|/)) {
      continue;
    }
    
    if (!line.startsWith('|')) {
      continue;
    }
    
    // Parsovat buňky - split na | a odstranit prázdné hodnoty na začátku/konci
    const rawCells = line.split('|');
    // Odstranit první a poslední prázdný element (kvůli | na začátku a konci)
    const cells = rawCells.slice(1, -1).map(c => c.trim());
    
    // Pokud máme méně buněk než očekáváme, přeskočit
    const maxIndex = Math.max(
      groupIndex >= 0 ? groupIndex : -1,
      nameIndex >= 0 ? nameIndex : -1,
      latinIndex >= 0 ? latinIndex : -1,
      originIndex >= 0 ? originIndex : -1,
      insertionIndex >= 0 ? insertionIndex : -1,
      functionIndex >= 0 ? functionIndex : -1
    );
    
    if (cells.length <= maxIndex) {
      continue;
    }
    
    const group = groupIndex >= 0 && cells[groupIndex] ? cells[groupIndex] : '';
    const name = nameIndex >= 0 && cells[nameIndex] ? cells[nameIndex] : '';
    const latinName = latinIndex >= 0 && cells[latinIndex] ? cells[latinIndex] : '';
    const origin = originIndex >= 0 && cells[originIndex] ? cells[originIndex] : '';
    const insertion = insertionIndex >= 0 && cells[insertionIndex] ? cells[insertionIndex] : '';
    const func = functionIndex >= 0 && cells[functionIndex] ? cells[functionIndex] : '';
    
    // Přeskočit prázdné řádky nebo duplikáty hlavičky
    if (!name || name.toLowerCase() === 'sval' || name === '---') {
      continue;
    }
    
    // Vytvořit sval - nahradit prázdné hodnoty nebo "-" za prázdný string
    muscles.push({
      id: `muscle-${muscles.length + 1}`,
      name: name.trim(),
      latinName: (latinName.trim() === '-' ? '' : latinName.trim()),
      group: group.trim(),
      origin: (origin.trim() === '-' ? '' : origin.trim()),
      insertion: (insertion.trim() === '-' ? '' : insertion.trim()),
      function: (func.trim() === '-' ? '' : func.trim()),
    });
  }
  
  return muscles;
}

export function parseMusclesFromMarkdown(content: string): Muscle[] {
  const muscles: Muscle[] = [];
  const lines = content.split('\n');
  
  let currentGroup = '';
  let currentMuscle: Partial<Muscle> | null = null;
  let currentField: 'origin' | 'insertion' | 'function' | null = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Detekce skupiny
    if (line.startsWith('Skupina:')) {
      currentGroup = line.replace('Skupina:', '').trim();
      continue;
    }
    
    // Detekce nového svalu (číslo + název)
    const muscleMatch = line.match(/^\d+\.\s+(.+)$/);
    if (muscleMatch) {
      // Uložit předchozí sval pokud existuje
      if (currentMuscle && currentMuscle.name) {
        muscles.push(currentMuscle as Muscle);
      }
      
      // Nový sval
      const name = muscleMatch[1].trim();
      currentMuscle = {
        id: `muscle-${muscles.length + 1}`,
        name,
        latinName: '',
        group: currentGroup,
        origin: '',
        insertion: '',
        function: '',
      };
      currentField = null;
      continue;
    }
    
    // Detekce polí
    if (line.startsWith('Latinský název:') || line.startsWith('Latinsky:')) {
      const value = line.replace(/Latinský název:|Latinsky:/, '').trim();
      if (currentMuscle) {
        currentMuscle.latinName = value;
      }
      continue;
    }
    
    if (line.startsWith('Začátek:')) {
      currentField = 'origin';
      const value = line.replace('Začátek:', '').trim();
      if (currentMuscle) {
        currentMuscle.origin = value;
      }
      continue;
    }
    
    if (line.startsWith('Úpon:')) {
      currentField = 'insertion';
      const value = line.replace('Úpon:', '').trim();
      if (currentMuscle) {
        currentMuscle.insertion = value;
      }
      continue;
    }
    
    if (line.startsWith('Funkce:')) {
      currentField = 'function';
      const value = line.replace('Funkce:', '').trim();
      if (currentMuscle) {
        currentMuscle.function = value;
      }
      continue;
    }
    
    // Pokračování víceřádkového textu
    if (currentField && currentMuscle && line) {
      if (currentField === 'origin') {
        currentMuscle.origin += ' ' + line;
      } else if (currentField === 'insertion') {
        currentMuscle.insertion += ' ' + line;
      } else if (currentField === 'function') {
        currentMuscle.function += ' ' + line;
      }
    }
  }
  
  // Přidat poslední sval
  if (currentMuscle && currentMuscle.name) {
    muscles.push(currentMuscle as Muscle);
  }
  
  // Vyčistit mezery
  return muscles.map(m => ({
    ...m,
    origin: m.origin.trim(),
    insertion: m.insertion.trim(),
    function: m.function.trim(),
  }));
}

