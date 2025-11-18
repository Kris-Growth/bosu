"use client";

import { useState, useEffect } from "react";
import { AIQuizCard } from "./AIQuizCard";
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
import {
  Trophy,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Flame,
} from "lucide-react";

interface AIQuizGameProps {
  externalShowSettings?: boolean;
  onExternalSettingsClose?: () => void;
}

type AnswerStatus = 'correct' | 'partial' | 'incorrect';

interface AnswerEvaluation {
  answer: string;
  answerStatus: AnswerStatus;
  isCorrect: boolean; // Pro zpětnou kompatibilitu
  feedback: string;
  tip?: string;
}

export function AIQuizGame({
  externalShowSettings,
  onExternalSettingsClose,
}: AIQuizGameProps = {}) {
  const [quizState, setQuizState] = useState<QuizState | null>(null);
  const [userAnswers, setUserAnswers] = useState<Map<string, string>>(new Map());
  const [evaluations, setEvaluations] = useState<Map<string, AnswerEvaluation>>(
    new Map()
  );
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<QuizSettings>(() => loadSettings());

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
    setUserAnswers(new Map());
    setEvaluations(new Map());
  };

  const handleSettingsChange = (newSettings: QuizSettings) => {
    setSettings(newSettings);
  };

  const handleAnswerChange = (answer: string) => {
    if (!quizState) return;
    const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
    const newAnswers = new Map(userAnswers);
    newAnswers.set(currentQuestion.id, answer);
    setUserAnswers(newAnswers);
  };

  const handleAnswerEvaluated = (answerStatus: AnswerStatus, feedback: string, tip?: string) => {
    if (!quizState) return;

    const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
    const userAnswer = userAnswers.get(currentQuestion.id) || "";

    const isCorrect = answerStatus === 'correct';
    const isPartial = answerStatus === 'partial';

    // Uložit vyhodnocení
    const newEvaluations = new Map(evaluations);
    newEvaluations.set(currentQuestion.id, {
      answer: userAnswer,
      answerStatus,
      isCorrect, // Pro zpětnou kompatibilitu
      feedback,
      tip,
    });
    setEvaluations(newEvaluations);

    // Aktualizovat score
    const wasAlreadyEvaluated = evaluations.has(currentQuestion.id);
    const previousEvaluation = evaluations.get(currentQuestion.id);
    const previousStatus = previousEvaluation?.answerStatus || 'incorrect';
    const wasCorrect = previousStatus === 'correct';
    const wasPartial = previousStatus === 'partial';

    let newScore = quizState.score;
    if (wasAlreadyEvaluated) {
      // Odstranit předchozí odpověď z score
      if (wasCorrect) {
        newScore = Math.max(0, newScore - 1);
      } else if (wasPartial) {
        newScore = Math.max(0, newScore - 0.5);
      }
      // Přidat novou odpověď do score
      if (isCorrect) {
        newScore = newScore + 1;
      } else if (isPartial) {
        newScore = newScore + 0.5;
      }
    } else {
      // Nová odpověď
      if (isCorrect) {
        newScore = quizState.score + 1;
      } else if (isPartial) {
        newScore = quizState.score + 0.5;
      }
    }

    // Streak se počítá jen při nových odpovědích
    // Částečně správné odpovědi neukončí streak, ale ani ho nezvyšují
    const newStreak = wasAlreadyEvaluated
      ? quizState.streak
      : isCorrect
      ? quizState.streak + 1
      : isPartial
      ? quizState.streak // Zachová streak
      : 0;

    // Aktualizovat answers map pro kompatibilitu
    const newAnswers = new Map(quizState.answers);
    newAnswers.set(currentQuestion.id, answerStatus);

    setQuizState({
      ...quizState,
      answers: newAnswers,
      score: newScore,
      streak: newStreak,
    });
  };

  const goToPrevious = () => {
    if (!quizState || quizState.currentQuestionIndex === 0) return;

    const prevIndex = quizState.currentQuestionIndex - 1;
    setQuizState({
      ...quizState,
      currentQuestionIndex: prevIndex,
    });
  };

  const goToNext = () => {
    if (!quizState) return;

    const nextIndex = quizState.currentQuestionIndex + 1;
    if (nextIndex >= quizState.questions.length) return;

    setQuizState({
      ...quizState,
      currentQuestionIndex: nextIndex,
    });
  };


  if (!quizState) {
    return <div>Načítání...</div>;
  }

  const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
  const currentUserAnswer = userAnswers.get(currentQuestion.id);
  const currentEvaluation = evaluations.get(currentQuestion.id);
  const isEvaluated = evaluations.has(currentQuestion.id);

  const totalAnswered = evaluations.size;
  // Počítat správné a částečně správné odpovědi
  const correctCount = Array.from(evaluations.values()).filter(
    (e) => e.answerStatus === 'correct'
  ).length;
  const partialCount = Array.from(evaluations.values()).filter(
    (e) => e.answerStatus === 'partial'
  ).length;
  const wrongCount = Array.from(evaluations.values()).filter(
    (e) => e.answerStatus === 'incorrect'
  ).length;

  const stats: QuizStatsType = {
    totalQuestions: quizState.questions.length,
    correctAnswers: Math.round(quizState.score), // Zaokrouhlit pro zobrazení
    wrongAnswers: wrongCount,
    currentQuestionIndex: quizState.currentQuestionIndex,
    streak: quizState.streak,
    accuracy:
      totalAnswered > 0 ? (quizState.score / totalAnswered) * 100 : 0,
  };

  // Zkontrolovat, zda je kvíz dokončen (všechny otázky zodpovězeny)
  const allQuestionsAnswered = quizState.questions.every((q) =>
    evaluations.has(q.id)
  );

  if (allQuestionsAnswered) {
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

      <AIQuizCard
        question={currentQuestion}
        onAnswerEvaluated={handleAnswerEvaluated}
        onAnswerChange={handleAnswerChange}
        onNextQuestion={goToNext}
        isEvaluated={isEvaluated}
        evaluationResult={currentEvaluation}
        userAnswer={currentUserAnswer}
        canGoNext={quizState.currentQuestionIndex < quizState.questions.length - 1}
      />

      {/* Navigační lišta s kompaktními statistikami */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-4 bg-white/32 rounded-lg border shadow-sm p-4">
        {/* Tlačítka navigace */}
        <div className="flex items-center gap-2 w-full md:w-auto md:flex-none">
          <Button
            onClick={goToPrevious}
            disabled={quizState.currentQuestionIndex === 0}
            variant="outline"
            className="flex items-center gap-2 flex-1 md:flex-none"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Předchozí</span>
          </Button>

          <Button
            onClick={goToNext}
            disabled={quizState.currentQuestionIndex === quizState.questions.length - 1}
            variant="outline"
            className="flex items-center gap-2 flex-1 md:flex-none"
          >
            <span>Další</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Statistiky */}
        <div className="flex items-center gap-3 md:gap-6 flex-wrap justify-center">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <span className="text-sm font-semibold text-green-600">
              {stats.correctAnswers}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-600" />
            <span className="text-sm font-semibold text-red-600">
              {stats.wrongAnswers}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-gray-600" />
            <span className="text-sm font-semibold text-gray-700">
              {quizState.currentQuestionIndex + 1} / {quizState.questions.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            <span className="text-sm font-semibold text-orange-500">
              {stats.streak}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

