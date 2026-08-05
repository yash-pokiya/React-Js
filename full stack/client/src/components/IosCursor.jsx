import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const IosCursor = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [trails, setTrails] = useState([]);
  const [ripples, setRipples] = useState([]);

  const isHoveringRef = useRef(false);
  const hoverCenter = useRef({ x: 0, y: 0 });
  const trailId = useRef(0);
  const rippleId = useRef(0);
  const lastTrailTime = useRef(0);
  const prevPos = useRef({ x: 0, y: 0 });
  const rafId = useRef(0);

  // --- Core Motion Values ---
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const w = useMotionValue(16);
  const h = useMotionValue(16);
  const r = useMotionValue(8);
  const sx = useMotionValue(1);
  const sy = useMotionValue(1);
  const alpha = useMotionValue(0);

  // --- Ring Motion Values (width/height instead of scale for perfect centering) ---
  const ringW = useMotionValue(16);
  const ringH = useMotionValue(16);
  const ringR = useMotionValue(8);
  const ringA = useMotionValue(0);

  // --- Inner dot highlight offset (moves opposite to velocity) ---
  const highlightX = useMotionValue(0);
  const highlightY = useMotionValue(0);

  // --- Springs ---
  const sp = { stiffness: 400, damping: 28, mass: 0.5 };
  const spFast = { stiffness: 600, damping: 30, mass: 0.2 };
  const spSoft = { stiffness: 250, damping: 25, mass: 0.8 };
  const spGentle = { stiffness: 200, damping: 20, mass: 1 };

  const xS = useSpring(cursorX, sp);
  const yS = useSpring(cursorY, sp);
  const wS = useSpring(w, sp);
  const hS = useSpring(h, sp);
  const rS = useSpring(r, sp);
  const sxS = useSpring(sx, spFast);
  const syS = useSpring(sy, spFast);
  const alphaS = useSpring(alpha, { stiffness: 300, damping: 25 });

  const ringWS = useSpring(ringW, spSoft);
  const ringHS = useSpring(ringH, spSoft);
  const ringRS = useSpring(ringR, spSoft);
  const ringAS = useSpring(ringA, spSoft);

  const highlightXS = useSpring(highlightX, spGentle);
  const highlightYS = useSpring(highlightY, spGentle);

  // --- Proper centering: position = center - size/2 ---
  const displayX = useTransform([xS, wS], ([x, ww]) => x - ww / 2);
  const displayY = useTransform([yS, hS], ([y, hh]) => y - hh / 2);
  const ringDisplayX = useTransform([xS, ringWS], ([x, rw]) => x - rw / 2);
  const ringDisplayY = useTransform([yS, ringHS], ([y, rh]) => y - rh / 2);

  // Appending 'px' units so browsers parse these motion values correctly
  const displayW = useTransform(wS, (v) => `${v}px`);
  const displayH = useTransform(hS, (v) => `${v}px`);
  const displayR = useTransform(rS, (v) => `${v}px`);

  const ringDisplayW = useTransform(ringWS, (v) => `${v}px`);
  const ringDisplayH = useTransform(ringHS, (v) => `${v}px`);
  const ringDisplayR = useTransform(ringRS, (v) => `${v}px`);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const onMove = (e) => {
      const dx = e.clientX - prevPos.current.x;
      const dy = e.clientY - prevPos.current.y;
      prevPos.current = { x: e.clientX, y: e.clientY };
      const speed = Math.sqrt(dx * dx + dy * dy);

      // Position
      if (!isHoveringRef.current) {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      } else {
        cursorX.set(hoverCenter.current.x + dx * 0.15);
        cursorY.set(hoverCenter.current.y + dy * 0.15);
      }

      // Fade in on first move
      if (alpha.get() < 0.1) alpha.set(1);

      // --- Squash & Stretch ---
      if (!prefersReduced && !isHoveringRef.current && speed > 1.5) {
        const stretch = Math.min(speed * 0.02, 0.25);
        const squash = 1 - stretch * 0.6;
        if (Math.abs(dx) >= Math.abs(dy)) {
          sx.set(1 + stretch);
          sy.set(squash);
        } else {
          sx.set(squash);
          sy.set(1 + stretch);
        }
      }

      // --- Inner highlight parallax (opposite to velocity) ---
      if (!prefersReduced && !isHoveringRef.current) {
        const norm = Math.min(speed / 30, 1);
        highlightX.set(-dx * norm * 0.4);
        highlightY.set(-dy * norm * 0.4);
      }

      // --- Trail particles ---
      if (!prefersReduced) {
        const now = performance.now();
        if (now - lastTrailTime.current > 16 && !isHoveringRef.current && speed > 4) {
          lastTrailTime.current = now;
          const id = trailId.current++;
          const tOpacity = Math.min(speed / 45, 0.3);
          const tSize = Math.min(5 + speed * 0.4, 12);
          setTrails(prev => [...prev.slice(-14), {
            id, x: e.clientX, y: e.clientY,
            opacity: tOpacity, size: tSize,
          }]);
          setTimeout(() => setTrails(p => p.filter(t => t.id !== id)), 300);
        }
      }
    };

    const onOver = (e) => {
      const el = e.target.closest(
        'a, button, [role="button"], input, select, textarea, [data-cursor="pointer"], .cursor-pointer'
      );
      if (el) {
        const box = el.getBoundingClientRect();
        const cx = box.left + box.width / 2;
        const cy = box.top + box.height / 2;
        hoverCenter.current = { x: cx, y: cy };
        isHoveringRef.current = true;
        setIsHovering(true);

        const targetW = box.width + 16;
        const targetH = box.height + 12;

        w.set(targetW);
        h.set(targetH);
        r.set(12);
        cursorX.set(cx);
        cursorY.set(cy);
        sx.set(1); sy.set(1);
        highlightX.set(0); highlightY.set(0);

        // Ring pulse: expands from cursor shape and fades out
        ringW.set(targetW);
        ringH.set(targetH);
        ringR.set(12);
        ringA.set(0.5);
        setTimeout(() => {
          ringW.set(targetW + 28);
          ringH.set(targetH + 20);
          ringA.set(0);
        }, 80);
      } else if (isHoveringRef.current) {
        isHoveringRef.current = false;
        setIsHovering(false);
        w.set(16); h.set(16); r.set(8);
      }
    };

    const onDown = (e) => {
      sx.set(0.82);
      sy.set(0.82);

      // Click ripple
      const id = rippleId.current++;
      setRipples(prev => [...prev, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setRipples(p => p.filter(r => r.id !== id)), 550);

      // Second delayed ripple for layered effect
      if (!prefersReduced) {
        const id2 = rippleId.current++;
        setTimeout(() => {
          setRipples(prev => [...prev, { id: id2, x: e.clientX, y: e.clientY }]);
          setTimeout(() => setRipples(p => p.filter(r => r.id !== id2)), 550);
        }, 60);
      }
    };

    const onUp = () => {
      // Overshoot bounce
      sx.set(1.12);
      sy.set(1.12);
      setTimeout(() => { sx.set(0.97); sy.set(0.97); }, 80);
      setTimeout(() => { sx.set(1); sy.set(1); }, 180);
    };

    const onLeave = () => alpha.set(0);
    const onEnter = () => alpha.set(1);

    // --- Squash/stretch decay loop ---
    const decay = () => {
      if (!isHoveringRef.current) {
        const cx = sx.get(), cy = sy.get();
        if (Math.abs(cx - 1) > 0.002) sx.set(cx + (1 - cx) * 0.12);
        if (Math.abs(cy - 1) > 0.002) sy.set(cy + (1 - cy) * 0.12);
      }
      // Highlight return
      const hx = highlightX.get(), hy = highlightY.get();
      if (Math.abs(hx) > 0.05) highlightX.set(hx * 0.88);
      if (Math.abs(hy) > 0.05) highlightY.set(hy * 0.88);

      rafId.current = requestAnimationFrame(decay);
    };
    rafId.current = requestAnimationFrame(decay);

    // Hide native cursor globally
    const tag = document.createElement('style');
    tag.id = '__ios_cursor_hide__';
    tag.textContent = '*{cursor:none!important}';
    document.head.appendChild(tag);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.getElementById('__ios_cursor_hide__')?.remove();
    };
  }, [cursorX, cursorY, w, h, r, sx, sy, alpha, ringW, ringH, ringR, ringA, highlightX, highlightY]);

  return (
    <>
      {/* --- Trail Particles --- */}
      {trails.map(t => (
        <motion.div
          key={t.id}
          className="pointer-events-none"
          style={{
            position: 'fixed',
            left: t.x - t.size / 2,
            top: t.y - t.size / 2,
            width: t.size,
            height: t.size,
            borderRadius: '50%',
            backgroundColor: 'rgba(150,150,150,0.35)',
            zIndex: 9997,
          }}
          initial={{ opacity: t.opacity, scale: 1 }}
          animate={{ opacity: 0, scale: 0.1 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
        />
      ))}

      {/* --- Click Ripples --- */}
      {ripples.map(rp => (
        <motion.div
          key={rp.id}
          className="pointer-events-none"
          style={{
            position: 'fixed',
            left: rp.x - 20,
            top: rp.y - 20,
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: '1.5px solid rgba(150,150,150,0.4)',
            zIndex: 9998,
          }}
          initial={{ scale: 0.35, opacity: 0.7 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}

      {/* --- Hover Ring Pulse --- */}
      <motion.div
        className="pointer-events-none"
        style={{
          position: 'fixed',
          x: ringDisplayX,
          y: ringDisplayY,
          width: ringDisplayW,
          height: ringDisplayH,
          borderRadius: ringDisplayR,
          opacity: ringAS,
          border: '1.5px solid rgba(128,128,128,0.3)',
          zIndex: 9998,
          willChange: 'transform',
        }}
      />

      {/* --- Main Cursor Body --- */}
      <motion.div
        className="pointer-events-none"
        style={{
          position: 'fixed',
          x: displayX,
          y: displayY,
          width: displayW,
          height: displayH,
          borderRadius: displayR,
          scaleX: sxS,
          scaleY: syS,
          opacity: alphaS,
          zIndex: 9999,
          willChange: 'transform',
          transition: 'background-color 0.2s ease, box-shadow 0.3s ease',
          backgroundColor: isHovering
            ? 'rgba(128,128,128,0.15)'
            : 'rgba(140,140,140,0.8)',
          boxShadow: isHovering
            ? '0 0 0 1px rgba(128,128,128,0.08), inset 0 0 0 0.5px rgba(255,255,255,0.03)'
            : '0 0 10px rgba(140,140,140,0.1)',
        }}
      />

      {/* --- Inner Highlight (moves opposite to velocity for glass-like depth) --- */}
      <motion.div
        className="pointer-events-none"
        style={{
          position: 'fixed',
          x: displayX,
          y: displayY,
          width: displayW,
          height: displayH,
          borderRadius: displayR,
          scaleX: sxS,
          scaleY: syS,
          opacity: alphaS,
          zIndex: 10000,
          willChange: 'transform',
          overflow: 'hidden',
        }}
      >
        <motion.div
          style={{
            position: 'absolute',
            top: -2,
            left: -2,
            right: -2,
            bottom: -2,
            borderRadius: 'inherit',
            background: isHovering
              ? 'none'
              : 'radial-gradient(circle at 40% 35%, rgba(255,255,255,0.35) 0%, transparent 60%)',
            x: highlightXS,
            y: highlightYS,
            transition: 'background 0.2s ease',
          }}
        />
      </motion.div>
    </>
  );
};

export default IosCursor;