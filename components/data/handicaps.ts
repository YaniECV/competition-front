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
      'Les personnes sourdes ou malentendantes doivent pouvoir suivre les annonces et échanges malgré un environnement très bruyant, et être alertées visuellement en cas d\'urgence — la communication orale classique et les alarmes sonores ne suffisent pas.',
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
        titre: 'Avant votre arrivée',
        texte: 'Placeholder — texte à remplir.',
      },
      {
        titre: 'Sur le site',
        texte: 'Placeholder — texte à remplir.',
      },
      {
        titre: 'Vivre le festival',
        texte: 'Placeholder — texte à remplir.',
      },
    ],
  },
  {
    slug: 'moteur',
    nom: 'Moteur',
    titreDetail: 'Le handicap moteur / déficience motrice',
    realite:
      'Le handicap moteur recouvre des réalités très différentes : fauteuil roulant (manuel ou électrique), aide à la marche (canne, béquilles, déambulateur), ou simplement une endurance réduite. En festival, les cheminements longs, les terrains instables (herbe, gravier, pentes) et la fatigue qui s\'accumule sur la journée sont les principaux obstacles à anticiper.',
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
        titre: 'Avant votre arrivée',
        texte: 'Placeholder — texte à remplir.',
      },
      {
        titre: 'Sur le site',
        texte: 'Placeholder — texte à remplir.',
      },
      {
        titre: 'Confort et autonomie',
        texte: 'Placeholder — texte à remplir.',
      },
    ],
  },
  {
    slug: 'visuel',
    nom: 'Visuel',
    titreDetail: 'Le handicap visuel / déficience visuelle',
    realite:
      'De la malvoyance à la cécité, les personnes concernées doivent pouvoir se repérer et se déplacer de façon autonome sur le site, et accéder aux informations essentielles (horaires, plan, consignes) sans dépendre uniquement de supports visuels.',
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
        titre: 'Avant votre arrivée',
        texte: 'Placeholder — texte à remplir.',
      },
      {
        titre: 'Sur le site',
        texte: 'Placeholder — texte à remplir.',
      },
      {
        titre: 'Avec votre chien guide',
        texte: 'Placeholder — texte à remplir.',
      },
    ],
  },
  {
    slug: 'invisibles',
    nom: 'Déficience intellectuelle',
    titreDetail: 'La déficience intellectuelle',
    realite:
      'Maladies chroniques, troubles cognitifs, fatigue invisible : ces besoins ne se voient pas et varient d\'une personne à l\'autre. Certaines personnes ont besoin d\'un accès prioritaire ou d\'aménagements sans avoir à justifier ou démontrer leur situation.',
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
        titre: 'Accès prioritaire',
        texte: 'Placeholder — texte à remplir.',
      },
      {
        titre: 'Confort & repos',
        texte: 'Placeholder — texte à remplir.',
      },
      {
        titre: 'Accompagnement discret',
        texte: 'Placeholder — texte à remplir.',
      },
    ],
  },
  {
    slug: 'psychologique',
    nom: 'Les troubles psychiques',
    titreDetail: 'Les troubles psychiques',
    realite:
      'Troubles anxieux, fatigue émotionnelle ou simple besoin de repères : la foule, l\'attente et l\'incertitude peuvent rapidement devenir difficiles à gérer. Savoir où se trouvent les sorties, les postes de secours et des personnes relais identifiables est rassurant pour ce public.',
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
        titre: 'Repères & orientation',
        texte: 'Placeholder — texte à remplir.',
      },
      {
        titre: 'Espace de décompression',
        texte: 'Placeholder — texte à remplir.',
      },
      {
        titre: 'Accompagnement',
        texte: 'Placeholder — texte à remplir.',
      },
    ],
  },
  {
    slug: 'autisme',
    nom: 'Les troubles du spectre autistique',
    titreDetail: 'Les troubles du spectre autistique (TSA)',
    realite:
      'La surcharge sensorielle — bruit, foule, lumières changeantes — et l\'imprévisibilité du déroulement sont les principales difficultés rencontrées par les personnes autistes en festival. Un cadre prévisible et des informations claires sur ce qui va se passer réduisent considérablement l\'anxiété.',
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
        titre: 'Préparez votre venue',
        texte: 'Placeholder — texte à remplir.',
      },
      {
        titre: 'Sur le site',
        texte: 'Placeholder — texte à remplir.',
      },
      {
        titre: 'Accompagnement',
        texte: 'Placeholder — texte à remplir.',
      },
    ],
  },
]
