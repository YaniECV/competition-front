import { Link } from 'react-router-dom'

const handicaps = [
  { slug: 'moteur', label: 'Moteur' },
  { slug: 'visuel', label: 'Visuel' },
  { slug: 'auditif', label: 'Auditif' },
  { slug: 'autisme', label: 'Autisme & déficience intellectuelle' },
  { slug: 'psychologique', label: 'Troubles psychiques' },
  { slug: 'invisibles', label: 'Handicaps invisibles' },
]

export function ComprendreIndex() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="tag">01 — Comprendre</span>
          <h1>Les handicaps & enjeux</h1>
          <p style={{ fontSize: 16, maxWidth: 540, marginTop: 16, lineHeight: 1.7 }}>
            Avant d'agir, comprendre. Les types de handicap, les chiffres, et le cadre légal qui s'applique aux festivals.
          </p>
        </div>
      </div>
      <div className="container" style={{ paddingBottom: 80 }}>
        <div className="grid-3" style={{ marginBottom: 40 }}>
          {[
            { to: '/comprendre/handicaps', label: 'Les types de handicap', desc: 'Moteur · Visuel · Auditif · Autisme · Psy · Invisibles' },
            { to: '/comprendre/chiffres', label: 'Chiffres & enjeux', desc: 'Stats · Impact médiatique · Pourquoi agir' },
            { to: '/comprendre/normes', label: 'Normes & lois', desc: 'Réglementation ERP · Obligations légales · Subventions' },
          ].map(c => (
            <Link key={c.to} to={c.to} className="card" style={{ display: 'block', textDecoration: 'none' }}>
              <div className="accent-line" />
              <h3 style={{ marginBottom: 8 }}>{c.label}</h3>
              <p style={{ fontSize: 13 }}>{c.desc}</p>
            </Link>
          ))}
        </div>

        <hr />
        <h2 style={{ marginBottom: 24 }}>Types de handicap</h2>
        <div className="grid-2">
          {handicaps.map(h => (
            <Link key={h.slug} to={`/comprendre/handicaps#${h.slug}`} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', textDecoration: 'none' }}>
              <h3 style={{ fontWeight: 400 }}>{h.label}</h3>
              <span style={{ fontSize: 12, color: 'var(--muted)' }}>→</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

function HandicapMoteur() {
  const amenagements = [
    {
      icon: '🚗',
      title: 'Avant d\'arriver',
      items: [
        'Info accessibilité des transports clairement publiée',
        'Stationnement réservé au plus près de l\'entrée',
        'Navettes entre parkings et accès festival',
      ],
    },
    {
      icon: '🛤️',
      title: 'Circuler sur le site',
      items: [
        'Cheminements accessibles balisés, sans marches',
        'Plaques de roulage sur terrains boueux ou accidentés',
        'Pentes inférieures à 5% pour les longues montées',
        'Mains courantes aux points stratégiques',
        'Points d\'étapes pour faire des pauses',
      ],
    },
    {
      icon: '🎸',
      title: 'Vivre le festival',
      items: [
        'Plateformes dédiées fauteuils + accompagnants avec bonne visibilité',
        'Comptoirs abaissés (bar, restauration, billetterie)',
        'Cabines toilettes adaptées',
        'Bornes de recharge et réparation pour fauteuils électriques',
      ],
    },
    {
      icon: '🏕️',
      title: 'Autour du festival',
      items: [
        'Recensement des hébergements accessibles à proximité',
      ],
    },
  ]

  const visages = [
    { label: 'Le fauteuil', desc: 'manuel ou électrique, il exige des surfaces planes, de l\'espace, et une recharge possible' },
    { label: 'Les aides à la marche', desc: 'canne, béquilles, déambulateur : chaque marche, chaque terrain irrégulier est une épreuve' },
    { label: 'L\'endurance réduite', desc: 'invisible, souvent ignorée : cette personne marche, mais pas longtemps, pas loin, pas debout toute une journée' },
  ]

  const besoins = [
    'Trajets les plus courts possible',
    'Surfaces planes, non glissantes, bien éclairées',
    'Signalétique visible depuis un fauteuil',
    'Pauses possibles tout au long du parcours',
    'Bonne visibilité depuis les zones spectateurs',
    'Autonomie totale dans l\'expérience festival',
  ]

  const communication = [
    'Mettez-vous à hauteur de la personne avant de parler',
    'Parlez à la personne, pas à son accompagnant',
    'Ne vous appuyez pas sur le fauteuil — c\'est une partie du corps',
    'Proposez votre aide sans l\'imposer : "puis-je vous aider ?"',
    'Guidez vers les espaces accessibles clairement et concrètement',
  ]

  return (
    <div id="moteur" style={{ marginBottom: 64, paddingBottom: 64, borderBottom: '1px solid var(--border)' }}>
      {/* Header */}
      <h2 style={{ marginBottom: 6 }}>Moteur</h2>
      <p style={{ fontSize: 22, fontFamily: 'var(--font)', fontWeight: 700, color: 'var(--text)', marginBottom: 24, lineHeight: 1.2 }}>
        Et si le terrain en herbe était votre premier mur ?
      </p>

      {/* Corps */}
      <p style={{ fontSize: 14, lineHeight: 1.8, maxWidth: 680, marginBottom: 20, color: 'var(--muted)' }}>
        Un festival, c'est de la boue, des pentes, des kilomètres à pied, de la foule. Pour la plupart des festivaliers, c'est l'aventure. Pour une personne en fauteuil roulant, une personne qui marche avec des béquilles ou qui manque d'endurance — c'est souvent une série d'obstacles invisibles aux autres.
      </p>
      <p style={{ fontSize: 14, lineHeight: 1.8, maxWidth: 680, marginBottom: 24, color: 'var(--muted)' }}>
        En France, 850 000 personnes utilisent un fauteuil roulant. Mais le handicap moteur ne se résume pas à ça. Il prend trois visages :
      </p>

      {/* 3 visages */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 32, border: '1px solid var(--border)' }}>
        {visages.map((v, i) => (
          <div key={v.label} style={{ display: 'flex', gap: 20, padding: '16px 20px', borderBottom: i < visages.length - 1 ? '1px solid var(--border)' : 'none', alignItems: 'flex-start' }}>
            <span style={{ fontFamily: 'var(--font)', fontSize: 12, color: 'var(--muted)', minWidth: 20, paddingTop: 2 }}>—</span>
            <div>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font)' }}>{v.label}</span>
              <span style={{ fontSize: 14, color: 'var(--muted)' }}> — {v.desc}</span>
            </div>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 14, lineHeight: 1.8, maxWidth: 680, marginBottom: 40, color: 'var(--muted)' }}>
        Ce que vous faites en tant qu'organisateur peut transformer une expérience épuisante en souvenir inoubliable. Voici comment.
      </p>

      {/* Besoins */}
      <div style={{ marginBottom: 40 }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--font)', color: 'var(--text)', marginBottom: 16 }}>
          ⚡ LEURS BESOINS EN FESTIVAL
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', border: '1px solid var(--border)' }}>
          {besoins.map((b, i) => (
            <div key={b} style={{ padding: '12px 16px', borderRight: i % 2 === 0 ? '1px solid var(--border)' : 'none', borderBottom: i < besoins.length - 2 ? '1px solid var(--border)' : 'none', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--muted)', flexShrink: 0, fontFamily: 'var(--font)', fontSize: 12 }}>—</span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>{b}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Aménagements */}
      <div style={{ marginBottom: 40 }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--font)', color: 'var(--text)', marginBottom: 16 }}>
          🛠️ LES AMÉNAGEMENTS ESSENTIELS
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {amenagements.map(a => (
            <div key={a.title} className="card">
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--font)', color: 'var(--text)', marginBottom: 12 }}>
                {a.icon} {a.title}
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {a.items.map(item => (
                  <li key={item} style={{ display: 'flex', gap: 10, fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>
                    <span style={{ flexShrink: 0, fontFamily: 'var(--font)' }}>—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Communication */}
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--font)', color: 'var(--text)', marginBottom: 16 }}>
          💬 RÈGLES DE COMMUNICATION
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid var(--border)' }}>
          {communication.map((c, i) => (
            <div key={c} style={{ display: 'flex', gap: 20, padding: '14px 20px', borderBottom: i < communication.length - 1 ? '1px solid var(--border)' : 'none', alignItems: 'flex-start' }}>
              <span style={{ fontFamily: 'var(--font)', fontSize: 11, color: 'var(--muted)', minWidth: 20, paddingTop: 2, flexShrink: 0 }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>{c}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function ComprendreHandicaps() {
  const otherItems = [
    {
      slug: 'visuel', label: 'Visuel',
      intro: '1,3 million de personnes en France. Seulement 2-3% sont non-voyantes. Beaucoup s\'orientent via les textures, contrastes, odeurs et sons.',
      besoins: ['Absence d\'obstacles', 'Accès simple à l\'information', 'Se repérer dans l\'espace'],
      solutions: ['Site web compatible lecteurs d\'écran', 'Informations orales', 'Cheminement dégagé', 'Mains courantes avec braille', 'Guidage au sol', 'Signalétique grande taille, haut contraste', 'Audiodescription'],
    },
    {
      slug: 'auditif', label: 'Auditif',
      intro: '4 millions de personnes en France. La LSF (Langue des Signes Française) a une syntaxe totalement différente du français — pour certains sourds, le français est une langue étrangère.',
      besoins: ['Bon éclairage pour lire sur les lèvres', 'Espaces calmes', 'Information visuelle'],
      solutions: ['Papier/crayon aux accueils', 'Boucles magnétiques', 'Sous-titrage / surtitrage', 'App de retranscription', 'Alertes lumineuses d\'urgence', 'Formation LSF', 'Interprètes LSF', 'Gilets vibrants'],
    },
    {
      slug: 'autisme', label: 'Autisme & déficience intellectuelle',
      intro: '700 000 personnes en France. Difficultés à mobiliser l\'attention, comprendre les informations complexes et s\'adapter à un environnement inconnu.',
      besoins: ['Informations simples', 'Contacts calmes et bienveillants', 'Environnement prévisible'],
      solutions: ['Supports FALC (Facile à Lire et à Comprendre)', 'Pictogrammes universels', 'Personnel formé', 'Espace calme disponible', 'Plan simple et lisible'],
    },
    {
      slug: 'psychologique', label: 'Troubles psychiques',
      intro: '20-25% de la population sera touchée au cours de sa vie (TOC, bipolarité, anxiété, dépression…). Stress, attentes et foule sont particulièrement anxiogènes.',
      besoins: ['Réduction des situations de stress', 'Accueil bienveillant', 'Espace calme accessible'],
      solutions: ['Files d\'attente organisées', 'Espaces de repos', 'Personnel à l\'écoute', 'Communication claire sur le programme', 'Équipe de soutien'],
    },
    {
      slug: 'invisibles', label: 'Handicaps invisibles',
      intro: '80% des handicaps sont invisibles : maladies chroniques, douleurs, fatigue, troubles cognitifs, épilepsie… Ces personnes hésitent souvent à demander de l\'aide.',
      besoins: ['Être cru sans avoir à prouver', 'Accès facilité sans s\'expliquer', 'Points d\'assise réguliers'],
      solutions: ['Carte Tournesol reconnue', 'Points d\'assise sur tout le site', 'Accès prioritaire discret', 'Personnel non intrusif', 'Communication sans stéréotypes'],
    },
  ]

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <Link to="/comprendre" style={{ fontSize: 12, color: 'var(--muted)', display: 'inline-block', marginBottom: 20 }}>← Comprendre</Link>
          <span className="tag">01 — Comprendre</span>
          <h1>Les types de handicap</h1>
        </div>
      </div>
      <div className="container" style={{ paddingBottom: 80 }}>
        <HandicapMoteur />
        {otherItems.map((h, i) => (
          <div key={h.slug} id={h.slug} style={{ marginBottom: 48, paddingBottom: 48, borderBottom: i < otherItems.length - 1 ? '1px solid var(--border)' : 'none' }}>
            <h2 style={{ marginBottom: 12 }}>{h.label}</h2>
            <p style={{ fontSize: 14, marginBottom: 24, maxWidth: 640, lineHeight: 1.7 }}>{h.intro}</p>
            <div className="grid-2">
              <div className="card">
                <h3 style={{ marginBottom: 16, fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Besoins</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {h.besoins.map(b => (
                    <li key={b} style={{ display: 'flex', gap: 10, fontSize: 13, color: 'var(--muted)' }}>
                      <span style={{ flexShrink: 0 }}>—</span><span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card">
                <h3 style={{ marginBottom: 16, fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Aménagements</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {h.solutions.map(s => (
                    <li key={s} style={{ display: 'flex', gap: 10, fontSize: 13, color: 'var(--muted)' }}>
                      <span style={{ flexShrink: 0 }}>✓</span><span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export function ComprendreChiffres() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <Link to="/comprendre" style={{ fontSize: 12, color: 'var(--muted)', display: 'inline-block', marginBottom: 20 }}>← Comprendre</Link>
          <span className="tag">01 — Comprendre</span>
          <h1>Chiffres & enjeux</h1>
        </div>
      </div>
      <div className="container" style={{ paddingBottom: 80 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: '1px solid var(--border)', marginBottom: 48 }}>
          {[
            { n: '12M', l: 'Français en situation de handicap' },
            { n: '80%', l: 'Des handicaps sont invisibles' },
            { n: '4M', l: 'Personnes malentendantes' },
            { n: '1.3M', l: 'Personnes déficientes visuelles' },
            { n: '700K', l: 'Personnes avec déficience intellectuelle' },
            { n: '1/5', l: 'Touchés par un trouble psychique' },
          ].map((s, i) => (
            <div key={s.n} style={{ padding: '28px 24px', borderRight: (i + 1) % 3 !== 0 ? '1px solid var(--border)' : 'none', borderBottom: i < 3 ? '1px solid var(--border)' : 'none' }}>
              <p style={{ fontSize: 40, fontFamily: 'var(--font)', fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{s.n}</p>
              <p style={{ fontSize: 13 }}>{s.l}</p>
            </div>
          ))}
        </div>
        <div className="card" style={{ maxWidth: 640 }}>
          <div className="wf-block" style={{ marginBottom: 16 }}>[Graphique / infographie à intégrer]</div>
          <p style={{ fontSize: 13, lineHeight: 1.7 }}>
            Source : Guide d'accompagnement Métropole Aix-Marseille-Provence (2024), ministère chargé des personnes handicapées.
          </p>
        </div>
      </div>
    </>
  )
}

export function ComprendreNormes() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <Link to="/comprendre" style={{ fontSize: 12, color: 'var(--muted)', display: 'inline-block', marginBottom: 20 }}>← Comprendre</Link>
          <span className="tag">01 — Comprendre</span>
          <h1>Normes & lois</h1>
        </div>
      </div>
      <div className="container" style={{ paddingBottom: 80 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { titre: 'Loi du 11 février 2005', desc: 'Loi pour l\'égalité des droits et des chances, la participation et la citoyenneté des personnes handicapées. Texte de référence pour l\'accessibilité des ERP.' },
            { titre: 'Arrêté du 15 janvier 2007', desc: 'Fixe les exigences techniques d\'accessibilité pour les IOP (Installations Ouvertes au Public) — catégorie qui inclut les festivals en plein air.' },
            { titre: 'Réglementation ERP (établissements recevant du public)', desc: 'Classes les établissements par type et capacité. Les festivals temporaires relèvent généralement de la 5e catégorie selon leur jauge.' },
            { titre: 'Subventions disponibles', desc: 'DRAC, collectivités territoriales, fondations privées. Plusieurs dispositifs existent pour financer les aménagements d\'accessibilité.' },
          ].map(n => (
            <div key={n.titre} className="card">
              <h3 style={{ marginBottom: 8 }}>{n.titre}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.7 }}>{n.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 24, padding: '16px', background: 'var(--bg2)', border: '1px solid var(--border)', fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font)' }}>
          ⚠ Ces informations sont à titre indicatif. À faire vérifier par un professionnel du droit avant mise en application.
        </div>
      </div>
    </>
  )
}
