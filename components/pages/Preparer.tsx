"use client";
import { useState } from 'react'
import Link from 'next/link'
import { articles } from '../data/articles'
import type { Article } from '../data/articles'

// ── Construire mon plan d'action (diagnostic) ────────────────────────────

type Step = 'jauge' | 'terrain' | 'budget' | 'handicaps' | 'result'

const handicapsList = [
  { label: 'Moteur', key: 'moteur' },
  { label: 'Visuel', key: 'visuel' },
  { label: 'Auditif', key: 'auditif' },
  { label: 'Autisme', key: 'autisme' },
  { label: 'Psychologique', key: 'psy' },
  { label: 'Invisibles', key: 'invisible' },
]

export function AccessibleDiagnostic() {
  const [step, setStep] = useState<Step>('jauge')
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})

  const steps: Step[] = ['jauge', 'terrain', 'budget', 'handicaps', 'result']
  const stepIdx = steps.indexOf(step)

  const set = (key: string, val: string) => setAnswers(prev => ({ ...prev, [key]: val }))

  const toggleHandicap = (key: string) => {
    const current = (answers.handicaps as string[]) || []
    const next = current.includes(key) ? current.filter(x => x !== key) : [...current, key]
    setAnswers(prev => ({ ...prev, handicaps: next }))
  }

  const getArticleRecos = (): Article[] => {
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

  const obligationsLegales = [
    '2% minimum des places de stationnement en PMR',
    'Cheminements accessibles (largeur ≥ 1,40m)',
    'Sanitaires adaptés sur le site',
    'Accessibilité de l\'accueil principal',
    'Plan d\'évacuation adapté aux PSH',
  ]

  const prestataires = [
    { n: 'Accès Culture', d: 'Association nationale · Boucles magnétiques, formations, accompagnement', url: 'https://www.acces-culture.org' },
    { n: 'ATH', d: 'Assistance Technique pour le Handicap · Conseil technique et audit', url: '#' },
    { n: 'CEMAFORRE', d: 'Centre national ressources loisirs · Formations et outils', url: 'https://www.cemaforre.asso.fr' },
    { n: 'DRAC', d: 'Direction Régionale des Affaires Culturelles · Subventions et accompagnement public', url: '#' },
  ]

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="tag">Devenir accessible</span>
          <h1>Construire mon plan d'action</h1>
          <p style={{ fontSize: 16, maxWidth: 500, marginTop: 16, lineHeight: 1.7 }}>
            4 questions pour cadrer mes opérations et obtenir un plan d'action adapté à mon festival — gratuit, sans inscription.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 80, maxWidth: 720 }}>
        {/* Progress bar */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 40, border: '1px solid var(--border)' }}>
          {steps.slice(0, 4).map((s, i) => (
            <div key={s} style={{
              flex: 1,
              padding: '10px 0',
              textAlign: 'center',
              fontSize: 11,
              fontFamily: 'var(--font)',
              background: stepIdx >= i ? 'var(--text)' : 'transparent',
              color: stepIdx >= i ? '#fff' : 'var(--muted)',
              borderRight: i < 3 ? '1px solid var(--border)' : 'none',
            }}>
              {i + 1}
            </div>
          ))}
        </div>

        {step === 'jauge' && (
          <div>
            <h2 style={{ marginBottom: 24 }}>Quelle est la jauge de votre festival ?</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[['petit', '< 500 personnes'], ['moyen', '500 à 2 000 personnes'], ['grand', '> 2 000 personnes']].map(([val, label]) => (
                <button key={val} onClick={() => { set('jauge', val); setStep('terrain') }}
                  className="card" style={{ textAlign: 'left', cursor: 'pointer', border: answers.jauge === val ? '1px solid var(--text)' : '1px solid var(--border)', background: answers.jauge === val ? 'var(--bg2)' : '#fff' }}>
                  <span style={{ fontSize: 14 }}>{label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'terrain' && (
          <div>
            <h2 style={{ marginBottom: 24 }}>Quel type de terrain ?</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[['dur', 'Surface dure (asphalte, béton, bois)'], ['herbe', 'Herbe / terrain meuble'], ['mixte', 'Mixte']].map(([val, label]) => (
                <button key={val} onClick={() => { set('terrain', val); setStep('budget') }}
                  className="card" style={{ textAlign: 'left', cursor: 'pointer', border: answers.terrain === val ? '1px solid var(--text)' : '1px solid var(--border)', background: answers.terrain === val ? 'var(--bg2)' : '#fff' }}>
                  <span style={{ fontSize: 14 }}>{label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'budget' && (
          <div>
            <h2 style={{ marginBottom: 24 }}>Quel budget accessibilité pouvez-vous mobiliser ?</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[['zero', 'Aucun (actions organisationnelles uniquement)'], ['petit', '< 500 €'], ['moyen', '500 € à 2 000 €'], ['grand', '> 2 000 €']].map(([val, label]) => (
                <button key={val} onClick={() => { set('budget', val); setStep('handicaps') }}
                  className="card" style={{ textAlign: 'left', cursor: 'pointer', border: answers.budget === val ? '1px solid var(--text)' : '1px solid var(--border)', background: answers.budget === val ? 'var(--bg2)' : '#fff' }}>
                  <span style={{ fontSize: 14 }}>{label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'handicaps' && (
          <div>
            <h2 style={{ marginBottom: 8 }}>Quels publics voulez-vous prioriser ?</h2>
            <p style={{ fontSize: 13, marginBottom: 24, color: 'var(--muted)' }}>Sélectionnez un ou plusieurs.</p>
            <div className="grid-2" style={{ marginBottom: 24 }}>
              {handicapsList.map(h => {
                const selected = ((answers.handicaps as string[]) || []).includes(h.key)
                return (
                  <button key={h.key} onClick={() => toggleHandicap(h.key)}
                    className="card" style={{ textAlign: 'left', cursor: 'pointer', border: selected ? '1px solid var(--text)' : '1px solid var(--border)', background: selected ? 'var(--bg3)' : '#fff' }}>
                    <span style={{ fontSize: 14, fontFamily: 'var(--font)' }}>{selected ? '✓ ' : ''}{h.label}</span>
                  </button>
                )
              })}
            </div>
            <button className="btn btn-primary" onClick={() => setStep('result')}>Voir mon plan d'action →</button>
          </div>
        )}

        {step === 'result' && (() => {
          const recos = getArticleRecos()
          return (
            <div>
              {/* Block 1 — Cadrage */}
              <div style={{ marginBottom: 40 }}>
                <span className="tag">01 — Cadrage</span>
                <h2 style={{ marginBottom: 16 }}>Votre profil festival</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--border)', border: '1px solid var(--border)' }}>
                  {[
                    { l: 'Jauge', v: answers.jauge as string },
                    { l: 'Terrain', v: answers.terrain as string },
                    { l: 'Budget', v: answers.budget as string },
                  ].map(r => (
                    <div key={r.l} style={{ background: 'var(--bg)', padding: '16px 20px' }}>
                      <p style={{ fontSize: 10, fontFamily: 'var(--font)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{r.l}</p>
                      <p style={{ fontSize: 16, fontFamily: 'var(--font)', fontWeight: 700 }}>{r.v}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Block 2 — Plan d'action */}
              <div style={{ marginBottom: 40 }}>
                <span className="tag">02 — Plan d'action</span>
                <h2 style={{ marginBottom: 16 }}>Vos recommandations</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {recos.map((a, i) => (
                    <div key={a.id} className="card" style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                      <span style={{ fontSize: 11, fontFamily: 'var(--font)', color: 'var(--muted)', minWidth: 24 }}>{String(i + 1).padStart(2, '0')}</span>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{a.titre}</p>
                        <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>{a.resume}</p>
                      </div>
                      <span style={{ fontSize: 10, fontFamily: 'var(--font)', border: '1px solid var(--border)', padding: '2px 6px', color: 'var(--muted)', whiteSpace: 'nowrap' }}>
                        {a.statut}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Block 3 — Obligations légales */}
              <div style={{ marginBottom: 40 }}>
                <span className="tag">03 — Obligations légales</span>
                <h2 style={{ marginBottom: 16 }}>Ce que vous devez faire</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                  {obligationsLegales.map(o => (
                    <div key={o} style={{ display: 'flex', gap: 12, fontSize: 14, padding: '12px 16px', background: '#fff', border: '1px solid var(--border)' }}>
                      <span style={{ color: 'var(--muted)' }}>⚖</span>
                      <span>{o}</span>
                    </div>
                  ))}
                </div>
                <Link href="/s-informer/les-lois" style={{ fontSize: 13, color: 'var(--muted)', textDecoration: 'underline' }}>
                  Consulter le cadre légal complet →
                </Link>
              </div>

              {/* Block 4 — Prestataires */}
              <div style={{ marginBottom: 40 }}>
                <span className="tag">04 — Prestataires</span>
                <h2 style={{ marginBottom: 16 }}>Qui peut vous aider</h2>
                <div className="grid-2">
                  {prestataires.map(p => (
                    <div key={p.n} className="card">
                      <h3 style={{ marginBottom: 6 }}>{p.n}</h3>
                      <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>{p.d}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button className="btn btn-outline" onClick={() => { setStep('jauge'); setAnswers({}) }}>Recommencer</button>
                <a href="mailto:contact@fmm.fr" className="btn btn-primary">Demander un accompagnement FMM →</a>
              </div>
            </div>
          )
        })()}
      </div>
    </>
  )
}
