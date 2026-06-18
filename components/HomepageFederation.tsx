import BtnPrimary from './BtnPrimary';

export default function HomepageFederation() {
  return (
    <section style={{ background: '#101010', position: 'relative', padding: '300px 40px 470px' }}>

      {/* Contenu central */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center', position: 'relative', zIndex: 1 }}>

        <div style={{ width: 708, textAlign: 'center' }}>
          <h2 style={{
            fontFamily: 'var(--font-title)',
            fontSize: 80,
            fontWeight: 400,
            color: '#EEE9F3',
            textTransform: 'uppercase',
            lineHeight: 1,
            letterSpacing: 0,
            textAlign: 'center',
          }}>
            La fédération des musiques métalLIQUES
          </h2>
        </div>

        <div style={{ width: 466, textAlign: 'center' }}>
          <p style={{
            fontFamily: 'var(--font)',
            fontSize: 18,
            fontWeight: 500,
            lineHeight: 1.1,
            color: '#EEE9F3',
            textAlign: 'center',
            margin: 0,
          }}>
            La FMM accompage les organisateurs de festivals de metal pour rendre la scène plus inclusives. Formation, ressources, mise en réseau : nous sommes là pour que vous ne repartiez pas de zéro.
          </p>
        </div>

        <BtnPrimary href="https://www.fetedelamusique.culture.gouv.fr" label="En savoir plus" target="_blank" rel="noreferrer" />
      </div>

      {/* Stat 80% — Des Handicaps sont invisibles */}
      <div style={{ position: 'absolute', left: 40, top: 272, display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
        <div style={{ width: 149, height: 80, position: 'relative', overflow: 'hidden', pointerEvents: 'none' }}>
          <img src="/fed-stat-80pct.png" alt="" aria-hidden style={{ position: 'absolute', width: '109.59%', height: '204.62%', left: '-5.57%', top: '-52.31%', maxWidth: 'none', objectFit: 'cover', pointerEvents: 'none' }} />
        </div>
        <p style={{ fontFamily: 'var(--font)', fontSize: 18, fontWeight: 500, lineHeight: 1.1, color: '#EEE9F3', margin: 0, width: 173, whiteSpace: 'pre-wrap' }}>
          {`Des Handicaps\nsont invisibles`}
        </p>
      </div>

      {/* Stat 12M — Français en situation de handicap */}
      <div style={{ position: 'absolute', left: 'calc(16.67% + 29px)', top: 570, display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
        <div style={{ width: 213.977, height: 70, position: 'relative', overflow: 'hidden', flexShrink: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', width: 185.297, height: 104.229, left: -19.09, top: -13.52 }}>
            <img src="/fed-n-117.png" alt="" aria-hidden style={{ position: 'absolute', inset: 0, maxWidth: 'none', objectFit: 'cover', pointerEvents: 'none', width: '100%', height: '100%' }} />
          </div>
          <div style={{ position: 'absolute', width: 195.019, height: 109.698, left: -66.02, top: -19.09 }}>
            <img src="/fed-n-118.png" alt="" aria-hidden style={{ position: 'absolute', inset: 0, maxWidth: 'none', objectFit: 'cover', pointerEvents: 'none', width: '100%', height: '100%' }} />
          </div>
          <div style={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 151.622, height: 85.288, left: 96.56, top: -10.34 }}>
            <div style={{ transform: 'scaleY(-1) rotate(180deg)', flexShrink: 0 }}>
              <div style={{ width: 151.622, height: 85.288, position: 'relative' }}>
                <img src="/fed-n-120.png" alt="" aria-hidden style={{ position: 'absolute', inset: 0, maxWidth: 'none', objectFit: 'cover', pointerEvents: 'none', width: '100%', height: '100%' }} />
              </div>
            </div>
          </div>
        </div>
        <p style={{ fontFamily: 'var(--font)', fontSize: 18, fontWeight: 500, lineHeight: 1.1, color: '#EEE9F3', margin: 0, width: 173 }}>
          Français en situation de handicap
        </p>
      </div>

      {/* Stat 4M — Personnes malentendantes */}
      <div style={{ position: 'absolute', left: 'calc(66.67% - 3px)', top: 670, display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
        <div style={{ width: 153.678, height: 70, position: 'relative', overflow: 'hidden', flexShrink: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 129.853, height: 73.042, left: -35.72, top: -4.83 }}>
            <div style={{ transform: 'scaleY(-1) rotate(180deg)', flexShrink: 0 }}>
              <div style={{ width: 129.853, height: 73.042, position: 'relative' }}>
                <img src="/fed-n-122.png" alt="" aria-hidden style={{ position: 'absolute', inset: 0, maxWidth: 'none', objectFit: 'cover', pointerEvents: 'none', width: '100%', height: '100%' }} />
              </div>
            </div>
          </div>
          <div style={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 153.365, height: 86.268, left: 35.71, top: -11.26 }}>
            <div style={{ transform: 'scaleY(-1) rotate(180deg)', flexShrink: 0 }}>
              <div style={{ width: 153.365, height: 86.268, position: 'relative' }}>
                <img src="/fed-n-120.png" alt="" aria-hidden style={{ position: 'absolute', inset: 0, maxWidth: 'none', objectFit: 'cover', pointerEvents: 'none', width: '100%', height: '100%' }} />
              </div>
            </div>
          </div>
        </div>
        <p style={{ fontFamily: 'var(--font)', fontSize: 18, fontWeight: 500, lineHeight: 1.1, color: '#EEE9F3', margin: 0, width: 173 }}>
          Personnes malentendantes
        </p>
      </div>

      {/* Stat 1/5 — Troubles psychiques */}
      <div style={{ position: 'absolute', left: 'calc(75% - 8px)', top: 184, display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
        <div style={{ width: 136.818, height: 70, position: 'relative', overflow: 'hidden', flexShrink: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', width: 131.703, height: 74.083, left: 49.27, top: -4.54 }}>
            <img src="/fed-n-123.png" alt="" aria-hidden style={{ position: 'absolute', inset: 0, maxWidth: 'none', objectFit: 'cover', pointerEvents: 'none', width: '100%', height: '100%' }} />
          </div>
          <div style={{ position: 'absolute', width: 172.895, height: 97.253, left: -57.92, top: -15.82 }}>
            <img src="/fed-n-118.png" alt="" aria-hidden style={{ position: 'absolute', inset: 0, maxWidth: 'none', objectFit: 'cover', pointerEvents: 'none', width: '100%', height: '100%' }} />
          </div>
          <div style={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 172.693, height: 108.411, left: -20.5, top: -19.35 }}>
            <div style={{ transform: 'scaleY(-1) rotate(174.24deg)', flexShrink: 0 }}>
              <div style={{ width: 164.249, height: 92.39, position: 'relative' }}>
                <img src="/fed-n-124.png" alt="" aria-hidden style={{ position: 'absolute', inset: 0, maxWidth: 'none', objectFit: 'cover', pointerEvents: 'none', width: '100%', height: '100%' }} />
              </div>
            </div>
          </div>
        </div>
        <p style={{ fontFamily: 'var(--font)', fontSize: 18, fontWeight: 500, lineHeight: 1.1, color: '#EEE9F3', margin: 0, width: 173 }}>
          {`Troubles psychiques\nau cours d'une vie`}
        </p>
      </div>

    </section>
  );
}
