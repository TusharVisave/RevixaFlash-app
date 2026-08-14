import { useState } from "react";
import { Loader2, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MAX_WORDS } from "@/data/studyKit";
import { countWords } from "@/services/studyKitService";

interface NotesFormProps {
  onGenerate: (notes: string) => void;
  isLoading: boolean;
}

export function NotesForm({ onGenerate, isLoading }: NotesFormProps) {
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);

  const words = countWords(notes);
  const overLimit = words > MAX_WORDS;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!notes.trim()) {
      setError("Please paste some study notes first.");
      return;
    }
    if (overLimit) {
      setError(`Your notes exceed the ${MAX_WORDS.toLocaleString()} word limit.`);
      return;
    }
    setError(null);
    onGenerate(notes);
  }

  return (
    <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
      <h1 className="text-3xl font-bold sm:text-5xl">
        Turn your notes into
        <span className="text-primary"> knowledge you can test.</span>
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        REVIXA reads your study notes and builds an instant study kit: ten flashcards for active
        recall and a five-question quiz to check what actually stuck.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-3">
        <label htmlFor="notes" className="block text-sm font-medium">
          Your study notes
        </label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(event) => {
            setNotes(event.target.value);
            if (error) setError(null);
          }}
          placeholder="Paste lecture notes, a textbook chapter, or your own summary…"
          aria-invalid={Boolean(error) || overLimit}
          aria-describedby="notes-meta"
          className="min-h-56 resize-y bg-surface/70 text-sm leading-relaxed"
        />
        <div
          id="notes-meta"
          className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground"
        >
          <span>
            {notes.length.toLocaleString()} characters ·{" "}
            <span className={overLimit ? "text-destructive" : undefined}>
              {words.toLocaleString()} / {MAX_WORDS.toLocaleString()} words
            </span>
          </span>
          {error ? (
            <span role="alert" className="font-medium text-destructive">
              {error}
            </span>
          ) : null}
        </div>

        <Button type="submit" size="lg" disabled={isLoading} className="w-full sm:w-auto">
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" aria-hidden="true" />
              Building your study kit…
            </>
          ) : (
            <>
              <Wand2 aria-hidden="true" />
              Generate Study Kit
            </>
          )}
        </Button>
      </form>
    </section>
  );
}
