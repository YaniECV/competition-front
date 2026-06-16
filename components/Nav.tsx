"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { bonnesPratiques } from "./data/bonnesPratiques";
import { handicaps } from "./data/handicaps";

const navItems = [
  {
    label: 'Les handicaps',
    href: '/handicaps',
    prefix: '/handicaps',
    subs: [
      { to: '/handicaps/moteur',        label: 'Handicap moteur' },
      { to: '/handicaps/visuel',        label: 'Handicap visuel' },
      { to: '/handicaps/auditif',       label: 'Handicap auditif' },
      { to: '/handicaps/autisme',       label: 'Autisme & troubles cognitifs' },
      { to: '/handicaps/psychologique', label: 'Troubles psychiques' },
      { to: '/handicaps/invisibles',    label: 'Handicaps invisibles' },
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

// ── Index de recherche ────────────────────────────────────────────────────────
const searchIndex = [
  ...handicaps.map(h => ({
    label: h.nom,
    desc: h.realite.slice(0, 90) + '…',
    href: `/handicaps/${h.slug}`,
    tag: 'Handicap',
  })),
  ...bonnesPratiques.map(bp => ({
    label: bp.titre,
    desc: bp.resume.slice(0, 90) + '…',
    href: `/s-informer/bonnes-pratiques/${bp.slug}`,
    tag: 'Bonne pratique',
  })),
  { label: 'Faire mon diagnostic', desc: 'Évaluez votre festival et obtenez un plan d'action.', href: '/accessible/diagnostic', tag: 'Outil' },
  { label: 'Les lois', desc: 'Loi de 2005, ERP/IOP, arrêté de 2007.', href: '/s-informer/les-lois', tag: 'Lois' },
  { label: 'Signalétiques à télécharger', desc: 'Packs pictogrammes haut contraste.', href: '/les-ressources', tag: 'Ressource' },
]

function SearchModal({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const results = query.trim().length < 2 ? [] : searchIndex.filter(item =>
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.desc.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(10,10,10,0.7)', zIndex: 999, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 80 }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{ background: '#fff', width: '100%', maxWidth: 620, margin: '0 20px', border: '1px solid var(--border)' }}>
        {/* Input */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '0 20px', borderBottom: '1px solid var(--border)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" style={{ flexShrink: 0 }}>
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Rechercher une bonne pratique, un handicap…"
            style={{ flex: 1, border: 'none', outline: 'none', padding: '18px 14px', fontSize: 15, fontFamily: 'var(--font)', background: 'transparent', color: 'var(--text)' }}
          />
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', fontSize: 20, lineHeight: 1, padding: 4 }}>✕</button>
        </div>

        {/* Résultats */}
        <div style={{ maxHeight: 420, overflowY: 'auto' }}>
          {query.trim().length < 2 && (
            <p style={{ padding: '16px 20px', fontSize: 13, color: 'var(--muted)' }}>Tapez au moins 2 caractères…</p>
          )}
          {query.trim().length >= 2 && results.length === 0 && (
            <p style={{ padding: '16px 20px', fontSize: 13, color: 'var(--muted)' }}>Aucun résultat pour « {query} »</p>
          )}
          {results.map((r, i) => (
            <Link
              key={i}
              href={r.href}
              onClick={onClose}
              style={{ display: 'flex', gap: 14, padding: '14px 20px', borderBottom: '1px solid var(--bg2)', textDecoration: 'none', alignItems: 'flex-start' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg2)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', border: '1px solid var(--border)', padding: '3px 7px', color: 'var(--muted)', whiteSpace: 'nowrap', marginTop: 2, flexShrink: 0 }}>
                {r.tag}
              </span>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', margin: '0 0 3px' }}>{r.label}</p>
                <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0, lineHeight: 1.5 }}>{r.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {results.length > 0 && (
          <p style={{ padding: '10px 20px', fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', borderTop: '1px solid var(--border)' }}>
            {results.length} résultat{results.length > 1 ? 's' : ''} — Échap pour fermer
          </p>
        )}
      </div>
    </div>
  )
}

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname() ?? '';

  // Fermer la search au changement de page
  useEffect(() => { setSearchOpen(false) }, [pathname])

  return (
    <>
      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}

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
                onMouseEnter={() => setHovered(item.label)}
                onMouseLeave={() => setHovered(null)}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    style={{
                      fontSize: 13,
                      fontWeight: pathname.startsWith(item.prefix ?? item.href) ? 700 : 400,
                      color: pathname.startsWith(item.prefix ?? item.href) ? 'var(--text)' : 'var(--muted)',
                      borderBottom: pathname.startsWith(item.prefix ?? item.href) ? '2px solid var(--text)' : '2px solid transparent',
                      display: 'block',
                      padding: '18px 0',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.label}{item.subs && <span style={{ fontSize: 10, opacity: 0.5, marginLeft: 4 }}>▾</span>}
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
                    {item.label} <span style={{ fontSize: 10, opacity: 0.5 }}>▾</span>
                  </span>
                )}

                {item.subs && hovered === item.label && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, background: '#fff', border: '1px solid var(--border)', minWidth: 210, zIndex: 200 }}>
                    {item.subs.map(sub => (
                      <Link
                        key={sub.to}
                        href={sub.to}
                        onClick={() => setHovered(null)}
                        style={{ display: 'block', padding: '10px 16px', fontSize: 13, color: pathname === sub.to ? 'var(--text)' : 'var(--muted)', fontWeight: pathname === sub.to ? 600 : 400, borderBottom: '1px solid var(--bg2)', textDecoration: 'none', background: 'transparent', transition: 'background 0.1s' }}
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

            {/* Bouton search */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Rechercher"
              style={{ background: 'none', border: '1px solid var(--border)', padding: '6px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--muted)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>

            <button
              type="button"
              disabled
              aria-disabled="true"
              title="Bientôt disponible"
              style={{ fontSize: 11, fontFamily: 'var(--font-mono)', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted)', background: 'var(--bg2)', border: '1px solid var(--border)', padding: '8px 16px', whiteSpace: 'nowrap', cursor: 'not-allowed' }}
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
            <button
              onClick={() => { setMobileOpen(false); setSearchOpen(true) }}
              style={{ background: 'none', border: '1px solid var(--border)', padding: '10px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: 'var(--muted)', fontSize: 13, fontFamily: 'var(--font)', marginBottom: 8 }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              Rechercher…
            </button>
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
            <button type="button" disabled aria-disabled="true" title="Bientôt disponible" style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted)', background: 'none', border: 'none', textAlign: 'left', padding: '10px 0 6px', cursor: 'not-allowed' }}>
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
    </>
  );
}
