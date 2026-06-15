export type Zone = 'acces' | 'scene' | 'services' | 'accueil' | 'hebergement'
export type Phase = 'avant' | 'pendant' | 'apres'
export type HandicapType = 'moteur' | 'visuel' | 'auditif' | 'autisme' | 'psy' | 'invisible'
export type Statut = 'essentiel' | 'recommande' | 'avance'

export interface Article {
  id: string
  titre: string
  resume: string
  commentFaire: string[]
  zone?: Zone
  statut: Statut
  handicaps: HandicapType[]
  phases: Phase[]
  exemple?: string
  debuter?: boolean
}

export const articles: Article[] = [
  // ── DÉBUTER (5 actions fondamentales, sans zone) ──────────────────────
  {
    id: 'referent-accessibilite',
    titre: 'Désigner un référent accessibilité',
    resume: 'Un point de contact clair, joignable avant, pendant et après l\'événement, diffusé sur tous les supports.',
    commentFaire: [
      'Identifier une personne disponible le jour J (bénévole ou salarié)',
      'Publier nom, téléphone, email et numéro SMS sur le site et les communications',
      'Briefer le référent sur les services disponibles et les limites du site',
      'Prévoir un remplaçant en cas d\'absence',
    ],
    statut: 'essentiel',
    handicaps: ['moteur', 'visuel', 'auditif', 'autisme', 'psy', 'invisible'],
    phases: ['avant', 'pendant'],
    debuter: true,
  },
  {
    id: 'page-accessibilite',
    titre: 'Créer une page accessibilité sur votre site',
    resume: 'Centraliser toutes les informations en un seul endroit, repérable depuis la page d\'accueil.',
    commentFaire: [
      'Lister les accès disponibles (transport, parking, cheminements)',
      'Décrire les services accessibilité (plateforme PMR, espace calme…)',
      'Indiquer les tarifs réduits ou gratuités',
      'Rendre la page accessible depuis la home en 1 clic',
    ],
    statut: 'essentiel',
    handicaps: ['moteur', 'visuel', 'auditif', 'autisme', 'psy', 'invisible'],
    phases: ['avant'],
    debuter: true,
  },
  {
    id: 'transparence-limites',
    titre: 'Être transparent sur les limites',
    resume: 'Une info honnête sur les obstacles non résolus vaut mieux qu\'une promesse non tenue.',
    commentFaire: [
      'Lister les obstacles connus (terrain en herbe, absence de boucle magnétique…)',
      'Proposer un contournement pour chaque obstacle',
      'Mettre à jour cette liste avant chaque édition',
    ],
    statut: 'essentiel',
    handicaps: ['moteur', 'visuel', 'auditif', 'autisme', 'psy', 'invisible'],
    phases: ['avant'],
    debuter: true,
  },
  {
    id: 'concertation',
    titre: 'Concerter des personnes en situation de handicap',
    resume: 'Solliciter des associations locales ou des bénévoles concernés pour tester vos supports avant l\'événement.',
    commentFaire: [
      'Contacter une association locale de personnes handicapées (APF, UNAPEI, Valentin Haüy…)',
      'Proposer une visite de repérage avant le festival',
      'Intégrer les retours dans votre plan d\'action',
      'Communiquer sur cette démarche de co-construction',
    ],
    statut: 'essentiel',
    handicaps: ['moteur', 'visuel', 'auditif', 'autisme', 'psy', 'invisible'],
    phases: ['avant'],
    debuter: true,
  },
  {
    id: 'espace-calme',
    titre: 'Aménager un espace de repos calme',
    resume: 'Une zone à l\'écart du bruit, avec assises, signalée sur le plan — particulièrement utile en festival metal.',
    commentFaire: [
      'Choisir un emplacement à l\'écart des scènes, bien signalé',
      'Prévoir des assises variées (chaises, bancs, surface)',
      'Indiquer cet espace sur le plan du festival',
      'Former les bénévoles à orienter vers cet espace',
    ],
    statut: 'essentiel',
    handicaps: ['autisme', 'psy', 'invisible'],
    phases: ['avant', 'pendant'],
    debuter: true,
  },

  // ── ZONE ACCÈS ────────────────────────────────────────────────────────
  {
    id: 'stationnement-pmr',
    titre: 'Réserver 2% du parking en PMR',
    resume: 'Obligation légale : au moins 2% des places de stationnement doivent être adaptées.',
    commentFaire: [
      'Identifier la zone de parking la plus proche de l\'entrée',
      'Matérialiser les emplacements PMR (marquage au sol + signalétique verticale)',
      'Prévoir une surveillance pour éviter les occupations illicites',
      'Communiquer l\'emplacement sur la page accessibilité',
    ],
    zone: 'acces',
    statut: 'essentiel',
    handicaps: ['moteur'],
    phases: ['avant', 'pendant'],
  },
  {
    id: 'cheminements',
    titre: 'Sécuriser les cheminements accessibles',
    resume: 'Un parcours praticable de 1,40m minimum, sans obstacle, du parking jusqu\'à tous les espaces publics.',
    commentFaire: [
      'Mesurer la largeur des passages (1,40m minimum)',
      'Identifier et résoudre les ruptures de cheminement (marches, dénivelés)',
      'Poser des plaques de roulage sur les terrains en herbe',
      'Signaler clairement les itinéraires accessibles sur le plan',
    ],
    zone: 'acces',
    statut: 'essentiel',
    handicaps: ['moteur', 'visuel'],
    phases: ['avant', 'pendant'],
  },
  {
    id: 'navette-adaptee',
    titre: 'Prévoir une navette ou dépose-minute adapté',
    resume: 'Pour les festivals avec transport organisé, garantir au moins un véhicule accessible aux fauteuils roulants.',
    commentFaire: [
      'Identifier ou louer un véhicule avec rampe d\'accès',
      'Communiquer les horaires sur la page accessibilité',
      'Signaler une zone dépose-minute au plus proche de l\'entrée',
    ],
    zone: 'acces',
    statut: 'recommande',
    handicaps: ['moteur'],
    phases: ['avant', 'pendant'],
  },

  // ── ZONE SCÈNE ────────────────────────────────────────────────────────
  {
    id: 'plateforme-pmr',
    titre: 'Plateforme PMR face à la scène',
    resume: 'Un espace stable et de plain-pied réservé aux fauteuils, offrant une vue directe sur la scène.',
    commentFaire: [
      'Définir un espace plat et stable, avec vue dégagée',
      'Prévoir la place pour les accompagnants (1 accompagnant par PSH)',
      'Sécuriser le périmètre sans isoler les spectateurs',
      'Signaler l\'espace sur le plan et à l\'accueil',
    ],
    zone: 'scene',
    statut: 'recommande',
    handicaps: ['moteur'],
    phases: ['avant', 'pendant'],
  },
  {
    id: 'boucle-magnetique',
    titre: 'Installer une boucle à induction magnétique (BIM)',
    resume: 'Dispositif qui transmet le son directement aux appareils auditifs — essentiel pour les 4M de malentendants.',
    commentFaire: [
      'Contacter un prestataire spécialisé (Accès Culture, ATH)',
      'Installer et tester la boucle avant l\'ouverture au public',
      'Signaler la zone couverte par des pictogrammes BIM',
      'Former les techniciens son à son activation',
    ],
    zone: 'scene',
    statut: 'recommande',
    handicaps: ['auditif'],
    phases: ['avant', 'pendant'],
  },
  {
    id: 'interpretation-lsf',
    titre: 'Interprétariat LSF sur les temps forts',
    resume: 'Mettre à disposition un ou des interprètes en Langue des Signes Française pour les moments clés.',
    commentFaire: [
      'Identifier les temps forts à couvrir (têtes d\'affiche, annonces officielles)',
      'Contacter une agence ou association d\'interprètes LSF (SERAC, Visuel…)',
      'Positionner l\'interprète dans le champ de vision des spectateurs sourds',
      'Communiquer la programmation LSF sur la page accessibilité',
    ],
    zone: 'scene',
    statut: 'avance',
    handicaps: ['auditif'],
    phases: ['avant', 'pendant'],
  },

  // ── ZONE SERVICES ─────────────────────────────────────────────────────
  {
    id: 'sanitaires-pmr',
    titre: 'Prévoir des sanitaires adaptés',
    resume: 'Sanitaires accessibles, signalés et répartis sur tout le site pour éviter les déplacements longs.',
    commentFaire: [
      'Louer ou vérifier la présence de toilettes accessibles (largeur 90cm min)',
      'Les répartir équitablement sur le site',
      'Signaler chaque bloc avec des pictogrammes visibles depuis un fauteuil',
      'Vérifier leur état régulièrement pendant l\'évènement',
    ],
    zone: 'services',
    statut: 'essentiel',
    handicaps: ['moteur'],
    phases: ['avant', 'pendant'],
  },
  {
    id: 'alarme-visuelle',
    titre: 'Alertes lumineuses d\'urgence',
    resume: 'En cas d\'évacuation, les personnes sourdes ou malentendantes doivent être alertées visuellement.',
    commentFaire: [
      'Installer des flashs lumineux dans les zones clés (espaces couverts, toilettes)',
      'Briefer les équipes de sécurité sur le protocole d\'alerte visuelle',
      'Intégrer ce protocole dans le plan d\'évacuation officiel',
    ],
    zone: 'services',
    statut: 'recommande',
    handicaps: ['auditif'],
    phases: ['avant'],
  },
  {
    id: 'gilets-vibrants',
    titre: 'Proposer des gilets vibrants',
    resume: 'Dispositifs portés qui transmettent les vibrations de la musique — permet au public sourd de "ressentir" le concert.',
    commentFaire: [
      'Contacter un prestataire spécialisé (SubPac, Woojer…)',
      'Mettre les gilets en prêt gratuit à l\'accueil accessibilité',
      'Former une personne à l\'explication du dispositif',
      'Communiquer cette offre sur la page accessibilité et les réseaux',
    ],
    zone: 'services',
    statut: 'avance',
    handicaps: ['auditif'],
    phases: ['avant', 'pendant'],
    exemple: 'Rock en Seine a été l\'un des premiers festivals français à proposer des gilets vibrants à grande échelle. Des dizaines de festivaliers sourds ou malentendants ont pu vivre l\'expérience musicale à part entière. La demande a dépassé les stocks dès la première année.',
  },

  // ── ZONE ACCUEIL ──────────────────────────────────────────────────────
  {
    id: 'file-prioritaire',
    titre: 'Point d\'accueil avec file prioritaire',
    resume: 'Un accueil identifiable visuellement, avec une voie dédiée évitant les longues files d\'attente.',
    commentFaire: [
      'Identifier un guichet ou une caisse dédié accessibilité',
      'Le signaler avec un pictogramme visible de loin et depuis un fauteuil',
      'Former les agents à l\'accueil bienveillant',
      'Prévoir papier et stylo à portée en cas de besoin de communication écrite',
    ],
    zone: 'accueil',
    statut: 'essentiel',
    handicaps: ['moteur', 'auditif', 'autisme', 'psy', 'invisible'],
    phases: ['pendant'],
  },
  {
    id: 'formation-benevoles',
    titre: 'Former les bénévoles à l\'accueil PSH',
    resume: 'Une session de 2h suffit pour transformer radicalement la qualité de l\'accueil des personnes en situation de handicap.',
    commentFaire: [
      'Contacter une association locale (APF France Handicap, UNAPEI, Valentin Haüy…)',
      'Organiser une session de formation avant le festival',
      'Aborder : langage adapté, gestes qui aident, gestes qui blessent',
      'Remettre une fiche mémo à chaque bénévole',
    ],
    zone: 'accueil',
    statut: 'essentiel',
    handicaps: ['moteur', 'visuel', 'auditif', 'autisme', 'psy', 'invisible'],
    phases: ['avant'],
  },
  {
    id: 'supports-falc',
    titre: 'Supports FALC et pictogrammes',
    resume: 'Facile à Lire et à Comprendre : des supports avec des phrases courtes, des mots simples et des images.',
    commentFaire: [
      'Simplifier le plan du festival (zones nommées simplement, couleurs distinctes)',
      'Créer une version FALC du programme avec pictogrammes',
      'Utiliser des pictogrammes universels sur toutes les signalétiques',
      'Faire relire les supports par une personne concernée avant impression',
    ],
    zone: 'accueil',
    statut: 'recommande',
    handicaps: ['autisme', 'visuel', 'invisible'],
    phases: ['avant', 'pendant'],
  },
  {
    id: 'brigade-accompagnement',
    titre: 'Brigade d\'accompagnement bénévole',
    resume: 'Une équipe dédiée, visible et identifiable, pour accompagner les festivaliers qui en font la demande.',
    commentFaire: [
      'Recruter des bénévoles volontaires et sensibilisés au handicap',
      'Les équiper d\'un vêtement distinctif (couleur, badge)',
      'Définir leurs missions et leurs limites d\'intervention',
      'Leur attribuer des zones fixes et un moyen d\'être appelés',
    ],
    zone: 'accueil',
    statut: 'avance',
    handicaps: ['moteur', 'visuel', 'auditif', 'autisme', 'psy', 'invisible'],
    phases: ['avant', 'pendant'],
    exemple: 'Le Delta Festival (Marseille) a créé la "Brigade Safe Delta" : des bénévoles en gilets violets en maraude permanente, en lien constant avec la sécurité. Le dispositif a été plébiscité et repris comme modèle par d\'autres festivals méditerranéens dès l\'édition suivante.',
  },

  // ── ZONE HÉBERGEMENT ──────────────────────────────────────────────────
  {
    id: 'hebergement-adapte',
    titre: 'Espace camping accessible',
    resume: 'Pour les festivals avec camping : réserver un espace plan, proche des sanitaires et des accès principaux.',
    commentFaire: [
      'Identifier un espace plan, bien drainé et proche des sanitaires PMR',
      'Le signaler dès l\'entrée du camping avec une signalétique spécifique',
      'Prévoir des chemins carrossables jusqu\'à la zone',
      'Communiquer cette offre sur la page accessibilité',
    ],
    zone: 'hebergement',
    statut: 'recommande',
    handicaps: ['moteur'],
    phases: ['avant', 'pendant'],
  },

  // ── CAS CONCRETS (articles avec exemple) ─────────────────────────────
  {
    id: 'eurockennes-all-access',
    titre: 'Espace "All Access" — Eurockéennes de Belfort',
    resume: 'Un espace mêlant public valide et en situation de handicap, avec projets artistiques co-créés.',
    commentFaire: [
      'Définir un espace mixte — ni ghetto ni isolement, ouvert à tous',
      'Proposer des activités artistiques inclusives sur le site',
      'Former une médiation dédiée à l\'animation de cet espace',
      'Valoriser la démarche dans toutes les communications du festival',
    ],
    statut: 'avance',
    handicaps: ['moteur', 'autisme', 'psy'],
    phases: ['avant', 'pendant'],
    exemple: 'Les Eurockéennes de Belfort ont créé l\'espace "All Access" : un lieu de rencontre entre public valide et en situation de handicap, avec des œuvres artistiques co-créées sur place. Un modèle d\'inclusion réelle plutôt que de ségrégation bienveillante.',
  },
  {
    id: 'musilac-label',
    titre: 'Label H+ Culture — Musilac (Aix-les-Bains)',
    resume: 'Une plateforme PSH labellisée, accessible de l\'entrée jusqu\'aux coulisses — modèle pour l\'accueil renforcé.',
    commentFaire: [
      'Candidater au label H+ Culture via votre DRAC régionale',
      'Mettre en place l\'ensemble des critères du label',
      'Faire auditer votre dispositif par un expert mandaté',
      'Valoriser le label dans les communications et billeterie',
    ],
    statut: 'avance',
    handicaps: ['moteur', 'visuel', 'auditif', 'autisme', 'psy', 'invisible'],
    phases: ['avant'],
    exemple: 'Musilac a obtenu le label H+ Culture et propose une expérience accessible de bout en bout : parking dédié, accueil prioritaire, plateforme PMR vue sur scène, backstage accessible. Un modèle complet pour les festivals de taille moyenne (30 000 entrées).',
  },

  // ── APRÈS ─────────────────────────────────────────────────────────────
  {
    id: 'bilan-accessibilite',
    titre: 'Faire un bilan accessibilité après le festival',
    resume: 'Collecter les retours, documenter ce qui a fonctionné et identifier 1 à 3 améliorations pour la prochaine édition.',
    commentFaire: [
      'Distribuer un court questionnaire à la sortie ou en ligne',
      'Organiser un débriefing avec l\'équipe accessibilité sous 1 semaine',
      'Documenter points forts et axes d\'amélioration',
      'Publier un compte-rendu — la transparence renforce la confiance',
    ],
    statut: 'essentiel',
    handicaps: ['moteur', 'visuel', 'auditif', 'autisme', 'psy', 'invisible'],
    phases: ['apres'],
  },
]
