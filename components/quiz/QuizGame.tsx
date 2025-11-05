"use client";

import { useState, useEffect } from "react";
import { QuizCard } from "./QuizCard";
import { QuizStats } from "./QuizStats";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  generateQuiz,
  QuizQuestion,
  QuizState,
  QuizStats as QuizStatsType,
} from "@/lib/quiz-types";
import { musclesData } from "@/lib/muscle-data";
import { Trophy, RefreshCw } from "lucide-react";

export function QuizGame() {
  const [quizState, setQuizState] = useState<QuizState | null>(null);
  const [currentAnswer, setCurrentAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Inicializace kvízu
  useEffect(() => {
    startNewQuiz();
  }, []);

  const startNewQuiz = () => {
    const questions = generateQuiz(musclesData, 3);
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

  const handleAnswer = (answer: string) => {
    if (!quizState || showResult) return;

    setCurrentAnswer(answer);
    setShowResult(true);

    const currentQuestion =
      quizState.questions[quizState.currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;

    // Aktualizovat stav po malé pauze
    setTimeout(() => {
      if (!quizState) return;

      const newAnswers = new Map(quizState.answers);
      newAnswers.set(currentQuestion.id, answer);

      const newScore = isCorrect ? quizState.score + 1 : quizState.score;
      const newStreak = isCorrect ? quizState.streak + 1 : 0;

      const isLastQuestion =
        quizState.currentQuestionIndex === quizState.questions.length - 1;

      setQuizState({
        ...quizState,
        answers: newAnswers,
        score: newScore,
        streak: newStreak,
        currentQuestionIndex: isLastQuestion
          ? quizState.currentQuestionIndex
          : quizState.currentQuestionIndex + 1,
        isComplete: isLastQuestion,
      });

      setCurrentAnswer(null);
      setShowResult(false);
    }, 2000);
  };

  if (!quizState) {
    return <div>Načítání...</div>;
  }

  const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
  const progress =
    ((quizState.currentQuestionIndex + 1) / quizState.questions.length) * 100;

  const stats: QuizStatsType = {
    totalQuestions: quizState.questions.length,
    correctAnswers: quizState.score,
    streak: quizState.streak,
    accuracy:
      quizState.answers.size > 0
        ? (quizState.score / quizState.answers.size) * 100
        : 0,
  };

  if (quizState.isComplete) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="border-green-500">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Trophy className="h-6 w-6 text-yellow-500" />
              Kvíz dokončen!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <QuizStats stats={stats} />
            <Button onClick={startNewQuiz} className="w-full" size="lg">
              <RefreshCw className="mr-2 h-4 w-4" />
              Nový kvíz
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            Otázka {quizState.currentQuestionIndex + 1} /{" "}
            {quizState.questions.length}
          </h2>
          <span className="text-sm text-muted-foreground">
            Streak: {quizState.streak} 🔥
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <QuizStats stats={stats} />

      <QuizCard
        question={currentQuestion}
        onAnswer={handleAnswer}
        isAnswered={showResult}
        selectedAnswer={currentAnswer || undefined}
      />
    </div>
  );
}

