import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/study/AppShell";
import { NotesForm } from "@/components/study/NotesForm";
import { FlashcardsScreen } from "@/components/study/FlashcardsScreen";
import { QuizScreen } from "@/components/study/QuizScreen";
import { ResultsScreen } from "@/components/study/ResultsScreen";
import type { StudyKit } from "@/data/studyKit";
import { generateStudyKit } from "@/services/studyKitService";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "REVIXA — Turn your notes into knowledge you can test" },
      {
        name: "description",
        content:
          "REVIXA turns your study notes into flashcards and a multiple-choice quiz so you can test what you actually remember.",
      },
      { property: "og:title", content: "REVIXA — Study kits from your notes" },
      {
        property: "og:description",
        content: "Paste your notes and get instant flashcards and a quiz to test your recall.",
      },
    ],
  }),
  component: Index,
});

type Step = "landing" | "flashcards" | "quiz" | "results";

function Index() {
  const [step, setStep] = useState<Step>("landing");
  const [isLoading, setIsLoading] = useState(false);
  const [kit, setKit] = useState<StudyKit | null>(null);
  const [score, setScore] = useState(0);
  const [attempt, setAttempt] = useState(0);

  async function handleGenerate(notes: string) {
    setIsLoading(true);
    try {
      const result = await generateStudyKit(notes);
      setKit(result);
      setStep("flashcards");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AppShell>
      {step === "landing" || !kit ? (
        <NotesForm onGenerate={handleGenerate} isLoading={isLoading} />
      ) : step === "flashcards" ? (
        <FlashcardsScreen cards={kit.flashcards} onContinue={() => setStep("quiz")} />
      ) : step === "quiz" ? (
        <QuizScreen
          key={attempt}
          questions={kit.quiz}
          onFinish={(correct) => {
            setScore(correct);
            setStep("results");
          }}
        />
      ) : (
        <ResultsScreen
          correct={score}
          total={kit.quiz.length}
          onRetry={() => {
            setAttempt((n) => n + 1);
            setStep("quiz");
          }}
          onNewKit={() => {
            setKit(null);
            setScore(0);
            setStep("landing");
          }}
        />
      )}
    </AppShell>
  );
}
