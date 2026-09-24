import React from 'react';
import logo from '../assets/logo.png';

export default function Logo({ size = 36, className = '' }) {
  return (
    <div
      className={`bg-white rounded-xl p-1 shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <img src={logo} alt="Study With AI logo" className="w-full h-full object-contain" />
    </div>
  );
}
