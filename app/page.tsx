import Link from "next/link";
import HeroParallaxBarriers from "@/components/HeroParallaxBarriers";
import HomepageTagline from "@/components/HomepageTagline";
import HomepageHandicaps from "@/components/HomepageHandicaps";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section style={{ position: 'relative', background: '#101010', minHeight: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, marginTop: -72, paddingTop: 140, paddingBottom: 120 }}>

        <HeroParallaxBarriers />

        {/* Contenu central */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          {/* Titre + icône centrale */}
          <div style={{ position: 'relative' }}>
            <h1 style={{
              fontFamily: 'var(--font-title)',
              fontSize: 'clamp(80px, 17.2vw, 260px)',
              fontWeight: 400,
              color: '#EEE9F3',
              textAlign: 'center',
              lineHeight: 1,
              textTransform: 'uppercase',
              letterSpacing: 0,
            }}>
              Access<br />to the pit
            </h1>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'clamp(60px, 15vw, 227px)',
              height: 'clamp(60px, 15vw, 227px)',
              pointerEvents: 'none',
            }}>
              <img src="/hero-icon.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>

          {/* Bouton CTA */}
          <Link href="/accessible/diagnostic" style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: '#A122E2',
            padding: '0 32px',
            height: 48,
            borderRadius: 999,
            color: '#EEE9F3',
            fontSize: 18,
            fontWeight: 600,
            fontFamily: 'var(--font)',
            textDecoration: 'none',
            marginTop: 32,
            whiteSpace: 'nowrap',
          }}>
            Faire le diagnostique de mon festival
          </Link>

        </div>
      </section>

      <HomepageTagline />

      <HomepageHandicaps />

      {/* S'informer */}
      <section style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <span className="tag">S'informer</span>
          <h2 style={{ marginBottom: 32 }}>Bonnes pratiques & cadre légal</h2>
          <div className="grid-2">
            <Link href="/s-informer/bonnes-pratiques" className="card" style={{ display: 'block', textDecoration: 'none' }}>
              <div className="accent-line" />
              <h3 style={{ marginBottom: 8 }}>Les bonnes pratiques</h3>
              <p style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
                Des actions concrètes, filtrables par zone du festival et par type de handicap.
              </p>
              <span style={{ fontSize: 12, color: 'var(--muted)' }}>Voir les bonnes pratiques →</span>
            </Link>
            <Link href="/s-informer/les-lois" className="card" style={{ display: 'block', textDecoration: 'none' }}>
              <div className="accent-line" />
              <h3 style={{ marginBottom: 8 }}>Les lois</h3>
              <p style={{ fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
                Loi de 2005, ERP/IOP, arrêté de 2007 — ce que dit la loi pour votre festival.
              </p>
              <span style={{ fontSize: 12, color: 'var(--muted)' }}>Voir les lois →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Signalétiques */}
      <section style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
            <div>
              <span className="tag">Signalétiques</span>
              <h2>Pictogrammes prêts à télécharger</h2>
              <p style={{ fontSize: 14, color: 'var(--muted)', marginTop: 8, maxWidth: 480, lineHeight: 1.7 }}>
                Packs par type de besoin — style métal, haut contraste, prêts à imprimer.
              </p>
            </div>
            <Link href="/les-ressources" className="btn btn-primary" style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
              Voir le guide complet →
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {[
              { icon: '♿', label: 'PMR / mobilité réduite',         slug: 'pmr-mobilite-reduite' },
              { icon: '👁',  label: 'Malvoyants / non-voyants',      slug: 'malvoyants-non-voyants' },
              { icon: '🦻', label: 'Sourds / malentendants',          slug: 'sourds-malentendants' },
              { icon: '🧘', label: 'Espace de repos calme',           slug: 'espace-repos-calme' },
              { icon: '⭐', label: 'Accueil prioritaire',             slug: 'accueil-prioritaire' },
              { icon: '🐕', label: 'Chiens guides autorisés',         slug: 'chiens-guides' },
              { icon: '🚻', label: 'Sanitaires adaptés',              slug: 'sanitaires-adaptes' },
              { icon: '🔋', label: 'Recharge fauteuils',              slug: 'recharge-fauteuils' },
            ].map(p => (
              <Link
                key={p.slug}
                href={`/les-ressources#${p.slug}`}
                className="card"
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 12, padding: '24px 16px', textDecoration: 'none' }}
              >
                <span style={{ fontSize: 36, lineHeight: 1 }}>{p.icon}</span>
                <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', lineHeight: 1.4, margin: 0 }}>{p.label}</p>
                <span style={{ fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>
                  ↓ Télécharger
                </span>
              </Link>
            ))}
          </div>

          <style>{`
            @media (max-width: 768px) {
              .signa-grid { grid-template-columns: repeat(2, 1fr) !important; }
            }
          `}</style>
        </div>
      </section>

      {/* La fédération */}
      <section>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
            <span className="tag">La fédération</span>
            <h2 style={{ marginBottom: 16 }}>Fédération des Musiques Métal</h2>
            <p style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 24 }}>
              La FMM accompagne les organisateurs de festivals de metal pour rendre la scène plus inclusive. Formation, ressources, mise en réseau — nous sommes là pour que vous ne repartiez pas de zéro.
            </p>
            <Link href="/la-federation" style={{ fontSize: 13, color: 'var(--muted)', textDecoration: 'underline' }}>
              En savoir plus →
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--border)' }}>
            {[
              { n: '12M', l: 'Français en situation de handicap' },
              { n: '80%', l: 'Des handicaps sont invisibles' },
              { n: '4M', l: 'Personnes malentendantes' },
              { n: '1/5', l: 'Troubles psychiques au cours d\'une vie' },
            ].map(s => (
              <div key={s.n} style={{ background: 'var(--bg)', padding: '24px 20px' }}>
                <p style={{ fontSize: 32, fontFamily: 'var(--font)', fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>{s.n}</p>
                <p style={{ fontSize: 12, lineHeight: 1.5 }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
