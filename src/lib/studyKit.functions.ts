import { createServerFn } from "@tanstack/react-start";
import { streamText, Output, NoObjectGeneratedError } from "ai";
import { z } from "zod";
import { MAX_WORDS } from "@/data/studyKit";
import { aiStudyKitSchema, buildStudyKitPrompt, countWords } from "@/data/studyKitSchema";
import type { AiStudyKit } from "@/data/studyKitSchema";

export const generateStudyKitFn = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => {
    const { notes } = z.object({ notes: z.string() }).parse(input);
    if (!notes.trim()) throw new Error("Please paste some study notes first.");
    if (countWords(notes) > MAX_WORDS) {
      throw new Error(`Your notes exceed the ${MAX_WORDS} word limit.`);
    }
    return { notes };
  })
  .handler(async ({ data }): Promise<AiStudyKit> => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) throw new Error("AI is not configured. Missing API key.");

    const { createLovableAiGatewayProvider } = await import("@/lib/ai-gateway.server");
    const gateway = createLovableAiGatewayProvider(apiKey);

    try {
      const result = streamText({
        model: gateway("google/gemini-3.6-flash"),
        output: Output.object({ schema: aiStudyKitSchema }),
        prompt: buildStudyKitPrompt(data.notes),
      });

      const output = await result.output;
      const parsed = aiStudyKitSchema.safeParse(output);
      if (!parsed.success) {
        throw new Error("The AI returned an unexpected response. Please try again.");
      }
      return parsed.data;
    } catch (error) {
      if (NoObjectGeneratedError.isInstance(error)) {
        throw new Error("The AI response was malformed. Please try again.");
      }
      const message = error instanceof Error ? error.message : "";
      if (message.includes("429")) {
        throw new Error("AI rate limit reached. Please wait a moment and try again.");
      }
      if (message.includes("402")) {
        throw new Error("AI credits exhausted. Please add credits to continue.");
      }
      console.error("generateStudyKitFn failed", error);
      throw new Error("Failed to generate your study kit. Please try again.");
    }
  });
