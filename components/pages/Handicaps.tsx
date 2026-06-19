'use client';
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from '@phosphor-icons/react/dist/ssr'
import { useState, useRef, useEffect } from 'react'
import { handicaps } from '../data/handicaps'
import { bonnesPratiques } from '../data/bonnesPratiques'
import BtnPrimary from '../BtnPrimary'

// ── Icônes ───────────────────────────────────────────────────────────────
const HANDICAP_ICONS: Record<string, string> = {
  auditif:       '/auditif.png',
  moteur:        '/moteur.png',
  visuel:        '/visuel.png',
  autisme:       '/troubles-autistiques.png',
  psychologique: '/troubles-psychiques.png',
  invisibles:    '/deficience-intellectuelle.png',
}

function HandicapIcon({ slug, size = 56 }: { slug: string; size?: number }) {
  const src = HANDICAP_ICONS[slug]
  if (!src) return null
  return (
    <img src={src} alt="" aria-hidden style={{ width: size, height: size, objectFit: 'contain', flexShrink: 0, pointerEvents: 'none' }} />
  )
}

// ── Hero floats ───────────────────────────────────────────────────────────
const HERO_FLOATS: Array<{ slug: string; left: string; top: number; rotate: number }> = [
  { slug: 'visuel',        left: 'calc(16.67% + 28.83px)',  top: 142,    rotate: 13.61  },
  { slug: 'moteur',        left: 'calc(16.67% + 93px)',     top: 308.12, rotate: -12.42 },
  { slug: 'autisme',       left: 'calc(75% + 5.73px)',      top: 149.61, rotate: 16.06  },
  { slug: 'auditif',       left: 'calc(8.33% + 37.37px)',   top: 390.3,  rotate: -4.49  },
  { slug: 'invisibles',    left: 'calc(75% + 80.43px)',     top: 376.29, rotate: 5.79   },
  { slug: 'psychologique', left: 'calc(66.67% + 41px)',     top: 305.46, rotate: -6.04  },
]

// ── Index ─────────────────────────────────────────────────────────────────
export function HandicapsIndex() {
  const heroRef = useRef<HTMLElement>(null)
  const [heroVisible, setHeroVisible] = useState(false)
  useEffect(() => {
    const el = heroRef.current; if (!el) return
    let observer: IntersectionObserver
    const timer = setTimeout(() => {
      observer = new IntersectionObserver(([entry]) => { setHeroVisible(entry.isIntersecting) }, { threshold: 0.15 })
      observer.observe(el)
    }, 400)
    return () => { clearTimeout(timer); observer?.disconnect() }
  }, [])
  return (
    <>
      <style>{`
        .hc-page-card { transition: background 0.2s; }
        .hc-page-card:hover { background: rgba(113, 113, 113, 0.1); }
        .hc-page-btn {
          position: absolute;
          bottom: 20px;
          right: 20px;
          width: 40px;
          height: 40px;
          background: #A122E2;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.2s ease, transform 0.2s ease;
          pointer-events: none;
        }
        .hc-page-card:hover .hc-page-btn {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {/* ── Hero ── */}
      <section ref={heroRef} style={{
        background: '#101010',
        paddingTop: 240,
        paddingBottom: 120,
        paddingLeft: 40,
        paddingRight: 40,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {HERO_FLOATS.map((f, i) => {
          const delay = (i % 3) * 150
          return (
            <div key={i} style={{
              position: 'absolute', left: f.left, top: f.top, pointerEvents: 'none',
              transformOrigin: 'bottom center',
              transform: heroVisible ? `rotate(${f.rotate}deg) scale(1)` : `rotate(${f.rotate * 2}deg) scale(0)`,
              opacity: heroVisible ? 1 : 0,
              transition: `transform 1.2s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, opacity 1s ease ${delay}ms`,
            }}>
              <HandicapIcon slug={f.slug} size={160} />
            </div>
          )
        })}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center', width: 708, maxWidth: '100%', position: 'relative', zIndex: 1 }}>
          <h1 style={{
            fontFamily: 'var(--font-title)',
            fontSize: 80,
            fontWeight: 400,
            color: '#EEE9F3',
            textTransform: 'uppercase',
            lineHeight: 1,
            letterSpacing: 0,
            textAlign: 'center',
            margin: 0,
            width: '100%',
          }}>
            Les différents handicaps
          </h1>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <p style={{
              fontFamily: 'var(--font)',
              fontSize: 18,
              fontWeight: 400,
              lineHeight: 1.1,
              color: '#EEE9F3',
              textAlign: 'center',
              maxWidth: 466,
              margin: 0,
            }}>
              6 profils à connaître pour mieux accueillir. Chaque fiche donne la réalité en contexte festival, les règles de communication et les bonnes pratiques concrètes.
            </p>
          </div>
        </div>
      </section>

      {/* ── Cards grid ── */}
      <section style={{ background: '#101010', paddingBottom: 80, paddingLeft: 40, paddingRight: 40 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {handicaps.map((h, i) => {
            const row = Math.floor(i / 3)
            const col = i % 3
            return (
              <Link
                key={h.slug}
                href={`/handicaps/${h.slug}`}
                className="hc-page-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 24,
                  padding: 40,
                  textDecoration: 'none',
                  position: 'relative',
                  borderRight: col < 2 ? '1px solid #3b3b39' : 'none',
                  borderBottom: row === 0 ? '1px solid #3b3b39' : 'none',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <HandicapIcon slug={h.slug} size={56} />
                    <span style={{
                      fontFamily: 'var(--font-title)',
                      fontSize: 'clamp(2rem, 3.5vw, 3.5rem)',
                      fontWeight: 400,
                      color: '#F1EDF5',
                      textTransform: 'uppercase',
                      lineHeight: 1,
                    }}>
                      {h.nom}
                    </span>
                  </div>
                  <p style={{
                    fontFamily: 'var(--font)',
                    fontSize: 18,
                    fontWeight: 400,
                    lineHeight: 1.2,
                    color: '#F1EDF5',
                    margin: 0,
                  }}>
                    {h.realite}
                  </p>
                </div>
                <span className="hc-page-btn" aria-hidden>
                  <ArrowRight size={16} weight="regular" color="#EEE9F3" />
                </span>
              </Link>
            )
          })}
        </div>
      </section>
    </>
  )
}

// ── BP row ────────────────────────────────────────────────────────────────
function BpRow({ bp }: { bp: NonNullable<ReturnType<typeof bonnesPratiques.find>> }) {
  const [btnHovered, setBtnHovered] = useState(false)
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 24,
      paddingTop: 24,
      paddingBottom: 24,
      borderBottom: '1px solid #3b3b39',
    }}>
      <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={{ fontFamily: 'var(--font)', fontSize: 24, fontWeight: 500, lineHeight: 1.1, color: '#F1EDF5', margin: 0 }}>
          {bp.titre}
        </p>
        <p style={{ fontFamily: 'var(--font)', fontSize: 18, fontWeight: 400, lineHeight: 1.2, color: '#F1EDF5', margin: 0 }}>
          {bp.resume}
        </p>
      </div>
      <Link
        href={`/s-informer/bonnes-pratiques/${bp.slug}`}
        onMouseEnter={() => setBtnHovered(true)}
        onMouseLeave={() => setBtnHovered(false)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 16,
          background: btnHovered ? '#A122E2' : 'transparent',
          border: '1.5px solid',
          borderColor: btnHovered ? '#A122E2' : '#F1EDF5',
          borderRadius: 12,
          paddingLeft: 24,
          paddingRight: 4,
          paddingTop: 4,
          paddingBottom: 4,
          textDecoration: 'none',
          flexShrink: 0,
          transition: 'background 0.2s ease',
          cursor: 'pointer',
        }}
      >
        <span style={{ fontFamily: 'var(--font)', fontSize: 16, fontWeight: 500, color: '#F1EDF5', lineHeight: 1.1, whiteSpace: 'nowrap' }}>
          En savoir plus
        </span>
        <span style={{
          width: 32, height: 32, borderRadius: 8,
          background: btnHovered ? '#EEE9F3' : '#A122E2',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, transition: 'background 0.2s ease',
        }}>
          <ArrowRight size={16} weight="regular" color={btnHovered ? '#A122E2' : '#EEE9F3'} />
        </span>
      </Link>
    </div>
  )
}

// ── Détail ────────────────────────────────────────────────────────────────
export function HandicapsDetail({ slug }: { slug: string }) {
  const [backHovered, setBackHovered] = useState(false)
  const index = handicaps.findIndex((h) => h.slug === slug)
  if (index === -1) return null
  const handicap = handicaps[index]
const bps = handicap.bonnesPratiquesIds
    .map((id) => bonnesPratiques.find((bp) => bp.id === id))
    .filter((bp): bp is NonNullable<typeof bp> => Boolean(bp))

  return (
    <>
      {/* ── Hero ── */}
      <section style={{
        background: '#101010',
        padding: '120px 40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
      }}>
        {/* Bouton retour */}
        <Link
          href="/handicaps"
          onMouseEnter={() => setBackHovered(true)}
          onMouseLeave={() => setBackHovered(false)}
          style={{
            position: 'absolute',
            top: 40,
            left: 40,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 16,
            background: backHovered ? '#A122E2' : 'transparent',
            border: '1.5px solid',
            borderColor: backHovered ? '#A122E2' : '#F1EDF5',
            borderRadius: 12,
            paddingLeft: 4,
            paddingRight: 16,
            paddingTop: 4,
            paddingBottom: 4,
            textDecoration: 'none',
            transition: 'background 0.2s ease',
            cursor: 'pointer',
          }}
        >
          <span style={{
            width: 32, height: 32, borderRadius: 8,
            background: backHovered ? '#EEE9F3' : '#A122E2',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, transition: 'background 0.2s ease',
          }}>
            <ArrowLeft size={16} weight="regular" color={backHovered ? '#A122E2' : '#EEE9F3'} />
          </span>
          <span style={{ fontFamily: 'var(--font)', fontSize: 16, fontWeight: 500, color: '#F1EDF5', lineHeight: 1.1, whiteSpace: 'nowrap' }}>
            Retour
          </span>
        </Link>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center', width: 708, maxWidth: '100%' }}>
          <HandicapIcon slug={slug} size={80} />
          <h1 style={{
            fontFamily: 'var(--font-title)',
            fontSize: 80,
            fontWeight: 400,
            color: '#EEE9F3',
            textTransform: 'uppercase',
            lineHeight: 1,
            letterSpacing: 0,
            textAlign: 'center',
            margin: 0,
          }}>
            {handicap.titreDetail}
          </h1>
          <p style={{
            fontFamily: 'var(--font)',
            fontSize: 18,
            fontWeight: 400,
            lineHeight: 1.1,
            color: '#EEE9F3',
            textAlign: 'center',
            maxWidth: 466,
            margin: 0,
          }}>
            {handicap.realite}
          </p>
        </div>
      </section>

      {/* ── 3 text blocks ── */}
      <section style={{
        background: '#101010',
        paddingBottom: 120,
        paddingLeft: 161,
        paddingRight: 161,
        display: 'flex',
        flexDirection: 'column',
        gap: 64,
        alignItems: 'center',
      }}>
        {handicap.sections.slice(0, 2).map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', width: 950, maxWidth: '100%' }}>
            <div style={{ width: 466, flexShrink: 0, display: 'flex', alignItems: 'center' }}>
              <h2 style={{
                fontFamily: 'var(--font-title)',
                fontSize: 40,
                fontWeight: 400,
                color: '#F1EDF5',
                textTransform: 'uppercase',
                lineHeight: 1,
                margin: 0,
                width: 387,
              }}>
                {s.titre}
              </h2>
            </div>
            <p style={{
              fontFamily: 'var(--font)',
              fontSize: 18,
              fontWeight: 400,
              lineHeight: 1.1,
              color: '#EEE9F3',
              margin: 0,
              width: 466,
              flexShrink: 0,
            }}>
              {s.texte}
            </p>
          </div>
        ))}
      </section>

      {/* ── Bonnes pratiques ── */}
      <section style={{
        background: '#101010',
        paddingBottom: 40,
        paddingLeft: 160,
        paddingRight: 160,
        display: 'flex',
        flexDirection: 'column',
        gap: 80,
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <h2 style={{
              fontFamily: 'var(--font-title)',
              fontSize: 40,
              fontWeight: 400,
              color: '#F1EDF5',
              textTransform: 'uppercase',
              lineHeight: 1,
              margin: 0,
              textAlign: 'center',
              whiteSpace: 'nowrap',
            }}>
              Les bonnes pratiques pour ce profil
            </h2>
          </div>

          {/* BP list */}
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            {bps.map((bp) => (
              <BpRow key={bp.id} bp={bp} />
            ))}
          </div>
        </div>

      </section>
    </>
  )
}
