import { Link } from 'react-router-dom'

export function FMMIndex() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="tag">04 — S'engager</span>
          <h1>Fédération des Musiques Métal</h1>
          <p style={{ fontSize: 16, maxWidth: 540, marginTop: 16, lineHeight: 1.7 }}>
            La FMM œuvre pour une scène metal française plus inclusive et accessible à tous.
          </p>
        </div>
      </div>
      <div className="container" style={{ paddingBottom: 80 }}>
        <div className="grid-2">
          {[
            { to: '/fmm/apropos', label: 'À propos', desc: 'Qui sommes-nous · Notre mission · Reconnaissance Sacem' },
            { to: '/fmm/objectif', label: 'Notre objectif', desc: 'Engagements · Actions · Glossaire' },
          ].map(c => (
            <Link key={c.to} to={c.to} className="card" style={{ display: 'block', textDecoration: 'none' }}>
              <div className="accent-line" />
              <h3 style={{ marginBottom: 8 }}>{c.label}</h3>
              <p style={{ fontSize: 13 }}>{c.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export function FMMapropos() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <Link to="/fmm" style={{ fontSize: 12, color: 'var(--muted)', display: 'inline-block', marginBottom: 20 }}>← S'engager</Link>
          <span className="tag">04 — S'engager</span>
          <h1>À propos</h1>
        </div>
      </div>
      <div className="container" style={{ paddingBottom: 80 }}>
        <div className="grid-2" style={{ alignItems: 'start', gap: 40 }}>
          <div>
            <h2 style={{ marginBottom: 16 }}>Qui sommes-nous</h2>
            <p style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 20 }}>
              La Fédération des Musiques Métal regroupe des organisateurs, des artistes et des acteurs de la scène metal française engagés pour l'inclusion.
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 20 }}>
              Nous croyons que la musique metal — par ses valeurs de communauté, de solidarité et de dépassement de soi — a tout pour être une scène pionnière en matière d'accessibilité.
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 32 }}>
              Notre mission est d'accompagner les petits festivals qui n'ont pas toujours les ressources pour engager une démarche d'accessibilité seuls.
            </p>

            <div style={{ padding: '20px 24px', border: '1px solid var(--border2)', marginBottom: 24 }}>
              <p style={{ fontSize: 10, fontFamily: 'var(--font)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 8 }}>
                Reconnaissance Sacem
              </p>
              <p style={{ fontSize: 14, lineHeight: 1.7 }}>
                La FMM est reconnue par la Sacem comme organisation représentative de la scène metal française. Cette reconnaissance valide notre rôle de porte-parole et facilite nos démarches institutionnelles pour défendre l'accessibilité dans les festivals.
              </p>
            </div>

            <div style={{ padding: '20px 24px', border: '1px solid var(--border2)' }}>
              <p style={{ fontSize: 10, fontFamily: 'var(--font)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 8 }}>
                Les Foudres — Bataclan
              </p>
              <p style={{ fontSize: 14, lineHeight: 1.7 }}>
                La FMM organise chaque année "Les Foudres", cérémonie de remise de prix de la scène metal française, au Bataclan (Paris). Un temps fort de reconnaissance et de rassemblement qui incarne l'ambition de la fédération : une scène metal unie, exigeante et inclusive.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div className="card">
              <h3 style={{ marginBottom: 8 }}>Notre mission</h3>
              <p style={{ fontSize: 14, lineHeight: 1.7 }}>Fournir outils, ressources et réseau pour que chaque festival de metal puisse progresser vers l'inclusion, quelle que soit sa taille.</p>
            </div>
            <div className="card">
              <h3 style={{ marginBottom: 8 }}>Nous rejoindre</h3>
              <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 12 }}>
                Organisateurs de festivals, artistes, prestataires : rejoignez le réseau et bénéficiez d'un accompagnement personnalisé.
              </p>
              <a href="mailto:contact@fmm.fr" style={{ fontSize: 13, color: 'var(--text)', textDecoration: 'underline' }}>contact@fmm.fr</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const glossaire = [
  { terme: 'BIM', def: 'Boucle à Induction Magnétique. Dispositif qui transmet le son directement aux prothèses auditives et implants cochléaires, sans passer par l\'air ambiant. Indispensable pour les personnes appareillées dans les espaces bruyants.' },
  { terme: 'LSF', def: 'Langue des Signes Française. Langue à part entière, avec sa propre syntaxe, utilisée par la communauté sourde. Pour les sourds de naissance, le français est souvent une seconde langue — la LSF est leur langue maternelle.' },
  { terme: 'PMR', def: 'Personne à Mobilité Réduite. Terme légal désignant toute personne qui éprouve des difficultés à se déplacer, temporairement ou de façon permanente : fauteuil, béquilles, poussette, âge, blessure.' },
  { terme: 'ERP', def: 'Établissement Recevant du Public. Catégorie juridique qui détermine les obligations réglementaires (accessibilité, sécurité, évacuation). Les structures temporaires des festivals (chapiteaux, scènes) sont classées ERP 5e catégorie.' },
  { terme: 'FALC', def: 'Facile À Lire et à Comprendre. Méthode de communication simplifiée : phrases courtes, vocabulaire courant, pictogrammes, mise en page aérée. Pensée pour les personnes avec déficience intellectuelle, mais utile pour tous.' },
  { terme: 'RGAA', def: 'Référentiel Général d\'Amélioration de l\'Accessibilité. Norme française d\'accessibilité numérique (sites web, applications). Impose des critères de contrastes, navigation au clavier, compatibilité avec les lecteurs d\'écran.' },
  { terme: 'IOP', def: 'Installation Ouverte au Public. Catégorie qui couvre les espaces en plein air accueillant du public : festivals, marchés, rassemblements sportifs. Soumis à l\'arrêté du 15 janvier 2007.' },
  { terme: 'PSH', def: 'Personne en Situation de Handicap. Formulation recommandée par le mouvement des personnes handicapées, qui place la situation avant la caractéristique, et rappelle que le handicap est aussi produit par l\'environnement.' },
]

export function FMMobjectif() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <Link to="/fmm" style={{ fontSize: 12, color: 'var(--muted)', display: 'inline-block', marginBottom: 20 }}>← S'engager</Link>
          <span className="tag">04 — S'engager</span>
          <h1>Notre objectif</h1>
        </div>
      </div>
      <div className="container" style={{ paddingBottom: 80 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 48 }}>
          {[
            { t: 'Formation', d: 'Organiser des sessions de sensibilisation pour les équipes de festivals avec des associations spécialisées.' },
            { t: 'Ressources', d: 'Mettre à disposition gratuitement signalétiques, checklists et guides adaptés à la culture metal.' },
            { t: 'Réseau', d: 'Mettre en relation les organisateurs avec des experts du handicap et des festivals pionniers.' },
            { t: 'Plaidoyer', d: 'Représenter la scène metal dans les discussions institutionnelles sur l\'accessibilité culturelle.' },
          ].map(e => (
            <div key={e.t} className="card" style={{ display: 'flex', gap: 24 }}>
              <div className="accent-line" style={{ margin: 0, minWidth: 2, width: 2, height: 'auto', alignSelf: 'stretch' }} />
              <div>
                <h3 style={{ marginBottom: 8 }}>{e.t}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7 }}>{e.d}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Glossaire */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ marginBottom: 24 }}>Glossaire</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {glossaire.map(g => (
              <div key={g.terme} style={{ display: 'flex', gap: 24, padding: '16px 20px', background: '#fff', border: '1px solid var(--border)' }}>
                <span style={{ fontSize: 13, fontFamily: 'var(--font)', fontWeight: 700, minWidth: 56, color: 'var(--text)' }}>{g.terme}</span>
                <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--muted)' }}>{g.def}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 40, padding: 32, background: '#fff', border: '1px solid var(--border)', textAlign: 'center' }}>
          <h2 style={{ marginBottom: 12 }}>Rejoindre le réseau FMM</h2>
          <p style={{ fontSize: 14, marginBottom: 24 }}>Vous organisez un festival de metal ? Bénéficiez d'un accompagnement personnalisé.</p>
          <a href="mailto:contact@fmm.fr" className="btn btn-primary">Nous contacter →</a>
        </div>
      </div>
    </>
  )
}
