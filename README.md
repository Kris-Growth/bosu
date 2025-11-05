# Musle Up - Kvízová hra pro učení svalů

Zábavná kvízová aplikace pro učení svalových partií, jejich cviků, latinských názvů, úponů a začátků.

## Funkce

- 🎯 **Interaktivní kvíz** - Multiple choice otázky o svalech
- 📊 **Statistiky** - Sledování přesnosti, skóre a streaků
- 🔥 **Gamifikace** - Streak systém pro motivaci
- 📈 **Progress tracking** - Sledování pokroku v reálném čase
- 🎨 **Moderní UI** - Použití ShadCN komponent a Tailwind CSS

## Instalace

```bash
# Nainstalovat závislosti
npm install

# Spustit vývojový server
npm run dev
```

Aplikace poběží na [http://localhost:3000](http://localhost:3000)

## Struktura projektu

- `app/` - Next.js App Router stránky
- `components/` - React komponenty
  - `quiz/` - Kvízové komponenty
  - `ui/` - ShadCN UI komponenty
- `lib/` - Utility funkce a logika
  - `muscle-data.ts` - Data o svalech
  - `muscle-parser.ts` - Parser pro markdown soubory
  - `muscle-utils.ts` - Utility funkce pro práci se svaly (obrázky, atd.)
  - `quiz-types.ts` - Typy a logika kvízu
- `public/images/muscles/` - Obrázky svalů pro kvíz
- `scripts/` - Helper scripty

## Přidání nových svalů

Svaly se přidávají do souboru `Svaly_list.md` ve formátu markdown tabulky. Data se automaticky načítají pomocí parseru.

### Formát v `Svaly_list.md`:

Markdown tabulka s následujícími sloupci:
- **Svalová skupina** - Skupina svalů (např. "Svaly zad", "Svaly bérce")
- **Sval** - Název svalu
- **Latinský název** - Latinský název svalu
- **Začátek** - Popis začátku svalu
- **Úpon** - Popis úponu svalu
- **Funkce** - Popis funkce svalu

Příklad:
```markdown
| Svalová skupina | Sval | Latinský název | Začátek | Úpon | Funkce |
|---|---|---|---|---|---|
| Svaly zad | Sval trapézový | m. trapezius | Kost týlní... | Na nadpažek... | Zdvihá lopatky... |
```

Data se automaticky parsují při buildu aplikace pomocí funkce `parseMusclesFromMarkdownTable()` v `lib/muscle-parser.ts`.

### Alternativní formát v `Svaly.md`:

Pro starší formát se používá parser `parseMusclesFromMarkdown()`:
```
Skupina: Název skupiny
1. Název svalu
Začátek: Popis začátku
Úpon: Popis úponu
Funkce: Popis funkce
```

## Použité technologie

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **ShadCN UI** - UI komponenty
- **Lucide React** - Ikony

## Scripty

- `npm run dev` - Spustit vývojový server
- `npm run build` - Vytvořit produkční build
- `npm run start` - Spustit produkční server
- `npm run lint` - Spustit linter

## Obrázky svalů

Aplikace podporuje zobrazení obrázků svalů vedle otázek v kvízu.

### Jak přidat obrázky

1. **Získejte názvy souborů** - spusťte helper script:
   ```bash
   node scripts/generate-image-names.js
   ```
   Tento script vypíše normalizované názvy pro všechny svaly.

2. **Uložte obrázky** do složky `public/images/muscles/` s normalizovaným názvem:
   - Např. "Sval deltový" → `sval-deltovy.jpg`
   - Podporované formáty: `.jpg`, `.jpeg`, `.png`, `.webp`, `.svg`

3. **Automatické zobrazení** - aplikace automaticky najde a zobrazí obrázek při kvízu.

Více informací najdete v `public/images/muscles/README.md`.

## Deployment

### Nasazení na Vercel (doporučeno)

1. **Vytvořte repozitář na GitHubu:**
   ```bash
   # Přidejte remote repository
   git remote add origin <URL-VASEHO-GITHUB-REPO>
   git branch -M main
   git push -u origin main
   ```

2. **Nasazení přes Vercel CLI:**
   ```bash
   # Nainstalujte Vercel CLI globálně
   npm i -g vercel
   
   # Přihlaste se a nasaďte
   vercel
   ```

3. **Nasazení přes Vercel Dashboard:**
   - Jděte na [vercel.com](https://vercel.com)
   - Přihlaste se pomocí GitHub účtu
   - Klikněte na "New Project"
   - Importujte váš GitHub repozitář
   - Vercel automaticky detekuje Next.js a nasadí aplikaci

### Alternativní deployment

Pro nasazení na jiné platformy (Netlify, Railway, atd.) použijte standardní Next.js build proces:
```bash
npm run build
npm run start
```
