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

      <style>{`
        .footer-link { opacity: 0.6; transition: opacity 0.15s ease; }
        .footer-link:hover { opacity: 1; }
      `}</style>

      {/* ── Links ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '80px 40px 0', position: 'relative', zIndex: 1 }}>
        {/* Colonne nav */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { label: 'Accueil', href: '/' },
            { label: 'Les handicaps', href: '/handicaps' },
            { label: "S'informer", href: '/s-informer/bonnes-pratiques' },
            { label: 'Les ressources', href: '/les-ressources' },
            { label: 'La fédération', href: '/la-federation' },
          ].map(l => (
            <Link key={l.href} href={l.href} className="footer-link" style={{ fontFamily: 'var(--font)', fontSize: 18, fontWeight: 400, lineHeight: 1.2, color: '#F1EDF5', textDecoration: 'none', whiteSpace: 'nowrap' }}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Colonne contact/légal */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <a href="mailto:Metal-AXS@mail.com" className="footer-link" style={{ fontFamily: 'var(--font)', fontSize: 18, fontWeight: 400, lineHeight: 1.2, color: '#F1EDF5', textDecoration: 'none' }}>
            Metal-AXS@mail.com
          </a>
          <Link href="/legal/privacy" className="footer-link" style={{ fontFamily: 'var(--font)', fontSize: 18, fontWeight: 400, lineHeight: 1.2, color: '#F1EDF5', textDecoration: 'none' }}>
            Politique de confidentialité
          </Link>
          <Link href="/legal/terms" className="footer-link" style={{ fontFamily: 'var(--font)', fontSize: 18, fontWeight: 400, lineHeight: 1.2, color: '#F1EDF5', textDecoration: 'none' }}>
            Conditions d'utilisation
          </Link>
        </div>
      </div>

      {/* ── Physics zone ── */}
      <FooterPhysics />

    </footer>
  );
}
