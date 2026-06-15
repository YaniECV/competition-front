import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  const links = [
    { to: '/festival', label: 'Festivals' },
    { to: '/pratiques', label: 'Bonnes pratiques' },
    { to: '/handicaps', label: 'Handicaps' },
    { to: '/ressources', label: 'Ressources' },
    { to: '/fede', label: 'La fédé' },
  ]

  return (
    <nav style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        <Link to="/" style={{ fontWeight: 800, fontSize: 18, letterSpacing: '-0.02em', color: '#fff' }}>
          FEST<span style={{ color: 'var(--accent)' }}>ACCESS</span>
        </Link>

        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }} className="nav-links">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              style={{
                fontSize: 13,
                fontWeight: 500,
                letterSpacing: '0.04em',
                color: pathname.startsWith(l.to) ? 'var(--accent)' : 'var(--muted)',
                transition: 'color 0.15s',
              }}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://www.helloasso.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ padding: '8px 18px', fontSize: 12 }}
          >
            Faire un audit
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          style={{ display: 'none', background: 'none', border: 'none', color: '#fff', fontSize: 24, cursor: 'pointer' }}
          className="nav-burger"
          aria-label="Menu"
        >
          ☰
        </button>
      </div>

      {open && (
        <div style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {links.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} style={{ fontSize: 15, color: 'var(--text)' }}>
              {l.label}
            </Link>
          ))}
          <a href="https://www.helloasso.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ textAlign: 'center' }}>
            Faire un audit
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .nav-burger { display: block !important; }
        }
      `}</style>
    </nav>
  )
}
