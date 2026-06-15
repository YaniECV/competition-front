import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { articles } from '../data/articles'
import type { Article, Zone } from '../data/articles'

// ── Débuter ───────────────────────────────────────────────────────────────

export function PreparerDebuter() {
  const debuterArticles = articles.filter(a => a.debuter)

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="tag">02 — Préparer</span>
          <h1>Comment débuter</h1>
          <p style={{ fontSize: 16, maxWidth: 500, marginTop: 16, lineHeight: 1.7 }}>
            {debuterArticles.length} actions fondamentales — gratuites ou à faible coût — pour un impact immédiat.
          </p>
        </div>
      </div>
      <div className="container" style={{ paddingBottom: 80 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 48 }}>
          {debuterArticles.map((a, i) => (
            <ArticleCard key={a.id} article={a} index={i} />
          ))}
        </div>
        <Link to="/preparer/diagnostic" className="btn btn-primary">Faire mon diagnostic →</Link>
      </div>
    </>
  )
}

// ── Zones ─────────────────────────────────────────────────────────────────

const zoneOptions: { key: 'tous' | Zone, label: string }[] = [
  { key: 'tous', label: 'Toutes les zones' },
  { key: 'acces', label: 'Accès' },
  { key: 'scene', label: 'Scène' },
  { key: 'services', label: 'Services' },
  { key: 'accueil', label: 'Accueil' },
  { key: 'hebergement', label: 'Hébergement' },
]

export function PreparerZones() {
  const [searchParams] = useSearchParams()
  const initialZone = (searchParams.get('zone') as Zone | null) || 'tous'
  const [activeZone, setActiveZone] = useState<'tous' | Zone>(initialZone)

  const filtered = activeZone === 'tous'
    ? articles.filter(a => a.zone !== undefined)
    : articles.filter(a => a.zone === activeZone)

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="tag">02 — Préparer</span>
          <h1>Par zone du festival</h1>
          <p style={{ fontSize: 16, maxWidth: 500, marginTop: 16, lineHeight: 1.7 }}>
            Filtrez les aménagements par zone. Chaque action inclut les étapes concrètes pour la mettre en place.
          </p>
        </div>
      </div>
      <div className="container" style={{ paddingBottom: 80 }}>
        {/* Zone filter */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
          {zoneOptions.map(z => (
            <button
              key={z.key}
              onClick={() => setActiveZone(z.key)}
              style={{
                padding: '6px 14px',
                fontSize: 12,
                fontFamily: 'var(--font)',
                border: '1px solid var(--border)',
                background: activeZone === z.key ? 'var(--text)' : 'transparent',
                color: activeZone === z.key ? '#fff' : 'var(--muted)',
                cursor: 'pointer',
              }}
            >
              {z.label}
            </button>
          ))}
        </div>

        {/* Article list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map(a => (
            <ArticleCard key={a.id} article={a} showZone />
          ))}
        </div>

        {filtered.length === 0 && (
          <p style={{ color: 'var(--muted)', fontSize: 14 }}>Aucune action pour cette zone.</p>
        )}
      </div>
    </>
  )
}

// ── Cas concrets ──────────────────────────────────────────────────────────

export function PreparerCasConcrets() {
  const exemples = articles.filter(a => a.exemple)

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="tag">02 — Préparer</span>
          <h1>Cas concrets</h1>
          <p style={{ fontSize: 16, maxWidth: 500, marginTop: 16, lineHeight: 1.7 }}>
            Ce que d'autres festivals ont mis en place — et comment s'en inspirer.
          </p>
        </div>
      </div>
      <div className="container" style={{ paddingBottom: 80 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {exemples.map(a => (
            <div key={a.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 16 }}>
                <h3>{a.titre}</h3>
                <span style={{ fontSize: 10, fontFamily: 'var(--font)', border: '1px solid var(--border)', padding: '2px 8px', color: 'var(--muted)', whiteSpace: 'nowrap' }}>
                  {a.statut}
                </span>
              </div>
              <div style={{ padding: '16px', background: 'var(--bg2)', border: '1px solid var(--border)', marginBottom: 16, fontSize: 14, lineHeight: 1.7, fontStyle: 'italic' }}>
                "{a.exemple}"
              </div>
              <h4 style={{ fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10, color: 'var(--muted)' }}>
                Comment s'en inspirer
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                {a.commentFaire.map(step => (
                  <li key={step} style={{ display: 'flex', gap: 10, fontSize: 13, color: 'var(--muted)' }}>
                    <span style={{ flexShrink: 0 }}>→</span><span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="wf-block" style={{ marginTop: 24 }}>
          [Témoignages d'organisateurs de petits festivals de metal à intégrer]
        </div>
      </div>
    </>
  )
}

// ── Diagnostic ────────────────────────────────────────────────────────────

type Step = 'jauge' | 'terrain' | 'budget' | 'handicaps' | 'result'

const handicapsList = [
  { label: 'Moteur', key: 'moteur' },
  { label: 'Visuel', key: 'visuel' },
  { label: 'Auditif', key: 'auditif' },
  { label: 'Autisme', key: 'autisme' },
  { label: 'Psychologique', key: 'psy' },
  { label: 'Invisibles', key: 'invisible' },
]

export function PreparerDiagnostic() {
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
          <span className="tag">02 — Préparer</span>
          <h1>Diagnostic personnalisé</h1>
          <p style={{ fontSize: 16, maxWidth: 500, marginTop: 16, lineHeight: 1.7 }}>
            4 questions pour obtenir un plan d'action adapté à votre festival — gratuit, sans inscription.
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
            <button className="btn btn-primary" onClick={() => setStep('result')}>Voir mon diagnostic →</button>
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
                <Link to="/reperer/cadre-legal" style={{ fontSize: 13, color: 'var(--muted)', textDecoration: 'underline' }}>
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

// ── Index ─────────────────────────────────────────────────────────────────

export function PreparerIndex() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="tag">02 — Préparer</span>
          <h1>Préparer</h1>
          <p style={{ fontSize: 16, maxWidth: 540, marginTop: 16, lineHeight: 1.7 }}>
            Actions concrètes, classées par zone et par effort. Un seul endroit pour tout ce qu'il faut faire.
          </p>
        </div>
      </div>
      <div className="container" style={{ paddingBottom: 80 }}>
        <div className="grid-2">
          {[
            { to: '/preparer/diagnostic', label: 'Diagnostic personnalisé', desc: 'Formulaire interactif → rapport adapté à votre festival', highlight: true },
            { to: '/preparer/debuter', label: 'Comment débuter', desc: 'Les 5 réflexes clés · Par où commencer' },
            { to: '/preparer/zones', label: 'Par zone du festival', desc: 'Accès · Scène · Services · Accueil · Hébergement' },
            { to: '/preparer/cas-concrets', label: 'Cas concrets', desc: 'Témoignages · Exemples · Retours d\'expérience' },
          ].map(c => (
            <Link key={c.to} to={c.to} className="card" style={{ display: 'block', textDecoration: 'none', background: c.highlight ? 'var(--text)' : '#fff' }}>
              <div className="accent-line" style={{ background: c.highlight ? '#fff' : 'var(--border2)' }} />
              <h3 style={{ marginBottom: 8, color: c.highlight ? '#fff' : 'var(--text)' }}>{c.label}</h3>
              <p style={{ fontSize: 13, color: c.highlight ? 'rgba(255,255,255,0.7)' : 'var(--muted)' }}>{c.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

// ── Shared component ──────────────────────────────────────────────────────

function ArticleCard({ article, index, showZone }: { article: Article, index?: number, showZone?: boolean }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="card">
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        {index !== undefined && (
          <span style={{ fontSize: 11, fontFamily: 'var(--font)', color: 'var(--muted)', minWidth: 24, paddingTop: 2 }}>
            {String(index + 1).padStart(2, '0')}
          </span>
        )}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 6 }}>
            <h3 style={{ marginBottom: 0 }}>{article.titre}</h3>
            <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
              {showZone && article.zone && (
                <span style={{ fontSize: 10, fontFamily: 'var(--font)', border: '1px solid var(--border)', padding: '2px 6px', color: 'var(--muted)' }}>
                  {article.zone}
                </span>
              )}
              <span style={{ fontSize: 10, fontFamily: 'var(--font)', border: '1px solid var(--border)', padding: '2px 6px', color: 'var(--muted)' }}>
                {article.statut}
              </span>
            </div>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--muted)', marginBottom: open ? 16 : 0 }}>{article.resume}</p>

          {open && (
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {article.commentFaire.map(step => (
                <li key={step} style={{ display: 'flex', gap: 10, fontSize: 13 }}>
                  <span style={{ flexShrink: 0, color: 'var(--muted)' }}>→</span><span>{step}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <button
        onClick={() => setOpen(!open)}
        style={{ marginTop: 12, fontSize: 11, fontFamily: 'var(--font)', color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'block' }}
      >
        {open ? '▲ Masquer les étapes' : '▼ Voir comment faire'}
      </button>
    </div>
  )
}
