'use client';

import { useState } from 'react';

export default function VideoEmbed({ videoId, title }: { videoId: string; title: string }) {
  const [active, setActive] = useState(false);
  const thumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  if (active) {
    return (
      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
        />
      </div>
    );
  }

  return (
    <button
      onClick={() => setActive(true)}
      className="relative w-full overflow-hidden rounded-xl"
      style={{ aspectRatio: '16/9', display: 'block', padding: 0, border: 'none', cursor: 'pointer' }}
      aria-label={`Play video: ${title}`}
    >
      <img
        src={thumb}
        alt=""
        aria-hidden="true"
        className="w-full h-full object-cover"
      />
      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(10,22,40,0.35)' }}
      />
      {/* Play button */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-2"
      >
        <div
          className="flex items-center justify-center rounded-full transition-transform hover:scale-110"
          style={{ width: '64px', height: '64px', background: 'rgba(255,255,255,0.95)' }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="var(--navy)">
            <path d="M8 5.14v13.72L19 12 8 5.14z" />
          </svg>
        </div>
        <span className="text-white text-xs font-medium" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
          {title}
        </span>
      </div>
    </button>
  );
}
