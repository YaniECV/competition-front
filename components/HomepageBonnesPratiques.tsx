import BtnPrimary from './BtnPrimary';

const TITLE = 'Bonnes pratiques & cadre légal';

export default function HomepageBonnesPratiques() {
  return (
    <section className="bp-section" style={{ background: '#101010', padding: '120px 40px', position: 'relative' }}>

      <style>{`
        @media (max-width: 900px) {
          .bp-section { padding: 60px 20px !important; }
          .bp-sticky-overlay { display: none !important; }
          .bp-spacer { display: none !important; }
          .bp-mobile-title { display: block !important; margin-bottom: 40px; }
          .bp-card-outer { width: min(420px, 90vw) !important; }
          .bp-frame { display: none !important; }
          .bp-white-card { width: min(420px, 90vw) !important; height: auto !important; margin: 0 !important; padding: 40px 28px !important; }
          .bp-white-card-circle { width: min(420px, 90vw) !important; height: auto !important; margin: 0 !important; padding: 40px 28px !important; border-radius: 24px !important; }
        }
        @media (min-width: 901px) {
          .bp-mobile-title { display: none !important; }
        }
      `}</style>

      {/* Mobile-only title */}
      <h2 className="bp-mobile-title" style={{ display: 'none', fontFamily: 'var(--font-title)', fontSize: 'clamp(2rem, 8vw, 3.5rem)', fontWeight: 400, color: '#EEE9F3', textTransform: 'uppercase', lineHeight: 1, marginBottom: 40 }}>
        {TITLE}
      </h2>

      {/* Sticky left title (absolute overlay) */}
      <div className="bp-sticky-overlay" style={{ position: 'absolute', top: 0, left: 40, bottom: 0, width: 467, pointerEvents: 'none' }}>
        <div style={{ position: 'sticky', top: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 0' }}>
          <h2 style={{
            fontFamily: 'var(--font-title)',
            fontSize: 80,
            fontWeight: 400,
            color: '#EEE9F3',
            textTransform: 'uppercase',
            lineHeight: 1,
            letterSpacing: 0,
            width: 467,
          }}>
            {TITLE}
          </h2>
        </div>
      </div>

      {/* Flex row */}
      <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start', justifyContent: 'center' }}>

        {/* Invisible spacer — reserves left column space */}
        <div className="bp-spacer" style={{ width: 467, flexShrink: 0, opacity: 0, pointerEvents: 'none', aria: 'hidden' } as React.CSSProperties}>
          <h2 style={{ fontFamily: 'var(--font-title)', fontSize: 80, fontWeight: 400, color: '#EEE9F3', textTransform: 'uppercase', lineHeight: 1 }}>
            {TITLE}
          </h2>
        </div>

        {/* Right column — two card blocks */}
        <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 40, alignItems: 'center', minWidth: 0 }}>

          {/* ── Card 1 : Les bonnes pratiques ── */}
          <div className="bp-card-outer" style={{ display: 'inline-grid' }}>
            {/* Frame carré */}
            <div className="bp-frame" style={{ gridColumn: 1, gridRow: 1, width: 500, height: 493, position: 'relative', overflow: 'hidden', pointerEvents: 'none' }}>
              <img src="/cadre-carre-1.png" alt="" aria-hidden style={{ position: 'absolute', left: '-2.07%', top: '-2.7%', width: '104.04%', height: '105.39%', maxWidth: 'none', objectFit: 'cover', pointerEvents: 'none' }} />
            </div>
            {/* White card */}
            <div className="bp-white-card" style={{
              gridColumn: 1, gridRow: 1,
              width: 438, height: 459,
              marginLeft: 31, marginTop: 10,
              background: '#F1EDF5',
              border: '1px solid #3b3b39',
              padding: '56px 32px',
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <p style={{ fontFamily: 'var(--font)', fontSize: 50, fontWeight: 700, color: '#101010', textAlign: 'center', lineHeight: 1, margin: 0 }}>
                Les bonnes<br />pratiques
              </p>
              <p style={{ fontFamily: 'var(--font)', fontSize: 18, fontWeight: 400, lineHeight: 1.2, color: '#101010', textAlign: 'center', margin: 0 }}>
                Passe à l'action dès maintenant avec notre guide complet : découvre toutes les bonnes pratiques pour rendre ton festival accessible.
              </p>
              <BtnPrimary href="/s-informer/bonnes-pratiques" label="En savoir plus" style={{ border: '1px solid #101010' }} />
            </div>
          </div>

          {/* ── Card 2 : Les lois ── */}
          <div className="bp-card-outer" style={{ display: 'inline-grid' }}>
            {/* Frame cercle */}
            <div className="bp-frame" style={{ gridColumn: 1, gridRow: 1, width: 500, height: 500, pointerEvents: 'none' }}>
              <img src="/cadre-carre-2.png" alt="" aria-hidden style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }} />
            </div>
            {/* White card */}
            <div className="bp-white-card-circle" style={{
              gridColumn: 1, gridRow: 1,
              width: 438, height: 455,
              marginLeft: 31, marginTop: 20,
              background: '#F1EDF5',
              border: '1px solid #3b3b39',
              borderRadius: 77777,
              padding: '56px 32px',
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <p style={{ fontFamily: 'var(--font)', fontSize: 50, fontWeight: 700, color: '#101010', textAlign: 'center', lineHeight: 1, margin: 0 }}>
                Les lois
              </p>
              <p style={{ fontFamily: 'var(--font)', fontSize: 18, fontWeight: 400, lineHeight: 1.2, color: '#101010', textAlign: 'center', margin: 0 }}>
                Les textes qui s'appliquent aux festivals. Savoir ce qu'on doit faire est le premier pas pour le faire.
              </p>
              <BtnPrimary href="/s-informer/les-lois" label="En savoir plus" style={{ border: '1px solid #101010' }} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
