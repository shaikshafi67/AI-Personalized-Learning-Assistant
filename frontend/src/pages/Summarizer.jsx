import React, { useState } from 'react';
import { FileText, AlertCircle } from 'lucide-react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { summarizeText } from '../services/api';

const SAMPLE =
  'A relational database organizes data into tables consisting of rows and columns. Each table represents an entity, and each row represents a record. Primary keys uniquely identify each row, while foreign keys create relationships between tables. Normalization is used to reduce redundancy by splitting large tables into smaller related ones.';

export default function Summarizer() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSummarize = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError('');
    setResult('');
    try {
      const res = await summarizeText({ text });
      setResult(res.answer);
    } catch (err) {
      setError('Could not generate a summary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Summarizer">
      <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
        <Card>
          <div className="flex items-center gap-2 mb-3">
            <FileText size={18} className="text-brand-600" />
            <h3 className="font-semibold">Paste Study Material</h3>
          </div>
          <textarea
            className="input-field h-64 resize-none"
            placeholder="Paste your notes, textbook paragraph, or article here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="flex items-center justify-between mt-3">
            <button onClick={() => setText(SAMPLE)} className="text-xs text-brand-600 hover:underline">
              Use sample text
            </button>
            <button onClick={handleSummarize} disabled={loading || !text.trim()} className="btn-primary">
              {loading ? 'Summarizing...' : 'Generate Summary'}
            </button>
          </div>
        </Card>
        <Card className="min-h-[300px]">
          <h3 className="font-semibold mb-3">Summary</h3>
          {loading && <LoadingSpinner label="Summarizing your material..." />}
          {error && (
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 px-4 py-3 rounded-xl">
              <AlertCircle size={16} /> {error}
            </div>
          )}
          {!loading && !result && !error && (
            <p className="text-sm text-gray-400">Your summary, key points, and exam highlights will appear here.</p>
          )}
          {result && <MarkdownRenderer content={result} />}
        </Card>
      </div>
    </Layout>
  );
}
