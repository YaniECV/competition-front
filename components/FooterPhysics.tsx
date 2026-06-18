'use client';

import { useEffect, useRef } from 'react';

const ITEMS = [
  // ps1 × 6
  { src: '/footer-ps1.png', w: 130, h: 130 },
  { src: '/footer-ps1.png', w: 130, h: 130 },
  { src: '/footer-ps1.png', w: 130, h: 130 },
  { src: '/footer-ps1.png', w: 130, h: 130 },
  { src: '/footer-ps1.png', w: 130, h: 130 },
  { src: '/footer-ps1.png', w: 130, h: 130 },
  // ps2 × 6
  { src: '/footer-ps2.png', w: 130, h: 130 },
  { src: '/footer-ps2.png', w: 130, h: 130 },
  { src: '/footer-ps2.png', w: 130, h: 130 },
  { src: '/footer-ps2.png', w: 130, h: 130 },
  { src: '/footer-ps2.png', w: 130, h: 130 },
  { src: '/footer-ps2.png', w: 130, h: 130 },
  // ps3 × 6
  { src: '/footer-ps3.png', w: 130, h: 130 },
  { src: '/footer-ps3.png', w: 130, h: 130 },
  { src: '/footer-ps3.png', w: 130, h: 130 },
  { src: '/footer-ps3.png', w: 130, h: 130 },
  { src: '/footer-ps3.png', w: 130, h: 130 },
  { src: '/footer-ps3.png', w: 130, h: 130 },
  // broique × 6
  { src: '/footer-broique.png', w: 150, h: 79 },
  { src: '/footer-broique.png', w: 150, h: 79 },
  { src: '/footer-broique.png', w: 150, h: 79 },
  { src: '/footer-broique.png', w: 150, h: 79 },
  { src: '/footer-broique.png', w: 150, h: 79 },
  { src: '/footer-broique.png', w: 150, h: 79 },
  // barriere × 5
  { src: '/footer-barriere.png', w: 120, h: 95 },
  { src: '/footer-barriere.png', w: 120, h: 95 },
  { src: '/footer-barriere.png', w: 120, h: 95 },
  { src: '/footer-barriere.png', w: 120, h: 95 },
  { src: '/footer-barriere.png', w: 120, h: 95 },
  // icono × 5
  { src: '/footer-icono.png', w: 85, h: 110 },
  { src: '/footer-icono.png', w: 85, h: 110 },
  { src: '/footer-icono.png', w: 85, h: 110 },
  { src: '/footer-icono.png', w: 85, h: 110 },
  { src: '/footer-icono.png', w: 85, h: 110 },
  // panneau × 5
  { src: '/footer-panneau.png', w: 80, h: 128 },
  { src: '/footer-panneau.png', w: 80, h: 128 },
  { src: '/footer-panneau.png', w: 80, h: 128 },
  { src: '/footer-panneau.png', w: 80, h: 128 },
  { src: '/footer-panneau.png', w: 80, h: 128 },
  // chaine × 5
  { src: '/footer-chaine.png', w: 150, h: 40 },
  { src: '/footer-chaine.png', w: 150, h: 40 },
  { src: '/footer-chaine.png', w: 150, h: 40 },
  { src: '/footer-chaine.png', w: 150, h: 40 },
  { src: '/footer-chaine.png', w: 150, h: 40 },
];

const CONTAINER_HEIGHT = 620;
const BODY_RATIO = 0.88;
const MOUSE_RADIUS = 140;
const MOUSE_FORCE = 0.006;

export default function FooterPhysics() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const startedRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animFrame: number;
    let MatterLib: typeof import('matter-js') | null = null;
    let bodiesRef: import('matter-js').Body[] = [];

    const init = async () => {
      const Matter = (await import('matter-js')).default;
      MatterLib = Matter;
      const width = container.offsetWidth;
      const height = CONTAINER_HEIGHT;

      const engine = Matter.Engine.create({ gravity: { x: 0, y: 2.5 } });

      const ground = Matter.Bodies.rectangle(width / 2, height + 25, width * 3, 50, { isStatic: true });
      const wallL  = Matter.Bodies.rectangle(-30, height / 2, 60, height * 4, { isStatic: true });
      const wallR  = Matter.Bodies.rectangle(width + 30, height / 2, 60, height * 4, { isStatic: true });

      bodiesRef = ITEMS.map((item) => {
        const x = 80 + Math.random() * Math.max(width - 160, 100);
        const y = -100 - Math.random() * 900;
        return Matter.Bodies.rectangle(x, y, item.w * BODY_RATIO, item.h * BODY_RATIO, {
          restitution: 0.3,
          friction: 0.6,
          frictionAir: 0.018,
          angle: (Math.random() - 0.5) * Math.PI * 2,
          density: 0.003,
        });
      });

      Matter.Composite.add(engine.world, [ground, wallL, wallR, ...bodiesRef]);
      const runner = Matter.Runner.create();
      Matter.Runner.run(runner, engine);

      const sync = () => {
        bodiesRef.forEach((body, i) => {
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

    // Mouse repulsion
    const onMouseMove = (e: MouseEvent) => {
      if (!MatterLib || bodiesRef.length === 0) return;
      const rect = container.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      bodiesRef.forEach(body => {
        const dx = body.position.x - mx;
        const dy = body.position.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 1) {
          const mag = MOUSE_FORCE * (1 - dist / MOUSE_RADIUS);
          MatterLib!.Body.applyForce(body, body.position, {
            x: (dx / dist) * mag,
            y: (dy / dist) * mag,
          });
        }
      });
    };

    container.addEventListener('mousemove', onMouseMove);

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
      container.removeEventListener('mousemove', onMouseMove);
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
      {/* Gradient to blend seamlessly with the nav section above */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 100,
        background: 'linear-gradient(to bottom, #101010, transparent)',
        zIndex: 10,
        pointerEvents: 'none',
      }} />
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
