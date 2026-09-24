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
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/assistant" element={<ProtectedRoute><AIAssistant /></ProtectedRoute>} />
      <Route path="/subjects" element={<ProtectedRoute><Subjects /></ProtectedRoute>} />
      <Route path="/summarizer" element={<ProtectedRoute><Summarizer /></ProtectedRoute>} />
      <Route path="/quiz-generator" element={<ProtectedRoute><QuizGenerator /></ProtectedRoute>} />
      <Route path="/study-planner" element={<ProtectedRoute><StudyPlanner /></ProtectedRoute>} />
      <Route path="/flashcards" element={<ProtectedRoute><Flashcards /></ProtectedRoute>} />
      <Route path="/exam-answers" element={<ProtectedRoute><ExamAnswerGenerator /></ProtectedRoute>} />
      <Route path="/progress" element={<ProtectedRoute><Progress /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/about" element={<AboutProject />} />
      <Route path="*" element={<Landing />} />
    </Routes>
  );
}
