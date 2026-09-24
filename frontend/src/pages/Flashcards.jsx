import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, AlertCircle, ThumbsDown, ThumbsUp, Layers } from 'lucide-react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import { generateFlashcards } from '../services/api';

export default function Flashcards() {
  const [subject, setSubject] = useState('DBMS');
  const [topic, setTopic] = useState('Normalization');
  const [count, setCount] = useState(6);
  const [cards, setCards] = useState(null);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState({}); // { idx: 'difficult' | 'learned' }

  useEffect(() => {
    try {
      const saved = localStorage.getItem('flashcardStatus');
      if (saved) setStatus(JSON.parse(saved));
    } catch {}
  }, []);

  const persistStatus = (next) => {
    setStatus(next);
    try {
      localStorage.setItem('flashcardStatus', JSON.stringify(next));
    } catch {}
  };

  const generate = async () => {
    setLoading(true);
    setError('');
    setCards(null);
    setIndex(0);
    setFlipped(false);
    try {
      const res = await generateFlashcards({ subject, topic, count });
      setCards(res.cards);
    } catch (err) {
      setError('Could not generate flashcards. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const mark = (label) => {
    const key = `${subject}-${topic}-${index}`;
    persistStatus({ ...status, [key]: label });
  };

  const current = cards?.[index];
  const currentKey = `${subject}-${topic}-${index}`;

  return (
    <Layout title="Flashcards">
      <div className="max-w-xl mx-auto space-y-6">
        <Card>
          <div className="grid sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Subject</label>
              <input className="input-field" value={subject} onChange={(e) => setSubject(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Topic</label>
              <input className="input-field" value={topic} onChange={(e) => setTopic(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1"># Cards</label>
              <input type="number" min={1} max={15} className="input-field" value={count} onChange={(e) => setCount(e.target.value)} />
            </div>
          </div>
          <button onClick={generate} disabled={loading} className="btn-primary mt-4 w-full sm:w-auto">
            <Layers size={16} /> {loading ? 'Generating...' : 'Generate Flashcards'}
          </button>
        </Card>

        {loading && <LoadingSpinner label="Generating flashcards..." />}
        {error && (
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 px-4 py-3 rounded-xl">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        {current && (
          <div>
            <div
              className="relative h-64 cursor-pointer"
              style={{ perspective: '1200px' }}
              onClick={() => setFlipped((f) => !f)}
            >
              <div
                className="relative w-full h-full transition-transform duration-500"
                style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)' }}
              >
                <div
                  className="absolute inset-0 card p-6 flex items-center justify-center text-center bg-gradient-to-br from-brand-500 to-purple-500 text-white"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <p className="text-lg font-semibold">{current.question}</p>
                </div>
                <div
                  className="absolute inset-0 card p-6 flex items-center justify-center text-center"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <p className="text-base">{current.answer}</p>
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-gray-400 mt-2">Click the card to flip</p>

            <div className="flex items-center justify-between mt-4">
              <button
                className="btn-secondary !px-3 !py-2"
                onClick={() => {
                  setIndex((i) => Math.max(0, i - 1));
                  setFlipped(false);
                }}
                disabled={index === 0}
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-sm text-gray-500">
                {index + 1} / {cards.length}
              </span>
              <button
                className="btn-secondary !px-3 !py-2"
                onClick={() => {
                  setIndex((i) => Math.min(cards.length - 1, i + 1));
                  setFlipped(false);
                }}
                disabled={index === cards.length - 1}
              >
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="flex items-center justify-center gap-3 mt-4">
              <button
                onClick={() => mark('difficult')}
                className={`btn-secondary !px-3 !py-2 text-xs ${status[currentKey] === 'difficult' ? '!bg-red-100 !text-red-700 dark:!bg-red-900/40 dark:!text-red-300' : ''}`}
              >
                <ThumbsDown size={14} /> Difficult
              </button>
              <button
                onClick={() => mark('learned')}
                className={`btn-secondary !px-3 !py-2 text-xs ${status[currentKey] === 'learned' ? '!bg-emerald-100 !text-emerald-700 dark:!bg-emerald-900/40 dark:!text-emerald-300' : ''}`}
              >
                <ThumbsUp size={14} /> Learned
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
