"use client";

import { useState, useEffect } from "react";
import { QuizGame } from "@/components/quiz/QuizGame";
import { Encyclopedia } from "@/components/quiz/Encyclopedia";
import { Dictionary } from "@/components/quiz/Dictionary";
import { Button } from "@/components/ui/button";
import { loadSettings } from "@/lib/quiz-settings";
import { QuizSettings } from "@/lib/quiz-types";

export default function Home() {
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
        <QuizGame externalShowSettings={showSettingsFromHeader} onExternalSettingsClose={() => setShowSettingsFromHeader(false)} />
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

