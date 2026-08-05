import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const useCursorTrail = (targetRef, onSpawn) => {
  const mouse = useRef({ x: 0, y: 0 });
  const renderPos = useRef({ x: 0, y: 0 });
  const lastSpawn = useRef({ x: 0, y: 0 });
  const isInside = useRef(false);

  useEffect(() => {
    if (!targetRef.current) return;
    const target = targetRef.current;

    const handleMouseMove = (e) => {
      const rect = target.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
      
      // If we just entered, snap renderPos to avoid trailing from far away
      if (!isInside.current) {
        renderPos.current.x = mouse.current.x;
        renderPos.current.y = mouse.current.y;
        lastSpawn.current.x = mouse.current.x;
        lastSpawn.current.y = mouse.current.y;
        isInside.current = true;
      }
    };

    const handleMouseLeave = () => {
      isInside.current = false;
    };

    const handleMouseEnter = () => {
      isInside.current = true;
    };

    target.addEventListener('mousemove', handleMouseMove);
    target.addEventListener('mouseleave', handleMouseLeave);
    target.addEventListener('mouseenter', handleMouseEnter);

    const ticker = gsap.ticker;
    const update = () => {
      if (!isInside.current) return;

      // Interpolate cursor movement (LERP)
      // dt = 1.0 - Math.pow(1.0 - 0.15, ticker.deltaRatio()) for framerate independence
      const dt = 1.0 - Math.pow(1.0 - 0.15, ticker.deltaRatio());
      renderPos.current.x += (mouse.current.x - renderPos.current.x) * dt;
      renderPos.current.y += (mouse.current.y - renderPos.current.y) * dt;

      // Check distance for spawn (spawn every 50px)
      const dx = renderPos.current.x - lastSpawn.current.x;
      const dy = renderPos.current.y - lastSpawn.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 50) {
        onSpawn({ x: renderPos.current.x, y: renderPos.current.y });
        lastSpawn.current.x = renderPos.current.x;
        lastSpawn.current.y = renderPos.current.y;
      }
    };

    ticker.add(update);

    return () => {
      if (target) {
        target.removeEventListener('mousemove', handleMouseMove);
        target.removeEventListener('mouseleave', handleMouseLeave);
        target.removeEventListener('mouseenter', handleMouseEnter);
      }
      ticker.remove(update);
    };
  }, [targetRef, onSpawn]);
};
