"use client";
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react/dist/ssr'
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

function ArrowUpRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 14L14 4M14 4H6M14 4V12" stroke="#EEE9F3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 4L16 16M16 4L4 16" stroke="#EEE9F3" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function ArrowLeftIcon() {
  return (
    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" aria-hidden="true">
      <path d="M17 7.5H1M7.5 1L1 7.5L7.5 14" stroke="#EEE9F3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" aria-hidden="true">
      <path d="M1 7.5H17M10.5 1L17 7.5L10.5 14" stroke="#EEE9F3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function getHandicapLabels(bp: BonnePratique): string[] {
  if (bp.handicaps.includes('tous')) return ['Tous les handicaps']
  return bp.handicaps.map(h => handicapOptions.find(o => o.key === h)?.label ?? h)
}

function BpCard({ bp, onOpen }: { bp: BonnePratique; onOpen: () => void }) {
  const zoneLabel = zoneOptions.find(z => z.key === bp.zone)?.label ?? bp.zone
  const handicapLabels = getHandicapLabels(bp)

  const tagStyle: React.CSSProperties = {
    border: '1.5px solid #F1EDF5',
    borderRadius: 12,
    padding: '8px 10px',
    fontFamily: 'var(--font)',
    fontSize: 12,
    fontWeight: 600,
    color: '#F1EDF5',
    lineHeight: 1,
    whiteSpace: 'nowrap',
  }

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
      <div style={{
        width: 119,
        height: 119,
        borderRadius: 12,
        overflow: 'hidden',
        flexShrink: 0,
        background: '#1c1c1c',
      }}>
        <img src="/card-visual.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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

      {/* Bouton En savoir plus */}
      <button
        onClick={onOpen}
        style={{
          background: '#EEE9F3',
          borderRadius: 12,
          padding: '4px 4px 4px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          flexShrink: 0,
          border: 'none',
          cursor: 'pointer',
        }}
        aria-label={`En savoir plus : ${bp.titre}`}
      >
        <span style={{
          fontFamily: 'var(--font)',
          fontSize: 18,
          fontWeight: 600,
          color: '#101010',
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
      </button>
    </div>
  )
}

function BpModal({
  bp, onClose, onPrev, onNext, hasPrev, hasNext,
}: {
  bp: BonnePratique
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  hasPrev: boolean
  hasNext: boolean
}) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  const zoneLabel = zoneOptions.find(z => z.key === bp.zone)?.label ?? bp.zone
  const handicapLabels = getHandicapLabels(bp)
  const handicapsLies = handicaps.filter(h => h.bonnesPratiquesIds.includes(bp.id))
  const loisLiees = (bp.loisLiees ?? [])
    .map(s => lois.find(l => l.slug === s))
    .filter((l): l is NonNullable<typeof l> => Boolean(l))

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '24px',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{
        border: '1px solid rgba(238,233,243,0.12)',
        borderRadius: 8,
        display: 'flex',
        overflow: 'hidden',
        width: '100%',
        maxWidth: 1128,
        height: '85vh',
      }}>

        {/* Volet gauche */}
        <div style={{
          background: '#1c1c1c',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          minWidth: 0,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: 24, flex: 1 }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <h2 style={{ fontSize: 32, fontWeight: 400, lineHeight: 1.2, color: '#EEE9F3', letterSpacing: 0 }}>
                {bp.titre}
              </h2>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <span style={{ border: '1px solid #484848', borderRadius: 32, padding: '10px 14px', fontSize: 14, color: '#9491a1', lineHeight: 1, whiteSpace: 'nowrap' }}>
                  {zoneLabel}
                </span>
                {handicapLabels.map(label => (
                  <span key={label} style={{ border: '1px solid #484848', borderRadius: 32, padding: '10px 14px', fontSize: 14, color: '#9491a1', lineHeight: 1, whiteSpace: 'nowrap' }}>
                    {label}
                  </span>
                ))}
              </div>
              <p style={{ fontSize: 16, fontWeight: 300, lineHeight: 1.3, color: '#9491a1', maxWidth: 408 }}>{bp.resume}</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 17 }}>
              <p style={{ fontSize: 15, fontWeight: 600, textTransform: 'uppercase', color: '#EEE9F3' }}>Comment faire</p>
              <ul style={{ listStyle: 'disc', paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {bp.commentFaire.map((step, i) => (
                  <li key={i} style={{ fontSize: 16, fontWeight: 300, lineHeight: 1.3, color: '#9491a1' }}>{step}</li>
                ))}
              </ul>
            </div>

            {handicapsLies.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <p style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9491a1', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>
                  Publics concernés
                </p>
                {handicapsLies.map(h => (
                  <Link key={h.slug} href={`/handicaps/${h.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                    <div style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      border: '1px solid #484848', borderRadius: 8, padding: '14px 18px',
                      background: '#282828', cursor: 'pointer',
                    }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <p style={{ fontSize: 10, color: '#9491a1', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Handicap</p>
                        <p style={{ fontSize: 15, color: '#EEE9F3', lineHeight: 1 }}>{h.nom}</p>
                      </div>
                      <span style={{ color: '#9491a1', fontSize: 16 }}>→</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {loisLiees.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <p style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9491a1', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>
                  Cadre légal
                </p>
                {loisLiees.map(l => (
                  <Link key={l.slug} href={`/s-informer/les-lois#${l.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                    <div style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      border: '1px solid #484848', borderRadius: 8, padding: '14px 18px',
                      background: '#282828', cursor: 'pointer', gap: 12,
                    }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
                        <p style={{ fontSize: 10, color: '#9491a1', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Loi</p>
                        <p style={{ fontSize: 15, color: '#EEE9F3', lineHeight: 1.3 }}>{l.titre}</p>
                      </div>
                      <span style={{ color: '#9491a1', fontSize: 16, flexShrink: 0 }}>→</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}

          </div>

          {/* Barre nav sticky */}
          <div style={{
            position: 'sticky',
            bottom: 0,
            background: '#1c1c1c',
            borderTop: '1px solid #2e2e2e',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
          }}>
            <button
              onClick={onPrev}
              disabled={!hasPrev}
              style={{
                border: '1px solid #484848',
                background: '#282828',
                borderRadius: 999,
                padding: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 14,
                color: '#EEE9F3',
                cursor: hasPrev ? 'pointer' : 'default',
                opacity: hasPrev ? 1 : 0.35,
              }}
            >
              <ArrowLeftIcon />
              Précédent
            </button>
            <button
              onClick={onNext}
              disabled={!hasNext}
              style={{
                border: '1px solid #484848',
                background: '#282828',
                borderRadius: 999,
                padding: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 14,
                color: '#EEE9F3',
                cursor: hasNext ? 'pointer' : 'default',
                opacity: hasNext ? 1 : 0.35,
              }}
            >
              Suivant
              <ArrowRightIcon />
            </button>
          </div>
        </div>

        {/* Volet droit — visuel */}
        <div style={{
          background: '#282828',
          flex: 1,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '50px 7px',
        }}>
          <p style={{ fontSize: 24, color: '#EEE9F3', textAlign: 'center' }}>
            {handicapLabels.join(' · ')}
          </p>
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              background: '#1c1c1c',
              border: '1px solid #484848',
              borderRadius: 999,
              padding: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            aria-label="Fermer"
          >
            <XIcon />
          </button>
        </div>

      </div>
    </div>
  )
}

export function BonnesPratiquesIndex() {
  const [activeZone, setActiveZone] = useState<'toutes' | Zone>('toutes')
  const [activeHandicap, setActiveHandicap] = useState<'tous' | Handicap>('tous')
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [openDropdown, setOpenDropdown] = useState<'handicap' | 'zone' | null>(null)

  const filtered = bonnesPratiques.filter((bp) => {
    if (activeZone !== 'toutes' && bp.zone !== activeZone) return false
    if (activeHandicap !== 'tous' && !bp.handicaps.includes(activeHandicap) && !bp.handicaps.includes('tous')) return false
    return true
  })

  const closeModal = useCallback(() => setSelectedIndex(null), [])

  return (
    <>
      {/* Hero */}
      <section style={{
        background: '#101010',
        paddingTop: 240,
        paddingBottom: 120,
        paddingLeft: 40,
        paddingRight: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center', width: 708, maxWidth: '100%' }}>
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
            Toutes les actions concrètes pour rendre ton festival accessible, filtrables par zone et type de handicap.
          </p>
        </div>
      </section>

      {/* Filtres + Liste */}
      <div style={{ background: '#101010', padding: '56px 40px 80px' }}>
        <div style={{ maxWidth: 1356, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 32 }}>

          {/* Filtres — dropdowns */}
          {openDropdown && (
            <div style={{ position: 'fixed', inset: 0, zIndex: 10 }} onClick={() => setOpenDropdown(null)} />
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', gap: 8 }}>

              {/* Dropdown Pour qui */}
              <div style={{ position: 'relative', zIndex: 11 }}>
                <button
                  onClick={() => setOpenDropdown(openDropdown === 'handicap' ? null : 'handicap')}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8, height: 38, padding: '0 14px',
                    border: activeHandicap !== 'tous' ? '1px solid #A122E2' : '1px solid #484848',
                    borderRadius: 8,
                    background: activeHandicap !== 'tous' ? 'rgba(161,34,226,0.12)' : '#1c1c1c',
                    fontSize: 13, color: '#EEE9F3', cursor: 'pointer', fontFamily: 'inherit',
                  }}
                >
                  <span style={{ fontSize: 10, color: activeHandicap !== 'tous' ? '#EEE9F3' : '#9491a1', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>Pour qui</span>
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ transform: openDropdown === 'handicap' ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s', flexShrink: 0 }}>
                    <path d="M1 1L5 5L9 1" stroke="#9491a1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {openDropdown === 'handicap' && (
                  <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, background: '#1c1c1c', border: '1px solid #484848', borderRadius: 8, minWidth: 200, boxShadow: '0 8px 24px rgba(0,0,0,0.5)', overflow: 'hidden' }}>
                    {handicapOptions.slice(1).map((o, i) => (
                      <button key={o.key} onClick={() => { setActiveHandicap(o.key); setOpenDropdown(null) }} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        width: '100%', textAlign: 'left', padding: '10px 16px', fontSize: 13,
                        color: activeHandicap === o.key ? '#EEE9F3' : '#9491a1',
                        background: activeHandicap === o.key ? 'rgba(161,34,226,0.12)' : 'transparent',
                        border: 'none', borderBottom: i < handicapOptions.length - 2 ? '1px solid #2e2e2e' : 'none',
                        cursor: 'pointer', fontFamily: 'inherit',
                      }}>
                        {o.label}
                        {activeHandicap === o.key && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#A122E2', flexShrink: 0 }} />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Dropdown Où */}
              <div style={{ position: 'relative', zIndex: 11 }}>
                <button
                  onClick={() => setOpenDropdown(openDropdown === 'zone' ? null : 'zone')}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8, height: 38, padding: '0 14px',
                    border: activeZone !== 'toutes' ? '1px solid #A122E2' : '1px solid #484848',
                    borderRadius: 8,
                    background: activeZone !== 'toutes' ? 'rgba(161,34,226,0.12)' : '#1c1c1c',
                    fontSize: 13, color: '#EEE9F3', cursor: 'pointer', fontFamily: 'inherit',
                  }}
                >
                  <span style={{ fontSize: 10, color: activeZone !== 'toutes' ? '#EEE9F3' : '#9491a1', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>Où</span>
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ transform: openDropdown === 'zone' ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s', flexShrink: 0 }}>
                    <path d="M1 1L5 5L9 1" stroke="#9491a1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {openDropdown === 'zone' && (
                  <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, background: '#1c1c1c', border: '1px solid #484848', borderRadius: 8, minWidth: 200, boxShadow: '0 8px 24px rgba(0,0,0,0.5)', overflow: 'hidden' }}>
                    {zoneOptions.slice(1).map((o, i) => (
                      <button key={o.key} onClick={() => { setActiveZone(o.key); setOpenDropdown(null) }} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        width: '100%', textAlign: 'left', padding: '10px 16px', fontSize: 13,
                        color: activeZone === o.key ? '#EEE9F3' : '#9491a1',
                        background: activeZone === o.key ? 'rgba(161,34,226,0.12)' : 'transparent',
                        border: 'none', borderBottom: i < zoneOptions.length - 2 ? '1px solid #2e2e2e' : 'none',
                        cursor: 'pointer', fontFamily: 'inherit',
                      }}>
                        {o.label}
                        {activeZone === o.key && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#A122E2', flexShrink: 0 }} />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* Tags filtres actifs */}
            {(activeHandicap !== 'tous' || activeZone !== 'toutes') && (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {activeHandicap !== 'tous' && (
                  <button onClick={() => setActiveHandicap('tous')} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '4px 10px 4px 12px', borderRadius: 999,
                    border: '1px solid #A122E2', background: 'rgba(161,34,226,0.12)',
                    fontSize: 12, color: '#EEE9F3', cursor: 'pointer', fontFamily: 'inherit',
                  }}>
                    {handicapOptions.find(o => o.key === activeHandicap)?.label}
                    <span style={{ fontSize: 13, color: '#9491a1', lineHeight: 1 }}>✕</span>
                  </button>
                )}
                {activeZone !== 'toutes' && (
                  <button onClick={() => setActiveZone('toutes')} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '4px 10px 4px 12px', borderRadius: 999,
                    border: '1px solid #A122E2', background: 'rgba(161,34,226,0.12)',
                    fontSize: 12, color: '#EEE9F3', cursor: 'pointer', fontFamily: 'inherit',
                  }}>
                    {zoneOptions.find(o => o.key === activeZone)?.label}
                    <span style={{ fontSize: 13, color: '#9491a1', lineHeight: 1 }}>✕</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Liste de cards */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {filtered.length === 0 ? (
              <p style={{ fontSize: 14, color: '#9491a1' }}>Aucune bonne pratique pour ces filtres.</p>
            ) : (
              filtered.map((bp, index) => (
                <BpCard key={bp.id} bp={bp} onOpen={() => setSelectedIndex(index)} />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Modale */}
      {selectedIndex !== null && filtered[selectedIndex] && (
        <BpModal
          bp={filtered[selectedIndex]}
          onClose={closeModal}
          onPrev={() => setSelectedIndex(prev => (prev !== null && prev > 0 ? prev - 1 : prev))}
          onNext={() => setSelectedIndex(prev => (prev !== null && prev < filtered.length - 1 ? prev + 1 : prev))}
          hasPrev={selectedIndex > 0}
          hasNext={selectedIndex < filtered.length - 1}
        />
      )}
    </>
  )
}

export function BonnePratiqueDetail({ slug }: { slug: string }) {
  const bp = bonnesPratiques.find((b) => b.slug === slug)
  if (!bp) return null

  const handicapsLies = handicaps.filter((h) => h.bonnesPratiquesIds.includes(bp.id))
  const loisLiees = (bp.loisLiees ?? []).map((s) => lois.find((l) => l.slug === s)).filter((l): l is NonNullable<typeof l> => Boolean(l))

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <Link href="/s-informer/bonnes-pratiques" style={{ fontSize: 12, color: 'var(--muted)', display: 'inline-block', marginBottom: 20 }}>← Les bonnes pratiques</Link>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <span className="tag" style={{ marginBottom: 0 }}>{zoneOptions.find(z => z.key === bp.zone)?.label}</span>
            <span className="tag" style={{ marginBottom: 0 }}>{bp.statut}</span>
          </div>
          <h1>{bp.titre}</h1>
          <p style={{ fontSize: 16, maxWidth: 540, marginTop: 16, lineHeight: 1.7 }}>{bp.resume}</p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 80, maxWidth: 720 }}>
        <h2 style={{ marginBottom: 16 }}>Comment faire</h2>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 48 }}>
          {bp.commentFaire.map((step) => (
            <li key={step} style={{ display: 'flex', gap: 12, fontSize: 14, lineHeight: 1.6 }}>
              <span style={{ flexShrink: 0, color: 'var(--muted)' }}>→</span><span>{step}</span>
            </li>
          ))}
        </ul>

        {handicapsLies.length > 0 && (
          <div style={{ marginBottom: 32 }}>
            <h3 style={{ marginBottom: 12 }}>Pour mieux comprendre ces publics</h3>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {handicapsLies.map((h) => (
                <Link key={h.slug} href={`/handicaps/${h.slug}`} style={{ fontSize: 11, fontFamily: 'var(--font-mono)', border: '1px solid var(--border)', padding: '4px 10px', color: 'var(--muted)', textDecoration: 'none' }}>
                  {h.nom} →
                </Link>
              ))}
            </div>
          </div>
        )}

        {loisLiees.length > 0 && (
          <div>
            <h3 style={{ marginBottom: 12 }}>Ce que dit la loi</h3>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {loisLiees.map((l) => (
                <Link key={l.slug} href={`/s-informer/les-lois#${l.slug}`} style={{ fontSize: 11, fontFamily: 'var(--font-mono)', border: '1px solid var(--border)', padding: '4px 10px', color: 'var(--muted)', textDecoration: 'none' }}>
                  {l.titre} →
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
