function Panneau({
  mask, w, h, rotation, top, left, right, flip,
}: {
  mask: string; w: number; h: number; rotation: number;
  top: number; left?: number; right?: number; flip?: boolean;
}) {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        width: w,
        height: h,
        top,
        ...(left !== undefined ? { left } : {}),
        ...(right !== undefined ? { right } : {}),
        transform: `rotate(${rotation}deg)${flip ? ' scaleY(-1)' : ''}`,
        pointerEvents: 'none',
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
      minHeight: 856,
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 40px',
      borderBottom: '1px solid #2e2e2e',
    }}>

      {/* Panneaux gauche */}
      <Panneau mask="/panneau-mask-4.svg" w={174} h={328} rotation={-8.39} top={164} left={265} />
      <Panneau mask="/panneau-mask-5.svg" w={149} h={256} rotation={7.54}  top={387} left={215} />

      {/* Figure gauche (panena2) */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          width: 314,
          height: 314,
          left: 241,
          top: 422,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <img
          src="/panena2.png"
          alt=""
          style={{
            width: 284,
            height: 284,
            transform: 'rotate(173.56deg) scaleY(-1)',
            objectFit: 'cover',
          }}
        />
      </div>

      {/* Panneaux droite */}
      <Panneau mask="/panneau-mask-1.svg" w={168} h={330} rotation={6.35}    top={120} right={135} />
      <Panneau mask="/panneau-mask-3.svg" w={196} h={362} rotation={-7.02}   top={313} right={268} />
      <Panneau mask="/panneau-mask-6.svg" w={160} h={305} rotation={-177.18} top={417} right={127} flip />

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
    </section>
  )
}
