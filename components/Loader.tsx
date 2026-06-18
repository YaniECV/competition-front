'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Loader({ onDone }: { onDone: () => void }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const cadRef  = useRef<HTMLImageElement>(null)
  const bLRef   = useRef<HTMLImageElement>(null)
  const bRRef   = useRef<HTMLImageElement>(null)
  const f1gRef  = useRef<HTMLImageElement>(null) // fragment 1 gauche (top-left)
  const f2dRef  = useRef<HTMLImageElement>(null) // fragment 2 droite (top-right)
  const f3dRef  = useRef<HTMLImageElement>(null) // fragment 3 droite (bottom-right)
  const f2gRef  = useRef<HTMLImageElement>(null) // fragment 2 gauche (bottom-left)
  const f1dRef  = useRef<HTMLImageElement>(null) // fragment 1 droite / locket (top)

  useEffect(() => {
    const frags = [f1gRef.current, f2dRef.current, f3dRef.current, f2gRef.current, f1dRef.current]

    // Set initial transform states (GSAP owns the transform, not CSS)
    gsap.set(cadRef.current, { xPercent: -50, yPercent: -50, scale: 2.1 })
    gsap.set(frags, { xPercent: -50, yPercent: -50, opacity: 0 })
    // Barriers start completely off-screen (applied immediately, before timeline delay)
    gsap.set(bLRef.current, { x: '-130%', scale: 1.08 })
    gsap.set(bRRef.current, { x:  '130%', scale: 1.08 })

    const tl = gsap.timeline({
      delay: 0.1,
      onComplete: () => {
        sessionStorage.setItem('loader-done', '1')
        onDone()
      },
    })

    // ── Phase 1 (0 → 1.8s): cadenas shrinks, barriers slide in ────────────
    tl.to(cadRef.current, { scale: 1.0, duration: 1.8, ease: 'power2.inOut' })
    tl.to(bLRef.current, { x: '0%', scale: 1.0, duration: 1.8, ease: 'power3.out' }, '<')
    tl.to(bRRef.current, { x: '0%', scale: 1.0, duration: 1.8, ease: 'power3.out' }, '<')

    // ── Phase 2 (1.8 → 2.2s): cadenas out → fragments in ─────────────────
    tl.to(cadRef.current, { scale: 0.45, opacity: 0, duration: 0.35, ease: 'power2.in' })
    tl.to(frags, { opacity: 1, duration: 0.18, stagger: 0.03 }, '<+=0.12')

    // ── Phase 3 (2.2 → 3.2s): fragments fly out ───────────────────────────
    tl.to(f1gRef.current, { x: '-44vw', y: '-32vh', opacity: 0, rotation: -15, duration: 0.95, ease: 'power2.in' }, '+=0.04')
    tl.to(f2dRef.current, { x:  '56vw', y: '-18vh', opacity: 0, rotation:  20, duration: 0.95, ease: 'power2.in' }, '<')
    tl.to(f3dRef.current, { x:  '38vw', y:  '56vh', opacity: 0, rotation:  10, duration: 0.95, ease: 'power2.in' }, '<')
    tl.to(f2gRef.current, { x: '-26vw', y:  '62vh', opacity: 0, rotation: -20, duration: 0.95, ease: 'power2.in' }, '<')
    tl.to(f1dRef.current, { x:  '24vw', y: '-44vh', opacity: 0, rotation:  30, duration: 0.95, ease: 'power2.in' }, '<')

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
      <img ref={f1gRef} src="/loader/frag-gauche-1.png" alt="" aria-hidden style={{ ...blend, position: 'absolute', top: '50%', left: '50%', width: '14vmin' }} />
      <img ref={f2dRef} src="/loader/frag-droite-2.png" alt="" aria-hidden style={{ ...blend, position: 'absolute', top: '50%', left: '50%', width: '14vmin' }} />
      <img ref={f3dRef} src="/loader/frag-droite-3.png" alt="" aria-hidden style={{ ...blend, position: 'absolute', top: '50%', left: '50%', width: '14vmin' }} />
      <img ref={f2gRef} src="/loader/frag-gauche-2.png" alt="" aria-hidden style={{ ...blend, position: 'absolute', top: '50%', left: '50%', width: '12vmin' }} />
      <img ref={f1dRef} src="/loader/frag-droite-1.png" alt="" aria-hidden style={{ ...blend, position: 'absolute', top: '50%', left: '50%', width: '10vmin' }} />
    </div>
  )
}
