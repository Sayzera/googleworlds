export enum PROJECT_ENUM {
  GEMINI_MODEL = "gemini-2.0-flash",
}

export const GEMINI_CONFIG = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};
