'use client';

import { useState } from 'react';

interface DiningItem {
  name: string;
  type: string;
  hours: string;
  included: boolean;
  cover?: string;
  dress: string;
  desc: string;
  image: string;
  matterport?: string;
  menuLink?: string;
}

export default function RestaurantCarousel({ dining }: { dining: DiningItem[] }) {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % dining.length);
  const prev = () => setCurrent((c) => (c - 1 + dining.length) % dining.length);

  const restaurant = dining[current];

  return (
    <div className="mb-6">
      {/* Card */}
      <div
        className="bg-white rounded-2xl overflow-hidden"
        style={{ boxShadow: '0 8px 40px rgba(10,22,40,0.1)' }}
      >
        {/* Image */}
        <div className="relative" style={{ height: '220px', overflow: 'hidden' }}>
          <img
            key={restaurant.image}
            src={restaurant.image}
            alt={restaurant.name}
            loading="lazy"
            className="w-full h-full object-cover transition-opacity duration-500"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(10,22,40,0.65) 0%, transparent 50%)' }}
          />
          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{
                background: restaurant.included ? 'rgba(26,82,118,0.85)' : 'rgba(192,57,43,0.85)',
                color: 'white',
                backdropFilter: 'blur(4px)',
              }}
            >
              {restaurant.included ? 'Included' : `Speciality${restaurant.cover ? ' · ' + restaurant.cover : ''}`}
            </span>
          </div>
          {/* Name overlay */}
          <div className="absolute bottom-3 left-4 right-4">
            <p className="text-xs uppercase tracking-widest font-medium mb-0.5" style={{ color: 'rgba(255,255,255,0.7)' }}>
              {restaurant.type}
            </p>
            <h4
              className="text-xl font-bold text-white"
              style={{ fontFamily: 'var(--font-playfair)', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}
            >
              {restaurant.name}
            </h4>
          </div>
        </div>

        {/* Info */}
        <div className="p-5">
          <div className="flex gap-4 mb-3 text-xs" style={{ color: '#6b7d8e' }}>
            <span>🕐 {restaurant.hours}</span>
            <span>👔 {restaurant.dress}</span>
          </div>
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#4a5c6e' }}>
            {restaurant.desc}
          </p>
          {(restaurant.matterport || restaurant.menuLink) && (
            <div className="flex gap-4 flex-wrap">
              {restaurant.matterport && (
                <a
                  href={`https://my.matterport.com/show/?m=${restaurant.matterport}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold flex items-center gap-1"
                  style={{ color: 'var(--ocean)' }}
                >
                  View dining space ↗
                </a>
              )}
              {restaurant.menuLink && (
                <a
                  href={restaurant.menuLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold flex items-center gap-1"
                  style={{ color: 'var(--ocean)' }}
                >
                  Sample menu ↗
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-3 px-1">
        <button
          onClick={prev}
          aria-label="Previous restaurant"
          className="flex items-center justify-center rounded-full transition-colors"
          style={{ width: '56px', height: '56px', minWidth: '56px', touchAction: 'manipulation', background: 'rgba(10,22,40,0.07)', color: 'var(--navy)' }}
        >
          ‹
        </button>

        {/* Dots */}
        <div className="flex gap-1.5 flex-wrap justify-center" style={{ maxWidth: '260px' }}>
          {dining.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to ${dining[i].name}`}
              className="rounded-full transition-all"
              style={{
                width: i === current ? '20px' : '8px',
                height: '8px',
                background: i === current ? 'var(--ocean)' : 'rgba(10,22,40,0.18)',
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next restaurant"
          className="flex items-center justify-center rounded-full transition-colors"
          style={{ width: '56px', height: '56px', minWidth: '56px', touchAction: 'manipulation', background: 'rgba(10,22,40,0.07)', color: 'var(--navy)' }}
        >
          ›
        </button>
      </div>

      <p className="text-center text-xs mt-2" style={{ color: '#9aabb8' }}>
        {current + 1} of {dining.length} dining options
      </p>
    </div>
  );
}
