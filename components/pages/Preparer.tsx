"use client";
import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

// ── Questions ─────────────────────────────────────────────────────────────────

const QUESTIONS = [
  {
    id: 'jauge',
    text: 'Ton festival fait combien de personnes ?',
    type: 'single' as const,
    options: [
      { val: 'micro',  label: 'Moins de 300' },
      { val: 'petit',  label: '300 à 1 500' },
      { val: 'moyen',  label: '1 500 à 5 000' },
      { val: 'grand',  label: 'Plus de 5 000' },
    ],
  },
  {
    id: 'terrain',
    text: 'Ton terrain c\'est quoi ?',
    type: 'single' as const,
    options: [
      { val: 'herbe',  label: 'Herbe / terre' },
      { val: 'bitume', label: 'Bitume' },
      { val: 'mixte',  label: 'Mixte' },
      { val: 'salle',  label: 'En salle' },
    ],
  },
  {
    id: 'duree',
    text: 'Ton festival dure combien de jours ?',
    type: 'single' as const,
    options: [
      { val: '1j',     label: '1 jour' },
      { val: '2-3j',   label: '2-3 jours' },
      { val: '3j+',    label: 'Plus de 3 jours' },
    ],
  },
  {
    id: 'espaces',
    text: 'Ton festival c\'est quoi comme espaces ?',
    type: 'multi' as const,
    hint: 'Sélectionne tout ce qui s\'applique',
    options: [
      { val: 'scene',    label: 'Scène' },
      { val: 'buvettes', label: 'Buvettes / bars' },
      { val: 'parking',  label: 'Parking' },
      { val: 'toilettes',label: 'Toilettes' },
      { val: 'camping',  label: 'Camping' },
      { val: 'repos',    label: 'Espace repos' },
    ],
  },
  {
    id: 'budget',
    text: 'T\'as un budget accessibilité ?',
    type: 'single-other' as const,
    options: [
      { val: 'zero',   label: 'Pas encore' },
      { val: 'petit',  label: 'Moins de 1 000 €' },
      { val: 'moyen',  label: '1 000 € à 5 000 €' },
      { val: 'grand',  label: 'Plus de 5 000 €' },
      { val: 'other',  label: 'Autre' },
    ],
  },
] as const

type Answers = Record<string, string | string[]>

// ── Recommendation database ───────────────────────────────────────────────────

interface Reco {
  id: string
  titre: string
  detail: string
  espaces: string[]
  handicaps: string[]
  cout: number
  priorite: 'obligatoire' | 'recommandé'
  source?: string
}

const RECO_DB: Reco[] = [
  {
    id: 'parking-pmr-places',
    titre: '2 % de places PMR dans le parking',
    detail: 'Réserver et signaliser au minimum 2 % des places de stationnement pour les personnes à mobilité réduite, conformément à la réglementation. Marquage au sol, panneau vertical, cheminement direct vers l\'entrée.',
    espaces: ['parking'],
    handicaps: ['Moteur'],
    cout: 300,
    priorite: 'obligatoire',
    source: 'Loi 11/02/2005 – Art. L.111-7',
  },
  {
    id: 'parking-cheminement',
    titre: 'Cheminement ≥ 1,40 m depuis le parking',
    detail: 'Garantir un cheminement accessible d\'au moins 1,40 m de largeur entre le parking et les espaces du festival. Revêtement ferme, non glissant, pente ≤ 5 %, sans obstacle à moins de 0,90 m de hauteur.',
    espaces: ['parking'],
    handicaps: ['Moteur', 'Visuel'],
    cout: 400,
    priorite: 'obligatoire',
    source: 'Arrêté 15/01/2007 – IOP',
  },
  {
    id: 'parking-navette',
    titre: 'Navette accessible depuis le parking',
    detail: 'Si la distance entre le parking et le site dépasse 300 m, prévoir une navette avec rampe d\'accès ou plancher bas. Communiquer les horaires en FALC et en LSF sur le site web et les réseaux.',
    espaces: ['parking'],
    handicaps: ['Moteur', 'Visuel'],
    cout: 1200,
    priorite: 'recommandé',
  },
  {
    id: 'parking-depose-minute',
    titre: 'Zone dépose-minute PMR à l\'entrée',
    detail: 'Créer une zone de dépose-minute réservée PMR à moins de 50 m de l\'entrée principale, avec espace de manœuvre ≥ 3,30 m de large et revêtement ferme.',
    espaces: ['parking'],
    handicaps: ['Moteur'],
    cout: 150,
    priorite: 'recommandé',
  },
  {
    id: 'signaletique-plans',
    titre: 'Plans du site accessibles à l\'entrée',
    detail: 'Afficher des plans du site en grande taille (A2 minimum) à chaque entrée, avec pictogrammes normalisés, codes couleurs contrastés (rapport ≥ 3:1) et version FALC. Prévoir une version tactile pour les personnes aveugles.',
    espaces: ['parking', 'scene', 'buvettes', 'toilettes', 'camping', 'repos'],
    handicaps: ['Visuel', 'Autisme', 'Invisibles'],
    cout: 250,
    priorite: 'recommandé',
    source: 'Guide AMP 2024 – Signalétique',
  },
  {
    id: 'signaletique-podotactiles',
    titre: 'Bandes podotactiles et balises sonores',
    detail: 'Poser des bandes d\'éveil de vigilance (couleur contrastée, texture normalisée) aux intersections et points dangereux. Installer des balises sonores à chaque entrée principale et aux points d\'information.',
    espaces: ['parking', 'scene', 'toilettes'],
    handicaps: ['Visuel'],
    cout: 600,
    priorite: 'recommandé',
    source: 'Guide AMP 2024 – Signalétique',
  },
  {
    id: 'signaletique-falc',
    titre: 'Supports de communication en FALC',
    detail: 'Traduire le programme, les règles de sécurité et les informations pratiques en Facile À Lire et à Comprendre (FALC). Utiliser des phrases courtes, des pictogrammes et une police sans empattement ≥ 14 pt.',
    espaces: ['parking', 'scene', 'buvettes', 'toilettes', 'camping', 'repos'],
    handicaps: ['Autisme', 'Psychique', 'Invisibles'],
    cout: 180,
    priorite: 'recommandé',
  },
  {
    id: 'accueil-comptoir',
    titre: 'Comptoir d\'accueil abaissé à 80 cm',
    detail: 'Proposer un guichet ou une partie de comptoir à hauteur 80 cm maximum, libre en dessous sur au moins 60 cm de profondeur, pour permettre l\'accès en fauteuil roulant.',
    espaces: ['parking', 'buvettes'],
    handicaps: ['Moteur'],
    cout: 350,
    priorite: 'obligatoire',
    source: 'Loi 11/02/2005 – Art. L.111-7',
  },
  {
    id: 'accueil-file-pmr',
    titre: 'File PMR dédiée à l\'accueil',
    detail: 'Créer un accès prioritaire PMR à l\'entrée avec signalisation claire. Former les bénévoles à orienter les festivaliers concernés. Prévoir un bracelet ou badge de priorité distribué dès l\'arrivée.',
    espaces: ['parking'],
    handicaps: ['Moteur', 'Autisme', 'Psychique'],
    cout: 50,
    priorite: 'recommandé',
  },
  {
    id: 'accueil-referent',
    titre: 'Référent accessibilité identifié',
    detail: 'Désigner un·e référent·e accessibilité joignable pendant tout l\'événement (badge distinctif, radio). Former l\'ensemble des bénévoles aux gestes de base : communication avec les PSH, aide à la mobilité, premiers secours adaptés.',
    espaces: ['parking', 'scene', 'buvettes', 'toilettes', 'camping', 'repos'],
    handicaps: ['Moteur', 'Visuel', 'Auditif', 'Autisme', 'Psychique', 'Invisibles'],
    cout: 0,
    priorite: 'recommandé',
    source: 'Guide AMP 2024 – Accueil',
  },
  {
    id: 'accueil-bim',
    titre: 'Boucle à induction magnétique (BIM) à l\'accueil',
    detail: 'Installer une boucle magnétique portable à l\'accueil principal pour les personnes malentendantes appareillées. Signaler la présence avec le pictogramme normalisé T.',
    espaces: ['parking'],
    handicaps: ['Auditif'],
    cout: 400,
    priorite: 'recommandé',
    source: 'Guide AMP 2024 – Accueil',
  },
  {
    id: 'accueil-papier-crayon',
    titre: 'Papier et crayon à l\'accueil',
    detail: 'Mettre à disposition papier, crayon et un support d\'appui à chaque point d\'information pour faciliter la communication écrite avec les personnes sourdes ou malentendantes non appareillées.',
    espaces: ['parking'],
    handicaps: ['Auditif'],
    cout: 5,
    priorite: 'recommandé',
  },
  {
    id: 'scene-plateforme-pmr',
    titre: 'Plateforme PMR avec vue dégagée sur la scène',
    detail: 'Aménager une zone surélevée ou de plain-pied réservée PMR avec vue dégagée, espace de manœuvre ≥ 1,40 m, garde-corps si surélévation, et accès cheminement sans obstacle depuis l\'entrée. Capacité recommandée : 1 place PMR pour 100 festivaliers.',
    espaces: ['scene'],
    handicaps: ['Moteur'],
    cout: 1500,
    priorite: 'obligatoire',
    source: 'Guide AMP 2024 – Scène',
  },
  {
    id: 'scene-bim',
    titre: 'Boucle à induction magnétique devant la scène',
    detail: 'Équiper la zone fosse / devant-scène d\'une boucle magnétique portable ou fixe pour les spectateurs malentendants appareillés. Annoncer sa présence dans la communication.',
    espaces: ['scene'],
    handicaps: ['Auditif'],
    cout: 500,
    priorite: 'recommandé',
  },
  {
    id: 'scene-lsf',
    titre: 'Interprète LSF sur scène',
    detail: 'Positionner un·e interprète en Langue des Signes Française côté jardin ou côté cour selon les concerts, visible depuis la fosse. Prévoir un éclairage dédié sur l\'interprète et l\'annoncer dans la programmation.',
    espaces: ['scene'],
    handicaps: ['Auditif'],
    cout: 600,
    priorite: 'recommandé',
    source: 'Guide AMP 2024 – Scène',
  },
  {
    id: 'scene-audiodescription',
    titre: 'Audiodescription et retransmission vidéo',
    detail: 'Mettre en place un commentaire audiodescriptif pour les animations visuelles (feux d\'artifice, spectacles de lumière). Prévoir un écran de retransmission proche de la plateforme PMR.',
    espaces: ['scene'],
    handicaps: ['Visuel'],
    cout: 400,
    priorite: 'recommandé',
  },
  {
    id: 'scene-vibrante',
    titre: 'Colonne vibrante ou gilet vibrant',
    detail: 'Proposer un ou deux gilets vibrants ou une colonne vibrante (speaker vibrotactile) en prêt à l\'entrée pour les personnes sourdes et malentendantes, afin de ressentir la musique par les vibrations.',
    espaces: ['scene'],
    handicaps: ['Auditif'],
    cout: 250,
    priorite: 'recommandé',
    source: 'Guide AMP 2024 – Scène',
  },
  {
    id: 'toilettes-pmr',
    titre: 'Sanitaire PMR (1 pour 200 festivaliers)',
    detail: 'Installer au minimum 1 cabinet de toilette accessible PMR pour 200 festivaliers. Dimensions : 1,50 m × 1,50 m de manœuvre, barre d\'appui, abattant WC à 46 cm, porte à 0,90 m libre, alarme visuelle et sonore.',
    espaces: ['toilettes'],
    handicaps: ['Moteur'],
    cout: 1400,
    priorite: 'obligatoire',
    source: 'Loi 11/02/2005 – Sanitaires ERP',
  },
  {
    id: 'toilettes-alarme-visuelle',
    titre: 'Alarme visuelle dans les sanitaires PMR',
    detail: 'Équiper chaque sanitaire PMR d\'un dispositif d\'appel d\'urgence avec signal visuel (flash lumineux) et sonore, accessible depuis le sol (bouton à tirette ou au sol). Signaler clairement par pictogramme.',
    espaces: ['toilettes'],
    handicaps: ['Auditif', 'Moteur'],
    cout: 120,
    priorite: 'obligatoire',
  },
  {
    id: 'toilettes-signaletique',
    titre: 'Signalétique claire des toilettes PMR',
    detail: 'Baliser le cheminement vers les toilettes PMR avec des panneaux directionnels en hauteur (2,20 m) et au sol, pictogrammes normalisés, fond sombre / texte clair pour le contraste visuel.',
    espaces: ['toilettes'],
    handicaps: ['Visuel', 'Autisme'],
    cout: 80,
    priorite: 'recommandé',
  },
  {
    id: 'buvettes-comptoir',
    titre: 'Comptoirs de buvette abaissés à 80 cm',
    detail: 'Aménager au moins une section de comptoir à 80 cm de hauteur avec espace de passage libre en dessous, ou proposer une aide humaine dédiée pour les commandes au comptoir normal. Afficher les menus en FALC et en grands caractères.',
    espaces: ['buvettes'],
    handicaps: ['Moteur', 'Visuel'],
    cout: 450,
    priorite: 'recommandé',
    source: 'Guide AMP 2024 – Buvettes',
  },
  {
    id: 'buvettes-aide-humaine',
    titre: 'Aide humaine dédiée aux buvettes',
    detail: 'Former un·e bénévole par buvette à accompagner les personnes PSH : prendre la commande, porter les consommations, gérer les paiements si nécessaire. Porter un badge "Accessibilité" visible.',
    espaces: ['buvettes'],
    handicaps: ['Moteur', 'Visuel', 'Autisme', 'Psychique'],
    cout: 0,
    priorite: 'recommandé',
  },
  {
    id: 'buvettes-menus-falc',
    titre: 'Menus buvettes en FALC et grands caractères',
    detail: 'Rédiger et afficher les menus en FALC avec pictogrammes alimentaires, police sans empattement, taille ≥ 20 pt, fond clair / texte sombre. Proposer les menus en version numérique sur QR code (accessible depuis un lecteur d\'écran).',
    espaces: ['buvettes'],
    handicaps: ['Visuel', 'Autisme', 'Invisibles'],
    cout: 60,
    priorite: 'recommandé',
  },
  {
    id: 'camping-cheminements',
    titre: 'Cheminements balisés au camping',
    detail: 'Tracer et signaliser des allées de circulation ≥ 1,40 m de large dans le camping, avec revêtement ferme (caillebotis ou stabilisé), éclairage 200 lux minimum la nuit, et signalétique directionnelle vers les blocs sanitaires et la scène.',
    espaces: ['camping'],
    handicaps: ['Moteur', 'Visuel'],
    cout: 700,
    priorite: 'recommandé',
    source: 'Guide AMP 2024 – Camping',
  },
  {
    id: 'camping-emplacements-pmr',
    titre: 'Emplacements PMR au camping',
    detail: 'Réserver des emplacements PMR proches de l\'entrée du camping et des sanitaires, sur terrain plat, avec connexion au cheminement accessible. Prévoir 1 emplacement PMR pour 50 emplacements totaux.',
    espaces: ['camping'],
    handicaps: ['Moteur'],
    cout: 200,
    priorite: 'recommandé',
  },
  {
    id: 'repos-zone-sensorielle',
    titre: 'Zone calme sensorielle (5 × 5 m minimum)',
    detail: 'Aménager une zone de repos calme et semi-fermée de minimum 5 × 5 m, à l\'écart des sources de bruit et de lumière intense, avec accès en fauteuil roulant. Équiper de sièges confortables et de casques antibruit en prêt.',
    espaces: ['repos'],
    handicaps: ['Autisme', 'Psychique', 'Invisibles'],
    cout: 350,
    priorite: 'recommandé',
    source: 'Guide AMP 2024 – Espace repos',
  },
]

// ── Report generator ──────────────────────────────────────────────────────────

interface Loi {
  titre: string
  description: string
  statut: 'applicable' | 'partielle' | 'obligatoire'
}

interface Report {
  budgetEstime: number
  aidesEstimees: number
  recommendations: Reco[]
  lois: Loi[]
  financeurs: string[]
}

function generateReport(answers: Answers): Report {
  const jauge = answers.jauge as string
  const terrain = answers.terrain as string
  const duree = answers.duree as string
  const espaces = (answers.espaces as string[]) || []

  // Filter recommendations to only relevant espaces
  const recos = RECO_DB.filter(r =>
    r.espaces.some(e => espaces.includes(e))
  )

  // Budget calculation
  let base = 800
  if (espaces.includes('parking'))   base += 600
  if (espaces.includes('scene'))     base += 2200
  if (espaces.includes('toilettes')) base += 1400
  if (espaces.includes('buvettes'))  base += 450
  if (espaces.includes('camping'))   base += 900
  if (espaces.includes('repos'))     base += 350

  const terrainMultiplier = terrain === 'herbe' ? 1.3 : terrain === 'salle' ? 0.85 : 1
  const jaugeMultiplier   = jauge === 'micro' ? 0.8 : jauge === 'petit' ? 1 : jauge === 'moyen' ? 1.8 : 3.2
  const dureeMultiplier   = duree === '1j' ? 0.85 : duree === '3j+' ? 1.25 : 1

  const budgetEstime = Math.round(base * terrainMultiplier * jaugeMultiplier * dureeMultiplier / 100) * 100
  const aidesEstimees = Math.round(budgetEstime * 0.42 / 100) * 100

  // Laws
  const jaugeNum = jauge === 'micro' ? 200 : jauge === 'petit' ? 900 : jauge === 'moyen' ? 3000 : 8000
  const isMultiJour = duree !== '1j'

  const lois: Loi[] = [
    {
      titre: 'Loi 11/02/2005',
      description: 'Loi pour l\'égalité des droits et des chances, la participation et la citoyenneté des personnes handicapées. Définit les obligations d\'accessibilité pour les ERP.',
      statut: 'applicable',
    },
    {
      titre: 'IOP – Arrêté 15/01/2007',
      description: 'Installations Ouvertes au Public : accessibilité des espaces de plein air. S\'applique si jauge > 300 personnes ou événement multi-jours.',
      statut: (jaugeNum > 300 || isMultiJour) ? 'partielle' : 'applicable',
    },
    {
      titre: 'Registre de sécurité',
      description: 'Registre de sécurité avec plan d\'évacuation adapté aux PSH. Obligatoire à partir de 1 500 festivaliers.',
      statut: jaugeNum > 1500 ? 'obligatoire' : 'applicable',
    },
    {
      titre: 'RGAA – Site web',
      description: 'Référentiel Général d\'Amélioration de l\'Accessibilité : accessibilité numérique du site du festival. Vérification recommandée pour tous.',
      statut: 'partielle',
    },
  ]

  // Funders
  const financeurs = [
    'DRAC (Direction Régionale des Affaires Culturelles)',
    'CCAH (Comité national Coordination Action Handicap)',
    'Collectivités territoriales (Région, Département, Commune)',
    'Convention Culture Handicap (Ministère de la Culture)',
    'ESAT – partenariat main-d\'œuvre',
    'Mécénat privé (fondations d\'entreprise)',
  ]

  return { budgetEstime, aidesEstimees, recommendations: recos, lois, financeurs }
}

// ── Result page ───────────────────────────────────────────────────────────────

const HANDICAP_FILTERS = ['Tous', 'Moteur', 'Visuel', 'Auditif', 'Autisme', 'Psychique', 'Invisibles'] as const
type HandicapFilter = typeof HANDICAP_FILTERS[number]

function AccordionSection({ title, count, children, defaultOpen = false }: { title: string; count?: number; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #dcdcdc', overflow: 'hidden', marginBottom: 12 }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px 20px', background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: 'var(--font-atkinson), system-ui, sans-serif',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: '#000' }}>{title}</span>
          {count !== undefined && (
            <span style={{ background: '#ededed', borderRadius: 999, padding: '2px 10px', fontSize: 12, color: '#555', fontWeight: 600 }}>{count}</span>
          )}
        </span>
        <svg
          width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#929292" strokeWidth="2"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', flexShrink: 0 }}
        >
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>
      {open && <div style={{ padding: '0 20px 20px' }}>{children}</div>}
    </div>
  )
}

function PrioritePill({ priorite }: { priorite: 'obligatoire' | 'recommandé' }) {
  const isOblig = priorite === 'obligatoire'
  return (
    <span style={{
      fontSize: 11, fontWeight: 700, letterSpacing: '0.04em',
      padding: '3px 10px', borderRadius: 999,
      background: isOblig ? 'rgba(206,18,19,0.1)' : 'rgba(1,112,45,0.1)',
      color: isOblig ? '#ce1213' : '#01702d',
      whiteSpace: 'nowrap', flexShrink: 0,
    }}>
      {isOblig ? 'Obligatoire' : 'Recommandé'}
    </span>
  )
}

function RecoCard({ reco }: { reco: Reco }) {
  return (
    <div style={{
      border: '1px solid #e8e8e8', borderRadius: 14, padding: '16px 18px',
      background: '#fafafa', marginBottom: 10,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 8 }}>
        <p style={{ fontSize: 15, fontWeight: 700, color: '#000', lineHeight: 1.3, margin: 0 }}>{reco.titre}</p>
        <PrioritePill priorite={reco.priorite} />
      </div>
      <p style={{ fontSize: 13, color: '#5b5b5b', lineHeight: 1.65, margin: '0 0 12px' }}>{reco.detail}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
        {reco.espaces.map(e => (
          <span key={e} style={{ fontSize: 11, background: '#f0e8ff', color: '#7b22c4', borderRadius: 999, padding: '2px 9px', fontWeight: 600 }}>{e}</span>
        ))}
        {reco.handicaps.map(h => (
          <span key={h} style={{ fontSize: 11, background: '#ededed', color: '#444', borderRadius: 999, padding: '2px 9px' }}>{h}</span>
        ))}
        {reco.cout > 0 && (
          <span style={{ fontSize: 11, color: '#929292', marginLeft: 'auto' }}>~{reco.cout.toLocaleString('fr-FR')} €</span>
        )}
      </div>
      {reco.source && (
        <p style={{ fontSize: 11, color: '#a0a0a0', marginTop: 8, marginBottom: 0, fontStyle: 'italic' }}>{reco.source}</p>
      )}
    </div>
  )
}

function LoiStatusPill({ statut }: { statut: 'applicable' | 'partielle' | 'obligatoire' }) {
  const cfg = {
    applicable:  { bg: 'rgba(1,112,45,0.1)',   color: '#01702d', label: '✓ Applicable' },
    partielle:   { bg: 'rgba(205,83,31,0.1)',  color: '#cd531f', label: '⚠ Partielle' },
    obligatoire: { bg: 'rgba(206,18,19,0.1)', color: '#ce1213', label: '✗ Obligatoire' },
  }[statut]
  return (
    <span style={{ fontSize: 12, fontWeight: 700, padding: '3px 11px', borderRadius: 999, background: cfg.bg, color: cfg.color }}>
      {cfg.label}
    </span>
  )
}

function ResultPage({ answers, onReset }: { answers: Answers; onReset: () => void }) {
  const [activeFilter, setActiveFilter] = useState<HandicapFilter>('Tous')
  const report = generateReport(answers)

  const filteredRecos = activeFilter === 'Tous'
    ? report.recommendations
    : report.recommendations.filter(r => r.handicaps.includes(activeFilter))

  const obligatoiresCount = filteredRecos.filter(r => r.priorite === 'obligatoire').length
  const espaces = (answers.espaces as string[]) || []

  return (
    <div style={{ minHeight: '100dvh', background: '#f7f7f7', fontFamily: 'var(--font-atkinson), system-ui, sans-serif' }}>
      <style>{`
        .result-grid { display: grid; grid-template-columns: 1fr 340px; gap: 24px; align-items: start; }
        .filter-chip:hover { background: #d4d4d4 !important; }
        @media (max-width: 900px) {
          .result-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Sticky header */}
      <div style={{ position: 'sticky', top: 0, background: 'rgba(247,247,247,0.95)', backdropFilter: 'blur(8px)', zIndex: 20, padding: '16px 48px', borderBottom: '1px solid #e8e8e8' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#000', textDecoration: 'none', fontWeight: 500 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Retour à l'accueil
        </Link>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 32px 80px' }}>
        {/* Page heading */}
        <div style={{ marginBottom: 40 }}>
          <p style={{ fontSize: 13, color: '#929292', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8, margin: 0 }}>Ton plan d'action personnalisé</p>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 700, color: '#000', lineHeight: 1.1, margin: '8px 0 12px' }}>
            Voilà vos résultats
          </h1>
          <p style={{ fontSize: 16, color: '#5b5b5b', margin: 0 }}>
            Basé sur le guide Métropole AMP 2024 — {report.recommendations.length} recommandations pour {espaces.length} espace{espaces.length > 1 ? 's' : ''} analysé{espaces.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Stats row — bonnes pratiques */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
          {[
            { icon: '♿', val: '6', label: 'handicaps analysés' },
            { icon: '✓', val: String(report.recommendations.length), label: 'points vérifiés' },
            { icon: '📋', val: 'Plan', label: 'd\'action généré' },
          ].map(s => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', border: '1px solid #dcdcdc', borderRadius: 14, padding: '12px 18px', flexShrink: 0 }}>
              <span style={{ width: 36, height: 36, background: '#101010', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>{s.icon}</span>
              <div>
                <p style={{ fontSize: 18, fontWeight: 700, color: '#000', margin: 0, lineHeight: 1 }}>{s.val}</p>
                <p style={{ fontSize: 12, color: '#929292', margin: 0 }}>{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main 2-column grid */}
        <div className="result-grid">
          {/* Left: recommendations + lois */}
          <div>
            {/* Filter chips */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
              {HANDICAP_FILTERS.map(f => (
                <button
                  key={f}
                  className="filter-chip"
                  onClick={() => setActiveFilter(f)}
                  style={{
                    background: activeFilter === f ? '#101010' : '#ededed',
                    color: activeFilter === f ? '#fff' : '#333',
                    border: 'none', borderRadius: 32, padding: '10px 14px',
                    fontSize: 13, fontWeight: 600, cursor: 'pointer',
                    fontFamily: 'var(--font-atkinson), system-ui, sans-serif',
                    transition: 'all 0.15s',
                  }}
                >
                  {f}
                  {f !== 'Tous' && (
                    <span style={{ marginLeft: 6, opacity: 0.7, fontSize: 11 }}>
                      {report.recommendations.filter(r => r.handicaps.includes(f)).length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Bonnes pratiques accordion */}
            <AccordionSection title="Bonnes pratiques" count={filteredRecos.length} defaultOpen>
              {filteredRecos.length === 0 ? (
                <p style={{ fontSize: 14, color: '#929292', fontStyle: 'italic' }}>Aucune recommandation pour ce filtre.</p>
              ) : (
                filteredRecos.map(r => <RecoCard key={r.id} reco={r} />)
              )}
              {obligatoiresCount > 0 && (
                <p style={{ fontSize: 12, color: '#ce1213', marginTop: 8, marginBottom: 0, fontWeight: 600 }}>
                  ⚠ {obligatoiresCount} mesure{obligatoiresCount > 1 ? 's' : ''} obligatoire{obligatoiresCount > 1 ? 's' : ''} dans cette sélection
                </p>
              )}
            </AccordionSection>

            {/* Lois accordion */}
            <AccordionSection title="Cadre légal applicable" count={report.lois.length}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {report.lois.map(l => (
                  <div key={l.titre} style={{ background: '#fafafa', borderRadius: 12, padding: '14px 16px', border: '1px solid #e8e8e8' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 6 }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: '#000' }}>{l.titre}</span>
                      <LoiStatusPill statut={l.statut} />
                    </div>
                    <p style={{ fontSize: 13, color: '#5b5b5b', lineHeight: 1.6, margin: 0 }}>{l.description}</p>
                  </div>
                ))}
              </div>
              <Link href="/s-informer/les-lois" style={{ fontSize: 13, color: '#929292', textDecoration: 'underline', display: 'inline-block', marginTop: 14 }}>
                Consulter le cadre légal complet →
              </Link>
            </AccordionSection>

            {/* Financeurs accordion */}
            <AccordionSection title="Financeurs & aides disponibles" count={report.financeurs.length}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {report.financeurs.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: '#fafafa', borderRadius: 10, border: '1px solid #e8e8e8' }}>
                    <span style={{ color: '#a122e2', fontSize: 14, flexShrink: 0 }}>◆</span>
                    <span style={{ fontSize: 14, color: '#333' }}>{f}</span>
                  </div>
                ))}
              </div>
            </AccordionSection>
          </div>

          {/* Right sidebar */}
          <div style={{ position: 'sticky', top: 72, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Budget card */}
            <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #dcdcdc', padding: 20 }}>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#929292', margin: '0 0 8px' }}>Budget estimé</p>
              <p style={{ fontSize: 60, fontWeight: 700, color: '#000', lineHeight: 1, margin: '0 0 4px', letterSpacing: '-0.02em' }}>
                {report.budgetEstime.toLocaleString('fr-FR')} €
              </p>
              <p style={{ fontSize: 13, color: '#929292', margin: '0 0 16px' }}>Estimation indicative pour votre configuration</p>
              <div style={{ background: 'rgba(161,34,226,0.1)', borderRadius: 12, padding: '12px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: '#a122e2', margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Aides disponibles</p>
                  <p style={{ fontSize: 22, fontWeight: 700, color: '#a122e2', margin: 0 }}>~{report.aidesEstimees.toLocaleString('fr-FR')} €</p>
                </div>
                <span style={{ fontSize: 28 }}>💜</span>
              </div>
              <p style={{ fontSize: 11, color: '#c0c0c0', margin: '10px 0 0', lineHeight: 1.5 }}>
                Estimations basées sur les dispositifs DRAC, CCAH et collectivités territoriales. Montants non contractuels.
              </p>
            </div>

            {/* Lois status card */}
            <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #dcdcdc', padding: 20 }}>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#929292', margin: '0 0 14px' }}>Statut des lois</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {report.lois.map(l => (
                  <div key={l.titre} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                    <span style={{ fontSize: 13, color: '#333', fontWeight: 500 }}>{l.titre}</span>
                    <LoiStatusPill statut={l.statut} />
                  </div>
                ))}
              </div>
            </div>

            {/* Quick profile recap */}
            <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #dcdcdc', padding: 20 }}>
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#929292', margin: '0 0 12px' }}>Votre configuration</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { label: 'Jauge', val: answers.jauge as string },
                  { label: 'Terrain', val: answers.terrain as string },
                  { label: 'Durée', val: answers.duree as string },
                  { label: 'Espaces', val: espaces.join(', ') || '—' },
                ].map(r => (
                  <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', gap: 8, fontSize: 13 }}>
                    <span style={{ color: '#929292' }}>{r.label}</span>
                    <span style={{ color: '#000', fontWeight: 600, textAlign: 'right' }}>{r.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom actions */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginTop: 48, borderTop: '1px solid #e8e8e8', paddingTop: 32 }}>
          <button
            onClick={onReset}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              border: '1.5px dashed #929292', borderRadius: 999, padding: '12px 24px',
              background: 'none', cursor: 'pointer', fontSize: 15, color: '#929292',
              fontFamily: 'var(--font-atkinson), system-ui, sans-serif',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: 'scaleX(-1)' }}>
              <path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>
            </svg>
            Recommencer
          </button>
          <a
            href="mailto:contact@fmm.fr"
            style={{
              display: 'inline-block', background: '#000', color: '#fff',
              borderRadius: 999, padding: '14px 28px', fontSize: 15,
              textDecoration: 'none', fontFamily: 'var(--font-atkinson), system-ui, sans-serif',
            }}
          >
            Contacter FMM →
          </a>
        </div>
      </div>
    </div>
  )
}

// ── Main diagnostic ───────────────────────────────────────────────────────────

export function AccessibleDiagnostic() {
  const [qIndex, setQIndex] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [selected, setSelected] = useState<string | string[]>('')
  const [otherText, setOtherText] = useState('')
  const [animKey, setAnimKey] = useState(0)
  const [prevText, setPrevText] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [exiting, setExiting] = useState(false)

  const q = QUESTIONS[qIndex]
  const total = QUESTIONS.length
  const progress = ((qIndex) / total) * 100

  // Sync selected with already-given answer when going back
  useEffect(() => {
    const existing = answers[QUESTIONS[qIndex].id]
    if (existing !== undefined) {
      setSelected(existing)
    } else {
      setSelected(q.type === 'multi' ? [] : '')
    }
    setOtherText('')
  }, [qIndex, answers, q.type])

  const canAdvance = q.type === 'multi'
    ? (selected as string[]).length > 0
    : q.type === 'single-other'
    ? (selected as string) !== '' && ((selected as string) !== 'other' || otherText.trim() !== '')
    : (selected as string) !== ''

  const advance = useCallback(() => {
    if (!canAdvance) return

    const finalVal = q.type === 'single-other' && selected === 'other' ? otherText.trim() : selected
    const newAnswers = { ...answers, [q.id]: finalVal }
    setAnswers(newAnswers)

    if (qIndex === total - 1) {
      setExiting(true)
      setTimeout(() => { setShowResult(true) }, 350)
      return
    }

    // Transition
    setPrevText(q.text)
    setExiting(true)
    setTimeout(() => {
      setQIndex(i => i + 1)
      setAnimKey(k => k + 1)
      setExiting(false)
      setPrevText(null)
    }, 300)
  }, [canAdvance, answers, q.id, q.text, selected, qIndex, total])

  const goBack = useCallback(() => {
    if (qIndex === 0) return
    setPrevText(null)
    setExiting(true)
    setTimeout(() => {
      setQIndex(i => i - 1)
      setAnimKey(k => k + 1)
      setExiting(false)
    }, 250)
  }, [qIndex])

  // Keyboard: Enter = advance
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && canAdvance) advance()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [advance, canAdvance])

  const toggleMulti = (val: string) => {
    const arr = (selected as string[]) || []
    setSelected(arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val])
  }

  if (showResult) return <ResultPage answers={answers} onReset={() => { setShowResult(false); setQIndex(0); setAnswers({}); setSelected(''); setAnimKey(0); setPrevText(null); setExiting(false) }} />

  return (
    <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column', background: '#f7f7f7', fontFamily: 'var(--font-atkinson), system-ui, sans-serif', overflow: 'hidden' }}>
      <style>{`
        @keyframes questionIn {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes optionsIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        .diag-option:hover {
          background: rgba(161,34,226,0.06) !important;
          border-color: #a122e2 !important;
        }
        @media (max-width: 640px) {
          .diag-options { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── Header ── */}
      <div style={{ padding: '20px 48px 0', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 15, color: '#000', textDecoration: 'none' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            Retour à l'accueil
          </Link>
          <span style={{ fontSize: 13, color: '#6b7280' }}>Question {qIndex + 1}/{total}</span>
        </div>

        {/* Progress bar */}
        <div style={{ height: 5, background: '#e5e7eb', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${progress + (1 / total) * 100}%`,
            background: 'linear-gradient(90deg, #a122e2, #ce9de7)',
            borderRadius: 3,
            transition: 'width 0.4s ease',
          }} />
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 48px', position: 'relative', overflow: 'hidden' }}>

        {/* Previous question — blurred ghost */}
        {prevText && (
          <p style={{
            position: 'absolute',
            top: '15%',
            left: 48,
            right: 48,
            fontSize: 'clamp(1.4rem, 3vw, 2.4rem)',
            color: '#5b5b5b',
            lineHeight: 1.25,
            filter: 'blur(8px)',
            opacity: 0.35,
            pointerEvents: 'none',
            fontWeight: 400,
          }}>
            {prevText}
          </p>
        )}

        {/* Current question */}
        <div
          key={animKey}
          style={{
            animation: `questionIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards`,
            opacity: exiting ? 0 : 1,
            transform: exiting ? 'translateY(-24px)' : 'translateY(0)',
            transition: exiting ? 'opacity 0.25s ease, transform 0.25s ease' : 'none',
            maxWidth: 780,
          }}
        >
          {/* Question text */}
          <h1 style={{ fontSize: 'clamp(1.6rem, 3.2vw, 2.5rem)', fontWeight: 400, color: '#000', lineHeight: 1.2, marginBottom: 40 }}>
            {q.text}
            <span style={{ display: 'inline-block', width: 2, height: '1em', background: '#000', marginLeft: 4, verticalAlign: 'middle', animation: 'cursorBlink 1s step-end infinite' }} />
          </h1>

          {'hint' in q && q.hint && (
            <p style={{ fontSize: 13, color: '#929292', marginBottom: 20, marginTop: -32 }}>{q.hint}</p>
          )}

          {/* Options */}
          <div
            className="diag-options"
            style={{
              display: 'grid',
              gridTemplateColumns: q.type === 'multi' ? 'repeat(2, 1fr)' : '1fr',
              gap: 10,
              maxWidth: q.type === 'multi' ? 640 : 480,
              animation: `optionsIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both`,
            }}
          >
            {q.options.map(opt => {
              const isMulti = q.type === 'multi'
              const isSelected = isMulti
                ? (selected as string[]).includes(opt.val)
                : selected === opt.val
              const isOther = opt.val === 'other'

              return (
                <div key={opt.val} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <button
                    className="diag-option"
                    onClick={() => {
                      if (isMulti) {
                        toggleMulti(opt.val)
                      } else {
                        setSelected(opt.val)
                      }
                    }}
                    style={{
                      textAlign: 'left',
                      background: isSelected ? 'rgba(161,34,226,0.08)' : '#fff',
                      border: isSelected ? '1.5px solid #a122e2' : '1.5px solid #e5e5e5',
                      borderRadius: 12,
                      padding: '16px 20px',
                      fontSize: 16,
                      color: '#000',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-atkinson), system-ui, sans-serif',
                      transition: 'all 0.15s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      width: '100%',
                    }}
                  >
                    <span style={{
                      width: 20, height: 20, borderRadius: isMulti ? 4 : '50%',
                      border: isSelected ? '2px solid #a122e2' : '2px solid #d1d1d1',
                      background: isSelected ? '#a122e2' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, transition: 'all 0.15s',
                    }}>
                      {isSelected && <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </span>
                    {opt.label}
                  </button>

                  {/* Champ libre pour "Autre" */}
                  {isOther && isSelected && (
                    <input
                      autoFocus
                      value={otherText}
                      onChange={e => setOtherText(e.target.value)}
                      placeholder="Précise ton budget…"
                      style={{
                        border: '1.5px solid #a122e2',
                        borderRadius: 12,
                        padding: '14px 18px',
                        fontSize: 16,
                        fontFamily: 'var(--font-atkinson), system-ui, sans-serif',
                        outline: 'none',
                        background: '#fff',
                        color: '#000',
                        width: '100%',
                        boxSizing: 'border-box',
                      }}
                      onKeyDown={e => { if (e.key === 'Enter' && canAdvance) advance() }}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Footer nav ── */}
      <div style={{ padding: '20px 48px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        {/* Précèdent */}
        <button
          onClick={goBack}
          disabled={qIndex === 0}
          style={{
            display: 'flex', alignItems: 'center', gap: 12,
            background: 'none', border: 'none', cursor: qIndex === 0 ? 'default' : 'pointer',
            opacity: qIndex === 0 ? 0.3 : 1, transition: 'opacity 0.2s',
          }}
        >
          <div style={{
            width: 55, height: 55, borderRadius: '50%',
            border: '2px dashed #929292',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#929292" strokeWidth="2" style={{ transform: 'scaleX(-1)' }}>
              <path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>
            </svg>
          </div>
          <span style={{ fontSize: 20, color: '#929292', fontFamily: 'var(--font-atkinson), system-ui, sans-serif' }}>Précèdent</span>
        </button>

        {/* Suivant */}
        <button
          onClick={advance}
          disabled={!canAdvance}
          style={{
            background: canAdvance ? '#000' : '#d1d1d1',
            color: '#fff',
            border: 'none',
            borderRadius: 999,
            padding: '14px 32px',
            fontSize: 20,
            cursor: canAdvance ? 'pointer' : 'default',
            fontFamily: 'var(--font-atkinson), system-ui, sans-serif',
            transition: 'all 0.2s',
          }}
        >
          {qIndex === total - 1 ? 'Voir mon plan →' : 'Suivant'}
        </button>
      </div>
    </div>
  )
}
