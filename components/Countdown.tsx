'use client';

import { useState, useEffect } from 'react';

// Outbound flight: BA4519 departs BHD 11 Jul 2026 14:30 (Belfast is UTC+1 in July)
const DEPARTURE = new Date('2026-07-11T14:30:00+01:00');

export default function Countdown({ className }: { className?: string }) {
  const [parts, setParts] = useState({ days: 0, hours: 0, mins: 0 });
  const [mounted, setMounted] = useState(false);

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
    setMounted(true);
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) return null;

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className={className}>
      <p
        className="text-xs uppercase tracking-[4px] mb-3 text-center"
        style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-raleway)' }}
      >
        Departure in
      </p>
      <div className="flex items-end justify-center gap-4">
        {[
          { v: parts.days, u: 'days' },
          { v: parts.hours, u: 'hrs' },
          { v: parts.mins, u: 'min' },
        ].map(({ v, u }) => (
          <div key={u} className="flex flex-col items-center">
            <span
              style={{
                fontSize: 'clamp(2.2rem, 6vw, 3.5rem)',
                fontWeight: 800,
                fontVariantNumeric: 'tabular-nums',
                color: 'white',
                fontFamily: 'var(--font-raleway)',
                lineHeight: 1,
              }}
            >
              {pad(v)}
            </span>
            <span
              className="text-xs uppercase tracking-widest mt-1"
              style={{ color: 'rgba(255,255,255,0.45)' }}
            >
              {u}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
