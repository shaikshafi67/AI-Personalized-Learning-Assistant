// Per-feature prompt templates that inject subject/level/style/topic/marks

function askPrompt({ question, subject, level, style }) {
  return `A student studying "${subject || 'General'}" at "${level || 'Intermediate'}" level has asked the following question.
Respond in the "${style || 'Detailed'}" style.

Question: ${question}

Structure your answer with clear Markdown headings where relevant (Definition, Explanation, Example, Real-world analogy, Exam points) but only include sections that make sense for this specific question. Keep it focused and well organized.`;
}

function explainPrompt({ topic, subject, level }) {
  return `Explain the topic "${topic}" from the subject "${subject || 'General'}" to a "${level || 'Intermediate'}" level student.

Structure the response in Markdown with these sections where applicable:
## Introduction / Definition
## Working / How it functions
## Types (if applicable)
## Example
## Diagram Explanation (describe the diagram in words since this is text-only)
## Advantages and Disadvantages
## Exam Answer Points (bullet list of what to write in an exam for full marks)`;
}

function summarizePrompt({ text }) {
  return `Summarize the following study material for exam preparation. Produce Markdown output with these sections:
**Short summary** (2-3 sentences)
**Key points** (bullet list)
**Important definitions** (bullet list of term: definition)
**Important formulas** (if any, else state "None")
**Exam points** (bullet list of the most likely exam-relevant facts)

Study material:
"""
${text}
"""`;
}

function quizPrompt({ subject, topic, difficulty, count }) {
  return `Generate ${count} multiple-choice questions (MCQs) for the subject "${subject}"${topic ? `, topic "${topic}"` : ''}, difficulty "${difficulty}".

Return ONLY valid JSON (no markdown fences, no extra text) as an array of objects with this exact shape:
[{"question": "...", "options": ["...","...","...","..."], "correctAnswer": "... (must exactly match one of the options)", "explanation": "..."}]`;
}

function studyPlanPrompt({ subject, topics, hoursPerDay, days, examDate, level }) {
  return `Create a day-by-day study plan.
Subject: ${subject}
Topics to cover: ${Array.isArray(topics) ? topics.join(', ') : topics}
Available study hours per day: ${hoursPerDay}
Number of days: ${days}
Exam date: ${examDate || 'Not specified'}
Current knowledge level: ${level}

Return ONLY valid JSON (no markdown fences) with this exact shape:
{"summary": "one sentence overview", "plan": [{"day": 1, "subject": "...", "topic": "...", "hours": 2, "focus": "what to specifically do that day"}]}`;
}

function flashcardsPrompt({ subject, topic, count }) {
  return `Generate ${count} flashcards for the subject "${subject}"${topic ? `, topic "${topic}"` : ''}.
Return ONLY valid JSON (no markdown fences) as an array: [{"question": "front of card", "answer": "back of card, concise"}]`;
}

function examAnswerPrompt({ question, marks }) {
  return `Write a model exam answer for the following question, scaled appropriately for ${marks} marks.
For low marks (2-4): be concise — definition + 1-2 key points or a short example.
For higher marks (6-10): include Definition, Explanation, Working, Example, a brief Diagram note (described in words), and a Conclusion.

Question: ${question}

Format the answer in clean Markdown suitable for writing in an exam booklet.`;
}

module.exports = {
  askPrompt,
  explainPrompt,
  summarizePrompt,
  quizPrompt,
  studyPlanPrompt,
  flashcardsPrompt,
  examAnswerPrompt,
};
