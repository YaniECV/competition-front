"use client";
import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { handicaps } from '../data/handicaps'

// ── Auto-évaluation par type de handicap ───────────────────────────────────
// Outil de POSITIONNEMENT (pas un audit) : l'orga se situe bien/moyen/un peu/pas
// par profil, puis repart vers les ressources pour creuser. Aucune spec/coût/loi en dur.

const LEVEL_OPTS = [
  { val: 'bien',  label: 'Je gère bien', note: "des aménagements déjà en place" },
  { val: 'moyen', label: 'Moyen', note: "quelques trucs, mais incomplet" },
  { val: 'peu',   label: 'Un peu', note: "j'y ai pensé, rien de concret" },
  { val: 'pas',   label: 'Pas du tout', note: "jamais traité" },
] as const

const QUESTION_TEXT: Record<string, string> = {
  moteur: "Le handicap moteur (fauteuils, cannes, fatigue, cheminements), tu en es où ?",
  visuel: "Le handicap visuel (malvoyance, cécité, repérage), tu gères ça comment ?",
  auditif: "Le handicap auditif (sourds, malentendants, annonces), où tu en es ?",
  autisme: "L'autisme et les troubles cognitifs (surcharge sensorielle, repères), tu en es où ?",
  psychologique: "Les troubles psychiques (anxiété, foule, attente), tu gères ça comment ?",
  invisibles: "Les handicaps invisibles (maladies chroniques, fatigue, douleurs), où tu en es ?",
}

const QUESTIONS = handicaps.map(h => ({
  id: h.slug,
  text: QUESTION_TEXT[h.slug] ?? `Le handicap « ${h.nom} », tu en es où ?`,
  type: 'single' as 'single' | 'multi',
  options: LEVEL_OPTS.map(l => ({ val: l.val, label: `${l.label} — ${l.note}` })),
}))

type Answers = Record<string, string | string[]>

const LEVEL_META: Record<string, { label: string; fill: number; gap: boolean; tone: string }> = {
  pas:   { label: 'Pas du tout',  fill: 0,   gap: true,  tone: '#e5894d' },
  peu:   { label: 'Un peu',       fill: 34,  gap: true,  tone: '#e5b14d' },
  moyen: { label: 'Moyen',        fill: 67,  gap: false, tone: '#bfd24d' },
  bien:  { label: 'Je gère bien', fill: 100, gap: false, tone: '#5ec77a' },
}
const RANK: Record<string, number> = { pas: 0, peu: 1, moyen: 2, bien: 3 }

function ResultRow({ h, level, highlight }: { h: typeof handicaps[number]; level: string; highlight?: boolean }) {
  const m = LEVEL_META[level] ?? LEVEL_META.pas
  return (
    <Link href={`/handicaps/${h.slug}`} style={{
      display: 'block', textDecoration: 'none',
      background: highlight ? 'rgba(161,34,226,0.07)' : '#161616',
      border: '1px solid ' + (highlight ? 'rgba(161,34,226,0.4)' : '#2a2a2a'),
      borderRadius: 14, padding: '18px 20px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 12 }}>
        <span style={{ fontSize: 18, fontWeight: 700, color: '#EEE9F3' }}>{h.nom}</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: m.tone, whiteSpace: 'nowrap' }}>{m.label}</span>
      </div>
      <div style={{ height: 6, background: '#2a2a2a', borderRadius: 99, overflow: 'hidden', marginBottom: 12 }}>
        <div style={{ height: '100%', width: `${m.fill}%`, background: 'linear-gradient(90deg, #a122e2, #ce9de7)', borderRadius: 99 }} />
      </div>
      <span style={{ fontSize: 13, color: 'rgba(238,233,243,0.5)' }}>Creuser : le profil + ses bonnes pratiques →</span>
    </Link>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <p style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(238,233,243,0.4)', margin: '0 0 12px' }}>{title}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>{children}</div>
    </div>
  )
}

function ResultPage({ answers, onReset }: { answers: Answers; onReset: () => void }) {
  const rated = handicaps.map(h => ({ h, level: (answers[h.slug] as string) || 'pas' }))
  rated.sort((a, b) => RANK[a.level] - RANK[b.level])
  const gaps = rated.filter(r => (LEVEL_META[r.level] ?? LEVEL_META.pas).gap)
  const oks = rated.filter(r => !(LEVEL_META[r.level] ?? LEVEL_META.pas).gap)

  return (
    <div style={{ minHeight: '100dvh', background: '#0a0a0a', color: '#EEE9F3', fontFamily: 'var(--font-atkinson), system-ui, sans-serif', padding: '64px 24px 96px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <p style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a122e2', margin: '0 0 12px' }}>Ton positionnement</p>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', margin: '0 0 14px' }}>Voilà où tu en es.</h1>
        <p style={{ fontSize: 15, color: 'rgba(238,233,243,0.6)', lineHeight: 1.6, margin: '0 0 8px', maxWidth: 540 }}>
          {gaps.length === 0
            ? "Tu sembles déjà bien avancé sur tous les profils. Continue à creuser pour aller plus loin."
            : `${gaps.length} profil${gaps.length > 1 ? 's' : ''} où tu peux progresser en priorité — clique pour voir comment faire.`}
        </p>
        <p style={{ fontSize: 12, color: 'rgba(238,233,243,0.35)', margin: '0 0 40px' }}>
          Ce n'est pas un audit officiel, juste un point de départ pour avancer.
        </p>

        {gaps.length > 0 && (
          <Section title="Par où commencer">
            {gaps.map(r => <ResultRow key={r.h.slug} h={r.h} level={r.level} highlight />)}
          </Section>
        )}
        {oks.length > 0 && (
          <Section title="Déjà sur les rails">
            {oks.map(r => <ResultRow key={r.h.slug} h={r.h} level={r.level} />)}
          </Section>
        )}

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 40 }}>
          <Link href="/s-informer/bonnes-pratiques" style={{ display: 'inline-flex', alignItems: 'center', background: '#a122e2', color: '#fff', borderRadius: 999, padding: '13px 26px', fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
            Voir toutes les bonnes pratiques →
          </Link>
          <button onClick={onReset} style={{ background: 'none', border: '1px solid #2e2e2e', color: '#EEE9F3', borderRadius: 999, padding: '13px 26px', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-atkinson), system-ui, sans-serif' }}>
            Refaire
          </button>
        </div>
      </div>
    </div>
  )
}

const INTRO_TEXT = "Quelques questions pour voir\noù en est ton festival."
const INTRO_SPEED = 28   // ms par caractère — intro (lent, soothing)
const Q_SPEED     = 40   // ms par caractère — questions (lisible)

export function AccessibleDiagnostic() {
  // ── Phase ─────────────────────────────────────────────────────────────────
  const [phase, setPhase] = useState<'intro' | 'questions'>('intro')
  const [typedChars, setTypedChars] = useState(0)
  const [introFading, setIntroFading] = useState(false)

  // ── Question ──────────────────────────────────────────────────────────────
  const [qIndex, setQIndex] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [selected, setSelected] = useState<string | string[]>('')
  const [otherText, setOtherText] = useState('')
  const [showResult, setShowResult] = useState(false)

  // ── Typewriter par question ────────────────────────────────────────────────
  const [qTypedChars, setQTypedChars] = useState(0)   // nb de chars écrits dans la question
  const [qFullyTyped, setQFullyTyped] = useState(false) // options visibles seulement quand true

  // ── 3D Animation ──────────────────────────────────────────────────────────
  const [prevQIndex, setPrevQIndex] = useState<number | null>(null)
  const [enterKey, setEnterKey] = useState(0)
  const [pushKey, setPushKey] = useState(0)

  const q = QUESTIONS[qIndex]
  const total = QUESTIONS.length

  const [showButton, setShowButton] = useState(false)

  const startQuestions = () => {
    setIntroFading(true)
    setTimeout(() => setPhase('questions'), 900)
  }

  // ── Typewriter intro ───────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'intro') return
    let i = 0
    const iv = setInterval(() => {
      i++
      setTypedChars(i)
      if (i >= INTRO_TEXT.length) {
        clearInterval(iv)
        // Bouton apparaît 600ms après la fin du typewriter
        setTimeout(() => setShowButton(true), 600)
      }
    }, INTRO_SPEED)
    return () => clearInterval(iv)
  }, [phase])

  // ── Typewriter par question — redémarre à chaque changement de question ────
  useEffect(() => {
    if (phase !== 'questions') return
    setQTypedChars(0)
    setQFullyTyped(false)
    const text = QUESTIONS[qIndex].text
    let i = 0
    const iv = setInterval(() => {
      i++
      setQTypedChars(i)
      if (i >= text.length) {
        clearInterval(iv)
        // Options apparaissent 200ms après que la question soit entièrement écrite
        setTimeout(() => setQFullyTyped(true), 200)
      }
    }, Q_SPEED)
    return () => clearInterval(iv)
  }, [qIndex, phase])

  // Sync selection on back navigation
  useEffect(() => {
    const existing = answers[QUESTIONS[qIndex].id]
    setSelected(existing ?? (q.type === 'multi' ? [] : ''))
    setOtherText('')
  }, [qIndex, answers, q.type])

  const canAdvance = q.type === 'multi'
    ? (selected as string[]).length > 0
    : (selected as string) !== ''

  const advance = useCallback(() => {
    if (!canAdvance) return
    const newAnswers = { ...answers, [q.id]: selected }
    setAnswers(newAnswers)

    if (qIndex === total - 1) {
      setPrevQIndex(qIndex)
      setPushKey(k => k + 1)
      setTimeout(() => setShowResult(true), 480)
      return
    }

    // 3D transition: push current to back, pull next to front
    setPrevQIndex(qIndex)
    setPushKey(k => k + 1)
    setTimeout(() => {
      setQIndex(i => i + 1)
      setEnterKey(k => k + 1)
      setTimeout(() => setPrevQIndex(null), 700)
    }, 380)
  }, [canAdvance, q, answers, qIndex, total, selected, otherText])

  const goBack = useCallback(() => {
    if (qIndex === 0) return
    setPrevQIndex(null)
    setQIndex(i => i - 1)
    setEnterKey(k => k + 1)
  }, [qIndex])

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Enter' && canAdvance && phase === 'questions') advance() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [advance, canAdvance, phase])

  const toggleMulti = (val: string) => {
    const arr = (selected as string[]) || []
    setSelected(arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val])
  }

  if (showResult) return (
    <ResultPage
      answers={answers}
      onReset={() => {
        setShowResult(false); setPhase('intro'); setTypedChars(0); setIntroFading(false)
        setQIndex(0); setAnswers({}); setSelected(''); setEnterKey(0)
        setPrevQIndex(null); setPushKey(0)
      }}
    />
  )

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', background: '#0a0a0a', fontFamily: 'var(--font-atkinson), system-ui, sans-serif' }}>
      <style>{`
        * { text-wrap: balance; }

        @keyframes tw-blink { 0%,100%{opacity:1} 50%{opacity:0} }

        @keyframes intro-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes intro-out {
          0%   { opacity: 1; filter: blur(0px); }
          100% { opacity: 0; filter: blur(8px); }
        }

        @keyframes push-back {
          0%   { transform: perspective(1000px) translateZ(0)    scale(1)    rotateX(0deg);  filter: blur(0px);  opacity: 1; }
          100% { transform: perspective(1000px) translateZ(-240px) scale(0.8) rotateX(10deg); filter: blur(12px); opacity: 0.18; }
        }
        @keyframes pull-forward {
          0%   { transform: perspective(1000px) translateZ(80px) scale(1.06); filter: blur(7px); opacity: 0; }
          100% { transform: perspective(1000px) translateZ(0)    scale(1)    rotateX(0deg);  filter: blur(0px); opacity: 1; }
        }

        @keyframes opt-in {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes btn-in {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .start-btn:hover { background: #f0f0f0 !important; transform: translateY(-1px); }
        .start-btn:active { transform: translateY(0); }

        .diag-opt { transition: background 0.15s, border-color 0.15s, box-shadow 0.15s, transform 0.12s; }
        .diag-opt:hover { transform: translateY(-2px); box-shadow: 0 4px 16px rgba(0,0,0,0.07); }
        .diag-opt:active { transform: translateY(0); }

        @media (max-width: 600px) { .diag-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      {/* ─── INTRO PHASE — fond noir comme le design ─── */}
      {phase === 'intro' && (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 32px', background: '#0a0a0a', margin: '-1px' }}>
          <div style={{
            maxWidth: 680,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 40,
            animation: introFading
              ? 'intro-out 0.9s ease forwards'
              : 'intro-in 1.2s ease forwards',
          }}>
            {/* Texte typewriter */}
            <p style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: '#fff', lineHeight: 1.15, letterSpacing: '-0.03em', margin: 0 }}>
              {INTRO_TEXT.slice(0, typedChars).split('\n').map((line, i, arr) => (
                <React.Fragment key={i}>{line}{i < arr.length - 1 && <br />}</React.Fragment>
              ))}
              {!showButton && (
                <span style={{ display: 'inline-block', width: 3, height: '0.85em', background: '#fff', marginLeft: 4, verticalAlign: 'middle', animation: 'tw-blink 0.9s step-end infinite' }} />
              )}
            </p>

            {/* Chips features */}
            {showButton && (
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', animation: 'btn-in 0.5s cubic-bezier(0.22,1,0.36,1) forwards' }}>
                {[
                  { title: 'Ton positionnement', sub: 'profil par profil' },
                  { title: 'Tes priorités', sub: 'par où commencer' },
                  { title: 'Les ressources', sub: 'pour creuser' },
                ].map(chip => (
                  <div key={chip.title} style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 12,
                    width: 148,
                    height: 56,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: '#fff', margin: '0 0 2px' }}>{chip.title}</p>
                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', margin: 0 }}>{chip.sub}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Bouton Commencer */}
            {showButton && (
              <button
                className="start-btn"
                onClick={startQuestions}
                style={{
                  background: '#fff',
                  color: '#000',
                  border: 'none',
                  borderRadius: 999,
                  padding: '16px 48px',
                  fontSize: 17,
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-atkinson), system-ui, sans-serif',
                  letterSpacing: '-0.01em',
                  transition: 'background 0.2s, transform 0.15s',
                  animation: 'btn-in 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s both',
                }}
              >
                Commencer
              </button>
            )}

            {/* Sous-titre sous le bouton */}
            {showButton && (
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.04em', margin: 0, fontFamily: 'var(--font-atkinson), system-ui, sans-serif', animation: 'btn-in 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s both' }}>
                6 questions · 2 min · gratuit
              </p>
            )}
          </div>
        </div>
      )}

      {/* ─── QUESTIONS PHASE ─── */}
      {phase === 'questions' && (
        <>
          {/* Header */}
          <div style={{ padding: '20px 40px 0', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 13, color: '#9491a1', textDecoration: 'none', letterSpacing: '-0.01em' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                Retour
              </a>
              <span style={{ fontSize: 11, color: '#bbb', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'monospace' }}>
                {qIndex + 1} / {total}
              </span>
            </div>
            <div style={{ height: 2.5, background: '#2e2e2e', borderRadius: 99 }}>
              <div style={{ height: '100%', width: `${((qIndex + 1) / total) * 100}%`, background: 'linear-gradient(90deg, #a122e2, #ce9de7)', borderRadius: 99, transition: 'width 0.7s cubic-bezier(0.22,1,0.36,1)' }} />
            </div>
          </div>

          {/* Stage — centré */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '32px 48px 100px', width: '100%' }}>

            {/* Question précédente en blur — visible derrière */}
            {prevQIndex !== null && (
              <p
                key={`blur-${pushKey}`}
                style={{
                  fontSize: 'clamp(1.4rem, 2.8vw, 2.2rem)',
                  fontWeight: 400,
                  color: '#5b5b5b',
                  lineHeight: 1.25,
                  letterSpacing: '-0.02em',
                  filter: 'blur(7px)',
                  opacity: 0.5,
                  pointerEvents: 'none',
                  marginBottom: 48,
                  animation: 'intro-in 0.3s ease forwards',
                }}
              >
                {QUESTIONS[prevQIndex].text}
              </p>
            )}

            {/* Question courante — typewriter */}
            <div
              key={`enter-${enterKey}`}
              style={{
                width: '100%',
                maxWidth: 620,
                textAlign: 'center',
                animation: enterKey > 0
                  ? 'pull-forward 0.65s cubic-bezier(0.22,1,0.36,1) forwards'
                  : 'intro-in 0.6s cubic-bezier(0.22,1,0.36,1) forwards',
              }}
            >
              <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 400, color: '#EEE9F3', lineHeight: 1.2, marginBottom: 40, letterSpacing: '-0.025em', fontFamily: 'var(--font-atkinson), system-ui, sans-serif', textTransform: 'none', textAlign: 'center' }}>
                {q.text.slice(0, qTypedChars)}
                <span style={{ display: 'inline-block', width: 2.5, height: '0.85em', background: '#EEE9F3', marginLeft: 5, verticalAlign: 'middle', animation: 'tw-blink 0.9s step-end infinite' }} />
              </h1>

              {(q as { hint?: string }).hint && (
                <p style={{ fontSize: 13, color: '#bbb', margin: '-28px 0 24px', opacity: qFullyTyped ? 1 : 0, transition: 'opacity 0.4s ease' }}>{(q as { hint?: string }).hint}</p>
              )}

              {/* Options */}
              <div
                className="diag-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: q.type === 'multi' ? 'repeat(2, 1fr)' : '1fr',
                  gap: 10,
                  maxWidth: q.type === 'multi' ? 540 : 420,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  pointerEvents: qFullyTyped ? 'auto' : 'none',
                }}
              >
                {q.options.map((opt, idx) => {
                  const isMulti = q.type === 'multi'
                  const isSelected = isMulti
                    ? (selected as string[]).includes(opt.val)
                    : selected === opt.val
                  return (
                    <div key={opt.val} style={{
                      opacity: qFullyTyped ? 1 : 0,
                      transform: qFullyTyped ? 'translateY(0)' : 'translateY(16px)',
                      transition: `opacity 0.45s ease ${0.1 + idx * 0.08}s, transform 0.45s cubic-bezier(0.22,1,0.36,1) ${0.1 + idx * 0.08}s`,
                    }}>
                      <button
                        className="diag-opt"
                        onClick={() => isMulti ? toggleMulti(opt.val) : setSelected(opt.val)}
                        style={{
                          width: '100%', textAlign: 'left',
                          background: isSelected ? 'rgba(161,34,226,0.2)' : '#1c1c1c',
                          border: isSelected ? '1.5px solid #a122e2' : '1.5px solid #2e2e2e',
                          borderRadius: 14, padding: '15px 18px', fontSize: 15, color: '#EEE9F3',
                          cursor: 'pointer', fontFamily: 'var(--font-atkinson), system-ui, sans-serif',
                          display: 'flex', alignItems: 'center', gap: 12,
                          boxShadow: isSelected ? '0 0 0 3px rgba(161,34,226,0.2)' : 'none',
                        }}
                      >
                        <span style={{
                          width: 20, height: 20, borderRadius: isMulti ? 5 : '50%',
                          border: isSelected ? '2px solid #a122e2' : '2px solid #ddd',
                          background: isSelected ? '#a122e2' : 'transparent',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0, transition: 'all 0.18s',
                        }}>
                          {isSelected && <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                        </span>
                        {opt.label}
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Footer nav — fixed, style Figma exact */}
          <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '16px 48px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(10,10,10,0.88)', backdropFilter: 'blur(16px)', zIndex: 50 }}>

            {/* Precedent — cercle pointilles + icone retour */}
            <button
              onClick={goBack}
              disabled={qIndex === 0}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                background: 'none', border: 'none', cursor: qIndex === 0 ? 'default' : 'pointer',
                opacity: qIndex === 0 ? 0 : 1, transition: 'opacity 0.3s',
                fontFamily: 'var(--font-atkinson), system-ui, sans-serif', padding: 0,
              }}
            >
              <div style={{ width: 55, height: 55, borderRadius: '50%', border: '1.5px dashed #929292', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#929292" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>
                </svg>
              </div>
              <span style={{ fontSize: 20, color: '#929292' }}>Precedent</span>
            </button>

            {/* Suivant — pill noir */}
            <button
              onClick={advance}
              style={{
                background: '#000', color: '#fff', border: 'none',
                borderRadius: 999, padding: '14px 32px', fontSize: 20,
                cursor: 'pointer', fontFamily: 'var(--font-atkinson), system-ui, sans-serif',
                opacity: canAdvance ? 1 : 0,
                pointerEvents: canAdvance ? 'auto' : 'none',
                transform: canAdvance ? 'translateY(0)' : 'translateY(6px)',
                transition: 'opacity 0.3s ease, transform 0.3s ease',
              }}
            >
              {qIndex === total - 1 ? 'Voir le résultat' : 'Suivant'}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
