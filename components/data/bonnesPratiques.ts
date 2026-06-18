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
      'Réserver au moins 2 % du stationnement total aux véhicules PMR, situées sur le sol le plus stable possible, au plus près de l\'entrée du festival (moins de 200 mètres)',
      'S\'assurer que chaque place mesure au moins 3,30 mètres de large pour permettre l\'ouverture totale des portières et la descente d\'un fauteuil roulant',
      'Mettre en place une file d\'attente dédiée (Fast Track / Accès PSH) à la billetterie et aux contrôles de sécurité pour éviter les longues stations debout immobiles',
      'Prévoir une zone de camping PMR proche des sanitaires adaptés et de l\'entrée du site, avec des allées de circulation dégagées',
      'Signaler clairement les emplacements réservés avec la signalétique internationale PMR',
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
      'Repérer, signaler ou supprimer tout élément suspendu à hauteur de visage inférieur à 2,20 mètres (bords de barnums, cordages de tentes, fixations de structures) pour éviter les blessures du public malvoyant',
      'Utiliser des repères tactiles ou visuels fortement contrastés pour matérialiser les éléments incontournables au sol, comme les protège-câbles',
      'Maintenir un éclairage homogène et sans éblouissement sur les zones clés (sanitaires, bars, billetterie, marches), surtout une fois la nuit tombée',
      'Garantir un sol roulant, plan et stabilisé ; sur l\'herbe ou la terre, prévoir des plaques de roulage temporaires en cas de pluie ou de boue',
      'Maintenir des couloirs de circulation d\'une largeur minimale de 1,40 mètre pour permettre le croisement de deux fauteuils',
      'Veiller à ce que les pentes ne dépassent pas 5 % et installer des rampes d\'accès amovibles sécurisées pour franchir chaque marche ou trottoir',
      'À l\'entrée des espaces sombres (concert sous chapiteau en plein après-midi), prévoir une transition lumineuse progressive pour éviter la désorientation visuelle',
    ],
    handicaps: ['moteur', 'visuel'],
    loisLiees: ['arrete-2007', 'loi-2005'],
  },
  {
    id: 'tapis-franchissement',
    slug: 'tapis-franchissement',
    zone: 'acces',
    statut: 'recommande',
    titre: 'Installer tapis et rampes de franchissement',
    resume: 'Solution légère et démontable pour franchir câbles, sable ou pelouse.',
    commentFaire: [
      'Utiliser des passe-câbles biseautés et fixés au sol, spécialement conçus pour le franchissement des fauteuils roulants (pente douce et antidérapante)',
      'Cibler les zones stratégiques : accueil, sanitaires, scènes, zones de restauration et espaces de repos',
      'Assurer la continuité du cheminement sans lacune entre les modules pour éviter toute rupture de parcours',
      'Vérifier la stabilité des tapis sur terrain meuble ou humide et les fixer si nécessaire',
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
      'Vérifier que les véhicules sont accessibles (rampe ou élévateur, hauteur des marches, espace pour fauteuil)',
      'Signaler clairement l\'espace dépose-minute près des entrées avec une signalétique visible',
      'Communiquer les horaires et l\'emplacement de la navette sur la page accessibilité du festival',
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
      'Placer des balises aux entrées principales, croisements, points d\'accueil et sanitaires',
      'Vérifier l\'audibilité des balises même en ambiance sonore festival (volume adapté)',
      'Associer les balises à une signalétique en grands caractères et en braille aux points clés',
    ],
    handicaps: ['visuel'],
  },
  {
    id: 'file-prioritaire',
    slug: 'file-prioritaire',
    zone: 'acces',
    statut: 'recommande',
    titre: 'Mettre en place une file d\'attente prioritaire (Fast Track)',
    resume: 'Évite les longues stations debout immobiles, facteur majeur de crise pour de nombreux handicaps.',
    commentFaire: [
      'Ouvrir l\'accès à la file prioritaire (Fast Track) aux porteurs de cartes prioritaires, même si leur handicap ne se voit pas',
      'Accorder un accès sans attente prolongée aux personnes autistes, l\'immobilité prolongée en foule dense étant un facteur majeur de crise (Meltdown)',
      'Appliquer ce dispositif à toutes les files d\'attente : billetterie, contrôles de sécurité, bars, foodtrucks et merchandising',
      'Former les équipes à ne pas questionner ou remettre en cause le besoin prioritaire d\'une personne présentant sa carte',
    ],
    handicaps: ['invisible', 'psychologique', 'autisme', 'moteur'],
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
      'Construire des plateformes d\'observation surélevées avec une rampe d\'accès réglementaire, offrant une vue dégagée sur la scène au-dessus de la foule debout',
      'Dimensionner la plateforme selon la jauge du festival et autoriser la présence d\'un accompagnant par personne pour ne pas isoler les festivaliers',
      'Installer des chaises sur ces plateformes ou à proximité immédiate pour les personnes ayant une station debout pénible (béquilles, fatigabilité chronique)',
      'Orienter la largeur de la plateforme face à la scène, à mi-distance pour une bonne visibilité et une proximité avec le public',
      'Autoriser l\'accès aux assises de la plateforme aux personnes avec carte "station debout pénible", même si elles y ont accédé à pied',
    ],
    handicaps: ['moteur', 'invisible'],
  },
  {
    id: 'sous-titrage-surtitrage',
    slug: 'sous-titrage-surtitrage',
    zone: 'scene',
    statut: 'recommande',
    titre: 'Proposer du sous-titrage ou surtitrage',
    resume: 'Rend les contenus parlés accessibles aux personnes sourdes ou malentendantes.',
    commentFaire: [
      'Mettre en place un système de vélotypie ou de sous-titrage en temps réel projeté sur un écran secondaire pour les concerts à texte et les interventions parlées',
      'Utiliser une couleur claire sur fond sombre pour le sous-titrage incrusté, avec un écran collectif bien positionné pour le surtitrage',
      'Programmer des professionnels du chansigne sur scène (traduction des paroles en LSF avec dimension corporelle et artistique) et assurer leur éclairage dédié',
      'Utiliser les écrans géants des scènes ou des panneaux LED pour diffuser les annonces de sécurité et changements d\'horaires importants par écrit, pas uniquement au micro',
    ],
    handicaps: ['auditif'],
  },
  {
    id: 'bim-portative',
    slug: 'bim-portative',
    zone: 'scene',
    statut: 'recommande',
    titre: 'Installer une boucle à induction magnétique (BIM)',
    resume: 'Améliore le confort d\'écoute pour les personnes appareillées.',
    commentFaire: [
      'Installer des boucles magnétiques à proximité des régies ou des plateformes pour transmettre le flux audio directement dans les appareils auditifs des festivaliers (position T)',
      'Signaler la zone BIM avec le pictogramme international (oreille avec la lettre T) et informer le public de ce dispositif via la page accessibilité',
      'Vérifier la qualité du signal et l\'absence d\'interférences avec les autres équipements électriques du festival',
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
      'Identifier 1 à 2 moments prioritaires à couvrir en LSF (ouverture, discours officiels, annonces importantes)',
      'Faire appel à des interprètes LSF formés et assurer leur éclairage dédié sur scène pour qu\'ils soient bien visibles',
      'Réserver des places de choix face à la scène (ou sur plateforme) pour les personnes sourdes, afin qu\'elles voient parfaitement le chansigneur ou puissent lire sur les lèvres',
      'Pour l\'audiodescription, choisir les spectacles à forte dimension narrative et diffuser via oreillette ou application dédiée',
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
      'Mettre à disposition en prêt au point PSH des gilets vibrants (type Subpac) connectés à la console son pour ressentir les basses et le rythme par vibrations corporelles',
      'Positionner des colonnes vibrantes au sol près de la scène principale pour amplifier les fréquences basses',
      'Aménager une zone bien positionnée par rapport aux caissons de basses, sans pour autant mettre en danger le système auditif des participants',
      'Informer les festivaliers sourds de l\'existence de ce dispositif en amont via la page accessibilité du festival',
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
      'Contraster visuellement le bord de scène avec un scotch de couleur haute visibilité (70 % de contraste, 15 cm minimum)',
      'Préparer un cheminement dédié et accessible depuis les loges jusqu\'à la scène',
      'Informer l\'équipe technique en amont des besoins spécifiques de chaque artiste concerné',
    ],
    handicaps: ['moteur', 'visuel'],
  },
  {
    id: 'signaletique-visuelle-auditif',
    slug: 'signaletique-visuelle-auditif',
    zone: 'scene',
    statut: 'recommande',
    titre: 'Déployer une signalétique visuelle et des supports écrits au comptoir',
    resume: 'Remplacer l\'information sonore par des repères visuels clairs partout sur le site.',
    commentFaire: [
      'Disposer des cartes de bar, menus des foodtrucks et tarifs du merchandising imprimés et très visibles au comptoir, pour éviter toute communication orale complexe dans le bruit',
      'Identifier clairement les espaces stratégiques avec la signalétique internationale (pictogramme de l\'oreille barrée pour indiquer la présence d\'une boucle magnétique)',
      'Diffuser les annonces de sécurité et les changements d\'horaires importants par écrit sur les écrans ou panneaux LED, pas uniquement au micro',
      'Maintenir un éclairage suffisant aux comptoirs et points de vente pour faciliter la lecture labiale',
    ],
    handicaps: ['auditif'],
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
      'Prévoir au moins une cabine PMR avec porte s\'ouvrant vers l\'extérieur, espace de demi-tour intérieur de 1,50 mètre de diamètre, barre d\'appui latérale et lavabo suspendu',
      'Vérifier le dégagement de 1,50 mètre devant la porte et la praticabilité du cheminement menant aux sanitaires',
      'Autoriser l\'accès aux toilettes adaptées aux personnes ayant des pathologies invisibles (MICI, Crohn, endométriose) sans exiger la présence d\'un fauteuil roulant',
      'Mettre à disposition un espace réfrigéré sécurisé (au poste de secours ou à l\'accueil) pour conserver les médicaments thermosensibles (insuline, traitements lourds)',
      'Briefer la sécurité pour autoriser l\'entrée de collations ou boissons spécifiques indispensables à certaines pathologies (resucrage pour diabétiques, régimes stricts)',
    ],
    handicaps: ['moteur', 'invisible'],
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
      'Aménager une zone de repos isolée phoniquement et visuellement de la foule et des scènes (Quiet Zone), avec lumière tamisée et mobilier confortable (poufs, canapés)',
      'Distinguer clairement cet espace du poste de secours médical, souvent perçu comme anxiogène ou stigmatisant',
      'Mettre à disposition en prêt des casques antibruit, bouchons d\'oreilles et objets anti-stress (fidgets, lunettes de soleil) au point PSH ou dans l\'espace chill',
      'Limiter l\'usage d\'effets lumineux agressifs ou de stroboscopes en dehors des scènes, notamment dans les zones de repos et de restauration',
      'Disposer des bancs ou chaises tout au long des axes principaux de circulation, pas seulement dans la zone chill excentrée',
      'Communiquer l\'existence et l\'emplacement de cet espace avant l\'événement sur la page accessibilité du festival',
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
      'Installer des dispositifs d\'alerte lumineux (gyrophares, flashs) dans les sanitaires et espaces de repos pour les personnes sourdes ou malentendantes',
      'Inclure les personnes malentendantes dans le plan d\'évacuation et les exercices de sécurité',
      'Informer les équipes de sécurité de l\'emplacement de ces dispositifs et du protocole d\'évacuation adapté',
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
      'Autoriser et faciliter l\'accès des chiens-guides sur l\'ensemble du site (y compris la zone concert et le camping) et prévoir obligatoirement un point d\'eau dédié',
      'Prévoir une zone d\'aisance dédiée, discrète et accessible, à l\'écart des zones de foule',
      'Sensibiliser l\'équipe : ne pas interagir avec le chien sans autorisation de son maître, ne pas l\'appeler, le nourrir ou le distraire',
      'Briefer les bénévoles pour qu\'ils sachent proposer un guidage physique si le festivalier en fait la demande, notamment vers les plateformes PMR ou les sanitaires',
    ],
    handicaps: ['visuel'],
  },
  {
    id: 'recharge-fauteuils',
    slug: 'recharge-fauteuils',
    zone: 'services',
    statut: 'recommande',
    titre: 'Proposer la recharge de fauteuils et dispositifs médicaux',
    resume: 'Permet aux utilisateurs de fauteuils électriques et aux personnes avec dispositifs médicaux de profiter du festival sereinement.',
    commentFaire: [
      'Identifier un point de recharge sécurisé et signalé, accessible au point info ou au camping',
      'Permettre l\'accès à des prises électriques pour recharger les dispositifs médicaux indispensables : pompes à insuline, fauteuils électriques, batteries d\'appareils',
      'Prévoir un kit de réparation d\'urgence pour les fauteuils roulants',
      'Informer les festivaliers de ce service via la page accessibilité et le point d\'accueil PSH',
    ],
    handicaps: ['moteur', 'invisible'],
  },
  {
    id: 'signalisation-handicap-invisible',
    slug: 'signalisation-handicap-invisible',
    zone: 'services',
    statut: 'recommande',
    titre: 'Faciliter la signalisation discrète du handicap invisible',
    resume: 'Des outils d\'identification volontaires pour éviter d\'avoir à s\'expliquer de manière répétée.',
    commentFaire: [
      'Reconnaître officiellement le cordon "Hidden Disabilities Sunflower" (tournesol) permettant au personnel d\'identifier discrètement qu\'un festivalier a besoin de bienveillance ou de temps supplémentaire',
      'Mettre en ligne sur le site du festival la liste des justificatifs (Carte Mobilité Inclusion "Priorité", certificat médical) ouvrant droit aux dispositifs PSH, pour rassurer les usagers avant leur venue',
      'Indiquer sur le plan digital les distances exactes à pied entre parkings et scènes, ainsi que la nature du sol, pour permettre l\'auto-évaluation de l\'effort',
      'Former les équipes de contrôle à reconnaître le cordon tournesol et à adapter leur accueil en conséquence',
    ],
    handicaps: ['invisible'],
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
      'Positionner le point d\'accueil PSH près de l\'entrée principale, avec chaises et file dédiée',
      'Regrouper les services essentiels (billetterie, plan du site, informations accessibilité, prêt de matériel) en un point unique',
      'Ouvrir l\'accès aux files prioritaires aux porteurs de cartes prioritaires, même si leur handicap ne se voit pas',
      'S\'assurer que le personnel du point d\'accueil est identifiable et formé aux bases de l\'accueil adapté',
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
      'Sensibiliser les équipes de sécurité à ne pas interpréter un évitement du regard, des mouvements répétitifs (stimming) ou une absence de réponse comme de l\'hostilité ou de l\'ivresse',
      'Former les bénévoles à donner une seule consigne courte à la fois lors des contrôles (ex : "Donnez votre billet", puis "Ouvrez votre sac") plutôt qu\'une suite d\'ordres rapides',
      'Briefer les agents à expliquer calmement chaque étape de la palpation avant de la réaliser pour ne pas déclencher de réaction de panique liée à un trauma ou une phobie du contact',
      'Former activement le personnel de contrôle à ne jamais prononcer de phrases stigmatisantes face à une personne présentant sa carte prioritaire (type "vous n\'avez rien, vous pouvez marcher")',
      'Sensibiliser les équipes aux malaises silencieux par épuisement (cardiaques, neurologiques, hypoglycémies) pouvant survenir sans signes visibles dans une foule',
    ],
    handicaps: ['tous'],
  },
  {
    id: 'communication-ecrite-accueil',
    slug: 'communication-ecrite-accueil',
    zone: 'accueil',
    statut: 'recommande',
    titre: 'Mettre à disposition un moyen de communication écrite et former à la LSF',
    resume: 'Papier, ardoise ou tablette : assurer un échange sans barrière à chaque point de contact.',
    commentFaire: [
      'Intégrer au moins un bénévole maîtrisant la Langue des Signes Française (LSF) au point info/accueil PSH, identifiable par un badge ou t-shirt spécifique',
      'Fournir aux équipes d\'accueil des blocs-notes (ou ardoises effaçables) et des applications de transcription instantanée voix-texte sur tablette pour faciliter les échanges',
      'Veiller à ce que le personnel soit posté dans des zones bien éclairées pour permettre la lecture labiale (ne pas parler dans le noir ou à contre-jour)',
      'Former l\'équipe à se placer face à la personne, visage bien éclairé, sans exagérer l\'articulation',
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
      'Attribuer une couleur, un accessoire ou un badge dédié sur les vêtements des membres de l\'équipe accessibilité',
      'Former tous les membres identifiables aux bases de l\'accueil adapté pour chaque type de handicap',
      'Mentionner l\'existence de cette équipe sur le site internet et les supports de communication en amont de l\'événement',
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
      'Recruter et briefer une petite équipe de bénévoles dédiés à l\'accompagnement, formés à la bienveillance et à la gestion de crise',
      'Assurer un lien constant entre la brigade et la sécurité pour orienter rapidement les festivaliers en difficulté',
      'Organiser des maraudes régulières sur le site, notamment autour des zones de forte affluence et de l\'espace de repos',
      'Mentionner l\'existence de la brigade sur le site internet et au point d\'accueil pour que les festivaliers sachent qu\'ils peuvent la solliciter à tout moment',
    ],
    handicaps: ['tous'],
  },
  {
    id: 'plans-tactiles',
    slug: 'plans-tactiles',
    zone: 'accueil',
    statut: 'recommande',
    titre: 'Proposer des plans tactiles et une signalétique adaptée sur site',
    resume: 'Permet l\'orientation autonome des personnes malvoyantes et des publics neurodivergents.',
    commentFaire: [
      'Écrire les indications dans une police sans empattement (type Arial ou Verdana), en grande taille avec un fort contraste entre le texte et le fond',
      'Associer systématiquement un pictogramme explicite au texte pour faciliter la lecture rapide et l\'orientation autonome',
      'Associer chaque grande zone du festival à une couleur unique (ex : zone bars en jaune, WC en bleu, Scène 1 en rouge) et reporter cette couleur au sol et sur les panneaux directionnels',
      'Utiliser des pictogrammes standardisés très explicites, sans détails graphiques superflus, selon la méthode FALC (Facile À Lire et à Comprendre)',
      'Proposer un plan en relief disponible à l\'accueil pour les personnes malvoyantes',
    ],
    handicaps: ['visuel', 'autisme'],
  },
  {
    id: 'info-accessibilite-site',
    slug: 'info-accessibilite-site',
    zone: 'accueil',
    statut: 'recommande',
    titre: 'Publier les informations d\'accessibilité avant l\'évènement',
    resume: 'Permet aux festivaliers de se préparer et de réduire leur anxiété en amont.',
    commentFaire: [
      'Coder le site internet pour qu\'il respecte les normes d\'accessibilité et soit lisible par les logiciels de synthèse vocale — éviter absolument les PDF sous forme d\'images',
      'Publier en amont un guide FALC détaillant pas à pas le déroulé d\'une journée type (où aller, que faire à l\'arrivée, les règles de sécurité) avec des photos réelles des lieux',
      'Proposer un planning des concerts en frise chronologique linéaire plutôt qu\'un tableau croisé complexe',
      'Décrire précisément les situations potentiellement stressantes (fouille à l\'entrée, bousculades, volume sonore, effets stroboscopiques ou pyrotechniques) pour permettre l\'anticipation',
      'Mettre en ligne une cartographie listant l\'emplacement des scènes, le niveau sonore estimé par zone et le trajet le plus direct pour quitter le site rapidement',
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
      'Lister les obstacles connus et non résolus sur la page accessibilité et proposer une alternative ou un contournement lorsque c\'est possible',
      'Préciser les justificatifs (Carte Mobilité Inclusion "Priorité", certificat médical) ouvrant droit aux dispositifs PSH pour rassurer les usagers avant leur venue',
      'Mettre à jour la liste à chaque édition pour que les festivaliers puissent s\'y fier et préparer leur venue en connaissance de cause',
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
      'Prévoir une zone de camping PMR proche des sanitaires adaptés et de l\'entrée du site, avec des allées de circulation dégagées',
      'Proposer des emplacements plats et stabilisés, accessibles en fauteuil, avec un accès direct à l\'électricité pour les dispositifs médicaux',
      'Mettre en place une navette dédiée hébergement ↔ site principal pour éviter de longs trajets à pied',
    ],
    handicaps: ['moteur', 'invisible'],
  },
]

export function getBonnePratique(slug: string): BonnePratique | undefined {
  return bonnesPratiques.find((bp) => bp.slug === slug)
}
