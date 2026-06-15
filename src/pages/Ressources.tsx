const pictos = [
  { label: 'Accès fauteuil roulant', cat: 'Mobilité' },
  { label: 'Toilettes adaptées', cat: 'Mobilité' },
  { label: 'Espace PMR', cat: 'Mobilité' },
  { label: 'Boucle magnétique', cat: 'Auditif' },
  { label: 'Interprète LSF', cat: 'Auditif' },
  { label: 'Signalétique braille', cat: 'Visuel' },
  { label: 'Espace calme', cat: 'Psychologique' },
  { label: 'Accueil bienveillant', cat: 'Général' },
]

const chiffres = [
  { n: '12M', label: 'Français en situation de handicap' },
  { n: '80%', label: 'Des handicaps sont invisibles' },
  { n: '4M', label: 'Personnes malentendantes en France' },
  { n: '1.3M', label: 'Personnes déficientes visuelles' },
  { n: '700K', label: 'Personnes avec déficience intellectuelle' },
  { n: '1/5', label: 'Personnes touchées par un trouble psychique' },
]

export default function Ressources() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="tag">À télécharger</span>
          <h1>Ressources</h1>
          <p style={{ fontSize: 18, color: 'var(--muted)', maxWidth: 560, marginTop: 20 }}>
            Signalétiques prêtes à imprimer, pictogrammes universels et données chiffrées sur le handicap en France.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 80 }}>
        <section style={{ paddingTop: 0 }}>
          <h2 style={{ marginBottom: 8 }}>Signalétiques & pictogrammes</h2>
          <p style={{ color: 'var(--muted)', marginBottom: 32, fontSize: 14 }}>
            Formats PNG et SVG — style métal, accessibles visuellement, prêts à imprimer.
          </p>
          <div className="grid-3" style={{ gap: 12 }}>
            {pictos.map(p => (
              <div key={p.label} className="card" style={{ textAlign: 'center', cursor: 'pointer' }}>
                <div style={{
                  width: 80, height: 80, background: 'var(--bg3)', border: '1px solid var(--border)',
                  borderRadius: 4, margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <span style={{ fontSize: 11, color: 'var(--muted)' }}>Picto</span>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', display: 'block', marginBottom: 6 }}>{p.cat}</span>
                <p style={{ fontSize: 13, color: 'var(--text)' }}>{p.label}</p>
                <button className="btn btn-outline" style={{ marginTop: 12, padding: '6px 16px', fontSize: 11, width: '100%' }}>
                  Télécharger
                </button>
              </div>
            ))}
          </div>
        </section>

        <section style={{ borderTop: '1px solid var(--border)' }}>
          <h2 style={{ marginBottom: 8 }}>Les chiffres</h2>
          <p style={{ color: 'var(--muted)', marginBottom: 32, fontSize: 14 }}>
            Pour convaincre vos partenaires et mettre en perspective l'enjeu de l'accessibilité.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--border)' }}>
            {chiffres.map(c => (
              <div key={c.n} style={{ background: 'var(--bg)', padding: '32px 24px' }}>
                <p style={{ fontSize: 40, fontWeight: 800, color: 'var(--accent)', lineHeight: 1, marginBottom: 8 }}>{c.n}</p>
                <p style={{ fontSize: 13, color: 'var(--muted)' }}>{c.label}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
