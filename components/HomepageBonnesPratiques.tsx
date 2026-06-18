import BtnPrimary from './BtnPrimary';

const TITLE = 'Bonnes pratique & cadre légal';

export default function HomepageBonnesPratiques() {
  return (
    <section style={{ background: '#101010', padding: '120px 40px', position: 'relative' }}>

      {/* Sticky left title (absolute overlay) */}
      <div style={{ position: 'absolute', top: 0, left: 40, bottom: 0, width: 467, pointerEvents: 'none' }}>
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
        <div style={{ width: 467, flexShrink: 0, opacity: 0, pointerEvents: 'none', aria: 'hidden' } as React.CSSProperties}>
          <h2 style={{ fontFamily: 'var(--font-title)', fontSize: 80, fontWeight: 400, color: '#EEE9F3', textTransform: 'uppercase', lineHeight: 1 }}>
            {TITLE}
          </h2>
        </div>

        {/* Right column — two card blocks */}
        <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 40, alignItems: 'center', minWidth: 0 }}>

          {/* ── Card 1 : Les bonnes pratiques ── */}
          <div style={{ display: 'inline-grid' }}>
            {/* Frame carré */}
            <div style={{ gridColumn: 1, gridRow: 1, width: 500, height: 493, position: 'relative', overflow: 'hidden', pointerEvents: 'none' }}>
              <img src="/cadre-carre-1.png" alt="" aria-hidden style={{ position: 'absolute', left: '-2.07%', top: '-2.7%', width: '104.04%', height: '105.39%', maxWidth: 'none', objectFit: 'cover', pointerEvents: 'none' }} />
            </div>
            {/* White card */}
            <div style={{
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
          <div style={{ display: 'inline-grid' }}>
            {/* Frame cercle */}
            <div style={{ gridColumn: 1, gridRow: 1, width: 500, height: 500, pointerEvents: 'none' }}>
              <img src="/cadre-carre-2.png" alt="" aria-hidden style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }} />
            </div>
            {/* White card */}
            <div style={{
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
