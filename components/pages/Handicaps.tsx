'use client';
import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
import { useState } from 'react'
import { handicaps } from '../data/handicaps'
import { bonnesPratiques } from '../data/bonnesPratiques'
import BtnPrimary from '../BtnPrimary'

// ── Icônes ───────────────────────────────────────────────────────────────
const HANDICAP_ICONS: Record<string, string> = {
  auditif:       '/Auditif 1.png',
  moteur:        '/Moteur 1.png',
  visuel:        '/Visuel 1.png',
  autisme:       '/Déficience intellectuelle 1.png',
  psychologique: '/Troubles psychiques 1.png',
  invisibles:    '/Déficience intellectuelle 1.png',
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
      <section style={{
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
        {HERO_FLOATS.map((f, i) => (
          <div key={i} style={{ position: 'absolute', left: f.left, top: f.top, transform: `rotate(${f.rotate}deg)`, pointerEvents: 'none' }}>
            <HandicapIcon slug={f.slug} size={160} />
          </div>
        ))}

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

// ── BP row (client — hover state) ─────────────────────────────────────────
function BpRow({ bp }: { bp: NonNullable<ReturnType<typeof bonnesPratiques.find>> }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 24,
        paddingTop: 24,
        paddingBottom: 24,
        borderBottom: '1px solid #3b3b39',
        background: hovered ? 'rgba(113,113,113,0.05)' : 'transparent',
        transition: 'background 0.15s',
      }}
    >
      {/* Title + description */}
      <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <p style={{ fontFamily: 'var(--font)', fontSize: 24, fontWeight: 500, lineHeight: 1.1, color: '#F1EDF5', margin: 0 }}>
          {bp.titre}
        </p>
        <p style={{ fontFamily: 'var(--font)', fontSize: 18, fontWeight: 400, lineHeight: 1.2, color: '#F1EDF5', margin: 0 }}>
          {bp.resume}
        </p>
      </div>
      {/* En savoir plus */}
      <BtnPrimary href={`/s-informer/bonnes-pratiques/${bp.slug}`} label="En savoir plus" style={{ flexShrink: 0 }} />
    </div>
  )
}

// ── Détail ────────────────────────────────────────────────────────────────
export function HandicapsDetail({ slug }: { slug: string }) {
  const index = handicaps.findIndex((h) => h.slug === slug)
  if (index === -1) return null
  const handicap = handicaps[index]
  const prev = handicaps[(index - 1 + handicaps.length) % handicaps.length]
  const next = handicaps[(index + 1) % handicaps.length]

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
      }}>
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
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', width: '100%' }}>
            <h2 style={{
              fontFamily: 'var(--font-title)',
              fontSize: 40,
              fontWeight: 400,
              color: '#F1EDF5',
              textTransform: 'uppercase',
              lineHeight: 1,
              margin: 0,
              width: 467,
            }}>
              Les bonnes pratiques{'\n'}pour ce profil
            </h2>
          </div>

          {/* BP list */}
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            {bps.map((bp) => (
              <BpRow key={bp.id} bp={bp} />
            ))}
          </div>
        </div>

        {/* ── Prev / next ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 950, maxWidth: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <span style={{ fontFamily: 'var(--font)', fontSize: 18, fontWeight: 600, lineHeight: 1, color: '#F1EDF5' }}>Profil précédent</span>
            <span style={{ fontFamily: 'var(--font)', fontSize: 18, fontWeight: 600, lineHeight: 1, color: '#F1EDF5' }}>Profil suivant</span>
          </div>
          <div style={{ display: 'flex', width: '100%' }}>
            {/* Prev */}
            <Link
              href={`/handicaps/${prev.slug}`}
              style={{
                flex: '1 0 0',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                minHeight: 200,
                padding: '40px 40px 40px 0',
                borderRight: '1px solid #3b3b39',
                textDecoration: 'none',
                justifyContent: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <HandicapIcon slug={prev.slug} size={56} />
                <span style={{ fontFamily: 'var(--font-title)', fontSize: 'clamp(2rem, 3.5vw, 3.5rem)', fontWeight: 400, color: '#F1EDF5', textTransform: 'uppercase', lineHeight: 1 }}>
                  {prev.nom}
                </span>
              </div>
              <p style={{ fontFamily: 'var(--font)', fontSize: 18, fontWeight: 400, lineHeight: 1.2, color: '#F1EDF5', margin: 0 }}>
                {prev.realite}
              </p>
            </Link>
            {/* Next */}
            <Link
              href={`/handicaps/${next.slug}`}
              style={{
                flex: '1 0 0',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                minHeight: 200,
                padding: '40px 0 40px 40px',
                textDecoration: 'none',
                justifyContent: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <HandicapIcon slug={next.slug} size={56} />
                <span style={{ fontFamily: 'var(--font-title)', fontSize: 'clamp(2rem, 3.5vw, 3.5rem)', fontWeight: 400, color: '#F1EDF5', textTransform: 'uppercase', lineHeight: 1 }}>
                  {next.nom}
                </span>
              </div>
              <p style={{ fontFamily: 'var(--font)', fontSize: 18, fontWeight: 400, lineHeight: 1.2, color: '#F1EDF5', margin: 0 }}>
                {next.realite}
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
