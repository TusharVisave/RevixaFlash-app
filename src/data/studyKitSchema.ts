import { z } from "zod";

/** Raw AI response schema — mirrors the required JSON contract exactly. */
export const aiFlashcardSchema = z.object({
  id: z.number(),
  question: z.string(),
  answer: z.string(),
});

export const aiQuizQuestionSchema = z.object({
  id: z.number(),
  difficulty: z.enum(["easy", "medium", "hard"]),
  question: z.string(),
  options: z.array(z.string()),
  correctAnswer: z.string(),
  explanation: z.string(),
});

export const aiStudyKitSchema = z.object({
  flashcards: z.array(aiFlashcardSchema),
  quiz: z.array(aiQuizQuestionSchema),
});

export type AiStudyKit = z.infer<typeof aiStudyKitSchema>;

export const JSON_SCHEMA_EXAMPLE = `{
  "flashcards": [
    {
      "id": 1,
      "question": "What is the powerhouse of the cell?",
      "answer": "The mitochondria, because it generates most of the cell's ATP through cellular respiration."
    }
  ],
  "quiz": [
    {
      "id": 1,
      "difficulty": "easy",
      "question": "Which organelle produces ATP?",
      "options": ["Mitochondria", "Ribosome", "Golgi apparatus", "Nucleus"],
      "correctAnswer": "Mitochondria",
      "explanation": "The mitochondria performs cellular respiration to generate ATP."
    }
  ]
}`;

export function buildStudyKitPrompt(notes: string): string {
  return `You are an expert study-material generator. Read the notes below and produce flashcards and a quiz strictly based on their content. Do not introduce facts that aren't in the notes.

NOTES:
"""
${notes}
"""

Generate exactly:
1. 10 flashcards covering the most important concepts, facts, and definitions in the notes. Vary question types (definition, "why", "how", comparison).
2. 5 multiple-choice questions with exactly 4 options each (1 correct, 3 plausible distractors drawn from related but incorrect concepts in the notes — not random nonsense).
   - 2 questions must be "easy" (direct recall/definition)
   - 2 questions must be "medium" (requires connecting two ideas)
   - 1 question must be "hard" (requires applying/inferring beyond a direct quote from the notes)

Rules:
- Base everything only on the provided notes.
- Keep flashcard answers under 40 words.
- Each MCQ option should be under 15 words.
- Do not reveal the correct answer in the question text.
- Each MCQ "correctAnswer" must exactly match one of its "options" strings.
- Return ONLY valid JSON. No markdown formatting, no code fences, no explanation text before or after the JSON.

Respond in exactly this JSON schema:
${JSON_SCHEMA_EXAMPLE}`;
}

export function countWords(text: string): number {
  const trimmed = text.trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}
