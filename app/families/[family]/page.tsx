import { notFound } from 'next/navigation';
import Link from 'next/link';
import familiesData from '../../../data/families.json';
import itineraryData from '../../../data/itinerary.json';
import HotelCarousel from '../../../components/HotelCarousel';
import StickyNav from '../../../components/StickyNav';
import RestaurantCarousel from '../../../components/RestaurantCarousel';
import CardCarousel from '../../../components/CardCarousel';
import InteractiveChecklist from '../../../components/InteractiveChecklist';
import VideoEmbed from '../../../components/VideoEmbed';
import BackToTop from '../../../components/BackToTop';

interface FamilyPageProps {
  params: Promise<{ family: string }>;
}

export default async function FamilyPage({ params }: FamilyPageProps) {
  const { family } = await params;

  if (!familiesData[family as keyof typeof familiesData]) {
    notFound();
  }

  const familyData = familiesData[family as keyof typeof familiesData];
  const cruiseData = itineraryData.cruise;
  const lob = cruiseData.lifeonboard;

  const cabinImages = Array.isArray((familyData.cabin as any).images)
    ? (familyData.cabin as any).images
    : undefined;

  const familyFlights = itineraryData.flights.filter(
    (f) =>
      f.type === 'Outbound' ||
      (family === 'boyle' && f.type.includes('Boyles')) ||
      (family === 'ferris' && f.type.includes('Ferrises'))
  );

  const checklist = itineraryData.checklist.filter(
    (item) => !('boyleOnly' in item && item.boyleOnly) || family === 'boyle'
  );

  const navItems = [
    { id: 'crew', label: 'The Crew' },
    { id: 'cruise', label: 'The Cruise' },
    { id: 'onboard', label: 'Life Onboard' },
    { id: 'cabin', label: 'Your Cabin' },
    ...(family === 'boyle' ? [{ id: 'hotel', label: 'Hotel' }] : []),
    { id: 'flights', label: 'Flights' },
    { id: 'advice', label: 'Expert Advice' },
    { id: 'checklist', label: 'Checklist' },
  ];

  return (
    <div style={{ background: 'var(--cream)', color: 'var(--navy)' }}>

      {/* ── HERO BANNER ─────────────────────────────────────────────── */}
      <header
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--navy) 0%, var(--deep-blue) 40%, var(--ocean) 100%)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 20% 80%, rgba(133,193,233,0.1) 0%, transparent 50%)',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-10">
          <Link href="/" className="text-sky-blue text-sm hover:underline mb-6 inline-block" style={{ opacity: 0.7 }}>
            ← Back to Overview
          </Link>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[5px] mb-2" style={{ color: 'var(--sky-blue)', fontWeight: 300 }}>
                Summer 2026
              </p>
              <h1
                className="text-4xl md:text-5xl font-black text-white leading-tight"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                {familyData.name}
              </h1>
              <p className="mt-1 text-lg" style={{ color: 'var(--sand)', fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}>
                Holiday Guide
              </p>
            </div>
            <Link
              href={family === 'boyle' ? '/families/ferris' : '/families/boyle'}
              className="text-sm px-5 py-2 rounded-full transition-opacity hover:opacity-80 self-start md:self-auto"
              style={{ background: 'rgba(255,255,255,0.18)', border: '1px solid rgba(255,255,255,0.45)', color: 'white' }}
            >
              View {family === 'boyle' ? 'Ferris' : 'Boyle'} Family →
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full block">
            <path fill="#faf8f3" d="M0,32L80,34.7C160,37,320,43,480,40C640,37,800,27,960,24C1120,21,1280,27,1360,29.3L1440,32L1440,60L0,60Z" />
          </svg>
        </div>
      </header>

      {/* ── STICKY NAV ──────────────────────────────────────────────── */}
      <StickyNav items={navItems} />

      <main className="max-w-4xl mx-auto px-4 py-10 space-y-16">

        {/* ── THE CREW ─────────────────────────────────────────────────── */}
        <section id="crew">
          <p className="text-xs uppercase tracking-[5px] mb-2" style={{ color: 'var(--azure)', fontWeight: 600 }}>The Crew</p>
          <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--navy)' }}>
            Who&apos;s Coming
          </h2>
          <div
            className="bg-white rounded-2xl p-6 md:p-8 shadow-sm"
            style={{ boxShadow: '0 8px 30px rgba(10,22,40,0.07)' }}
          >
            <h3 className="text-xl font-bold mb-1" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--navy)' }}>
              {familyData.name}
            </h3>
            {'reference' in familyData && familyData.reference && (
              <p className="text-xs uppercase tracking-widest mb-4" style={{ color: 'var(--azure)' }}>
                {familyData.reference}
              </p>
            )}
            <ul className="space-y-2">
              {familyData.members.map((member, i) => (
                <li key={i} className="flex items-center gap-3 py-2" style={{ borderBottom: '1px solid rgba(10,22,40,0.05)' }}>
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: 'var(--azure)' }} />
                  <span className="font-medium" style={{ color: 'var(--navy)' }}>{member.name}</span>
                  {'role' in member && member.role && (
                    <span className="text-sm" style={{ color: '#6b7d8e' }}>· {member.role}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── PART ONE: THE CRUISE ─────────────────────────────────────── */}
        <section id="cruise">
          <p className="text-xs uppercase tracking-[5px] mb-2" style={{ color: 'var(--azure)', fontWeight: 600 }}>Part One</p>
          <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--navy)' }}>
            The Cruise
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ color: '#3a4a5c', maxWidth: '680px' }}>
            Seven nights aboard the Marella Explorer, cruising from Palma through Sardinia, the Amalfi Coast, Rome,
            Corsica, and the Costa Brava. Premium All Inclusive means your drinks, meals, and entertainment are all
            taken care of — just turn up and enjoy.
          </p>

          {/* Ship card */}
          <div className="rounded-2xl mb-4 overflow-hidden" style={{ boxShadow: '0 8px 40px rgba(10,22,40,0.12)' }}>
            {'image' in cruiseData && cruiseData.image && (
              <div className="relative" style={{ height: '220px' }}>
                <img
                  src={(cruiseData as any).image}
                  alt={cruiseData.ship}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,22,40,0.7) 0%, transparent 50%)' }} />
              </div>
            )}
            <div
              className="p-8 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, var(--deep-blue), var(--ocean))' }}
            >
            <span className="absolute right-6 top-5 text-5xl" style={{ opacity: 0.12 }} aria-hidden="true">⚓</span>
            <h3 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-playfair)' }}>
              {cruiseData.ship}
            </h3>
            <p className="text-sm mb-6" style={{ color: 'var(--sky-blue)', fontWeight: 300 }}>{cruiseData.route}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Embarkation', value: cruiseData.embarkation },
                { label: 'Disembarkation', value: cruiseData.disembarkation },
                { label: 'Duration', value: cruiseData.duration },
                { label: 'Board', value: cruiseData.board },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div className="text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--sky-blue)', letterSpacing: '3px' }}>
                    {label}
                  </div>
                  <div className="font-semibold text-white text-sm" style={{ fontFamily: 'var(--font-playfair)' }}>
                    {value}
                  </div>
                </div>
              ))}
            </div>
            </div>
          </div>

          {/* Embarkation note */}
          <div
            className="rounded-r-xl p-5 mb-10"
            style={{ background: 'rgba(243,156,18,0.08)', borderLeft: '3px solid var(--sunset)' }}
          >
            <p className="text-sm leading-relaxed" style={{ color: '#4a5c6e' }}>
              <strong style={{ color: 'var(--navy)' }}>Embarkation port:</strong> {cruiseData.embarkationNote}
            </p>
          </div>

          {/* ── ITINERARY TIMELINE ─────────────────────────────────── */}
          <div className="space-y-0">
            {cruiseData.ports.map((port, index) => {
              const isHighlight = 'highlight' in port && port.highlight;
              const portExcursions = port.excursions.filter((exc) => exc.families.includes(family));
              const isLast = index === cruiseData.ports.length - 1;

              return (
                <div key={index} className="flex gap-5">
                  {/* Timeline marker */}
                  <div className="flex flex-col items-center flex-shrink-0" style={{ width: '50px' }} aria-hidden="true">
                    <div
                      className="rounded-full flex-shrink-0 z-10"
                      style={{
                        width: isHighlight ? '18px' : '14px',
                        height: isHighlight ? '18px' : '14px',
                        background: isHighlight ? 'var(--sunset)' : 'var(--azure)',
                        boxShadow: `0 0 0 3px var(--cream), 0 0 0 5px ${isHighlight ? 'var(--sunset)' : 'var(--azure)'}`,
                        marginTop: '4px',
                      }}
                    />
                    {!isLast && (
                      <div
                        className="flex-1"
                        style={{
                          width: '2px',
                          background: 'linear-gradient(to bottom, var(--azure), rgba(46,134,193,0.15))',
                          minHeight: '32px',
                        }}
                      />
                    )}
                  </div>

                  {/* Port content */}
                  <div className="flex-1 pb-8">
                    <p className="text-xs uppercase tracking-widest font-semibold mb-1" style={{ color: 'var(--azure)' }}>
                      Day {port.day} · {port.date}
                    </p>
                    <h3
                      className="text-xl font-bold mb-1"
                      style={{
                        fontFamily: 'var(--font-playfair)',
                        color: isHighlight ? 'var(--sunset)' : 'var(--navy)',
                        fontSize: isHighlight ? '1.4rem' : undefined,
                      }}
                    >
                      {port.port}
                    </h3>
                    {'time' in port && port.time && (
                      <p className="text-sm mb-2" style={{ color: '#6b7d8e' }}>{port.time}</p>
                    )}
                    <p className="text-sm leading-relaxed mb-3" style={{ color: '#4a5c6e' }}>{port.description}</p>

                    {/* Kid highlight */}
                    {family === 'boyle' && 'kidHighlight' in port && port.kidHighlight && (
                      <div
                        className="rounded-xl px-4 py-3 mb-3 flex items-start gap-2"
                        style={{ background: 'rgba(243,156,18,0.10)', border: '1px solid rgba(243,156,18,0.25)' }}
                      >
                        <span aria-hidden="true" className="flex-shrink-0 text-lg">⭐</span>
                        <p className="text-sm font-medium leading-snug" style={{ color: 'var(--navy)' }}>
                          <span className="text-xs uppercase tracking-wider font-bold mr-2" style={{ color: 'var(--sunset)' }}>Kids:</span>
                          {(port as { kidHighlight: string }).kidHighlight}
                        </p>
                      </div>
                    )}

                    {/* Destination image */}
                    {'image' in port && port.image && (
                      <img
                        src={port.image}
                        alt={port.port}
                        loading="lazy"
                        className="w-full rounded-2xl mb-4"
                        style={{ maxHeight: '300px', objectFit: 'cover', boxShadow: '0 8px 30px rgba(10,22,40,0.08)' }}
                      />
                    )}

                    {/* Excursion cards */}
                    {portExcursions.length > 0 && (
                      <div className="space-y-3 mt-2">
                        <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: 'var(--azure)' }}>
                          Booked Excursions
                        </p>
                        {portExcursions.map((exc, excIdx) => {
                          const isBothFamilies = exc.families.length > 1;
                          const accentColor = isBothFamilies ? 'var(--azure)' : 'var(--sunset)';
                          const excImages = 'images' in exc ? (exc as { images: { url: string; caption: string }[] }).images : [];
                          const excVideo = 'video' in exc ? (exc as { video?: string }).video : undefined;
                          const excNotes = 'notes' in exc ? (exc as { notes?: string[] }).notes : undefined;
                          const excTips = 'tips' in exc ? (exc as { tips?: string[] }).tips : undefined;
                          return (
                            <div
                              key={excIdx}
                              className="bg-white rounded-xl overflow-hidden"
                              style={{
                                borderLeft: `3px solid ${accentColor}`,
                                boxShadow: '0 4px 16px rgba(10,22,40,0.06)',
                              }}
                            >
                              <div className="p-5">
                                {'label' in exc && exc.label && (
                                  <p
                                    className="text-xs uppercase tracking-widest font-semibold mb-1"
                                    style={{ color: accentColor }}
                                  >
                                    {exc.label}
                                  </p>
                                )}
                                <h4
                                  className="font-bold mb-1"
                                  style={{ fontFamily: 'var(--font-playfair)', color: 'var(--navy)', fontSize: '1.05rem' }}
                                >
                                  {exc.name}
                                </h4>
                                <p className="text-sm mb-2" style={{ color: '#6b7d8e' }}>{exc.duration}</p>
                                <p className="text-sm leading-relaxed" style={{ color: '#4a5c6e' }}>
                                  {exc.description}
                                </p>
                              </div>

                              {/* Excursion photo grid */}
                              {excImages.length > 0 && (
                                <div
                                  className="grid gap-2 px-5 pb-4"
                                  style={{ gridTemplateColumns: `repeat(${Math.min(excImages.length, 3)}, 1fr)` }}
                                >
                                  {excImages.map((img) => (
                                    <div key={img.url} className="relative overflow-hidden rounded-xl">
                                      <img
                                        src={img.url}
                                        alt={img.caption}
                                        loading="lazy"
                                        className="w-full object-cover"
                                        style={{ height: '180px' }}
                                      />
                                      <div
                                        className="absolute bottom-0 left-0 right-0 px-2 py-1"
                                        style={{
                                          background: 'rgba(10,22,40,0.55)',
                                          color: 'rgba(255,255,255,0.9)',
                                          backdropFilter: 'blur(4px)',
                                          fontSize: '0.65rem',
                                          lineHeight: '1.3',
                                        }}
                                      >
                                        {img.caption}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Excursion notes */}
                              {excNotes && excNotes.length > 0 && (
                                <div
                                  className="mx-5 mb-4 rounded-xl p-4"
                                  style={{ background: 'rgba(243,156,18,0.08)', borderLeft: '3px solid var(--sunset)' }}
                                >
                                  <p className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: 'var(--sunset)' }}>
                                    Just so you know
                                  </p>
                                  <ul className="space-y-1.5">
                                    {excNotes.map((note, ni) => (
                                      <li key={ni} className="text-xs flex items-start gap-2" style={{ color: '#4a5c6e' }}>
                                        <span className="flex-shrink-0 mt-0.5" style={{ color: 'var(--sunset)' }}>→</span>
                                        {note}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Travel tips */}
                              {excTips && excTips.length > 0 && (
                                <div
                                  className="mx-5 mb-4 rounded-xl p-4"
                                  style={{ background: 'rgba(26,82,118,0.07)', borderLeft: '3px solid var(--ocean)' }}
                                >
                                  <p className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: 'var(--ocean)' }}>
                                    Travel tips
                                  </p>
                                  <ul className="space-y-1.5">
                                    {excTips.map((tip, ti) => (
                                      <li key={ti} className="text-xs flex items-start gap-2" style={{ color: '#4a5c6e' }}>
                                        <span className="flex-shrink-0 mt-0.5" style={{ color: 'var(--ocean)' }}>✦</span>
                                        {tip}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Excursion video */}
                              {excVideo && (
                                <div className="px-5 pb-5">
                                  <p className="text-xs uppercase tracking-widest font-semibold mb-2" style={{ color: '#6b7d8e' }}>
                                    See it for yourself
                                  </p>
                                  <VideoEmbed videoId={excVideo} title={`${exc.name} video`} />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── LIFE ONBOARD ──────────────────────────────────────────────── */}
        <section id="onboard">
          <p className="text-xs uppercase tracking-[5px] mb-2" style={{ color: 'var(--azure)', fontWeight: 600 }}>Life Onboard</p>
          <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--navy)' }}>
            The Marella Explorer
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: '#3a4a5c', maxWidth: '700px' }}>
            {lob.intro}
          </p>

          {/* Dining card */}
          <div
            className="rounded-2xl p-8 mb-4 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, var(--deep-blue), var(--ocean))' }}
          >
            <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-playfair)' }}>
              Dining — You&apos;re Spoilt for Choice
            </h3>
            <p className="text-sm mb-5" style={{ color: 'var(--sky-blue)', fontWeight: 300 }}>
              11 dining experiences — 7 included, 4 speciality restaurants
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
              {lob.dining.map((item) => (
                <div key={item.name} className="flex items-start gap-2">
                  <span
                    className="flex-shrink-0 mt-0.5 text-xs px-1.5 py-0.5 rounded font-medium"
                    style={{
                      background: (item as { included: boolean }).included ? 'rgba(26,82,118,0.15)' : 'rgba(192,57,43,0.18)',
                      color: (item as { included: boolean }).included ? 'var(--ocean)' : '#c0392b',
                    }}
                  >
                    {(item as { included: boolean }).included ? '✓' : '£'}
                  </span>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--sky-blue)' }}>
                    <strong className="text-white">{item.name}</strong>
                    {' '}<span style={{ opacity: 0.7 }}>{(item as { type: string }).type}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Restaurant Carousel */}
          <RestaurantCarousel dining={lob.dining as Parameters<typeof RestaurantCarousel>[0]['dining']} />

          {/* Dining tips */}
          <div
            className="rounded-r-xl p-5 mb-6"
            style={{ background: 'rgba(46,134,193,0.07)', borderLeft: '3px solid var(--azure)' }}
          >
            <p className="text-sm font-semibold mb-3" style={{ color: 'var(--navy)' }}>Dining tips:</p>
            <ul className="space-y-2">
              {lob.diningTips.map((tip, i) => (
                <li key={i} className="text-sm flex items-start gap-2" style={{ color: '#4a5c6e' }}>
                  <span className="flex-shrink-0 mt-0.5" style={{ color: 'var(--azure)' }}>→</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Entertainment Carousel */}
          <div className="mb-2">
            <p className="text-xs uppercase tracking-[5px] mb-1" style={{ color: 'var(--azure)', fontWeight: 600 }}>Entertainment & Nightlife</p>
            <h3 className="text-2xl font-bold mb-1" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--navy)' }}>
              11 Venues — Something Every Hour
            </h3>
            <p className="text-sm mb-4" style={{ color: '#3a4a5c' }}>
              From West End theatre and a British pub to a casino, speakeasy, and open-air cinema under the stars.
            </p>
          </div>
          <CardCarousel
            items={(lob as any).entertainmentVenues}
            accentColor="var(--azure)"
          />

          {/* Ship Facilities Carousel */}
          <div className="mb-2">
            <p className="text-xs uppercase tracking-[5px] mb-1" style={{ color: 'var(--azure)', fontWeight: 600 }}>Ship Facilities</p>
            <h3 className="text-2xl font-bold mb-1" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--navy)' }}>
              Pools, Spa, Gym & More
            </h3>
            <p className="text-sm mb-4" style={{ color: '#3a4a5c' }}>
              Pool deck, Champneys spa, kids clubs for all ages, minigolf, gym, and the adults-only Veranda.
            </p>
          </div>
          <CardCarousel
            items={(lob as any).shipFacilities}
            accentColor="var(--ocean)"
          />

          {/* All-inclusive note */}
          <div
            className="rounded-r-xl p-5 mb-8"
            style={{ background: 'rgba(243,156,18,0.08)', borderLeft: '3px solid var(--sunset)' }}
          >
            <p className="text-sm leading-relaxed" style={{ color: '#4a5c6e' }}>
              <strong style={{ color: 'var(--navy)' }}>Premium All Inclusive:</strong> {lob.inclusiveNote}
            </p>
          </div>

          {/* Ship tour videos */}
          <h3
            className="text-xl font-bold mb-2"
            style={{ fontFamily: 'var(--font-playfair)', color: 'var(--navy)' }}
          >
            Take a look around
          </h3>
          <p className="text-sm mb-4" style={{ color: '#4a5c6e' }}>
            Want to see what the ship looks like before you board? Here&apos;s a full walkthrough tour:
          </p>
          <div className="rounded-2xl overflow-hidden mb-6" style={{ boxShadow: '0 12px 40px rgba(10,22,40,0.12)' }}>
            <VideoEmbed videoId={cruiseData.shipTourVideo} title="Marella Explorer Ship Tour" />
          </div>

          {/* Additional ship tour videos */}
          {'facilityVideos' in lob && (lob as { facilityVideos: { id: string; title: string; desc: string }[] }).facilityVideos.length > 0 && (
            <div className="grid md:grid-cols-2 gap-4">
              {(lob as { facilityVideos: { id: string; title: string; desc: string }[] }).facilityVideos.map((vid) => (
                <div key={vid.id}>
                  <p className="text-sm font-semibold mb-2" style={{ color: 'var(--navy)' }}>{vid.title}</p>
                  <p className="text-xs mb-3" style={{ color: '#6b7d8e' }}>{vid.desc}</p>
                  <div className="rounded-xl overflow-hidden" style={{ boxShadow: '0 8px 24px rgba(10,22,40,0.08)' }}>
                    <VideoEmbed videoId={vid.id} title={vid.title} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── YOUR CABIN ────────────────────────────────────────────────── */}
        <section id="cabin">
          <p className="text-xs uppercase tracking-[5px] mb-2" style={{ color: 'var(--azure)', fontWeight: 600 }}>Your Cabin</p>
          <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--navy)' }}>
            Where You&apos;ll Be Sleeping
          </h2>
          <p className="text-base leading-relaxed mb-6" style={{ color: '#3a4a5c', maxWidth: '680px' }}>
            {family === 'boyle'
              ? "You have a balcony cabin with Suite Service — so you'll have your own private outdoor space to enjoy morning coffee or watch the sunset, plus some lovely extra perks."
              : 'Your cabin details are listed below.'}
          </p>

          {cabinImages && cabinImages.length > 0 && (
            <div className="rounded-2xl overflow-hidden mb-6 shadow-sm">
              <HotelCarousel
                images={cabinImages}
                alt={`${familyData.cabin.type} cabin image`}
              />
            </div>
          )}

          <div className="bg-white rounded-2xl overflow-hidden mb-4" style={{ boxShadow: '0 8px 30px rgba(10,22,40,0.08)' }}>
            <div className="p-6 md:p-8">
              <div className="text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--azure)' }}>
                {familyData.name}
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--navy)' }}>
                {familyData.cabin.type}
              </h3>
              <ul className="space-y-2 mb-0">
                {familyData.cabin.details.map((d, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm pb-2" style={{ color: '#4a5c6e', borderBottom: '1px solid rgba(10,22,40,0.04)' }}>
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: 'var(--azure)' }} />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {familyData.cabin.perks.length > 0 && (
            <div
              className="rounded-r-xl p-5 mb-4"
              style={{ background: 'rgba(243,156,18,0.08)', borderLeft: '3px solid var(--sunset)' }}
            >
              <p className="text-sm font-semibold mb-3" style={{ color: 'var(--navy)' }}>Suite Service perks:</p>
              <ul className="space-y-1">
                {familyData.cabin.perks.map((perk, i) => (
                  <li key={i} className="text-sm flex items-start gap-2" style={{ color: '#4a5c6e' }}>
                    <span style={{ color: 'var(--sunset)' }}>✓</span> {perk}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div
            className="rounded-r-xl p-5"
            style={{ background: 'rgba(46,134,193,0.07)', borderLeft: '3px solid var(--azure)' }}
          >
            <p className="text-sm leading-relaxed" style={{ color: '#4a5c6e' }}>
              <strong style={{ color: 'var(--navy)' }}>The Navigate app:</strong> {familyData.cabin.navigateNote}
            </p>
          </div>
        </section>

        {/* ── HOTEL (BOYLE ONLY) ─────────────────────────────────────────── */}
        {family === 'boyle' && familyData.hotel && (
          <section id="hotel">
            <p className="text-xs uppercase tracking-[5px] mb-2" style={{ color: 'var(--azure)', fontWeight: 600 }}>
              Part Two · Boyle Family Only
            </p>
            <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--navy)' }}>
              A Week in the Majorcan Sun
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: '#3a4a5c', maxWidth: '680px' }}>
              After the cruise, Mark, Marion, Clodagh and Meabh are staying on for seven nights at a stunning 5-star
              resort on Majorca&apos;s east coast. All Inclusive, Junior Suite, big terrace — the full works.
            </p>

            <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: '0 20px 60px rgba(10,22,40,0.08)' }}>
              {/* Hotel image + header */}
              <div style={{ background: 'linear-gradient(135deg, var(--sand), var(--warm-sand))', position: 'relative' }}>
                <HotelCarousel images={familyData.hotel.images} alt={familyData.hotel.name} />
                <div className="px-8 py-6" style={{ position: 'relative' }}>
                  <span className="absolute right-6 top-4 text-4xl" style={{ opacity: 0.25 }} aria-hidden="true">☀</span>
                  <div className="text-lg tracking-widest mb-1" style={{ color: 'var(--sunset)', letterSpacing: '4px' }}>
                    {'★'.repeat(familyData.hotel.stars)}
                  </div>
                  <h3 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--navy)' }}>
                    {familyData.hotel.name}
                  </h3>
                  <p className="text-sm font-medium mt-1" style={{ color: 'var(--ocean)' }}>{familyData.hotel.location}</p>
                </div>
              </div>
              {/* Hotel details */}
              <div className="p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Check-in', value: familyData.hotel.checkIn },
                  { label: 'Check-out', value: familyData.hotel.checkOut },
                  { label: 'Room', value: familyData.hotel.room },
                  { label: 'Board', value: familyData.hotel.board },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div className="text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--azure)' }}>{label}</div>
                    <div className="text-sm font-semibold" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--navy)' }}>{value}</div>
                  </div>
                ))}
              </div>

              {/* Location & things to do */}
              {'location_info' in familyData.hotel && (() => {
                const loc = (familyData.hotel as any).location_info;
                return (
                  <div className="px-6 md:px-8 pb-8">
                    <p className="text-xs uppercase tracking-[5px] mb-2 mt-2" style={{ color: 'var(--azure)', fontWeight: 600 }}>Location</p>
                    <h4 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--navy)' }}>
                      Sa Coma, East Majorca
                    </h4>
                    <p className="text-sm leading-relaxed mb-2" style={{ color: '#4a5c6e' }}>{loc.overview}</p>
                    <p className="text-xs mb-6" style={{ color: '#5a6e7e' }}>
                      <span aria-hidden="true">✈️ </span>{loc.distance}
                    </p>

                    {/* Highlights grid */}
                    <p className="text-xs uppercase tracking-[4px] mb-3 font-semibold" style={{ color: 'var(--azure)' }}>What to do nearby</p>
                    <div className="grid md:grid-cols-2 gap-3 mb-6">
                      {loc.highlights.map((h: { name: string; distance: string; icon: string; desc: string }) => (
                        <div
                          key={h.name}
                          className="rounded-xl p-4"
                          style={{ background: 'rgba(250,248,243,0.8)', border: '1px solid rgba(10,22,40,0.07)' }}
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-xl flex-shrink-0" aria-hidden="true">{h.icon}</span>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <p className="font-semibold text-sm" style={{ color: 'var(--navy)' }}>{h.name}</p>
                                <span
                                  className="text-xs px-2 py-0.5 rounded-full"
                                  style={{ background: 'rgba(46,134,193,0.1)', color: 'var(--ocean)' }}
                                >
                                  {h.distance}
                                </span>
                              </div>
                              <p className="text-xs leading-relaxed" style={{ color: '#4a5c6e' }}>{h.desc}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tips */}
                    <div
                      className="rounded-r-xl p-5"
                      style={{ background: 'rgba(46,134,193,0.07)', borderLeft: '3px solid var(--azure)' }}
                    >
                      <p className="text-sm font-semibold mb-3" style={{ color: 'var(--navy)' }}>Useful tips:</p>
                      <ul className="space-y-2">
                        {loc.tips.map((tip: string, i: number) => (
                          <li key={i} className="text-sm flex items-start gap-2" style={{ color: '#4a5c6e' }}>
                            <span className="flex-shrink-0 mt-0.5" style={{ color: 'var(--azure)' }}>→</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })()}

              {/* Hotel video */}
              {'video' in familyData.hotel && familyData.hotel.video && (
                <div className="px-6 md:px-8 pb-8">
                  <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: 'var(--azure)' }}>
                    Take a look around
                  </p>
                  <div className="rounded-2xl overflow-hidden" style={{ boxShadow: '0 12px 40px rgba(10,22,40,0.1)' }}>
                    <VideoEmbed videoId={familyData.hotel.video as string} title={`${familyData.hotel.name} video`} />
                  </div>
                </div>
              )}
            </div>

            {/* ── HOTEL DINING ────────────────────────────────── */}
            {'dining' in familyData.hotel && (familyData.hotel as any).dining?.length > 0 && (
              <div className="mt-10">
                <div
                  className="rounded-2xl p-8 mb-4 relative overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, #3d2600, #8b5e00)' }}
                >
                  <span className="absolute right-6 top-5 text-5xl" style={{ opacity: 0.12 }} aria-hidden="true">🍽️</span>
                  <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-playfair)' }}>
                    Dining — 7 Restaurants, 8 Bars
                  </h3>
                  <p className="text-sm mb-5" style={{ color: 'var(--warm-sand)', fontWeight: 300 }}>
                    All Inclusive, 24 hours a day — Italian, Indian, Oriental, buffet, poolside and more
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                    {(familyData.hotel as any).dining.map((item: { name: string; type: string; included: boolean }) => (
                      <div key={item.name} className="flex items-start gap-2">
                        <span
                          className="flex-shrink-0 mt-0.5 text-xs px-1.5 py-0.5 rounded font-medium"
                          style={{ background: 'rgba(232,201,146,0.2)', color: 'var(--warm-sand)' }}
                        >
                          ✓
                        </span>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--warm-sand)' }}>
                          <strong className="text-white">{item.name}</strong>
                          {' '}<span style={{ opacity: 0.65 }}>{item.type}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <RestaurantCarousel dining={(familyData.hotel as any).dining} />

                {'diningNote' in familyData.hotel && (
                  <div
                    className="rounded-r-xl p-5 mb-6"
                    style={{ background: 'rgba(243,156,18,0.08)', borderLeft: '3px solid var(--sunset)' }}
                  >
                    <p className="text-sm leading-relaxed" style={{ color: '#4a5c6e' }}>
                      <strong style={{ color: 'var(--navy)' }}>Good to know:</strong> {(familyData.hotel as any).diningNote}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* ── HOTEL POOLS & FACILITIES ────────────────────── */}
            {'facilities' in familyData.hotel && (familyData.hotel as any).facilities?.length > 0 && (
              <div className="mt-8">
                <p className="text-xs uppercase tracking-[5px] mb-1" style={{ color: 'var(--azure)', fontWeight: 600 }}>Pools &amp; Facilities</p>
                <h3 className="text-2xl font-bold mb-1" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--navy)' }}>
                  5 Pools, Spa &amp; More
                </h3>
                <p className="text-sm mb-4" style={{ color: '#3a4a5c' }}>
                  Family splash zone, adults' pool with Jacuzzi, swim-up bar, kids' pool with turtle jets, and the BLUE® Spa hydrothermal circuit.
                </p>
                <CardCarousel items={(familyData.hotel as any).facilities} accentColor="var(--ocean)" />
              </div>
            )}

            {/* ── HOTEL ENTERTAINMENT ─────────────────────────── */}
            {'entertainment' in familyData.hotel && (familyData.hotel as any).entertainment?.length > 0 && (
              <div className="mt-8">
                <p className="text-xs uppercase tracking-[5px] mb-1" style={{ color: 'var(--azure)', fontWeight: 600 }}>Entertainment &amp; Activities</p>
                <h3 className="text-2xl font-bold mb-1" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--navy)' }}>
                  7 Nights of Shows &amp; Kids' Clubs
                </h3>
                <p className="text-sm mb-4" style={{ color: '#3a4a5c' }}>
                  Nightly live entertainment, Kids' Club, teen activities, family sensory experiences, and even a resident robot.
                </p>
                <CardCarousel items={(familyData.hotel as any).entertainment} accentColor="var(--sunset)" />
              </div>
            )}

          </section>
        )}

        {/* ── FLIGHTS ───────────────────────────────────────────────────── */}
        <section id="flights">
          <p className="text-xs uppercase tracking-[5px] mb-2" style={{ color: 'var(--azure)', fontWeight: 600 }}>Getting There &amp; Back</p>
          <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--navy)' }}>Flights</h2>
          <p className="text-base leading-relaxed mb-6" style={{ color: '#3a4a5c' }}>
            Everyone flies from Belfast George Best City Airport with British Airways.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {familyFlights.map((flight, i) => {
              const isReturn = flight.type !== 'Outbound';
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6"
                  style={{
                    borderLeft: `4px solid ${isReturn ? 'var(--sunset)' : 'var(--azure)'}`,
                    boxShadow: '0 8px 30px rgba(10,22,40,0.06)',
                  }}
                >
                  <p
                    className="text-xs uppercase tracking-widest font-semibold mb-4"
                    style={{ color: isReturn ? 'var(--sunset)' : 'var(--azure)' }}
                  >
                    {flight.type === 'Outbound' ? `Outbound · ${flight.date}` : `Return · ${flight.date}`}
                  </p>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl font-bold" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--navy)' }}>
                      {flight.from}
                    </span>
                    <span style={{ color: 'var(--sky-blue)', fontSize: '1.2rem' }}>✈ →</span>
                    <span className="text-3xl font-bold" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--navy)' }}>
                      {flight.to}
                    </span>
                  </div>
                  <p className="text-sm leading-loose" style={{ color: '#6b7d8e' }}>
                    <strong style={{ color: 'var(--navy)' }}>{flight.flight}</strong> · {flight.airline}<br />
                    Departs {flight.departure} → Arrives {flight.arrival}
                  </p>
                </div>
              );
            })}
          </div>

          <div
            className="rounded-r-xl p-5"
            style={{ background: 'rgba(243,156,18,0.08)', borderLeft: '3px solid var(--sunset)' }}
          >
            <p className="text-sm leading-relaxed" style={{ color: '#4a5c6e' }}>
              <strong style={{ color: 'var(--navy)' }}>Airport check-in:</strong> Online check-in is not available for
              these flights — you&apos;ll need to check in at the airport. Arrive at least 2 hours before departure.
              Each passenger has 20kg hold luggage and 10kg hand luggage.
            </p>
          </div>
        </section>

        {/* ── TRAVEL CONSULTANT'S ADVICE ───────────────────────────────── */}
        {'consultantAdvice' in familyData && (familyData as any).consultantAdvice?.length > 0 && (
          <section id="advice">
            <p className="text-xs uppercase tracking-[5px] mb-2" style={{ color: 'var(--azure)', fontWeight: 600 }}>Expert Advice</p>
            <h2 className="text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--navy)' }}>
              Travel Consultant's Notes
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: '#3a4a5c', maxWidth: '680px' }}>
              A few tips from someone who knows these places well — the things that make the difference between a good holiday and a great one.
            </p>
            <div className="space-y-5">
              {(familyData as any).consultantAdvice.map((tip: { heading: string; body: string }, i: number) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6"
                  style={{ boxShadow: '0 4px 20px rgba(10,22,40,0.06)', borderLeft: '3px solid var(--azure)' }}
                >
                  <h3 className="font-bold mb-2" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--navy)', fontSize: '1.05rem' }}>
                    {tip.heading}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#4a5c6e' }}>{tip.body}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── PRE-HOLIDAY CHECKLIST ─────────────────────────────────────── */}
        <section id="checklist">
          <p className="text-xs uppercase tracking-[5px] mb-2" style={{ color: 'var(--azure)', fontWeight: 600 }}>Before You Go</p>
          <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'var(--font-playfair)', color: 'var(--navy)' }}>
            Things to Remember
          </h2>

          <div
            className="rounded-2xl p-8"
            style={{ background: 'linear-gradient(135deg, var(--deep-blue), var(--ocean))' }}
          >
            <h3 className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
              Pre-Holiday Checklist
            </h3>
            <InteractiveChecklist items={checklist} storageKey={`checklist-${family}`} />
          </div>
        </section>

      </main>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer
        className="text-center py-16 px-4 mt-10"
        style={{ background: 'var(--navy)', color: 'var(--sky-blue)', fontWeight: 300, letterSpacing: '1px' }}
      >
        <div className="text-4xl mb-4" aria-hidden="true">🚢</div>
        <p className="text-base">Not long now — let the countdown begin!</p>
        <p className="text-xs mt-2" style={{ opacity: 0.4 }}>Holiday Summary · July 2026</p>
      </footer>
      <BackToTop />
    </div>
  );
}

export async function generateStaticParams() {
  return [
    { family: 'boyle' },
    { family: 'ferris' }
  ];
}
