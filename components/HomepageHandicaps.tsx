import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

const handicaps = [
  { n: '01', label: 'Auditif',                             slug: 'auditif',       img: '/Auditif 1.png' },
  { n: '02', label: 'Moteur',                              slug: 'moteur',        img: '/Moteur 1.png' },
  { n: '03', label: 'Visuel',                              slug: 'visuel',        img: '/Visuel 1.png' },
  { n: '04', label: 'Déficience intellectuelle',           slug: 'invisibles',    img: '/Déficience intellectuelle 1.png' },
  { n: '05', label: 'Les troubles psychiques',             slug: 'psychologique', img: '/Troubles psychiques 1.png' },
  { n: '06', label: 'Les troubles du spectre autistique',  slug: 'autisme',       img: '/Déficience intellectuelle 1.png' },
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
        @keyframes hc-wiggle {
          0%   { transform: scale(1) rotate(0deg); }
          6%   { transform: scale(0.88) rotate(-4deg); }
          18%  { transform: scale(1.18) rotate(-22deg) translateY(-6px); }
          35%  { transform: scale(1.07) rotate(15deg); }
          52%  { transform: scale(1.02) rotate(-7deg); }
          68%  { transform: scale(1.01) rotate(3deg); }
          84%  { transform: scale(1) rotate(-1deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        .hc-card { transition: background 0.2s; position: relative; }
        .hc-card:hover { background: rgba(255,255,255,0.03); }
        .hc-card:hover .hc-illus {
          animation: hc-wiggle 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .hc-btn {
          position: absolute;
          bottom: 20px;
          right: 20px;
          width: 32px;
          height: 32px;
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
        <img src="/search1.png" alt="" aria-hidden style={{ width: 64, height: 64, objectFit: 'contain', flexShrink: 0 }} />
      </div>

      {/* Grille */}
      <div style={{
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
