'use client';

import { useState, useRef } from 'react';

interface CardItem {
  name: string;
  category: string;
  deck?: string;
  tags?: string[];
  icon: string;
  desc: string;
  image: string;
  images?: string[];
  extra?: string;
}

const PLACEHOLDER_GRADIENTS = [
  'linear-gradient(135deg, #0a1628, #1a5276)',  // navy → ocean
  'linear-gradient(135deg, #0f2847, #2e86c1)',  // deep-blue → azure
  'linear-gradient(135deg, #1a5276, #2e86c1)',  // ocean → azure
  'linear-gradient(135deg, #0a1628, #0f2847)',  // navy → deep-blue
  'linear-gradient(135deg, #1a3a4a, #2e86c1)',  // dark teal → azure
  'linear-gradient(135deg, #0f2847, #1a5276)',  // deep-blue → ocean
  'linear-gradient(135deg, #2e86c1, #85c1e9)',  // azure → sky-blue
  'linear-gradient(135deg, #0a1628, #2e86c1)',  // navy → azure
];

const ChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const DOTS_THRESHOLD = 8;

export default function CardCarousel({ items, accentColor = 'var(--ocean)' }: { items: CardItem[]; accentColor?: string }) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);

  const next = () => setCurrent((c) => (c + 1) % items.length);
  const prev = () => setCurrent((c) => (c - 1 + items.length) % items.length);

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
  };

  const item = items[current];
  const activeImage = item.images?.[0] ?? item.image;
  const isPlaceholder = activeImage === 'placeholder';

  return (
    <div className="mb-6">
      {/* Card */}
      <div
        className="bg-white rounded-2xl overflow-hidden"
        style={{ boxShadow: '0 8px 40px rgba(10,22,40,0.10)' }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Image or placeholder */}
        <div className="relative" style={{ height: '210px', overflow: 'hidden' }}>
          {isPlaceholder ? (
            <div
              className="w-full h-full flex flex-col items-center justify-center"
              style={{ background: PLACEHOLDER_GRADIENTS[current % PLACEHOLDER_GRADIENTS.length] }}
            >
              <span style={{ fontSize: '3.5rem', lineHeight: 1 }}>{item.icon}</span>
              <span
                className="mt-3 text-xs uppercase tracking-[3px] font-medium"
                style={{ color: 'rgba(255,255,255,0.75)' }}
              >
                Photo coming soon
              </span>
            </div>
          ) : (
            <img
              key={activeImage}
              src={activeImage}
              alt={item.name}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          )}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(10,22,40,0.7) 0%, transparent 55%)' }}
          />

          {/* Extra badge (Chargeable, Adults only etc.) */}
          {item.extra && (
            <div className="absolute top-3 left-3">
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{ background: 'rgba(192,57,43,0.85)', color: 'white', backdropFilter: 'blur(4px)' }}
              >
                {item.extra}
              </span>
            </div>
          )}

          {/* Name overlay */}
          <div className="absolute bottom-3 left-4 right-4">
            <p className="text-xs uppercase tracking-widest font-medium mb-0.5" style={{ color: 'rgba(255,255,255,0.65)' }}>
              {item.category}{item.deck ? ` · ${item.deck}` : ''}
            </p>
            <h4
              className="text-xl font-bold text-white"
              style={{ fontFamily: 'var(--font-playfair)', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}
            >
              {item.name}
            </h4>
          </div>
        </div>

        {/* Info */}
        <div className="p-5">
          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(232,201,146,0.35)', color: 'var(--ocean)' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <p className="text-sm leading-relaxed" style={{ color: '#4a5c6e' }}>
            {item.desc}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-3 px-1">
        <button
          onClick={prev}
          aria-label={`Previous ${item.category}`}
          className="flex items-center justify-center rounded-full"
          style={{ width: '56px', height: '56px', minWidth: '56px', touchAction: 'manipulation', background: 'rgba(10,22,40,0.07)', color: 'var(--navy)', fontSize: '1.2rem' }}
        >
          <ChevronLeft />
        </button>

        {items.length <= DOTS_THRESHOLD ? (
          <div className="flex gap-1.5 flex-wrap justify-center" style={{ maxWidth: '280px' }}>
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to ${items[i].name}`}
                className="rounded-full transition-all"
                style={{
                  width: i === current ? '20px' : '8px',
                  height: '8px',
                  background: i === current ? accentColor : 'rgba(10,22,40,0.18)',
                }}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm font-medium" style={{ color: '#5a6e7e' }}>
            {current + 1} <span style={{ opacity: 0.5 }}>of</span> {items.length}
          </p>
        )}

        <button
          onClick={next}
          aria-label={`Next ${item.category}`}
          className="flex items-center justify-center rounded-full"
          style={{ width: '56px', height: '56px', minWidth: '56px', touchAction: 'manipulation', background: 'rgba(10,22,40,0.07)', color: 'var(--navy)', fontSize: '1.2rem' }}
        >
          <ChevronRight />
        </button>
      </div>

      {items.length <= DOTS_THRESHOLD && (
        <p className="text-center text-xs mt-2" style={{ color: '#5a6e7e' }}>
          {current + 1} of {items.length}
        </p>
      )}
    </div>
  );
}
