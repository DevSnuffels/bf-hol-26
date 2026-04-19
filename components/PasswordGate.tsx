'use client';

import { useState, useEffect } from 'react';

const SESSION_KEY = 'hol26_auth';
const PASSWORD = 'holiday26';

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    setAuthed(sessionStorage.getItem(SESSION_KEY) === '1');
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input === PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1');
      setAuthed(true);
    } else {
      setError(true);
      setInput('');
    }
  }

  // Avoid flash: render nothing until sessionStorage has been checked
  if (authed === null) return null;

  if (authed) return <>{children}</>;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
      style={{
        background: 'linear-gradient(135deg, var(--navy) 0%, var(--deep-blue) 40%, var(--ocean) 100%)',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 20% 80%, rgba(133,193,233,0.1) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(243,156,18,0.07) 0%, transparent 50%)',
        }}
      />

      <div className="relative z-10 w-full max-w-sm">
        <div className="text-5xl mb-6">🚢</div>

        <h1
          className="text-3xl font-black text-white mb-2"
          style={{ fontFamily: 'var(--font-playfair)' }}
        >
          Treasures of the{' '}
          <em style={{ color: 'var(--sunset)' }}>Mediterranean</em>
        </h1>
        <p className="text-sm mb-10" style={{ color: 'var(--sky-blue)', fontWeight: 300 }}>
          Enter the password to view the holiday guide
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(false); }}
            placeholder="Password"
            autoFocus
            className="w-full px-5 py-4 rounded-xl text-center text-base outline-none transition-all"
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: `1px solid ${error ? 'var(--coral)' : 'rgba(255,255,255,0.2)'}`,
              color: 'white',
              backdropFilter: 'blur(8px)',
            }}
          />
          {error && (
            <p className="text-sm" style={{ color: 'var(--coral)' }}>
              Incorrect password — try again
            </p>
          )}
          <button
            type="submit"
            className="w-full py-4 rounded-xl font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, var(--ocean), var(--azure))' }}
          >
            Let me in
          </button>
        </form>
      </div>
    </div>
  );
}
