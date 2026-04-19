'use client';

import { useState, useEffect, useCallback } from 'react';

interface NavItem {
  id: string;
  label: string;
}

export default function StickyNav({ items }: { items: NavItem[] }) {
  const [active, setActive] = useState('');

  const onScroll = useCallback(() => {
    let current = '';
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el && el.getBoundingClientRect().top <= 120) {
        current = item.id;
      }
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
    const y = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <nav
      className="sticky top-0 z-40 overflow-x-auto"
      style={{
        background: 'rgba(250,248,243,0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(10,22,40,0.08)',
        boxShadow: '0 2px 12px rgba(10,22,40,0.06)',
      }}
    >
      <div
        className="flex items-center gap-1 px-4"
        style={{ whiteSpace: 'nowrap', maxWidth: '900px', margin: '0 auto' }}
      >
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="flex-shrink-0"
              style={{
                padding: '14px 12px',
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
    </nav>
  );
}
