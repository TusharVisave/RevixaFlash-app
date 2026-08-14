import { dummyFlashcards, dummyQuiz, type Difficulty, type StudyKit } from "@/data/studyKit";
import type { AiStudyKit } from "@/data/studyKitSchema";
import { generateStudyKitFn } from "@/lib/studyKit.functions";

export { countWords } from "@/data/studyKitSchema";

const DIFFICULTY_LABEL: Record<AiStudyKit["quiz"][number]["difficulty"], Difficulty> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

/** Maps the AI response shape onto the UI's existing study-kit model. */
function toStudyKit(kit: AiStudyKit): StudyKit {
  return {
    flashcards: kit.flashcards.map((card, i) => ({
      id: `fc-${card.id ?? i + 1}`,
      question: card.question,
      answer: card.answer,
    })),
    quiz: kit.quiz.map((question, i) => {
      const correctIndex = question.options.findIndex(
        (option) => option.trim().toLowerCase() === question.correctAnswer.trim().toLowerCase(),
      );
      return {
        id: `q-${question.id ?? i + 1}`,
        difficulty: DIFFICULTY_LABEL[question.difficulty],
        question: question.question,
        options: question.options,
        correctIndex: correctIndex >= 0 ? correctIndex : 0,
      };
    }),
  };
}

/** Dummy kit, kept for local development and testing without AI calls. */
export async function generateDummyStudyKit(): Promise<StudyKit> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return { flashcards: dummyFlashcards, quiz: dummyQuiz };
}

export async function generateStudyKit(notes: string): Promise<StudyKit> {
  const result = await generateStudyKitFn({ data: { notes } });
  const kit = toStudyKit(result);
  if (kit.flashcards.length === 0 || kit.quiz.length === 0) {
    throw new Error("The AI could not build a study kit from these notes. Try adding more detail.");
  }
  return kit;
}
