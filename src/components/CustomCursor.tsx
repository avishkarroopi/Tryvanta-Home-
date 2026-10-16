import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';
import type { MousePhysicsState } from '../types/index.ts';

interface CustomCursorProps {
  mouseState: MousePhysicsState;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ mouseState }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // High-performance spring interpolation
  const springX = useSpring(mouseState.screenX, { stiffness: 450, damping: 28 });
  const springY = useSpring(mouseState.screenY, { stiffness: 450, damping: 28 });
  const dotX = useSpring(mouseState.screenX, { stiffness: 900, damping: 40 });
  const dotY = useSpring(mouseState.screenY, { stiffness: 900, damping: 40 });

  useEffect(() => {
    springX.set(mouseState.screenX);
    springY.set(mouseState.screenY);
    dotX.set(mouseState.screenX);
    dotY.set(mouseState.screenY);

    if (!isVisible && mouseState.screenX > 0) {
      setIsVisible(true);
    }
  }, [mouseState.screenX, mouseState.screenY, springX, springY, dotX, dotY, isVisible]);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.closest('button') ||
          target.closest('a') ||
          target.hasAttribute('data-interactive'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer fluid trailing ring */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovered ? 1.75 : 1,
          opacity: isClicking ? 0.9 : 0.6,
          borderColor: isHovered ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.35)',
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        className="w-8 h-8 rounded-full border border-white/40 mix-blend-difference"
      />

      {/* Inner precise dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 1.4 : isHovered ? 0.5 : 1,
          opacity: 1,
        }}
        transition={{ duration: 0.1 }}
        className="w-1.5 h-1.5 rounded-full bg-white mix-blend-difference"
      />
    </div>
  );
};
