import { RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResultsScreenProps {
  correct: number;
  total: number;
  onRetry: () => void;
  onNewKit: () => void;
}

function performanceMessage(percentage: number) {
  if (percentage === 100) return "Flawless run — this material is locked in.";
  if (percentage >= 80) return "Strong result. A quick review of the misses and you're set.";
  if (percentage >= 60) return "Solid base. Re-run the flashcards on the weaker topics.";
  if (percentage >= 40) return "Getting there — another pass through the flashcards will help.";
  return "Worth a full review. Start with the flashcards and try again.";
}

export function ResultsScreen({ correct, total, onRetry, onNewKit }: ResultsScreenProps) {
  const percentage = Math.round((correct / total) * 100);

  return (
    <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <h1 className="text-2xl font-bold sm:text-3xl">Your results</h1>
      <p className="mt-1 text-sm text-muted-foreground">{performanceMessage(percentage)}</p>

      <div className="mt-6 rounded-2xl border border-border bg-surface p-8 text-center">
        <p className="font-display text-6xl font-bold text-primary">{percentage}%</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Score: {correct} / {total}
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-success/40 bg-success/10 p-5">
          <p className="text-2xl font-semibold text-success">{correct}</p>
          <p className="mt-1 text-xs text-muted-foreground">Correct answers</p>
        </div>
        <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-5">
          <p className="text-2xl font-semibold text-destructive">{total - correct}</p>
          <p className="mt-1 text-xs text-muted-foreground">Incorrect answers</p>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button size="lg" onClick={onRetry}>
          <RotateCcw aria-hidden="true" />
          Retry quiz
        </Button>
        <Button size="lg" variant="secondary" onClick={onNewKit}>
          <Sparkles aria-hidden="true" />
          Generate new study kit
        </Button>
      </div>
    </section>
  );
}
