"use client";

import { useState, useEffect, useRef } from "react";
import { QuizCard } from "./QuizCard";
import { QuizSettingsPanel } from "./QuizSettings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  generateQuiz,
  QuizQuestion,
  QuizState,
  QuizStats as QuizStatsType,
  QuizSettings,
} from "@/lib/quiz-types";
import { musclesData } from "@/lib/muscle-data";
import { loadSettings } from "@/lib/quiz-settings";
import { Trophy, RefreshCw, ChevronLeft, ChevronRight, CheckCircle2, XCircle, HelpCircle, Flame } from "lucide-react";

interface QuizGameProps {
  externalShowSettings?: boolean;
  onExternalSettingsClose?: () => void;
}

export function QuizGame({ externalShowSettings, onExternalSettingsClose }: QuizGameProps = {}) {
  const [quizState, setQuizState] = useState<QuizState | null>(null);
  const [currentAnswer, setCurrentAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<QuizSettings>(() => loadSettings());
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Synchronizace s externím stavem nastavení
  useEffect(() => {
    if (externalShowSettings !== undefined) {
      setShowSettings(externalShowSettings);
    }
  }, [externalShowSettings]);

  // Inicializace kvízu
  useEffect(() => {
    startNewQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.enabledTypes, settings.questionsPerMuscle]);

  // Cleanup timeout při unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const startNewQuiz = () => {
    const questions = generateQuiz(
      musclesData, 
      settings.questionsPerMuscle,
      settings.enabledTypes
    );
    setQuizState({
      currentQuestionIndex: 0,
      questions,
      answers: new Map(),
      score: 0,
      streak: 0,
      isComplete: false,
    });
    setCurrentAnswer(null);
    setShowResult(false);
  };

  const handleSettingsChange = (newSettings: QuizSettings) => {
    setSettings(newSettings);
  };

  const handleAnswer = (answer: string) => {
    if (!quizState) return;
    
    const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
    
    // Pokud je stejná odpověď jako uložená, nic nedělej
    const savedAnswer = quizState.answers.get(currentQuestion.id);
    if (savedAnswer === answer) return;
    
    const wasAlreadyAnswered = quizState.answers.has(currentQuestion.id);
    const previousAnswer = quizState.answers.get(currentQuestion.id);
    const wasCorrect = previousAnswer === currentQuestion.correctAnswer;

    setCurrentAnswer(answer);
    setShowResult(true);

    const isCorrect = answer === currentQuestion.correctAnswer;
    const newAnswers = new Map(quizState.answers);
    newAnswers.set(currentQuestion.id, answer);

    // Pokud už byla otázka zodpovězená, musíme upravit score
    let newScore = quizState.score;
    if (wasAlreadyAnswered) {
      // Odstranit předchozí odpověď z score
      if (wasCorrect) {
        newScore = Math.max(0, newScore - 1);
      }
      // Přidat novou odpověď do score
      if (isCorrect) {
        newScore = newScore + 1;
      }
    } else {
      // Nová odpověď
      newScore = isCorrect ? quizState.score + 1 : quizState.score;
    }

    // Streak se počítá jen při nových odpovědích
    const newStreak = wasAlreadyAnswered 
      ? quizState.streak 
      : (isCorrect ? quizState.streak + 1 : 0);

    setQuizState({
      ...quizState,
      answers: newAnswers,
      score: newScore,
      streak: newStreak,
    });

    // Zrušit předchozí timeout, pokud existuje
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Po 5 sekundách automaticky přejít na další otázku
    timeoutRef.current = setTimeout(() => {
      setQuizState((currentState) => {
        if (!currentState) return null;
        const isLastQuestion = currentState.currentQuestionIndex === currentState.questions.length - 1;
        
        if (!isLastQuestion) {
          const nextIndex = currentState.currentQuestionIndex + 1;
          const nextQuestion = currentState.questions[nextIndex];
          const nextAnswer = currentState.answers.get(nextQuestion.id);
          
          // Zrušit timeout před přechodem
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
          
          setCurrentAnswer(nextAnswer || null);
          setShowResult(nextAnswer !== undefined);
          
          return {
            ...currentState,
            currentQuestionIndex: nextIndex,
            isComplete: nextIndex === currentState.questions.length - 1 && nextAnswer !== undefined,
          };
        }
        return currentState;
      });
    }, 5000);
  };

  const goToPrevious = () => {
    if (!quizState || quizState.currentQuestionIndex === 0) return;
    
    // Zrušit timeout při ruční navigaci
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    const prevIndex = quizState.currentQuestionIndex - 1;
    const prevQuestion = quizState.questions[prevIndex];
    const prevAnswer = quizState.answers.get(prevQuestion.id);
    
    setQuizState({
      ...quizState,
      currentQuestionIndex: prevIndex,
    });
    
    setCurrentAnswer(prevAnswer || null);
    setShowResult(prevAnswer !== undefined);
  };

  const goToNext = () => {
    if (!quizState) return;
    
    // Zrušit timeout při ruční navigaci
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    const nextIndex = quizState.currentQuestionIndex + 1;
    if (nextIndex >= quizState.questions.length) return;
    
    const nextQuestion = quizState.questions[nextIndex];
    const nextAnswer = quizState.answers.get(nextQuestion.id);
    
    setQuizState({
      ...quizState,
      currentQuestionIndex: nextIndex,
      isComplete: nextIndex === quizState.questions.length - 1 && nextAnswer !== undefined,
    });
    
    setCurrentAnswer(nextAnswer || null);
    setShowResult(nextAnswer !== undefined);
  };

  if (!quizState) {
    return <div>Načítání...</div>;
  }

  const currentQuestion = quizState.questions[quizState.currentQuestionIndex];

  const totalAnswered = quizState.answers.size;
  const stats: QuizStatsType = {
    totalQuestions: quizState.questions.length,
    correctAnswers: quizState.score,
    wrongAnswers: totalAnswered - quizState.score,
    currentQuestionIndex: quizState.currentQuestionIndex,
    streak: quizState.streak,
    accuracy:
      totalAnswered > 0
        ? (quizState.score / totalAnswered) * 100
        : 0,
  };

  if (quizState.isComplete) {
    return (
      <div className="w-full space-y-6">
        <Card className="border-green-500">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Trophy className="h-6 w-6 text-yellow-500" />
              Kvíz dokončen!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-6 py-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span className="text-lg font-semibold text-green-600">
                    {stats.correctAnswers}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-600" />
                  <span className="text-lg font-semibold text-red-600">
                    {stats.wrongAnswers}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="h-5 w-5 text-orange-500" />
                  <span className="text-lg font-semibold text-orange-500">
                    {stats.streak}
                  </span>
                </div>
              </div>
              <Button onClick={startNewQuiz} className="w-full" size="lg">
                <RefreshCw className="mr-2 h-4 w-4" />
                Nový kvíz
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isAnswered = quizState.answers.has(currentQuestion.id);
  const savedAnswer = quizState.answers.get(currentQuestion.id);

  return (
    <div className="w-full space-y-6">
      {showSettings && (
        <QuizSettingsPanel
          onSettingsChange={handleSettingsChange}
          onClose={() => {
            setShowSettings(false);
            onExternalSettingsClose?.();
          }}
        />
      )}

      <QuizCard
        question={currentQuestion}
        onAnswer={handleAnswer}
        isAnswered={isAnswered || showResult}
        selectedAnswer={savedAnswer || currentAnswer || undefined}
      />

      {/* Navigační lišta s kompaktními statistikami */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4 bg-white/32 rounded-lg border shadow-sm p-4">
        <Button
          onClick={goToPrevious}
          disabled={quizState.currentQuestionIndex === 0}
          variant="outline"
          className="flex items-center gap-2 w-full md:w-auto"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Předchozí</span>
        </Button>
        
        <div className="flex items-center gap-3 md:gap-6 flex-wrap justify-center">
          {/* Správné odpovědi */}
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <span className="text-sm font-semibold text-green-600">
              {stats.correctAnswers}
            </span>
          </div>

          {/* Špatné odpovědi */}
          <div className="flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-600" />
            <span className="text-sm font-semibold text-red-600">
              {stats.wrongAnswers}
            </span>
          </div>

          {/* Počet otázek */}
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-gray-600" />
            <span className="text-sm font-semibold text-gray-700">
              {quizState.currentQuestionIndex + 1} / {quizState.questions.length}
            </span>
          </div>

          {/* Streak */}
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            <span className="text-sm font-semibold text-orange-500">
              {stats.streak}
            </span>
          </div>
        </div>

        <Button
          onClick={goToNext}
          disabled={quizState.currentQuestionIndex === quizState.questions.length - 1}
          variant="outline"
          className="flex items-center gap-2 w-full md:w-auto"
        >
          <span className="hidden sm:inline">Další</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

