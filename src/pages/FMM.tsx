import { Link } from 'react-router-dom'

export function FMMIndex() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="tag">04 — La FMM</span>
          <h1>Fédération des Musiques Métal</h1>
          <p style={{ fontSize: 16, maxWidth: 540, marginTop: 16, lineHeight: 1.7 }}>
            La FMM œuvre pour une scène metal française plus inclusive et accessible à tous.
          </p>
        </div>
      </div>
      <div className="container" style={{ paddingBottom: 80 }}>
        <div className="grid-2">
          {[
            { to: '/fmm/apropos', label: 'À propos', desc: 'Qui sommes-nous · Notre mission · L\'équipe' },
            { to: '/fmm/objectif', label: 'Notre objectif', desc: 'Engagements · Actions · Partenaires' },
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

export function FMMapropos() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <Link to="/fmm" style={{ fontSize: 12, color: 'var(--muted)', display: 'inline-block', marginBottom: 20 }}>← La FMM</Link>
          <span className="tag">04 — La FMM</span>
          <h1>À propos</h1>
        </div>
      </div>
      <div className="container" style={{ paddingBottom: 80 }}>
        <div className="grid-2" style={{ alignItems: 'start', gap: 40 }}>
          <div>
            <h2 style={{ marginBottom: 16 }}>Qui sommes-nous</h2>
            <p style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 20 }}>
              La Fédération des Musiques Métal regroupe des organisateurs, des artistes et des acteurs de la scène metal française engagés pour l'inclusion.
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 20 }}>
              Nous croyons que la musique metal — par ses valeurs de communauté, de solidarité et de dépassement de soi — a tout pour être une scène pionnière en matière d'accessibilité.
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.8 }}>
              Notre mission est d'accompagner les petits festivals qui n'ont pas toujours les ressources pour engager une démarche d'accessibilité seuls.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div className="card">
              <h3 style={{ marginBottom: 8 }}>Notre mission</h3>
              <p style={{ fontSize: 14, lineHeight: 1.7 }}>Fournir outils, ressources et réseau pour que chaque festival de metal puisse progresser vers l'inclusion, quelle que soit sa taille.</p>
            </div>
            <div className="card">
              <h3 style={{ marginBottom: 8 }}>Contact</h3>
              <p style={{ fontSize: 14 }}>
                <a href="mailto:contact@fmm.fr" style={{ color: 'var(--text)' }}>contact@fmm.fr</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export function FMMobjectif() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <Link to="/fmm" style={{ fontSize: 12, color: 'var(--muted)', display: 'inline-block', marginBottom: 20 }}>← La FMM</Link>
          <span className="tag">04 — La FMM</span>
          <h1>Notre objectif</h1>
        </div>
      </div>
      <div className="container" style={{ paddingBottom: 80 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { t: 'Formation', d: 'Organiser des sessions de sensibilisation pour les équipes de festivals avec des associations spécialisées.' },
            { t: 'Ressources', d: 'Mettre à disposition gratuitement signalétiques, checklists et guides adaptés à la culture metal.' },
            { t: 'Réseau', d: 'Mettre en relation les organisateurs avec des experts du handicap et des festivals pionniers.' },
            { t: 'Plaidoyer', d: 'Représenter la scène metal dans les discussions institutionnelles sur l\'accessibilité culturelle.' },
          ].map(e => (
            <div key={e.t} className="card" style={{ display: 'flex', gap: 24 }}>
              <div className="accent-line" style={{ margin: 0, minWidth: 2, width: 2, height: 'auto', alignSelf: 'stretch' }} />
              <div>
                <h3 style={{ marginBottom: 8 }}>{e.t}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7 }}>{e.d}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 40, padding: 32, background: '#fff', border: '1px solid var(--border)', textAlign: 'center' }}>
          <h2 style={{ marginBottom: 12 }}>Rejoindre le réseau FMM</h2>
          <p style={{ fontSize: 14, marginBottom: 24 }}>Vous organisez un festival de metal ? Bénéficiez d'un accompagnement personnalisé.</p>
          <a href="mailto:contact@fmm.fr" className="btn btn-primary">Nous contacter →</a>
        </div>
      </div>
    </>
  )
}
