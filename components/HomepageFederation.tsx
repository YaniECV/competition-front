import BtnPrimary from './BtnPrimary';

const stats = [
  {
    img: '/fed-stat-80.png',
    imgStyle: { left: '-5.57%', top: '-52.31%', width: '109.59%', height: '204.62%' },
    label: 'Des Handicaps\nsont invisibles',
    pos: { left: 40, top: 272 },
  },
  {
    img: '/fed-stat-12m.png',
    imgStyle: { left: '-6.91%', top: '-56.25%', width: '113.81%', height: '212.5%' },
    label: 'Français en situation\nde handicap',
    pos: { left: 'calc(16.67% + 29px)', top: 570 },
  },
  {
    img: '/fed-stat-15.png',
    imgStyle: { left: '-2.22%', top: '-45%', width: '104.44%', height: '195%' },
    label: "Troubles psychiques\nau cours d'une vie",
    pos: { left: 'calc(75% - 8px)', top: 184 },
  },
  {
    img: '/fed-stat-4m.png',
    imgStyle: { left: '0%', top: '-43.35%', width: '100%', height: '186.71%' },
    label: 'Personnes\nmalentendantes',
    pos: { left: 'calc(66.67% - 3px)', top: 670 },
  },
];

const chains = [
  { left: 'calc(8.33% + 63px)',    top: 360,    w: 88.191, h: 111.488, rot:  56.36  },
  { left: 'calc(8.33% + 129.24px)',top: 437.47, w: 88.191, h: 111.488, rot: -123.64 },
  { left: 'calc(75% - 17px)',      top: 532.81, w: 59.317, h: 117.746, rot: -74.62  },
  { left: 'calc(75% - 1.96px)',    top: 432,    w: 59.317, h: 117.746, rot:  105.38 },
  { left: 'calc(75% + 24px)',      top: 335,    w: 59.317, h: 117.746, rot: -74.62  },
];

export default function HomepageFederation() {
  return (
    <section style={{ background: '#101010', position: 'relative', padding: '300px 40px' }}>

      {/* Contenu central */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'center', position: 'relative', zIndex: 1 }}>

        {/* Titre */}
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

        {/* Sous-titre */}
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

        {/* Bouton */}
        <BtnPrimary href="https://www.fetedelamusique.culture.gouv.fr" label="En savoir plus" target="_blank" rel="noreferrer" />
      </div>

      {/* Stats absolues */}
      {stats.map((s) => (
        <div key={s.label} style={{ position: 'absolute', left: s.pos.left as string | number, top: s.pos.top, display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
          <div style={{ width: 149, height: 80, position: 'relative', overflow: 'hidden', pointerEvents: 'none' }}>
            <img
              src={s.img}
              alt=""
              aria-hidden
              style={{ position: 'absolute', maxWidth: 'none', objectFit: 'cover', pointerEvents: 'none', ...s.imgStyle }}
            />
          </div>
          <p style={{ fontFamily: 'var(--font)', fontSize: 18, fontWeight: 500, lineHeight: 1.1, color: '#EEE9F3', margin: 0, width: 173, whiteSpace: 'pre-wrap' }}>
            {s.label}
          </p>
        </div>
      ))}

      {/* Chaînes décoratives */}
      {chains.map((c, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: c.left as string | number,
          top: c.top,
          width: c.w,
          height: c.h,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          <div style={{ transform: `scaleY(-1) rotate(${c.rot}deg)`, flexShrink: 0 }}>
            <div style={{ width: 113.81, height: 30.208, position: 'relative' }}>
              <img src="/fed-chaine.png" alt="" aria-hidden style={{ position: 'absolute', inset: 0, maxWidth: 'none', width: '100%', height: '100%', objectFit: 'bottom' as 'contain', pointerEvents: 'none' }} />
            </div>
          </div>
        </div>
      ))}

    </section>
  );
}
