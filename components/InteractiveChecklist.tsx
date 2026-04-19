'use client';

import { useState, useEffect } from 'react';

interface ChecklistItem {
  title: string;
  desc: string;
}

export default function InteractiveChecklist({
  items,
  storageKey,
}: {
  items: ChecklistItem[];
  storageKey: string;
}) {
  const [checked, setChecked] = useState<boolean[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setChecked(JSON.parse(saved));
      } else {
        setChecked(new Array(items.length).fill(false));
      }
    } catch {
      setChecked(new Array(items.length).fill(false));
    }
  }, [items.length, storageKey]);

  const toggle = (i: number) => {
    setChecked((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      try { localStorage.setItem(storageKey, JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const doneCount = checked.filter(Boolean).length;

  if (checked.length === 0) return null;

  return (
    <div>
      {/* Progress bar */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 rounded-full overflow-hidden" style={{ height: '6px', background: 'rgba(133,193,233,0.2)' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${(doneCount / items.length) * 100}%`, background: 'var(--sky-blue)' }}
          />
        </div>
        <span className="text-xs font-semibold flex-shrink-0" style={{ color: 'var(--sky-blue)' }}>
          {doneCount}/{items.length}
        </span>
      </div>

      <div className="space-y-3">
        {items.map((item, i) => (
          <label
            key={i}
            className="flex gap-4 cursor-pointer rounded-xl p-3 transition-colors"
            style={{ background: checked[i] ? 'rgba(133,193,233,0.08)' : 'transparent' }}
          >
            <input
              type="checkbox"
              checked={checked[i] ?? false}
              onChange={() => toggle(i)}
              className="sr-only"
            />
            {/* Custom checkbox */}
            <div
              className="flex-shrink-0 flex items-center justify-center rounded-md mt-0.5 transition-all"
              style={{
                width: '24px',
                height: '24px',
                border: checked[i] ? 'none' : '2px solid var(--sky-blue)',
                background: checked[i] ? 'var(--sky-blue)' : 'transparent',
                outline: 'none',
              }}
            >
              {checked[i] && (
                <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
                  <path d="M1 5.5L5 9.5L13 1.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <p
              className="text-sm leading-relaxed transition-opacity"
              style={{ color: checked[i] ? 'rgba(133,193,233,0.5)' : 'var(--sky-blue)', textDecoration: checked[i] ? 'line-through' : 'none' }}
            >
              <strong style={{ color: checked[i] ? 'rgba(255,255,255,0.35)' : 'white' }}>{item.title}:</strong>{' '}
              {item.desc}
            </p>
          </label>
        ))}
      </div>

      {doneCount === items.length && items.length > 0 && (
        <p className="text-center text-sm font-semibold mt-5" style={{ color: 'var(--sky-blue)' }}>
          <span aria-hidden="true">✈️ </span>All packed — you&apos;re ready to go!
        </p>
      )}
    </div>
  );
}
