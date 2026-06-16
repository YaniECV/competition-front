import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: '#fff', marginTop: 'auto' }}>
      <div className="container" style={{ padding: '40px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 32 }}>
        <div>
          <p style={{ fontFamily: 'var(--font)', fontWeight: 700, fontSize: 14, color: 'var(--text)', marginBottom: 10 }}>FEST_ACCESS</p>
          <p style={{ fontSize: 13, lineHeight: 1.6 }}>Rendre les festivals de metal accessibles à tous.</p>
        </div>
        {[
          { title: 'Les handicaps', links: [{ to: '/handicaps', l: 'Tous les profils' }] },
          { title: "S'informer", links: [{ to: '/s-informer/bonnes-pratiques', l: 'Les bonnes pratiques' }, { to: '/s-informer/les-lois', l: 'Les lois' }] },
          { title: 'Les ressources', links: [{ to: '/les-ressources', l: 'Signalétiques' }] },
          { title: 'La fédération', links: [{ to: '/la-federation', l: 'À propos & objectifs' }] },
          { title: 'Contact', links: [{ to: 'mailto:contact@fmm.fr', l: 'contact@fmm.fr' }] },
        ].map(col => (
          <div key={col.title}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', fontFamily: 'var(--font)', marginBottom: 12 }}>{col.title}</p>
            {col.links.map(l => (
              <div key={l.to} style={{ marginBottom: 8 }}>
                <Link href={l.to} style={{ fontSize: 13 }}>{l.l}</Link>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ borderTop: '1px solid var(--border)', padding: '16px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font)' }}>© 2026 FestAccess × FMM</p>
      </div>
    </footer>
  );
}
