const packs = [
  { slug: 'pmr-mobilite-reduite', label: 'PMR / mobilité réduite' },
  { slug: 'malvoyants-non-voyants', label: 'Malvoyants / non-voyants' },
  { slug: 'sourds-malentendants', label: 'Sourds / malentendants', items: ['Picto BIM', 'Picto LSF'] },
  { slug: 'espace-repos-calme', label: 'Espace de repos calme' },
  { slug: 'accueil-prioritaire', label: 'Accueil prioritaire' },
  { slug: 'chiens-guides', label: 'Chiens guides autorisés' },
  { slug: 'sanitaires-adaptes', label: 'Sanitaires adaptés' },
  { slug: 'recharge-fauteuils', label: 'Point de recharge fauteuils' },
]

export function LesRessources() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="tag">Les ressources</span>
          <h1>Signalétiques</h1>
          <p style={{ fontSize: 16, maxWidth: 540, marginTop: 16, lineHeight: 1.7 }}>
            Des packs de pictogrammes prêts à imprimer, par type de besoin — style métal, haut contraste.
          </p>
        </div>
      </div>
      <div className="container" style={{ paddingBottom: 80 }}>
        <div className="grid-2">
          {packs.map((p) => (
            <div key={p.slug} id={p.slug} className="card" style={{ scrollMarginTop: 80 }}>
              <h3 style={{ marginBottom: 16 }}>{p.label}</h3>
              <div className="wf-block" style={{ padding: '32px 8px', fontSize: 11, marginBottom: 16 }}>
                {p.items ? p.items.join(' · ') : 'Aperçu visuel à venir'}
              </div>
              <button className="btn btn-outline" style={{ width: '100%', fontSize: 11 }}>
                Télécharger le pack (PDF / PNG)
              </button>
            </div>
          ))}
        </div>
        <div className="wf-block" style={{ marginTop: 24 }}>
          [Les fichiers seront disponibles après finalisation de la DA — style métal, haut contraste, accessibles WCAG AA]
        </div>
      </div>
    </>
  )
}
