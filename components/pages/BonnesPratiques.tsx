"use client";
import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, ShareNetwork } from '@phosphor-icons/react/dist/ssr'
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
          padding: '4px 4px 4px 16px',
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
  const [activeZone, setActiveZone] = useState<'toutes' | Zone>('toutes')
  const [activeHandicap, setActiveHandicap] = useState<'tous' | Handicap>('tous')
  const [openDropdown, setOpenDropdown] = useState<'handicap' | 'zone' | null>(null)

  const filtered = bonnesPratiques.filter((bp) => {
    if (activeZone !== 'toutes' && bp.zone !== activeZone) return false
    if (activeHandicap !== 'tous' && !bp.handicaps.includes(activeHandicap) && !bp.handicaps.includes('tous')) return false
    return true
  })

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
      <div style={{ background: '#101010', padding: '56px 160px 80px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

          {openDropdown && (
            <div style={{ position: 'fixed', inset: 0, zIndex: 10 }} onClick={() => setOpenDropdown(null)} />
          )}

          {/* Filtres */}
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
    padding: '4px 4px 4px 8px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
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
              <li key={i} style={{ fontFamily: 'var(--font)', fontSize: 18, fontWeight: 400, lineHeight: 1.2, color: '#101010', marginBottom: i < bp.commentFaire.length - 1 ? 8 : 0 }}>
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
