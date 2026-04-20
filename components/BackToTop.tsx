'use client';

import { useState, useEffect } from 'react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="fixed bottom-6 right-5 z-50 flex items-center justify-center rounded-full shadow-lg transition-opacity hover:opacity-90"
      style={{
        width: '48px',
        height: '48px',
        background: 'var(--ocean)',
        color: 'white',
        boxShadow: '0 4px 20px rgba(10,22,40,0.25)',
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}
