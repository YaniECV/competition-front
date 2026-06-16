import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  {
    label: 'S\'informer',
    prefix: '/sinformer',
    subs: [
      { to: '/sinformer/handicaps', label: 'Comprendre les handicaps' },
      { to: '/sinformer/conformite', label: 'Se mettre en conformité' },
      { to: '/sinformer/engager', label: 'Pourquoi s\'engager ?' },
    ],
  },
  {
    label: 'Devenir accessible',
    prefix: '/accessible',
    subs: [
      { to: '/accessible/diagnostic', label: 'Construire mon plan d\'action' },
      { to: '/accessible/mise-en-place', label: 'Mettre en place l\'accessibilité' },
      { to: '/accessible/cas-concrets', label: 'Cas concrets' },
    ],
  },
  {
    label: 'Ressources',
    prefix: '/ressources',
    subs: [
      { to: '/ressources/signaletiques', label: 'Signalétiques' },
      { to: '/ressources/checklist', label: 'Checklist interactive' },
    ],
  },
  {
    label: 'La fédération',
    prefix: '/federation',
    subs: [
      { to: '/federation/apropos', label: 'À propos' },
      { to: '/federation/objectif', label: 'Notre objectif' },
    ],
  },
]

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const { pathname } = useLocation()

  return (
    <nav style={{ borderBottom: '1px solid var(--border)', background: '#fff', position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
        <Link to="/" style={{ fontFamily: 'var(--font)', fontWeight: 700, fontSize: 15, color: 'var(--text)' }}>
          FEST_ACCESS
        </Link>

        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }} className="nav-links">
          {navItems.map(item => (
            <div
              key={item.label}
              style={{ position: 'relative' }}
              onMouseEnter={() => setHovered(item.label)}
              onMouseLeave={() => setHovered(null)}
            >
              <span style={{
                fontSize: 13,
                fontWeight: pathname.startsWith(item.prefix) ? 700 : 400,
                color: pathname.startsWith(item.prefix) ? 'var(--text)' : 'var(--muted)',
                borderBottom: pathname.startsWith(item.prefix) ? '2px solid var(--text)' : '2px solid transparent',
                cursor: 'default',
                display: 'block',
                padding: '18px 0',
                userSelect: 'none',
                whiteSpace: 'nowrap',
              }}>
                {item.label}
              </span>

              {hovered === item.label && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  background: '#fff',
                  border: '1px solid var(--border)',
                  minWidth: 230,
                  zIndex: 200,
                }}>
                  {item.subs.map(sub => (
                    <Link
                      key={sub.to}
                      to={sub.to}
                      onClick={() => setHovered(null)}
                      style={{
                        display: 'block',
                        padding: '10px 16px',
                        fontSize: 13,
                        color: pathname === sub.to ? 'var(--text)' : 'var(--muted)',
                        fontWeight: pathname === sub.to ? 600 : 400,
                        borderBottom: '1px solid var(--bg2)',
                        textDecoration: 'none',
                        background: 'transparent',
                        transition: 'background 0.1s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg2)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <a
            href="#"
            style={{
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
              fontWeight: 500,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: '#fff',
              background: 'var(--text)',
              padding: '8px 16px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            Faire un audit →
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ display: 'none', background: 'none', border: '1px solid var(--border)', color: 'var(--text)', fontSize: 16, cursor: 'pointer', padding: '4px 10px', fontFamily: 'var(--font)' }}
          className="nav-burger"
          aria-label="Menu"
        >
          ☰
        </button>
      </div>

      {mobileOpen && (
        <div style={{ background: '#fff', borderTop: '1px solid var(--border)', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {navItems.map(item => (
            <div key={item.label}>
              <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', padding: '8px 0 4px', fontFamily: 'var(--font)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                {item.label}
              </p>
              {item.subs.map(sub => (
                <Link key={sub.to} to={sub.to} onClick={() => setMobileOpen(false)} style={{ fontSize: 13, color: 'var(--muted)', display: 'block', padding: '6px 0 6px 12px' }}>
                  {sub.label}
                </Link>
              ))}
            </div>
          ))}
          <a href="#" onClick={() => setMobileOpen(false)} style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)', display: 'block', padding: '10px 0 6px' }}>
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
