import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section style={{ padding: '96px 0 80px', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <span className="tag">FMM × Accessibilité festivals</span>
          <h1 style={{ maxWidth: 680, marginBottom: 24 }}>
            Votre festival de metal,<br />accessible à tous.
          </h1>
          <p style={{ fontSize: 17, maxWidth: 520, marginBottom: 40, lineHeight: 1.8 }}>
            12 millions de Français vivent avec un handicap. Beaucoup sont fans de metal et ne peuvent pas accéder à vos événements. Ce site vous donne les outils pour changer ça — gratuitement, étape par étape.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link href="/accessible/diagnostic" className="btn btn-primary" style={{ background: '#87ceeb', borderColor: '#87ceeb', color: '#0a0a0a' }}>Faire mon diagnostic</Link>
          </div>
        </div>
      </section>

      {/* Les handicaps */}
      <section style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
            <div>
              <span className="tag">Les handicaps</span>
              <h2>6 types de handicap à connaître</h2>
            </div>
            <Link href="/handicaps" style={{ fontSize: 13, color: 'var(--muted)', textDecoration: 'underline', whiteSpace: 'nowrap' }}>
              Tout voir →
            </Link>
          </div>
          <div className="grid-3">
            {[
              { label: 'Moteur', desc: 'Fauteuil, canne, endurance réduite — cheminements et stationnement adaptés.' },
              { label: 'Visuel', desc: 'De la malvoyance à la cécité — guidage, contrastes, audiodescription.' },
              { label: 'Auditif', desc: '4M de personnes — boucle magnétique, LSF, sous-titrage, gilets vibrants.' },
              { label: 'Autisme', desc: 'Surcharge sensorielle, besoin de repères simples et d\'espaces calmes.' },
              { label: 'Psychologique', desc: 'Stress, foule, attente — réduire les facteurs anxiogènes en amont.' },
              { label: 'Invisibles', desc: '80% des handicaps — maladies chroniques, fatigue, épilepsie, douleurs.' },
            ].map(h => (
              <Link key={h.label} href="/handicaps" className="card" style={{ display: 'block', textDecoration: 'none' }}>
                <h3 style={{ marginBottom: 8 }}>{h.label}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.6 }}>{h.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* S'informer */}
      <section style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <span className="tag">S'informer</span>
          <h2 style={{ marginBottom: 32 }}>Bonnes pratiques & cadre légal</h2>
          <div className="grid-2">
            <Link href="/s-informer/bonnes-pratiques" className="card" style={{ display: 'block', textDecoration: 'none' }}>
              <div className="accent-line" />
              <h3 style={{ marginBottom: 8 }}>Les bonnes pratiques</h3>
              <p style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
                Des actions concrètes, filtrables par zone du festival et par type de handicap.
              </p>
              <span style={{ fontSize: 12, color: 'var(--muted)' }}>Voir les bonnes pratiques →</span>
            </Link>
            <Link href="/s-informer/les-lois" className="card" style={{ display: 'block', textDecoration: 'none' }}>
              <div className="accent-line" />
              <h3 style={{ marginBottom: 8 }}>Les lois</h3>
              <p style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
                Loi de 2005, ERP/IOP, arrêté de 2007 — ce que dit la loi pour votre festival.
              </p>
              <span style={{ fontSize: 12, color: 'var(--muted)' }}>Voir les lois →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Les ressources */}
      <section style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
            <div>
              <span className="tag">Les ressources</span>
              <h2>Prêt à l'emploi</h2>
            </div>
          </div>
          <div className="grid-2">
            <Link href="/les-ressources" className="card" style={{ display: 'block', textDecoration: 'none' }}>
              <div className="accent-line" />
              <h3 style={{ marginBottom: 8 }}>Signalétiques à télécharger</h3>
              <p style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
                Packs par type de besoin. Style métal, haut contraste, prêts à imprimer.
              </p>
              <span style={{ fontSize: 12, color: 'var(--muted)' }}>Voir les packs →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* La fédération */}
      <section>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <span className="tag">La fédération</span>
            <h2 style={{ marginBottom: 16 }}>Fédération des Musiques Métal</h2>
            <p style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 24 }}>
              La FMM accompagne les organisateurs de festivals de metal pour rendre la scène plus inclusive. Formation, ressources, mise en réseau — nous sommes là pour que vous ne repartiez pas de zéro.
            </p>
            <Link href="/la-federation" style={{ fontSize: 13, color: 'var(--muted)', textDecoration: 'underline' }}>
              En savoir plus →
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--border)' }}>
            {[
              { n: '12M', l: 'Français en situation de handicap' },
              { n: '80%', l: 'Des handicaps sont invisibles' },
              { n: '4M', l: 'Personnes malentendantes' },
              { n: '1/5', l: 'Troubles psychiques au cours d\'une vie' },
            ].map(s => (
              <div key={s.n} style={{ background: 'var(--bg)', padding: '24px 20px' }}>
                <p style={{ fontSize: 32, fontFamily: 'var(--font)', fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{s.n}</p>
                <p style={{ fontSize: 12, lineHeight: 1.5 }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
