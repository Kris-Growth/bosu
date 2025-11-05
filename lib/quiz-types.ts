/**
 * Typy pro kvízovou hru
 */

import { Muscle } from './muscle-parser';

export type QuestionType = 'origin' | 'insertion' | 'function' | 'name' | 'latinName';

export interface QuizQuestion {
  id: string;
  muscle: Muscle;
  questionType: QuestionType;
  question: string;
  correctAnswer: string;
  options: string[];
}

export interface QuizState {
  currentQuestionIndex: number;
  questions: QuizQuestion[];
  answers: Map<string, string>;
  score: number;
  streak: number;
  isComplete: boolean;
}

export interface QuizStats {
  totalQuestions: number;
  correctAnswers: number;
  streak: number;
  accuracy: number;
}

/**
 * Generuje otázku pro sval
 */
export function generateQuestion(
  muscle: Muscle,
  allMuscles: Muscle[],
  questionType: QuestionType
): QuizQuestion {
  const questionId = `${muscle.id}-${questionType}-${Date.now()}`;
  
  let question: string;
  let correctAnswer: string;
  let options: string[] = [];
  
  switch (questionType) {
    case 'origin':
      question = `Jaký je začátek svalu "${muscle.name}"?`;
      correctAnswer = muscle.origin;
      // Generovat možnosti z jiných svalů
      options = generateOptions(
        allMuscles,
        muscle,
        (m) => m.origin,
        correctAnswer
      );
      break;
      
    case 'insertion':
      question = `Jaký je úpon svalu "${muscle.name}"?`;
      correctAnswer = muscle.insertion;
      options = generateOptions(
        allMuscles,
        muscle,
        (m) => m.insertion,
        correctAnswer
      );
      break;
      
    case 'function':
      question = `Jaká je funkce svalu "${muscle.name}"?`;
      correctAnswer = muscle.function;
      options = generateOptions(
        allMuscles,
        muscle,
        (m) => m.function,
        correctAnswer
      );
      break;
      
    case 'name':
      question = `Který sval má začátek "${muscle.origin.substring(0, 50)}..."?`;
      correctAnswer = muscle.name;
      options = generateOptions(
        allMuscles,
        muscle,
        (m) => m.name,
        correctAnswer
      );
      break;
      
    case 'latinName':
      question = `Jaký je latinský název svalu "${muscle.name}"?`;
      correctAnswer = muscle.latinName;
      options = generateOptions(
        allMuscles,
        muscle,
        (m) => m.latinName,
        correctAnswer
      );
      break;
  }
  
  // Zamíchat možnosti
  options = shuffleArray([...options, correctAnswer]);
  
  return {
    id: questionId,
    muscle,
    questionType,
    question,
    correctAnswer,
    options,
  };
}

/**
 * Generuje možnosti pro multiple choice
 */
function generateOptions(
  allMuscles: Muscle[],
  currentMuscle: Muscle,
  getValue: (m: Muscle) => string,
  correctAnswer: string
): string[] {
  const otherMuscles = allMuscles.filter(m => m.id !== currentMuscle.id);
  const otherValues = otherMuscles.map(getValue).filter(v => v && v !== correctAnswer);
  
  // Vybrat 3 náhodné hodnoty
  const shuffled = shuffleArray([...otherValues]);
  return shuffled.slice(0, 3);
}

/**
 * Zamíchá pole
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Generuje sadu otázek pro kvíz
 */
export function generateQuiz(
  muscles: Muscle[],
  questionsPerMuscle: number = 3
): QuizQuestion[] {
  const questions: QuizQuestion[] = [];
  
  // Rozšířené typy otázek včetně latinského názvu
  const allQuestionTypes: QuestionType[] = ['origin', 'insertion', 'function', 'latinName'];
  
  for (const muscle of muscles) {
    // Vybrat náhodné typy otázek
    const selectedTypes = shuffleArray([...allQuestionTypes]).slice(
      0,
      Math.min(questionsPerMuscle, allQuestionTypes.length)
    );
    
    for (const type of selectedTypes) {
      questions.push(generateQuestion(muscle, muscles, type));
    }
  }
  
  return shuffleArray(questions);
}

