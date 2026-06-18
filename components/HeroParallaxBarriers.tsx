"use client";
import { useEffect, useRef } from "react";

export default function HeroParallaxBarriers() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const offset = y * 0.14;
      if (leftRef.current) leftRef.current.style.transform = `translateX(${offset}px)`;
      if (rightRef.current) rightRef.current.style.transform = `translateX(${-offset}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Barrier gauche */}
      <div ref={leftRef} style={{ position: 'absolute', left: -53, top: '58%', width: 480, height: 394, pointerEvents: 'none', willChange: 'transform', zIndex: 2 }}>
        <div style={{ width: 448, height: 352, overflow: 'hidden', position: 'relative', transform: 'scaleY(-1) rotate(174.39deg)' }}>
          <img src="/hero-barrier.png" alt="" style={{ position: 'absolute', width: '153.41%', height: '194.95%', left: '-26.7%', top: '-47.47%', maxWidth: 'none' }} />
        </div>
      </div>

      {/* Barrier droite */}
      <div ref={rightRef} style={{ position: 'absolute', right: -105, top: '18%', width: 482, height: 400, pointerEvents: 'none', willChange: 'transform', zIndex: 2 }}>
        <div style={{ width: 442, height: 348, overflow: 'hidden', position: 'relative', transform: 'scaleY(-1) rotate(172.87deg)' }}>
          <img src="/hero-barrier.png" alt="" style={{ position: 'absolute', width: '153.41%', height: '194.95%', left: '-26.7%', top: '-47.47%', maxWidth: 'none' }} />
        </div>
      </div>
    </>
  );
}
