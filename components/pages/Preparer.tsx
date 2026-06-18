"use client";
import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ArrowRight, ArrowLeft } from '@phosphor-icons/react/dist/ssr'
import { handicaps } from '../data/handicaps'

// ── Auto-évaluation par type de handicap ───────────────────────────────────
// Outil de POSITIONNEMENT (pas un audit) : l'orga se situe bien/moyen/un peu/pas
// par profil, puis repart vers les ressources pour creuser. Aucune spec/coût/loi en dur.

const QUESTIONS = [
  {
    id: 'moteur',
    text: "Ton festival est-il accessible aux personnes à mobilité réduite, que ce soit pour se déplacer sur le site, accéder aux scènes ou profiter des espaces communs ?",
    type: 'single' as 'single' | 'multi',
    options: [
      { val: 'bien',  label: "En place : accès PMR, sols adaptés, zones dédiées en fosse ou devant scène" },
      { val: 'moyen', label: "En cours : quelques aménagements mais pas sur tout le site" },
      { val: 'peu',   label: "Réfléchi : j'y ai pensé mais rien d'installé encore" },
      { val: 'pas',   label: "Pas adressé : ce n'est pas encore dans mes priorités" },
    ],
  },
  {
    id: 'auditif',
    text: "As-tu mis en place des solutions pour que les personnes sourdes ou malentendantes puissent suivre les annonces, profiter des concerts et se repérer sur ton festival ?",
    type: 'single' as 'single' | 'multi',
    options: [
      { val: 'bien',  label: "En place : interprètes LSF, boucles magnétiques, affichage visuel des annonces" },
      { val: 'moyen', label: "En cours : quelques dispositifs mais incomplets sur certaines scènes ou zones" },
      { val: 'peu',   label: "Réfléchi : j'ai identifié le besoin mais rien de concret encore" },
      { val: 'pas',   label: "Pas adressé : je n'ai pas encore traité ce sujet" },
    ],
  },
  {
    id: 'visuel',
    text: "Les personnes malvoyantes ou non-voyantes peuvent-elles se déplacer et s'orienter de manière autonome et sécurisée sur ton site ?",
    type: 'single' as 'single' | 'multi',
    options: [
      { val: 'bien',  label: "En place : accompagnateurs dédiés, signalétique en braille ou relief, guidage sonore" },
      { val: 'moyen', label: "En cours : quelques actions mais la navigation sur site reste difficile" },
      { val: 'peu',   label: "Réfléchi : j'ai conscience du besoin mais sans solution en place" },
      { val: 'pas',   label: "Pas adressé : ce n'est pas encore pris en compte" },
    ],
  },
  {
    id: 'invisibles',
    text: "Ton festival est-il pensé pour accueillir des personnes ayant une déficience intellectuelle, notamment en termes de signalétique, d'accompagnement et de clarté des informations ?",
    type: 'single' as 'single' | 'multi',
    options: [
      { val: 'bien',  label: "En place : signalétique simplifiée, espaces de retrait calmes, personnel formé" },
      { val: 'moyen', label: "En cours : quelques aménagements mais l'accueil reste perfectible" },
      { val: 'peu',   label: "Réfléchi : j'ai identifié des pistes sans les avoir concrétisées" },
      { val: 'pas',   label: "Pas adressé : je n'ai pas encore abordé ce sujet" },
    ],
  },
  {
    id: 'psychologique',
    text: "As-tu prévu des dispositifs pour accompagner les personnes souffrant de troubles psychiques, qui peuvent être particulièrement affectées par l'environnement intense d'un festival ?",
    type: 'single' as 'single' | 'multi',
    options: [
      { val: 'bien',  label: "En place : zones de décompression, équipe formée aux situations de crise, communication claire" },
      { val: 'moyen', label: "En cours : un espace calme existe mais l'accompagnement humain manque" },
      { val: 'peu',   label: "Réfléchi : j'ai pensé à des solutions sans les avoir mises en œuvre" },
      { val: 'pas',   label: "Pas adressé : ce n'est pas encore dans ma démarche" },
    ],
  },
  {
    id: 'autisme',
    text: "Ton festival tient-il compte des besoins sensoriels spécifiques des personnes autistes, qui peuvent être sensibles au bruit, à la foule ou aux stimulations visuelles intenses ?",
    type: 'single' as 'single' | 'multi',
    options: [
      { val: 'bien',  label: "En place : espaces sensoriels adaptés, casques anti-bruit disponibles, parcours fléché sans foule" },
      { val: 'moyen', label: "En cours : quelques aménagements sensoriels mais pas de parcours dédié" },
      { val: 'peu',   label: "Réfléchi : j'ai conscience des besoins spécifiques sans solution concrète" },
      { val: 'pas',   label: "Pas adressé : je ne l'ai pas encore pris en compte" },
    ],
  },
]

type Answers = Record<string, string | string[]>

const LEVEL_META: Record<string, { label: string; fill: number; gap: boolean; color: string }> = {
  pas:   { label: 'Pas adressé', fill: 0,   gap: true,  color: '#e5894d' },
  peu:   { label: 'Réfléchi',    fill: 34,  gap: true,  color: '#e5b14d' },
  moyen: { label: 'En cours',    fill: 67,  gap: false, color: '#bfd24d' },
  bien:  { label: 'En place',    fill: 100, gap: false, color: '#5ec77a' },
}
const RANK: Record<string, number> = { pas: 0, peu: 1, moyen: 2, bien: 3 }

function ResultRow({ h, level }: { h: typeof handicaps[number]; level: string }) {
  const [hovered, setHovered] = useState(false)
  const m = LEVEL_META[level] ?? LEVEL_META.pas
  return (
    <Link
      href={`/handicaps/${h.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 24,
        paddingTop: 24, paddingBottom: 24,
        borderBottom: '1px solid #3b3b39',
        textDecoration: 'none',
        transition: 'background 0.15s',
      }}
    >
      <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 12, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font)', fontSize: 20, fontWeight: 500, color: '#F1EDF5', lineHeight: 1.1 }}>{h.nom}</span>
          <span style={{
            fontFamily: 'var(--font)', fontSize: 13, fontWeight: 500,
            color: m.color, background: 'rgba(255,255,255,0.06)',
            border: `1px solid rgba(255,255,255,0.1)`,
            borderRadius: 8, padding: '4px 10px', lineHeight: 1, whiteSpace: 'nowrap',
          }}>{m.label}</span>
        </div>
        <div style={{ height: 4, background: '#3b3b39', borderRadius: 99, overflow: 'hidden', maxWidth: 200 }}>
          <div style={{ height: '100%', width: `${m.fill}%`, background: 'linear-gradient(90deg, #A122E2, #ce9de7)', borderRadius: 99 }} />
        </div>
      </div>
      <span style={{
        width: 32, height: 32, borderRadius: 8, flexShrink: 0,
        background: hovered ? '#A122E2' : 'transparent',
        border: '1.5px solid', borderColor: hovered ? '#A122E2' : '#3b3b39',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 0.2s, border-color 0.2s',
      }}>
        <ArrowRight size={16} weight="regular" color="#F1EDF5" />
      </span>
    </Link>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <p style={{ fontFamily: 'var(--font)', fontSize: 14, fontWeight: 500, color: '#9491a1', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{title}</p>
      <div style={{ display: 'flex', flexDirection: 'column' }}>{children}</div>
    </div>
  )
}

function ResultPage({ answers, onReset }: { answers: Answers; onReset: () => void }) {
  const [btnHovered, setBtnHovered] = useState(false)
  const [resetHovered, setResetHovered] = useState(false)
  const rated = handicaps.map(h => ({ h, level: (answers[h.slug] as string) || 'pas' }))
  rated.sort((a, b) => RANK[a.level] - RANK[b.level])
  const gaps = rated.filter(r => (LEVEL_META[r.level] ?? LEVEL_META.pas).gap)
  const oks = rated.filter(r => !(LEVEL_META[r.level] ?? LEVEL_META.pas).gap)

  return (
    <div style={{ minHeight: '100dvh', background: '#101010', padding: '80px 40px 120px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>

        {/* Hero */}
        <div style={{ marginBottom: 64 }}>
          <h1 style={{ fontFamily: 'var(--font-title)', fontSize: 80, fontWeight: 400, color: '#EEE9F3', textTransform: 'uppercase', lineHeight: 1, margin: '0 0 24px' }}>
            Voilà où tu en es.
          </h1>
          <p style={{ fontFamily: 'var(--font)', fontSize: 18, fontWeight: 400, lineHeight: 1.4, color: '#9491a1', margin: 0, maxWidth: 520 }}>
            {gaps.length === 0
              ? "Tu sembles déjà bien avancé sur tous les profils. Continue à creuser pour aller plus loin."
              : `${gaps.length} profil${gaps.length > 1 ? 's' : ''} à prioriser — clique sur chacun pour voir les bonnes pratiques associées.`}
          </p>
        </div>

        {/* Résultats */}
        {gaps.length > 0 && (
          <Section title="À adresser en priorité">
            {gaps.map(r => <ResultRow key={r.h.slug} h={r.h} level={r.level} />)}
          </Section>
        )}
        {oks.length > 0 && (
          <Section title="Déjà sur les rails">
            {oks.map(r => <ResultRow key={r.h.slug} h={r.h} level={r.level} />)}
          </Section>
        )}

        {/* CTA */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 16 }}>
          <Link
            href="/s-informer/bonnes-pratiques"
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 16,
              background: '#EEE9F3', border: 'none', borderRadius: 12,
              paddingLeft: 16, paddingRight: 4, paddingTop: 4, paddingBottom: 4,
              textDecoration: 'none', transition: 'background 0.2s ease',
              fontFamily: 'var(--font)',
            }}
          >
            <span style={{ fontSize: 16, fontWeight: 500, color: '#101010', lineHeight: 1 }}>Voir les bonnes pratiques</span>
            <span style={{ width: 32, height: 32, borderRadius: 8, background: '#A122E2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ArrowRight size={16} weight="regular" color="#EEE9F3" />
            </span>
          </Link>

          <button
            onClick={onReset}
            onMouseEnter={() => setResetHovered(true)}
            onMouseLeave={() => setResetHovered(false)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 16,
              background: resetHovered ? '#A122E2' : 'transparent',
              border: '1.5px solid', borderColor: resetHovered ? '#A122E2' : '#F1EDF5',
              borderRadius: 12, paddingLeft: 16, paddingRight: 4, paddingTop: 4, paddingBottom: 4,
              cursor: 'pointer', transition: 'background 0.2s ease, border-color 0.2s ease',
              fontFamily: 'var(--font)',
            }}
          >
            <span style={{ fontSize: 16, fontWeight: 500, color: '#F1EDF5', lineHeight: 1 }}>Recommencer</span>
            <span style={{ width: 32, height: 32, borderRadius: 8, background: resetHovered ? '#EEE9F3' : '#A122E2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background 0.2s ease' }}>
              <ArrowRight size={16} weight="regular" color={resetHovered ? '#A122E2' : '#EEE9F3'} />
            </span>
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

  const [enterKey, setEnterKey] = useState(0)

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
      setShowResult(true)
      return
    }

    setQIndex(i => i + 1)
    setEnterKey(k => k + 1)
  }, [canAdvance, q, answers, qIndex, total, selected, otherText])

  const goBack = useCallback(() => {
    if (qIndex === 0) return
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
            {/* Question courante */}
            <div
              key={`enter-${enterKey}`}
              style={{
                width: '100%',
                maxWidth: 620,
                textAlign: 'center',
                animation: 'intro-in 0.8s ease forwards',
              }}
            >
              <h1 style={{ fontSize: 24, fontWeight: 500, color: '#F1EDF5', lineHeight: 1.5, marginBottom: 40, letterSpacing: 0, fontFamily: 'var(--font)', textTransform: 'none', textAlign: 'center' }}>
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
          <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '16px 48px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 50 }}>

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
