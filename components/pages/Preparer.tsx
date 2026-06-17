"use client";
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { articles } from '../data/articles'
import type { Article } from '../data/articles'

// ── Questions ─────────────────────────────────────────────────────────────────

const QUESTIONS = [
  {
    id: 'jauge',
    text: 'Ton festival fait combien de personnes ?',
    type: 'single' as const,
    options: [
      { val: 'micro',  label: 'Moins de 300' },
      { val: 'petit',  label: '300 à 1 500' },
      { val: 'moyen',  label: '1 500 à 5 000' },
      { val: 'grand',  label: 'Plus de 5 000' },
    ],
  },
  {
    id: 'terrain',
    text: 'Ton terrain c\'est quoi ?',
    type: 'single' as const,
    options: [
      { val: 'herbe',  label: 'Herbe / terre' },
      { val: 'bitume', label: 'Bitume' },
      { val: 'mixte',  label: 'Mixte' },
      { val: 'salle',  label: 'En salle' },
    ],
  },
  {
    id: 'duree',
    text: 'Ton festival dure combien de jours ?',
    type: 'single' as const,
    options: [
      { val: '1j',     label: '1 jour' },
      { val: '2-3j',   label: '2-3 jours' },
      { val: '3j+',    label: 'Plus de 3 jours' },
    ],
  },
  {
    id: 'espaces',
    text: 'Ton festival c\'est quoi comme espaces ?',
    type: 'multi' as const,
    hint: 'Sélectionne tout ce qui s\'applique',
    options: [
      { val: 'scene',    label: 'Scène' },
      { val: 'buvettes', label: 'Buvettes / bars' },
      { val: 'parking',  label: 'Parking' },
      { val: 'toilettes',label: 'Toilettes' },
      { val: 'camping',  label: 'Camping' },
      { val: 'repos',    label: 'Espace repos' },
    ],
  },
  {
    id: 'budget',
    text: 'T\'as un budget accessibilité ?',
    type: 'single-other' as const,
    options: [
      { val: 'zero',   label: 'Pas encore' },
      { val: 'petit',  label: 'Moins de 1 000 €' },
      { val: 'moyen',  label: '1 000 € à 5 000 €' },
      { val: 'grand',  label: 'Plus de 5 000 €' },
      { val: 'other',  label: 'Autre' },
    ],
  },
] as const

type Answers = Record<string, string | string[]>

// ── Résultats data ────────────────────────────────────────────────────────────

const OBLIGATIONS = [
  '2 % minimum des places de stationnement réservées PMR',
  'Cheminements accessibles (largeur ≥ 1,40 m)',
  'Sanitaires adaptés sur le site',
  'Accueil principal accessible en fauteuil',
  "Plan d'évacuation adapté aux PSH",
]

const PRESTATAIRES = [
  { n: 'Accès Culture',  d: 'Boucles magnétiques, formations, accompagnement', url: 'https://www.acces-culture.org' },
  { n: 'ATH',            d: 'Assistance Technique Handicap — conseil et audit', url: '#' },
  { n: 'CEMAFORRE',      d: 'Centre national ressources loisirs — formations', url: 'https://www.cemaforre.asso.fr' },
  { n: 'DRAC',           d: 'Subventions et accompagnement culturel public', url: '#' },
]

function getRecos(answers: Answers): Article[] {
  const budget = answers.budget as string
  const selectedKeys = (answers.handicaps as string[]) || []
  const jauge = answers.jauge as string
  const statutFilter = budget === 'zero' || budget === 'petit'
    ? ['essentiel']
    : budget === 'moyen'
    ? ['essentiel', 'recommande']
    : ['essentiel', 'recommande', 'avance']
  return articles.filter(a => {
    if (!statutFilter.includes(a.statut)) return false
    if (selectedKeys.length > 0 && !a.handicaps.some(h => selectedKeys.includes(h))) return false
    if (jauge === 'petit' && a.statut === 'avance') return false
    return true
  }).slice(0, 8)
}

// ── Result page ───────────────────────────────────────────────────────────────

function ResultPage({ answers, onReset }: { answers: Answers; onReset: () => void }) {
  const recos = getRecos(answers)
  return (
    <div style={{ minHeight: '100dvh', background: '#f7f7f7', fontFamily: 'var(--font-atkinson), system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ position: 'sticky', top: 0, background: '#f7f7f7', zIndex: 10, padding: '20px 48px 0' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 15, color: '#000', textDecoration: 'none' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Retour à l'accueil
        </Link>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 32px 80px' }}>
        <p style={{ fontSize: 13, color: '#929292', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>Ton plan d'action</p>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#000', marginBottom: 48, lineHeight: 1.1 }}>
          Voilà ce qu'on te recommande.
        </h1>

        {/* Profil */}
        <div style={{ marginBottom: 56 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#929292', marginBottom: 16 }}>01 — Ton profil festival</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: '#d1d1d1' }}>
            {[
              { l: 'Jauge', v: answers.jauge as string },
              { l: 'Terrain', v: answers.terrain as string },
              { l: 'Budget', v: answers.budget as string },
            ].map(r => (
              <div key={r.l} style={{ background: '#f7f7f7', padding: '20px 24px' }}>
                <p style={{ fontSize: 10, color: '#929292', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{r.l}</p>
                <p style={{ fontSize: 18, fontWeight: 700, color: '#000' }}>{r.v}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommandations */}
        <div style={{ marginBottom: 56 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#929292', marginBottom: 16 }}>02 — Plan d'action</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {recos.map((a, i) => (
              <div key={a.id} style={{ background: '#fff', border: '1px solid #e5e5e5', padding: '20px 24px', display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 11, color: '#929292', minWidth: 24, paddingTop: 3, fontFamily: 'monospace' }}>{String(i + 1).padStart(2, '0')}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 15, fontWeight: 600, color: '#000', marginBottom: 4 }}>{a.titre}</p>
                  <p style={{ fontSize: 13, color: '#5b5b5b', lineHeight: 1.6 }}>{a.resume}</p>
                </div>
                <span style={{ fontSize: 10, border: '1px solid #e5e5e5', padding: '3px 8px', color: '#929292', whiteSpace: 'nowrap', flexShrink: 0 }}>{a.statut}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Obligations légales */}
        <div style={{ marginBottom: 56 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#929292', marginBottom: 16 }}>03 — Obligations légales</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {OBLIGATIONS.map(o => (
              <div key={o} style={{ background: '#fff', border: '1px solid #e5e5e5', padding: '14px 20px', display: 'flex', gap: 14, fontSize: 14, color: '#000' }}>
                <span style={{ color: '#a122e2' }}>⚖</span><span>{o}</span>
              </div>
            ))}
          </div>
          <Link href="/s-informer/les-lois" style={{ fontSize: 13, color: '#929292', textDecoration: 'underline', display: 'inline-block', marginTop: 12 }}>
            Consulter le cadre légal complet →
          </Link>
        </div>

        {/* Prestataires */}
        <div style={{ marginBottom: 56 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#929292', marginBottom: 16 }}>04 — Qui peut t'aider</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: '#d1d1d1' }}>
            {PRESTATAIRES.map(p => (
              <div key={p.n} style={{ background: '#fff', padding: '20px 24px' }}>
                <p style={{ fontSize: 15, fontWeight: 700, color: '#000', marginBottom: 6 }}>{p.n}</p>
                <p style={{ fontSize: 13, color: '#5b5b5b', lineHeight: 1.6 }}>{p.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            onClick={onReset}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1.5px dashed #929292', borderRadius: 999, padding: '12px 24px', background: 'none', cursor: 'pointer', fontSize: 15, color: '#929292', fontFamily: 'var(--font-atkinson), system-ui, sans-serif' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: 'scaleX(-1)' }}><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/></svg>
            Recommencer
          </button>
          <a
            href="mailto:contact@fmm.fr"
            style={{ display: 'inline-block', background: '#000', color: '#fff', borderRadius: 999, padding: '14px 28px', fontSize: 15, textDecoration: 'none', fontFamily: 'var(--font-atkinson), system-ui, sans-serif' }}
          >
            Demander un accompagnement FMM →
          </a>
        </div>
      </div>
    </div>
  )
}

// ── Main diagnostic ───────────────────────────────────────────────────────────

export function AccessibleDiagnostic() {
  const [qIndex, setQIndex] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [selected, setSelected] = useState<string | string[]>('')
  const [otherText, setOtherText] = useState('')
  const [animKey, setAnimKey] = useState(0)
  const [prevText, setPrevText] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [exiting, setExiting] = useState(false)

  const q = QUESTIONS[qIndex]
  const total = QUESTIONS.length
  const progress = ((qIndex) / total) * 100

  // Sync selected with already-given answer when going back
  useEffect(() => {
    const existing = answers[QUESTIONS[qIndex].id]
    if (existing !== undefined) {
      setSelected(existing)
    } else {
      setSelected(q.type === 'multi' ? [] : '')
    }
    setOtherText('')
  }, [qIndex, answers, q.type])

  const canAdvance = q.type === 'multi'
    ? (selected as string[]).length > 0
    : q.type === 'single-other'
    ? (selected as string) !== '' && ((selected as string) !== 'other' || otherText.trim() !== '')
    : (selected as string) !== ''

  const advance = useCallback(() => {
    if (!canAdvance) return

    const finalVal = q.type === 'single-other' && selected === 'other' ? otherText.trim() : selected
    const newAnswers = { ...answers, [q.id]: finalVal }
    setAnswers(newAnswers)

    if (qIndex === total - 1) {
      setExiting(true)
      setTimeout(() => { setShowResult(true) }, 350)
      return
    }

    // Transition
    setPrevText(q.text)
    setExiting(true)
    setTimeout(() => {
      setQIndex(i => i + 1)
      setAnimKey(k => k + 1)
      setExiting(false)
      setPrevText(null)
    }, 300)
  }, [canAdvance, answers, q.id, q.text, selected, qIndex, total])

  const goBack = useCallback(() => {
    if (qIndex === 0) return
    setPrevText(null)
    setExiting(true)
    setTimeout(() => {
      setQIndex(i => i - 1)
      setAnimKey(k => k + 1)
      setExiting(false)
    }, 250)
  }, [qIndex])

  // Keyboard: Enter = advance
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && canAdvance) advance()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [advance, canAdvance])

  const toggleMulti = (val: string) => {
    const arr = (selected as string[]) || []
    setSelected(arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val])
  }

  if (showResult) return <ResultPage answers={answers} onReset={() => { setShowResult(false); setQIndex(0); setAnswers({}); setSelected(''); setAnimKey(0); setPrevText(null); setExiting(false) }} />

  return (
    <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column', background: '#f7f7f7', fontFamily: 'var(--font-atkinson), system-ui, sans-serif', overflow: 'hidden' }}>
      <style>{`
        @keyframes questionIn {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes optionsIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        .diag-option:hover {
          background: rgba(161,34,226,0.06) !important;
          border-color: #a122e2 !important;
        }
        @media (max-width: 640px) {
          .diag-options { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── Header ── */}
      <div style={{ padding: '20px 48px 0', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 15, color: '#000', textDecoration: 'none' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Retour à l'accueil
          </Link>
          <span style={{ fontSize: 13, color: '#6b7280' }}>Question {qIndex + 1}/{total}</span>
        </div>

        {/* Progress bar */}
        <div style={{ height: 5, background: '#e5e7eb', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${progress + (1 / total) * 100}%`,
            background: 'linear-gradient(90deg, #a122e2, #ce9de7)',
            borderRadius: 3,
            transition: 'width 0.4s ease',
          }} />
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 48px', position: 'relative', overflow: 'hidden' }}>

        {/* Previous question — blurred ghost */}
        {prevText && (
          <p style={{
            position: 'absolute',
            top: '15%',
            left: 48,
            right: 48,
            fontSize: 'clamp(1.4rem, 3vw, 2.4rem)',
            color: '#5b5b5b',
            lineHeight: 1.25,
            filter: 'blur(8px)',
            opacity: 0.35,
            pointerEvents: 'none',
            fontWeight: 400,
          }}>
            {prevText}
          </p>
        )}

        {/* Current question */}
        <div
          key={animKey}
          style={{
            animation: `questionIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards`,
            opacity: exiting ? 0 : 1,
            transform: exiting ? 'translateY(-24px)' : 'translateY(0)',
            transition: exiting ? 'opacity 0.25s ease, transform 0.25s ease' : 'none',
            maxWidth: 780,
          }}
        >
          {/* Question text */}
          <h1 style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.5rem)', fontWeight: 400, color: '#000', lineHeight: 1.2, marginBottom: 40 }}>
            {q.text}
            <span style={{ display: 'inline-block', width: 2, height: '1em', background: '#000', marginLeft: 4, verticalAlign: 'middle', animation: 'cursorBlink 1s step-end infinite' }} />
          </h1>

          {'hint' in q && q.hint && (
            <p style={{ fontSize: 13, color: '#929292', marginBottom: 20, marginTop: -32 }}>{q.hint}</p>
          )}

          {/* Options */}
          <div
            className="diag-options"
            style={{
              display: 'grid',
              gridTemplateColumns: q.type === 'multi' ? 'repeat(2, 1fr)' : '1fr',
              gap: 10,
              maxWidth: q.type === 'multi' ? 640 : 480,
              animation: `optionsIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both`,
            }}
          >
            {q.options.map(opt => {
              const isMulti = q.type === 'multi'
              const isSelected = isMulti
                ? (selected as string[]).includes(opt.val)
                : selected === opt.val
              const isOther = opt.val === 'other'

              return (
                <div key={opt.val} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <button
                    className="diag-option"
                    onClick={() => {
                      if (isMulti) {
                        toggleMulti(opt.val)
                      } else {
                        setSelected(opt.val)
                      }
                    }}
                    style={{
                      textAlign: 'left',
                      background: isSelected ? 'rgba(161,34,226,0.08)' : '#fff',
                      border: isSelected ? '1.5px solid #a122e2' : '1.5px solid #e5e5e5',
                      borderRadius: 12,
                      padding: '16px 20px',
                      fontSize: 16,
                      color: '#000',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-atkinson), system-ui, sans-serif',
                      transition: 'all 0.15s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      width: '100%',
                    }}
                  >
                    <span style={{
                      width: 20, height: 20, borderRadius: isMulti ? 4 : '50%',
                      border: isSelected ? '2px solid #a122e2' : '2px solid #d1d1d1',
                      background: isSelected ? '#a122e2' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, transition: 'all 0.15s',
                    }}>
                      {isSelected && <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </span>
                    {opt.label}
                  </button>

                  {/* Champ libre pour "Autre" */}
                  {isOther && isSelected && (
                    <input
                      autoFocus
                      value={otherText}
                      onChange={e => setOtherText(e.target.value)}
                      placeholder="Précise ton budget…"
                      style={{
                        border: '1.5px solid #a122e2',
                        borderRadius: 12,
                        padding: '14px 18px',
                        fontSize: 16,
                        fontFamily: 'var(--font-atkinson), system-ui, sans-serif',
                        outline: 'none',
                        background: '#fff',
                        color: '#000',
                        width: '100%',
                        boxSizing: 'border-box',
                      }}
                      onKeyDown={e => { if (e.key === 'Enter' && canAdvance) advance() }}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Footer nav ── */}
      <div style={{ padding: '20px 48px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        {/* Précèdent */}
        <button
          onClick={goBack}
          disabled={qIndex === 0}
          style={{
            display: 'flex', alignItems: 'center', gap: 12,
            background: 'none', border: 'none', cursor: qIndex === 0 ? 'default' : 'pointer',
            opacity: qIndex === 0 ? 0.3 : 1, transition: 'opacity 0.2s',
          }}
        >
          <div style={{
            width: 55, height: 55, borderRadius: '50%',
            border: '2px dashed #929292',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#929292" strokeWidth="2" style={{ transform: 'scaleX(-1)' }}>
              <path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>
            </svg>
          </div>
          <span style={{ fontSize: 20, color: '#929292', fontFamily: 'var(--font-atkinson), system-ui, sans-serif' }}>Précèdent</span>
        </button>

        {/* Suivant */}
        <button
          onClick={advance}
          disabled={!canAdvance}
          style={{
            background: canAdvance ? '#000' : '#d1d1d1',
            color: '#fff',
            border: 'none',
            borderRadius: 999,
            padding: '14px 32px',
            fontSize: 20,
            cursor: canAdvance ? 'pointer' : 'default',
            fontFamily: 'var(--font-atkinson), system-ui, sans-serif',
            transition: 'all 0.2s',
          }}
        >
          {qIndex === total - 1 ? 'Voir mon plan →' : 'Suivant'}
        </button>
      </div>
    </div>
  )
}
