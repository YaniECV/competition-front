import { useState } from 'react'
import { Link } from 'react-router-dom'

export function AgirIndex() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <span className="tag">02 — Agir</span>
          <h1>Bonnes pratiques</h1>
          <p style={{ fontSize: 16, maxWidth: 540, marginTop: 16, lineHeight: 1.7 }}>
            Des actions concrètes classées par effort, domaine et type de handicap. Trouvez ce qui correspond à votre situation en quelques secondes.
          </p>
        </div>
      </div>
      <div className="container" style={{ paddingBottom: 80 }}>
        <div className="grid-2">
          {[
            { to: '/agir/debuter', label: 'Comment débuter', desc: 'Les 5 réflexes clés · Par où commencer' },
            { to: '/agir/zones', label: 'Par zone du festival', desc: 'Accès · Scène · Sanitaires · Accueil · Hébergement' },
            { to: '/agir/exemples', label: 'Exemples de festivals', desc: 'Témoignages · Cas concrets · Retours d\'expérience' },
            { to: '/agir/diagnostic', label: 'Diagnostic personnalisé', desc: 'Formulaire interactif → rapport adapté à votre festival', highlight: true },
          ].map(c => (
            <Link key={c.to} to={c.to} className="card" style={{ display: 'block', textDecoration: 'none', background: c.highlight ? 'var(--text)' : '#fff' }}>
              <div className="accent-line" style={{ background: c.highlight ? '#fff' : 'var(--border2)' }} />
              <h3 style={{ marginBottom: 8, color: c.highlight ? '#fff' : 'var(--text)' }}>{c.label}</h3>
              <p style={{ fontSize: 13, color: c.highlight ? 'rgba(255,255,255,0.7)' : 'var(--muted)' }}>{c.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export function AgirDebuter() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <Link to="/agir" style={{ fontSize: 12, color: 'var(--muted)', display: 'inline-block', marginBottom: 20 }}>← Agir</Link>
          <span className="tag">02 — Agir</span>
          <h1>Comment débuter</h1>
          <p style={{ fontSize: 16, maxWidth: 500, marginTop: 16, lineHeight: 1.7 }}>
            5 actions gratuites et organisationnelles pour un impact immédiat.
          </p>
        </div>
      </div>
      <div className="container" style={{ paddingBottom: 80 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 48 }}>
          {[
            { n: '01', t: 'Désigner un référent accessibilité', d: 'Un point de contact clair (nom, tél, mail, SMS pendant l\'event) diffusé sur tous vos supports.' },
            { n: '02', t: 'Créer une page accessibilité sur votre site', d: 'Centraliser accès, services, tarifs et contact. La rendre repérable dès la page d\'accueil.' },
            { n: '03', t: 'Être transparent sur les limites', d: 'Lister les obstacles connus et les contournements proposés. Une info honnête vaut mieux qu\'une promesse non tenue.' },
            { n: '04', t: 'Concerter des personnes en situation de handicap', d: 'Solliciter des associations locales ou des bénévoles concernés pour tester vos supports.' },
            { n: '05', t: 'Aménager un espace de repos calme', d: 'Une zone à l\'écart du bruit, avec assises, signalée sur le plan. Particulièrement utile en festival metal.' },
          ].map(s => (
            <div key={s.n} className="card" style={{ display: 'flex', gap: 20 }}>
              <span style={{ fontSize: 13, fontFamily: 'var(--font)', color: 'var(--muted)', minWidth: 28, paddingTop: 1 }}>{s.n}</span>
              <div>
                <h3 style={{ marginBottom: 6 }}>{s.t}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.6 }}>{s.d}</p>
              </div>
            </div>
          ))}
        </div>
        <Link to="/agir/diagnostic" className="btn btn-primary">Faire mon diagnostic →</Link>
      </div>
    </>
  )
}

export function AgirZones() {
  const zones = [
    {
      label: 'Accès & déplacements',
      items: ['Parking PMR (2% min)', 'Cheminement 1,40m min sans marches', 'Tapis et rampes de franchissement', 'Navette adaptée + dépose-minute signalé'],
    },
    {
      label: 'Accueil & orientation',
      items: ['Point d\'accueil identifiable avec file prioritaire', 'Équipe identifiable (couleur/pictogramme)', 'Communication écrite disponible (papier/stylo)', 'Formation bénévoles'],
    },
    {
      label: 'Scène & spectacle',
      items: ['Plateforme PMR face à la scène', 'Sous-titrage / surtitrage', 'Boucle à induction magnétique (BIM)', 'Interprétariat LSF sur temps forts'],
    },
    {
      label: 'Services & confort',
      items: ['Sanitaires PMR signalés et accessibles', 'Espace calme à l\'écart', 'Alarme visuelle d\'urgence', 'Accueil chiens guides (eau + zone d\'aisance)'],
    },
    {
      label: 'Information & communication',
      items: ['Supports FALC + pictogrammes', 'Page accessibilité sur le site', 'Transparence sur les limites', 'Contact référent diffusé'],
    },
    {
      label: 'Inclusion & médiation',
      items: ['Brigade d\'accompagnement bénévole', 'Partenariat association locale', 'Artistes/intervenants en situation de handicap'],
    },
  ]

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <Link to="/agir" style={{ fontSize: 12, color: 'var(--muted)', display: 'inline-block', marginBottom: 20 }}>← Agir</Link>
          <span className="tag">02 — Agir</span>
          <h1>Par zone du festival</h1>
        </div>
      </div>
      <div className="container" style={{ paddingBottom: 80 }}>
        <div className="grid-2">
          {zones.map(z => (
            <div key={z.label} className="card">
              <h3 style={{ marginBottom: 16 }}>{z.label}</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {z.items.map(item => (
                  <li key={item} style={{ display: 'flex', gap: 10, fontSize: 13, color: 'var(--muted)' }}>
                    <span style={{ flexShrink: 0 }}>□</span><span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export function AgirExemples() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <Link to="/agir" style={{ fontSize: 12, color: 'var(--muted)', display: 'inline-block', marginBottom: 20 }}>← Agir</Link>
          <span className="tag">02 — Agir</span>
          <h1>Exemples de festivals</h1>
          <p style={{ fontSize: 16, maxWidth: 500, marginTop: 16, lineHeight: 1.7 }}>
            Retours d'expérience concrets. Ce que d'autres ont mis en place — et comment.
          </p>
        </div>
      </div>
      <div className="container" style={{ paddingBottom: 80 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { festival: 'Delta Festival — Marseille', action: 'Brigade "Safe Delta"', desc: 'Gilets violets, maraudes tout au long de l\'évènement, lien constant avec la sécurité. Une équipe bénévole identifiable pour accompagner et rassurer.' },
            { festival: 'Rock en Seine', action: 'Gilets vibrants', desc: 'Permet au public sourd/malentendant de ressentir la musique. Particulièrement pertinent pour un festival metal à fort volume.' },
            { festival: 'Eurockéennes de Belfort', action: 'Espace "All Access"', desc: 'Espace mêlant public valide et en situation de handicap, projets artistiques associant culture et handicap.' },
            { festival: 'Musilac', action: 'Label "H+ Culture"', desc: 'Plateforme PSH labellisée, modèle pour l\'accueil renforcé. Accessible de l\'entrée jusqu\'aux coulisses.' },
          ].map(e => (
            <div key={e.festival} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 12 }}>
                <h3>{e.festival}</h3>
                <span style={{ fontSize: 11, fontFamily: 'var(--font)', border: '1px solid var(--border)', padding: '2px 8px', color: 'var(--muted)', whiteSpace: 'nowrap' }}>{e.action}</span>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.7 }}>{e.desc}</p>
            </div>
          ))}
        </div>
        <div className="wf-block" style={{ marginTop: 24 }}>
          [Section témoignages à compléter — organisateurs de petits festivals de metal]
        </div>
      </div>
    </>
  )
}

type Step = 'jauge' | 'terrain' | 'budget' | 'handicaps' | 'result'

export function AgirDiagnostic() {
  const [step, setStep] = useState<Step>('jauge')
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})

  const steps: Step[] = ['jauge', 'terrain', 'budget', 'handicaps', 'result']
  const stepIdx = steps.indexOf(step)

  const set = (key: string, val: string) => setAnswers(prev => ({ ...prev, [key]: val }))

  const toggleHandicap = (h: string) => {
    const current = (answers.handicaps as string[]) || []
    const next = current.includes(h) ? current.filter(x => x !== h) : [...current, h]
    setAnswers(prev => ({ ...prev, handicaps: next }))
  }

  const handicapsList = ['Moteur', 'Visuel', 'Auditif', 'Autisme', 'Psychologique', 'Invisibles']

  const getRecos = () => {
    const jauge = answers.jauge as string
    const budget = answers.budget as string
    const recos: string[] = []
    recos.push('Désigner un référent accessibilité (gratuit)')
    recos.push('Créer une page accessibilité sur votre site (gratuit)')
    recos.push('Aménager un espace de repos calme (faible coût)')
    if (budget === 'moyen' || budget === 'grand') {
      recos.push('Former les bénévoles avec une association locale')
      recos.push('Installer une boucle magnétique (BIM)')
    }
    if (budget === 'grand') {
      recos.push('Plateforme PMR devant la scène')
      recos.push('Interprétariat LSF sur les temps forts')
    }
    if (jauge === 'grand') {
      recos.push('Brigade d\'accompagnement bénévole dédiée')
      recos.push('Navette adaptée + dépose-minute signalé')
    }
    return recos
  }

  return (
    <>
      <div className="page-hero">
        <div className="container">
          <Link to="/agir" style={{ fontSize: 12, color: 'var(--muted)', display: 'inline-block', marginBottom: 20 }}>← Agir</Link>
          <span className="tag">02 — Agir</span>
          <h1>Diagnostic personnalisé</h1>
          <p style={{ fontSize: 16, maxWidth: 500, marginTop: 16, lineHeight: 1.7 }}>
            Répondez à 4 questions pour obtenir un plan d'action adapté à votre festival.
          </p>
        </div>
      </div>
      <div className="container" style={{ paddingBottom: 80, maxWidth: 700 }}>

        <div style={{ display: 'flex', gap: 0, marginBottom: 40, border: '1px solid var(--border)' }}>
          {steps.slice(0, 4).map((s, i) => (
            <div key={s} style={{ flex: 1, padding: '10px 0', textAlign: 'center', fontSize: 11, fontFamily: 'var(--font)', background: stepIdx >= i ? 'var(--text)' : 'transparent', color: stepIdx >= i ? '#fff' : 'var(--muted)', borderRight: i < 3 ? '1px solid var(--border)' : 'none' }}>
              {i + 1}
            </div>
          ))}
        </div>

        {step === 'jauge' && (
          <div>
            <h2 style={{ marginBottom: 24 }}>Quelle est la jauge de votre festival ?</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[['petit', '< 500 personnes'], ['moyen', '500 à 2 000 personnes'], ['grand', '> 2 000 personnes']].map(([val, label]) => (
                <button key={val} onClick={() => { set('jauge', val); setStep('terrain') }}
                  className="card" style={{ textAlign: 'left', cursor: 'pointer', border: answers.jauge === val ? '1px solid var(--text)' : '1px solid var(--border)', background: answers.jauge === val ? 'var(--bg2)' : '#fff' }}>
                  <span style={{ fontSize: 14 }}>{label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'terrain' && (
          <div>
            <h2 style={{ marginBottom: 24 }}>Quel type de terrain ?</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[['dur', 'Surface dure (asphalte, béton, bois)'], ['herbe', 'Herbe / terrain meuble'], ['mixte', 'Mixte']].map(([val, label]) => (
                <button key={val} onClick={() => { set('terrain', val); setStep('budget') }}
                  className="card" style={{ textAlign: 'left', cursor: 'pointer', border: answers.terrain === val ? '1px solid var(--text)' : '1px solid var(--border)', background: answers.terrain === val ? 'var(--bg2)' : '#fff' }}>
                  <span style={{ fontSize: 14 }}>{label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'budget' && (
          <div>
            <h2 style={{ marginBottom: 24 }}>Quel budget accessibilité pouvez-vous mobiliser ?</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[['zero', 'Aucun (actions organisationnelles uniquement)'], ['petit', '< 500 €'], ['moyen', '500 € à 2 000 €'], ['grand', '> 2 000 €']].map(([val, label]) => (
                <button key={val} onClick={() => { set('budget', val); setStep('handicaps') }}
                  className="card" style={{ textAlign: 'left', cursor: 'pointer', border: answers.budget === val ? '1px solid var(--text)' : '1px solid var(--border)', background: answers.budget === val ? 'var(--bg2)' : '#fff' }}>
                  <span style={{ fontSize: 14 }}>{label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'handicaps' && (
          <div>
            <h2 style={{ marginBottom: 8 }}>Quels publics voulez-vous prioriser ?</h2>
            <p style={{ fontSize: 13, marginBottom: 24 }}>Sélectionnez un ou plusieurs.</p>
            <div className="grid-2" style={{ marginBottom: 24 }}>
              {handicapsList.map(h => {
                const selected = ((answers.handicaps as string[]) || []).includes(h)
                return (
                  <button key={h} onClick={() => toggleHandicap(h)}
                    className="card" style={{ textAlign: 'left', cursor: 'pointer', border: selected ? '1px solid var(--text)' : '1px solid var(--border)', background: selected ? 'var(--bg3)' : '#fff' }}>
                    <span style={{ fontSize: 14, fontFamily: 'var(--font)' }}>{selected ? '✓ ' : ''}{h}</span>
                  </button>
                )
              })}
            </div>
            <button className="btn btn-primary" onClick={() => setStep('result')}>Voir mon diagnostic →</button>
          </div>
        )}

        {step === 'result' && (
          <div>
            <h2 style={{ marginBottom: 24 }}>Votre plan d'action</h2>
            <div style={{ marginBottom: 24, padding: '16px', background: 'var(--bg2)', border: '1px solid var(--border)', fontSize: 13, fontFamily: 'var(--font)', color: 'var(--muted)' }}>
              Festival {answers.jauge} · Terrain {answers.terrain} · Budget {answers.budget}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 32 }}>
              {getRecos().map((r, i) => (
                <div key={i} className="card" style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 13, fontFamily: 'var(--font)', color: 'var(--muted)', minWidth: 24 }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ fontSize: 14 }}>{r}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button className="btn btn-outline" onClick={() => { setStep('jauge'); setAnswers({}) }}>Recommencer</button>
              <a href="https://www.helloasso.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Audit complet avec un professionnel →
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
