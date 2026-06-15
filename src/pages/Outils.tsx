import { useState } from 'react'
import { Link } from 'react-router-dom'
import { articles } from '../data/articles'
import type { Phase } from '../data/articles'

export function OutilsIndex() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="tag">03 — S'équiper</span>
          <h1>Signalétiques & checklist</h1>
          <p style={{ fontSize: 16, maxWidth: 540, marginTop: 16, lineHeight: 1.7 }}>
            Des ressources prêtes à l'emploi pour votre festival.
          </p>
        </div>
      </div>
      <div className="container" style={{ paddingBottom: 80 }}>
        <div className="grid-2">
          {[
            { to: '/outils/signaletiques', label: 'Signalétiques à télécharger', desc: 'Packs par handicap · Pictos · Affiches' },
            { to: '/outils/checklist', label: 'Checklist interactive', desc: 'Avant / Pendant / Après le festival' },
          ].map(c => (
            <Link key={c.to} to={c.to} className="card" style={{ display: 'block', textDecoration: 'none' }}>
              <div className="accent-line" />
              <h3 style={{ marginBottom: 8 }}>{c.label}</h3>
              <p style={{ fontSize: 13 }}>{c.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export function OutilsSignaletiques() {
  const packs = [
    { label: 'Pack Mobilité', items: ['Accès fauteuil roulant', 'Toilettes adaptées', 'Espace PMR', 'Parking réservé'] },
    { label: 'Pack Auditif', items: ['Boucle magnétique', 'Interprète LSF', 'Sous-titrage disponible', 'Zone calme'] },
    { label: 'Pack Visuel', items: ['Guidage au sol', 'Mains courantes', 'Signalétique grand format', 'Chiens guides acceptés'] },
    { label: 'Pack Général', items: ['Accueil bienveillant', 'Espace de repos', 'Carte Tournesol reconnue', 'Référent accessibilité'] },
  ]

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <Link to="/outils" style={{ fontSize: 12, color: 'var(--muted)', display: 'inline-block', marginBottom: 20 }}>← S'équiper</Link>
          <span className="tag">03 — S'équiper</span>
          <h1>Signalétiques à télécharger</h1>
          <p style={{ fontSize: 16, maxWidth: 500, marginTop: 16, lineHeight: 1.7 }}>
            Formats PNG et SVG — style métal, accessibles visuellement, prêts à imprimer.
          </p>
        </div>
      </div>
      <div className="container" style={{ paddingBottom: 80 }}>
        <div className="grid-2">
          {packs.map(p => (
            <div key={p.label} className="card">
              <h3 style={{ marginBottom: 16 }}>{p.label}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
                {p.items.map(item => (
                  <div key={item} className="wf-block" style={{ padding: '24px 8px', fontSize: 11 }}>{item}</div>
                ))}
              </div>
              <button className="btn btn-outline" style={{ width: '100%', fontSize: 11 }}>
                Télécharger le pack (PNG + SVG)
              </button>
            </div>
          ))}
        </div>
        <div className="wf-block" style={{ marginTop: 24 }}>
          [Les fichiers seront disponibles après finalisation de la DA — style métal, haut contraste, accessibles WCAG AA]
        </div>
      </div>
    </>
  )
}

const phases: { key: Phase; label: string }[] = [
  { key: 'avant', label: 'Avant le festival' },
  { key: 'pendant', label: 'Pendant le festival' },
  { key: 'apres', label: 'Après le festival' },
]

export function OutilsChecklist() {
  const [checked, setChecked] = useState<Set<string>>(new Set())

  const toggle = (id: string) => {
    const next = new Set(checked)
    next.has(id) ? next.delete(id) : next.add(id)
    setChecked(next)
  }

  const allItems = articles.filter(a => a.phases.length > 0)
  const total = new Set(allItems.map(a => a.id)).size
  const done = [...checked].filter(id => allItems.some(a => a.id === id)).length

  const statutBadgeColor: Record<string, string> = {
    essentiel: 'var(--text)',
    recommande: 'var(--muted)',
    avance: 'var(--muted)',
  }

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <Link to="/outils" style={{ fontSize: 12, color: 'var(--muted)', display: 'inline-block', marginBottom: 20 }}>← S'équiper</Link>
          <span className="tag">03 — S'équiper</span>
          <h1>Checklist interactive</h1>
          <p style={{ fontSize: 16, maxWidth: 500, marginTop: 16, lineHeight: 1.7 }}>
            Suivez votre progression avant, pendant et après le festival.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 80 }}>
        {/* Progress */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 40, padding: '16px 20px', background: '#fff', border: '1px solid var(--border)' }}>
          <span style={{ fontSize: 28, fontFamily: 'var(--font)', fontWeight: 700 }}>{done}/{total}</span>
          <div style={{ flex: 1 }}>
            <div style={{ height: 4, background: 'var(--bg3)', marginBottom: 6 }}>
              <div style={{ height: '100%', width: `${total > 0 ? (done / total) * 100 : 0}%`, background: 'var(--text)', transition: 'width 0.2s' }} />
            </div>
            <p style={{ fontSize: 12, color: 'var(--muted)' }}>actions complétées</p>
          </div>
        </div>

        {/* Phases */}
        {phases.map(({ key, label }) => {
          const phaseArticles = articles.filter(a => a.phases.includes(key))
          return (
            <div key={key} style={{ marginBottom: 40 }}>
              <h2 style={{ marginBottom: 16, fontSize: '1rem' }}>{label}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {phaseArticles.map(article => (
                  <label
                    key={article.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      padding: '14px 16px',
                      background: checked.has(article.id) ? 'var(--bg2)' : '#fff',
                      border: '1px solid var(--border)',
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={checked.has(article.id)}
                      onChange={() => toggle(article.id)}
                      style={{ width: 16, height: 16, accentColor: 'var(--text)', cursor: 'pointer', flexShrink: 0 }}
                    />
                    <span style={{
                      fontSize: 14,
                      color: checked.has(article.id) ? 'var(--muted)' : 'var(--text)',
                      textDecoration: checked.has(article.id) ? 'line-through' : 'none',
                      flex: 1,
                    }}>
                      {article.titre}
                    </span>
                    <span style={{
                      fontSize: 10,
                      fontFamily: 'var(--font)',
                      padding: '2px 6px',
                      border: `1px solid ${statutBadgeColor[article.statut]}`,
                      color: statutBadgeColor[article.statut],
                      whiteSpace: 'nowrap',
                    }}>
                      {article.statut}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
