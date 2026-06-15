export default function Festival() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="tag">Pour les organisateurs</span>
          <h1>Festival : devenez accessibles</h1>
          <p style={{ fontSize: 18, color: 'var(--muted)', maxWidth: 600, marginTop: 20 }}>
            L'accessibilité n'est pas un luxe — c'est une nécessité. Et pour les petits festivals de metal, c'est aussi une opportunité d'élargir votre public.
          </p>
        </div>
      </div>

      <div className="container">
        <section style={{ paddingTop: 0 }}>
          <h2 style={{ marginBottom: 32 }}>Pourquoi s'engager ?</h2>
          <div className="grid-3">
            {[
              { t: 'Un public plus large', d: '12 millions de Français vivent avec un handicap. Beaucoup sont fans de metal et ne peuvent pas accéder à vos événements.' },
              { t: 'Une obligation légale', d: 'La loi du 11 février 2005 impose l\'accessibilité des lieux recevant du public. Être en conformité vous protège.' },
              { t: 'Une image forte', d: 'La communauté metal valorise la solidarité et l\'inclusion. Un festival accessible envoie un message puissant.' },
            ].map(c => (
              <div key={c.t} className="card">
                <div className="accent-line" />
                <h3 style={{ marginBottom: 12 }}>{c.t}</h3>
                <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>{c.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ borderTop: '1px solid var(--border)' }}>
          <h2 style={{ marginBottom: 32 }}>Par où commencer ?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { n: '01', t: 'Évaluer l\'existant', d: 'Faites un état des lieux honnête : accès, toilettes, circulation, communication, personnel. Notre audit vous guide.' },
              { n: '02', t: 'Identifier les priorités', d: 'Commencez par les actions à fort impact et faible coût : signalétique, formation des bénévoles, information sur le site web.' },
              { n: '03', t: 'Impliquer l\'équipe', d: 'L\'accessibilité se construit avec toutes les équipes : programmation, logistique, communication, sécurité.' },
              { n: '04', t: 'Communiquer', d: 'Informez votre public des dispositifs en place. Une page dédiée sur votre site suffit pour faire la différence.' },
              { n: '05', t: 'Améliorer chaque année', d: 'L\'accessibilité est un processus continu. Collectez les retours des festivaliers et progressez édition après édition.' },
            ].map(s => (
              <div key={s.n} className="card" style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent)', minWidth: 40 }}>{s.n}</span>
                <div>
                  <h3 style={{ marginBottom: 8 }}>{s.t}</h3>
                  <p style={{ fontSize: 14, color: 'var(--muted)' }}>{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ borderTop: '1px solid var(--border)', background: 'var(--bg2)', borderRadius: 4, padding: 48, textAlign: 'center', margin: '0 0 72px' }}>
          <h2 style={{ marginBottom: 16 }}>Prêt à vous engager ?</h2>
          <p style={{ color: 'var(--muted)', marginBottom: 32 }}>Faites l'audit de votre festival et recevez un plan d'action personnalisé.</p>
          <a href="https://www.helloasso.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Faire l'audit maintenant
          </a>
        </section>
      </div>
    </>
  )
}
