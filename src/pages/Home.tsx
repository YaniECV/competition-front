import { Link } from 'react-router-dom'

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
            <Link to="/agir/diagnostic" className="btn btn-primary">Faire mon diagnostic</Link>
            <Link to="/comprendre/handicaps" className="btn btn-outline">Comprendre les handicaps</Link>
          </div>
        </div>
      </section>

      {/* Pourquoi agir */}
      <section style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 64, alignItems: 'start' }}>
            <div>
              <span className="tag">Pourquoi agir</span>
              <h2>Un enjeu humain, légal et artistique</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {[
                { t: 'Un public qui existe', d: '80% des handicaps sont invisibles. Ces personnes achètent des places, font la route, veulent vivre le concert — mais repartent souvent sans pouvoir y accéder.' },
                { t: 'Une obligation légale', d: 'La loi du 11 février 2005 et l\'arrêté du 15 janvier 2007 imposent des exigences d\'accessibilité aux Installations Ouvertes au Public, dont les festivals.' },
                { t: 'Une cohérence avec vos valeurs', d: 'La scène metal se construit sur la communauté et la solidarité. Un festival accessible, c\'est un festival qui va au bout de ces valeurs.' },
              ].map(c => (
                <div key={c.t} style={{ paddingLeft: 20, borderLeft: '2px solid var(--border2)' }}>
                  <h3 style={{ marginBottom: 6 }}>{c.t}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.7 }}>{c.d}</p>
                </div>
              ))}
              <Link to="/comprendre/normes" style={{ fontSize: 13, color: 'var(--muted)', textDecoration: 'underline' }}>
                Voir le cadre légal →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Types de handicap */}
      <section style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
            <div>
              <span className="tag">Comprendre</span>
              <h2>6 types de handicap à connaître</h2>
            </div>
            <Link to="/comprendre/handicaps" style={{ fontSize: 13, color: 'var(--muted)', textDecoration: 'underline', whiteSpace: 'nowrap' }}>
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
              <Link key={h.label} to="/comprendre/handicaps" className="card" style={{ display: 'block', textDecoration: 'none' }}>
                <h3 style={{ marginBottom: 8 }}>{h.label}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.6 }}>{h.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Diagnostic CTA */}
      <section style={{ borderBottom: '1px solid var(--border)', background: 'var(--text)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.2)', padding: '3px 10px', display: 'inline-block', marginBottom: 16, fontFamily: 'var(--font)' }}>
              Agir
            </span>
            <h2 style={{ color: '#fff', marginBottom: 16 }}>Trouvez votre plan d'action en 4 questions</h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: 32 }}>
              Jauge, terrain, budget, type de public prioritaire. On génère un plan adapté à votre festival — gratuit, sans inscription.
            </p>
            <Link to="/agir/diagnostic" style={{ display: 'inline-block', padding: '10px 22px', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', background: '#fff', color: 'var(--text)', fontFamily: 'var(--font)', textDecoration: 'none' }}>
              Démarrer le diagnostic →
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {[
              '01 · Quelle est la jauge de votre festival ?',
              '02 · Quel type de terrain ?',
              '03 · Quel budget accessibilité ?',
              '04 · Quels publics prioriser ?',
              '→  Votre plan d\'action personnalisé',
            ].map((s, i) => (
              <div key={s} style={{ padding: '12px 16px', background: i === 4 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)', fontSize: 13, color: i === 4 ? '#fff' : 'rgba(255,255,255,0.5)', fontFamily: i === 4 ? 'var(--font)' : 'var(--font-ui)', fontWeight: i === 4 ? 700 : 400 }}>
                {s}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outils */}
      <section style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
            <div>
              <span className="tag">Outils</span>
              <h2>Prêt à l'emploi</h2>
            </div>
          </div>
          <div className="grid-2">
            <Link to="/outils/signaletiques" className="card" style={{ display: 'block', textDecoration: 'none' }}>
              <div className="accent-line" />
              <h3 style={{ marginBottom: 8 }}>Signalétiques à télécharger</h3>
              <p style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
                Packs PNG + SVG par type de handicap. Style métal, haut contraste, prêts à imprimer.
              </p>
              <span style={{ fontSize: 12, color: 'var(--muted)' }}>Voir les packs →</span>
            </Link>
            <Link to="/outils/checklist" className="card" style={{ display: 'block', textDecoration: 'none' }}>
              <div className="accent-line" />
              <h3 style={{ marginBottom: 8 }}>Checklist interactive</h3>
              <p style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
                Avant, pendant, après le festival. Cochez au fur et à mesure et suivez votre progression.
              </p>
              <span style={{ fontSize: 12, color: 'var(--muted)' }}>Ouvrir la checklist →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* La FMM */}
      <section>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <span className="tag">La FMM</span>
            <h2 style={{ marginBottom: 16 }}>Fédération des Musiques Métal</h2>
            <p style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 24 }}>
              La FMM accompagne les organisateurs de festivals de metal pour rendre la scène plus inclusive. Formation, ressources, mise en réseau — nous sommes là pour que vous ne repartiez pas de zéro.
            </p>
            <Link to="/fmm/apropos" style={{ fontSize: 13, color: 'var(--muted)', textDecoration: 'underline' }}>
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
  )
}
