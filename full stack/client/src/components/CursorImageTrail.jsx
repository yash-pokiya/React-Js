import React, { useRef, useState, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import { useCursorTrail } from '../hooks/useCursorTrail';
import { trailImages } from '../assets/trail/index.js';

const TrailItem = ({ item, onRemove }) => {
  const elRef = useRef(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    // Initial State - Glassmorphism, slight random offset, rotation, scale
    gsap.set(el, {
      x: item.x,
      y: item.y,
      xPercent: -50,
      yPercent: -50,
      scale: 0.5,
      opacity: 0,
      rotation: gsap.utils.random(-30, 30),
      force3D: true // GPU acceleration
    });

    // Animation timeline
    const tl = gsap.timeline({
      onComplete: () => onRemove(item.id)
    });

    tl.to(el, {
      scale: gsap.utils.random(0.8, 1.2),
      opacity: 1,
      duration: 0.4,
      ease: "back.out(1.5)"
    })
    .to(el, {
      y: item.y - gsap.utils.random(60, 120),
      x: item.x + gsap.utils.random(-40, 40),
      opacity: 0,
      scale: "-=0.1",
      duration: 0.8,
      ease: "power2.out"
    }, "+=0.1"); // slight delay before floating away

    return () => {
      tl.kill();
    };
  }, [item, onRemove]);

  return (
    <div
      ref={elRef}
      className="absolute top-0 left-0 w-24 h-32 md:w-36 md:h-48 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md bg-white/10 border border-white/20 will-change-transform"
      style={{ zIndex: item.zIndex }}
    >
      <img 
        src={item.src} 
        alt="Aesthetic trail" 
        className="w-full h-full object-cover pointer-events-none rounded-2xl"
      />
    </div>
  );
};

const CursorImageTrail = ({ targetRef }) => {
  const [items, setItems] = useState([]);
  const imgIndex = useRef(0);
  const zIndexCounter = useRef(10);

  const handleSpawn = useCallback((pos) => {
    const id = Date.now() + Math.random();
    const src = trailImages[imgIndex.current % trailImages.length];
    
    imgIndex.current++;
    zIndexCounter.current++;

    setItems((prev) => {
      const newItems = [...prev, { id, src, x: pos.x, y: pos.y, zIndex: zIndexCounter.current }];
      // Keep only the latest 8 visible items maximum
      if (newItems.length > 8) {
        return newItems.slice(newItems.length - 8);
      }
      return newItems;
    });
  }, []);

  const handleRemove = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  useCursorTrail(targetRef, handleSpawn);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {items.map((item) => (
        <TrailItem key={item.id} item={item} onRemove={handleRemove} />
      ))}
    </div>
  );
};

export default CursorImageTrail;
