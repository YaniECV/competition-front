export type HandicapSlug =
  | 'moteur'
  | 'visuel'
  | 'auditif'
  | 'autisme'
  | 'psychologique'
  | 'invisibles'

export interface HandicapSection {
  titre: string
  texte: string
}

export interface Handicap {
  slug: HandicapSlug
  nom: string
  titreDetail: string
  realite: string
  communication: string[]
  bonnesPratiquesIds: string[]
  signaletiqueSlug?: string
  sections: HandicapSection[]
}

export const handicaps: Handicap[] = [
  {
    slug: 'auditif',
    nom: 'Auditif',
    titreDetail: 'Le handicap auditif / déficience auditive',
    realite:
      'Le handicap auditif est très large. Il concerne officiellement 4 millions de personnes en France et se manifeste sous forme de faible acuité auditive, d\'acouphènes ou, plus rarement, de surdité complète. Certaines personnes pratiquent la Langue des Signes Française (LSF) — dont le vocabulaire et la syntaxe diffèrent totalement du français courant — d\'autres non. Pour s\'orienter, les personnes sourdes ou malentendantes ont besoin d\'indices visuels, de renseignements écrits et d\'un éclairage adapté.',
    communication: [
      'Parler face à la personne, visage bien éclairé',
      'Prévoir du papier et un crayon',
      'Ne pas exagérer l\'articulation',
    ],
    bonnesPratiquesIds: [
      'sous-titrage-surtitrage',
      'bim-portative',
      'gilet-vibrant',
      'alarme-visuelle',
      'communication-ecrite-accueil',
    ],
    signaletiqueSlug: 'sourds-malentendants',
    sections: [
      {
        titre: 'Leurs besoins',
        texte: 'Les personnes sourdes ou malentendantes ont besoin d\'un bon éclairage pour voir les informations écrites et lire sur les lèvres de leurs interlocuteurs. Des espaces de repos à l\'écart du bruit leur permettent de souffler. L\'information doit être prioritairement visuelle plutôt qu\'orale.',
      },
      {
        titre: 'Les solutions',
        texte: 'Un simple papier et un crayon facilitent la communication en cas d\'incompréhension. Les boucles magnétiques, connectées aux prothèses auditives, amplifient et nettoient le son. Le sous-titrage (vélotypie) et le sur-titrage des spectacles et vidéos sont essentiels, tout comme une application de retranscription à l\'accueil. Des alertes lumineuses (gyrophares), la formation des équipes à la LSF, des interprètes en Langue des Signes Française, des gilets vibrants et des spectacles « Chansignés » complètent l\'offre.',
      },
    ],
  },
  {
    slug: 'moteur',
    nom: 'Moteur',
    titreDetail: 'Le handicap moteur / déficience motrice',
    realite:
      'Les personnes atteintes de handicap moteur se regroupent en trois profils : celles qui se déplacent en fauteuil roulant, celles qui utilisent une aide à la marche (canne, béquilles ou déambulateur), et celles qui se déplacent sans aide mais manquent d\'endurance ou de force. En festival, les cheminements longs, les terrains instables et la fatigue accumulée sont les principaux obstacles à anticiper.',
    communication: [
      'Se mettre à hauteur de la personne',
      'Ne pas gêner sa déambulation',
      'S\'adresser directement à elle, pas à son accompagnateur',
    ],
    bonnesPratiquesIds: [
      'parking-pmr',
      'cheminement-accessible',
      'tapis-franchissement',
      'plateforme-pmr',
      'sanitaires-pmr',
      'recharge-fauteuils',
    ],
    signaletiqueSlug: 'pmr-mobilite-reduite',
    sections: [
      {
        titre: 'Leurs besoins',
        texte: 'Les festivaliers à mobilité réduite ont besoin de déplacements les plus courts possibles, sur des surfaces planes et non glissantes, avec un bon éclairage. Une signalétique visible — adaptée en hauteur pour les personnes en fauteuil — est essentielle, tout comme la possibilité de faire des pauses et de vivre leur expérience de façon autonome. Les personnes en fauteuil roulant ont également besoin de places offrant une bonne visibilité sur les scènes, accompagnées de leur entourage.',
      },
      {
        titre: 'Les aménagements',
        texte: 'Il s\'agit d\'informer sur l\'accessibilité des transports, de prévoir un stationnement réservé à proximité de l\'entrée ou un système de navette. Les cheminements accessibles doivent être clairement indiqués, sans marches, avec des plaques de roulage sur les terrains difficiles. Des plateformes dédiées, des pentes à moins de 5 %, des comptoirs abaissés, des cabines de toilettes adaptées, des bornes de recharge pour fauteuils électriques, des mains courantes, des points d\'étape et un recensement des hébergements accessibles complètent le dispositif.',
      },
    ],
  },
  {
    slug: 'visuel',
    nom: 'Visuel',
    titreDetail: 'Le handicap visuel / déficience visuelle',
    realite:
      'Le champ du handicap visuel est extrêmement large : il touche officiellement 1,3 million de personnes en France, dont seulement 2 à 3 % sont non-voyantes. Certaines ne distinguent pas les couleurs, d\'autres ne voient que les contrastes lumineux ou perdent la vision périphérique. Pour s\'orienter, elles comptent sur la vision réduite qui leur reste et sur des indices environnementaux comme les textures, les couleurs contrastantes, les odeurs et les sons.',
    communication: [
      'Se présenter verbalement',
      'Proposer son bras avec autorisation',
      'Ne pas interagir avec le chien guide sans permission',
      'Prévenir quand on s\'éloigne',
    ],
    bonnesPratiquesIds: [
      'balises-sonores',
      'audiodescription-lsf',
      'accueil-chiens-guides',
      'plans-tactiles',
    ],
    signaletiqueSlug: 'malvoyants-non-voyants',
    sections: [
      {
        titre: 'Leurs besoins',
        texte: 'Pour évoluer sereinement, les personnes malvoyantes ou non-voyantes ont besoin d\'un cheminement entièrement dégagé de tout obstacle. L\'accès à l\'information doit être simple et l\'orientation dans l\'espace, autonome. Un environnement sensoriel riche — textures au sol, sons, contrastes lumineux — leur permet de compenser la vision réduite.',
      },
      {
        titre: 'Les solutions',
        texte: 'Un site web respectant les normes d\'accessibilité permet une lecture par les logiciels de synthèse vocale. Sur site, les informations doivent être disponibles à l\'oral. Un cheminement dégagé, des mains courantes avec indications en braille, un guidage au sol et des bandes de vigilance préviennent les ruptures de cheminement. La signalétique doit être en gros caractères et en couleurs très contrastées. L\'audiodescription des spectacles complète l\'offre.',
      },
    ],
  },
  {
    slug: 'invisibles',
    nom: 'Déficience intellectuelle',
    titreDetail: 'La déficience intellectuelle',
    realite:
      'Les personnes atteintes de déficience intellectuelle ont un QI très inférieur à la moyenne. Officiellement 700 000 en France, elles éprouvent des difficultés à mobiliser leur attention, maîtriser le raisonnement et comprendre les informations. S\'adapter à un environnement inconnu leur demande un effort particulier. Des indices simples — symboles graphiques, couleurs claires, panneaux répétitifs — leur permettent de se retrouver.',
    communication: [
      'Ne pas présumer des capacités de la personne',
      'Accueil respectueux, sans demande de justification',
      'File prioritaire sans questionnement',
    ],
    bonnesPratiquesIds: [
      'file-prioritaire',
      'espace-repos-calme',
    ],
    signaletiqueSlug: 'accueil-prioritaire',
    sections: [
      {
        titre: 'Leurs besoins',
        texte: 'Les personnes atteintes de déficience intellectuelle ont besoin d\'accéder à des informations simples et claires. Des contacts calmes, patients et bienveillants sont essentiels pour qu\'elles se sentent à l\'aise et en confiance dans l\'environnement du festival.',
      },
      {
        titre: 'Les solutions',
        texte: 'Des programmes en français « Facile à Lire et à Comprendre » (FALC) rendent l\'information accessible à tous. Des pictogrammes clairs — bar, restaurant, toilettes, salles de spectacle, infirmerie, sortie, parking — permettent une orientation autonome. La formation du personnel d\'accueil à l\'accueil de ce public est indispensable.',
      },
    ],
  },
  {
    slug: 'psychologique',
    nom: 'Les troubles psychiques',
    titreDetail: 'Les troubles psychiques',
    realite:
      'L\'OMS estime que 20 à 25 % de la population sera touchée par un trouble psychique au cours de sa vie. Addictions, TOC, bipolarité, schizophrénie, anxiété, dépression : ces troubles se traduisent par des difficultés de relation à l\'autre et font souvent l\'objet d\'un déni. Toute situation de stress, d\'attente ou de proximité avec la foule peut être anxiogène. Les personnels d\'accueil doivent faire la différence entre l\'incivilité — acte volontaire et conscient — et la « bizarrerie », caractéristique du handicap psychique.',
    communication: [
      'Préciser le déroulement',
      'Indiquer clairement entrées, sorties et postes de secours',
      'Identifier des personnes relais',
    ],
    bonnesPratiquesIds: [
      'espace-repos-calme',
      'equipe-identifiable',
      'brigade-accompagnement',
    ],
    signaletiqueSlug: 'espace-repos-calme',
    sections: [
      {
        titre: 'L\'accueil',
        texte: 'L\'écoute et l\'accueil bienveillant sont la première des solutions. Former les équipes à distinguer incivilité et comportement lié au handicap psychique est indispensable. Des bénévoles identifiables et à l\'écoute, capables d\'orienter sans jugement, font toute la différence dans l\'expérience vécue par ces festivaliers.',
      },
      {
        titre: 'Les solutions',
        texte: 'Des espaces de repos calmes, à l\'écart de la foule et du bruit, permettent aux festivaliers de se retirer et de reprendre leurs esprits. Réduire au maximum les temps d\'attente, fluidifier les files, afficher clairement le plan du site et les sorties de secours contribuent à limiter les situations anxiogènes.',
      },
    ],
  },
  {
    slug: 'autisme',
    nom: 'Les troubles du spectre autistique',
    titreDetail: 'Les troubles du spectre autistique (TSA)',
    realite:
      'Les personnes atteintes de troubles du spectre autistique peuvent avoir des comportements inhabituels et de grandes difficultés à établir des relations sociales ou à comprendre ce qui n\'est pas parfaitement explicite. Selon la Haute Autorité de Santé, elles représentent plus de 100 000 jeunes de moins de 20 ans et 600 000 adultes en France. La surcharge sensorielle — bruit, foule, lumières changeantes — et l\'imprévisibilité sont leurs principales difficultés en festival.',
    communication: [
      'Prendre son temps',
      'Utiliser des phrases courtes et simples',
      'Donner des informations claires sur le déroulement',
      'Éviter les métaphores',
    ],
    bonnesPratiquesIds: [
      'espace-repos-calme',
      'info-accessibilite-site',
      'transparence-offre',
    ],
    signaletiqueSlug: 'espace-repos-calme',
    sections: [
      {
        titre: 'La communication',
        texte: 'Prendre son temps, utiliser des phrases courtes et simples, éviter les sous-entendus et les métaphores : ces ajustements permettent d\'établir un contact clair et rassurant. Donner des informations précises sur ce qui va se passer — ordre des événements, durées, transitions — est fondamental pour réduire l\'anxiété liée à l\'imprévisibilité.',
      },
      {
        titre: 'Les solutions',
        texte: 'Des espaces de repos calmes, à l\'écart des stimulations sonores et lumineuses, sont indispensables. Un éclairage et une ambiance sonore peu agressifs réduisent la surcharge sensorielle. Informer en amont sur le déroulement précis de la journée, les lieux et les transitions, permet aux personnes autistes de se préparer et d\'anticiper.',
      },
    ],
  },
]
