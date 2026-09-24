import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

// Health check hitting the root-level /api/health route
export const getHealth = () => axios.get(`${API_BASE_URL.replace(/\/api$/, '')}/api/health`);

export const askAI = (payload) => api.post('/ai/ask', payload).then((r) => r.data);
export const explainTopic = (payload) => api.post('/ai/explain', payload).then((r) => r.data);
export const summarizeText = (payload) => api.post('/ai/summarize', payload).then((r) => r.data);
export const generateQuiz = (payload) => api.post('/ai/quiz', payload).then((r) => r.data);
export const generateStudyPlan = (payload) => api.post('/ai/study-plan', payload).then((r) => r.data);
export const generateFlashcards = (payload) => api.post('/ai/flashcards', payload).then((r) => r.data);
export const generateExamAnswer = (payload) => api.post('/ai/exam-answer', payload).then((r) => r.data);

export const submitQuizAttempt = (payload) => api.post('/quiz/submit', payload).then((r) => r.data);

export const getProfile = () => api.get('/user/profile').then((r) => r.data);
export const updateProfile = (payload) => api.put('/user/profile', payload).then((r) => r.data);

export const getProgress = () => api.get('/progress').then((r) => r.data);
export const getDemoProgress = () => api.get('/progress/demo').then((r) => r.data);

export default api;
