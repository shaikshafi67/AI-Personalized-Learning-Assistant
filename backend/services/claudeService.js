const { GoogleGenerativeAI } = require('@google/generative-ai');

const API_KEY = process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim();
const DEMO_MODE = !API_KEY;

const MODEL = 'gemini-3.6-flash';

let genAI = null;
let model = null;
if (!DEMO_MODE) {
  genAI = new GoogleGenerativeAI(API_KEY);
}

const SYSTEM_PROMPT = `You are an expert academic tutor for engineering and computer science students.
Explain concepts accurately and clearly. Adapt explanations according to the student's knowledge level:
use simple language and everyday analogies for beginners, and precise technical terminology for advanced learners.
When the student asks an exam-related question, provide an exam-oriented, well-structured answer suitable for
writing in a university exam. Do not unnecessarily make answers complicated. Use clear headings, bullet points,
and Markdown formatting where helpful. Be encouraging and supportive in tone.`;

/**
 * Calls Gemini with a given user prompt. Falls back to demo content if no API key
 * is configured or if the API call fails for any reason (never throws to the caller
 * in a way that crashes the request — callers should still provide a demo fallback).
 */
async function callClaude(userPrompt, { maxTokens = 1500 } = {}) {
  if (DEMO_MODE) {
    throw new Error('DEMO_MODE_NO_KEY');
  }
  if (!model) {
    model = genAI.getGenerativeModel({
      model: MODEL,
      systemInstruction: SYSTEM_PROMPT,
      generationConfig: { maxOutputTokens: maxTokens },
    });
  }
  const result = await model.generateContent(userPrompt);
  return result.response.text();
}

module.exports = { callClaude, DEMO_MODE, SYSTEM_PROMPT, MODEL };
