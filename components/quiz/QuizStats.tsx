"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Flame, Target } from "lucide-react";
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
            <Target className="h-4 w-4" />
            Přesnost
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {Math.round(stats.accuracy)}%
          </div>
          <Progress value={stats.accuracy} className="mt-2" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Skóre
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.correctAnswers} / {stats.totalQuestions}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Správných odpovědí
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

