"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QuizQuestion } from "@/lib/quiz-types";
import { CheckCircle2, XCircle, ImageIcon } from "lucide-react";
import { getMuscleImageUrl, getMuscleImageAlt } from "@/lib/muscle-utils";

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
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAnswer = (answer: string) => {
    if (!isAnswered) {
      onAnswer(answer);
    }
  };

  const muscleImageUrl = getMuscleImageUrl(question.muscle);
  const muscleImageAlt = getMuscleImageAlt(question.muscle);
  
  // Resetovat error state při změně otázky
  useEffect(() => {
    setImageError(false);
    setImageLoaded(false);
  }, [question.id]);

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
          // Placeholder když obrázek neexistuje
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
            <ImageIcon className="h-12 w-12 text-gray-300 mb-2" />
            <p className="text-sm font-medium text-gray-600 mb-1">
              {question.muscle.name}
            </p>
            <p className="text-xs text-gray-400">
              {question.muscle.latinName && question.muscle.latinName !== '-' 
                ? question.muscle.latinName 
                : 'Obrázek svalu'}
            </p>
          </div>
        )}
      </div>

      {/* Card s otázkou a odpověďmi vpravo */}
      <Card className="flex-1 w-full">
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
                className={`w-full justify-start text-left h-auto py-4 px-4 break-words overflow-hidden ${
                  showResult && isCorrect
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : ""
                } ${
                  showResult && isSelected && !isCorrect
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : ""
                }`}
                onClick={() => handleAnswer(option)}
              >
                <div className="flex items-center justify-between w-full gap-2 min-w-0">
                  <span className="flex-1 break-words whitespace-normal text-left">{option}</span>
                  <div className="flex-shrink-0">
                    {showResult && isCorrect && (
                      <CheckCircle2 className="ml-2 h-5 w-5 flex-shrink-0" />
                    )}
                    {showResult && isSelected && !isCorrect && (
                      <XCircle className="ml-2 h-5 w-5 flex-shrink-0" />
                    )}
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
    </div>
  );
}

