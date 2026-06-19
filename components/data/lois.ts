export interface Loi {
  slug: string
  titre: string
  contenu: string
  source: string
  handicaps: string[]
  url?: string
}

export const lois: Loi[] = [
  {
    slug: 'loi-2005',
    titre: 'Loi du 11 février 2005',
    contenu:
      'Loi pour l\'égalité des droits et des chances, la participation et la citoyenneté des personnes handicapées. C\'est le texte fondateur de l\'accessibilité en France : il définit le handicap dans toutes ses formes (moteur, sensoriel, cognitif, psychique) et impose une obligation générale d\'accessibilité aux établissements et installations recevant du public.',
    source: 'Légifrance — Loi n° 2005-102 du 11 février 2005',
    url: 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000809647',
    handicaps: ['moteur', 'visuel', 'auditif', 'autisme', 'psychologique', 'invisible'],
  },
  {
    slug: 'erp-iop',
    titre: 'ERP / IOP — application aux évènements temporaires extérieurs',
    contenu:
      'Les festivals en plein air sont classés comme Installations Ouvertes au Public (IOP). Les structures temporaires installées pour l\'occasion (chapiteaux, estrades, barnums) relèvent quant à elles des Établissements Recevant du Public (ERP) de 5e catégorie. Ces deux catégories sont soumises à des obligations d\'accessibilité, y compris pour un évènement temporaire en extérieur.',
    source: 'Code de la construction et de l\'habitation',
    url: 'https://www.legifrance.gouv.fr/codes/id/LEGITEXT000006074096/',
    handicaps: ['moteur', 'visuel', 'auditif', 'autisme', 'psychologique', 'invisible'],
  },
  {
    slug: 'arrete-2007',
    titre: 'Arrêté du 15 janvier 2007',
    contenu:
      'Fixe les exigences techniques d\'accessibilité pour les IOP, et s\'applique donc directement aux festivals en plein air. Il impose notamment un cheminement praticable d\'une largeur minimale de 1,40m, des pentes inférieures à 5%, un revêtement stable et non glissant, ainsi que des paliers de repos tous les 10 mètres sur les pentes.',
    source: 'Arrêté du 15 janvier 2007 — exigences d\'accessibilité des IOP',
    url: 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000822502',
    handicaps: ['moteur'],
  },
  {
    slug: 'parking-obligation',
    titre: 'Stationnement PMR (2% minimum)',
    contenu:
      'Au moins 2% des places de stationnement doivent être réservées aux personnes handicapées, positionnées au plus près des entrées accessibles. Cette obligation s\'applique dès qu\'un parking est mis à disposition du public, y compris à titre temporaire pour un évènement.',
    source: 'Arrêté du 15 janvier 2007',
    url: 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000822502',
    handicaps: ['moteur'],
  },
  {
    slug: 'sanitaires-obligation',
    titre: 'Sanitaires adaptés PMR',
    contenu:
      'Au moins un bloc sanitaire accessible doit être prévu sur le site, avec une cabine d\'au moins 1,50m × 1,50m, des équipements à hauteur adaptée et une signalétique clairement identifiable depuis un fauteuil roulant.',
    source: 'Arrêté du 15 janvier 2007',
    url: 'https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000822502',
    handicaps: ['moteur'],
  },
  {
    slug: 'bande-vigilance',
    titre: 'Bande d\'éveil de vigilance',
    contenu:
      'Une bande podotactile doit être installée en haut de tout escalier ou rupture de niveau accessible au public, afin d\'alerter les personnes malvoyantes ou non-voyantes avant la zone de danger. À prévoir sur toute structure temporaire avec gradins, estrades ou passerelles.',
    source: 'Norme NF P98-351',
    url: 'https://www.legifrance.gouv.fr/',
    handicaps: ['visuel'],
  },
  {
    slug: 'rgaa',
    titre: 'RGAA — accessibilité numérique du site web du festival',
    contenu:
      'S\'applique au site web du festival, distinctement des obligations d\'accessibilité physique du site de l\'évènement. Il impose des critères d\'accessibilité numérique : contrastes suffisants, navigation au clavier, compatibilité avec les lecteurs d\'écran. Concerne en priorité les organismes publics ou financés par des fonds publics.',
    source: 'RGAA version 4.1 — DINUM',
    url: 'https://accessibilite.numerique.gouv.fr/',
    handicaps: ['visuel', 'auditif', 'autisme'],
  },
]
