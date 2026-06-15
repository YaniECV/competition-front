import { Link, useParams } from 'react-router-dom'

const types = [
  { slug: 'moteur', label: 'Moteur', icon: '♿', count: '3 catégories' },
  { slug: 'visuel', label: 'Visuel', icon: '👁', count: '1.3M de personnes' },
  { slug: 'auditif', label: 'Auditif', icon: '👂', count: '4M de personnes' },
  { slug: 'autisme', label: 'Autisme', icon: '🧠', count: 'Déficience intellectuelle' },
  { slug: 'psychologique', label: 'Psychologique', icon: '💭', count: '1/5 personnes' },
  { slug: 'invisibles', label: 'Handicaps invisibles', icon: '🔍', count: '80% des handicaps' },
]

export function HandicapsIndex() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="tag">Comprendre</span>
          <h1>Les types de handicap</h1>
          <p style={{ fontSize: 18, color: 'var(--muted)', maxWidth: 560, marginTop: 20 }}>
            Comprendre les besoins de chaque type de handicap est la première étape pour concevoir un festival accessible.
          </p>
        </div>
      </div>
      <div className="container" style={{ paddingBottom: 80 }}>
        <div className="grid-2">
          {types.map(t => (
            <Link key={t.slug} to={`/handicaps/${t.slug}`} className="card" style={{ display: 'flex', gap: 20, alignItems: 'flex-start', textDecoration: 'none' }}>
              <span style={{ fontSize: 32 }}>{t.icon}</span>
              <div>
                <span style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>{t.count}</span>
                <h3 style={{ marginBottom: 6 }}>{t.label}</h3>
                <p style={{ fontSize: 13, color: 'var(--muted)' }}>Besoins & aménagements →</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

const data: Record<string, { label: string; intro: string; besoins: string[]; solutions: string[] }> = {
  moteur: {
    label: 'Handicap moteur',
    intro: 'Les personnes atteintes de handicap moteur se répartissent en trois catégories : fauteuil roulant, aide à la marche (canne, béquilles), ou sans aide mais avec manque d\'endurance. Chacune a des besoins spécifiques à anticiper.',
    besoins: [
      'Déplacements les plus courts possibles',
      'Surfaces planes et non glissantes',
      'Bon éclairage sur les chemins',
      'Signalétique visible depuis un fauteuil',
      'Possibilité de faire des pauses',
      'Autonomie dans l\'expérience du festival',
      'Places offrant une bonne visibilité',
    ],
    solutions: [
      'Information sur l\'accessibilité des transports',
      'Stationnement réservé près de l\'entrée',
      'Cheminements accessibles sans marches, clairement indiqués',
      'Plaques de roulage sur terrains boueux',
      'Plateformes dédiées aux fauteuils roulants (et accompagnants)',
      'Pentes à moins de 5% pour les longues rampes',
      'Comptoirs abaissés (bars, restauration)',
      'Cabines de toilettes adaptées',
      'Bornes de recharge pour fauteuils électriques',
      'Mains courantes et points d\'étape',
      'Recensement des hébergements accessibles à proximité',
    ],
  },
  visuel: {
    label: 'Handicap visuel',
    intro: 'Le handicap visuel touche 1,3 million de personnes en France. Il va de la faible acuité visuelle à la cécité totale — seuls 2 à 3% des personnes concernées sont non-voyantes. Beaucoup s\'orientent grâce aux textures, contrastes et sons.',
    besoins: [
      'Absence d\'obstacles sur le chemin',
      'Accès simple à l\'information',
      'Possibilité de se repérer dans l\'espace',
    ],
    solutions: [
      'Site web et informations digitales accessibles (compatibles lecteurs d\'écran)',
      'Informations orales disponibles',
      'Cheminement dégagé de tout obstacle',
      'Mains courantes avec indications en braille',
      'Guidage au sol et bandes de vigilance',
      'Signalétique en gros caractères avec couleurs contrastées',
      'Audiodescription des spectacles',
    ],
  },
  auditif: {
    label: 'Handicap auditif',
    intro: 'Le handicap auditif concerne 4 millions de personnes en France : acouphènes, malentendance, surdité. Certaines pratiquent la LSF (Langue des Signes Française), dont la syntaxe est différente du français courant. Un éclairage adapté est essentiel.',
    besoins: [
      'Bon éclairage pour voir les visages et les informations écrites',
      'Espaces de repos à l\'écart du bruit',
      'Information visuelle plutôt qu\'orale',
    ],
    solutions: [
      'Papier et crayon aux points d\'accueil',
      'Boucles magnétiques devant les scènes',
      'Sous-titrage et sur-titrage des spectacles et vidéos',
      'Application de retranscription en temps réel',
      'Alertes de sécurité lumineuses (gyrophares)',
      'Formation des équipes à la LSF',
      'Interprètes LSF pour les spectacles et conférences',
      'Gilets vibrants permettant de ressentir la musique',
      'Spectacles "chansignés"',
    ],
  },
  autisme: {
    label: 'Déficience intellectuelle & autisme',
    intro: 'Les personnes atteintes de déficience intellectuelle sont officiellement 700 000 en France. Elles éprouvent des difficultés à mobiliser leur attention, comprendre les informations et s\'adapter à un environnement inconnu. Des repères simples et répétitifs sont essentiels.',
    besoins: [
      'Accès à des informations simples et claires',
      'Contacts calmes et bienveillants',
      'Environnement prévisible avec peu de surprises',
    ],
    solutions: [
      'Programmes en "Facile à Lire et à Comprendre" (FALC)',
      'Informations sous forme de pictogrammes universels',
      'Personnel d\'accueil formé et sensibilisé',
      'Espace calme disponible pour les moments de surcharge sensorielle',
      'Plan du festival simple et lisible',
    ],
  },
  psychologique: {
    label: 'Troubles psychiques',
    intro: 'L\'OMS estime que 20 à 25% de la population sera touchée par un trouble psychique au cours de sa vie (addictions, TOC, bipolarité, anxiété, dépression…). Ces troubles sont souvent invisibles et font l\'objet d\'un déni. Les situations de stress, d\'attente et de foule doivent être réduites au maximum.',
    besoins: [
      'Réduction des situations stressantes (attente, foule, bruit)',
      'Accueil bienveillant et sans jugement',
      'Possibilité de se retirer dans un espace calme',
    ],
    solutions: [
      'Files d\'attente organisées et courtes',
      'Espaces de repos et de décompression',
      'Personnel formé à l\'écoute et à la gestion de crise',
      'Communication claire sur le programme pour réduire l\'incertitude',
      'Présence d\'une équipe de soutien psychologique',
    ],
  },
  invisibles: {
    label: 'Handicaps invisibles',
    intro: '80% des handicaps sont invisibles : maladies chroniques, douleurs, fatigue intense, troubles cognitifs, épilepsie… Ces personnes ne sont pas toujours identifiées et peuvent hésiter à demander de l\'aide. Une attitude bienveillante de la part de tous les acteurs du festival est fondamentale.',
    besoins: [
      'Être cru et pris en charge sans avoir à "prouver" son handicap',
      'Accès facilité sans avoir à s\'expliquer',
      'Possibilité de s\'asseoir et de se reposer régulièrement',
    ],
    solutions: [
      'Carte "Tournesol" (lanyard) reconnue par le personnel',
      'Points d\'assise réguliers sur tout le site',
      'Accès prioritaire disponible discrètement',
      'Personnel formé à ne pas questionner les handicaps non visibles',
      'Communication sans stéréotypes sur le handicap',
    ],
  },
}

export function HandicapDetail() {
  const { slug } = useParams<{ slug: string }>()
  const item = data[slug || '']

  if (!item) {
    return (
      <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
        <h2>Page introuvable</h2>
        <Link to="/handicaps" style={{ color: 'var(--accent)', marginTop: 16, display: 'inline-block' }}>← Retour aux handicaps</Link>
      </div>
    )
  }

  const current = types.find(t => t.slug === slug)
  const currentIdx = types.findIndex(t => t.slug === slug)
  const prev = types[currentIdx - 1]
  const next = types[currentIdx + 1]

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <Link to="/handicaps" style={{ fontSize: 13, color: 'var(--muted)', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 24 }}>
            ← Tous les handicaps
          </Link>
          <span style={{ fontSize: 40, display: 'block', marginBottom: 16 }}>{current?.icon}</span>
          <span className="tag">{current?.count}</span>
          <h1>{item.label}</h1>
          <p style={{ fontSize: 16, color: 'var(--muted)', maxWidth: 620, marginTop: 20, lineHeight: 1.7 }}>{item.intro}</p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 80 }}>
        <div className="grid-2" style={{ alignItems: 'start' }}>
          <div className="card">
            <h2 style={{ marginBottom: 24, fontSize: '1.2rem' }}>Leurs besoins</h2>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {item.besoins.map(b => (
                <li key={b} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--accent)', fontSize: 16, lineHeight: 1.6 }}>—</span>
                  <span style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.6 }}>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h2 style={{ marginBottom: 24, fontSize: '1.2rem' }}>Les aménagements</h2>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {item.solutions.map(s => (
                <li key={s} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--accent)', fontSize: 16, lineHeight: 1.6 }}>✓</span>
                  <span style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.6 }}>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--border)' }}>
          {prev ? (
            <Link to={`/handicaps/${prev.slug}`} style={{ fontSize: 14, color: 'var(--accent)' }}>← {prev.label}</Link>
          ) : <span />}
          {next ? (
            <Link to={`/handicaps/${next.slug}`} style={{ fontSize: 14, color: 'var(--accent)' }}>{next.label} →</Link>
          ) : <span />}
        </div>
      </div>
    </>
  )
}
