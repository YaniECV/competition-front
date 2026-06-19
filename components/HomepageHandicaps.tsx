import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

const handicaps = [
  { n: '01', label: 'Auditif',                             slug: 'auditif',       img: '/auditif.png' },
  { n: '02', label: 'Moteur',                              slug: 'moteur',        img: '/moteur.png' },
  { n: '03', label: 'Visuel',                              slug: 'visuel',        img: '/visuel.png' },
  { n: '04', label: 'Déficience intellectuelle',           slug: 'invisibles',    img: '/deficience-intellectuelle.png' },
  { n: '05', label: 'Les troubles psychiques',             slug: 'psychologique', img: '/troubles-psychiques.png' },
  { n: '06', label: 'Les troubles du spectre autistique',  slug: 'autisme',       img: '/troubles-autistiques.png' },
];

function cellBorder(index: number): React.CSSProperties {
  const row = Math.floor(index / 3);
  const col = index % 3;
  return {
    borderRight:  col < 2 ? '1px solid #3b3b39' : 'none',
    borderBottom: row === 0 ? '1px solid #3b3b39' : 'none',
  };
}

export default function HomepageHandicaps() {
  return (
    <section style={{ background: '#101010', padding: '80px 0' }}>

      <style>{`
        .hc-card { transition: background 0.2s; position: relative; }
        .hc-card:hover { background: rgba(255,255,255,0.03); }
        .hc-illus { transition: transform 0.4s ease; }
        .hc-card:hover .hc-illus { transform: rotate(8deg); }
        .hc-btn {
          position: absolute;
          bottom: 20px;
          right: 20px;
          width: 40px;
          height: 40px;
          background: #A122E2;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.2s ease, transform 0.2s ease;
          pointer-events: none;
        }
        .hc-card:hover .hc-btn {
          opacity: 1;
          transform: translateY(0);
        }
        @media (max-width: 900px) {
          .hc-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .hc-grid { grid-template-columns: 1fr !important; padding: 0 16px !important; }
          .hc-section { padding: 48px 0 !important; }
        }
      `}</style>

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
      </div>

      {/* Grille */}
      <div className="hc-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        width: '100%',
        padding: '0 40px',
      }}>
        {handicaps.map((h, i) => (
          <Link
            key={h.slug}
            href={`/handicaps/${h.slug}`}
            className="hc-card"
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
              <img src={h.img} alt="" aria-hidden className="hc-illus" style={{ width: 200, height: 200, objectFit: 'contain' }} />
            </div>
            <span className="hc-btn" aria-hidden>
              <ArrowRight size={16} weight="regular" color="#EEE9F3" />
            </span>
          </Link>
        ))}
      </div>

    </section>
  );
}
