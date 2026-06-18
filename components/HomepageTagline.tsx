function Panneau({
  mask, w, h, rotation, top, left, right, flip,
}: {
  mask: string; w: number; h: number; rotation: number;
  top: number; left?: number | string; right?: number | string; flip?: boolean;
}) {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        width: w,
        height: h,
        top,
        left: left !== undefined ? left : undefined,
        right: right !== undefined ? right : undefined,
        transform: `rotate(${rotation}deg)${flip ? ' scaleY(-1)' : ''}`,
        pointerEvents: 'none',
        flexShrink: 0,
      }}
    >
      <div style={{
        width: '100%',
        height: '100%',
        maskImage: `url(${mask})`,
        WebkitMaskImage: `url(${mask})`,
        maskSize: '100% 100%',
        WebkitMaskSize: '100% 100%',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <img
          src="/panneau-texture.png"
          alt=""
          style={{
            position: 'absolute',
            width: '100%',
            height: '186%',
            top: '-43%',
            left: 0,
            objectFit: 'cover',
          }}
        />
      </div>
    </div>
  )
}

export default function HomepageTagline() {
  return (
    <section style={{
      position: 'relative',
      background: '#101010',
      minHeight: 680,
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 40px',
      borderBottom: '1px solid #2e2e2e',
    }}>

      {/* Panneaux gauche */}
      <Panneau mask="/panneau-mask-4.svg" w={163} h={328} rotation={-8.4} top={130} left={90} />
      <Panneau mask="/panneau-mask-5.svg" w={149} h={255} rotation={7.5}  top={360} left={30} />

      {/* Figure gauche (panena2) */}
      <img
        src="/panena2.png"
        alt=""
        aria-hidden
        style={{
          position: 'absolute',
          width: 300,
          height: 300,
          left: 110,
          top: 360,
          transform: 'rotate(173.56deg) scaleY(-1)',
          pointerEvents: 'none',
          objectFit: 'contain',
        }}
      />

      {/* Panneaux droite */}
      <Panneau mask="/panneau-mask-1.svg" w={168} h={325} rotation={6.35}  top={100}  right={220} />
      <Panneau mask="/panneau-mask-3.svg" w={182} h={360} rotation={-7}    top={280}  right={20}  />
      <Panneau mask="/panneau-mask-6.svg" w={148} h={305} rotation={2.8}   top={390}  right={230} />

      {/* Contenu texte */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
        textAlign: 'center',
        maxWidth: 860,
      }}>
        <h2 style={{
          fontFamily: 'var(--font-title)',
          fontSize: 'clamp(2.4rem, 5.5vw, 5rem)',
          fontWeight: 400,
          color: '#EEE9F3',
          textTransform: 'uppercase',
          lineHeight: 1,
          letterSpacing: 0,
        }}>
          Votre festival de metal,<br />accessible à tous.
        </h2>
        <p style={{
          fontSize: 18,
          fontWeight: 500,
          lineHeight: 1.5,
          color: '#EEE9F3',
          maxWidth: 466,
        }}>
          12 millions de Français vivent avec un handicap. Beaucoup sont fans de metal et ne peuvent pas accéder à vos événements. Ce site vous donne les outils pour changer, gratuitement, étape par étape.
        </p>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .homepage-tagline-panneaux { display: none; }
        }
      `}</style>
    </section>
  )
}
