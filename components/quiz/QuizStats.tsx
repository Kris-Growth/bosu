"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, HelpCircle, CheckCircle2, XCircle } from "lucide-react";
import { QuizStats as QuizStatsType } from "@/lib/quiz-types";

interface QuizStatsProps {
  stats: QuizStatsType;
}

export function QuizStats({ stats }: QuizStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <XCircle className="h-4 w-4 text-red-600" />
            Dobře / špatně
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <span className="text-green-600">{stats.correctAnswers}</span>
            {" / "}
            <span className="text-red-600">{stats.wrongAnswers}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Zodpovězené
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            Otázky
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.currentQuestionIndex + 1} / {stats.totalQuestions}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            otázek
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Flame className="h-4 w-4" />
            Streak
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.streak}</div>
          <p className="text-xs text-muted-foreground mt-1">
            Po sobě jdoucích správných
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

