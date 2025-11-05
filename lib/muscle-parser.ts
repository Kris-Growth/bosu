/**
 * Parser pro data ze Svaly.md
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

