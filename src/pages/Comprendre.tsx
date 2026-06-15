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

export function ComprendreHandicaps() {
  const items = [
    {
      slug: 'moteur', label: 'Moteur',
      intro: 'Les personnes atteintes de handicap moteur peuvent être regroupées en 3 catégories : fauteuil roulant, aide à la marche, ou sans aide mais avec manque d\'endurance.',
      besoins: ['Déplacements courts', 'Surfaces planes et non glissantes', 'Bon éclairage', 'Signalétique visible depuis un fauteuil', 'Possibilité de pauses', 'Autonomie'],
      solutions: ['Stationnement PMR (2% min)', 'Cheminements sans marches', 'Plaques de roulage', 'Plateformes dédiées fauteuils', 'Pentes < 5%', 'Comptoirs abaissés', 'Sanitaires adaptés', 'Bornes recharge fauteuils électriques'],
    },
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
        {items.map((h, i) => (
          <div key={h.slug} id={h.slug} style={{ marginBottom: 48, paddingBottom: 48, borderBottom: i < items.length - 1 ? '1px solid var(--border)' : 'none' }}>
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
