'use client';

import { useEffect, useRef } from 'react';

const ITEMS = [
  // illus-footer-2 (portrait 0.78:1) × 4
  { src: '/illus-footer-2.png',   w: 114, h: 146 },
  { src: '/illus-footer-2.png',   w: 90,  h: 116 },
  { src: '/illus-footer-2.png',   w: 136, h: 175 },
  { src: '/illus-footer-2.png',   w: 102, h: 131 },
  // illus-footer-3 (square) × 4
  { src: '/illus-footer-3.png',   w: 131, h: 131 },
  { src: '/illus-footer-3.png',   w: 161, h: 161 },
  { src: '/illus-footer-3.png',   w: 109, h: 109 },
  { src: '/illus-footer-3.png',   w: 146, h: 146 },
  // illus-footer-4 (landscape 1.27:1) × 4
  { src: '/illus-footer-4.png',   w: 185, h: 146 },
  { src: '/illus-footer-4.png',   w: 148, h: 116 },
  { src: '/illus-footer-4.png',   w: 222, h: 175 },
  { src: '/illus-footer-4.png',   w: 166, h: 131 },
  // illus-footer-5 (near square) × 4
  { src: '/illus-footer-5.png',   w: 147, h: 146 },
  { src: '/illus-footer-5.png',   w: 117, h: 116 },
  { src: '/illus-footer-5.png',   w: 176, h: 175 },
  { src: '/illus-footer-5.png',   w: 132, h: 131 },
  // illus-footer-6-1 (1.10:1) × 4
  { src: '/illus-footer-6-1.png', w: 161, h: 146 },
  { src: '/illus-footer-6-1.png', w: 128, h: 116 },
  { src: '/illus-footer-6-1.png', w: 192, h: 175 },
  { src: '/illus-footer-6-1.png', w: 144, h: 131 },
  // illus-footer-6 (portrait 0.92:1) × 4
  { src: '/illus-footer-6.png',   w: 135, h: 146 },
  { src: '/illus-footer-6.png',   w: 108, h: 116 },
  { src: '/illus-footer-6.png',   w: 161, h: 175 },
  { src: '/illus-footer-6.png',   w: 122, h: 131 },
  // illus-footer-7 (1.08:1) × 4
  { src: '/illus-footer-7.png',   w: 156, h: 146 },
  { src: '/illus-footer-7.png',   w: 125, h: 116 },
  { src: '/illus-footer-7.png',   w: 190, h: 175 },
  { src: '/illus-footer-7.png',   w: 141, h: 131 },
  // illus-footer-9 (portrait 0.94:1) × 4
  { src: '/illus-footer-9.png',   w: 137, h: 146 },
  { src: '/illus-footer-9.png',   w: 109, h: 116 },
  { src: '/illus-footer-9.png',   w: 164, h: 175 },
  { src: '/illus-footer-9.png',   w: 124, h: 131 },
  // illus-footer-10 (square) × 4
  { src: '/illus-footer-10.png',  w: 146, h: 146 },
  { src: '/illus-footer-10.png',  w: 116, h: 116 },
  { src: '/illus-footer-10.png',  w: 175, h: 175 },
  { src: '/illus-footer-10.png',  w: 114, h: 114 },
];

const CONTAINER_HEIGHT = 620;
const BODY_RATIO = 0.88;
const MOUSE_RADIUS = 220;
const MOUSE_FORCE = 3;

export default function FooterPhysics() {
  const anchorRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    // Fixed overlay at body level — sits above everything
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:9999;overflow:hidden;';
    document.body.appendChild(overlay);

    // Create item elements imperatively in the overlay
    const itemEls: HTMLDivElement[] = [];
    ITEMS.forEach((item) => {
      const el = document.createElement('div');
      el.style.cssText = `position:fixed;width:${item.w}px;height:${item.h}px;pointer-events:none;will-change:transform;left:-9999px;top:-9999px;`;
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = '';
      img.setAttribute('aria-hidden', 'true');
      img.style.cssText = 'width:100%;height:100%;object-fit:contain;display:block;';
      el.appendChild(img);
      overlay.appendChild(el);
      itemEls.push(el);
    });

    const anchor = anchorRef.current;
    if (!anchor) return;

    let animFrame: number;
    let MatterLib: typeof import('matter-js') | null = null;
    let bodiesRef: import('matter-js').Body[] = [];

    const init = async () => {
      const Matter = (await import('matter-js')).default;
      MatterLib = Matter;
      const width = window.innerWidth;

      // Ground in page-absolute coordinates
      const anchorPageTop = anchor.getBoundingClientRect().top + window.scrollY;
      const groundY = anchorPageTop + CONTAINER_HEIGHT;

      const engine = Matter.Engine.create({ gravity: { x: 0, y: 2.5 } });

      const ground = Matter.Bodies.rectangle(width / 2, groundY + 25, width * 3, 50, { isStatic: true });
      const wallL  = Matter.Bodies.rectangle(-30, groundY / 2, 60, groundY * 2, { isStatic: true });
      const wallR  = Matter.Bodies.rectangle(width + 30, groundY / 2, 60, groundY * 2, { isStatic: true });

      // Spawn from above the visible viewport
      bodiesRef = ITEMS.map((item) => {
        const x = 80 + Math.random() * Math.max(width - 160, 100);
        const y = -item.h - Math.random() * window.innerHeight;
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
        const scrollY = window.scrollY;
        bodiesRef.forEach((body, i) => {
          const el = itemEls[i];
          if (el) {
            // Convert page-absolute physics coords to viewport coords
            el.style.left      = `${body.position.x - ITEMS[i].w / 2}px`;
            el.style.top       = `${body.position.y - ITEMS[i].h / 2 - scrollY}px`;
            el.style.transform = `rotate(${body.angle}rad)`;
          }
        });
        animFrame = requestAnimationFrame(sync);
      };
      animFrame = requestAnimationFrame(sync);
    };

    // Mouse repulsion — convert viewport coords to page-absolute
    const onMouseMove = (e: MouseEvent) => {
      if (!MatterLib || bodiesRef.length === 0) return;
      const mx = e.clientX;
      const my = e.clientY + window.scrollY;

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

    window.addEventListener('mousemove', onMouseMove);

    // Start immediately so objects are already falling when user scrolls to footer
    init();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animFrame);
      if (document.body.contains(overlay)) document.body.removeChild(overlay);
    };
  }, []);

  return (
    <div
      ref={anchorRef}
      style={{
        position: 'relative',
        width: '100%',
        height: CONTAINER_HEIGHT,
        background: '#101010',
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 120,
        background: 'linear-gradient(to bottom, #101010, transparent)',
        zIndex: 10,
        pointerEvents: 'none',
      }} />
    </div>
  );
}
