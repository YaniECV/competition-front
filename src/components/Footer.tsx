import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: '#fff', marginTop: 'auto' }}>
      <div className="container" style={{ padding: '40px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 32 }}>
        <div>
          <p style={{ fontFamily: 'var(--font)', fontWeight: 700, fontSize: 14, color: 'var(--text)', marginBottom: 10 }}>FEST_ACCESS</p>
          <p style={{ fontSize: 13, lineHeight: 1.6 }}>Rendre les festivals de metal accessibles à tous.</p>
        </div>
        {[
          { title: '01 — Repérer', links: [{ to: '/reperer/handicaps', l: 'Types de handicap' }, { to: '/reperer/chiffres', l: 'Chiffres & enjeux' }, { to: '/reperer/cadre-legal', l: 'Cadre légal' }] },
          { title: '02 — Préparer', links: [{ to: '/preparer/debuter', l: 'Comment débuter' }, { to: '/preparer/zones', l: 'Par zone' }, { to: '/preparer/diagnostic', l: 'Diagnostic' }] },
          { title: '03 — S\'équiper', links: [{ to: '/outils/signaletiques', l: 'Signalétiques' }, { to: '/outils/checklist', l: 'Checklist' }] },
          { title: '04 — S\'engager', links: [{ to: '/fmm/apropos', l: 'À propos' }, { to: '/fmm/objectif', l: 'Notre objectif' }] },
        ].map(col => (
          <div key={col.title}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', fontFamily: 'var(--font)', marginBottom: 12 }}>{col.title}</p>
            {col.links.map(l => (
              <div key={l.to} style={{ marginBottom: 8 }}>
                <Link to={l.to} style={{ fontSize: 13 }}>{l.l}</Link>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ borderTop: '1px solid var(--border)', padding: '16px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font)' }}>© 2026 FestAccess × FMM</p>
      </div>
    </footer>
  )
}
