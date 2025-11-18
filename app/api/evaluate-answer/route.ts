import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { userAnswer, correctAnswer, questionType, muscleName } = await request.json();

    if (!userAnswer || !correctAnswer) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const systemPrompt = `Jsi odborný asistent pro vyhodnocování odpovědí v kvízu o anatomii svalů. 
Tvá úloha je vyhodnotit, zda je odpověď uživatele správná ve vztahu k referenční odpovědi z databáze.

Pravidla - buď FÉROVÝ a odměňuj znalosti:
1. Odpověď musí být SEMANTICKY SPRÁVNÁ - nemusí být doslovně stejná jako referenční odpověď
2. Akceptuj různé formulace, které mají stejný význam - pokud uživatel očividně ví, o čem mluví, odměň ho
3. Ignoruj drobné gramatické chyby nebo překlepy, pokud význam zůstává jasný
4. Pokud odpověď obsahuje správné informace, ale je neúplná nebo částečně správná, označ ji jako "partial"
5. Pokud odpověď obsahuje nesprávné informace, označ ji jako "incorrect"
6. Pokud odpověď je plně správná (i když formulovaná jinak), označ ji jako "correct"
7. Buď FÉROVÝ - pokud uživatel prokazuje znalosti a správně identifikuje klíčové informace, i když použije jiné slovní spojení nebo terminologii, odměň ho. Zároveň to nedávej zadarmo - odpověď musí obsahovat správné informace, ne jen obecné nebo vágní popisy.
8. Preferuj kategorii "correct" nebo "partial" před "incorrect", pokud je to rozumně možné - pokud uživatel ukazuje, že rozumí tématu, i když neřekl přesně to samé.

Kategorie odpovědí:
- "correct": Odpověď je plně správná, i když formulovaná jinak. Uživatel prokazuje znalosti a správně identifikuje všechny klíčové informace.
- "partial": Odpověď obsahuje správné prvky, ale je neúplná, chybí důležité části, nebo je jen částečně správná (např. uveden jen jeden z více úponů, jen část funkce, atd.). Uživatel ukazuje, že ví něco o tématu, ale ne úplně vše.
- "incorrect": Odpověď je nesprávná nebo obsahuje chybné informace. Uživatel neprokazuje správné znalosti.

Vždy odpověz ve formátu JSON:
{
  "answerStatus": "correct" | "partial" | "incorrect",
  "feedback": "string - vysvětlení, proč je odpověď správná, částečně správná nebo nesprávná, případně co by mělo být upraveno",
  "tip": "string - POUZE pokud answerStatus je "partial" nebo "incorrect", poskytni užitečný tip k zapamatování. Tip by měl být: 1) mnemotechnická pomůcka (např. akronym, rým, asociace), 2) vizuální asociace, 3) logické vysvětlení vztahů, 4) nebo praktická souvislost s funkcí svalu. Tip by měl být stručný (1-3 věty), srozumitelný a pomoci uživateli si správnou odpověď lépe zapamatovat. Pokud answerStatus je "correct", můžeš nechat tip prázdný nebo poskytnout krátké potvrzení."
}`;

    const userPrompt = `Vyhodnoť následující odpověď:

Typ otázky: ${questionType}
Sval: ${muscleName}
Referenční odpověď z databáze: "${correctAnswer}"
Odpověď uživatele: "${userAnswer}"

Je odpověď uživatele správná?

${questionType === 'origin' ? 'Tip by měl pomoci zapamatovat si začátek svalu - můžeš použít anatomické souvislosti, vizuální asociace nebo mnemotechnické pomůcky.' : ''}
${questionType === 'insertion' ? 'Tip by měl pomoci zapamatovat si úpon svalu - můžeš použít anatomické souvislosti, vizuální asociace nebo mnemotechnické pomůcky.' : ''}
${questionType === 'function' ? 'Tip by měl pomoci zapamatovat si funkci svalu - můžeš vysvětlit logiku funkce, praktické souvislosti nebo vizuální představu pohybu.' : ''}
${questionType === 'latinName' ? 'Tip by měl pomoci zapamatovat si latinský název - můžeš použít překlad, etymologii, nebo mnemotechnickou pomůcku.' : ''}
${questionType === 'name' ? 'Tip by měl pomoci zapamatovat si název svalu - můžeš použít vizuální asociace, logické souvislosti nebo mnemotechnické pomůcky.' : ''}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3,
    });

    const responseContent = completion.choices[0]?.message?.content;
    if (!responseContent) {
      throw new Error('No response from OpenAI');
    }

    const evaluation = JSON.parse(responseContent);

    // Pro zpětnou kompatibilitu, pokud API vrátí starý formát
    const answerStatus = evaluation.answerStatus || (evaluation.isCorrect ? 'correct' : 'incorrect');

    return NextResponse.json({
      answerStatus: answerStatus,
      isCorrect: answerStatus === 'correct', // Pro zpětnou kompatibilitu
      feedback: evaluation.feedback,
      tip: evaluation.tip || '',
    });
  } catch (error) {
    console.error('Error evaluating answer:', error);
    return NextResponse.json(
      { error: 'Failed to evaluate answer', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

