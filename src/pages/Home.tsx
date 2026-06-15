import { Link } from 'react-router-dom'

const sections = [
  {
    to: '/comprendre/handicaps',
    num: '01',
    label: 'Comprendre',
    desc: 'Les handicaps & enjeux',
    subs: ['Types de handicap', 'Chiffres & enjeux', 'Normes & lois'],
  },
  {
    to: '/agir/diagnostic',
    num: '02',
    label: 'Agir',
    desc: 'Bonnes pratiques',
    subs: ['Mon diagnostic', 'Comment débuter', 'Par zone du festival', 'Exemples de festivals'],
  },
  {
    to: '/outils/signaletiques',
    num: '03',
    label: 'Outils',
    desc: 'Signalétiques & checklist',
    subs: ['Signalétiques à télécharger', 'Checklist interactive'],
  },
  {
    to: '/fmm/apropos',
    num: '04',
    label: 'La FMM',
    desc: 'À propos',
    subs: ['Qui sommes-nous', 'Notre objectif'],
  },
]

export default function Home() {
  return (
    <>
      <section style={{ padding: '80px 0 64px', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <span className="tag">FMM × Accessibilité festivals</span>
          <h1 style={{ maxWidth: 640, marginBottom: 20 }}>
            Rendre les festivals de metal accessibles à tous.
          </h1>
          <p style={{ fontSize: 16, maxWidth: 520, marginBottom: 36, lineHeight: 1.7 }}>
            Un guide pratique pour les organisateurs de petits festivals — sans budget imposant, sans expertise préalable.
          </p>
          <Link to="/comprendre/handicaps" className="btn btn-primary">Commencer ici</Link>
        </div>
      </section>

      <section>
        <div className="container">
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', fontFamily: 'var(--font)', marginBottom: 24 }}>
            Structure du site
          </p>
          <div className="grid-2">
            {sections.map(s => (
              <Link key={s.to} to={s.to} className="card" style={{ display: 'block', textDecoration: 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
                  <span style={{ fontSize: 11, fontFamily: 'var(--font)', color: 'var(--muted)' }}>{s.num}</span>
                  <span style={{ fontSize: 12, color: 'var(--muted)' }}>→</span>
                </div>
                <h3 style={{ marginBottom: 4 }}>{s.label}</h3>
                <p style={{ fontSize: 13, marginBottom: 16 }}>{s.desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {s.subs.map(sub => (
                    <div key={sub} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 4, height: 4, background: 'var(--border2)', flexShrink: 0 }} />
                      <span style={{ fontSize: 12, color: 'var(--muted)' }}>{sub}</span>
                    </div>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <span className="tag">En chiffres</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: '1px solid var(--border)' }}>
            {[
              { n: '12M', l: 'Français en situation de handicap' },
              { n: '80%', l: 'Des handicaps sont invisibles' },
              { n: '1/5', l: 'Personnes touchées par un trouble psychique' },
            ].map((s, i) => (
              <div key={s.n} style={{ padding: '32px 24px', borderRight: i < 2 ? '1px solid var(--border)' : 'none' }}>
                <p style={{ fontSize: 40, fontFamily: 'var(--font)', fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{s.n}</p>
                <p style={{ fontSize: 13 }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
