'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Loader({ onDone }: { onDone: () => void }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const cadRef  = useRef<HTMLImageElement>(null)
  const bLRef   = useRef<HTMLImageElement>(null)
  const bRRef   = useRef<HTMLImageElement>(null)
  const p1Ref   = useRef<HTMLImageElement>(null)
  const p2Ref   = useRef<HTMLImageElement>(null)
  const p3Ref   = useRef<HTMLImageElement>(null)
  const p4Ref   = useRef<HTMLImageElement>(null)
  const anRef   = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const frags = [p1Ref.current, p2Ref.current, p3Ref.current, p4Ref.current, anRef.current]

    // Set initial transform states (GSAP owns the transform, not CSS)
    gsap.set(cadRef.current, { xPercent: -50, yPercent: -50, scale: 2.1 })
    gsap.set(frags, { xPercent: -50, yPercent: -50, opacity: 0 })

    const tl = gsap.timeline({
      delay: 0.1,
      onComplete: () => {
        sessionStorage.setItem('loader-done', '1')
        onDone()
      },
    })

    // ── Phase 1 (0 → 1.8s): cadenas shrinks, barriers slide in ────────────
    tl.to(cadRef.current, { scale: 1.0, duration: 1.8, ease: 'power2.inOut' })
    tl.fromTo(bLRef.current, { x: '-120%' }, { x: '0%', duration: 1.8, ease: 'power3.out' }, '<')
    tl.fromTo(bRRef.current, { x:  '120%' }, { x: '0%', duration: 1.8, ease: 'power3.out' }, '<')

    // ── Phase 2 (1.8 → 2.2s): cadenas out → fragments in ─────────────────
    tl.to(cadRef.current, { scale: 0.45, opacity: 0, duration: 0.35, ease: 'power2.in' })
    tl.to(frags, { opacity: 1, duration: 0.18, stagger: 0.03 }, '<+=0.12')

    // ── Phase 3 (2.2 → 3.2s): fragments fly out ───────────────────────────
    tl.to(p1Ref.current, { x: '-44vw', y: '-32vh', opacity: 0, rotation: -15, duration: 0.95, ease: 'power2.in' }, '+=0.04')
    tl.to(p2Ref.current, { x:  '56vw', y: '-18vh', opacity: 0, rotation:  20, duration: 0.95, ease: 'power2.in' }, '<')
    tl.to(p3Ref.current, { x:  '38vw', y:  '56vh', opacity: 0, rotation:  10, duration: 0.95, ease: 'power2.in' }, '<')
    tl.to(p4Ref.current, { x: '-26vw', y:  '62vh', opacity: 0, rotation: -20, duration: 0.95, ease: 'power2.in' }, '<')
    tl.to(anRef.current,  { x:  '24vw', y: '-44vh', opacity: 0, rotation:  30, duration: 0.95, ease: 'power2.in' }, '<')

    // ── Phase 4 (3.2 → 3.7s): overlay fades out ───────────────────────────
    tl.to(wrapRef.current, { opacity: 0, duration: 0.5, ease: 'power2.inOut' }, '+=0.08')

    return () => { tl.kill() }
  }, [onDone])

  const blend: React.CSSProperties = { mixBlendMode: 'screen', pointerEvents: 'none', userSelect: 'none' }

  return (
    <div ref={wrapRef} style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#101010', overflow: 'hidden',
    }}>
      {/* Barrière gauche */}
      <img ref={bLRef} src="/loader/barriere-gauche.png" alt="" aria-hidden style={{
        ...blend,
        position: 'absolute', bottom: '-8%', left: '-4%',
        width: '38vw',
      }} />

      {/* Barrière droite */}
      <img ref={bRRef} src="/loader/barriere-droite.png" alt="" aria-hidden style={{
        ...blend,
        position: 'absolute', bottom: '-8%', right: '-4%',
        width: '38vw',
      }} />

      {/* Cadenas intact */}
      <img ref={cadRef} src="/loader/cadenas.png" alt="" aria-hidden style={{
        ...blend,
        position: 'absolute', top: '50%', left: '50%',
        width: '52vmin',
      }} />

      {/* Fragments — positionnés au centre, animés en dehors par GSAP */}
      <img ref={p1Ref} src="/loader/piece1.png" alt="" aria-hidden style={{ ...blend, position: 'absolute', top: '50%', left: '50%', width: '9vmin' }} />
      <img ref={p2Ref} src="/loader/piece2.png" alt="" aria-hidden style={{ ...blend, position: 'absolute', top: '50%', left: '50%', width: '9vmin' }} />
      <img ref={p3Ref} src="/loader/piece3.png" alt="" aria-hidden style={{ ...blend, position: 'absolute', top: '50%', left: '50%', width: '9vmin' }} />
      <img ref={p4Ref} src="/loader/piece4.png" alt="" aria-hidden style={{ ...blend, position: 'absolute', top: '50%', left: '50%', width: '8vmin' }} />
      <img ref={anRef}  src="/loader/anneau.png"  alt="" aria-hidden style={{ ...blend, position: 'absolute', top: '50%', left: '50%', width: '7vmin' }} />
    </div>
  )
}
