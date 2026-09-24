import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import { generateQuiz, submitQuizAttempt } from '../services/api';

const SUBJECTS = ['DBMS', 'Operating Systems', 'Computer Networks', 'Data Structures', 'Web Development', 'AI', 'ML'];
const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

export default function QuizGenerator() {
  const [subject, setSubject] = useState('DBMS');
  const [topic, setTopic] = useState('Normalization');
  const [difficulty, setDifficulty] = useState('Medium');
  const [count, setCount] = useState(5);
  const [questions, setQuestions] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generate = async () => {
    setLoading(true);
    setError('');
    setQuestions(null);
    setSubmitted(false);
    setAnswers({});
    setResult(null);
    try {
      const res = await generateQuiz({ subject, topic, difficulty, count });
      setQuestions(res.questions);
    } catch (err) {
      setError('Could not generate quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const submit = async () => {
    const answerArr = questions.map((_, i) => answers[i] || '');
    try {
      const res = await submitQuizAttempt({ subject, topic, difficulty, questions, answers: answerArr });
      setResult(res);
    } catch {
      const correct = questions.filter((q, i) => q.correctAnswer === answerArr[i]).length;
      setResult({ correct, total: questions.length, score: Math.round((correct / questions.length) * 100) });
    }
    setSubmitted(true);
  };

  return (
    <Layout title="Quiz Generator">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <div className="grid sm:grid-cols-4 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Subject</label>
              <select className="input-field" value={subject} onChange={(e) => setSubject(e.target.value)}>
                {SUBJECTS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Topic</label>
              <input className="input-field" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Normalization" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Difficulty</label>
              <select className="input-field" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                {DIFFICULTIES.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1"># Questions</label>
              <input
                type="number"
                min={1}
                max={15}
                className="input-field"
                value={count}
                onChange={(e) => setCount(e.target.value)}
              />
            </div>
          </div>
          <button onClick={generate} disabled={loading} className="btn-primary mt-4 w-full sm:w-auto">
            {loading ? 'Generating...' : 'Generate Quiz'}
          </button>
        </Card>

        {loading && <LoadingSpinner label="Generating quiz questions..." />}
        {error && (
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 px-4 py-3 rounded-xl">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        {questions && !submitted && (
          <div className="space-y-4">
            {questions.map((q, i) => (
              <Card key={i}>
                <p className="font-medium mb-3">
                  {i + 1}. {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((opt) => (
                    <label
                      key={opt}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl border cursor-pointer text-sm transition-colors ${
                        answers[i] === opt
                          ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`q-${i}`}
                        className="accent-brand-600"
                        checked={answers[i] === opt}
                        onChange={() => setAnswers((a) => ({ ...a, [i]: opt }))}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </Card>
            ))}
            <button onClick={submit} className="btn-primary w-full">
              Submit Quiz
            </button>
          </div>
        )}

        {submitted && result && (
          <div className="space-y-4">
            <Card className="text-center bg-gradient-to-r from-brand-600 to-purple-600 text-white">
              <p className="text-sm text-brand-100">Your Score</p>
              <p className="text-4xl font-extrabold my-2">{result.score}%</p>
              <p className="text-brand-100">
                {result.correct} / {result.total} correct — {result.score >= 70 ? 'Great job!' : 'Keep practicing!'}
              </p>
            </Card>
            {questions.map((q, i) => {
              const userAns = answers[i];
              const isCorrect = userAns === q.correctAnswer;
              return (
                <Card key={i}>
                  <div className="flex items-start gap-2 mb-2">
                    {isCorrect ? (
                      <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={18} />
                    ) : (
                      <XCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
                    )}
                    <p className="font-medium">
                      {i + 1}. {q.question}
                    </p>
                  </div>
                  <p className="text-sm ml-6">
                    Your answer: <span className={isCorrect ? 'text-emerald-600' : 'text-red-600'}>{userAns || 'Not answered'}</span>
                  </p>
                  {!isCorrect && (
                    <p className="text-sm ml-6 text-emerald-600">Correct answer: {q.correctAnswer}</p>
                  )}
                  {q.explanation && <p className="text-xs ml-6 text-gray-500 mt-1">{q.explanation}</p>}
                </Card>
              );
            })}
            <button onClick={generate} className="btn-secondary w-full">
              <RotateCcw size={16} /> Try Another Quiz
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
