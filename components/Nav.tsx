"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    label: 'Les handicaps',
    prefix: '/handicaps',
    subs: [
      { to: '/handicaps/moteur',       label: 'Handicap moteur' },
      { to: '/handicaps/visuel',       label: 'Handicap visuel' },
      { to: '/handicaps/auditif',      label: 'Handicap auditif' },
      { to: '/handicaps/autisme',      label: 'Autisme & troubles cognitifs' },
      { to: '/handicaps/psychologique',label: 'Troubles psychiques' },
      { to: '/handicaps/invisibles',   label: 'Handicaps invisibles' },
    ],
  },
  {
    label: "S'informer",
    prefix: '/s-informer',
    subs: [
      { to: '/s-informer/bonnes-pratiques', label: 'Les bonnes pratiques' },
      { to: '/s-informer/les-lois', label: 'Les lois' },
    ],
  },
  { label: 'Les ressources', href: '/les-ressources' },
  { label: 'La fédération', href: '/la-federation' },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const pathname = usePathname() ?? '';

  return (
    <nav style={{ borderBottom: '1px solid var(--border)', background: '#fff', position: 'sticky', top: 0, zIndex: 100 }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
        <Link href="/" style={{ fontFamily: 'var(--font)', fontWeight: 700, fontSize: 15, color: 'var(--text)' }}>
          FEST_ACCESS
        </Link>

        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }} className="nav-links">
          {navItems.map(item => (
            <div
              key={item.label}
              style={{ position: 'relative' }}
              onMouseEnter={() => item.subs && setHovered(item.label)}
              onMouseLeave={() => item.subs && setHovered(null)}
            >
              {item.href ? (
                <Link
                  href={item.href}
                  style={{
                    fontSize: 13,
                    fontWeight: pathname.startsWith(item.href) ? 700 : 400,
                    color: pathname.startsWith(item.href) ? 'var(--text)' : 'var(--muted)',
                    borderBottom: pathname.startsWith(item.href) ? '2px solid var(--text)' : '2px solid transparent',
                    display: 'block',
                    padding: '18px 0',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.label}
                </Link>
              ) : (
                <span style={{
                  fontSize: 13,
                  fontWeight: item.prefix && pathname.startsWith(item.prefix) ? 700 : 400,
                  color: item.prefix && pathname.startsWith(item.prefix) ? 'var(--text)' : 'var(--muted)',
                  borderBottom: item.prefix && pathname.startsWith(item.prefix) ? '2px solid var(--text)' : '2px solid transparent',
                  cursor: 'pointer',
                  display: 'block',
                  padding: '18px 0',
                  userSelect: 'none' as const,
                  whiteSpace: 'nowrap',
                }}>
                  {item.label} <span style={{ fontSize: 10, opacity: 0.6 }}>▾</span>
                </span>
              )}

              {item.subs && hovered === item.label && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  background: '#fff',
                  border: '1px solid var(--border)',
                  minWidth: 200,
                  zIndex: 200,
                }}>
                  {item.subs.map(sub => (
                    <Link
                      key={sub.to}
                      href={sub.to}
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
                      onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.background = 'var(--bg2)')}
                      onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.background = 'transparent')}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <button
            type="button"
            disabled
            aria-disabled="true"
            title="Bientôt disponible"
            style={{
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
              fontWeight: 500,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              background: 'var(--bg2)',
              border: '1px solid var(--border)',
              padding: '8px 16px',
              whiteSpace: 'nowrap',
              cursor: 'not-allowed',
            }}
          >
            Faire un audit · Bientôt disponible
          </button>
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
              {item.href ? (
                <Link href={item.href} onClick={() => setMobileOpen(false)} style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', display: 'block', padding: '8px 0 4px', fontFamily: 'var(--font)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                  {item.label}
                </Link>
              ) : (
                <>
                  <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--text)', padding: '8px 0 4px', fontFamily: 'var(--font)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                    {item.label}
                  </p>
                  {item.subs?.map(sub => (
                    <Link key={sub.to} href={sub.to} onClick={() => setMobileOpen(false)} style={{ fontSize: 13, color: 'var(--muted)', display: 'block', padding: '6px 0 6px 12px', textDecoration: 'none' }}>
                      {sub.label}
                    </Link>
                  ))}
                </>
              )}
            </div>
          ))}
          <button
            type="button"
            disabled
            aria-disabled="true"
            title="Bientôt disponible"
            style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted)', background: 'none', border: 'none', textAlign: 'left', padding: '10px 0 6px', cursor: 'not-allowed' }}
          >
            Faire un audit · Bientôt disponible
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .nav-burger { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
