"use client";
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
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

function PlusIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M10 3V17M3 10H17" stroke="#101010" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M4 4L16 16M16 4L4 16" stroke="#101010" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function ArrowLeftIcon() {
  return (
    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" aria-hidden="true">
      <path d="M17 7.5H1M7.5 1L1 7.5L7.5 14" stroke="#101010" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" aria-hidden="true">
      <path d="M1 7.5H17M10.5 1L17 7.5L10.5 14" stroke="#101010" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

  return (
    <div className="flex gap-6 items-center">
      <div className="border border-[#dcdcdc] rounded-[20px] w-[147px] h-[141px] shrink-0 flex items-center justify-center">
        <div className="w-16 h-12 rounded-lg bg-[#ededed]" />
      </div>
      <div className="border border-[#dcdcdc] rounded-[20px] flex-1 flex items-center justify-between p-8 min-w-0">
        <div className="flex flex-col gap-[15px] min-w-0">
          <p className="text-2xl text-[#101010] leading-tight">{bp.titre}</p>
          <div className="flex gap-[10px] flex-wrap">
            <span className="border border-[#d3d3d3] rounded-full px-[14px] py-[10px] text-sm text-[#101010] leading-none whitespace-nowrap">
              {zoneLabel}
            </span>
            {handicapLabels.map(label => (
              <span key={label} className="border border-[#d3d3d3] rounded-full px-[14px] py-[10px] text-sm text-[#101010] leading-none whitespace-nowrap">
                {label}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={onOpen}
          className="border border-[#dcdcdc] rounded-full p-4 flex items-center justify-center shrink-0 ml-8 cursor-pointer"
          aria-label={`Voir la fiche : ${bp.titre}`}
        >
          <PlusIcon />
        </button>
      </div>
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

  return (
    <div
      className="fixed inset-0 bg-[rgba(77,77,77,0.24)] flex items-center justify-center z-50 px-6"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="border border-[#dcdcdc] rounded-[32px] flex overflow-hidden w-full max-w-[1128px] max-h-[90vh]">

        {/* Volet gauche */}
        <div className="bg-white flex-1 flex flex-col gap-[42px] p-6 overflow-y-auto min-w-0">
          <div className="flex flex-col gap-5">

            <div className="flex flex-col gap-4">
              <h2
                className="text-[#101010]"
                style={{ fontSize: 32, fontWeight: 600, lineHeight: 1.2, letterSpacing: 0 }}
              >
                {bp.titre}
              </h2>
              <div className="flex gap-[10px] flex-wrap">
                <span className="border border-[#d3d3d3] rounded-full px-[14px] py-[10px] text-sm text-[#101010] leading-none whitespace-nowrap">
                  {zoneLabel}
                </span>
                {handicapLabels.map(label => (
                  <span key={label} className="border border-[#d3d3d3] rounded-full px-[14px] py-[10px] text-sm text-[#101010] leading-none whitespace-nowrap">
                    {label}
                  </span>
                ))}
              </div>
              <p className="text-base font-light leading-[1.3] text-[#101010] max-w-[408px]">{bp.resume}</p>
            </div>

            <div className="flex flex-col gap-[17px]">
              <p className="text-[15px] font-semibold uppercase text-[#101010]">Comment faire</p>
              <ul className="list-disc pl-6 flex flex-col gap-2">
                {bp.commentFaire.map((step, i) => (
                  <li key={i} className="text-base font-light leading-[1.3] text-[#101010]">{step}</li>
                ))}
              </ul>
            </div>

          </div>

          <div className="flex items-center justify-between mt-auto">
            <button
              onClick={onPrev}
              disabled={!hasPrev}
              className="border border-[#dcdcdc] bg-white rounded-full p-4 flex items-center gap-2 text-sm text-[#101010] cursor-pointer disabled:opacity-40"
            >
              <ArrowLeftIcon />
              Précédent
            </button>
            <button
              onClick={onNext}
              disabled={!hasNext}
              className="border border-[#dcdcdc] bg-white rounded-full p-4 flex items-center gap-2 text-sm text-[#101010] cursor-pointer disabled:opacity-40"
            >
              Suivant
              <ArrowRightIcon />
            </button>
          </div>
        </div>

        {/* Volet droit */}
        <div className="bg-[#ededed] w-[350px] shrink-0 relative flex items-center justify-center p-12">
          <p className="text-2xl text-[#101010] text-center">
            {handicapLabels.join('\n')}
          </p>
          <button
            onClick={onClose}
            className="absolute top-5 right-5 bg-white border border-[#dcdcdc] rounded-full p-4 flex items-center justify-center cursor-pointer"
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

  const filtered = bonnesPratiques.filter((bp) => {
    if (activeZone !== 'toutes' && bp.zone !== activeZone) return false
    if (activeHandicap !== 'tous' && !bp.handicaps.includes(activeHandicap) && !bp.handicaps.includes('tous')) return false
    return true
  })

  const closeModal = useCallback(() => setSelectedIndex(null), [])

  return (
    <>
      {/* Hero */}
      <div className="px-10 pt-12 bg-white">
        <div className="max-w-[1356px] mx-auto flex flex-col gap-8">
          <div>
            <p className="text-xs text-[#101010] leading-[1.1] mb-1">Accueil / Les bonnes pratiques</p>
            <h1
              className="text-[#101010]"
              style={{ fontSize: 72, fontWeight: 600, lineHeight: 1.2, letterSpacing: 0 }}
            >
              Parcourez nos bonnes pratiques
            </h1>
          </div>
          <div className="flex justify-end">
            <p className="text-base font-light leading-[1.1] text-[#101010] w-[420px]">
              Passe à l'action dès maintenant avec notre guide complet : découvre toutes les bonnes pratiques pour rendre ton festival accessible, organisées et filtrables par zone spécifique et type de handicap, pour une expérience inclusive et réussie.
            </p>
          </div>
        </div>
      </div>

      {/* Filtres + Liste */}
      <div className="px-10 pt-14 pb-20 bg-white">
        <div className="max-w-[1356px] mx-auto flex flex-col gap-8">

          {/* Pour qui ? */}
          <div className="flex flex-col gap-7">
            <p className="text-xl text-[#101010] leading-none">Pour qui ?</p>
            <div className="flex gap-[17px] flex-wrap">
              {handicapOptions.map(o => (
                <button
                  key={o.key}
                  onClick={() => setActiveHandicap(o.key)}
                  className={`h-[42px] px-4 rounded-full text-sm text-[#101010] leading-none cursor-pointer ${activeHandicap === o.key ? 'bg-[#eee9f3]' : 'bg-[#ededed]'}`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          {/* Où ? + Cards */}
          <div className="flex gap-[95px] items-start">

            {/* Sidebar zones */}
            <div className="w-[130px] shrink-0 flex flex-col gap-4">
              <p className="text-xl text-[#101010] leading-none">Où ?</p>
              <div className="flex flex-col gap-5">
                {zoneOptions.map(o => (
                  <button
                    key={o.key}
                    onClick={() => setActiveZone(o.key)}
                    className={`text-left text-[#101010] leading-none cursor-pointer w-full ${activeZone === o.key ? 'text-base font-bold' : 'text-sm font-normal'}`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Liste de cards */}
            <div className="flex-1 flex flex-col gap-6 min-w-0">
              {filtered.length === 0 ? (
                <p className="text-sm text-[#101010] opacity-50">Aucune bonne pratique pour ces filtres.</p>
              ) : (
                filtered.map((bp, index) => (
                  <BpCard key={bp.id} bp={bp} onOpen={() => setSelectedIndex(index)} />
                ))
              )}
            </div>

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
