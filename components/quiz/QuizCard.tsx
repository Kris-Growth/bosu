"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QuizQuestion } from "@/lib/quiz-types";
import { CheckCircle2, XCircle } from "lucide-react";

interface QuizCardProps {
  question: QuizQuestion;
  onAnswer: (answer: string) => void;
  isAnswered: boolean;
  selectedAnswer?: string;
}

export function QuizCard({
  question,
  onAnswer,
  isAnswered,
  selectedAnswer,
}: QuizCardProps) {
  const handleAnswer = (answer: string) => {
    if (!isAnswered) {
      onAnswer(answer);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">{question.question}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = option === question.correctAnswer;
            const showResult = isAnswered;

            let buttonVariant: "default" | "outline" | "secondary" | "destructive" =
              "outline";

            if (showResult) {
              if (isCorrect) {
                buttonVariant = "default";
              } else if (isSelected && !isCorrect) {
                buttonVariant = "destructive";
              }
            } else if (isSelected) {
              buttonVariant = "secondary";
            }

            return (
              <Button
                key={index}
                variant={buttonVariant}
                className={`w-full justify-start text-left h-auto py-4 px-4 ${
                  showResult && isCorrect
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : ""
                } ${
                  showResult && isSelected && !isCorrect
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : ""
                }`}
                onClick={() => handleAnswer(option)}
                disabled={isAnswered}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="flex-1">{option}</span>
                  {showResult && isCorrect && (
                    <CheckCircle2 className="ml-2 h-5 w-5" />
                  )}
                  {showResult && isSelected && !isCorrect && (
                    <XCircle className="ml-2 h-5 w-5" />
                  )}
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

