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

      {/* Illustration gauche */}
      <img
        src="/panena2.png"
        alt=""
        aria-hidden
        style={{
          position: 'absolute',
          width: 320,
          height: 320,
          left: -20,
          top: '50%',
          transform: 'translateY(-50%) rotate(-8deg)',
          pointerEvents: 'none',
          objectFit: 'contain',
        }}
      />

      {/* Illustration droite */}
      <img
        src="/panena2.png"
        alt=""
        aria-hidden
        style={{
          position: 'absolute',
          width: 320,
          height: 320,
          right: -20,
          top: '50%',
          transform: 'translateY(-50%) rotate(8deg) scaleX(-1)',
          pointerEvents: 'none',
          objectFit: 'contain',
        }}
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
