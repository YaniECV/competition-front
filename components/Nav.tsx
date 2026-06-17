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
  { label: 'Faire mon diagnostic', desc: "Évaluez votre festival et obtenez un plan d'action.", href: '/accessible/diagnostic', tag: 'Outil' },
  { label: 'Les lois', desc: 'Loi de 2005, ERP/IOP, arrêté de 2007.', href: '/s-informer/les-lois', tag: 'Lois' },
  { label: 'Signalétiques à télécharger', desc: 'Packs pictogrammes haut contraste.', href: '/les-ressources', tag: 'Ressource' },
]

function MetalAxsLogo({ color }: { color: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1, gap: 1 }}>
      <span style={{ fontFamily: 'var(--font)', fontSize: 10, fontWeight: 800, letterSpacing: '0.18em', color, textTransform: 'uppercase' as const }}>Metal</span>
      <span style={{ fontFamily: 'var(--font)', fontSize: 22, fontWeight: 900, letterSpacing: '-0.02em', color, lineHeight: 1 }}>AXS</span>
    </div>
  )
}

function ChevronDown({ color }: { color: string }) {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M1 1L5 5L9 1" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SearchModal({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const q = query.trim()
  const results = q.length === 0 ? [] : searchIndex.filter(item =>
    item.label.toLowerCase().includes(q.toLowerCase()) ||
    item.desc.toLowerCase().includes(q.toLowerCase())
  )
  const suggestions = [
    { label: 'Handicap moteur', href: '/handicaps/moteur', tag: 'Handicap' },
    { label: 'Boucle magnétique', href: '/s-informer/bonnes-pratiques/boucle-magnetique', tag: 'Bonne pratique' },
    { label: 'Parking PMR', href: '/s-informer/bonnes-pratiques/parking-pmr', tag: 'Bonne pratique' },
    { label: 'Faire mon diagnostic', href: '/accessible/diagnostic', tag: 'Outil' },
    { label: 'Signalétiques', href: '/les-ressources', tag: 'Ressource' },
  ]
  const items = q.length === 0 ? suggestions : results

  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(10,10,10,0.7)', zIndex: 999, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 80 }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div style={{ background: '#fff', width: '100%', maxWidth: 620, margin: '0 20px', border: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '0 20px', borderBottom: '1px solid var(--border)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" style={{ flexShrink: 0 }}>
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
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
        <div style={{ maxHeight: 420, overflowY: 'auto' }}>
          {q.length === 0 && (
            <p style={{ padding: '12px 20px 8px', fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Suggestions
            </p>
          )}
          {q.length > 0 && results.length === 0 && (
            <p style={{ padding: '16px 20px', fontSize: 13, color: 'var(--muted)' }}>Aucun résultat pour « {q} »</p>
          )}
          {items.map((r, i) => (
            <Link
              key={i}
              href={r.href}
              onClick={onClose}
              style={{ display: 'flex', gap: 14, padding: '12px 20px', borderBottom: '1px solid var(--bg2)', textDecoration: 'none', alignItems: 'center', background: 'transparent', transition: 'background 0.1s' }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.background = 'var(--bg2)')}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.background = 'transparent')}
            >
              <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', border: '1px solid var(--border)', padding: '3px 7px', color: 'var(--muted)', whiteSpace: 'nowrap', flexShrink: 0 }}>
                {r.tag}
              </span>
              <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--text)', margin: 0 }}>{r.label}</p>
            </Link>
          ))}
        </div>
        <p style={{ padding: '10px 20px', fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', borderTop: '1px solid var(--border)' }}>
          {q.length > 0 ? `${results.length} résultat${results.length > 1 ? 's' : ''}` : `${searchIndex.length} éléments indexés`} — Échap pour fermer
        </p>
      </div>
    </div>
  )
}

function InlineSearch({ dark }: { dark: boolean }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  const q = query.trim()
  const suggestions = [
    { label: 'Handicap moteur', href: '/handicaps/moteur', tag: 'Handicap' },
    { label: 'Parking PMR', href: '/s-informer/bonnes-pratiques/parking-pmr', tag: 'Pratique' },
    { label: 'Boucle magnétique', href: '/s-informer/bonnes-pratiques/boucle-magnetique', tag: 'Pratique' },
    { label: 'Mon diagnostic', href: '/accessible/diagnostic', tag: 'Outil' },
  ]
  const results = q.length === 0 ? suggestions : searchIndex.filter(item =>
    item.label.toLowerCase().includes(q.toLowerCase()) ||
    item.desc.toLowerCase().includes(q.toLowerCase())
  ).slice(0, 8)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const borderColor = dark ? 'rgba(238,233,243,0.3)' : 'var(--border2)';
  const inputBg = dark ? 'rgba(255,255,255,0.08)' : '#fff';
  const inputColor = dark ? '#EEE9F3' : 'var(--text)';
  const iconColor = dark ? 'rgba(238,233,243,0.5)' : 'var(--muted)';

  return (
    <div ref={wrapRef} style={{ position: 'relative', width: 240 }}>
      <div style={{ display: 'flex', alignItems: 'center', border: `1.5px solid ${borderColor}`, background: inputBg, padding: '0 10px', gap: 8, height: 34, borderRadius: 6 }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2" style={{ flexShrink: 0 }}>
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
        <input
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          placeholder="Rechercher…"
          style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 12, fontFamily: 'var(--font)', color: inputColor }}
        />
        {query && (
          <button onClick={() => { setQuery(''); setOpen(false) }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: iconColor, fontSize: 14, padding: 0, lineHeight: 1 }}>✕</button>
        )}
      </div>
      {open && (
        <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, background: '#fff', border: '1px solid var(--border)', zIndex: 300, boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
          {q.length === 0 && <p style={{ padding: '8px 14px 4px', fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Suggestions</p>}
          {q.length > 0 && results.length === 0 && <p style={{ padding: '12px 14px', fontSize: 13, color: 'var(--muted)' }}>Aucun résultat</p>}
          {results.map((r, i) => (
            <Link
              key={i}
              href={r.href}
              onClick={() => { setOpen(false); setQuery('') }}
              style={{ display: 'flex', gap: 10, padding: '9px 14px', borderBottom: i < results.length - 1 ? '1px solid var(--bg2)' : 'none', textDecoration: 'none', alignItems: 'center', background: 'transparent' }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.background = 'var(--bg2)')}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.background = 'transparent')}
            >
              <span style={{ fontSize: 9, fontFamily: 'var(--font-mono)', border: '1px solid var(--border)', padding: '2px 6px', color: 'var(--muted)', whiteSpace: 'nowrap', flexShrink: 0 }}>{r.tag}</span>
              <span style={{ fontSize: 13, color: 'var(--text)', fontWeight: 500 }}>{r.label}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname() ?? '';

  const isDark = pathname === '/';

  const navText = isDark ? '#EEE9F3' : 'var(--text)';
  const navMuted = isDark ? 'rgba(238,233,243,0.55)' : 'var(--muted)';

  useEffect(() => { setSearchOpen(false); setMobileOpen(false) }, [pathname])

  return (
    <>
      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}

      <nav style={{
        background: isDark ? '#101010' : '#fff',
        borderBottom: isDark ? '1px solid rgba(238,233,243,0.1)' : '1px solid var(--border)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        width: '100%',
      }}>
        <div style={{ maxWidth: 1512, margin: '0 auto', padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>

          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <MetalAxsLogo color={navText} />
          </Link>

          {/* Search — uniquement sur fond clair */}
          {!isDark && (
            <div className="nav-search" style={{ flex: 1, maxWidth: 240, margin: '0 32px' }}>
              <InlineSearch dark={false} />
            </div>
          )}

          {/* Liens nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 0 }} className="nav-links">
            {navItems.map(item => {
              const isActive = item.prefix
                ? pathname.startsWith(item.prefix)
                : item.href
                  ? pathname.startsWith(item.href)
                  : false;
              const color = isActive ? navText : navMuted;

              return (
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
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '0 16px',
                        height: 72,
                        fontSize: 16,
                        fontWeight: 600,
                        color,
                        textDecoration: 'none',
                        whiteSpace: 'nowrap',
                        borderBottom: !isDark && isActive ? '2px solid var(--text)' : '2px solid transparent',
                      }}
                    >
                      {item.label}
                      {item.subs && <ChevronDown color={color} />}
                    </Link>
                  ) : (
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '0 16px',
                      height: 72,
                      fontSize: 16,
                      fontWeight: 600,
                      color,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      userSelect: 'none' as const,
                      borderBottom: !isDark && isActive ? '2px solid var(--text)' : '2px solid transparent',
                    }}>
                      {item.label}
                      {item.subs && <ChevronDown color={color} />}
                    </span>
                  )}

                  {item.subs && hovered === item.label && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      background: '#101010',
                      border: '1px solid rgba(238,233,243,0.12)',
                      borderTop: 'none',
                      minWidth: 240,
                      zIndex: 200,
                    }}>
                      {/* Label catégorie */}
                      <div style={{ padding: '14px 20px 10px', borderBottom: '1px solid rgba(238,233,243,0.08)' }}>
                        <span style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 10,
                          fontWeight: 500,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase' as const,
                          color: 'rgba(238,233,243,0.35)',
                        }}>
                          {item.label}
                        </span>
                      </div>
                      {/* Liens */}
                      <div style={{ padding: '6px 0 10px' }}>
                        {item.subs.map(sub => {
                          const isSubActive = pathname === sub.to;
                          return (
                            <Link
                              key={sub.to}
                              href={sub.to}
                              onClick={() => setHovered(null)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 10,
                                padding: '10px 20px',
                                fontSize: 14,
                                fontWeight: isSubActive ? 600 : 400,
                                color: isSubActive ? '#EEE9F3' : 'rgba(238,233,243,0.55)',
                                textDecoration: 'none',
                                fontFamily: 'var(--font)',
                                transition: 'color 0.15s',
                              }}
                              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = '#EEE9F3' }}
                              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.color = isSubActive ? '#EEE9F3' : 'rgba(238,233,243,0.55)' }}
                            >
                              {isSubActive && (
                                <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#A122E2', flexShrink: 0, display: 'inline-block' }} />
                              )}
                              {sub.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Bouton audit */}
            <button
              type="button"
              disabled
              aria-disabled="true"
              title="Bientôt disponible"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: '#A122E2',
                color: '#fff',
                fontSize: 16,
                fontWeight: 600,
                fontFamily: 'var(--font)',
                padding: '0 20px',
                height: 42,
                borderRadius: 999,
                border: 'none',
                whiteSpace: 'nowrap',
                marginLeft: 16,
                opacity: 0.45,
                cursor: 'not-allowed',
              }}
            >
              Faire un audit · Bientôt disponible
            </button>
          </div>

          {/* Burger mobile */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ display: 'none', background: 'none', border: `1px solid ${isDark ? 'rgba(238,233,243,0.3)' : 'var(--border)'}`, color: navText, fontSize: 16, cursor: 'pointer', padding: '4px 10px', fontFamily: 'var(--font)' }}
            className="nav-burger"
            aria-label="Menu"
          >
            ☰
          </button>
        </div>

        {/* Menu mobile */}
        {mobileOpen && (
          <div style={{ background: '#fff', borderTop: '1px solid var(--border)', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button
              onClick={() => { setMobileOpen(false); setSearchOpen(true) }}
              style={{ background: 'none', border: '1px solid var(--border)', padding: '10px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: 'var(--muted)', fontSize: 13, fontFamily: 'var(--font)', marginBottom: 8 }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
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
            <button type="button" disabled aria-disabled="true" style={{ fontSize: 13, fontWeight: 600, color: '#A122E2', background: 'none', border: 'none', textAlign: 'left', padding: '10px 0 6px', cursor: 'not-allowed', opacity: 0.5, fontFamily: 'var(--font)' }}>
              Faire un audit · Bientôt disponible
            </button>
          </div>
        )}

        <style>{`
          @media (max-width: 900px) {
            .nav-links { display: none !important; }
            .nav-burger { display: block !important; }
            .nav-search { display: none !important; }
          }
        `}</style>
      </nav>
    </>
  );
}
