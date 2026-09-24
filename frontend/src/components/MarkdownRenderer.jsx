import React from 'react';
import ReactMarkdown from 'react-markdown';

export default function MarkdownRenderer({ content }) {
  return (
    <div className="markdown-body text-sm md:text-[15px]">
      <ReactMarkdown>{content || ''}</ReactMarkdown>
    </div>
  );
}
