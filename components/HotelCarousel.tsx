'use client';

import { useState, useEffect, useCallback } from 'react';

export default function HotelCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % images.length), [images.length]);
  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="relative w-full overflow-hidden" style={{ maxHeight: '280px' }}>
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`${alt} ${i + 1}`}
          loading="lazy"
          className="w-full absolute inset-0 transition-opacity duration-700"
          style={{
            maxHeight: '280px',
            objectFit: 'cover',
            opacity: i === current ? 1 : 0,
            position: i === 0 ? 'relative' : 'absolute',
          }}
        />
      ))}

      {/* Prev / Next */}
      <button
        onClick={prev}
        aria-label="Previous image"
        className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full transition-opacity hover:opacity-100"
        style={{ background: 'rgba(10,22,40,0.45)', color: 'white', opacity: 0.7 }}
      >
        ‹
      </button>
      <button
        onClick={next}
        aria-label="Next image"
        className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full transition-opacity hover:opacity-100"
        style={{ background: 'rgba(10,22,40,0.45)', color: 'white', opacity: 0.7 }}
      >
        ›
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to image ${i + 1}`}
            className="rounded-full transition-all"
            style={{
              width: i === current ? '20px' : '8px',
              height: '8px',
              background: i === current ? 'var(--sunset)' : 'rgba(255,255,255,0.5)',
            }}
          />
        ))}
      </div>
    </div>
  );
}
