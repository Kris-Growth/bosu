"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QuizQuestion } from "@/lib/quiz-types";
import { CheckCircle2, XCircle, ImageIcon, Loader2, ChevronRight, AlertCircle } from "lucide-react";
import { getMuscleImageUrl, getMuscleImageAlt } from "@/lib/muscle-utils";

type AnswerStatus = 'correct' | 'partial' | 'incorrect';

interface AIQuizCardProps {
  question: QuizQuestion;
  onAnswerEvaluated: (answerStatus: AnswerStatus, feedback: string, tip?: string) => void;
  onAnswerChange?: (answer: string) => void;
  onNextQuestion?: () => void;
  isEvaluated: boolean;
  evaluationResult?: {
    answerStatus: AnswerStatus;
    isCorrect: boolean; // Pro zpětnou kompatibilitu
    feedback: string;
    tip?: string;
  };
  userAnswer?: string;
  canGoNext?: boolean;
}

export function AIQuizCard({
  question,
  onAnswerEvaluated,
  onAnswerChange,
  onNextQuestion,
  isEvaluated,
  evaluationResult,
  userAnswer: initialUserAnswer,
  canGoNext = true,
}: AIQuizCardProps) {
  const [userAnswer, setUserAnswer] = useState(initialUserAnswer || "");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const muscleImageUrl = getMuscleImageUrl(question.muscle);
  const muscleImageAlt = getMuscleImageAlt(question.muscle);

  // Resetovat error state při změně otázky
  useEffect(() => {
    setImageError(false);
    setImageLoaded(false);
    setUserAnswer(initialUserAnswer || "");
  }, [question.id, initialUserAnswer]);

  // Notifikovat rodiče o změně odpovědi
  const handleAnswerChange = (value: string) => {
    setUserAnswer(value);
    onAnswerChange?.(value);
  };

  const handleSubmit = async () => {
    if (!userAnswer.trim() || isEvaluating) return;

    setIsEvaluating(true);
    try {
      const response = await fetch("/api/evaluate-answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userAnswer: userAnswer.trim(),
          correctAnswer: question.correctAnswer,
          questionType: question.questionType,
          muscleName: question.muscle.name,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to evaluate answer");
      }

      const result = await response.json();
      const answerStatus: AnswerStatus = result.answerStatus || (result.isCorrect ? 'correct' : 'incorrect');
      onAnswerEvaluated(answerStatus, result.feedback, result.tip);
    } catch (error) {
      console.error("Error evaluating answer:", error);
      alert("Chyba při vyhodnocování odpovědi. Zkus to prosím znovu.");
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row gap-6 items-start">
      {/* Obrázek vlevo */}
      <div className="relative w-full md:w-80 h-64 md:h-80 rounded-lg overflow-hidden border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 flex-shrink-0 shadow-sm">
        {muscleImageUrl && !imageError ? (
          <>
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                <div className="animate-pulse text-gray-400 text-sm">Načítání obrázku...</div>
              </div>
            )}
            <Image
              src={muscleImageUrl}
              alt={muscleImageAlt}
              fill
              className="object-contain p-2"
              sizes="(max-width: 768px) 100vw, 320px"
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageError(true);
                setImageLoaded(false);
              }}
            />
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
            <ImageIcon className="h-12 w-12 text-gray-300 mb-2" />
            <p className="text-sm font-medium text-gray-600 mb-1">
              {question.muscle.name}
            </p>
            <p className="text-xs text-gray-400">
              {question.muscle.latinName && question.muscle.latinName !== "-"
                ? question.muscle.latinName
                : "Obrázek svalu"}
            </p>
          </div>
        )}
      </div>

      {/* Card s otázkou a textovým vstupem vpravo */}
      <Card className="flex-1 w-full">
        <CardHeader>
          <CardTitle className="text-xl">{question.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="answer" className="text-sm font-medium text-gray-700">
              Tvoje odpověď:
            </label>
            <textarea
              id="answer"
              value={userAnswer}
              onChange={(e) => handleAnswerChange(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isEvaluated || isEvaluating}
              placeholder="Napiš svou odpověď zde..."
              className="w-full min-h-[120px] p-3 border border-gray-300 rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <p className="text-xs text-gray-500">
              Stiskni Ctrl+Enter (nebo Cmd+Enter na Mac) pro odeslání
            </p>
          </div>

          {!isEvaluated && (
            <Button
              onClick={handleSubmit}
              disabled={!userAnswer.trim() || isEvaluating}
              className="w-full"
              size="lg"
            >
              {isEvaluating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Vyhodnocuji...
                </>
              ) : (
                "Odeslat odpověď"
              )}
            </Button>
          )}

          {isEvaluated && evaluationResult && (
            <div
              className={`p-4 rounded-lg border-2 ${
                evaluationResult.answerStatus === 'correct'
                  ? "bg-green-50 border-green-500"
                  : evaluationResult.answerStatus === 'partial'
                  ? "bg-orange-50 border-orange-500"
                  : "bg-red-50 border-red-500"
              }`}
            >
              <div className="flex items-start gap-3">
                {evaluationResult.answerStatus === 'correct' ? (
                  <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                ) : evaluationResult.answerStatus === 'partial' ? (
                  <AlertCircle className="h-6 w-6 text-orange-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <p
                    className={`font-semibold mb-2 ${
                      evaluationResult.answerStatus === 'correct'
                        ? "text-green-800"
                        : evaluationResult.answerStatus === 'partial'
                        ? "text-orange-800"
                        : "text-red-800"
                    }`}
                  >
                    {evaluationResult.answerStatus === 'correct'
                      ? "Správně! ✓"
                      : evaluationResult.answerStatus === 'partial'
                      ? "Jsi na dobré cestě! 🟠"
                      : "Nesprávně ✗"}
                  </p>
                  <p
                    className={`text-sm ${
                      evaluationResult.answerStatus === 'correct'
                        ? "text-green-700"
                        : evaluationResult.answerStatus === 'partial'
                        ? "text-orange-700"
                        : "text-red-700"
                    }`}
                  >
                    {evaluationResult.feedback}
                  </p>
                  {evaluationResult.answerStatus !== 'correct' && (
                    <div className="mt-3 space-y-3">
                      <div className={`pt-3 border-t ${
                        evaluationResult.answerStatus === 'partial'
                          ? "border-orange-300"
                          : "border-red-300"
                      }`}>
                        <p className={`text-sm font-medium mb-1 ${
                          evaluationResult.answerStatus === 'partial'
                            ? "text-orange-800"
                            : "text-red-800"
                        }`}>
                          Správná odpověď:
                        </p>
                        <p className={`text-sm ${
                          evaluationResult.answerStatus === 'partial'
                            ? "text-orange-700"
                            : "text-red-700"
                        }`}>
                          {question.correctAnswer}
                        </p>
                      </div>
                      {evaluationResult.tip && (
                        <div className={`pt-3 border-t rounded-md p-3 ${
                          evaluationResult.answerStatus === 'partial'
                            ? "border-orange-200 bg-orange-50/50"
                            : "border-red-200 bg-red-50/50"
                        }`}>
                          <p className={`text-sm font-medium mb-1 flex items-center gap-2 ${
                            evaluationResult.answerStatus === 'partial'
                              ? "text-orange-800"
                              : "text-red-800"
                          }`}>
                            <span className="text-lg">💡</span>
                            Tip k zapamatování:
                          </p>
                          <p className={`text-sm leading-relaxed ${
                            evaluationResult.answerStatus === 'partial'
                              ? "text-orange-700"
                              : "text-red-700"
                          }`}>
                            {evaluationResult.tip}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {isEvaluated && onNextQuestion && (
            <Button
              onClick={onNextQuestion}
              disabled={!canGoNext}
              className="w-full"
              size="lg"
              variant="default"
            >
              <span>Další otázka</span>
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

