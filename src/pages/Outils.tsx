import { useState } from 'react'
import { Link } from 'react-router-dom'

export function OutilsIndex() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="tag">03 — Outils</span>
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
          <Link to="/outils" style={{ fontSize: 12, color: 'var(--muted)', display: 'inline-block', marginBottom: 20 }}>← Outils</Link>
          <span className="tag">03 — Outils</span>
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

const checklistItems = {
  'Avant le festival': [
    { id: 'a1', label: 'Désigner un référent accessibilité', effort: 'essentiel' },
    { id: 'a2', label: 'Créer une page accessibilité sur le site', effort: 'essentiel' },
    { id: 'a3', label: 'Concerter des personnes en situation de handicap', effort: 'essentiel' },
    { id: 'a4', label: 'Former les bénévoles (session avec asso locale)', effort: 'accessible' },
    { id: 'a5', label: 'Vérifier le cheminement accessible sur le site', effort: 'accessible' },
    { id: 'a6', label: 'Réserver 2% du parking en PMR', effort: 'accessible' },
    { id: 'a7', label: 'Prévoir les sanitaires adaptés', effort: 'investissement' },
    { id: 'a8', label: 'Commander les tapis/rampes de franchissement si nécessaire', effort: 'accessible' },
  ],
  'Pendant le festival': [
    { id: 'p1', label: 'Point d\'accueil identifiable avec file prioritaire', effort: 'essentiel' },
    { id: 'p2', label: 'Équipe accessibilité identifiée (vêtement distinctif)', effort: 'accessible' },
    { id: 'p3', label: 'Papier/crayon disponible à chaque accueil', effort: 'essentiel' },
    { id: 'p4', label: 'Espace calme signalé et accessible', effort: 'essentiel' },
    { id: 'p5', label: 'Chiens guides accueillis (eau + zone d\'aisance)', effort: 'essentiel' },
    { id: 'p6', label: 'Boucle magnétique active si installée', effort: 'accessible' },
    { id: 'p7', label: 'Plateforme PMR dégagée', effort: 'investissement' },
  ],
  'Après le festival': [
    { id: 'r1', label: 'Collecter les retours des festivaliers en situation de handicap', effort: 'essentiel' },
    { id: 'r2', label: 'Faire un bilan avec l\'équipe accessibilité', effort: 'essentiel' },
    { id: 'r3', label: 'Mettre à jour la page accessibilité du site', effort: 'essentiel' },
    { id: 'r4', label: 'Identifier 1-3 améliorations pour l\'édition suivante', effort: 'essentiel' },
  ],
}

const effortStyle: Record<string, string> = {
  essentiel: '#2a7a4b',
  accessible: '#1a5a8a',
  investissement: '#8a4a1a',
}

export function OutilsChecklist() {
  const [checked, setChecked] = useState<Set<string>>(new Set())
  const toggle = (id: string) => {
    const next = new Set(checked)
    next.has(id) ? next.delete(id) : next.add(id)
    setChecked(next)
  }
  const total = Object.values(checklistItems).flat().length
  const done = checked.size

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <Link to="/outils" style={{ fontSize: 12, color: 'var(--muted)', display: 'inline-block', marginBottom: 20 }}>← Outils</Link>
          <span className="tag">03 — Outils</span>
          <h1>Checklist interactive</h1>
          <p style={{ fontSize: 16, maxWidth: 500, marginTop: 16, lineHeight: 1.7 }}>
            Suivez votre progression avant, pendant et après le festival.
          </p>
        </div>
      </div>
      <div className="container" style={{ paddingBottom: 80 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 40, padding: '16px 20px', background: '#fff', border: '1px solid var(--border)' }}>
          <span style={{ fontSize: 28, fontFamily: 'var(--font)', fontWeight: 700 }}>{done}/{total}</span>
          <div style={{ flex: 1 }}>
            <div style={{ height: 4, background: 'var(--bg3)', marginBottom: 6 }}>
              <div style={{ height: '100%', width: `${(done / total) * 100}%`, background: 'var(--text)', transition: 'width 0.2s' }} />
            </div>
            <p style={{ fontSize: 12, color: 'var(--muted)' }}>actions complétées</p>
          </div>
        </div>

        {Object.entries(checklistItems).map(([phase, items]) => (
          <div key={phase} style={{ marginBottom: 40 }}>
            <h2 style={{ marginBottom: 16, fontSize: '1rem' }}>{phase}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {items.map(item => (
                <label key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', background: checked.has(item.id) ? 'var(--bg2)' : '#fff', border: '1px solid var(--border)', cursor: 'pointer' }}>
                  <input type="checkbox" checked={checked.has(item.id)} onChange={() => toggle(item.id)} style={{ width: 16, height: 16, accentColor: 'var(--text)', cursor: 'pointer', flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: checked.has(item.id) ? 'var(--muted)' : 'var(--text)', textDecoration: checked.has(item.id) ? 'line-through' : 'none', flex: 1 }}>{item.label}</span>
                  <span style={{ fontSize: 10, fontFamily: 'var(--font)', padding: '2px 6px', border: `1px solid ${effortStyle[item.effort]}`, color: effortStyle[item.effort] }}>{item.effort}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
