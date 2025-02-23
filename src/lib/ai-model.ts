import {
  GoogleGenerativeAI,
} from "@google/generative-ai";
import { GEMINI_CONFIG, PROJECT_ENUM } from "./enum";


if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is required");
}

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: PROJECT_ENUM.GEMINI_MODEL,
});

const generationConfig = GEMINI_CONFIG

export const AiChatSession = model.startChat({
  generationConfig,
  history: [],
});
