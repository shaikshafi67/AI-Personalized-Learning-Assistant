import React, { useState } from 'react';
import { CalendarDays, Clock, AlertCircle } from 'lucide-react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import { generateStudyPlan } from '../services/api';

export default function StudyPlanner() {
  const [form, setForm] = useState({
    subject: 'DBMS',
    topics: 'Normalization, Transactions, Indexing',
    hoursPerDay: 2,
    days: 7,
    examDate: '',
    level: 'Beginner',
  });
  const [plan, setPlan] = useState(null);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const generate = async () => {
    setLoading(true);
    setError('');
    setPlan(null);
    try {
      const res = await generateStudyPlan(form);
      setPlan(res.plan);
      setSummary(res.summary);
    } catch (err) {
      setError('Could not generate study plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Study Planner">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Subject">
              <input className="input-field" value={form.subject} onChange={(e) => update('subject', e.target.value)} />
            </Field>
            <Field label="Current Knowledge Level">
              <select className="input-field" value={form.level} onChange={(e) => update('level', e.target.value)}>
                {['Beginner', 'Intermediate', 'Advanced'].map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </Field>
            <Field label="Topics (comma separated)" full>
              <input className="input-field" value={form.topics} onChange={(e) => update('topics', e.target.value)} />
            </Field>
            <Field label="Hours per day">
              <input type="number" min={1} max={12} className="input-field" value={form.hoursPerDay} onChange={(e) => update('hoursPerDay', e.target.value)} />
            </Field>
            <Field label="Number of days">
              <input type="number" min={1} max={60} className="input-field" value={form.days} onChange={(e) => update('days', e.target.value)} />
            </Field>
            <Field label="Exam Date (optional)">
              <input type="date" className="input-field" value={form.examDate} onChange={(e) => update('examDate', e.target.value)} />
            </Field>
          </div>
          <button onClick={generate} disabled={loading} className="btn-primary mt-4 w-full sm:w-auto">
            <CalendarDays size={16} /> {loading ? 'Generating...' : 'Generate Study Plan'}
          </button>
        </Card>

        {loading && <LoadingSpinner label="Building your study plan..." />}
        {error && (
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 px-4 py-3 rounded-xl">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        {plan && (
          <div className="space-y-4">
            {summary && (
              <Card className="bg-brand-50 dark:bg-brand-900/20 border-brand-100 dark:border-brand-900">
                <p className="text-sm text-brand-800 dark:text-brand-200">{summary}</p>
              </Card>
            )}
            <div className="space-y-3">
              {plan.map((d) => (
                <Card key={d.day} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-600 text-white flex items-center justify-center font-bold shrink-0">
                    D{d.day}
                  </div>
                  <div>
                    <p className="font-semibold">
                      {d.subject} — {d.topic}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                      <Clock size={13} /> {d.hours} hrs
                    </p>
                    {d.focus && <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{d.focus}</p>}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

function Field({ label, children, full }) {
  return (
    <div className={full ? 'sm:col-span-2' : ''}>
      <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
      {children}
    </div>
  );
}
