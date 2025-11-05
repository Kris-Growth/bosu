/**
 * Helper script pro generování názvů souborů obrázků
 * Spustit: node scripts/generate-image-names.js
 */

const fs = require('fs');
const path = require('path');

// Načíst data o svalech
const muscleDataPath = path.join(__dirname, '../lib/muscle-data.ts');
const content = fs.readFileSync(muscleDataPath, 'utf-8');

// Extrahovat názvy svalů (jednoduchý regex)
const muscleNames = [];
const nameRegex = /name:\s*['"]([^'"]+)['"]/g;
let match;

while ((match = nameRegex.exec(content)) !== null) {
  muscleNames.push(match[1]);
}

// Normalizovat názvy (stejná logika jako v muscle-utils.ts)
function normalizeName(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Odstran diakritiku
    .replace(/[^a-z0-9]+/g, '-') // Nahraď vše co není písmeno/číslo pomlčkou
    .replace(/^-+|-+$/g, ''); // Odstran pomlčky na začátku/konci
}

console.log('📋 Názvy souborů pro obrázky svalů:\n');
console.log('='.repeat(60));

muscleNames.forEach((name, index) => {
  const normalized = normalizeName(name);
  console.log(`${(index + 1).toString().padStart(3)}. ${name}`);
  console.log(`    → ${normalized}.jpg`);
  console.log('');
});

console.log('='.repeat(60));
console.log(`\nCelkem: ${muscleNames.length} svalů\n`);
console.log('💡 Tip: Uložte obrázky do: public/images/muscles/');
console.log('   Použijte normalizovaný název + příponu (.jpg, .png, atd.)\n');

