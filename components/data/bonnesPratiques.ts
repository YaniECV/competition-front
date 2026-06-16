export type Zone = 'acces' | 'scene' | 'accueil' | 'services' | 'hebergement'
export type Statut = 'obligatoire' | 'recommande'
export type Handicap =
  | 'moteur'
  | 'visuel'
  | 'auditif'
  | 'autisme'
  | 'psychologique'
  | 'invisible'
  | 'tous'

export interface BonnePratique {
  id: string
  slug: string
  titre: string
  resume: string
  commentFaire: string[]
  zone: Zone
  statut: Statut
  handicaps: Handicap[]
  loisLiees?: string[]
}

export const bonnesPratiques: BonnePratique[] = [
  // ── Zone : Accès ──────────────────────────────────────────────────────
  {
    id: 'parking-pmr',
    slug: 'parking-pmr',
    zone: 'acces',
    statut: 'obligatoire',
    titre: 'Réserver des places de parking PMR (2% minimum)',
    resume: 'Première étape de la chaîne d\'accessibilité, c\'est une obligation légale.',
    commentFaire: [
      'Réserver au moins 2% du stationnement, proches des entrées',
      'Vérifier que le cheminement jusqu\'à l\'entrée est praticable',
      'Signaler clairement les emplacements',
    ],
    handicaps: ['moteur'],
    loisLiees: ['arrete-2007', 'loi-2005'],
  },
  {
    id: 'cheminement-accessible',
    slug: 'cheminement-accessible',
    zone: 'acces',
    statut: 'obligatoire',
    titre: 'Garantir un cheminement accessible',
    resume: 'Sans cheminement praticable, le reste de l\'offre devient inaccessible.',
    commentFaire: [
      'Largeur min 1,40m, pentes < 5%, revêtement stable et non glissant',
      'Limiter les obstacles au sol (> 2cm) et à hauteur de visage (< 2,2m)',
      'Prévoir des paliers de repos tous les 10m sur les pentes',
    ],
    handicaps: ['moteur', 'visuel'],
    loisLiees: ['arrete-2007'],
  },
  {
    id: 'tapis-franchissement',
    slug: 'tapis-franchissement',
    zone: 'acces',
    statut: 'recommande',
    titre: 'Installer tapis et rampes de franchissement',
    resume: 'Solution légère et démontable pour franchir câbles, sable ou pelouse.',
    commentFaire: [
      'Cibler les zones stratégiques : accueil, sanitaires, tribunes',
      'Assurer la continuité du cheminement, sans lacune entre les modules',
    ],
    handicaps: ['moteur'],
  },
  {
    id: 'navette-adaptee',
    slug: 'navette-adaptee',
    zone: 'acces',
    statut: 'recommande',
    titre: 'Prévoir une navette adaptée et un dépose-minute',
    resume: 'Utile surtout sur des sites éloignés ou avec horaires décalés.',
    commentFaire: [
      'Vérifier que les véhicules sont accessibles (hauteur des marches)',
      'Signaler clairement l\'espace dépose-minute près des entrées',
    ],
    handicaps: ['moteur'],
  },
  {
    id: 'balises-sonores',
    slug: 'balises-sonores',
    zone: 'acces',
    statut: 'recommande',
    titre: 'Installer des balises sonores de guidage',
    resume: 'Permet aux personnes malvoyantes de se repérer aux points clés.',
    commentFaire: [
      'Placer aux entrées principales, croisements, points d\'accueil',
      'Vérifier l\'audibilité même en ambiance sonore festival',
    ],
    handicaps: ['visuel'],
  },

  // ── Zone : Scène ──────────────────────────────────────────────────────
  {
    id: 'plateforme-pmr',
    slug: 'plateforme-pmr',
    zone: 'scene',
    statut: 'recommande',
    titre: 'Aménager une plateforme PMR bien placée',
    resume: 'Permet de voir le spectacle sans être isolé du reste du public.',
    commentFaire: [
      'Orienter la largeur de la plateforme face à la scène',
      'Éviter les places isolées à un seul accompagnateur',
      'Positionner à mi-distance pour une bonne vue et proximité du public',
    ],
    handicaps: ['moteur'],
  },
  {
    id: 'sous-titrage-surtitrage',
    slug: 'sous-titrage-surtitrage',
    zone: 'scene',
    statut: 'recommande',
    titre: 'Proposer du sous-titrage ou surtitrage',
    resume: 'Rend les contenus parlés accessibles aux personnes sourdes ou malentendantes.',
    commentFaire: [
      'Couleur claire sur fond sombre pour le sous-titrage incrusté',
      'Pour le surtitrage : écran collectif au-dessus de la scène ou smartphone',
    ],
    handicaps: ['auditif'],
  },
  {
    id: 'bim-portative',
    slug: 'bim-portative',
    zone: 'scene',
    statut: 'recommande',
    titre: 'Installer une boucle à induction magnétique (BIM) portative',
    resume: 'Améliore le confort d\'écoute pour les personnes appareillées.',
    commentFaire: [
      'Installer au point d\'accueil ou près d\'une scène',
      'Signaler la zone avec le pictogramme BIM',
    ],
    handicaps: ['auditif'],
  },
  {
    id: 'audiodescription-lsf',
    slug: 'audiodescription-lsf',
    zone: 'scene',
    statut: 'recommande',
    titre: 'Proposer audiodescription et/ou interprétariat LSF sur les temps forts',
    resume: 'À réserver aux moments clés : ouverture, discours, annonces importantes.',
    commentFaire: [
      'Identifier 1-2 moments prioritaires à couvrir',
      'Faire appel à des interprètes formés (voir page Ressources)',
    ],
    handicaps: ['visuel', 'auditif'],
  },
  {
    id: 'gilet-vibrant',
    slug: 'gilet-vibrant',
    zone: 'scene',
    statut: 'recommande',
    titre: 'Proposer des gilets ou colonnes vibrants',
    resume: 'Permet de ressentir la musique pour les personnes sourdes ou malentendantes — particulièrement pertinent pour un festival metal.',
    commentFaire: [
      'Positionner les colonnes vibrantes près de la scène principale',
      'Proposer des gilets vibrants en prêt à l\'accueil',
    ],
    handicaps: ['auditif'],
  },
  {
    id: 'acces-scene-artistes',
    slug: 'acces-scene-artistes',
    zone: 'scene',
    statut: 'recommande',
    titre: 'Prévoir l\'accès scène pour les artistes en situation de handicap',
    resume: 'Un festival accessible permet aussi d\'être acteur, pas seulement spectateur.',
    commentFaire: [
      'Contraster visuellement le bord de scène (scotch couleur, 70%, 15cm min)',
      'Préparer un cheminement dédié depuis les loges',
      'Informer l\'équipe technique en amont',
    ],
    handicaps: ['moteur', 'visuel'],
  },

  // ── Zone : Services & confort ─────────────────────────────────────────
  {
    id: 'sanitaires-pmr',
    slug: 'sanitaires-pmr',
    zone: 'services',
    statut: 'obligatoire',
    titre: 'Garantir des sanitaires adaptés PMR',
    resume: 'Élément de base de l\'accueil ERP/IOP, souvent négligé sur les sites temporaires.',
    commentFaire: [
      'Prévoir au moins un sanitaire PMR signalé et accessible',
      'Vérifier le dégagement nécessaire devant la porte (1,50m)',
    ],
    handicaps: ['moteur'],
    loisLiees: ['erp-iop'],
  },
  {
    id: 'espace-repos-calme',
    slug: 'espace-repos-calme',
    zone: 'services',
    statut: 'recommande',
    titre: 'Aménager un espace de repos calme / zone refuge',
    resume: 'Indispensable sur un festival metal (volume sonore élevé, affluence) pour les profils sensoriels.',
    commentFaire: [
      'Identifier un espace à l\'écart, avec assises, signalé sur le plan',
      'Communiquer son existence avant l\'évènement sur la page accessibilité',
    ],
    handicaps: ['autisme', 'psychologique', 'invisible'],
  },
  {
    id: 'alarme-visuelle',
    slug: 'alarme-visuelle',
    zone: 'services',
    statut: 'recommande',
    titre: 'Installer une alarme visuelle d\'urgence',
    resume: 'Indispensable dans les espaces où une personne peut être seule (sanitaires, espace de repos).',
    commentFaire: [
      'Installer des dispositifs lumineux dans ces zones',
      'Inclure ces personnes dans le plan d\'évacuation',
      'Informer la sécurité',
    ],
    handicaps: ['auditif'],
  },
  {
    id: 'accueil-chiens-guides',
    slug: 'accueil-chiens-guides',
    zone: 'services',
    statut: 'recommande',
    titre: 'Accueillir les chiens guides et d\'assistance',
    resume: 'Un point d\'eau et un espace dédié suffisent à rendre le festival praticable.',
    commentFaire: [
      'Prévoir eau fraîche et zone d\'aisance accessibles',
      'Sensibiliser l\'équipe : ne pas interagir avec le chien sans autorisation',
    ],
    handicaps: ['visuel'],
  },
  {
    id: 'recharge-fauteuils',
    slug: 'recharge-fauteuils',
    zone: 'services',
    statut: 'recommande',
    titre: 'Proposer la recharge de fauteuils roulants électriques',
    resume: 'Permet aux utilisateurs de fauteuils électriques de profiter du festival sereinement.',
    commentFaire: [
      'Identifier un point de recharge sécurisé et signalé',
      'Prévoir un kit de réparation d\'urgence',
    ],
    handicaps: ['moteur'],
  },

  // ── Zone : Accueil ────────────────────────────────────────────────────
  {
    id: 'point-accueil-file',
    slug: 'point-accueil-file',
    zone: 'accueil',
    statut: 'recommande',
    titre: 'Mettre en place un point d\'accueil identifiable avec file prioritaire',
    resume: 'Un point unique bien placé évite de longs trajets aux personnes qui en ont le plus besoin.',
    commentFaire: [
      'Positionner près de l\'entrée principale',
      'Prévoir chaises et file dédiée PMR',
      'Regrouper les services essentiels',
    ],
    handicaps: ['moteur', 'tous'],
  },
  {
    id: 'formation-benevoles',
    slug: 'formation-benevoles',
    zone: 'accueil',
    statut: 'recommande',
    titre: 'Former et sensibiliser le personnel et les bénévoles',
    resume: 'Un accueil respectueux et adapté ne s\'improvise pas.',
    commentFaire: [
      'Session courte avec une association locale du handicap',
      'Bases par type de handicap (ex : se mettre à hauteur d\'un fauteuil)',
      'Ne pas parler au chien guide sans autorisation',
    ],
    handicaps: ['tous'],
  },
  {
    id: 'communication-ecrite-accueil',
    slug: 'communication-ecrite-accueil',
    zone: 'accueil',
    statut: 'recommande',
    titre: 'Mettre à disposition un moyen de communication écrite',
    resume: 'Papier et crayon suffisent pour échanger avec une personne sourde ou malentendante.',
    commentFaire: [
      'Papier/stylo à chaque point de contact',
      'Former l\'équipe à parler face à la personne, visage éclairé',
    ],
    handicaps: ['auditif'],
  },
  {
    id: 'equipe-identifiable',
    slug: 'equipe-identifiable',
    zone: 'accueil',
    statut: 'recommande',
    titre: 'Rendre l\'équipe accessibilité identifiable',
    resume: 'Être facilement repéré, c\'est être facilement sollicité.',
    commentFaire: [
      'Couleur, accessoire ou badge dédié sur les vêtements',
      'Former tous les membres identifiables aux bases de l\'accueil',
    ],
    handicaps: ['tous'],
  },
  {
    id: 'brigade-accompagnement',
    slug: 'brigade-accompagnement',
    zone: 'accueil',
    statut: 'recommande',
    titre: 'Créer une brigade d\'accompagnement bénévole',
    resume: 'Une équipe identifiable, en lien avec la sécurité, rassure et répond aux besoins en temps réel.',
    commentFaire: [
      'Recruter et briefer une petite équipe dédiée',
      'Lien constant avec la sécurité',
      'Maraudes régulières sur le site',
    ],
    handicaps: ['tous'],
  },
  {
    id: 'plans-tactiles',
    slug: 'plans-tactiles',
    zone: 'accueil',
    statut: 'recommande',
    titre: 'Proposer des plans tactiles et une signalétique adaptée sur site',
    resume: 'Permet l\'orientation autonome des personnes malvoyantes.',
    commentFaire: [
      'Plan en relief disponible à l\'accueil',
      'Signalétique avec grands caractères et forts contrastes sur tout le site',
    ],
    handicaps: ['visuel'],
  },
  {
    id: 'info-accessibilite-site',
    slug: 'info-accessibilite-site',
    zone: 'accueil',
    statut: 'recommande',
    titre: 'Publier les informations d\'accessibilité avant l\'évènement',
    resume: 'Permet aux festivaliers de se préparer et de réduire leur anxiété en amont.',
    commentFaire: [
      'Publier une page accessibilité dédiée sur le site web du festival',
      'Détailler les aménagements disponibles, le plan du site et les horaires',
      'Mettre à jour ces informations à chaque édition',
    ],
    handicaps: ['autisme', 'psychologique'],
  },
  {
    id: 'transparence-offre',
    slug: 'transparence-offre',
    zone: 'accueil',
    statut: 'recommande',
    titre: 'Être transparent sur les limites de votre offre accessibilité',
    resume: 'Une information honnête sur ce qui n\'est pas encore accessible vaut mieux qu\'une promesse non tenue.',
    commentFaire: [
      'Lister les obstacles connus et non résolus',
      'Proposer une alternative ou un contournement quand c\'est possible',
      'Mettre à jour cette liste à chaque édition',
    ],
    handicaps: ['tous'],
  },

  // ── Zone : Hébergement ────────────────────────────────────────────────
  {
    id: 'camping-adapte',
    slug: 'camping-adapte',
    zone: 'hebergement',
    statut: 'recommande',
    titre: 'Prévoir des emplacements de camping adaptés',
    resume: 'Permettre aux festivaliers en situation de handicap de dormir sur site.',
    commentFaire: [
      'Emplacements plats et accessibles, proches des sanitaires adaptés',
      'Navette dédiée hébergement ↔ site principal',
    ],
    handicaps: ['moteur'],
  },
]

export function getBonnePratique(slug: string): BonnePratique | undefined {
  return bonnesPratiques.find((bp) => bp.slug === slug)
}
