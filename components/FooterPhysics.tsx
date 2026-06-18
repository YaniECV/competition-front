'use client';

import { useEffect, useRef } from 'react';

// Doubled quantity, bigger sizes, tight crop → body ratio 0.88
const ITEMS = [
  // ps1 × 6
  { src: '/footer-ps1.png', w: 240, h: 240 },
  { src: '/footer-ps1.png', w: 240, h: 240 },
  { src: '/footer-ps1.png', w: 240, h: 240 },
  { src: '/footer-ps1.png', w: 240, h: 240 },
  { src: '/footer-ps1.png', w: 240, h: 240 },
  { src: '/footer-ps1.png', w: 240, h: 240 },
  // ps2 × 6
  { src: '/footer-ps2.png', w: 240, h: 240 },
  { src: '/footer-ps2.png', w: 240, h: 240 },
  { src: '/footer-ps2.png', w: 240, h: 240 },
  { src: '/footer-ps2.png', w: 240, h: 240 },
  { src: '/footer-ps2.png', w: 240, h: 240 },
  { src: '/footer-ps2.png', w: 240, h: 240 },
  // ps3 × 6
  { src: '/footer-ps3.png', w: 240, h: 240 },
  { src: '/footer-ps3.png', w: 240, h: 240 },
  { src: '/footer-ps3.png', w: 240, h: 240 },
  { src: '/footer-ps3.png', w: 240, h: 240 },
  { src: '/footer-ps3.png', w: 240, h: 240 },
  { src: '/footer-ps3.png', w: 240, h: 240 },
  // broique × 6
  { src: '/footer-broique.png', w: 240, h: 126 },
  { src: '/footer-broique.png', w: 240, h: 126 },
  { src: '/footer-broique.png', w: 240, h: 126 },
  { src: '/footer-broique.png', w: 240, h: 126 },
  { src: '/footer-broique.png', w: 240, h: 126 },
  { src: '/footer-broique.png', w: 240, h: 126 },
  // barriere × 5
  { src: '/footer-barriere.png', w: 200, h: 158 },
  { src: '/footer-barriere.png', w: 200, h: 158 },
  { src: '/footer-barriere.png', w: 200, h: 158 },
  { src: '/footer-barriere.png', w: 200, h: 158 },
  { src: '/footer-barriere.png', w: 200, h: 158 },
  // icono × 5
  { src: '/footer-icono.png', w: 150, h: 192 },
  { src: '/footer-icono.png', w: 150, h: 192 },
  { src: '/footer-icono.png', w: 150, h: 192 },
  { src: '/footer-icono.png', w: 150, h: 192 },
  { src: '/footer-icono.png', w: 150, h: 192 },
  // panneau × 5
  { src: '/footer-panneau.png', w: 140, h: 220 },
  { src: '/footer-panneau.png', w: 140, h: 220 },
  { src: '/footer-panneau.png', w: 140, h: 220 },
  { src: '/footer-panneau.png', w: 140, h: 220 },
  { src: '/footer-panneau.png', w: 140, h: 220 },
  // chaine × 5
  { src: '/footer-chaine.png', w: 230, h: 62 },
  { src: '/footer-chaine.png', w: 230, h: 62 },
  { src: '/footer-chaine.png', w: 230, h: 62 },
  { src: '/footer-chaine.png', w: 230, h: 62 },
  { src: '/footer-chaine.png', w: 230, h: 62 },
];

const CONTAINER_HEIGHT = 820;
const BODY_RATIO = 0.88;

export default function FooterPhysics() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const startedRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animFrame: number;

    const init = async () => {
      const Matter = (await import('matter-js')).default;
      const width = container.offsetWidth;
      const height = CONTAINER_HEIGHT;

      const engine = Matter.Engine.create({ gravity: { x: 0, y: 2.8 } });

      const ground = Matter.Bodies.rectangle(width / 2, height + 25, width * 3, 50, { isStatic: true });
      const wallL  = Matter.Bodies.rectangle(-30, height / 2, 60, height * 4, { isStatic: true });
      const wallR  = Matter.Bodies.rectangle(width + 30, height / 2, 60, height * 4, { isStatic: true });

      const bodies = ITEMS.map((item) => {
        const x = 80 + Math.random() * Math.max(width - 160, 100);
        const y = -180 - Math.random() * 1200;
        return Matter.Bodies.rectangle(x, y, item.w * BODY_RATIO, item.h * BODY_RATIO, {
          restitution: 0.25,
          friction: 0.65,
          frictionAir: 0.016,
          angle: (Math.random() - 0.5) * Math.PI * 2,
          density: 0.003,
        });
      });

      Matter.Composite.add(engine.world, [ground, wallL, wallR, ...bodies]);

      const runner = Matter.Runner.create();
      Matter.Runner.run(runner, engine);

      const sync = () => {
        bodies.forEach((body, i) => {
          const el = itemRefs.current[i];
          if (el) {
            el.style.left      = `${body.position.x - ITEMS[i].w / 2}px`;
            el.style.top       = `${body.position.y - ITEMS[i].h / 2}px`;
            el.style.transform = `rotate(${body.angle}rad)`;
          }
        });
        animFrame = requestAnimationFrame(sync);
      };
      animFrame = requestAnimationFrame(sync);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          init();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: CONTAINER_HEIGHT,
        overflow: 'hidden',
        background: '#101010',
      }}
    >
      {ITEMS.map((item, i) => (
        <div
          key={i}
          ref={el => { itemRefs.current[i] = el; }}
          style={{
            position: 'absolute',
            width: item.w,
            height: item.h,
            pointerEvents: 'none',
            willChange: 'transform',
            left: -9999,
            top: -9999,
          }}
        >
          <img
            src={item.src}
            alt=""
            aria-hidden
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
          />
        </div>
      ))}
    </div>
  );
}
