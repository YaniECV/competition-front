import Link from 'next/link';

const handicaps = [
  { n: '01', label: 'Moteur',         slug: 'moteur',         img: '/briqueee19.png' },
  { n: '02', label: 'Visuel',         slug: 'visuel',         img: '/briqueee20.png' },
  { n: '03', label: 'Auditif',        slug: 'auditif',        img: '/briqueee20.png' },
  { n: '04', label: 'Autisme',        slug: 'autisme',        img: '/briqueee19.png' },
  { n: '05', label: 'Psychologique',  slug: 'psychologique',  img: '/briqueee20.png' },
  { n: '06', label: 'Invisibles',     slug: 'invisibles',     img: '/briqueee20.png' },
];

function cellBorder(index: number): React.CSSProperties {
  const row = Math.floor(index / 3); // 0 or 1
  const col = index % 3;             // 0, 1, 2
  return {
    borderRight:  col < 2 ? '1px solid #3b3b39' : 'none',
    borderBottom: row === 0 ? '1px solid #3b3b39' : 'none',
  };
}

export default function HomepageHandicaps() {
  return (
    <section style={{ background: '#101010', borderBottom: '1px solid var(--border)', padding: '80px 0' }}>

      {/* Titre */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24, marginBottom: 80, padding: '0 40px' }}>
        <h2 style={{
          fontFamily: 'var(--font-title)',
          fontSize: 'clamp(2rem, 5vw, 5rem)',
          fontWeight: 400,
          color: '#EEE9F3',
          textTransform: 'uppercase',
          lineHeight: 1,
          letterSpacing: 0,
          whiteSpace: 'nowrap',
        }}>
          Les 6 types de handicaps
        </h2>
        <img src="/search1.png" alt="" aria-hidden style={{ width: 64, height: 64, objectFit: 'contain', flexShrink: 0 }} />
      </div>

      {/* Grille */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        width: '100%',
      }}>
        {handicaps.map((h, i) => (
          <Link
            key={h.slug}
            href={`/handicaps/${h.slug}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              padding: 24,
              textDecoration: 'none',
              ...cellBorder(i),
            }}
          >
            <span style={{
              fontFamily: 'var(--font)',
              fontSize: 18,
              fontWeight: 600,
              color: '#F1EDF5',
              lineHeight: 1,
            }}>
              {h.n}
            </span>
            <span style={{
              fontFamily: 'var(--font-title)',
              fontSize: 'clamp(2rem, 3.5vw, 3.5rem)',
              fontWeight: 400,
              color: '#F1EDF5',
              textTransform: 'uppercase',
              lineHeight: 1,
            }}>
              {h.label}
            </span>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
              <img src={h.img} alt="" aria-hidden style={{ width: 200, height: 200, objectFit: 'contain' }} />
            </div>
          </Link>
        ))}
      </div>

    </section>
  );
}
