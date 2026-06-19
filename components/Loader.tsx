'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Loader({ onDone }: { onDone: () => void }) {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const cadRef   = useRef<HTMLImageElement>(null)
  const bodyRef  = useRef<HTMLImageElement>(null)
  const lkRef    = useRef<HTMLImageElement>(null)
  const smokeRef = useRef<HTMLDivElement>(null)
  const bLRef    = useRef<HTMLImageElement>(null)
  const bRRef    = useRef<HTMLImageElement>(null)
  const f1gRef   = useRef<HTMLImageElement>(null)
  const f2dRef   = useRef<HTMLImageElement>(null)
  const f3dRef   = useRef<HTMLImageElement>(null)
  const f2gRef   = useRef<HTMLImageElement>(null)
  const f1dRef   = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const frags = [f1gRef.current, f2dRef.current, f3dRef.current, f2gRef.current, f1dRef.current]

    gsap.set(cadRef.current,   { xPercent: -50, yPercent: -50, scale: 2.6 })
    gsap.set(bodyRef.current,  { xPercent: -50, yPercent: -50, opacity: 0 })
    gsap.set(lkRef.current,    { xPercent: -50, yPercent: -50, opacity: 0 })
    gsap.set(frags,            { xPercent: -50, yPercent: -50, opacity: 0 })
    gsap.set(smokeRef.current, { xPercent: -50, yPercent: -50, opacity: 0, scale: 0.5 })
    // Barrières : hors écran avec rotation forte
    gsap.set(bLRef.current, { x: '-140%', scale: 1.1, rotation: -28 })
    gsap.set(bRRef.current, { x:  '140%', scale: 1.1, rotation:  22 })

    const tl = gsap.timeline({
      delay: 0.2,
      onComplete: () => { onDone() },
    })

    // ── Phase 1 (0 → 0.2s): cadenas rétrécit, barrières glissent en rotation ──
    tl.to(cadRef.current, { scale: 1.0, duration: 0.2, ease: 'power2.inOut' })
    tl.to(bLRef.current,  { x: '0%', scale: 1.0, rotation: -8, duration: 0.2, ease: 'power3.out' }, '<')
    tl.to(bRRef.current,  { x: '0%', scale: 1.0, rotation:  5, duration: 0.2, ease: 'power3.out' }, '<')

    // ── Phase 2: cadenas → corps + locket qui s'ouvre ────────────────────────
    tl.to(cadRef.current, { opacity: 0, duration: 0.05 })
    tl.set(bodyRef.current, { opacity: 1 }, '<')
    tl.set(lkRef.current,   { opacity: 1, rotation: 0, y: 0 }, '<')
    tl.to(lkRef.current, { y: -22, rotation: -18, duration: 0.2, ease: 'power2.out' })
    tl.to(lkRef.current, { y: -38, rotation: 10, scale: 1.05, duration: 0.2, ease: 'power2.in' }, '+=0.02')

    // ── Phase 3: explosion + fumée ────────────────────────────────────────────
    tl.to([bodyRef.current, lkRef.current], { scale: 0.05, opacity: 0, duration: 0.08, ease: 'power4.in' })
    tl.to(smokeRef.current, { opacity: 1, duration: 0.03 }, '<')
    tl.to(smokeRef.current, { scale: 10, opacity: 0, duration: 0.2, ease: 'expo.out' }, '<+=0.03')
    tl.to(frags, { opacity: 1, duration: 0.04, stagger: 0.005 }, '<')

    // ── Phase 4: fragments s'éparpillent ─────────────────────────────────────
    tl.to(f1gRef.current, { x: '-52vw', y: '-36vh', opacity: 0, rotation: -55, filter: 'blur(5px)', duration: 0.2, ease: 'power2.in' }, '+=0.01')
    tl.to(f2dRef.current, { x:  '62vw', y: '-22vh', opacity: 0, rotation:  42, filter: 'blur(5px)', duration: 0.2, ease: 'power2.in' }, '<')
    tl.to(f3dRef.current, { x:  '44vw', y:  '62vh', opacity: 0, rotation:  28, filter: 'blur(5px)', duration: 0.2, ease: 'power2.in' }, '<')
    tl.to(f2gRef.current, { x: '-32vw', y:  '70vh', opacity: 0, rotation: -38, filter: 'blur(5px)', duration: 0.2, ease: 'power2.in' }, '<')
    tl.to(f1dRef.current, { x:  '30vw', y: '-55vh', opacity: 0, rotation:  62, filter: 'blur(5px)', duration: 0.2, ease: 'power2.in' }, '<')

    // ── Phase 5: overlay s'efface, hero apparaît ─────────────────────────────
    tl.to(wrapRef.current, { opacity: 0, duration: 0.2, ease: 'power2.inOut' }, '+=0.05')

    return () => { tl.kill() }
  }, [onDone])

  const blend: React.CSSProperties = { mixBlendMode: 'screen', pointerEvents: 'none', userSelect: 'none' }

  return (
    <div ref={wrapRef} style={{
      position: 'fixed', inset: 0, zIndex: 50,
      background: '#101010', overflow: 'hidden',
    }}>
      {/* Fumée — radial gradient qui explose du centre */}
      <div ref={smokeRef} style={{
        position: 'absolute', top: '50%', left: '50%',
        width: '60vmin', height: '60vmin',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(200,185,165,0.95) 0%, rgba(140,120,100,0.55) 35%, rgba(70,50,35,0) 70%)',
        filter: 'blur(22px)',
        mixBlendMode: 'screen',
        pointerEvents: 'none',
      }} />

      {/* Barrière gauche */}
      <img ref={bLRef} src="/loader/barriere-gauche.png" alt="" aria-hidden style={{
        ...blend, position: 'absolute', bottom: '-8%', left: '-4%', width: '38vw',
      }} />

      {/* Barrière droite */}
      <img ref={bRRef} src="/loader/barriere-droite.png" alt="" aria-hidden style={{
        ...blend, position: 'absolute', bottom: '-8%', right: '-4%', width: '38vw',
      }} />

      {/* Cadenas entier — phase 1 */}
      <img ref={cadRef} src="/loader/cadenas.png" alt="" aria-hidden style={{
        ...blend, position: 'absolute', top: '50%', left: '50%', width: '52vmin',
      }} />

      {/* Corps du cadenas sans locket — phase 2 */}
      <img ref={bodyRef} src="/loader/cadenasansnlocket.png" alt="" aria-hidden style={{
        ...blend, position: 'absolute', top: 'calc(50% + 4vmin)', left: '50%', width: '30vmin',
      }} />

      {/* Locket / anneau — phase 2, s'ouvre avant explosion */}
      <img ref={lkRef} src="/loader/locket.png" alt="" aria-hidden style={{
        ...blend, position: 'absolute', top: 'calc(50% - 10vmin)', left: '50%', width: '13vmin',
      }} />

      {/* Fragments */}
      <img ref={f1gRef} src="/loader/frag-gauche-1.png" alt="" aria-hidden style={{ ...blend, position: 'absolute', top: '50%', left: '50%', width: '14vmin' }} />
      <img ref={f2dRef} src="/loader/frag-droite-2.png" alt="" aria-hidden style={{ ...blend, position: 'absolute', top: '50%', left: '50%', width: '14vmin' }} />
      <img ref={f3dRef} src="/loader/frag-droite-3.png" alt="" aria-hidden style={{ ...blend, position: 'absolute', top: '50%', left: '50%', width: '14vmin' }} />
      <img ref={f2gRef} src="/loader/frag-gauche-2.png" alt="" aria-hidden style={{ ...blend, position: 'absolute', top: '50%', left: '50%', width: '12vmin' }} />
      <img ref={f1dRef} src="/loader/frag-droite-1.png" alt="" aria-hidden style={{ ...blend, position: 'absolute', top: '50%', left: '50%', width: '10vmin' }} />
    </div>
  )
}
