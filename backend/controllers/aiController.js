const { callClaude, DEMO_MODE } = require('../services/claudeService');
const demo = require('../services/demoContent');
const prompts = require('../services/promptTemplates');
const ChatHistory = require('../models/ChatHistory');
const mongoose = require('mongoose');

function dbReady() {
  return mongoose.connection && mongoose.connection.readyState === 1;
}

function tryParseJson(raw) {
  if (!raw) return null;
  let cleaned = raw.trim();
  // strip markdown code fences if present
  cleaned = cleaned.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '');
  try {
    return JSON.parse(cleaned);
  } catch (e) {
    const match = cleaned.match(/\[[\s\S]*\]|\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch (e2) {
        return null;
      }
    }
    return null;
  }
}

async function ask(req, res, next) {
  try {
    const { question, subject, level, style } = req.body;
    let answer;
    let usedDemo = DEMO_MODE;
    if (!DEMO_MODE) {
      try {
        answer = await callClaude(prompts.askPrompt({ question, subject, level, style }));
      } catch (err) {
        console.warn('[aiController.ask] Falling back to demo content:', err.message);
        usedDemo = true;
      }
    }
    if (usedDemo) {
      answer = demo.demoAsk(question, subject, level, style);
    }

    if (dbReady()) {
      ChatHistory.create({ userQuestion: question, aiResponse: answer, subject, topic: '' }).catch(() => {});
    }

    res.json({ success: true, demoMode: usedDemo, answer });
  } catch (err) {
    next(err);
  }
}

async function explain(req, res, next) {
  try {
    const { topic, subject, level } = req.body;
    let answer;
    let usedDemo = DEMO_MODE;
    if (!DEMO_MODE) {
      try {
        answer = await callClaude(prompts.explainPrompt({ topic, subject, level }));
      } catch (err) {
        console.warn('[aiController.explain] Falling back to demo content:', err.message);
        usedDemo = true;
      }
    }
    if (usedDemo) {
      answer = demo.demoExplain(topic, subject, level);
    }

    if (dbReady()) {
      ChatHistory.create({ userQuestion: `Explain: ${topic}`, aiResponse: answer, subject, topic }).catch(() => {});
    }

    res.json({ success: true, demoMode: usedDemo, answer });
  } catch (err) {
    next(err);
  }
}

async function summarize(req, res, next) {
  try {
    const { text } = req.body;
    let answer;
    let usedDemo = DEMO_MODE;
    if (!DEMO_MODE) {
      try {
        answer = await callClaude(prompts.summarizePrompt({ text }), { maxTokens: 1200 });
      } catch (err) {
        console.warn('[aiController.summarize] Falling back to demo content:', err.message);
        usedDemo = true;
      }
    }
    if (usedDemo) {
      answer = demo.demoSummarize(text);
    }
    res.json({ success: true, demoMode: usedDemo, answer });
  } catch (err) {
    next(err);
  }
}

async function quiz(req, res, next) {
  try {
    const { subject, topic, difficulty, count } = req.body;
    const numCount = Math.min(Math.max(parseInt(count, 10) || 5, 1), 20);
    let questions;
    let usedDemo = DEMO_MODE;
    if (!DEMO_MODE) {
      try {
        const raw = await callClaude(prompts.quizPrompt({ subject, topic, difficulty, count: numCount }), {
          maxTokens: 2000,
        });
        const parsed = tryParseJson(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          questions = parsed;
        } else {
          throw new Error('Could not parse quiz JSON');
        }
      } catch (err) {
        console.warn('[aiController.quiz] Falling back to demo content:', err.message);
        usedDemo = true;
      }
    }
    if (usedDemo) {
      questions = demo.demoQuizQuestions(subject, topic, difficulty, numCount);
    }
    res.json({ success: true, demoMode: usedDemo, questions });
  } catch (err) {
    next(err);
  }
}

async function studyPlan(req, res, next) {
  try {
    const { subject, topics, hoursPerDay, days, examDate, level } = req.body;
    let topicsArr = topics;
    if (typeof topics === 'string') {
      topicsArr = topics.split(',').map((t) => t.trim()).filter(Boolean);
    }
    let result;
    let usedDemo = DEMO_MODE;
    if (!DEMO_MODE) {
      try {
        const raw = await callClaude(
          prompts.studyPlanPrompt({ subject, topics: topicsArr, hoursPerDay, days, examDate, level }),
          { maxTokens: 2000 }
        );
        const parsed = tryParseJson(raw);
        if (parsed && Array.isArray(parsed.plan)) {
          result = parsed;
        } else {
          throw new Error('Could not parse study plan JSON');
        }
      } catch (err) {
        console.warn('[aiController.studyPlan] Falling back to demo content:', err.message);
        usedDemo = true;
      }
    }
    if (usedDemo) {
      result = demo.demoStudyPlan({ subject, topics: topicsArr, hoursPerDay, days, examDate, level });
    }
    res.json({ success: true, demoMode: usedDemo, ...result });
  } catch (err) {
    next(err);
  }
}

async function flashcards(req, res, next) {
  try {
    const { subject, topic, count } = req.body;
    const numCount = Math.min(Math.max(parseInt(count, 10) || 6, 1), 20);
    let cards;
    let usedDemo = DEMO_MODE;
    if (!DEMO_MODE) {
      try {
        const raw = await callClaude(prompts.flashcardsPrompt({ subject, topic, count: numCount }), {
          maxTokens: 1500,
        });
        const parsed = tryParseJson(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          cards = parsed;
        } else {
          throw new Error('Could not parse flashcards JSON');
        }
      } catch (err) {
        console.warn('[aiController.flashcards] Falling back to demo content:', err.message);
        usedDemo = true;
      }
    }
    if (usedDemo) {
      cards = demo.demoFlashcards(subject, topic, numCount);
    }
    res.json({ success: true, demoMode: usedDemo, cards });
  } catch (err) {
    next(err);
  }
}

async function examAnswer(req, res, next) {
  try {
    const { question, marks } = req.body;
    const numMarks = parseInt(marks, 10) || 4;
    let answer;
    let usedDemo = DEMO_MODE;
    if (!DEMO_MODE) {
      try {
        answer = await callClaude(prompts.examAnswerPrompt({ question, marks: numMarks }), { maxTokens: 1500 });
      } catch (err) {
        console.warn('[aiController.examAnswer] Falling back to demo content:', err.message);
        usedDemo = true;
      }
    }
    if (usedDemo) {
      answer = demo.demoExamAnswer(question, numMarks);
    }
    res.json({ success: true, demoMode: usedDemo, answer });
  } catch (err) {
    next(err);
  }
}

module.exports = { ask, explain, summarize, quiz, studyPlan, flashcards, examAnswer };
