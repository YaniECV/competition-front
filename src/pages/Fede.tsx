export default function Fede() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="tag">Qui sommes-nous</span>
          <h1>La fédération</h1>
          <p style={{ fontSize: 18, color: 'var(--muted)', maxWidth: 560, marginTop: 20 }}>
            La Fédération des Musiques Métal œuvre pour une scène metal française plus inclusive et accessible à tous.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 80 }}>
        <section style={{ paddingTop: 0 }}>
          <div className="grid-2" style={{ alignItems: 'start', gap: 64 }}>
            <div>
              <h2 style={{ marginBottom: 20 }}>Notre objectif</h2>
              <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: 20 }}>
                Nous croyons que la musique metal — par ses valeurs de communauté, de solidarité et de dépassement de soi — a tout pour être une scène pionnière en matière d'inclusion.
              </p>
              <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: 20 }}>
                Notre mission est d'accompagner les petits festivals qui n'ont pas toujours les ressources pour engager une démarche d'accessibilité seuls. Nous mettons à leur disposition des outils concrets, des ressources gratuites et un réseau de professionnels.
              </p>
              <p style={{ color: 'var(--muted)', lineHeight: 1.8 }}>
                Parce qu'un festival accessible, c'est un festival qui grandit.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { t: 'À propos', d: 'La fédération regroupe des organisateurs, des artistes et des acteurs de la scène metal française engagés pour l\'inclusion.' },
                { t: 'Ce que nous faisons', d: 'Formation, audit, ressources, mise en réseau avec des experts du handicap et plaidoyer auprès des institutions.' },
                { t: 'Nous rejoindre', d: 'Vous organisez un festival de metal ? Rejoignez notre réseau et bénéficiez d\'un accompagnement personnalisé.' },
              ].map(c => (
                <div key={c.t} className="card">
                  <div className="accent-line" />
                  <h3 style={{ marginBottom: 10 }}>{c.t}</h3>
                  <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ borderTop: '1px solid var(--border)', background: 'var(--bg2)', borderRadius: 4, padding: 48, textAlign: 'center', margin: '0 0 72px' }}>
          <h2 style={{ marginBottom: 16 }}>Contacter la fédération</h2>
          <p style={{ color: 'var(--muted)', marginBottom: 32 }}>Une question ? Un projet ? Nous sommes là.</p>
          <a href="mailto:contact@festaccess.fr" className="btn btn-primary">
            contact@festaccess.fr
          </a>
        </section>
      </div>
    </>
  )
}
