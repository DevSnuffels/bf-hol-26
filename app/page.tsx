import Link from 'next/link';

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
            The Boyle Family Holiday Guide
          </p>

          <div
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-white text-sm tracking-widest animate-fadeUp animation-delay-600"
            style={{
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            <strong style={{ color: 'var(--sunset)' }}>11 Jul</strong>
            <span style={{ opacity: 0.6 }}>–</span>
            <strong style={{ color: 'var(--sunset)' }}>25 Jul 2026</strong>
            <span style={{ opacity: 0.6 }}>· 2 weeks</span>
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
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[5px] mb-3" style={{ color: 'var(--azure)', fontWeight: 600 }}>
            The Plan
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold mb-6 leading-snug"
            style={{ fontFamily: 'var(--font-playfair)', color: 'var(--navy)' }}
          >
            Two weeks of Mediterranean magic
          </h2>
          <p className="text-base md:text-lg leading-relaxed mb-12" style={{ color: '#3a4a5c' }}>
            We&apos;re setting sail on the <strong>Marella Explorer</strong> for a 7-night cruise through some of the most
            stunning ports in the Mediterranean — think ancient ruins, turquoise waters, incredible food, and lazy days at
            sea. After that, the Boyles are staying on in Majorca for a week of pure sunshine at a gorgeous 5-star resort.
            Here&apos;s everything you need to know.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/families/boyle"
              className="px-8 py-4 rounded-xl font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, var(--deep-blue), var(--ocean))' }}
            >
              Boyle Family Guide
            </Link>
            <Link
              href="/families/ferris"
              className="px-8 py-4 rounded-xl font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, var(--ocean), var(--azure))' }}
            >
              Ferris Family Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="text-center py-12 px-4 text-sm"
        style={{ background: 'var(--navy)', color: 'var(--sky-blue)', fontWeight: 300, letterSpacing: '0.5px' }}
      >
        <div className="text-3xl mb-3">🚢</div>
        Not long now — let the countdown begin!
        <div className="mt-2 text-xs" style={{ opacity: 0.4 }}>Holiday Guide · July 2026</div>
      </footer>
    </div>
  );
}
