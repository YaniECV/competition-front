import Link from 'next/link'
import { Accessibility, Eye, Ear, Brain, HeartPulse, CircleDashed, type LucideIcon } from 'lucide-react'
import { handicaps } from '../data/handicaps'
import { bonnesPratiques } from '../data/bonnesPratiques'

// Icône par profil (lucide, monochrome — cohérent avec la DA wireframe)
const ICON: Record<string, LucideIcon> = {
  moteur: Accessibility,
  visuel: Eye,
  auditif: Ear,
  autisme: Brain,
  psychologique: HeartPulse,
  invisibles: CircleDashed,
}

function countPratiques(ids: string[]) {
  return ids.filter((id) => bonnesPratiques.some((bp) => bp.id === id)).length
}

// ── Index ─────────────────────────────────────────────────────────────────
export function HandicapsIndex() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="tag">Les handicaps</span>
          <h1>Les handicaps</h1>
          <p style={{ fontSize: 16, maxWidth: 560, marginTop: 16, lineHeight: 1.7 }}>
            6 profils à connaître pour mieux accueillir. Chaque fiche donne la réalité en contexte festival, les règles de communication et les bonnes pratiques concrètes.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 80 }}>
        <div className="grid-3">
          {handicaps.map((h, i) => {
            const Icon = ICON[h.slug] ?? CircleDashed
            const n = countPratiques(h.bonnesPratiquesIds)
            return (
              <Link
                key={h.slug}
                href={`/handicaps/${h.slug}`}
                className="card"
                style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', minHeight: 200 }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
                  <Icon size={28} strokeWidth={1.5} style={{ color: 'var(--text)' }} aria-hidden />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 style={{ marginBottom: 8 }}>{h.nom}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
                  {h.realite.slice(0, 96).trimEnd()}…
                </p>
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: '1px solid var(--border)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)' }}>
                    {n} bonne{n > 1 ? 's' : ''} pratique{n > 1 ? 's' : ''}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text)' }}>→</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}

// ── Section riche : Visuel ────────────────────────────────────────────────
function HandicapVisuelRiche() {
  const amenagements = [
    {
      icon: '📱',
      title: 'Avant d\'arriver',
      items: [
        'Site web conforme aux normes d\'accessibilité WCAG',
        'Contenu lisible par les logiciels de synthèse vocale',
        'Plan du site disponible en version accessible et téléchargeable',
      ],
    },
    {
      icon: '🛤️',
      title: 'Circuler sur le site',
      items: [
        'Cheminements entièrement dégagés de tout obstacle',
        'Guidage au sol et bandes de vigilance aux ruptures de parcours',
        'Mains courantes avec indications en Braille',
        'Signalétique en grands caractères, couleurs fortement contrastées',
        'Éclairage suffisant sans zones d\'ombre ni éblouissement',
      ],
    },
    {
      icon: '🎸',
      title: 'Vivre le festival',
      items: [
        'Informations orales diffusées régulièrement sur le site',
        'Audiodescription des spectacles pour les temps forts',
        'Bénévoles formés au guidage visuel et identifiables facilement',
      ],
    },
  ]

  const communication = [
    'Annonce-toi avant de toucher ou de guider — jamais sans prévenir',
    'Décris l\'environnement avec précision : "il y a une marche à 2 mètres devant vous"',
    'Ne crie pas et ne parle pas trop lentement — entendre n\'est pas le problème',
    'Propose ton bras pour guider, ne pousse pas',
    'Préviens toujours quand tu t\'éloignes ou que tu quittes la personne',
    'Ne parle pas à l\'accompagnant à la place de la personne',
  ]

  const besoins = [
    'Un chemin sans obstacle du début à la fin',
    'Une information simple, accessible, lisible',
    'La possibilité de se repérer seul dans l\'espace',
  ]

  return (
    <div style={{ marginBottom: 56 }}>
      {/* Header accrocheur */}
      <p style={{ fontSize: 22, fontFamily: 'var(--font)', fontWeight: 700, color: 'var(--text)', marginBottom: 24, lineHeight: 1.2 }}>
        Et si les panneaux étaient illisibles, la foule un mur, et la scène invisible ?
      </p>

      {/* Corps narratif */}
      <p style={{ fontSize: 14, lineHeight: 1.8, maxWidth: 680, marginBottom: 16, color: 'var(--muted)' }}>
        Un festival, c'est une avalanche d'informations visuelles. Des panneaux partout, de la signalétique, des écrans, de la foule dense. Pour la plupart des festivaliers, c'est de l'ambiance. Pour une personne malvoyante — c'est du bruit visuel ingérable.
      </p>
      <p style={{ fontSize: 14, lineHeight: 1.8, maxWidth: 680, marginBottom: 16, color: 'var(--muted)' }}>
        1,3 million de personnes sont touchées par un handicap visuel en France. Et contrairement à ce qu'on imagine, seulement 2 à 3 % sont non-voyantes. Les autres voient — mais pas comme vous. Certaines ne distinguent que les contrastes lumineux, d'autres ont perdu la vision périphérique, d'autres encore ne perçoivent ni les couleurs ni les détails. 7 à 8 000 personnes lisent en Braille.
      </p>
      <p style={{ fontSize: 14, lineHeight: 1.8, maxWidth: 680, marginBottom: 24, color: 'var(--muted)' }}>
        Ces personnes ne se repèrent pas avec les yeux seuls. Elles utilisent ce qui leur reste — les textures sous leurs pieds, les contrastes de couleurs, les odeurs, les sons. Dans un festival metal, cet environnement est pensé pour ceux qui voient bien. Votre rôle c'est de leur donner des points d'appui — concrets, fiables, constants.
      </p>

      {/* Besoins */}
      <div style={{ marginBottom: 40 }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', color: 'var(--text)', marginBottom: 16 }}>
          ⚡ LEURS BESOINS EN FESTIVAL
        </p>
        <div style={{ border: '1px solid var(--border)' }}>
          {besoins.map((b, i) => (
            <div key={b} style={{ display: 'flex', gap: 10, padding: '12px 16px', borderBottom: i < besoins.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <span style={{ color: 'var(--muted)', flexShrink: 0, fontFamily: 'var(--font-mono)', fontSize: 12 }}>—</span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>{b}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Aménagements */}
      <div style={{ marginBottom: 40 }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', color: 'var(--text)', marginBottom: 16 }}>
          🛠️ LES AMÉNAGEMENTS ESSENTIELS
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {amenagements.map(a => (
            <div key={a.title} className="card">
              <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', color: 'var(--text)', marginBottom: 12 }}>
                {a.icon} {a.title}
              </p>
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
      </div>

      {/* Communication */}
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', color: 'var(--text)', marginBottom: 16 }}>
          💬 RÈGLES DE COMMUNICATION
        </p>
        <div style={{ border: '1px solid var(--border)' }}>
          {communication.map((c, i) => (
            <div key={c} style={{ display: 'flex', gap: 20, padding: '14px 16px', borderBottom: i < communication.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', minWidth: 20, flexShrink: 0, paddingTop: 2 }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>{c}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Détail ────────────────────────────────────────────────────────────────
export function HandicapsDetail({ slug }: { slug: string }) {
  const index = handicaps.findIndex((h) => h.slug === slug)
  if (index === -1) return null
  const handicap = handicaps[index]
  const prev = handicaps[(index - 1 + handicaps.length) % handicaps.length]
  const next = handicaps[(index + 1) % handicaps.length]

  const Icon = ICON[handicap.slug] ?? CircleDashed
  const PrevIcon = ICON[prev.slug] ?? CircleDashed
  const NextIcon = ICON[next.slug] ?? CircleDashed

  const bps = handicap.bonnesPratiquesIds
    .map((id) => bonnesPratiques.find((bp) => bp.id === id))
    .filter((bp): bp is NonNullable<typeof bp> => Boolean(bp))

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <Link href="/handicaps" style={{ fontSize: 12, color: 'var(--muted)', display: 'inline-block', marginBottom: 20 }}>
            ← Les handicaps
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <Icon size={44} strokeWidth={1.5} style={{ color: 'var(--text)', flexShrink: 0 }} aria-hidden />
            <div>
              <span className="tag" style={{ marginBottom: 8 }}>
                Profil {String(index + 1).padStart(2, '0')} / {String(handicaps.length).padStart(2, '0')}
              </span>
              <h1>{handicap.nom}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 80 }}>

        {/* Section éditoriale riche selon le profil */}
        {slug === 'visuel' && <HandicapVisuelRiche />}

        <div className="handicap-cols" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start', marginBottom: 56 }}>
          <div>
            <div className="accent-line" />
            <h2 style={{ marginBottom: 12 }}>Réalité en contexte festival</h2>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--muted)' }}>{handicap.realite}</p>
          </div>
          <div className="card">
            <h4 style={{ marginBottom: 16 }}>Règles de communication</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {handicap.communication.map((c, i) => (
                <li key={c} style={{ display: 'flex', gap: 12, fontSize: 13, lineHeight: 1.6 }}>
                  <span style={{ flexShrink: 0, fontFamily: 'var(--font-mono)', color: 'var(--muted)', fontSize: 11, paddingTop: 2 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16 }}>
            <h2>Les bonnes pratiques pour ce profil</h2>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)' }}>{bps.length} pratique{bps.length > 1 ? 's' : ''}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {bps.map((bp) => {
              const obligatoire = bp.statut === 'obligatoire'
              return (
                <Link
                  key={bp.id}
                  href={`/s-informer/bonnes-pratiques/${bp.slug}`}
                  className="card"
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, textDecoration: 'none' }}
                >
                  <div>
                    <h3 style={{ marginBottom: 4 }}>{bp.titre}</h3>
                    <p style={{ fontSize: 13, color: 'var(--muted)' }}>{bp.resume}</p>
                  </div>
                  <span
                    style={{
                      flexShrink: 0,
                      fontSize: 10,
                      fontFamily: 'var(--font-mono)',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      padding: '3px 9px',
                      whiteSpace: 'nowrap',
                      border: '1px solid ' + (obligatoire ? 'var(--text)' : 'var(--border2)'),
                      background: obligatoire ? 'var(--text)' : 'transparent',
                      color: obligatoire ? '#fff' : 'var(--muted)',
                    }}
                  >
                    {bp.statut}
                  </span>
                </Link>
              )
            })}
          </div>

          {handicap.signaletiqueSlug && (
            <Link
              href={`/les-ressources#${handicap.signaletiqueSlug}`}
              style={{ display: 'inline-block', marginTop: 16, fontSize: 13, color: 'var(--muted)', textDecoration: 'underline' }}
            >
              Voir le pack signalétique correspondant →
            </Link>
          )}
        </div>

        {/* Navigation entre profils */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--border)', borderTop: '1px solid var(--border)' }}>
          <Link href={`/handicaps/${prev.slug}`} style={{ background: 'var(--bg)', padding: '20px 24px', textDecoration: 'none' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)' }}>← Profil précédent</span>
            <p style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, color: 'var(--text)', marginTop: 6 }}>
              <PrevIcon size={16} strokeWidth={1.5} aria-hidden /> {prev.nom}
            </p>
          </Link>
          <Link href={`/handicaps/${next.slug}`} style={{ background: 'var(--bg)', padding: '20px 24px', textDecoration: 'none', textAlign: 'right' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)' }}>Profil suivant →</span>
            <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8, fontWeight: 700, color: 'var(--text)', marginTop: 6 }}>
              {next.nom} <NextIcon size={16} strokeWidth={1.5} aria-hidden />
            </p>
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .handicap-cols { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
