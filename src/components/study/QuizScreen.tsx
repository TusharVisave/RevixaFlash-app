import { useState } from "react";
import { ArrowRight, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { Difficulty, QuizQuestion } from "@/data/studyKit";

interface QuizScreenProps {
  questions: QuizQuestion[];
  onFinish: (correctCount: number) => void;
}

const difficultyStyles: Record<Difficulty, string> = {
  Easy: "border-success/40 bg-success/10 text-success",
  Medium: "border-warning/40 bg-warning/10 text-warning",
  Hard: "border-destructive/40 bg-destructive/10 text-destructive",
};

export function QuizScreen({ questions, onFinish }: QuizScreenProps) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  const question = questions[index];
  const isLast = index === questions.length - 1;
  const answered = selected !== null;
  const isCorrect = selected === question.correctIndex;

  function select(optionIndex: number) {
    if (answered) return;
    setSelected(optionIndex);
    if (optionIndex === question.correctIndex) setCorrectCount((count) => count + 1);
  }

  function next() {
    if (isLast) {
      onFinish(correctCount);
      return;
    }
    setSelected(null);
    setIndex((current) => current + 1);
  }

  return (
    <section className="animate-in fade-in duration-500">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Quiz</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            One attempt per question — choose carefully.
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium">
          Question {index + 1} of {questions.length}
        </span>
      </header>

      <Progress value={((index + 1) / questions.length) * 100} className="mt-5 h-1.5" />

      <div className="mt-6 rounded-2xl border border-border bg-surface p-6 sm:p-8">
        <span
          className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold ${difficultyStyles[question.difficulty]}`}
        >
          {question.difficulty}
        </span>
        <h2 className="mt-4 font-display text-xl font-semibold leading-snug sm:text-2xl">
          {question.question}
        </h2>

        <div className="mt-6 space-y-3">
          {question.options.map((option, optionIndex) => {
            const isAnswer = optionIndex === question.correctIndex;
            const isPicked = optionIndex === selected;
            let state = "border-border bg-background hover:border-primary/50";
            if (answered && isAnswer) state = "border-success/60 bg-success/10";
            else if (answered && isPicked) state = "border-destructive/60 bg-destructive/10";
            else if (answered) state = "border-border bg-background opacity-60";

            return (
              <button
                key={option}
                type="button"
                onClick={() => select(optionIndex)}
                disabled={answered}
                aria-pressed={isPicked}
                className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-default ${state}`}
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-md border border-border text-xs font-semibold">
                  {String.fromCharCode(65 + optionIndex)}
                </span>
                <span className="flex-1">{option}</span>
                {answered && isAnswer ? (
                  <Check className="size-4 text-success" aria-hidden="true" />
                ) : null}
                {answered && isPicked && !isAnswer ? (
                  <X className="size-4 text-destructive" aria-hidden="true" />
                ) : null}
              </button>
            );
          })}
        </div>

        {answered ? (
          <p
            role="status"
            className={`mt-5 text-sm font-medium ${isCorrect ? "text-success" : "text-destructive"}`}
          >
            {isCorrect
              ? "Correct — nicely recalled."
              : `Not quite. The correct answer is ${String.fromCharCode(65 + question.correctIndex)}: ${question.options[question.correctIndex]}`}
          </p>
        ) : null}
      </div>

      <Button size="lg" onClick={next} disabled={!answered} className="mt-6 w-full sm:w-auto">
        {isLast ? "See results" : "Next question"}
        <ArrowRight aria-hidden="true" />
      </Button>
    </section>
  );
}
