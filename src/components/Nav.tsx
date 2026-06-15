import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/comprendre', label: 'Comprendre' },
  { to: '/agir', label: 'Agir' },
  { to: '/outils', label: 'Outils' },
  { to: '/fmm', label: 'La FMM' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <nav style={{ borderBottom: '1px solid var(--border)', background: '#fff', position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
        <Link to="/" style={{ fontFamily: 'var(--font)', fontWeight: 700, fontSize: 15, color: 'var(--text)', letterSpacing: '-0.01em' }}>
          FEST_ACCESS
        </Link>

        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }} className="nav-links">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              style={{
                fontSize: 13,
                fontWeight: pathname.startsWith(l.to) ? 700 : 400,
                color: pathname.startsWith(l.to) ? 'var(--text)' : 'var(--muted)',
                borderBottom: pathname.startsWith(l.to) ? '2px solid var(--text)' : '2px solid transparent',
                paddingBottom: 2,
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
            style={{ padding: '7px 16px', fontSize: 11 }}
          >
            Faire un audit →
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          style={{ display: 'none', background: 'none', border: '1px solid var(--border)', color: 'var(--text)', fontSize: 16, cursor: 'pointer', padding: '4px 10px', fontFamily: 'var(--font)' }}
          className="nav-burger"
          aria-label="Menu"
        >
          ☰
        </button>
      </div>

      {open && (
        <div style={{ background: '#fff', borderTop: '1px solid var(--border)', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {links.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} style={{ fontSize: 14, color: 'var(--text)', fontWeight: 600 }}>
              {l.label}
            </Link>
          ))}
          <a href="https://www.helloasso.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ textAlign: 'center' }}>
            Faire un audit →
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
