'use client';
import { useState, useRef, useEffect } from 'react'
import { lois } from '../data/lois'

const tagStyle: React.CSSProperties = {
  background: '#4a0f68',
  borderRadius: 8,
  padding: '8px',
  fontFamily: 'var(--font)',
  fontSize: 14,
  fontWeight: 500,
  color: '#F1EDF5',
  lineHeight: 1,
  whiteSpace: 'nowrap',
}

function LoiCard({ loi }: { loi: typeof lois[0] }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 24,
      paddingTop: 24,
      paddingBottom: 24,
      borderBottom: '1px solid #3b3b39',
    }}>
      <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
        <p style={{
          fontFamily: 'var(--font)',
          fontSize: 24,
          fontWeight: 500,
          lineHeight: 1.1,
          color: '#F1EDF5',
          margin: 0,
        }}>
          {loi.titre}
        </p>
        <p style={{
          fontFamily: 'var(--font)',
          fontSize: 16,
          fontWeight: 400,
          lineHeight: 1.3,
          color: '#9491a1',
          margin: 0,
        }}>
          {loi.contenu}
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <span style={tagStyle}>{loi.source}</span>
        </div>
      </div>

      {/* Bouton non cliquable */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 16,
        background: 'transparent',
        border: '1.5px solid rgba(241,237,245,0.3)',
        borderRadius: 12,
        paddingLeft: 24,
        paddingRight: 4,
        paddingTop: 4,
        paddingBottom: 4,
        flexShrink: 0,
        cursor: 'default',
        opacity: 0.5,
      }}>
        <span style={{ fontFamily: 'var(--font)', fontSize: 16, fontWeight: 500, color: '#F1EDF5', lineHeight: 1.1, whiteSpace: 'nowrap' }}>
          En savoir plus
        </span>
        <span style={{
          width: 32, height: 32, borderRadius: 8,
          background: '#A122E2',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="#EEE9F3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </div>
  )
}

export function LesLois() {
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
      {/* Hero */}
      <section ref={heroRef} style={{
        background: '#101010',
        paddingTop: 240,
        paddingBottom: 120,
        paddingLeft: 40,
        paddingRight: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Illustration gauche */}
        <img
          src="/bp-tableau.png"
          alt=""
          aria-hidden
          style={{
            position: 'absolute',
            left: 'calc(8.33% + 20px)',
            top: 110,
            width: 220,
            objectFit: 'contain',
            pointerEvents: 'none',
            transformOrigin: 'bottom center',
            transform: heroVisible ? 'rotate(-14deg) scale(1)' : 'rotate(-28deg) scale(0) translateX(-20px)',
            opacity: heroVisible ? 1 : 0,
            transition: 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0ms, opacity 1s ease 0ms',
          }}
        />
        {/* Illustration droite */}
        <img
          src="/panneau 2 droite.png"
          alt=""
          aria-hidden
          style={{
            position: 'absolute',
            left: 'calc(75% - 8px)',
            top: 100,
            width: 172,
            objectFit: 'contain',
            pointerEvents: 'none',
            transformOrigin: 'bottom center',
            transform: heroVisible ? 'scale(1)' : 'rotate(12deg) scale(0) translateX(20px)',
            opacity: heroVisible ? 1 : 0,
            transition: 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1) 150ms, opacity 1s ease 150ms',
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center', width: 708, maxWidth: '100%', position: 'relative', zIndex: 1 }}>
          <img
            src="/cadre-carre-2.png"
            alt=""
            aria-hidden
            style={{
              width: 80,
              height: 80,
              objectFit: 'contain',
              pointerEvents: 'none',
              transformOrigin: 'bottom center',
              transform: heroVisible ? 'scale(1)' : 'scale(0)',
              opacity: heroVisible ? 1 : 0,
              transition: 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0ms, opacity 1s ease 0ms',
            }}
          />
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
            Les lois
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
            Les textes qui s'appliquent aux festivals. Savoir ce qu'on doit faire est le premier pas pour le faire.
          </p>
        </div>
      </section>

      {/* Liste */}
      <div style={{ background: '#101010', padding: '56px 160px 80px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {lois.map((l) => (
            <LoiCard key={l.slug} loi={l} />
          ))}
        </div>
      </div>
    </>
  )
}
