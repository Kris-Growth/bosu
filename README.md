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
  - `quiz-types.ts` - Typy a logika kvízu

## Přidání nových svalů

Svaly se přidávají do souboru `lib/muscle-data.ts` nebo lze použít parser pro načtení ze souboru `Svaly.md`.

Formát v `Svaly.md`:
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

