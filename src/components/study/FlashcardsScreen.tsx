import { useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { Flashcard } from "@/data/studyKit";

interface FlashcardsScreenProps {
  cards: Flashcard[];
  onContinue: () => void;
}

export function FlashcardsScreen({ cards, onContinue }: FlashcardsScreenProps) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const card = cards[index]!;
  const progress = ((index + 1) / cards.length) * 100;

  function go(step: number) {
    setFlipped(false);
    setIndex((current) => Math.min(cards.length - 1, Math.max(0, current + step)));
  }

  return (
    <section className="animate-in fade-in duration-500">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Flashcards</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Tap a card to reveal the answer, then rate yourself honestly.
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium">
          Card {index + 1} of {cards.length}
        </span>
      </header>

      <Progress value={progress} className="mt-5 h-1.5" />

      <div className="flip-scene mt-6">
        <button
          type="button"
          onClick={() => setFlipped((value) => !value)}
          aria-label={flipped ? "Show question" : "Show answer"}
          className={`flip-inner relative block w-full min-h-64 rounded-2xl text-left outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:min-h-72 ${
            flipped ? "flip-inner-flipped" : ""
          }`}
        >
          <span className="flip-face absolute inset-0 flex flex-col justify-between rounded-2xl border border-border bg-surface p-6 sm:p-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Question
            </span>
            <span className="font-display text-xl font-semibold leading-snug sm:text-2xl">
              {card.question}
            </span>
            <span className="text-xs text-muted-foreground">Click to flip</span>
          </span>
          <span className="flip-face flip-face-back absolute inset-0 flex flex-col justify-between rounded-2xl border border-primary/40 bg-primary/10 p-6 sm:p-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Answer
            </span>
            <span className="text-base leading-relaxed sm:text-lg">{card.answer}</span>
            <span className="text-xs text-muted-foreground">Click to flip back</span>
          </span>
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button variant="secondary" onClick={() => go(-1)} disabled={index === 0}>
          <ArrowLeft aria-hidden="true" />
          Previous
        </Button>
        <Button
          variant="secondary"
          onClick={() => go(1)}
          disabled={index === cards.length - 1}
          className="flex-1 sm:flex-none"
        >
          Next
          <ArrowRight aria-hidden="true" />
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            setIndex(0);
            setFlipped(false);
          }}
        >
          <RotateCcw aria-hidden="true" />
          Restart
        </Button>
      </div>

      <Button size="lg" onClick={onContinue} className="mt-8 w-full sm:w-auto">
        <ListChecks aria-hidden="true" />
        Continue to quiz
      </Button>
    </section>
  );
}
