import React, { useEffect, useRef, useState } from 'react';
import { Send, Trash2, RefreshCw, AlertCircle } from 'lucide-react';
import Layout from '../components/Layout';
import ChatBubble from '../components/ChatBubble';
import LoadingSpinner from '../components/LoadingSpinner';
import { askAI } from '../services/api';

const SUBJECTS = ['DBMS', 'Operating Systems', 'Computer Networks', 'Data Structures', 'Web Development', 'AI', 'ML', 'Other'];
const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];
const STYLES = ['Simple', 'Detailed', 'Exam Prep', 'With Examples', 'Step-by-Step', 'Interview Prep'];

export default function AIAssistant() {
  const [subject, setSubject] = useState('DBMS');
  const [level, setLevel] = useState('Intermediate');
  const [style, setStyle] = useState('Detailed');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (questionOverride) => {
    const question = (questionOverride ?? input).trim();
    if (!question || loading) return;
    setError('');
    setMessages((m) => [...m, { role: 'user', content: question }]);
    setInput('');
    setLoading(true);
    try {
      const res = await askAI({ question, subject, level, style });
      setMessages((m) => [...m, { role: 'assistant', content: res.answer }]);
    } catch (err) {
      setError('Failed to get a response. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const regenerate = () => {
    const lastUser = [...messages].reverse().find((m) => m.role === 'user');
    if (!lastUser) return;
    setMessages((m) => {
      const idx = m.map((x) => x.role).lastIndexOf('assistant');
      return idx >= 0 ? m.slice(0, idx) : m;
    });
    sendMessage(lastUser.content);
  };

  return (
    <Layout title="AI Assistant">
      <div className="flex flex-col h-[calc(100vh-140px)] max-w-4xl mx-auto">
        <div className="card p-4 mb-4 grid sm:grid-cols-3 gap-3">
          <Select label="Subject" value={subject} onChange={setSubject} options={SUBJECTS} />
          <Select label="Learning Level" value={level} onChange={setLevel} options={LEVELS} />
          <Select label="Response Style" value={style} onChange={setStyle} options={STYLES} />
        </div>

        <div className="flex-1 overflow-y-auto card p-4 space-y-5 mb-4">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 py-10">
              <p className="text-lg font-medium mb-1">Ask me anything academic!</p>
              <p className="text-sm">Try: "What is a candidate key in DBMS?" or "Explain Deadlock in OS"</p>
            </div>
          )}
          {messages.map((m, i) => (
            <ChatBubble key={i} role={m.role} content={m.content} />
          ))}
          {loading && <LoadingSpinner label="AI is thinking..." />}
          {error && (
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 px-4 py-3 rounded-xl">
              <AlertCircle size={16} /> {error}
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="flex items-center gap-2 mb-2">
          <button
            onClick={() => setMessages([])}
            disabled={messages.length === 0}
            className="btn-secondary !px-3 !py-1.5 text-xs"
          >
            <Trash2 size={14} /> Clear
          </button>
          <button
            onClick={regenerate}
            disabled={loading || messages.length === 0}
            className="btn-secondary !px-3 !py-1.5 text-xs"
          >
            <RefreshCw size={14} /> Regenerate
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            className="input-field"
            placeholder="Type your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" disabled={loading || !input.trim()} className="btn-primary !px-4">
            <Send size={18} />
          </button>
        </form>
      </div>
    </Layout>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
      <select className="input-field" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
