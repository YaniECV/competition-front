"use client";
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, ShareNetwork, CaretDown } from '@phosphor-icons/react/dist/ssr'
import { bonnesPratiques } from '../data/bonnesPratiques'
import type { Zone, Handicap, BonnePratique } from '../data/bonnesPratiques'
import { handicaps } from '../data/handicaps'
import { lois } from '../data/lois'

const zoneOptions: { key: 'toutes' | Zone; label: string }[] = [
  { key: 'toutes', label: 'Toutes les zones' },
  { key: 'acces', label: 'Accès' },
  { key: 'scene', label: 'Scène' },
  { key: 'accueil', label: 'Accueil' },
  { key: 'services', label: 'Services & confort' },
  { key: 'hebergement', label: 'Hébergement' },
]

const handicapOptions: { key: 'tous' | Handicap; label: string }[] = [
  { key: 'tous', label: 'Tous les handicaps' },
  { key: 'moteur', label: 'Moteur' },
  { key: 'visuel', label: 'Visuel' },
  { key: 'auditif', label: 'Auditif' },
  { key: 'autisme', label: 'Autisme / TSA' },
  { key: 'psychologique', label: 'Troubles psychiques' },
  { key: 'invisible', label: 'Invisible' },
]

const tagStyle: React.CSSProperties = {
  background: '#4a0f68',
  borderRadius: 8,
  padding: '8px',
  fontFamily: 'var(--font)',
  fontSize: 16,
  fontWeight: 500,
  color: '#F1EDF5',
  lineHeight: 1,
  whiteSpace: 'nowrap',
}

function getHandicapLabels(bp: BonnePratique): string[] {
  if (bp.handicaps.includes('tous')) return ['Tous les handicaps']
  return bp.handicaps.map(h => handicapOptions.find(o => o.key === h)?.label ?? h)
}

function getBpImage(n: number): string {
  if (n === 10) return '/9.png'
  if (n === 20) return '/19.png'
  return `/${n}.png`
}

// ── Card liste ────────────────────────────────────────────────────────────────
function BpCard({ bp, index }: { bp: BonnePratique; index: number }) {
  const zoneLabel = zoneOptions.find(z => z.key === bp.zone)?.label ?? bp.zone
  const handicapLabels = getHandicapLabels(bp)

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 24,
      paddingTop: 24,
      paddingBottom: 24,
      borderBottom: '1px solid #3b3b39',
    }}>
      {/* Visuel gauche */}
      <div style={{ width: 119, height: 119, flexShrink: 0 }}>
        <img src={getBpImage(index)} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>

      {/* Titre + tags */}
      <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
        <p style={{
          fontFamily: 'var(--font)',
          fontSize: 24,
          fontWeight: 500,
          lineHeight: 1.1,
          color: '#F1EDF5',
          margin: 0,
        }}>
          {bp.titre}
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <span style={tagStyle}>{zoneLabel}</span>
          {handicapLabels.map(label => (
            <span key={label} style={tagStyle}>{label}</span>
          ))}
        </div>
      </div>

      {/* Bouton */}
      <Link
        href={`/s-informer/bonnes-pratiques/${bp.slug}`}
        style={{
          background: 'transparent',
          border: '1.5px solid #F1EDF5',
          borderRadius: 12,
          padding: '4px 4px 4px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          flexShrink: 0,
          textDecoration: 'none',
        }}
      >
        <span style={{
          fontFamily: 'var(--font)',
          fontSize: 16,
          fontWeight: 600,
          color: '#F1EDF5',
          lineHeight: 1,
          whiteSpace: 'nowrap',
        }}>
          En savoir plus
        </span>
        <div style={{
          width: 32,
          height: 32,
          background: '#A122E2',
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <ArrowRight size={16} weight="regular" color="#EEE9F3" />
        </div>
      </Link>
    </div>
  )
}

// ── Index ─────────────────────────────────────────────────────────────────────
export function BonnesPratiquesIndex() {
  const [activeZones, setActiveZones] = useState<Zone[]>([])
  const [activeHandicaps, setActiveHandicaps] = useState<Handicap[]>([])
  const [openDropdown, setOpenDropdown] = useState<'handicap' | 'zone' | null>(null)
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

  const toggleHandicap = (key: Handicap) =>
    setActiveHandicaps(prev => prev.includes(key) ? prev.filter(h => h !== key) : [...prev, key])
  const toggleZone = (key: Zone) =>
    setActiveZones(prev => prev.includes(key) ? prev.filter(z => z !== key) : [...prev, key])

  const filtered = bonnesPratiques.filter((bp) => {
    if (activeZones.length > 0 && !activeZones.includes(bp.zone)) return false
    if (activeHandicaps.length > 0 && !bp.handicaps.includes('tous') && !bp.handicaps.some(h => activeHandicaps.includes(h as Handicap))) return false
    return true
  })

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
        {/* Écouteurs gauche */}
        <img
          src="/illus-footer-11.png"
          alt=""
          aria-hidden
          style={{
            position: 'absolute',
            left: 'calc(8.33% + 35px)',
            top: 120,
            width: 260,
            height: 240,
            objectFit: 'contain',
            pointerEvents: 'none',
            transformOrigin: 'bottom center',
            transform: heroVisible ? 'rotate(-19deg) scale(1)' : 'rotate(-30deg) scale(0) translateX(-20px)',
            opacity: heroVisible ? 1 : 0,
            transition: 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0ms, opacity 1s ease 0ms',
          }}
        />
        {/* Panneau droite */}
        <img
          src="/panneau 3 droite.png"
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
            Les bonnes pratiques
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
            Passe à l'action dès maintenant avec notre guide complet : découvre toutes les bonnes pratiques pour rendre ton festival accessible, organisées et filtrables par zone spécifique et type de handicap, pour une expérience inclusive et réussie.
          </p>
        </div>
      </section>

      {/* Filtres + Liste */}
      <div style={{ background: '#101010', padding: '56px 160px 80px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

          {openDropdown && (
            <div style={{ position: 'fixed', inset: 0, zIndex: 10 }} onClick={() => setOpenDropdown(null)} />
          )}

          {/* Filtres */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: 8 }}>

                {/* Dropdown Type de handicap */}
                <div style={{ position: 'relative', zIndex: 11 }}>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === 'handicap' ? null : 'handicap')}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 12,
                      padding: '10px 16px',
                      background: 'transparent',
                      border: activeHandicaps.length > 0 ? '1.5px solid #A122E2' : '1.5px solid #F1EDF5',
                      borderRadius: 12,
                      fontFamily: 'var(--font)', fontSize: 16, fontWeight: 500,
                      color: activeHandicaps.length > 0 ? '#A122E2' : '#F1EDF5',
                      cursor: 'pointer', whiteSpace: 'nowrap',
                      transition: 'border-color 0.2s ease, color 0.2s ease',
                    }}
                  >
                    Type de handicap
                    <CaretDown size={14} weight="bold" color={activeHandicaps.length > 0 ? '#A122E2' : '#F1EDF5'} style={{ transform: openDropdown === 'handicap' ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s', flexShrink: 0 }} />
                  </button>
                  {openDropdown === 'handicap' && (
                    <div style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, background: '#1c1c1c', border: '1.5px solid #3b3b39', borderRadius: 12, minWidth: 220, boxShadow: '0 8px 24px rgba(0,0,0,0.5)', overflow: 'hidden' }}>
                      {handicapOptions.slice(1).map((o, i) => {
                        const selected = activeHandicaps.includes(o.key as Handicap)
                        return (
                          <button key={o.key} onClick={() => toggleHandicap(o.key as Handicap)} style={{
                            display: 'flex', alignItems: 'center', gap: 12,
                            width: '100%', textAlign: 'left', padding: '12px 16px',
                            fontFamily: 'var(--font)', fontSize: 16, fontWeight: 500,
                            color: selected ? '#F1EDF5' : '#9491a1',
                            background: 'transparent',
                            border: 'none', borderBottom: i < handicapOptions.length - 2 ? '1px solid #2e2e2e' : 'none',
                            cursor: 'pointer',
                          }}>
                            <span style={{
                              width: 18, height: 18, borderRadius: 4, flexShrink: 0,
                              border: selected ? 'none' : '1.5px solid #3b3b39',
                              background: selected ? '#A122E2' : 'transparent',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              transition: 'background 0.15s ease',
                            }}>
                              {selected && (
                                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                  <path d="M1 4L3.5 6.5L9 1" stroke="#EEE9F3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </span>
                            {o.label}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>

                {/* Dropdown Zone de festival */}
                <div style={{ position: 'relative', zIndex: 11 }}>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === 'zone' ? null : 'zone')}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 12,
                      padding: '10px 16px',
                      background: 'transparent',
                      border: activeZones.length > 0 ? '1.5px solid #A122E2' : '1.5px solid #F1EDF5',
                      borderRadius: 12,
                      fontFamily: 'var(--font)', fontSize: 16, fontWeight: 500,
                      color: activeZones.length > 0 ? '#A122E2' : '#F1EDF5',
                      cursor: 'pointer', whiteSpace: 'nowrap',
                      transition: 'border-color 0.2s ease, color 0.2s ease',
                    }}
                  >
                    Zone de festival
                    <CaretDown size={14} weight="bold" color={activeZones.length > 0 ? '#A122E2' : '#F1EDF5'} style={{ transform: openDropdown === 'zone' ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s', flexShrink: 0 }} />
                  </button>
                  {openDropdown === 'zone' && (
                    <div style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, background: '#1c1c1c', border: '1.5px solid #3b3b39', borderRadius: 12, minWidth: 220, boxShadow: '0 8px 24px rgba(0,0,0,0.5)', overflow: 'hidden' }}>
                      {zoneOptions.slice(1).map((o, i) => {
                        const selected = activeZones.includes(o.key as Zone)
                        return (
                          <button key={o.key} onClick={() => toggleZone(o.key as Zone)} style={{
                            display: 'flex', alignItems: 'center', gap: 12,
                            width: '100%', textAlign: 'left', padding: '12px 16px',
                            fontFamily: 'var(--font)', fontSize: 16, fontWeight: 500,
                            color: selected ? '#F1EDF5' : '#9491a1',
                            background: 'transparent',
                            border: 'none', borderBottom: i < zoneOptions.length - 2 ? '1px solid #2e2e2e' : 'none',
                            cursor: 'pointer',
                          }}>
                            <span style={{
                              width: 18, height: 18, borderRadius: 4, flexShrink: 0,
                              border: selected ? 'none' : '1.5px solid #3b3b39',
                              background: selected ? '#A122E2' : 'transparent',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              transition: 'background 0.15s ease',
                            }}>
                              {selected && (
                                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                  <path d="M1 4L3.5 6.5L9 1" stroke="#EEE9F3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </span>
                            {o.label}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Compteur résultats */}
              <span style={{ fontFamily: 'var(--font)', fontSize: 16, fontWeight: 400, color: '#9491a1', whiteSpace: 'nowrap' }}>
                {filtered.length} résultat{filtered.length !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Tags filtres actifs */}
            {(activeHandicaps.length > 0 || activeZones.length > 0) && (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {activeHandicaps.map(h => (
                  <button key={h} onClick={() => toggleHandicap(h)} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '6px 10px 6px 12px', borderRadius: 8,
                    border: 'none', background: '#4a0f68',
                    fontFamily: 'var(--font)', fontSize: 14, fontWeight: 500,
                    color: '#F1EDF5', cursor: 'pointer', lineHeight: 1,
                  }}>
                    {handicapOptions.find(o => o.key === h)?.label}
                    <span style={{ fontSize: 14, color: 'rgba(241,237,245,0.6)', lineHeight: 1 }}>✕</span>
                  </button>
                ))}
                {activeZones.map(z => (
                  <button key={z} onClick={() => toggleZone(z)} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '6px 10px 6px 12px', borderRadius: 8,
                    border: 'none', background: '#4a0f68',
                    fontFamily: 'var(--font)', fontSize: 14, fontWeight: 500,
                    color: '#F1EDF5', cursor: 'pointer', lineHeight: 1,
                  }}>
                    {zoneOptions.find(o => o.key === z)?.label}
                    <span style={{ fontSize: 14, color: 'rgba(241,237,245,0.6)', lineHeight: 1 }}>✕</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Liste */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {filtered.length === 0 ? (
              <p style={{ fontSize: 14, color: '#9491a1' }}>Aucune bonne pratique pour ces filtres.</p>
            ) : (
              filtered.map((bp) => <BpCard key={bp.id} bp={bp} index={bonnesPratiques.indexOf(bp) + 1} />)
            )}
          </div>
        </div>
      </div>
    </>
  )
}

// ── Détail ────────────────────────────────────────────────────────────────────
export function BonnePratiqueDetail({ slug }: { slug: string }) {
  const [backHovered, setBackHovered] = useState(false)
  const bp = bonnesPratiques.find((b) => b.slug === slug)
  if (!bp) return null

  const zoneLabel = zoneOptions.find(z => z.key === bp.zone)?.label ?? bp.zone
  const handicapLabels = getHandicapLabels(bp)
  const handicapsLies = handicaps.filter((h) => h.bonnesPratiquesIds.includes(bp.id))
  const loisLiees = (bp.loisLiees ?? [])
    .map((s) => lois.find((l) => l.slug === s))
    .filter((l): l is NonNullable<typeof l> => Boolean(l))

  const detailTagStyle: React.CSSProperties = {
    background: '#4a0f68',
    borderRadius: 8,
    padding: '8px',
    display: 'inline-flex',
    alignItems: 'center',
    fontFamily: 'var(--font)',
    fontSize: 16,
    fontWeight: 500,
    color: '#F1EDF5',
    lineHeight: 1,
    whiteSpace: 'nowrap',
  }

  const outlineBtn: React.CSSProperties = {
    border: '1.5px solid #F1EDF5',
    borderRadius: 12,
    padding: '4px 4px 4px 24px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 16,
    flexShrink: 0,
    textDecoration: 'none',
    background: 'transparent',
  }

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', background: '#101010', minHeight: '100vh', position: 'relative' }}>

      {/* Bouton retour */}
      <Link
        href="/s-informer/bonnes-pratiques"
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
          border: backHovered ? 'none' : '1.5px solid #F1EDF5',
          borderRadius: 12,
          paddingLeft: 4,
          paddingRight: 16,
          paddingTop: 4,
          paddingBottom: 4,
          textDecoration: 'none',
          transition: 'background 0.2s ease',
          cursor: 'pointer',
          zIndex: 10,
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

      {/* ── Gauche : contenu ── */}
      <div style={{
        width: 853,
        maxWidth: '58%',
        flexShrink: 0,
        padding: '120px 40px',
        display: 'flex',
        flexDirection: 'column',
        gap: 64,
      }}>

        {/* Tags + titre + résumé + btn */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <span style={detailTagStyle}>{zoneLabel}</span>
            {handicapLabels.map(label => (
              <span key={label} style={detailTagStyle}>{label}</span>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <h1 style={{
              fontFamily: 'var(--font-title)',
              fontSize: 80,
              fontWeight: 400,
              color: '#EEE9F3',
              textTransform: 'uppercase',
              lineHeight: 1,
              letterSpacing: 0,
              margin: 0,
            }}>
              {bp.titre}
            </h1>
            <p style={{
              fontFamily: 'var(--font)',
              fontSize: 18,
              fontWeight: 500,
              lineHeight: 1.1,
              color: '#EEE9F3',
              margin: 0,
              maxWidth: 346,
            }}>
              {bp.resume}
            </p>
          </div>

          {/* Btn partager */}
          <div style={{
            background: '#EEE9F3',
            borderRadius: 12,
            padding: '4px 4px 4px 8px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            alignSelf: 'flex-start',
            cursor: 'pointer',
          }}>
            <span style={{ fontFamily: 'var(--font)', fontSize: 18, fontWeight: 600, color: '#101010', lineHeight: 1, whiteSpace: 'nowrap' }}>
              Partager cette bonne pratique
            </span>
            <div style={{ width: 32, height: 32, background: '#A122E2', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShareNetwork size={16} weight="regular" color="#EEE9F3" />
            </div>
          </div>
        </div>

        {/* Bloc blanc — Comment faire */}
        <div style={{
          background: '#EEE9F3',
          borderRadius: 12,
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}>
          <h2 style={{
            fontFamily: 'var(--font-title)',
            fontSize: 40,
            fontWeight: 400,
            color: '#101010',
            textTransform: 'uppercase',
            lineHeight: 1,
            margin: 0,
          }}>
            Comment faire
          </h2>
          <ul style={{ margin: 0, paddingLeft: 24 }}>
            {bp.commentFaire.map((step, i) => (
              <li key={i} style={{ fontFamily: 'var(--font)', fontSize: 18, fontWeight: 400, lineHeight: 1.2, color: '#101010', marginBottom: i < bp.commentFaire.length - 1 ? 8 : 0, listStyleType: 'disc', display: 'list-item' }}>
                {step}
              </li>
            ))}
          </ul>
        </div>

        {/* Publics concernés */}
        {handicapsLies.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <p style={{ fontFamily: 'var(--font)', fontSize: 18, fontWeight: 400, color: '#F1EDF5', margin: '0 0 0 0' }}>
              Publics concernés
            </p>
            {handicapsLies.map(h => (
              <div key={h.slug} style={{ paddingTop: 16, paddingBottom: 16 }}>
                <Link href={`/handicaps/${h.slug}`} style={{
                  fontFamily: 'var(--font)',
                  fontSize: 24,
                  fontWeight: 500,
                  lineHeight: 1.1,
                  color: '#F1EDF5',
                  textDecoration: 'underline',
                }}>
                  {h.nom}
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Cadre légal */}
        {loisLiees.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <p style={{ fontFamily: 'var(--font)', fontSize: 18, fontWeight: 400, color: '#F1EDF5', margin: 0 }}>
              Cadre légal
            </p>
            {loisLiees.map(l => (
              <div key={l.slug} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 24,
                paddingTop: 16,
                paddingBottom: 16,
                borderBottom: '1px solid #3b3b39',
              }}>
                <span style={{ fontFamily: 'var(--font)', fontSize: 24, fontWeight: 500, lineHeight: 1.1, color: '#F1EDF5' }}>
                  {l.titre}
                </span>
                <Link href={`/s-informer/les-lois#${l.slug}`} style={outlineBtn}>
                  <span style={{ fontFamily: 'var(--font)', fontSize: 18, fontWeight: 600, color: '#F1EDF5', lineHeight: 1, whiteSpace: 'nowrap' }}>
                    En savoir plus
                  </span>
                  <div style={{ width: 32, height: 32, background: '#A122E2', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ArrowRight size={16} weight="regular" color="#EEE9F3" />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* ── Droite : visuel sticky ── */}
      <div style={{
        flex: 1,
        minWidth: 0,
        position: 'sticky',
        top: 0,
        height: '100vh',
        padding: '90px 24px 24px',
        overflow: 'hidden',
      }}>
        <div style={{ width: '100%', height: '100%', borderRadius: 16, overflow: 'hidden' }}>
          <img src="/bp-detail-visual.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>

    </div>
  )
}
