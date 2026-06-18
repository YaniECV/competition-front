'use client';
import { useState, useRef, useEffect } from 'react'
import { ArrowRight, CaretDown, MagnifyingGlass } from '@phosphor-icons/react/dist/ssr'
import { lois } from '../data/lois'

type HandicapKey = 'moteur' | 'visuel' | 'auditif' | 'autisme' | 'psychologique' | 'invisible'

const handicapOptions: { key: HandicapKey; label: string }[] = [
  { key: 'moteur', label: 'Moteur' },
  { key: 'visuel', label: 'Visuel' },
  { key: 'auditif', label: 'Auditif' },
  { key: 'autisme', label: 'Autisme / TSA' },
  { key: 'psychologique', label: 'Troubles psychiques' },
  { key: 'invisible', label: 'Invisible' },
]

const tagStyle: React.CSSProperties = {
  background: '#4a0f68',
  borderRadius: 8,
  padding: '8px',
  fontFamily: 'var(--font)',
  fontSize: 14,
  fontWeight: 500,
  color: '#F1EDF5',
  lineHeight: 1,
  whiteSpace: 'nowrap',
}

function LoiCard({ loi }: { loi: typeof lois[0] }) {
  const [btnHovered, setBtnHovered] = useState(false)
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 24,
      paddingTop: 24,
      paddingBottom: 24,
      borderBottom: '1px solid #3b3b39',
    }}>
      <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
        <p style={{ fontFamily: 'var(--font)', fontSize: 24, fontWeight: 500, lineHeight: 1.1, color: '#F1EDF5', margin: 0 }}>
          {loi.titre}
        </p>
        <p style={{ fontFamily: 'var(--font)', fontSize: 16, fontWeight: 400, lineHeight: 1.3, color: '#9491a1', margin: 0 }}>
          {loi.contenu}
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <span style={tagStyle}>{loi.source}</span>
        </div>
      </div>

      <div
        onMouseEnter={() => setBtnHovered(true)}
        onMouseLeave={() => setBtnHovered(false)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 16,
          background: btnHovered ? '#A122E2' : 'transparent',
          border: btnHovered ? 'none' : '1.5px solid #F1EDF5',
          borderRadius: 12,
          paddingLeft: 24,
          paddingRight: 4,
          paddingTop: 4,
          paddingBottom: 4,
          flexShrink: 0,
          cursor: 'pointer',
          transition: 'background 0.2s ease',
        }}
      >
        <span style={{ fontFamily: 'var(--font)', fontSize: 16, fontWeight: 500, color: '#F1EDF5', lineHeight: 1.1, whiteSpace: 'nowrap' }}>
          En savoir plus
        </span>
        <span style={{
          width: 32, height: 32, borderRadius: 8,
          background: btnHovered ? '#EEE9F3' : '#A122E2',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, transition: 'background 0.2s ease',
        }}>
          <ArrowRight size={16} weight="regular" color={btnHovered ? '#A122E2' : '#EEE9F3'} />
        </span>
      </div>
    </div>
  )
}

export function LesLois() {
  const heroRef = useRef<HTMLElement>(null)
  const [heroVisible, setHeroVisible] = useState(false)
  const [activeHandicaps, setActiveHandicaps] = useState<HandicapKey[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [openDropdown, setOpenDropdown] = useState(false)

  useEffect(() => {
    const el = heroRef.current; if (!el) return
    let observer: IntersectionObserver
    const timer = setTimeout(() => {
      observer = new IntersectionObserver(([entry]) => { setHeroVisible(entry.isIntersecting) }, { threshold: 0.15 })
      observer.observe(el)
    }, 400)
    return () => { clearTimeout(timer); observer?.disconnect() }
  }, [])

  const toggleHandicap = (key: HandicapKey) =>
    setActiveHandicaps(prev => prev.includes(key) ? prev.filter(h => h !== key) : [...prev, key])

  const filtered = lois.filter((l) => {
    if (activeHandicaps.length > 0 && !l.handicaps.some(h => activeHandicaps.includes(h as HandicapKey))) return false
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      if (!l.titre.toLowerCase().includes(q) && !l.contenu.toLowerCase().includes(q)) return false
    }
    return true
  })

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} style={{
        background: '#101010',
        paddingTop: 240,
        paddingBottom: 120,
        paddingLeft: 40,
        paddingRight: 40,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center', width: 708, maxWidth: '100%', position: 'relative', zIndex: 1 }}>
          <img src="/cadre-carre-2.png" alt="" aria-hidden style={{
            width: 80, height: 80, objectFit: 'contain', pointerEvents: 'none',
            transformOrigin: 'bottom center',
            transform: heroVisible ? 'scale(1)' : 'scale(0)',
            opacity: heroVisible ? 1 : 0,
            transition: 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0ms, opacity 1s ease 0ms',
          }} />
          <h1 style={{ fontFamily: 'var(--font-title)', fontSize: 80, fontWeight: 400, color: '#EEE9F3', textTransform: 'uppercase', lineHeight: 1, letterSpacing: 0, textAlign: 'center', margin: 0, width: '100%' }}>
            Les lois
          </h1>
          <p style={{ fontFamily: 'var(--font)', fontSize: 18, fontWeight: 400, lineHeight: 1.1, color: '#EEE9F3', textAlign: 'center', maxWidth: 466, margin: 0 }}>
            Les textes qui s'appliquent aux festivals. Savoir ce qu'on doit faire est le premier pas pour le faire.
          </p>
        </div>
      </section>

      {/* Filtres + Liste */}
      <div style={{ background: '#101010', padding: '56px 160px 80px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

          {openDropdown && (
            <div style={{ position: 'fixed', inset: 0, zIndex: 10 }} onClick={() => setOpenDropdown(false)} />
          )}

          {/* Barre filtres */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>

                {/* Dropdown Type de handicap */}
                <div style={{ position: 'relative', zIndex: 11 }}>
                  <button
                    onClick={() => setOpenDropdown(!openDropdown)}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 12, padding: '10px 16px',
                      background: 'transparent',
                      border: activeHandicaps.length > 0 ? '1.5px solid #A122E2' : '1.5px solid #F1EDF5',
                      borderRadius: 12, fontFamily: 'var(--font)', fontSize: 16, fontWeight: 500,
                      color: activeHandicaps.length > 0 ? '#A122E2' : '#F1EDF5',
                      cursor: 'pointer', whiteSpace: 'nowrap', transition: 'border-color 0.2s ease, color 0.2s ease',
                    }}
                  >
                    Type de handicap
                    <CaretDown size={14} weight="bold" color={activeHandicaps.length > 0 ? '#A122E2' : '#F1EDF5'} style={{ transform: openDropdown ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s', flexShrink: 0 }} />
                  </button>
                  {openDropdown && (
                    <div style={{ position: 'absolute', top: 'calc(100% + 8px)', left: 0, background: '#1c1c1c', border: '1.5px solid #3b3b39', borderRadius: 12, minWidth: 220, boxShadow: '0 8px 24px rgba(0,0,0,0.5)', overflow: 'hidden' }}>
                      {handicapOptions.map((o, i) => {
                        const selected = activeHandicaps.includes(o.key)
                        return (
                          <button key={o.key} onClick={() => toggleHandicap(o.key)} style={{
                            display: 'flex', alignItems: 'center', gap: 12,
                            width: '100%', textAlign: 'left', padding: '12px 16px',
                            fontFamily: 'var(--font)', fontSize: 16, fontWeight: 500,
                            color: selected ? '#F1EDF5' : '#9491a1',
                            background: 'transparent',
                            border: 'none', borderBottom: '1px solid #2e2e2e', cursor: 'pointer',
                          }}>
                            <span style={{
                              width: 18, height: 18, borderRadius: 4, flexShrink: 0,
                              border: selected ? 'none' : '1.5px solid #3b3b39',
                              background: selected ? '#A122E2' : 'transparent',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              transition: 'background 0.15s ease',
                            }}>
                              {selected && (
                                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                  <path d="M1 4L3.5 6.5L9 1" stroke="#EEE9F3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </span>
                            {o.label}
                          </button>
                        )
                      })}
                      <button onClick={() => { setActiveHandicaps([]); setOpenDropdown(false) }} style={{
                        display: 'flex', alignItems: 'center', gap: 12,
                        width: '100%', textAlign: 'left', padding: '12px 16px',
                        fontFamily: 'var(--font)', fontSize: 16, fontWeight: 500,
                        color: activeHandicaps.length === 0 ? '#F1EDF5' : '#9491a1',
                        background: activeHandicaps.length === 0 ? 'rgba(161,34,226,0.15)' : 'transparent',
                        border: 'none', cursor: 'pointer',
                      }}>
                        <span style={{
                          width: 18, height: 18, borderRadius: 4, flexShrink: 0,
                          border: activeHandicaps.length === 0 ? 'none' : '1.5px solid #3b3b39',
                          background: activeHandicaps.length === 0 ? '#A122E2' : 'transparent',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          {activeHandicaps.length === 0 && (
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                              <path d="M1 4L3.5 6.5L9 1" stroke="#EEE9F3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </span>
                        Tout public
                      </button>
                    </div>
                  )}
                </div>

                {/* Barre de recherche */}
                <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <MagnifyingGlass size={16} weight="regular" color="#9491a1" style={{ position: 'absolute', left: 16, pointerEvents: 'none' }} />
                  <input
                    type="text"
                    placeholder="Rechercher une loi..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 16px 10px 42px',
                      background: 'transparent',
                      border: searchQuery ? '1.5px solid #A122E2' : '1.5px solid #F1EDF5',
                      borderRadius: 12,
                      fontFamily: 'var(--font)', fontSize: 16, fontWeight: 400,
                      color: '#F1EDF5',
                      outline: 'none',
                      transition: 'border-color 0.2s ease',
                    }}
                  />
                </div>
              </div>

              {/* Compteur */}
              <span style={{ fontFamily: 'var(--font)', fontSize: 16, fontWeight: 400, color: '#9491a1', whiteSpace: 'nowrap', paddingLeft: 16 }}>
                {filtered.length} résultat{filtered.length !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Tags actifs */}
            {activeHandicaps.length > 0 && (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {activeHandicaps.map(h => (
                  <button key={h} onClick={() => toggleHandicap(h)} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '6px 10px 6px 12px', borderRadius: 8,
                    border: 'none', background: '#4a0f68',
                    fontFamily: 'var(--font)', fontSize: 14, fontWeight: 500,
                    color: '#F1EDF5', cursor: 'pointer', lineHeight: 1,
                  }}>
                    {handicapOptions.find(o => o.key === h)?.label}
                    <span style={{ fontSize: 14, color: 'rgba(241,237,245,0.6)', lineHeight: 1 }}>✕</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Liste */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {filtered.length === 0 ? (
              <p style={{ fontFamily: 'var(--font)', fontSize: 16, color: '#9491a1' }}>Aucune loi pour ces filtres.</p>
            ) : (
              filtered.map((l) => <LoiCard key={l.slug} loi={l} />)
            )}
          </div>
        </div>
      </div>
    </>
  )
}
