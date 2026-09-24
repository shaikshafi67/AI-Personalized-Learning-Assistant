import React, { useState } from 'react';
import { GraduationCap, AlertCircle } from 'lucide-react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { generateExamAnswer } from '../services/api';

const MARKS = [2, 4, 6, 8, 10];

export default function ExamAnswerGenerator() {
  const [question, setQuestion] = useState('');
  const [marks, setMarks] = useState(4);
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generate = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setError('');
    setAnswer('');
    try {
      const res = await generateExamAnswer({ question, marks });
      setAnswer(res.answer);
    } catch (err) {
      setError('Could not generate the exam answer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Exam Answer Generator">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <label className="block text-xs font-medium text-gray-500 mb-1">Exam Question</label>
          <textarea
            className="input-field h-24 resize-none"
            placeholder="e.g. Explain the concept of Deadlock in Operating Systems"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <label className="block text-xs font-medium text-gray-500 mb-2 mt-4">Marks Allotted</label>
          <div className="flex gap-2 flex-wrap">
            {MARKS.map((m) => (
              <button
                key={m}
                onClick={() => setMarks(m)}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                  marks === m
                    ? 'bg-brand-600 text-white border-brand-600'
                    : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {m} Marks
              </button>
            ))}
          </div>
          <button onClick={generate} disabled={loading || !question.trim()} className="btn-primary mt-4">
            <GraduationCap size={16} /> {loading ? 'Generating...' : 'Generate Answer'}
          </button>
        </Card>

        {loading && <LoadingSpinner label="Writing your exam answer..." />}
        {error && (
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 px-4 py-3 rounded-xl">
            <AlertCircle size={16} /> {error}
          </div>
        )}
        {answer && (
          <Card>
            <MarkdownRenderer content={answer} />
          </Card>
        )}
      </div>
    </Layout>
  );
}
