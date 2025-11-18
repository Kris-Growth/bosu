"use client";

import { useState, useEffect } from "react";
import { QuizGame } from "@/components/quiz/QuizGame";
import { AIQuizGame } from "@/components/quiz/AIQuizGame";
import { Encyclopedia } from "@/components/quiz/Encyclopedia";
import { Dictionary } from "@/components/quiz/Dictionary";
import { Button } from "@/components/ui/button";
import { loadSettings } from "@/lib/quiz-settings";
import { QuizSettings } from "@/lib/quiz-types";

type QuizMode = "multiple-choice" | "ai-text";

export default function Home() {
  const [quizMode, setQuizMode] = useState<QuizMode>("multiple-choice");
  const [showSettingsFromHeader, setShowSettingsFromHeader] = useState(false);
  const [showEncyclopedia, setShowEncyclopedia] = useState(false);
  const [showDictionary, setShowDictionary] = useState(false);
  const [selectedCount, setSelectedCount] = useState(4); // Výchozí hodnota pro SSR
  const totalCount = 4; // origin, insertion, function, latinName

  // Načíst nastavení až po mountu na klientu (aby nedošlo k hydration error)
  useEffect(() => {
    const updateSettings = () => {
      const settings = loadSettings();
      setSelectedCount(settings.enabledTypes.length);
    };

    // Načíst nastavení při mountu
    updateSettings();

    // Poslouchat změny v localStorage
    const handleStorageChange = () => {
      updateSettings();
    };
    window.addEventListener('storage', handleStorageChange);
    
    // Také poslouchat vlastní custom event (pro změny v rámci stejné stránky)
    const handleCustomStorageChange = () => {
      updateSettings();
    };
    window.addEventListener('quiz-settings-changed', handleCustomStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('quiz-settings-changed', handleCustomStorageChange);
    };
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="w-full max-w-6xl mx-auto px-4">
        {/* Header - na desktopu vedle sebe, na mobilu pod sebou */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-black mb-2">
              Fit-Praha-Kviz
            </h1>
            <p className="text-muted-foreground">
              Kvízová hra pro učení svalových partií
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowEncyclopedia(true)}
              className="flex items-center gap-2"
            >
              <span>Encyklopedie</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDictionary(true)}
              className="flex items-center gap-2"
            >
              <span>Slovník slov</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSettingsFromHeader(true)}
              className="flex items-center gap-2"
            >
              <span className="text-sm font-medium">{selectedCount}/{totalCount}</span>
              <span>Typy otázek</span>
            </Button>
          </div>
        </div>
        
        {/* Tabs pro přepínání mezi režimy */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex gap-2">
            <button
              onClick={() => setQuizMode("multiple-choice")}
              className={`px-4 py-2 font-medium text-sm transition-colors ${
                quizMode === "multiple-choice"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Kvíz (výběr z možností)
            </button>
            <button
              onClick={() => setQuizMode("ai-text")}
              className={`px-4 py-2 font-medium text-sm transition-colors ${
                quizMode === "ai-text"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Kvíz (volný text + AI)
            </button>
          </div>
        </div>

        {/* Zobrazení příslušného režimu kvízu */}
        {quizMode === "multiple-choice" ? (
          <QuizGame
            externalShowSettings={showSettingsFromHeader}
            onExternalSettingsClose={() => setShowSettingsFromHeader(false)}
          />
        ) : (
          <AIQuizGame
            externalShowSettings={showSettingsFromHeader}
            onExternalSettingsClose={() => setShowSettingsFromHeader(false)}
          />
        )}
      </div>
      
      {showEncyclopedia && (
        <Encyclopedia onClose={() => setShowEncyclopedia(false)} />
      )}
      
      {showDictionary && (
        <Dictionary onClose={() => setShowDictionary(false)} />
      )}
    </main>
  );
}

