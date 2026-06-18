'use client';
import { useState, useRef, useEffect } from 'react'
import { DownloadSimple } from '@phosphor-icons/react/dist/ssr'

const packs = [
  {
    slug: 'orientation-flux',
    titre: 'Orientation & flux',
    description: 'Toilettes, douches, restauration, sécurité...',
    visuel: '/panneau 3 droite.png',
  },
  {
    slug: 'urgence-securite',
    titre: 'Urgence & sécurité',
    description: 'Points médicaux, sorties de secours, zones PMR...',
    visuel: '/panneau 2 gauche.png',
  },
  {
    slug: 'experience-programmation',
    titre: 'Expérience & programmation',
    description: 'Scènes, artistes, horaires, accueil spectateurs...',
    visuel: '/panneau 2 droite.png',
  },
  {
    slug: 'vie-quotidienne-confort',
    titre: 'Vie quotidienne & confort',
    description: 'Repos, calme, alimentation, services sur site...',
    visuel: '/panneau 1 gauche.png',
  },
  {
    slug: 'logistique-coulisses',
    titre: 'Logistique & coulisses',
    description: 'Accès techniciens, livraisons, zones réservées...',
    visuel: '/panneau 3 gauche.png',
  },
]

function PackCard({ pack, index }: { pack: typeof packs[0]; index: number }) {
  const [btnHovered, setBtnHovered] = useState(false)
  const col = index % 3
  const row = Math.floor(index / 3)

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        padding: 40,
        background: '#101010',
        borderRight: col < 2 ? '1px solid #3b3b39' : 'none',
        borderBottom: row === 0 ? '1px solid #3b3b39' : 'none',
      }}
    >
      {/* Titre + description */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: '1 0 0' }}>
        <h2 style={{
          fontFamily: 'var(--font-title)',
          fontSize: 'clamp(2rem, 3.5vw, 3.5rem)',
          fontWeight: 400,
          color: '#F1EDF5',
          textTransform: 'uppercase',
          lineHeight: 1,
          margin: 0,
        }}>
          {pack.titre}
        </h2>
        <p style={{ fontFamily: 'var(--font)', fontSize: 18, fontWeight: 400, lineHeight: 1.2, color: '#F1EDF5', margin: 0 }}>
          {pack.description}
        </p>
      </div>

      {/* Visuel */}
      <div style={{
        background: '#3b3b39',
        borderRadius: 16,
        height: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        flexShrink: 0,
      }}>
        <img src={pack.visuel} alt="" aria-hidden style={{ height: 160, objectFit: 'contain', pointerEvents: 'none' }} />
      </div>

      {/* Bouton télécharger */}
      <div
        onMouseEnter={() => setBtnHovered(true)}
        onMouseLeave={() => setBtnHovered(false)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 16,
          background: btnHovered ? '#A122E2' : 'transparent',
          border: btnHovered ? 'none' : '1.5px solid #F1EDF5',
          borderRadius: 12,
          paddingLeft: 24,
          paddingRight: 4,
          paddingTop: 4,
          paddingBottom: 4,
          flexShrink: 0,
          cursor: 'pointer',
          transition: 'background 0.2s ease',
        }}
      >
        <span style={{ fontFamily: 'var(--font)', fontSize: 16, fontWeight: 500, color: '#F1EDF5', lineHeight: 1, whiteSpace: 'nowrap' }}>
          Télécharger le pack
        </span>
        <span style={{
          width: 32, height: 32, borderRadius: 8,
          background: btnHovered ? '#EEE9F3' : '#A122E2',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, transition: 'background 0.2s ease',
        }}>
          <DownloadSimple size={16} weight="bold" color={btnHovered ? '#A122E2' : '#EEE9F3'} />
        </span>
      </div>
    </div>
  )
}

export function LesRessources() {
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
      {/* ── Hero ── */}
      <section ref={heroRef} style={{
        background: '#101010',
        paddingTop: 240,
        paddingBottom: 160,
        paddingLeft: 40,
        paddingRight: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Panneau gauche */}
        <img src="/panneau 2 gauche.png" alt="" aria-hidden style={{
          position: 'absolute', left: 'calc(8.33% + 40px)', top: 110, width: 150, objectFit: 'contain', pointerEvents: 'none',
          transformOrigin: 'bottom center',
          transform: heroVisible ? 'rotate(7deg) scale(1)' : 'rotate(14deg) scale(0) translateX(-20px)',
          opacity: heroVisible ? 1 : 0,
          transition: 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0ms, opacity 1s ease 0ms',
        }} />

        {/* Panneaux droite */}
        <img src="/panneau 1 droite.png" alt="" aria-hidden style={{
          position: 'absolute', left: 'calc(66.67% - 10px)', top: 100, width: 160, objectFit: 'contain', pointerEvents: 'none',
          transformOrigin: 'bottom center',
          transform: heroVisible ? 'rotate(-7deg) scale(1)' : 'rotate(-14deg) scale(0) translateX(20px)',
          opacity: heroVisible ? 1 : 0,
          transition: 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1) 150ms, opacity 1s ease 150ms',
        }} />
        <img src="/panneau 3 droite.png" alt="" aria-hidden style={{
          position: 'absolute', left: 'calc(75% + 20px)', top: 140, width: 140, objectFit: 'contain', pointerEvents: 'none',
          transformOrigin: 'bottom center',
          transform: heroVisible ? 'rotate(8deg) scale(1)' : 'rotate(16deg) scale(0) translateX(10px)',
          opacity: heroVisible ? 1 : 0,
          transition: 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1) 250ms, opacity 1s ease 250ms',
        }} />

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
            Signalétiques
          </h1>
          <p style={{
            fontFamily: 'var(--font)',
            fontSize: 18,
            fontWeight: 400,
            lineHeight: 1.2,
            color: '#EEE9F3',
            textAlign: 'center',
            maxWidth: 466,
            margin: 0,
          }}>
            Des packs de pictogrammes prêts à imprimer, par type de besoin, style métal, haut contraste.
          </p>
        </div>
      </section>

      {/* ── Grille packs ── */}
      <section style={{ background: '#101010', paddingBottom: 80, paddingLeft: 40, paddingRight: 40 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {packs.map((pack, i) => (
            <PackCard key={pack.slug} pack={pack} index={i} />
          ))}
        </div>
      </section>
    </>
  )
}
