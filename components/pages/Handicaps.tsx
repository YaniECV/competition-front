import Link from 'next/link'
import { handicaps } from '../data/handicaps'
import { bonnesPratiques } from '../data/bonnesPratiques'

export function HandicapsIndex() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="tag">Les handicaps</span>
          <h1>Les handicaps</h1>
          <p style={{ fontSize: 16, maxWidth: 540, marginTop: 16, lineHeight: 1.7 }}>
            Comprendre les différents publics pour mieux les accueillir.
          </p>
        </div>
      </div>
      <div className="container" style={{ paddingBottom: 80 }}>
        <div className="grid-3">
          {handicaps.map((h) => (
            <Link key={h.slug} href={`/handicaps/${h.slug}`} className="card" style={{ display: 'block', textDecoration: 'none' }}>
              <div className="accent-line" />
              <h3 style={{ marginBottom: 8 }}>{h.nom}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.6 }}>{h.realite.slice(0, 110)}…</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export function HandicapsDetail({ slug }: { slug: string }) {
  const handicap = handicaps.find((h) => h.slug === slug)
  if (!handicap) return null

  const bps = handicap.bonnesPratiquesIds
    .map((id) => bonnesPratiques.find((bp) => bp.id === id))
    .filter((bp): bp is NonNullable<typeof bp> => Boolean(bp))

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <Link href="/handicaps" style={{ fontSize: 12, color: 'var(--muted)', display: 'inline-block', marginBottom: 20 }}>← Les handicaps</Link>
          <span className="tag">Les handicaps</span>
          <h1>{handicap.nom}</h1>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: 80 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start', marginBottom: 56 }}>
          <div>
            <div className="accent-line" />
            <h2 style={{ marginBottom: 8 }}>Réalité en contexte festival</h2>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--muted)' }}>{handicap.realite}</p>
          </div>
          <div className="card">
            <h3 style={{ marginBottom: 16, fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Règles de communication
            </h3>
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

        <div>
          <h2 style={{ marginBottom: 16 }}>Les bonnes pratiques pour ce profil</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
            {bps.map((bp) => (
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
                <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', border: '1px solid var(--border)', padding: '2px 8px', color: 'var(--muted)', whiteSpace: 'nowrap' }}>
                  {bp.statut}
                </span>
              </Link>
            ))}
          </div>

          {handicap.signaletiqueSlug && (
            <Link
              href={`/les-ressources#${handicap.signaletiqueSlug}`}
              style={{ fontSize: 13, color: 'var(--muted)', textDecoration: 'underline' }}
            >
              Voir le pack signalétique correspondant →
            </Link>
          )}
        </div>
      </div>
    </>
  )
}
