"use client";
import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from '@phosphor-icons/react/dist/ssr'
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
  moteur: "Quand tu penses à l'accessibilité pour les personnes en situation de handicap lors de ton festival (mobilité, handicap auditif, visuel, cognitif…), où tu en es globalement ?",
  visuel: "Le handicap visuel (malvoyance, cécité, repérage), tu gères ça comment ?",
  auditif: "Le handicap auditif (sourds, malentendants, annonces), où tu en es ?",
  autisme: "L'autisme et les troubles cognitifs (surcharge sensorielle, repères), tu en es où ?",
  psychologique: "Les troubles psychiques (anxiété, foule, attente), tu gères ça comment ?",
  invisibles: "Les handicaps invisibles (maladies chroniques, fatigue, douleurs), où tu en es ?",
}

const FIRST_Q_OPTS = [
  { val: 'bien',  label: "Bien géré, des dispositifs sont en place pour plusieurs types de handicap" },
  { val: 'moyen', label: "En cours, quelques actions existent mais c'est encore incomplet" },
  { val: 'peu',   label: "Démarré, j'y ai réfléchi mais rien de concret pour l'instant" },
  { val: 'pas',   label: "Pas encore adressé" },
]

const QUESTIONS = handicaps.map((h, i) => ({
  id: h.slug,
  text: QUESTION_TEXT[h.slug] ?? `Le handicap « ${h.nom} », tu en es où ?`,
  type: 'single' as 'single' | 'multi',
  options: i === 0
    ? FIRST_Q_OPTS
    : LEVEL_OPTS.map(l => ({ val: l.val, label: `${l.label} — ${l.note}` })),
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

const INTRO_TEXT = "Quelques questions pour voir où en est ton festival avec l'accessibilité."

export function AccessibleDiagnostic() {
  // ── Phase ─────────────────────────────────────────────────────────────────
  const [phase, setPhase] = useState<'intro' | 'questions'>('intro')
  const [introFading, setIntroFading] = useState(false)

  // ── Question ──────────────────────────────────────────────────────────────
  const [qIndex, setQIndex] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [selected, setSelected] = useState<string | string[]>('')
  const [otherText, setOtherText] = useState('')
  const [showResult, setShowResult] = useState(false)

  // ── 3D Animation ──────────────────────────────────────────────────────────
  const [prevQIndex, setPrevQIndex] = useState<number | null>(null)
  const [enterKey, setEnterKey] = useState(0)
  const [pushKey, setPushKey] = useState(0)

  const q = QUESTIONS[qIndex]
  const total = QUESTIONS.length

  const startQuestions = () => {
    setIntroFading(true)
    setTimeout(() => setPhase('questions'), 900)
  }


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
        setShowResult(false); setPhase('intro'); setIntroFading(false)
        setQIndex(0); setAnswers({}); setSelected(''); setEnterKey(0)
        setPrevQIndex(null); setPushKey(0)
      }}
    />
  )

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', background: '#0a0a0a', fontFamily: 'var(--font-atkinson), system-ui, sans-serif' }}>
      <style>{`
        * { text-wrap: balance; }

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
        .diag-opt { transition: background 0.15s, border-color 0.15s, box-shadow 0.15s, transform 0.12s; }
        .diag-opt:hover { transform: translateY(-2px); box-shadow: 0 4px 16px rgba(0,0,0,0.07); }
        .diag-opt:active { transform: translateY(0); }

        @media (max-width: 600px) { .diag-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      {/* ─── INTRO PHASE ─── */}
      {phase === 'intro' && (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 32px', background: '#0a0a0a' }}>
          <div style={{
            maxWidth: 760,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 48,
            animation: introFading ? 'intro-out 0.9s ease forwards' : 'intro-in 0.8s ease forwards',
          }}>
            <h2 style={{
              fontFamily: 'var(--font-title)',
              fontSize: 80,
              fontWeight: 400,
              color: '#EEE9F3',
              lineHeight: 1,
              textTransform: 'uppercase',
              letterSpacing: 0,
              margin: 0,
            }}>
              {INTRO_TEXT.split('\n').map((line, i, arr) => (
                <React.Fragment key={i}>{line}{i < arr.length - 1 && <br />}</React.Fragment>
              ))}
            </h2>

            <p style={{
              fontFamily: 'var(--font)',
              fontSize: 18,
              fontWeight: 400,
              lineHeight: 1.4,
              color: '#9491a1',
              margin: 0,
              maxWidth: 480,
            }}>
              5 minutes suffisent. Tu repars avec des ressources concrètes adaptées à ton festival pour agir dès maintenant.
            </p>

            <button
              onClick={startQuestions}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 16,
                background: '#EEE9F3',
                border: 'none',
                borderRadius: 12,
                paddingLeft: 16,
                paddingRight: 4,
                paddingTop: 4,
                paddingBottom: 4,
                cursor: 'pointer',
                transition: 'background 0.2s ease',
                fontFamily: 'var(--font)',
                fontSize: 16,
                fontWeight: 500,
                color: '#101010',
                animation: 'btn-in 0.6s cubic-bezier(0.22,1,0.36,1) 0.2s both',
              }}
            >
              Commencer
              <span style={{ width: 32, height: 32, borderRadius: 8, background: '#A122E2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <ArrowRight size={16} weight="regular" color="#EEE9F3" />
              </span>
            </button>
          </div>
        </div>
      )}

      {/* ─── QUESTIONS PHASE ─── */}
      {phase === 'questions' && (
        <>
          {/* Header */}
          <div style={{ padding: '24px 40px 0', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font)', fontSize: 16, fontWeight: 500, color: '#9491a1', textDecoration: 'none', lineHeight: 1 }}>
                <ArrowLeft size={16} weight="regular" color="#9491a1" />
                Retour
              </a>
              <span style={{ fontFamily: 'var(--font)', fontSize: 16, fontWeight: 400, color: '#9491a1', lineHeight: 1 }}>
                {qIndex + 1} / {total}
              </span>
            </div>
            <div style={{ height: 6, background: '#2e2e2e', borderRadius: 99 }}>
              <div style={{ height: '100%', width: `${((qIndex + 1) / total) * 100}%`, background: 'linear-gradient(90deg, #A122E2, #ce9de7)', borderRadius: 99, transition: 'width 0.7s cubic-bezier(0.22,1,0.36,1)' }} />
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
                animation: 'intro-in 0.8s ease forwards',
              }}
            >
              <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 500, color: '#F1EDF5', lineHeight: 1.1, marginBottom: 40, letterSpacing: 0, fontFamily: 'var(--font)', textTransform: 'none', textAlign: 'center' }}>
                {q.text}
              </h1>

              {(q as { hint?: string }).hint && (
                <p style={{ fontSize: 13, color: '#bbb', margin: '-28px 0 24px' }}>{(q as { hint?: string }).hint}</p>
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
                }}
              >
                {q.options.map((opt, idx) => {
                  const isMulti = q.type === 'multi'
                  const isSelected = isMulti
                    ? (selected as string[]).includes(opt.val)
                    : selected === opt.val
                  return (
                    <div key={opt.val} style={{
                      animation: `opt-in 0.5s cubic-bezier(0.22,1,0.36,1) ${0.05 + idx * 0.07}s both`,
                    }}>
                      <button
                        className="diag-opt"
                        onClick={() => isMulti ? toggleMulti(opt.val) : setSelected(opt.val)}
                        style={{
                          width: '100%', textAlign: 'left',
                          background: isSelected ? 'rgba(161,34,226,0.07)' : 'transparent',
                          border: '1.5px solid',
                          borderColor: isSelected ? '#A122E2' : '#3b3b39',
                          borderRadius: 12, padding: '16px 20px',
                          color: '#EEE9F3',
                          cursor: 'pointer', fontFamily: 'var(--font)',
                          display: 'flex', alignItems: 'center', gap: 16,
                          transition: 'background 0.15s, border-color 0.15s',
                        }}
                      >
                        <span style={{
                          width: 18, height: 18, borderRadius: 4, flexShrink: 0,
                          border: isSelected ? 'none' : '1.5px solid #3b3b39',
                          background: isSelected ? '#A122E2' : 'transparent',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          transition: 'background 0.15s ease',
                        }}>
                          {isSelected && (
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                              <path d="M1 4L3.5 6.5L9 1" stroke="#EEE9F3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </span>
                        <span style={{ fontFamily: 'var(--font)', fontSize: 16, fontWeight: 500, color: '#F1EDF5', lineHeight: 1.2 }}>{opt.label}</span>
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Footer nav */}
          <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '16px 48px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(10,10,10,0.88)', backdropFilter: 'blur(16px)', zIndex: 50 }}>

            {/* Retour — secondary avec icon à gauche */}
            <button
              onClick={goBack}
              disabled={qIndex === 0}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 16,
                background: 'transparent',
                border: '1.5px solid', borderColor: '#F1EDF5',
                borderRadius: 12,
                paddingLeft: 4, paddingRight: 16, paddingTop: 4, paddingBottom: 4,
                cursor: qIndex === 0 ? 'default' : 'pointer',
                opacity: qIndex === 0 ? 0 : 1,
                transition: 'opacity 0.3s',
                fontFamily: 'var(--font)',
              }}
            >
              <span style={{ width: 32, height: 32, borderRadius: 8, background: '#A122E2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <ArrowLeft size={16} weight="regular" color="#EEE9F3" />
              </span>
              <span style={{ fontSize: 16, fontWeight: 500, color: '#F1EDF5', lineHeight: 1 }}>Retour</span>
            </button>

            {/* Suivant — primary */}
            <button
              onClick={advance}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 16,
                background: '#EEE9F3',
                border: 'none',
                borderRadius: 12,
                paddingLeft: 16, paddingRight: 4, paddingTop: 4, paddingBottom: 4,
                cursor: canAdvance ? 'pointer' : 'default',
                opacity: canAdvance ? 1 : 0.35,
                transition: 'opacity 0.3s ease',
                fontFamily: 'var(--font)',
              }}
            >
              <span style={{ fontSize: 16, fontWeight: 500, color: '#101010', lineHeight: 1 }}>
                {qIndex === total - 1 ? 'Voir le résultat' : 'Suivant'}
              </span>
              <span style={{ width: 32, height: 32, borderRadius: 8, background: '#A122E2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <ArrowRight size={16} weight="regular" color="#EEE9F3" />
              </span>
            </button>
          </div>
        </>
      )}
    </div>
  )
}
