import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Database, Cpu, Network, GitBranch, Globe, Brain, Sparkles, BookOpen } from 'lucide-react';
import Layout from '../components/Layout';

const subjects = [
  { name: 'DBMS', icon: Database, color: 'from-blue-500 to-blue-600', desc: 'Databases, SQL, Normalization, Transactions' },
  { name: 'Operating Systems', icon: Cpu, color: 'from-rose-500 to-rose-600', desc: 'Processes, Deadlock, Memory Management' },
  { name: 'Computer Networks', icon: Network, color: 'from-emerald-500 to-emerald-600', desc: 'OSI Model, TCP/IP, Routing' },
  { name: 'Data Structures', icon: GitBranch, color: 'from-amber-500 to-amber-600', desc: 'Trees, Graphs, Sorting, Searching' },
  { name: 'Web Development', icon: Globe, color: 'from-purple-500 to-purple-600', desc: 'HTML, CSS, JS, React, Node' },
  { name: 'AI', icon: Sparkles, color: 'from-pink-500 to-pink-600', desc: 'Search, Logic, Knowledge Representation' },
  { name: 'ML', icon: Brain, color: 'from-indigo-500 to-indigo-600', desc: 'Regression, Classification, Neural Nets' },
  { name: 'Other', icon: BookOpen, color: 'from-gray-500 to-gray-600', desc: 'Any other academic subject' },
];

export default function Subjects() {
  const navigate = useNavigate();
  return (
    <Layout title="Subjects">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {subjects.map(({ name, icon: Icon, color, desc }) => (
          <button
            key={name}
            onClick={() => navigate('/assistant', { state: { subject: name } })}
            className="card p-5 text-left hover:-translate-y-1 hover:shadow-lg transition-all"
          >
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} text-white flex items-center justify-center mb-3`}>
              <Icon size={20} />
            </div>
            <h3 className="font-semibold mb-1">{name}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">{desc}</p>
          </button>
        ))}
      </div>
    </Layout>
  );
}
