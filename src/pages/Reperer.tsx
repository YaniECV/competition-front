import { useState } from 'react'
import { Link } from 'react-router-dom'

// ── Comprendre les handicaps (tabbed) ────────────────────────────────────

const handicapTabs = [
  {
    slug: 'moteur',
    label: 'Moteur',
    header: 'Et si le terrain en herbe était votre premier mur ?',
    corps: [
      'Un festival, c\'est de la boue, des pentes, des kilomètres à pied, de la foule. Pour la plupart des festivaliers, c\'est l\'aventure. Pour une personne en fauteuil roulant, une personne qui marche avec des béquilles ou qui manque d\'endurance — c\'est souvent une série d\'obstacles invisibles aux autres.',
      'En France, 850 000 personnes utilisent un fauteuil roulant. Mais le handicap moteur ne se résume pas à ça. Il prend trois visages :',
    ],
    visages: [
      { label: 'Le fauteuil', desc: 'manuel ou électrique, il exige des surfaces planes, de l\'espace, et une recharge possible' },
      { label: 'Les aides à la marche', desc: 'canne, béquilles, déambulateur : chaque marche, chaque terrain irrégulier est une épreuve' },
      { label: 'L\'endurance réduite', desc: 'invisible, souvent ignorée : cette personne marche, mais pas longtemps, pas loin, pas debout toute une journée' },
    ],
    conclusion: 'Ce que vous faites en tant qu\'organisateur peut transformer une expérience épuisante en souvenir inoubliable. Voici comment.',
    realite: '850 000 personnes utilisent un fauteuil roulant en France. Les personnes à mobilité réduite se divisent en 3 profils : fauteuil électrique, aide à la marche (béquilles, déambulateur), ou sans aide mais avec endurance réduite. En festival metal, le terrain en herbe est souvent le premier obstacle éliminatoire.',
    communication: [
      'Mettez-vous à hauteur de la personne avant de parler',
      'Parlez à la personne, pas à son accompagnant',
      'Ne vous appuyez pas sur le fauteuil — c\'est une partie du corps',
      'Proposez votre aide sans l\'imposer : "puis-je vous aider ?"',
      'Guidez vers les espaces accessibles clairement et concrètement',
    ],
    besoins: [
      'Trajets les plus courts possible',
      'Surfaces planes, non glissantes, bien éclairées',
      'Signalétique visible depuis un fauteuil',
      'Pauses possibles tout au long du parcours',
      'Bonne visibilité depuis les zones spectateurs',
      'Autonomie totale dans l\'expérience festival',
    ],
    amenagements: [
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
    ],
    renvoiZones: ['acces', 'scene', 'services'],
  },
  {
    slug: 'visuel',
    label: 'Visuel',
    realite: '1,3 million de personnes en France ont une déficience visuelle. Seulement 2-3% sont non-voyantes — la grande majorité a une vision partielle. La foule dense, les obstacles inattendus et les faibles contrastes lumineux sont leurs principaux défis. Beaucoup s\'orientent via les textures, sons et reliefs.',
    communication: [
      'Annoncez votre présence verbalement avant tout contact physique',
      'Proposez votre coude pour guider — ne poussez jamais',
      'Décrivez l\'environnement précisément (à gauche, 3 mètres devant…)',
      'Ne laissez jamais une personne seule sans la prévenir',
      'Décrivez ce qui se passe sur scène pour les personnes non-voyantes',
    ],
    besoins: ['Absence d\'obstacles inattendus', 'Information verbale', 'Guidage clair', 'Contrastes élevés'],
    renvoiZones: ['acces'],
  },
  {
    slug: 'auditif',
    label: 'Auditif',
    realite: '4 millions de personnes malentendantes en France. La LSF (Langue des Signes Française) a une syntaxe totalement différente du français — pour les sourds de naissance, le français est souvent une seconde langue. Le bruit de fond intense des concerts aggrave leur isolement et rend la lecture labiale impossible.',
    communication: [
      'Regardez la personne en face, ne couvrez pas votre bouche',
      'Parlez clairement sans exagérer ni crier',
      'Ayez toujours papier et stylo à portée — ou utilisez votre téléphone',
      'Utilisez des pictogrammes et l\'écrit pour les informations importantes',
      'Ne recommencez pas la même phrase : reformulez différemment',
    ],
    besoins: ['Bon éclairage pour la lecture labiale', 'Espaces calmes pour les échanges', 'Information visuelle alternative'],
    renvoiZones: ['scene', 'services'],
  },
  {
    slug: 'autisme',
    label: 'Autisme',
    realite: '700 000 personnes en France vivent avec un trouble du spectre de l\'autisme. Les festivals — foule dense, bruit fort, lumières stroboscopiques, programme imprévisible — concentrent tous les facteurs de surcharge sensorielle. Les réactions peuvent sembler disproportionnées sans être comprises comme telles.',
    communication: [
      'Parlez clairement et littéralement — évitez les métaphores et l\'ironie',
      'Annoncez les changements à l\'avance, autant que possible',
      'Ne prenez pas les comportements inhabituels comme des provocations',
      'Orientez vers l\'espace calme si la personne semble en surcharge',
      'Préférez les supports écrits ou visuels aux explications orales longues',
    ],
    besoins: ['Environnement prévisible', 'Informations simples et claires', 'Espace de repli disponible'],
    renvoiZones: ['services', 'accueil'],
  },
  {
    slug: 'psy',
    label: 'Psychologique',
    realite: '20 à 25% de la population sera touchée par un trouble psychique au cours de sa vie (TOC, bipolarité, anxiété, dépression, phobies…). La majorité des personnes concernées sont indiscernables dans la foule. Stress, files d\'attente, foule dense et imprévisibilité sont des facteurs aggravants importants.',
    communication: [
      'Accueillez sans jugement ni suspicion',
      'Évitez de minimiser : "c\'est pas grave", "vous êtes trop sensible"',
      'Proposez un espace calme sans insister',
      'En cas de crise : restez à proximité, parlez calmement, appelez les secours si nécessaire',
      'La personne est experte de ses propres besoins — écoutez-la',
    ],
    besoins: ['Réduction des facteurs de stress', 'Accueil bienveillant et non intrusif', 'Espace calme disponible'],
    renvoiZones: ['services', 'accueil'],
  },
  {
    slug: 'invisible',
    label: 'Invisibles',
    realite: '80% des handicaps sont invisibles : maladies chroniques (Crohn, lupus, épilepsie…), douleurs diffuses, fatigue intense, troubles cognitifs. Ces personnes hésitent souvent à demander de l\'aide par peur du jugement — "mais vous avez l\'air bien pourtant". La Carte Tournesol leur permet de se signaler discrètement.',
    communication: [
      'Ne demandez jamais de "prouver" le handicap',
      'Accordez le bénéfice du doute pour toute demande d\'accommodement',
      'Connaissez et reconnaissez la Carte Tournesol',
      'Traitez avec la même bienveillance que les handicaps visibles',
      'Évitez les remarques sur l\'apparence ("vous n\'avez pas l\'air malade")',
    ],
    besoins: ['Être cru sans avoir à se justifier', 'Accès facilité sans s\'expliquer', 'Points d\'assise réguliers'],
    renvoiZones: ['accueil'],
  },
]

const zoneLabels: Record<string, string> = {
  acces: 'Accès',
  scene: 'Scène',
  services: 'Services',
  accueil: 'Accueil',
  hebergement: 'Hébergement',
}

export function SinformerHandicaps() {
  const [activeTab, setActiveTab] = useState(0)
  const tab = handicapTabs[activeTab]

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="tag">01 — S'informer</span>
          <h1>Comprendre les handicaps</h1>
          <p style={{ fontSize: 16, maxWidth: 540, marginTop: 16, lineHeight: 1.7 }}>
            6 profils à connaître, leurs réalités en contexte festival et les bonnes pratiques de communication.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 80 }}>
        {/* Tab bar */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: 40, overflowX: 'auto' }}>
          {handicapTabs.map((t, i) => (
            <button
              key={t.slug}
              onClick={() => setActiveTab(i)}
              style={{
                padding: '12px 20px',
                fontSize: 12,
                fontFamily: 'var(--font)',
                fontWeight: activeTab === i ? 700 : 400,
                color: activeTab === i ? 'var(--text)' : 'var(--muted)',
                background: 'none',
                border: 'none',
                borderBottom: activeTab === i ? '2px solid var(--text)' : '2px solid transparent',
                marginBottom: -1,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content — moteur (rich layout) */}
        {tab.slug === 'moteur' && 'header' in tab && (
          <div>
            {/* Header accrocheur */}
            <p style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: 20, lineHeight: 1.2, maxWidth: 600 }}>
              {(tab as typeof tab & { header: string }).header}
            </p>

            {/* Corps narratif */}
            {(tab as typeof tab & { corps: string[] }).corps.map((p, i) => (
              <p key={i} style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--muted)', marginBottom: 16, maxWidth: 680 }}>{p}</p>
            ))}

            {/* 3 visages */}
            <div style={{ border: '1px solid var(--border)', marginBottom: 20 }}>
              {(tab as typeof tab & { visages: { label: string; desc: string }[] }).visages.map((v, i, arr) => (
                <div key={v.label} style={{ display: 'flex', gap: 16, padding: '14px 20px', borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', paddingTop: 2, flexShrink: 0 }}>—</span>
                  <p style={{ fontSize: 14, margin: 0 }}>
                    <strong style={{ color: 'var(--text)', fontWeight: 700 }}>{v.label}</strong>
                    <span style={{ color: 'var(--muted)' }}> — {v.desc}</span>
                  </p>
                </div>
              ))}
            </div>

            <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--muted)', marginBottom: 40, maxWidth: 680 }}>
              {(tab as typeof tab & { conclusion: string }).conclusion}
            </p>

            {/* Besoins */}
            <h4 style={{ marginBottom: 14 }}>⚡ LEURS BESOINS EN FESTIVAL</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, border: '1px solid var(--border)', marginBottom: 40 }}>
              {tab.besoins.map((b, i) => (
                <div key={b} style={{ display: 'flex', gap: 10, padding: '12px 16px', borderRight: i % 2 === 0 ? '1px solid var(--border)' : 'none', borderBottom: i < tab.besoins.length - 2 ? '1px solid var(--border)' : 'none' }}>
                  <span style={{ color: 'var(--muted)', flexShrink: 0, fontFamily: 'var(--font-mono)', fontSize: 11 }}>—</span>
                  <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>{b}</span>
                </div>
              ))}
            </div>

            {/* Aménagements */}
            <h4 style={{ marginBottom: 14 }}>🛠️ LES AMÉNAGEMENTS ESSENTIELS</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 40 }}>
              {(tab as typeof tab & { amenagements: { icon: string; title: string; items: string[] }[] }).amenagements.map(a => (
                <div key={a.title} className="card">
                  <h4 style={{ marginBottom: 12 }}>{a.icon} {a.title}</h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {a.items.map(item => (
                      <li key={item} style={{ display: 'flex', gap: 10, fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>
                        <span style={{ flexShrink: 0, fontFamily: 'var(--font-mono)' }}>—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Communication */}
            <h4 style={{ marginBottom: 14 }}>💬 RÈGLES DE COMMUNICATION</h4>
            <div style={{ border: '1px solid var(--border)', marginBottom: 40 }}>
              {tab.communication.map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: 20, padding: '14px 20px', borderBottom: i < tab.communication.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', flexShrink: 0, paddingTop: 2 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>{c}</span>
                </div>
              ))}
            </div>

            {/* Liens zones */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {tab.renvoiZones.map(z => (
                <Link key={z} to={`/accessible/mise-en-place?zone=${z}`} style={{ fontSize: 11, fontFamily: 'var(--font-mono)', border: '1px solid var(--border)', padding: '4px 10px', color: 'var(--muted)', textDecoration: 'none' }}>
                  Zone {zoneLabels[z]} →
                </Link>
              ))}
              <Link to="/ressources/signaletiques" style={{ fontSize: 11, fontFamily: 'var(--font-mono)', border: '1px solid var(--border)', padding: '4px 10px', color: 'var(--muted)', textDecoration: 'none' }}>
                Signalétiques →
              </Link>
            </div>
          </div>
        )}

        {/* Tab content — autres handicaps (layout standard 2 colonnes) */}
        {tab.slug !== 'moteur' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start' }}>
          <div>
            <h2 style={{ marginBottom: 8 }}>Réalité en contexte festival</h2>
            <p style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 32, color: 'var(--muted)' }}>
              {tab.realite}
            </p>

            <h3 style={{ marginBottom: 12, fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Besoins clés
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 32 }}>
              {tab.besoins.map(b => (
                <li key={b} style={{ display: 'flex', gap: 10, fontSize: 13, color: 'var(--muted)' }}>
                  <span style={{ flexShrink: 0 }}>—</span><span>{b}</span>
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {tab.renvoiZones.map(z => (
                <Link
                  key={z}
                  to={`/accessible/mise-en-place?zone=${z}`}
                  style={{ fontSize: 11, fontFamily: 'var(--font)', border: '1px solid var(--border)', padding: '4px 10px', color: 'var(--muted)', textDecoration: 'none' }}
                >
                  Zone {zoneLabels[z]} →
                </Link>
              ))}
              <Link
                to="/ressources/signaletiques"
                style={{ fontSize: 11, fontFamily: 'var(--font)', border: '1px solid var(--border)', padding: '4px 10px', color: 'var(--muted)', textDecoration: 'none' }}
              >
                Signalétiques →
              </Link>
            </div>
          </div>

          <div>
            <div className="card">
              <h3 style={{ marginBottom: 16, fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Règles de communication
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {tab.communication.map((c, i) => (
                  <li key={i} style={{ display: 'flex', gap: 12, fontSize: 13, lineHeight: 1.6 }}>
                    <span style={{ flexShrink: 0, fontFamily: 'var(--font)', color: 'var(--muted)', fontSize: 11, paddingTop: 2 }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        )}

        <style>{`
          @media (max-width: 768px) {
            .handicap-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </>
  )
}

// ── Pourquoi s'engager ? ──────────────────────────────────────────────────

export function SinformerEngager() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="tag">01 — S'informer</span>
          <h1>Pourquoi s'engager ?</h1>
          <p style={{ fontSize: 16, maxWidth: 540, marginTop: 16, lineHeight: 1.7 }}>
            Les chiffres, l'impact médiatique et les financements disponibles pour passer à l'action.
          </p>
        </div>
      </div>
      <div className="container" style={{ paddingBottom: 80 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, border: '1px solid var(--border)', marginBottom: 48 }}>
          {[
            { n: '12M', l: 'Français en situation de handicap' },
            { n: '80%', l: 'Des handicaps sont invisibles' },
            { n: '4M', l: 'Personnes malentendantes' },
            { n: '1.3M', l: 'Personnes déficientes visuelles' },
            { n: '700K', l: 'Personnes avec déficience intellectuelle ou autisme' },
            { n: '1/5', l: 'Touchés par un trouble psychique au cours de la vie' },
          ].map((s, i) => (
            <div key={s.n} style={{ padding: '28px 24px', borderRight: (i + 1) % 3 !== 0 ? '1px solid var(--border)' : 'none', borderBottom: i < 3 ? '1px solid var(--border)' : 'none' }}>
              <p style={{ fontSize: 40, fontFamily: 'var(--font)', fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>{s.n}</p>
              <p style={{ fontSize: 13, lineHeight: 1.5 }}>{s.l}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 640, marginBottom: 56 }}>
          {[
            { t: 'Un public qui existe et qui dépense', d: '80% des handicaps étant invisibles, ce public achète des places, fait la route et veut vivre le concert. Il repartira ailleurs si votre festival n\'est pas accessible.' },
            { t: 'Une obligation légale depuis 2005', d: 'La loi du 11 février 2005 et l\'arrêté du 15 janvier 2007 imposent des exigences d\'accessibilité aux Installations Ouvertes au Public, dont les festivals.' },
            { t: 'Un effet d\'entraînement documenté', d: 'Un festival accessible attire aussi les familles avec poussettes, les personnes âgées, les blessés temporaires — soit 30 à 40% du public supplémentaire potentiel.' },
          ].map(c => (
            <div key={c.t} className="card" style={{ paddingLeft: 20, borderLeft: '2px solid var(--border2)' }}>
              <h3 style={{ marginBottom: 6 }}>{c.t}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--muted)' }}>{c.d}</p>
            </div>
          ))}
        </div>

        {/* Impact médiatique */}
        <div style={{ marginBottom: 56 }}>
          <span className="tag">Impact médiatique</span>
          <h2 style={{ marginBottom: 20 }}>Une image qui se démarque</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 640 }}>
            {[
              { t: 'Une couverture presse différenciante', d: 'Les festivals qui communiquent sur leur démarche d\'accessibilité obtiennent une couverture presse spécialisée (médias handicap, RSE, collectivités) en plus de la presse musicale classique.' },
              { t: 'Un argument pour vos partenaires et sponsors', d: 'L\'accessibilité est un critère de plus en plus regardé dans les appels à projets publics et par les sponsors soucieux de leur image RSE.' },
              { t: 'Une fidélisation du public', d: 'Un public qui se sent bienvenu en parle et revient — le bouche-à-oreille positif touche aussi son entourage non directement concerné par le handicap.' },
            ].map(c => (
              <div key={c.t} className="card" style={{ paddingLeft: 20, borderLeft: '2px solid var(--accent)' }}>
                <h3 style={{ marginBottom: 6 }}>{c.t}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--muted)' }}>{c.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Subventions */}
        <div>
          <span className="tag">Financements</span>
          <h2 style={{ marginBottom: 20 }}>Subventions disponibles</h2>
          <div className="grid-2">
            {[
              { n: 'DRAC', d: 'Direction Régionale des Affaires Culturelles · Financement de la mise en accessibilité des équipements et événements culturels.' },
              { n: 'CNM', d: 'Centre National de la Musique · Aides à l\'accessibilité des lieux et événements de musiques actuelles.' },
              { n: 'Collectivités locales', d: 'Région, département, commune · Subventions événementielles ciblées accessibilité et inclusion.' },
              { n: 'AGEFIPH / FIPHFP', d: 'Pour les volets emploi et bénévolat de personnes en situation de handicap sur votre événement.' },
            ].map(p => (
              <div key={p.n} className="card">
                <h3 style={{ marginBottom: 6 }}>{p.n}</h3>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>{p.d}</p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 16, fontSize: 11, color: 'var(--muted)' }}>
            Renseignez-vous auprès de votre DRAC régionale pour connaître les dispositifs actifs et les dates de dépôt.
          </p>
        </div>

        <p style={{ marginTop: 32, fontSize: 11, color: 'var(--muted)' }}>
          Sources : Guide d'accompagnement Métropole Aix-Marseille-Provence (2024), Ministère chargé des personnes handicapées, INSEE.
        </p>
      </div>
    </>
  )
}

// ── Se mettre en conformité ───────────────────────────────────────────────

export function SinformerConformite() {
  const textes = [
    {
      ref: 'Loi n° 2005-102',
      titre: 'Loi du 11 février 2005',
      desc: 'Loi pour l\'égalité des droits et des chances, la participation et la citoyenneté des personnes handicapées. Texte fondateur de l\'accessibilité en France. Définit le handicap dans toutes ses formes.',
    },
    {
      ref: 'ERP / IOP',
      titre: 'Établissements recevant du public & Installations Ouvertes au Public',
      desc: 'Les festivals en plein air sont classés comme IOP (Installations Ouvertes au Public). Les structures temporaires (chapiteaux, estrades, barnums) relèvent des ERP de 5e catégorie. Les deux catégories sont soumises à des obligations d\'accessibilité.',
    },
    {
      ref: 'Arrêté 15/01/2007',
      titre: 'Arrêté du 15 janvier 2007',
      desc: 'Fixe les exigences techniques d\'accessibilité pour les IOP. S\'applique directement aux festivals en plein air. Couvre cheminements, stationnement, accueil, sanitaires, signalétique.',
    },
    {
      ref: 'PMR 2%',
      titre: 'Obligation de places PMR (2% minimum)',
      desc: 'Au moins 2% des places de stationnement doivent être réservées aux personnes handicapées. Pour les spectacles, une proportion équivalente de places adaptées doit être disponible, dont une partie en plateforme vue sur scène.',
    },
    {
      ref: 'Sanitaires',
      titre: 'Sanitaires accessibles',
      desc: 'Au moins un bloc sanitaire accessible doit être prévu sur le site. La réglementation précise les dimensions (cabine 1,50m × 1,50m min), la hauteur des équipements et la signalétique obligatoire.',
    },
    {
      ref: 'RGAA',
      titre: 'Référentiel Général d\'Amélioration de l\'Accessibilité (RGAA)',
      desc: 'S\'applique au site web du festival si celui-ci est financé ou soutenu par une entité publique. Impose des critères d\'accessibilité numérique (contrastes, navigation au clavier, compatibilité lecteurs d\'écran).',
    },
  ]

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="tag">01 — S'informer</span>
          <h1>Se mettre en conformité</h1>
          <p style={{ fontSize: 16, maxWidth: 540, marginTop: 16, lineHeight: 1.7 }}>
            Les textes qui s\'appliquent aux festivals. Savoir ce qu\'on doit faire est le premier pas pour le faire.
          </p>
        </div>
      </div>
      <div className="container" style={{ paddingBottom: 80 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {textes.map(t => (
            <div key={t.ref} className="card" style={{ display: 'flex', gap: 24 }}>
              <div style={{ minWidth: 80, paddingTop: 2 }}>
                <span style={{ fontSize: 10, fontFamily: 'var(--font)', border: '1px solid var(--border)', padding: '3px 8px', color: 'var(--muted)', whiteSpace: 'nowrap', display: 'inline-block' }}>
                  {t.ref}
                </span>
              </div>
              <div>
                <h3 style={{ marginBottom: 8 }}>{t.titre}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--muted)' }}>{t.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24, padding: 16, background: 'var(--bg2)', border: '1px solid var(--border)', fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font)' }}>
          ⚠ Ces informations sont à titre indicatif. À faire vérifier par un professionnel du droit ou votre DRAC avant mise en application.
        </div>

        <div style={{ marginTop: 24, padding: 24, border: '1px solid var(--border)', background: '#fff' }}>
          <h3 style={{ marginBottom: 12 }}>Des questions sur vos obligations ?</h3>
          <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>
            La DRAC de votre région peut vous orienter et, dans certains cas, co-financer vos aménagements.
          </p>
          <a href="mailto:contact@fmm.fr" className="btn btn-outline" style={{ fontSize: 12 }}>
            Nous contacter pour un accompagnement →
          </a>
        </div>
      </div>
    </>
  )
}

// ── Index ─────────────────────────────────────────────────────────────────

export function SinformerIndex() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="tag">01 — S'informer</span>
          <h1>S'informer</h1>
          <p style={{ fontSize: 16, maxWidth: 540, marginTop: 16, lineHeight: 1.7 }}>
            Comprendre les handicaps, le cadre légal et pourquoi s'engager dès maintenant.
          </p>
        </div>
      </div>
      <div className="container" style={{ paddingBottom: 80 }}>
        <div className="grid-3">
          {[
            { to: '/sinformer/handicaps', label: 'Comprendre les handicaps', desc: 'Moteur · Visuel · Auditif · Autisme · Psy · Invisibles' },
            { to: '/sinformer/conformite', label: 'Se mettre en conformité', desc: 'Loi 2005 · ERP/IOP · Arrêté 2007 · PMR · RGAA' },
            { to: '/sinformer/engager', label: 'Pourquoi s\'engager ?', desc: 'Chiffres · Impact médiatique · Subventions disponibles' },
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
