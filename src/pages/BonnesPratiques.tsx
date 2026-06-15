const articles = [
  {
    cat: 'Communication',
    title: 'Créer une page accessibilité sur votre site',
    desc: 'Détaillez les dispositifs en place, les contacts utiles, les informations de transport et de stationnement adapté.',
    date: 'Juin 2026',
  },
  {
    cat: 'Logistique',
    title: 'Choisir et aménager un terrain accessible',
    desc: 'Sol, chemins, plaques de roulage, signalétique au sol : comment préparer votre site pour les personnes à mobilité réduite.',
    date: 'Mai 2026',
  },
  {
    cat: 'Formation',
    title: 'Former ses bénévoles à l\'accueil de tous les publics',
    desc: 'Quelques heures de sensibilisation suffisent à transformer l\'expérience des festivaliers en situation de handicap.',
    date: 'Avril 2026',
  },
  {
    cat: 'Technique',
    title: 'Installer une boucle magnétique devant la scène',
    desc: 'Peu coûteuse et très efficace pour les personnes malentendantes appareillées, la boucle magnétique est un must.',
    date: 'Mars 2026',
  },
  {
    cat: 'Communication',
    title: 'Utiliser les pictogrammes universels',
    desc: 'Les pictogrammes accessibles sont compris par tous, y compris les personnes avec une déficience intellectuelle ou une barrière linguistique.',
    date: 'Février 2026',
  },
  {
    cat: 'Logistique',
    title: 'Aménager des sanitaires accessibles',
    desc: 'Des toilettes adaptées, propres et bien signalées sont indispensables pour garantir une expérience autonome.',
    date: 'Janvier 2026',
  },
]

const cats = ['Tous', 'Communication', 'Logistique', 'Formation', 'Technique']

export default function BonnesPratiques() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="tag">Guide pratique</span>
          <h1>Bonnes pratiques</h1>
          <p style={{ fontSize: 18, color: 'var(--muted)', maxWidth: 560, marginTop: 20 }}>
            Des conseils concrets pour améliorer l'accessibilité de votre festival, édition après édition.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 80 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 40 }}>
          {cats.map(c => (
            <button key={c} className="btn btn-outline" style={{ padding: '6px 16px', fontSize: 12 }}>{c}</button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {articles.map(a => (
            <div key={a.title} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24, cursor: 'pointer' }}>
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', display: 'block', marginBottom: 8 }}>{a.cat}</span>
                <h3 style={{ marginBottom: 8 }}>{a.title}</h3>
                <p style={{ fontSize: 14, color: 'var(--muted)' }}>{a.desc}</p>
              </div>
              <div style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                <p style={{ fontSize: 12, color: 'var(--muted)' }}>{a.date}</p>
                <p style={{ fontSize: 18, color: 'var(--muted)', marginTop: 8 }}>→</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
