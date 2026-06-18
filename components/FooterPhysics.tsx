'use client';

import { useEffect, useRef } from 'react';

const ITEMS = [
  // illus-footer-2 (portrait 0.78:1) × 4
  { src: '/illus-footer-2.png',   w: 186, h: 240 },
  { src: '/illus-footer-2.png',   w: 155, h: 200 },
  { src: '/illus-footer-2.png',   w: 217, h: 280 },
  { src: '/illus-footer-2.png',   w: 171, h: 220 },
  // illus-footer-3 (square) × 4
  { src: '/illus-footer-3.png',   w: 220, h: 220 },
  { src: '/illus-footer-3.png',   w: 260, h: 260 },
  { src: '/illus-footer-3.png',   w: 180, h: 180 },
  { src: '/illus-footer-3.png',   w: 240, h: 240 },
  // illus-footer-4 (landscape 1.27:1) × 4
  { src: '/illus-footer-4.png',   w: 305, h: 240 },
  { src: '/illus-footer-4.png',   w: 254, h: 200 },
  { src: '/illus-footer-4.png',   w: 356, h: 280 },
  { src: '/illus-footer-4.png',   w: 279, h: 220 },
  // illus-footer-5 (near square) × 4
  { src: '/illus-footer-5.png',   w: 241, h: 240 },
  { src: '/illus-footer-5.png',   w: 201, h: 200 },
  { src: '/illus-footer-5.png',   w: 281, h: 280 },
  { src: '/illus-footer-5.png',   w: 221, h: 220 },
  // illus-footer-6-1 (1.10:1) × 4
  { src: '/illus-footer-6-1.png', w: 264, h: 240 },
  { src: '/illus-footer-6-1.png', w: 220, h: 200 },
  { src: '/illus-footer-6-1.png', w: 308, h: 280 },
  { src: '/illus-footer-6-1.png', w: 242, h: 220 },
  // illus-footer-6 (portrait 0.92:1) × 4
  { src: '/illus-footer-6.png',   w: 221, h: 240 },
  { src: '/illus-footer-6.png',   w: 184, h: 200 },
  { src: '/illus-footer-6.png',   w: 258, h: 280 },
  { src: '/illus-footer-6.png',   w: 202, h: 220 },
  // illus-footer-7 (1.08:1) × 4
  { src: '/illus-footer-7.png',   w: 259, h: 240 },
  { src: '/illus-footer-7.png',   w: 216, h: 200 },
  { src: '/illus-footer-7.png',   w: 302, h: 280 },
  { src: '/illus-footer-7.png',   w: 238, h: 220 },
  // illus-footer-9 (portrait 0.94:1) × 4
  { src: '/illus-footer-9.png',   w: 226, h: 240 },
  { src: '/illus-footer-9.png',   w: 188, h: 200 },
  { src: '/illus-footer-9.png',   w: 264, h: 280 },
  { src: '/illus-footer-9.png',   w: 207, h: 220 },
  // illus-footer-10 (square) × 4
  { src: '/illus-footer-10.png',  w: 240, h: 240 },
  { src: '/illus-footer-10.png',  w: 200, h: 200 },
  { src: '/illus-footer-10.png',  w: 280, h: 280 },
  { src: '/illus-footer-10.png',  w: 220, h: 220 },
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

      const containerTop = container.getBoundingClientRect().top;
      const spawnRange = containerTop + window.innerHeight;

      bodiesRef = ITEMS.map((item) => {
        const x = 80 + Math.random() * Math.max(width - 160, 100);
        const y = -item.h - Math.random() * Math.max(spawnRange, 400);
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
        overflow: 'visible',
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
