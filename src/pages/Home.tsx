import { Link } from 'react-router-dom'

const handicaps = [
  { icon: '♿', label: 'Moteur', to: '/handicaps/moteur' },
  { icon: '👁', label: 'Visuel', to: '/handicaps/visuel' },
  { icon: '👂', label: 'Auditif', to: '/handicaps/auditif' },
  { icon: '🧠', label: 'Autisme', to: '/handicaps/autisme' },
  { icon: '💭', label: 'Psychologique', to: '/handicaps/psychologique' },
  { icon: '🔍', label: 'Invisibles', to: '/handicaps/invisibles' },
]

const stats = [
  { n: '12M', label: 'Français en situation de handicap' },
  { n: '80%', label: 'Des handicaps sont invisibles' },
  { n: '1/5', label: 'Personnes touchées par un trouble psychique' },
]

export default function Home() {
  return (
    <>
      <section style={{ padding: '100px 0 80px', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <span className="tag">Festivals de metal × Accessibilité</span>
          <h1 style={{ maxWidth: 700, marginBottom: 24 }}>
            Le métal pour <span style={{ color: 'var(--accent)' }}>tous</span>.
          </h1>
          <p style={{ fontSize: 18, color: 'var(--muted)', maxWidth: 540, marginBottom: 40, lineHeight: 1.7 }}>
            Nous accompagnons les petits festivals de metal pour qu'ils deviennent accessibles aux personnes en situation de handicap — étape par étape.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link to="/festival" className="btn btn-primary">Commencer</Link>
            <Link to="/handicaps" className="btn btn-outline">Les handicaps</Link>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--border)' }}>
            {stats.map(s => (
              <div key={s.n} style={{ background: 'var(--bg)', padding: '40px 32px' }}>
                <p style={{ fontSize: 48, fontWeight: 800, color: 'var(--accent)', lineHeight: 1, marginBottom: 8 }}>{s.n}</p>
                <p style={{ fontSize: 14, color: 'var(--muted)' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <span className="tag">Types de handicap</span>
          <h2 style={{ marginBottom: 40 }}>Comprendre pour agir</h2>
          <div className="grid-3">
            {handicaps.map(h => (
              <Link key={h.to} to={h.to} className="card" style={{ display: 'block', textDecoration: 'none' }}>
                <div style={{ fontSize: 28, marginBottom: 16 }}>{h.icon}</div>
                <h3 style={{ marginBottom: 8 }}>{h.label}</h3>
                <p style={{ fontSize: 13, color: 'var(--muted)' }}>Besoins et aménagements →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ borderTop: '1px solid var(--border)', background: 'var(--bg2)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
            <div>
              <span className="tag">Comment ça marche</span>
              <h2 style={{ marginBottom: 32 }}>3 étapes pour devenir accessible</h2>
              {[
                { n: '01', t: 'Faites l\'audit', d: 'Évaluez l\'accessibilité actuelle de votre festival grâce à notre questionnaire.' },
                { n: '02', t: 'Recevez votre diagnostic', d: 'Obtenez des recommandations personnalisées selon votre configuration.' },
                { n: '03', t: 'Mettez en place', d: 'Téléchargez nos ressources et signalétiques, et formez vos équipes.' },
              ].map(step => (
                <div key={step.n} style={{ display: 'flex', gap: 20, marginBottom: 32 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)', minWidth: 28, paddingTop: 2 }}>{step.n}</span>
                  <div>
                    <h3 style={{ marginBottom: 6 }}>{step.t}</h3>
                    <p style={{ fontSize: 14, color: 'var(--muted)' }}>{step.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 4, padding: 40, textAlign: 'center' }}>
              <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 8 }}>Prêt à vous lancer ?</p>
              <h2 style={{ marginBottom: 24 }}>Faites votre audit</h2>
              <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 32 }}>Gratuit, sans engagement. 15 minutes suffisent.</p>
              <a
                href="https://www.helloasso.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Démarrer l'audit
              </a>
            </div>
          </div>
        </div>
      </section>

      <section style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <span className="tag">Ressources</span>
          <h2 style={{ marginBottom: 12 }}>Signalétiques à télécharger</h2>
          <p style={{ color: 'var(--muted)', marginBottom: 40 }}>Des supports visuels adaptés, au style métal, prêts à imprimer.</p>
          <Link to="/ressources" className="btn btn-outline">Voir toutes les ressources</Link>
        </div>
      </section>
    </>
  )
}
