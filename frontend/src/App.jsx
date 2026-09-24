import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import AIAssistant from './pages/AIAssistant';
import Summarizer from './pages/Summarizer';
import QuizGenerator from './pages/QuizGenerator';
import StudyPlanner from './pages/StudyPlanner';
import Flashcards from './pages/Flashcards';
import ExamAnswerGenerator from './pages/ExamAnswerGenerator';
import Progress from './pages/Progress';
import Settings from './pages/Settings';
import AboutProject from './pages/AboutProject';
import Subjects from './pages/Subjects';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/assistant" element={<AIAssistant />} />
      <Route path="/subjects" element={<Subjects />} />
      <Route path="/summarizer" element={<Summarizer />} />
      <Route path="/quiz-generator" element={<QuizGenerator />} />
      <Route path="/study-planner" element={<StudyPlanner />} />
      <Route path="/flashcards" element={<Flashcards />} />
      <Route path="/exam-answers" element={<ExamAnswerGenerator />} />
      <Route path="/progress" element={<Progress />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/about" element={<AboutProject />} />
      <Route path="*" element={<Landing />} />
    </Routes>
  );
}
