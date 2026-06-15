import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--bg2)', marginTop: 'auto' }}>
      <div className="container" style={{ padding: '48px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40 }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: 16, color: '#fff', marginBottom: 12 }}>
            FEST<span style={{ color: 'var(--accent)' }}>ACCESS</span>
          </div>
          <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>
            Rendre les festivals de metal accessibles à tous.
          </p>
        </div>
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 16 }}>Navigation</p>
          {[
            { to: '/festival', label: 'Festivals' },
            { to: '/pratiques', label: 'Bonnes pratiques' },
            { to: '/handicaps', label: 'Types de handicap' },
            { to: '/ressources', label: 'Ressources' },
            { to: '/fede', label: 'La fédé' },
          ].map(l => (
            <div key={l.to} style={{ marginBottom: 10 }}>
              <Link to={l.to} style={{ fontSize: 13, color: 'var(--muted)' }}>{l.label}</Link>
            </div>
          ))}
        </div>
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 16 }}>Contact</p>
          <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.8 }}>
            Fédération des Musiques Métal<br />
            <a href="mailto:contact@festaccess.fr" style={{ color: 'var(--accent)' }}>contact@festaccess.fr</a>
          </p>
        </div>
      </div>
      <div style={{ borderTop: '1px solid var(--border)', padding: '20px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: 12, color: 'var(--muted)' }}>© 2026 FestAccess — Tous droits réservés</p>
      </div>
    </footer>
  )
}
