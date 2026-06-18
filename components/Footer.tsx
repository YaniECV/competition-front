'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import FooterPhysics from './FooterPhysics';
import BtnPrimary from './BtnPrimary';

const NAV_COLS = [
  {
    title: 'Les handicaps',
    links: [{ label: 'Tous les profils', href: '/handicaps' }],
  },
  {
    title: "S'informer",
    links: [
      { label: 'Les bonnes pratiques', href: '/s-informer/bonnes-pratiques' },
      { label: 'Les lois', href: '/s-informer/les-lois' },
    ],
  },
  {
    title: 'Les ressources',
    links: [{ label: 'Signalétiques', href: '/les-ressources' }],
  },
  {
    title: 'La fédération',
    links: [{ label: 'À propos & objectifs', href: '/la-federation' }],
  },
  {
    title: 'Légal',
    links: [
      { label: 'Privacy Police', href: '/legal/privacy' },
      { label: 'Terms of use', href: '/legal/terms' },
    ],
  },
];

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith('/accessible')) return null;

  return (
    <footer style={{ background: '#101010', borderTop: '1px solid #3b3b39', marginTop: 80, overflow: 'hidden' }}>

      {/* ── Nav bar ── */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 32,
        padding: '80px 40px 0',
        flexWrap: 'wrap',
        position: 'relative',
        zIndex: 1,
      }}>

        {/* Logo + tagline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0, minWidth: 200 }}>
          <img src="/footer-logo.svg" alt="Metal AXS" style={{ height: 24, width: 'auto', objectFit: 'contain', objectPosition: 'left' }} />
          <p style={{ fontFamily: 'var(--font)', fontSize: 18, fontWeight: 400, lineHeight: 1.2, color: '#F1EDF5', margin: 0 }}>
            Rendre les festivals de metal<br />accessibles à tous
          </p>
        </div>

        {/* Nav columns */}
        {NAV_COLS.map(col => (
          <div key={col.title} style={{ display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 }}>
            <span style={{ fontFamily: 'var(--font-title)', fontSize: 16, fontWeight: 400, lineHeight: 1, color: '#F1EDF5', whiteSpace: 'nowrap', textTransform: 'uppercase' }}>
              {col.title}
            </span>
            {col.links.map(l => (
              <Link key={l.href} href={l.href} style={{ fontFamily: 'var(--font)', fontSize: 18, fontWeight: 400, lineHeight: 1.2, color: '#F1EDF5', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                {l.label}
              </Link>
            ))}
          </div>
        ))}

        {/* CTA button */}
        <Link
          href="/accessible/ameliorer"
          style={{
            marginLeft: 'auto',
            alignSelf: 'flex-start',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'transparent',
            border: '1.5px solid #F1EDF5',
            borderRadius: 12,
            paddingLeft: 16,
            paddingRight: 4,
            paddingTop: 4,
            paddingBottom: 4,
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          <span style={{ fontFamily: 'var(--font)', fontSize: 16, fontWeight: 600, color: '#F1EDF5', lineHeight: 1, whiteSpace: 'nowrap' }}>
            Améliorer mon accessibilité
          </span>
          <div style={{ width: 32, height: 32, background: '#A122E2', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="#EEE9F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </Link>
      </div>

      {/* Contact */}
      <div style={{ padding: '24px 40px 0', display: 'flex', flexDirection: 'column', gap: 8, position: 'relative', zIndex: 1 }}>
        <span style={{ fontFamily: 'var(--font-title)', fontSize: 14, fontWeight: 400, color: '#F1EDF5', lineHeight: 1, textTransform: 'uppercase' }}>Contact</span>
        <a href="mailto:Metal-AXS@mail.com" style={{ fontFamily: 'var(--font)', fontSize: 18, fontWeight: 400, lineHeight: 1.2, color: '#F1EDF5', textDecoration: 'none' }}>
          Metal-AXS@mail.com
        </a>
      </div>

      {/* ── Physics zone ── */}
      <FooterPhysics />

    </footer>
  );
}
