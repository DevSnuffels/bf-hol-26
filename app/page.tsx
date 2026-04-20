import Link from 'next/link';
import Countdown from '../components/Countdown';

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--cream)' }}>
      {/* Hero */}
      <section
        className="relative min-h-screen flex items-center justify-center text-center px-4 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--navy) 0%, var(--deep-blue) 30%, var(--ocean) 60%, var(--azure) 100%)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 20% 80%, rgba(133,193,233,0.12) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(243,156,18,0.08) 0%, transparent 50%)',
          }}
        />

        <div className="relative z-10 max-w-3xl">
          <p
            className="text-sky-blue text-xs uppercase tracking-[6px] mb-6 animate-fadeUp"
            style={{ fontFamily: 'var(--font-raleway)', fontWeight: 300 }}
          >
            Summer 2026
          </p>

          <h1
            className="text-5xl md:text-7xl font-black text-white leading-tight mb-3 animate-fadeUp animation-delay-200"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            Treasures of the<br />
            <em style={{ color: 'var(--sunset)' }}>Mediterranean</em>
          </h1>

          <p
            className="text-lg md:text-2xl mb-10 animate-fadeUp animation-delay-400"
            style={{ fontFamily: 'var(--font-playfair)', color: 'var(--sand)', fontWeight: 400 }}
          >
            The Boyle &amp; Ferris Family Holiday Guide
          </p>

          {/* Countdown */}
          <Countdown className="mb-8 animate-fadeUp animation-delay-600" />

          {/* Both families date summary */}
          <div
            className="inline-flex flex-col sm:flex-row items-center gap-4 rounded-2xl px-8 py-5 text-white text-sm tracking-wide animate-fadeUp animation-delay-800"
            style={{
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs uppercase tracking-widest" style={{ color: 'var(--sky-blue)', opacity: 0.7 }}>Boyle Family</span>
              <span>
                <strong style={{ color: 'var(--sunset)' }}>11 Jul</strong>
                <span style={{ opacity: 0.5 }}> – </span>
                <strong style={{ color: 'var(--sunset)' }}>25 Jul 2026</strong>
              </span>
              <span className="text-xs" style={{ opacity: 0.55 }}>Cruise + Majorca hotel</span>
            </div>
            <div className="hidden sm:block" style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.15)' }} />
            <div className="flex flex-col items-center gap-1">
              <span className="text-xs uppercase tracking-widest" style={{ color: 'var(--sky-blue)', opacity: 0.7 }}>Ferris Family</span>
              <span>
                <strong style={{ color: 'var(--sunset)' }}>11 Jul</strong>
                <span style={{ opacity: 0.5 }}> – </span>
                <strong style={{ color: 'var(--sunset)' }}>18 Jul 2026</strong>
              </span>
              <span className="text-xs" style={{ opacity: 0.55 }}>Cruise only</span>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full block">
            <path
              fill="#faf8f3"
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            />
          </svg>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 px-4" style={{ background: 'var(--cream)' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[5px] mb-3" style={{ color: 'var(--azure)', fontWeight: 600 }}>
              The Plan
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold mb-6 leading-snug"
              style={{ fontFamily: 'var(--font-playfair)', color: 'var(--navy)' }}
            >
              Two families, one Mediterranean adventure
            </h2>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: '#3a4a5c' }}>
              Both families set sail on the <strong>Marella Explorer</strong> for a 7-night cruise through Sardinia,
              the Amalfi Coast, Rome, Corsica, and the Costa Brava — Premium All Inclusive, so drinks, meals, and
              entertainment are all taken care of. After the cruise, the Boyles continue to Majorca for a week at a
              5-star resort. Each family has their own personalised guide below.
            </p>
          </div>

          {/* Schedule comparison */}
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {/* Boyle */}
            <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 8px 30px rgba(10,22,40,0.07)', borderTop: '3px solid var(--ocean)' }}>
              <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: 'var(--ocean)' }}>The Boyles</p>
              <div className="space-y-2 mb-4">
                {[
                  { label: 'Fly out', value: '11 Jul — BHD → PMI' },
                  { label: 'Cruise', value: '11–18 Jul · Marella Explorer' },
                  { label: 'Hotel', value: '18–25 Jul · TUI BLUE Sensatori Biomar' },
                  { label: 'Fly home', value: '25 Jul — PMI → BHD' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex gap-3 text-sm">
                    <span className="flex-shrink-0 font-medium" style={{ color: 'var(--navy)', minWidth: '72px' }}>{label}</span>
                    <span style={{ color: '#4a5c6e' }}>{value}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/families/boyle"
                className="block text-center px-6 py-3 rounded-xl font-semibold text-white transition-opacity hover:opacity-90 text-sm"
                style={{ background: 'linear-gradient(135deg, var(--deep-blue), var(--ocean))' }}
              >
                Open Boyle Family Guide →
              </Link>
            </div>

            {/* Ferris */}
            <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0 8px 30px rgba(10,22,40,0.07)', borderTop: '3px solid var(--azure)' }}>
              <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: 'var(--azure)' }}>The Ferrises</p>
              <div className="space-y-2 mb-4">
                {[
                  { label: 'Fly out', value: '11 Jul — BHD → PMI' },
                  { label: 'Cruise', value: '11–18 Jul · Marella Explorer' },
                  { label: 'Hotel', value: '—' },
                  { label: 'Fly home', value: '18 Jul — PMI → BHD' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex gap-3 text-sm">
                    <span className="flex-shrink-0 font-medium" style={{ color: value === '—' ? '#5a6e7e' : 'var(--navy)', minWidth: '72px' }}>{label}</span>
                    <span style={{ color: value === '—' ? '#5a6e7e' : '#4a5c6e' }}>{value}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/families/ferris"
                className="block text-center px-6 py-3 rounded-xl font-semibold text-white transition-opacity hover:opacity-90 text-sm"
                style={{ background: 'linear-gradient(135deg, var(--ocean), var(--azure))' }}
              >
                Open Ferris Family Guide →
              </Link>
            </div>
          </div>

          {/* Shared cruise highlight */}
          <div
            className="rounded-2xl p-6 text-center"
            style={{ background: 'linear-gradient(135deg, var(--deep-blue), var(--ocean))' }}
          >
            <p className="text-xs uppercase tracking-[4px] mb-2" style={{ color: 'var(--sky-blue)', opacity: 0.7 }}>Shared adventure</p>
            <p className="text-white font-semibold mb-1" style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.1rem' }}>
              Both families cruise together
            </p>
            <p className="text-sm" style={{ color: 'var(--sky-blue)' }}>
              Palma <span aria-hidden="true">→</span> Sardinia <span aria-hidden="true">→</span> Naples <span aria-hidden="true">→</span> Rome <span aria-hidden="true">→</span> Corsica <span aria-hidden="true">→</span> Palamós <span aria-hidden="true">→</span> Palma
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="text-center py-12 px-4 text-sm"
        style={{ background: 'var(--navy)', color: 'var(--sky-blue)', fontWeight: 300, letterSpacing: '0.5px' }}
      >
        <div className="text-3xl mb-3" aria-hidden="true">🚢</div>
        Not long now — let the countdown begin!
        <div className="mt-2 text-xs" style={{ opacity: 0.4 }}>Holiday Guide · July 2026</div>
      </footer>
    </div>
  );
}
