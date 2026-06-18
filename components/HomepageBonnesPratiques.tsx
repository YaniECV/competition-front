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
            {/* Frame rectangulaire */}
            <div style={{ gridColumn: 1, gridRow: 1, width: 583, height: 723, position: 'relative', overflow: 'hidden', pointerEvents: 'none' }}>
              <img
                src="/bp-cadre.png"
                alt=""
                aria-hidden
                style={{ position: 'absolute', left: '-49.06%', top: '-26.28%', width: '185.25%', height: '149.38%', maxWidth: 'none', objectFit: 'cover', pointerEvents: 'none' }}
              />
            </div>
            {/* White card */}
            <div style={{
              gridColumn: 1, gridRow: 1,
              width: 368, height: 506,
              marginLeft: 109, marginTop: 105,
              background: '#F1EDF5',
              border: '1px solid #3b3b39',
              padding: '56px 32px',
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
              alignItems: 'flex-start',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <img src="/bp-icon-pratiques.png" alt="" aria-hidden style={{ width: 104, height: 104, objectFit: 'contain', pointerEvents: 'none' }} />
                <p style={{ fontFamily: 'var(--font)', fontSize: 50, fontWeight: 700, color: '#101010', textAlign: 'center', lineHeight: 1, margin: 0 }}>
                  Les bonnes<br />pratiques
                </p>
              </div>
              <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', width: '100%', minHeight: 0 }}>
                <p style={{ fontFamily: 'var(--font)', fontSize: 18, fontWeight: 400, lineHeight: 1.2, color: '#101010', textAlign: 'center', margin: 0 }}>
                  Passe à l'action dès maintenant avec notre guide complet : découvre toutes les bonnes pratiques pour rendre ton festival accessible.
                </p>
                <BtnPrimary href="/s-informer/bonnes-pratiques" label="En savoir plus" style={{ border: '1.5px solid #101010' }} />
              </div>
            </div>
          </div>

          {/* ── Card 2 : Les lois ── */}
          <div style={{ display: 'inline-grid' }}>
            {/* Frame ovale */}
            <div style={{ gridColumn: 1, gridRow: 1, width: 557, height: 710, position: 'relative', overflow: 'hidden', pointerEvents: 'none' }}>
              <img
                src="/bp-tableau.png"
                alt=""
                aria-hidden
                style={{ position: 'absolute', left: '-49.4%', top: '-19.41%', width: '186.53%', height: '146.39%', maxWidth: 'none', objectFit: 'cover', pointerEvents: 'none' }}
              />
            </div>
            {/* White card */}
            <div style={{
              gridColumn: 1, gridRow: 1,
              width: 368, height: 506,
              marginLeft: 98, marginTop: 99,
              background: '#F1EDF5',
              border: '1px solid #3b3b39',
              padding: '56px 32px',
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
              alignItems: 'center',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <img src="/bp-icon-lois.png" alt="" aria-hidden style={{ width: 104, height: 104, objectFit: 'contain', pointerEvents: 'none' }} />
                <p style={{ fontFamily: 'var(--font)', fontSize: 50, fontWeight: 700, color: '#101010', textAlign: 'center', lineHeight: 1, margin: 0 }}>
                  Les lois
                </p>
              </div>
              <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', width: '100%', minHeight: 0 }}>
                <p style={{ fontFamily: 'var(--font)', fontSize: 18, fontWeight: 400, lineHeight: 1.2, color: '#101010', textAlign: 'center', margin: 0 }}>
                  Les textes qui s'appliquent aux festivals. Savoir ce qu'on doit faire est le premier pas pour le faire.
                </p>
                <BtnPrimary href="/s-informer/les-lois" label="En savoir plus" style={{ border: '1.5px solid #101010' }} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
