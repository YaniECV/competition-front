import { useState } from 'react'

type Domaine = 'info-com' | 'accueil' | 'acces' | 'spectacle' | 'services' | 'inclusion'
type Effort = 'essentiel' | 'accessible' | 'investissement'
type Statut = 'obligatoire' | 'recommande'
type Handicap = 'moteur' | 'visuel' | 'auditif' | 'autisme' | 'psychologique' | 'invisible' | 'tous'

interface BonnePratique {
  id: string
  titre: string
  resume: string
  commentFaire: string[]
  domaine: Domaine
  effort: Effort
  statut: Statut
  handicaps: Handicap[]
  exemple?: { festival: string; description: string }
  ressourcesLiees?: string[]
}

const fiches: BonnePratique[] = [
  {
    id: 'referent',
    titre: 'Désigner un référent accessibilité',
    resume: 'Un point de contact clair rassure les visiteurs et coordonne l\'équipe.',
    commentFaire: [
      'Identifier une personne (nom, tél, mail, idéalement SMS pendant le festival)',
      'Diffuser ce contact sur le site et la communication de l\'évènement',
    ],
    domaine: 'info-com', effort: 'essentiel', statut: 'recommande', handicaps: ['tous'],
  },
  {
    id: 'page-accessibilite',
    titre: 'Créer une page accessibilité dédiée',
    resume: 'Centraliser l\'info évite qu\'elle se perde dans le site général.',
    commentFaire: [
      'Regrouper accès, services adaptés, tarifs, contact référent',
      'La rendre repérable dès la page d\'accueil (pictogramme)',
    ],
    domaine: 'info-com', effort: 'essentiel', statut: 'recommande', handicaps: ['tous'],
  },
  {
    id: 'transparence',
    titre: 'Être transparent sur ce qui est/n\'est pas accessible',
    resume: 'Une info honnête vaut mieux qu\'une promesse non tenue sur place.',
    commentFaire: [
      'Lister les obstacles connus et les solutions de contournement proposées',
      'Préciser les tarifs accompagnateurs et conditions d\'accès',
    ],
    domaine: 'info-com', effort: 'essentiel', statut: 'recommande', handicaps: ['tous'],
  },
  {
    id: 'supports-falc',
    titre: 'Adapter les supports (FALC, contrastes, pictogrammes)',
    resume: 'Un contenu lisible par tous profite particulièrement à certains publics.',
    commentFaire: [
      'Police standard, taille 14pt min, texte aligné à gauche, fortes couleurs contrastées',
      'Phrases courtes, vocabulaire simple, formes actives et positives',
    ],
    domaine: 'info-com', effort: 'accessible', statut: 'recommande', handicaps: ['visuel', 'autisme', 'psychologique', 'invisible'],
  },
  {
    id: 'concertation',
    titre: 'Concerter des personnes en situation de handicap en amont',
    resume: 'Les meilleurs retours viennent de ceux qui vivront l\'expérience.',
    commentFaire: [
      'Solliciter des associations locales ou des bénévoles concernés',
      'Tester les supports de communication avant diffusion',
    ],
    domaine: 'info-com', effort: 'essentiel', statut: 'recommande', handicaps: ['tous'],
  },
  {
    id: 'point-accueil',
    titre: 'Mettre en place un point d\'accueil identifiable avec file prioritaire',
    resume: 'Un point unique, bien placé, évite de longs trajets aux personnes qui en ont le plus besoin.',
    commentFaire: [
      'Positionner près de l\'entrée principale, regrouper les services essentiels',
      'Prévoir chaises et file dédiée pour les personnes à mobilité réduite',
    ],
    domaine: 'accueil', effort: 'essentiel', statut: 'recommande', handicaps: ['moteur', 'tous'],
  },
  {
    id: 'formation-benevoles',
    titre: 'Former et sensibiliser le personnel et les bénévoles',
    resume: 'Un accueil respectueux et adapté ne s\'improvise pas.',
    commentFaire: [
      'Organiser une session courte avec une association locale du handicap',
      'Donner les bases par type de handicap (ex : se mettre à hauteur d\'un fauteuil, ne pas parler au chien guide sans autorisation)',
    ],
    domaine: 'accueil', effort: 'accessible', statut: 'recommande', handicaps: ['tous'],
  },
  {
    id: 'communication-ecrite',
    titre: 'Prévoir un moyen de communication écrite à l\'accueil',
    resume: 'Papier et crayon suffisent pour échanger avec une personne sourde ou malentendante.',
    commentFaire: [
      'Mettre à disposition papier/stylo à chaque point de contact',
      'Former l\'équipe à parler face à la personne, visage éclairé, sans exagérer',
    ],
    domaine: 'accueil', effort: 'essentiel', statut: 'recommande', handicaps: ['auditif'],
  },
  {
    id: 'equipe-identifiable',
    titre: 'Rendre l\'équipe accessibilité identifiable',
    resume: 'Être facilement repéré, c\'est être facilement sollicité.',
    commentFaire: [
      'Couleur, accessoire ou pictogramme dédié sur les vêtements de l\'équipe',
    ],
    domaine: 'accueil', effort: 'accessible', statut: 'recommande', handicaps: ['tous'],
  },
  {
    id: 'parking-pmr',
    titre: 'Réserver des places de parking PMR (2% minimum)',
    resume: 'C\'est la première étape de la chaîne d\'accessibilité, et une obligation légale.',
    commentFaire: [
      'Réserver au moins 2% du stationnement, près des entrées',
      'Vérifier que le cheminement jusqu\'à l\'entrée est praticable',
    ],
    domaine: 'acces', effort: 'accessible', statut: 'obligatoire', handicaps: ['moteur'],
  },
  {
    id: 'cheminement',
    titre: 'Garantir un cheminement accessible jusqu\'à l\'entrée',
    resume: 'Sans cheminement praticable, le reste de l\'offre devient inaccessible.',
    commentFaire: [
      'Largeur minimale 1,40 m, pentes < 5%, revêtement stable et non glissant',
      'Limiter les obstacles au sol (> 2 cm de diamètre) et à hauteur de visage (< 2,2 m)',
    ],
    domaine: 'acces', effort: 'investissement', statut: 'obligatoire', handicaps: ['moteur', 'visuel'],
  },
  {
    id: 'tapis-rampes',
    titre: 'Installer tapis et rampes de franchissement',
    resume: 'Une solution légère et démontable pour franchir câbles, sable ou pelouse.',
    commentFaire: [
      'Cibler les zones stratégiques (accueil, sanitaires, tribunes dédiées)',
      'Veiller à la continuité du cheminement, sans lacune entre les modules',
    ],
    domaine: 'acces', effort: 'accessible', statut: 'recommande', handicaps: ['moteur'],
  },
  {
    id: 'navette',
    titre: 'Prévoir une navette adaptée et un dépose-minute signalé',
    resume: 'Utile surtout sur des sites éloignés ou avec horaires décalés.',
    commentFaire: [
      'Vérifier que les véhicules sont accessibles (hauteur des marches)',
      'Signaler clairement l\'espace dépose-minute près des entrées',
    ],
    domaine: 'acces', effort: 'investissement', statut: 'recommande', handicaps: ['moteur'],
  },
  {
    id: 'plateforme-pmr',
    titre: 'Aménager une plateforme PMR bien placée',
    resume: 'Permet de voir le spectacle sans être isolé du reste du public.',
    commentFaire: [
      'Orienter la largeur de la plateforme face à la scène',
      'Éviter les places isolées à un seul accompagnateur (problématique pour les groupes)',
    ],
    domaine: 'spectacle', effort: 'investissement', statut: 'recommande', handicaps: ['moteur'],
  },
  {
    id: 'sous-titrage',
    titre: 'Proposer du sous-titrage ou du surtitrage',
    resume: 'Rend les contenus parlés/chantés accessibles aux personnes sourdes ou malentendantes.',
    commentFaire: [
      'Couleur claire sur fond sombre pour le sous-titrage incrusté',
      'Pour le surtitrage, écran collectif au-dessus de la scène ou diffusion sur smartphone',
    ],
    domaine: 'spectacle', effort: 'accessible', statut: 'recommande', handicaps: ['auditif'],
    exemple: { festival: 'Rock en Seine', description: 'Gilets vibrants permettant au public sourd/malentendant de ressentir la musique — particulièrement pertinent pour un festival metal.' },
  },
  {
    id: 'bim',
    titre: 'Installer une boucle à induction magnétique (BIM) portative',
    resume: 'Améliore le confort d\'écoute pour les personnes appareillées, sur un point précis et signalé.',
    commentFaire: [
      'Installer au point d\'accueil (si micro disponible) ou près d\'une scène',
      'Signaler la zone avec le pictogramme BIM',
    ],
    domaine: 'spectacle', effort: 'accessible', statut: 'recommande', handicaps: ['auditif'],
  },
  {
    id: 'audiodesc-lsf',
    titre: 'Proposer audiodescription et/ou interprétariat LSF sur les temps forts',
    resume: 'À réserver aux moments clés (discours, temps forts), l\'interprétariat LSF étant peu répandu et coûteux.',
    commentFaire: [
      'Identifier 1-2 moments prioritaires (ouverture, annonces importantes)',
      'Faire appel à des interprètes/audiodescripteurs formés',
    ],
    domaine: 'spectacle', effort: 'investissement', statut: 'recommande', handicaps: ['visuel', 'auditif'],
    exemple: { festival: 'Eurockéennes de Belfort', description: 'Espace "All Access" mêlant public valide et en situation de handicap, projets artistiques associant culture et handicap.' },
  },
  {
    id: 'sanitaires',
    titre: 'Garantir des sanitaires adaptés',
    resume: 'Élément de base de l\'accueil, souvent négligé sur les sites temporaires.',
    commentFaire: [
      'Prévoir au moins un sanitaire PMR signalé, accessible et dégagé',
    ],
    domaine: 'services', effort: 'investissement', statut: 'obligatoire', handicaps: ['moteur'],
  },
  {
    id: 'espace-calme',
    titre: 'Aménager un espace de repos calme',
    resume: 'Une zone refuge loin du bruit/de la foule aide énormément sur un festival metal (volume élevé, affluence).',
    commentFaire: [
      'Identifier un espace à l\'écart, avec assises, signalé sur le plan',
      'Communiquer son existence avant l\'évènement',
    ],
    domaine: 'services', effort: 'essentiel', statut: 'recommande', handicaps: ['autisme', 'psychologique', 'invisible'],
  },
  {
    id: 'alarme-visuelle',
    titre: 'Prévoir une alarme visuelle d\'urgence',
    resume: 'Indispensable dans les espaces où une personne peut être seule (sanitaires, espace de repos).',
    commentFaire: [
      'Installer des dispositifs lumineux dans ces zones',
      'Inclure ces personnes dans le plan d\'évacuation et en informer la sécurité',
    ],
    domaine: 'services', effort: 'investissement', statut: 'recommande', handicaps: ['auditif'],
  },
  {
    id: 'chiens-guides',
    titre: 'Accueillir les chiens guides et d\'assistance',
    resume: 'Un point d\'eau et un espace dédié suffisent à rendre le festival praticable avec un chien guide.',
    commentFaire: [
      'Prévoir eau fraîche et zone d\'aisance accessibles',
      'Sensibiliser l\'équipe à ne pas interagir avec le chien sans autorisation',
    ],
    domaine: 'services', effort: 'essentiel', statut: 'recommande', handicaps: ['visuel'],
  },
  {
    id: 'brigade',
    titre: 'Créer une brigade d\'accompagnement bénévole',
    resume: 'Une équipe identifiable, en lien avec la sécurité, rassure et répond aux besoins en temps réel.',
    commentFaire: [
      'Recruter et briefer une petite équipe dédiée, identifiable par un signe distinctif',
    ],
    domaine: 'inclusion', effort: 'accessible', statut: 'recommande', handicaps: ['tous'],
    exemple: { festival: 'Delta Festival (Marseille)', description: 'Brigade "Safe Delta", gilets violets, maraudes tout au long de l\'évènement, lien constant avec la sécurité.' },
  },
  {
    id: 'partenariat-asso',
    titre: 'Construire un partenariat avec une association locale',
    resume: 'Mutualiser expertise et bénévoles plutôt que tout réinventer seul.',
    commentFaire: [
      'Contacter une fédération locale (ex : réseaux type Parcours Handicap)',
      'Co-construire la sensibilisation de l\'équipe et la communication',
    ],
    domaine: 'inclusion', effort: 'essentiel', statut: 'recommande', handicaps: ['tous'],
  },
  {
    id: 'artistes-handicap',
    titre: 'Impliquer des artistes ou intervenants en situation de handicap',
    resume: 'Un festival vraiment accessible permet aussi d\'être acteur, pas seulement spectateur.',
    commentFaire: [
      'Préparer l\'intervention en amont (positionnement scène, accès backstage)',
      'Contraster visuellement le bord de scène (scotch couleur, 70%, 15 cm min)',
    ],
    domaine: 'inclusion', effort: 'investissement', statut: 'recommande', handicaps: ['tous'],
    exemple: { festival: 'Musilac', description: 'Plateforme PSH labellisée "H+ Culture" — modèle pour l\'accueil renforcé des personnes en situation de handicap.' },
  },
]

const effortConfig: Record<Effort, { label: string; color: string; bg: string }> = {
  essentiel:      { label: 'Essentiel',      color: '#2ecc71', bg: 'rgba(46,204,113,0.1)' },
  accessible:     { label: 'Accessible',     color: '#3498db', bg: 'rgba(52,152,219,0.1)' },
  investissement: { label: 'Investissement', color: '#e67e22', bg: 'rgba(230,126,34,0.1)' },
}

const domaineLabels: Record<Domaine, string> = {
  'info-com': 'Info & com',
  accueil: 'Accueil',
  acces: 'Accès',
  spectacle: 'Spectacle',
  services: 'Services',
  inclusion: 'Inclusion',
}

const handicapLabels: Record<Handicap, string> = {
  moteur: 'Moteur', visuel: 'Visuel', auditif: 'Auditif',
  autisme: 'Autisme', psychologique: 'Psycho', invisible: 'Invisible', tous: 'Tous',
}

const essentiels = fiches.filter(f => f.effort === 'essentiel').slice(0, 4)

function FicheCard({ fiche }: { fiche: BonnePratique }) {
  const [open, setOpen] = useState(false)
  const effort = effortConfig[fiche.effort]

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 12 }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 2, background: effort.bg, color: effort.color }}>
            {effort.label}
          </span>
          <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 2, background: 'var(--bg3)', color: 'var(--muted)', letterSpacing: '0.05em' }}>
            {domaineLabels[fiche.domaine]}
          </span>
          {fiche.statut === 'obligatoire' && (
            <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 2, background: 'rgba(192,57,43,0.15)', color: 'var(--accent)' }}>
              Obligatoire*
            </span>
          )}
        </div>
      </div>

      <h3 style={{ marginBottom: 8, fontSize: '1rem' }}>{fiche.titre}</h3>
      <p style={{ fontSize: 14, color: 'var(--muted)', marginBottom: 16, lineHeight: 1.6 }}>{fiche.resume}</p>

      <button
        onClick={() => setOpen(!open)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent)', fontSize: 13, fontWeight: 600, textAlign: 'left', padding: 0, marginBottom: open ? 16 : 0 }}
      >
        {open ? '▲ Masquer' : '▼ Comment faire'}
      </button>

      {open && (
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {fiche.commentFaire.map((s, i) => (
              <li key={i} style={{ display: 'flex', gap: 10, fontSize: 13, color: 'var(--muted)' }}>
                <span style={{ color: 'var(--accent)', flexShrink: 0 }}>→</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
          {fiche.exemple && (
            <div style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 4, padding: '12px 16px' }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>
                Exemple — {fiche.exemple.festival}
              </p>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>{fiche.exemple.description}</p>
            </div>
          )}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', paddingTop: 4 }}>
            {fiche.handicaps.map(h => (
              <span key={h} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 2, background: 'var(--bg3)', color: 'var(--muted)', border: '1px solid var(--border)' }}>
                {handicapLabels[h]}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function BonnesPratiques() {
  const [effort, setEffort] = useState<Effort | 'tous'>('tous')
  const [domaine, setDomaine] = useState<Domaine | 'tous'>('tous')
  const [handicap, setHandicap] = useState<Handicap | 'tous'>('tous')

  const filtered = fiches.filter(f => {
    if (effort !== 'tous' && f.effort !== effort) return false
    if (domaine !== 'tous' && f.domaine !== domaine) return false
    if (handicap !== 'tous' && !f.handicaps.includes(handicap) && !f.handicaps.includes('tous')) return false
    return true
  })

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="tag">Guide pratique</span>
          <h1>Bonnes pratiques</h1>
          <p style={{ fontSize: 18, color: 'var(--muted)', maxWidth: 560, marginTop: 20 }}>
            Trouvez en quelques secondes les actions qui correspondent à vos moyens et à votre situation.
          </p>
          <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 12 }}>
            Source : Guide d'accompagnement Métropole Aix-Marseille-Provence (2024). *Les fiches "Obligatoire" se réfèrent à la loi du 11 février 2005 — à faire vérifier par un professionnel avant mise en ligne.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 80 }}>
        <section style={{ paddingTop: 0, paddingBottom: 48 }}>
          <h2 style={{ marginBottom: 8 }}>Par où commencer ?</h2>
          <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 28 }}>
            Ces 4 actions gratuites et organisationnelles ont le plus fort impact immédiat.
          </p>
          <div className="grid-2">
            {essentiels.map(f => <FicheCard key={f.id} fiche={f} />)}
          </div>
        </section>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 48 }}>
          <h2 style={{ marginBottom: 24 }}>Toutes les fiches</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 8 }}>Effort / moyens</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {(['tous', 'essentiel', 'accessible', 'investissement'] as const).map(e => (
                  <button
                    key={e}
                    onClick={() => setEffort(e)}
                    className={effort === e ? 'btn btn-primary' : 'btn btn-outline'}
                    style={{ padding: '6px 14px', fontSize: 12 }}
                  >
                    {e === 'tous' ? 'Tous' : effortConfig[e].label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 8 }}>Domaine</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {(['tous', 'info-com', 'accueil', 'acces', 'spectacle', 'services', 'inclusion'] as const).map(d => (
                  <button
                    key={d}
                    onClick={() => setDomaine(d)}
                    className={domaine === d ? 'btn btn-primary' : 'btn btn-outline'}
                    style={{ padding: '6px 14px', fontSize: 12 }}
                  >
                    {d === 'tous' ? 'Tous' : domaineLabels[d]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 8 }}>Handicap concerné</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {(['tous', 'moteur', 'visuel', 'auditif', 'autisme', 'psychologique', 'invisible'] as const).map(h => (
                  <button
                    key={h}
                    onClick={() => setHandicap(h)}
                    className={handicap === h ? 'btn btn-primary' : 'btn btn-outline'}
                    style={{ padding: '6px 14px', fontSize: 12 }}
                  >
                    {handicapLabels[h]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 20 }}>{filtered.length} fiche{filtered.length > 1 ? 's' : ''}</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filtered.map(f => <FicheCard key={f.id} fiche={f} />)}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--muted)', fontSize: 14 }}>
              Aucune fiche ne correspond à cette combinaison de filtres.
            </div>
          )}
        </div>
      </div>
    </>
  )
}
