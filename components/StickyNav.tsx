'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

// Outbound flight: BA4519 departs BHD 11 Jul 2026 14:30 (Belfast is UTC+1 in July)
const DEPARTURE = new Date('2026-07-11T14:30:00+01:00');

function useCountdown() {
  const [parts, setParts] = useState({ days: 0, hours: 0, mins: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = DEPARTURE.getTime() - Date.now();
      if (diff <= 0) { setParts({ days: 0, hours: 0, mins: 0 }); return; }
      setParts({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
      });
    };
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, []);

  return parts;
}

interface NavItem { id: string; label: string; }

export default function StickyNav({ items }: { items: NavItem[] }) {
  const [active, setActive] = useState('');
  const navRef = useRef<HTMLElement>(null);
  const { days, hours, mins } = useCountdown();

  const getNavHeight = () => navRef.current?.offsetHeight ?? 56;

  const onScroll = useCallback(() => {
    let current = '';
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el && el.getBoundingClientRect().top <= getNavHeight() + 16) current = item.id;
    }
    setActive(current);
  }, [items]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - (getNavHeight() + 12);
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-40"
      style={{
        background: 'rgba(250,248,243,0.97)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(10,22,40,0.08)',
        boxShadow: '0 2px 12px rgba(10,22,40,0.06)',
      }}
    >
      {/* Countdown bar */}
      {days >= 0 && (
        <div
          className="flex items-center justify-center gap-3 px-4 py-1.5"
          style={{ borderBottom: '1px solid rgba(10,22,40,0.06)' }}
        >
          <span style={{ fontSize: '0.65rem', color: '#5a6e7e', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-raleway)' }}>
            Departure in
          </span>
          {[{ v: days, u: 'days' }, { v: hours, u: 'hrs' }, { v: mins, u: 'min' }].map(({ v, u }) => (
            <div key={u} className="flex flex-col items-center" style={{ minWidth: '2.4rem' }}>
              <span style={{ fontSize: '1rem', fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: 'var(--navy)', fontFamily: 'var(--font-raleway)', lineHeight: 1 }}>
                {pad(v)}
              </span>
              <span style={{ fontSize: '0.55rem', color: '#5a6e7e', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {u}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Section nav */}
      <div className="overflow-x-auto">
        <div className="flex items-center gap-1 px-4" style={{ whiteSpace: 'nowrap', maxWidth: '900px', margin: '0 auto' }}>
          {items.map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="flex-shrink-0"
                style={{
                  padding: '12px 12px',
                  fontSize: '0.8rem',
                  fontWeight: isActive ? 600 : 400,
                  fontFamily: 'var(--font-raleway)',
                  color: isActive ? 'var(--ocean)' : '#6b7d8e',
                  background: 'none',
                  borderTop: 'none',
                  borderLeft: 'none',
                  borderRight: 'none',
                  borderBottom: isActive ? '2px solid var(--ocean)' : '2px solid transparent',
                  cursor: 'pointer',
                  transition: 'color 0.15s, border-bottom-color 0.15s',
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
