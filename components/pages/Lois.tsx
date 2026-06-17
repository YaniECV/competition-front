import Link from 'next/link'
import { lois } from '../data/lois'

export function LesLois() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="tag">S'informer</span>
          <h1>Les lois</h1>
          <p style={{ fontSize: 16, maxWidth: 540, marginTop: 16, lineHeight: 1.7 }}>
            Les textes qui s'appliquent aux festivals. Savoir ce qu'on doit faire est le premier pas pour le faire.
          </p>
        </div>
      </div>
      <div className="container" style={{ paddingBottom: 80 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {lois.map((l) => (
            <div key={l.slug} id={l.slug} className="card" style={{ scrollMarginTop: 80 }}>
              <h3 style={{ marginBottom: 8 }}>{l.titre}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--muted)', marginBottom: 10 }}>{l.contenu}</p>
              <p style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>{l.source}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24, padding: 16, background: 'var(--bg2)', border: '1px solid var(--border)', fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font)' }}>
          ⚠ Ces informations sont à titre indicatif. À faire vérifier par un professionnel du droit ou votre DRAC avant mise en application.
        </div>

        <div style={{ marginTop: 24, padding: 24, border: '1px solid var(--border)', borderRadius: 8, background: 'var(--bg2)' }}>
          <h3 style={{ marginBottom: 12 }}>Des questions sur vos obligations ?</h3>
          <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>
            La DRAC de votre région peut vous orienter et, dans certains cas, co-financer vos aménagements.
          </p>
          <a href="mailto:contact@fmm.fr" className="btn btn-outline" style={{ fontSize: 12 }}>
            Nous contacter pour un accompagnement →
          </a>
        </div>

        <div style={{ marginTop: 32 }}>
          <Link href="/s-informer/bonnes-pratiques" style={{ fontSize: 13, color: 'var(--muted)', textDecoration: 'underline' }}>
            ← Voir les bonnes pratiques
          </Link>
        </div>
      </div>
    </>
  )
}
