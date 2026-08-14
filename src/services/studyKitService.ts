import { dummyFlashcards, dummyQuiz, type StudyKit } from "@/data/studyKit";

/**
 * Service layer for study kit generation.
 *
 * Currently returns dummy data after a simulated delay. When a real AI API is
 * wired up, replace only the body of `generateStudyKit` (e.g. call a server
 * function) — the UI contract stays identical.
 */
export async function generateStudyKit(notes: string): Promise<StudyKit> {
  await new Promise((resolve) => setTimeout(resolve, 1600));

  if (!notes.trim()) {
    throw new Error("Notes are required to generate a study kit.");
  }

  return {
    flashcards: dummyFlashcards,
    quiz: dummyQuiz,
  };
}

export function countWords(text: string): number {
  const trimmed = text.trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}
