export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

export interface QuizQuestion {
  id: string;
  difficulty: Difficulty;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface StudyKit {
  flashcards: Flashcard[];
  quiz: QuizQuestion[];
}

export const MAX_WORDS = 3000;

export const dummyFlashcards: Flashcard[] = [
  {
    id: "fc-1",
    question: "What is spaced repetition?",
    answer:
      "A learning technique where material is reviewed at increasing intervals to exploit the psychological spacing effect and strengthen long-term recall.",
  },
  {
    id: "fc-2",
    question: "Define active recall.",
    answer:
      "Actively retrieving information from memory instead of passively re-reading it — the single most effective study strategy in memory research.",
  },
  {
    id: "fc-3",
    question: "What does the forgetting curve describe?",
    answer:
      "Ebbinghaus' finding that memory retention decays exponentially over time unless the material is reviewed.",
  },
  {
    id: "fc-4",
    question: "What is interleaving?",
    answer:
      "Mixing different topics or problem types within a study session, which improves discrimination and transfer compared to blocked practice.",
  },
  {
    id: "fc-5",
    question: "Explain the Feynman technique.",
    answer:
      "Explain a concept in simple language as if teaching a beginner, spot the gaps in your explanation, then go back to the source to fill them.",
  },
  {
    id: "fc-6",
    question: "What is cognitive load?",
    answer:
      "The amount of working memory a task demands. Splitting material into small chunks keeps load low enough for learning to happen.",
  },
  {
    id: "fc-7",
    question: "What is elaborative interrogation?",
    answer:
      "Asking 'why is this true?' about each fact, which links new material to prior knowledge and produces more durable memories.",
  },
  {
    id: "fc-8",
    question: "Why is testing better than re-reading?",
    answer:
      "Testing produces the retrieval-practice effect: the act of recall itself reconsolidates and strengthens the memory trace.",
  },
  {
    id: "fc-9",
    question: "What is a dual-coded note?",
    answer:
      "A note that pairs words with a visual representation (diagram, sketch, timeline), giving the brain two retrieval routes to the same idea.",
  },
  {
    id: "fc-10",
    question: "What is metacognition in studying?",
    answer:
      "Monitoring your own understanding — judging what you truly know versus what only feels familiar — so study time targets real weak spots.",
  },
];

export const dummyQuiz: QuizQuestion[] = [
  {
    id: "q-1",
    difficulty: "Easy",
    question: "Which study method is most strongly supported by memory research?",
    options: ["Highlighting", "Active recall", "Re-reading notes", "Listening to lectures twice"],
    correctIndex: 1,
  },
  {
    id: "q-2",
    difficulty: "Easy",
    question: "The forgetting curve shows that retention...",
    options: [
      "Stays flat over time",
      "Improves without review",
      "Decays rapidly without review",
      "Only decays after a month",
    ],
    correctIndex: 2,
  },
  {
    id: "q-3",
    difficulty: "Medium",
    question: "Interleaving differs from blocked practice because it...",
    options: [
      "Repeats one topic until mastered",
      "Mixes topics within one session",
      "Removes breaks from studying",
      "Uses only visual material",
    ],
    correctIndex: 1,
  },
  {
    id: "q-4",
    difficulty: "Medium",
    question: "Which practice best reduces cognitive load while studying?",
    options: [
      "Chunking material into small units",
      "Studying for five hours straight",
      "Reading two chapters at once",
      "Memorising without context",
    ],
    correctIndex: 0,
  },
  {
    id: "q-5",
    difficulty: "Hard",
    question: "Why does retrieval practice outperform passive review?",
    options: [
      "It takes less time overall",
      "It creates a feeling of fluency",
      "Recall reconsolidates and strengthens the memory trace",
      "It stores information in sensory memory",
    ],
    correctIndex: 2,
  },
];
