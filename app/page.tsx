import { QuizGame } from "@/components/quiz/QuizGame";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Musle Up
          </h1>
          <p className="text-muted-foreground">
            Kvízová hra pro učení svalových partií
          </p>
        </div>
        <QuizGame />
      </div>
    </main>
  );
}

