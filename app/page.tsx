import HeroParallaxBarriers from "@/components/HeroParallaxBarriers";
import HomepageTagline from "@/components/HomepageTagline";
import HomepageHandicaps from "@/components/HomepageHandicaps";
import HomepageBonnesPratiques from "@/components/HomepageBonnesPratiques";
import HomepageFederation from "@/components/HomepageFederation";
import BtnPrimary from "@/components/BtnPrimary";

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
          <div style={{ marginTop: 32 }}>
            <BtnPrimary href="/accessible/ameliorer" label="Améliorer mon accessibilité" />
          </div>

        </div>
      </section>

      <HomepageTagline />

      <HomepageHandicaps />

      <HomepageBonnesPratiques />

      <HomepageFederation />
    </>
  );
}
