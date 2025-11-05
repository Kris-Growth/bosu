/**
 * Utility funkce pro práci s nastavením kvízu
 */

import { QuizSettings, QuestionType } from './quiz-types';

const SETTINGS_STORAGE_KEY = 'quiz-settings';

/**
 * Výchozí nastavení
 */
export const defaultSettings: QuizSettings = {
  enabledTypes: ['origin', 'insertion', 'function', 'latinName'],
  questionsPerMuscle: 3,
};

/**
 * Načte nastavení z localStorage
 */
export function loadSettings(): QuizSettings {
  if (typeof window === 'undefined') {
    return defaultSettings;
  }

  try {
    const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Validace - ujistit se, že máme alespoň jeden typ
      if (parsed.enabledTypes && Array.isArray(parsed.enabledTypes) && parsed.enabledTypes.length > 0) {
        return {
          ...defaultSettings,
          ...parsed,
          enabledTypes: parsed.enabledTypes.filter((type: QuestionType) => 
            ['origin', 'insertion', 'function', 'latinName'].includes(type)
          ),
        };
      }
    }
  } catch (error) {
    console.error('Chyba při načítání nastavení:', error);
  }

  return defaultSettings;
}

/**
 * Uloží nastavení do localStorage
 */
export function saveSettings(settings: QuizSettings): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    // Vyvolat custom event pro aktualizaci UI v jiných komponentách
    window.dispatchEvent(new Event('quiz-settings-changed'));
  } catch (error) {
    console.error('Chyba při ukládání nastavení:', error);
  }
}

/**
 * Popisky pro typy otázek
 */
export const questionTypeLabels: Record<QuestionType, string> = {
  origin: 'Začátky',
  insertion: 'Úpony',
  function: 'Funkce',
  latinName: 'Latinské názvy',
  name: 'Názvy',
};

