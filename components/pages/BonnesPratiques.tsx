"use client";
import { useState } from 'react'
import Link from 'next/link'
import { bonnesPratiques } from '../data/bonnesPratiques'
import type { Zone, Handicap } from '../data/bonnesPratiques'
import { handicaps } from '../data/handicaps'
import { lois } from '../data/lois'

const zoneOptions: { key: 'toutes' | Zone, label: string }[] = [
  { key: 'toutes', label: 'Toutes les zones' },
  { key: 'acces', label: 'Accès' },
  { key: 'scene', label: 'Scène' },
  { key: 'accueil', label: 'Accueil' },
  { key: 'services', label: 'Services & confort' },
  { key: 'hebergement', label: 'Hébergement' },
]

const handicapOptions: { key: 'tous' | Handicap, label: string }[] = [
  { key: 'tous', label: 'Tous les handicaps' },
  { key: 'moteur', label: 'Moteur' },
  { key: 'visuel', label: 'Visuel' },
  { key: 'auditif', label: 'Auditif' },
  { key: 'autisme', label: 'Autisme' },
  { key: 'psychologique', label: 'Psychologique' },
  { key: 'invisible', label: 'Invisibles' },
]

function FilterRow<T extends string>({ label, options, active, onChange, counts }: {
  label: string
  options: { key: T, label: string }[]
  active: T
  onChange: (key: T) => void
  counts?: Partial<Record<T, number>>
}) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h4 style={{ marginBottom: 10 }}>{label}</h4>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', paddingTop: counts ? 12 : 0 }}>
        {options.map(o => {
          const count = counts?.[o.key]
          const isActive = active === o.key
          return (
            <div key={o.key} style={{ position: 'relative' }}>
              {counts && count !== undefined && isActive && (
                <span style={{
                  position: 'absolute',
                  top: -9,
                  right: -7,
                  minWidth: 18,
                  height: 18,
                  borderRadius: '99px',
                  background: isActive ? 'var(--accent)' : 'var(--text)',
                  color: '#fff',
                  fontSize: 10,
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 5px',
                  lineHeight: 1,
                  zIndex: 10,
                  pointerEvents: 'none',
                }}>
                  {count}
                </span>
              )}
              <button
                onClick={() => onChange(o.key)}
                style={{
                  padding: '6px 14px',
                  fontSize: 12,
                  fontFamily: 'var(--font)',
                  border: '1px solid var(--border)',
                  background: isActive ? 'var(--text)' : 'transparent',
                  color: isActive ? '#fff' : 'var(--muted)',
                  cursor: 'pointer',
                  display: 'block',
                }}
              >
                {o.label}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function BonnesPratiquesIndex() {
  const [activeZone, setActiveZone] = useState<'toutes' | Zone>('toutes')
  const [activeHandicap, setActiveHandicap] = useState<'tous' | Handicap>('tous')

  const filtered = bonnesPratiques.filter((bp) => {
    if (activeZone !== 'toutes' && bp.zone !== activeZone) return false
    if (activeHandicap !== 'tous' && !bp.handicaps.includes(activeHandicap) && !bp.handicaps.includes('tous')) return false
    return true
  })

  // Compter les résultats par handicap selon la zone active
  const handicapCounts = handicapOptions.reduce((acc, o) => {
    if (o.key === 'tous') {
      acc[o.key] = bonnesPratiques.filter(bp =>
        activeZone === 'toutes' || bp.zone === activeZone
      ).length
    } else {
      acc[o.key] = bonnesPratiques.filter(bp => {
        if (activeZone !== 'toutes' && bp.zone !== activeZone) return false
        return bp.handicaps.includes(o.key) || bp.handicaps.includes('tous')
      }).length
    }
    return acc
  }, {} as Partial<Record<'tous' | Handicap, number>>)

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="tag">S'informer</span>
          <h1>Les bonnes pratiques</h1>
          <p style={{ fontSize: 16, maxWidth: 540, marginTop: 16, lineHeight: 1.7 }}>
            Toutes les actions concrètes, filtrables par zone du festival et par type de handicap.
          </p>
        </div>
      </div>
      <div className="container" style={{ paddingBottom: 80 }}>
        <FilterRow label="Par zone" options={zoneOptions} active={activeZone} onChange={setActiveZone} />
        <FilterRow label="Par type de handicap" options={handicapOptions} active={activeHandicap} onChange={setActiveHandicap} counts={handicapCounts} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 32 }}>
          {filtered.map((bp) => (
            <Link key={bp.id} href={`/s-informer/bonnes-pratiques/${bp.slug}`} className="card" style={{ display: 'block', textDecoration: 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 6 }}>
                <h3 style={{ marginBottom: 0 }}>{bp.titre}</h3>
                <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                  <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', border: '1px solid var(--border)', padding: '2px 6px', color: 'var(--muted)' }}>
                    {zoneOptions.find(z => z.key === bp.zone)?.label}
                  </span>
                  <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', border: '1px solid var(--border)', padding: '2px 6px', color: 'var(--muted)' }}>
                    {bp.statut}
                  </span>
                </div>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--muted)' }}>{bp.resume}</p>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p style={{ color: 'var(--muted)', fontSize: 14 }}>Aucune bonne pratique pour ces filtres.</p>
        )}
      </div>
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
