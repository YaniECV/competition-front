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
    }}>

      {/* Illustrations gauche */}
      <img src="/panneau 1 gauche.png" alt="" aria-hidden style={{ position: 'absolute', height: 500, width: 'auto', left: -40, top: '50%', transform: 'translateY(-54%)', pointerEvents: 'none', objectFit: 'contain' }} />
      <img src="/panneau 2 gauche.png" alt="" aria-hidden style={{ position: 'absolute', height: 340, width: 'auto', left: 120, top: '50%', transform: 'translateY(-40%)', pointerEvents: 'none', objectFit: 'contain' }} />
      <img src="/panneau 3 gauche.png" alt="" aria-hidden style={{ position: 'absolute', height: 260, width: 'auto', left: 60, top: '50%', transform: 'translateY(10%)', pointerEvents: 'none', objectFit: 'contain' }} />

      {/* Illustrations droite */}
      <img src="/panneau 1 droite.png" alt="" aria-hidden style={{ position: 'absolute', height: 480, width: 'auto', right: -20, top: '50%', transform: 'translateY(-60%)', pointerEvents: 'none', objectFit: 'contain' }} />
      <img src="/panneau 2 droite.png" alt="" aria-hidden style={{ position: 'absolute', height: 300, width: 'auto', right: 200, top: '50%', transform: 'translateY(-20%)', pointerEvents: 'none', objectFit: 'contain' }} />
      <img src="/panneau 3 droite.png" alt="" aria-hidden style={{ position: 'absolute', height: 320, width: 'auto', right: 40, top: '50%', transform: 'translateY(15%)', pointerEvents: 'none', objectFit: 'contain' }} />

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
