import { Link } from 'react-router-dom'

const sections = [
  {
    to: '/comprendre',
    num: '01',
    label: 'Comprendre',
    desc: 'Les handicaps & enjeux',
    subs: ['Types de handicap', 'Chiffres & enjeux', 'Normes & lois'],
  },
  {
    to: '/agir',
    num: '02',
    label: 'Agir',
    desc: 'Bonnes pratiques',
    subs: ['Comment débuter', 'Par zone du festival', 'Exemples de festivals', 'Diagnostic personnalisé'],
  },
  {
    to: '/outils',
    num: '03',
    label: 'Outils',
    desc: 'Signalétiques & checklist',
    subs: ['Signalétiques à télécharger', 'Checklist interactive'],
  },
  {
    to: '/fmm',
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
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link to="/comprendre" className="btn btn-primary">Commencer ici</Link>
            <a href="https://www.helloasso.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              Faire un audit →
            </a>
          </div>
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

      <section style={{ borderTop: '1px solid var(--border)', background: '#fff' }}>
        <div className="container">
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', fontFamily: 'var(--font)', marginBottom: 24 }}>
            Parcours utilisateur
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 0, border: '1px solid var(--border)' }}>
            {[
              { n: '1', t: 'Il arrive perdu', s: '"Où en êtes-vous ?"' },
              { n: '2', t: 'Il comprend', s: 'Handicaps & enjeux légaux' },
              { n: '3', t: 'Il agit', s: 'Bonnes pratiques adaptées' },
              { n: '4', t: 'Il se dote d\'outils', s: 'Signalétiques & checklist' },
              { n: '5', t: 'Il va plus loin', s: 'Audit professionnel' },
            ].map((step, i) => (
              <div key={step.n} style={{ padding: '20px 16px', borderRight: i < 4 ? '1px solid var(--border)' : 'none' }}>
                <p style={{ fontSize: 11, fontFamily: 'var(--font)', color: 'var(--muted)', marginBottom: 8 }}>{step.n}.</p>
                <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', marginBottom: 6, fontFamily: 'var(--font)' }}>{step.t}</p>
                <p style={{ fontSize: 12, lineHeight: 1.5 }}>{step.s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center' }}>
          <div>
            <span className="tag">En chiffres</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { n: '12M', l: 'Français en situation de handicap' },
                { n: '80%', l: 'Des handicaps sont invisibles' },
                { n: '1/5', l: 'Personnes touchées par un trouble psychique' },
              ].map(s => (
                <div key={s.n} style={{ display: 'flex', gap: 20, alignItems: 'baseline', borderBottom: '1px solid var(--border)', paddingBottom: 20 }}>
                  <span style={{ fontSize: 36, fontFamily: 'var(--font)', fontWeight: 700, color: 'var(--text)', minWidth: 80 }}>{s.n}</span>
                  <span style={{ fontSize: 14, color: 'var(--muted)' }}>{s.l}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: '#fff', border: '1px solid var(--border)', padding: 32 }}>
            <h2 style={{ marginBottom: 12 }}>Faire un audit</h2>
            <p style={{ fontSize: 14, marginBottom: 24, lineHeight: 1.7 }}>
              Évaluez l'accessibilité de votre festival et recevez un rapport personnalisé.
            </p>
            <a href="https://www.helloasso.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Démarrer →
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
