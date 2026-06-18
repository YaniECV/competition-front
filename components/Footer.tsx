'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import FooterPhysics from './FooterPhysics';

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
    <footer style={{ background: '#101010' }}>

      {/* ── Nav bar ── */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 32,
        padding: '42px 40px 0',
        flexWrap: 'wrap',
      }}>

        {/* Logo + tagline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0, minWidth: 200 }}>
          <img src="/footer-logo.png" alt="Metal AXS" style={{ height: 23, width: 'auto', objectFit: 'contain', objectPosition: 'left' }} />
          <p style={{ fontFamily: 'var(--font)', fontSize: 18, fontWeight: 400, lineHeight: 1.2, color: '#F1EDF5', margin: 0 }}>
            Rendre les festivals de metal<br />accessibles à tous
          </p>
        </div>

        {/* Nav columns */}
        {NAV_COLS.map(col => (
          <div key={col.title} style={{ display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 }}>
            <span style={{ fontFamily: 'var(--font)', fontSize: 18, fontWeight: 600, lineHeight: 1, color: '#F1EDF5', whiteSpace: 'nowrap' }}>
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
        <Link href="/accessible/diagnostic" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          background: '#EEE9F3',
          borderRadius: 12,
          paddingLeft: 8,
          paddingRight: 4,
          paddingTop: 4,
          paddingBottom: 4,
          textDecoration: 'none',
          flexShrink: 0,
          alignSelf: 'flex-start',
          marginLeft: 'auto',
        }}>
          <span style={{ fontFamily: 'var(--font)', fontSize: 18, fontWeight: 600, color: '#101010', lineHeight: 1, whiteSpace: 'nowrap' }}>
            Faire un audit
          </span>
          <span style={{ width: 32, height: 32, borderRadius: '50%', background: '#A122E2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <ArrowRight size={16} weight="light" color="#EEE9F3" />
          </span>
        </Link>
      </div>

      {/* Contact */}
      <div style={{ padding: '24px 40px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontFamily: 'var(--font)', fontSize: 18, fontWeight: 600, color: '#F1EDF5', lineHeight: 1 }}>Contact</span>
        <a href="mailto:Metal-AXS@mail.com" style={{ fontFamily: 'var(--font)', fontSize: 18, fontWeight: 400, lineHeight: 1.2, color: '#F1EDF5', textDecoration: 'none' }}>
          Metal-AXS@mail.com
        </a>
      </div>

      {/* ── Physics zone ── */}
      <FooterPhysics />

    </footer>
  );
}
