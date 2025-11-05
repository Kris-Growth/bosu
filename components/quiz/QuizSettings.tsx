"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QuizSettings, QuestionType } from "@/lib/quiz-types";
import { loadSettings, saveSettings, questionTypeLabels, defaultSettings } from "@/lib/quiz-settings";
import { Settings, X } from "lucide-react";

interface QuizSettingsProps {
  onSettingsChange: (settings: QuizSettings) => void;
  onClose: () => void;
}

export function QuizSettingsPanel({ onSettingsChange, onClose }: QuizSettingsProps) {
  const [settings, setSettings] = useState<QuizSettings>(defaultSettings);

  useEffect(() => {
    const loaded = loadSettings();
    setSettings(loaded);
  }, []);

  const toggleQuestionType = (type: QuestionType) => {
    const newEnabledTypes = settings.enabledTypes.includes(type)
      ? settings.enabledTypes.filter(t => t !== type)
      : [...settings.enabledTypes, type];
    
    // Ujistit se, že alespoň jeden typ je vybraný
    if (newEnabledTypes.length === 0) {
      return;
    }

    const newSettings = {
      ...settings,
      enabledTypes: newEnabledTypes,
    };
    
    setSettings(newSettings);
    saveSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const availableTypes: QuestionType[] = ['function', 'latinName', 'origin', 'insertion'];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Nastavení kvízu
          </CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-3">Typy otázek</h3>
            <div className="space-y-2">
              {availableTypes.map((type) => (
                <label
                  key={type}
                  className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={settings.enabledTypes.includes(type)}
                    onChange={() => toggleQuestionType(type)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <span className="text-sm font-medium">
                    {questionTypeLabels[type]}
                  </span>
                </label>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Vyberte typy otázek, které chcete v kvízu.
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={onClose}
              className="flex-1"
              variant="outline"
            >
              Hotovo
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

