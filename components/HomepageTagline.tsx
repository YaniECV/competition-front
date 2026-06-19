'use client';
import { useEffect, useRef, useState } from 'react';

export default function HomepageTagline() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let observer: IntersectionObserver;
    const timer = setTimeout(() => {
      observer = new IntersectionObserver(
        ([entry]) => {
          setVisible(entry.isIntersecting);
        },
        { threshold: 0.15 }
      );
      observer.observe(el);
    }, 400);
    return () => { clearTimeout(timer); observer?.disconnect(); };
  }, []);

  const illus = (delay: number): React.CSSProperties => ({
    transition: `transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, opacity 0.5s ease ${delay}ms`,
    transform: visible ? 'scale(1)' : 'scale(0)',
    opacity: visible ? 1 : 0,
    transformOrigin: 'bottom center',
  });

  return (
    <section ref={sectionRef} className="tagline-section" style={{
      position: 'relative',
      background: '#101010',
      minHeight: 680,
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 40px',
    }}>

      <style>{`
        @media (max-width: 768px) {
          .tagline-panneau { display: none !important; }
          .tagline-section { min-height: unset !important; padding: 60px 20px !important; }
        }
      `}</style>

      {/* Illustrations gauche */}
      <img src="/tagline-gauche-1.png" alt="" aria-hidden className="tagline-panneau" style={{ position: 'absolute', height: 320, width: 'auto', left: 40, top: '50%', transform: visible ? 'translateY(-54%) translateX(0px) scale(1) rotate(0deg)' : 'translateY(-40%) translateX(-30px) scale(0) rotate(-12deg)', opacity: visible ? 1 : 0, transformOrigin: 'bottom center', transition: 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0ms, opacity 1s ease 0ms', pointerEvents: 'none', objectFit: 'contain' }} />
      <img src="/tagline-gauche-2.png" alt="" aria-hidden className="tagline-panneau" style={{ position: 'absolute', height: 220, width: 'auto', left: 220, top: '50%', transform: visible ? 'translateY(-40%) translateX(0px) scale(1) rotate(0deg)' : 'translateY(-28%) translateX(-20px) scale(0) rotate(10deg)', opacity: visible ? 1 : 0, transformOrigin: 'bottom center', transition: 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1) 150ms, opacity 1s ease 150ms', pointerEvents: 'none', objectFit: 'contain' }} />
      <img src="/tagline-gauche-3.png" alt="" aria-hidden className="tagline-panneau" style={{ position: 'absolute', height: 170, width: 'auto', left: 160, top: '50%', transform: visible ? 'translateY(10%) translateX(0px) scale(1) rotate(0deg)' : 'translateY(22%) translateX(-15px) scale(0) rotate(-8deg)', opacity: visible ? 1 : 0, transformOrigin: 'bottom center', transition: 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1) 300ms, opacity 1s ease 300ms', pointerEvents: 'none', objectFit: 'contain' }} />

      {/* Illustrations droite */}
      <img src="/tagline-droite-1.png" alt="" aria-hidden className="tagline-panneau" style={{ position: 'absolute', height: 300, width: 'auto', right: 40, top: '50%', transform: visible ? 'translateY(-60%) translateX(0px) scale(1) rotate(0deg)' : 'translateY(-48%) translateX(30px) scale(0) rotate(12deg)', opacity: visible ? 1 : 0, transformOrigin: 'bottom center', transition: 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0ms, opacity 1s ease 0ms', pointerEvents: 'none', objectFit: 'contain' }} />
      <img src="/tagline-droite-2.png" alt="" aria-hidden className="tagline-panneau" style={{ position: 'absolute', height: 190, width: 'auto', right: 260, top: '50%', transform: visible ? 'translateY(-20%) translateX(0px) scale(1) rotate(0deg)' : 'translateY(-8%) translateX(20px) scale(0) rotate(-10deg)', opacity: visible ? 1 : 0, transformOrigin: 'bottom center', transition: 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1) 150ms, opacity 1s ease 150ms', pointerEvents: 'none', objectFit: 'contain' }} />
      <img src="/tagline-droite-3.png" alt="" aria-hidden className="tagline-panneau" style={{ position: 'absolute', height: 200, width: 'auto', right: 120, top: '50%', transform: visible ? 'translateY(15%) translateX(0px) scale(1) rotate(0deg)' : 'translateY(27%) translateX(15px) scale(0) rotate(8deg)', opacity: visible ? 1 : 0, transformOrigin: 'bottom center', transition: 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1) 300ms, opacity 1s ease 300ms', pointerEvents: 'none', objectFit: 'contain' }} />

      {/* Contenu texte */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
        textAlign: 'center',
        maxWidth: 860,
      }}>
        <h2 style={{
          fontFamily: 'var(--font-title)',
          fontSize: 'clamp(2.4rem, 5.5vw, 5rem)',
          fontWeight: 400,
          color: '#EEE9F3',
          textTransform: 'uppercase',
          lineHeight: 1,
          letterSpacing: 0,
        }}>
          Votre festival de metal,<br />accessible à tous.
        </h2>
        <p style={{
          fontSize: 18,
          fontWeight: 500,
          lineHeight: 1.5,
          color: '#9491a1',
          maxWidth: 466,
        }}>
          12 millions de Français vivent avec un handicap. Beaucoup sont fans de metal et ne peuvent pas accéder à vos événements. Ce site vous donne les outils pour changer, gratuitement, étape par étape.
        </p>
      </div>
    </section>
  );
}
