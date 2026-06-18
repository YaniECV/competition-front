type PanneauProps = {
  mask: string;
  maskW: number; maskH: number;
  maskX: number; maskY: number;
  containerW: number; containerH: number;
  rotation: number;
  outerW: number; outerH: number;
  top: number; left?: number; right?: number;
  flip?: boolean;
};

function Panneau({ mask, maskW, maskH, maskX, maskY, containerW, containerH, rotation, outerW, outerH, top, left, right, flip }: PanneauProps) {
  // Center the rotation around the mask center so the sign stays fixed in the outer clip
  const maskCX = maskX + maskW / 2;
  const maskCY = maskY + maskH / 2;
  const innerLeft = outerW / 2 - maskCX;
  const innerTop = outerH / 2 - maskCY;
  const contentH = containerH * 1.8621;
  const contentTop = -containerH * 0.431;

  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        width: outerW,
        height: outerH,
        top,
        ...(left !== undefined ? { left } : {}),
        ...(right !== undefined ? { right } : {}),
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <div style={{
        position: 'absolute',
        width: containerW,
        height: containerH,
        left: innerLeft,
        top: innerTop,
        maskImage: `url(${mask})`,
        WebkitMaskImage: `url(${mask})`,
        maskSize: `${maskW}px ${maskH}px`,
        WebkitMaskSize: `${maskW}px ${maskH}px`,
        maskPosition: `${maskX}px ${maskY}px`,
        WebkitMaskPosition: `${maskX}px ${maskY}px`,
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskMode: 'alpha',
        transform: `${flip ? 'scaleY(-1) ' : ''}rotate(${rotation}deg)`,
        transformOrigin: `${maskCX}px ${maskCY}px`,
      }}>
        <img
          src="/panneau-texture.png"
          alt=""
          style={{
            position: 'absolute',
            width: '100%',
            height: contentH,
            top: contentTop,
            left: 0,
            objectFit: 'cover',
          }}
        />
      </div>
    </div>
  );
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

      {/* Panneau 4 — gauche haut, rotation -8.39° */}
      <Panneau
        mask="/panneau-mask-4.svg"
        maskW={162.555} maskH={328.17}
        maskX={175.195} maskY={77.529}
        containerW={779.379} containerH={418.555}
        rotation={-8.39}
        outerW={173.827} outerH={328.17}
        top={164} left={265}
      />

      {/* Panneau 5 — gauche bas, rotation 7.54° */}
      <Panneau
        mask="/panneau-mask-5.svg"
        maskW={149.396} maskH={255.011}
        maskX={108.859} maskY={175.599}
        containerW={779.379} containerH={418.555}
        rotation={7.54}
        outerW={149.397} outerH={256.379}
        top={387} left={215}
      />

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

      {/* Panneau 1 — droite haut, rotation 6.35° */}
      <Panneau
        mask="/panneau-mask-1.svg"
        maskW={168.426} maskH={324.58}
        maskX={654.185} maskY={119.833}
        containerW={779.379} containerH={418.555}
        rotation={6.35}
        outerW={168.426} outerH={329.664}
        top={120} right={135}
      />

      {/* Panneau 3 — droite milieu, rotation -7.02° */}
      <Panneau
        mask="/panneau-mask-3.svg"
        maskW={181.799} maskH={359.772}
        maskX={1.432} maskY={89.688}
        containerW={779.379} containerH={418.555}
        rotation={-7.02}
        outerW={196.019} outerH={361.523}
        top={313} right={268}
      />

      {/* Panneau 6 — droite bas, rotation -177.18° flippé */}
      <Panneau
        mask="/panneau-mask-6.svg"
        maskW={147.729} maskH={304.73}
        maskX={690.02} maskY={232.719}
        containerW={955.932} containerH={513.371}
        rotation={-177.18}
        outerW={159.838} outerH={304.73}
        top={417} right={127}
        flip
      />

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
  );
}
