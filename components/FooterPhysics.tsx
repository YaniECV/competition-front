'use client';

import { useEffect, useRef } from 'react';

const ITEMS = [
  // photoscan 1 (fist/thumbs) × 3
  { src: '/footer-ps1.png', w: 200, h: 200 },
  { src: '/footer-ps1.png', w: 200, h: 200 },
  { src: '/footer-ps1.png', w: 200, h: 200 },
  // photoscan 2 (scales) × 3
  { src: '/footer-ps2.png', w: 200, h: 200 },
  { src: '/footer-ps2.png', w: 200, h: 200 },
  { src: '/footer-ps2.png', w: 200, h: 200 },
  // photoscan 3 (object) × 3
  { src: '/footer-ps3.png', w: 200, h: 200 },
  { src: '/footer-ps3.png', w: 200, h: 200 },
  { src: '/footer-ps3.png', w: 200, h: 200 },
  // broique (barrier) × 3
  { src: '/footer-broique.png', w: 200, h: 105 },
  { src: '/footer-broique.png', w: 200, h: 105 },
  { src: '/footer-broique.png', w: 200, h: 105 },
  // barriere icon × 3
  { src: '/footer-barriere.png', w: 160, h: 126 },
  { src: '/footer-barriere.png', w: 160, h: 126 },
  { src: '/footer-barriere.png', w: 160, h: 126 },
  // icono (scales icon) × 2
  { src: '/footer-icono.png', w: 118, h: 152 },
  { src: '/footer-icono.png', w: 118, h: 152 },
  // panneau (triangle sign) × 2
  { src: '/footer-panneau.png', w: 112, h: 180 },
  { src: '/footer-panneau.png', w: 112, h: 180 },
  // chaine × 2
  { src: '/footer-chaine.png', w: 180, h: 48 },
  { src: '/footer-chaine.png', w: 180, h: 48 },
];

const CONTAINER_HEIGHT = 680;

export default function FooterPhysics() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const startedRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let runner: import('matter-js').Runner;
    let engine: import('matter-js').Engine;
    let animFrame: number;
    let bodies: import('matter-js').Body[] = [];

    const init = async () => {
      const Matter = (await import('matter-js')).default;
      const width = container.offsetWidth;
      const height = CONTAINER_HEIGHT;

      engine = Matter.Engine.create({ gravity: { x: 0, y: 2.5 } });

      // Static boundaries
      const ground = Matter.Bodies.rectangle(width / 2, height + 25, width * 3, 50, { isStatic: true });
      const wallL  = Matter.Bodies.rectangle(-30, height / 2, 60, height * 4, { isStatic: true });
      const wallR  = Matter.Bodies.rectangle(width + 30, height / 2, 60, height * 4, { isStatic: true });

      // Physics bodies — start above container with random spread
      bodies = ITEMS.map((item) => {
        const x = 80 + Math.random() * Math.max(width - 160, 100);
        const y = -150 - Math.random() * 900;
        return Matter.Bodies.rectangle(x, y, item.w * 0.75, item.h * 0.75, {
          restitution: 0.3,
          friction: 0.7,
          frictionAir: 0.018,
          angle: (Math.random() - 0.5) * Math.PI * 2,
          density: 0.003,
        });
      });

      Matter.Composite.add(engine.world, [ground, wallL, wallR, ...bodies]);

      runner = Matter.Runner.create();
      Matter.Runner.run(runner, engine);

      const sync = () => {
        bodies.forEach((body, i) => {
          const el = itemRefs.current[i];
          if (el) {
            el.style.left = `${body.position.x - ITEMS[i].w / 2}px`;
            el.style.top  = `${body.position.y - ITEMS[i].h / 2}px`;
            el.style.transform = `rotate(${body.angle}rad)`;
          }
        });
        animFrame = requestAnimationFrame(sync);
      };
      animFrame = requestAnimationFrame(sync);
    };

    // Only start physics when footer enters viewport
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
      if (runner) import('matter-js').then(({ default: Matter }) => Matter.Runner.stop(runner));
      if (engine) import('matter-js').then(({ default: Matter }) => Matter.Engine.clear(engine));
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
