# Obrázky svalů

Tato složka obsahuje obrázky svalů, které se zobrazují vedle otázek v kvízu.

## Pojmenování souborů

Obrázky by měly být pojmenovány podle názvu svalu v databázi. Název se automaticky normalizuje:

- **Malá písmena** - všechny znaky jsou převedeny na lowercase
- **Bez diakritiky** - diakritika je odstraněna (á → a, č → c, atd.)
- **Mezery nahrazeny pomlčkami** - např. "Sval deltový" → "sval-deltovy"
- **Speciální znaky odstraněny** - vše co není písmeno nebo číslo je nahrazeno pomlčkou

### Příklady názvů souborů:

| Název svalu v databázi | Název souboru |
|----------------------|---------------|
| Sval deltový | `sval-deltovy.jpg` |
| Sval pološlachovitý | `sval-poloslachovity.jpg` |
| Sval trapézový | `sval-trapezovy.jpg` |
| Dvojhlavý sval lýtkový | `dvojhlavy-sval-lytkovy.jpg` |
| Velký sval hýžďový | `velky-sval-hyzdovy.jpg` |

## Podporované formáty

- `.jpg` / `.jpeg` (doporučeno)
- `.png`
- `.webp`
- `.svg`

## Jak přidat obrázky

1. Vytvořte název souboru podle názvu svalu (viz výše)
2. Uložte obrázek do této složky (`public/images/muscles/`)
3. Aplikace automaticky najde a zobrazí obrázek při kvízu

## Automatické mapování

Pokud má sval v databázi explicitně nastavenou `imageUrl`, použije se ta. Jinak se automaticky generuje cesta podle názvu svalu.

## Tipy

- Použijte kvalitní obrázky s dobrým rozlišením (min. 512x512px)
- Optimalizujte obrázky pro web (komprese, správný formát)
- Ujistěte se, že obrázek má transparentní pozadí nebo světlé pozadí pro lepší zobrazení

