import { ReactNode, useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react';

export function useFinePointer(): boolean {
  const prefersReducedMotion = useReducedMotion();
  const [isFine, setIsFine] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion || typeof window === 'undefined') {
      setIsFine(false);
      return;
    }

    const mediaQuery = window.matchMedia('(pointer: fine) and (hover: hover)');
    const update = () => setIsFine(mediaQuery.matches);
    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, [prefersReducedMotion]);

  return isFine;
}

interface TiltSurfaceProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  glareColor?: string;
  enableGlare?: boolean;
}

export function TiltSurface({
  children,
  className = '',
  maxTilt = 6,
  perspective = 1000,
  glareColor = 'rgba(255, 255, 255, 0.22)',
  enableGlare = true,
}: TiltSurfaceProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isFinePointer = useFinePointer();

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const mousePercentX = useMotionValue(50);
  const mousePercentY = useMotionValue(50);
  const glareOpacity = useMotionValue(0);

  const rotateX = useSpring(rawRotateX, { stiffness: 260, damping: 24, mass: 0.5 });
  const rotateY = useSpring(rawRotateY, { stiffness: 260, damping: 24, mass: 0.5 });
  const smoothGlareOpacity = useSpring(glareOpacity, { stiffness: 220, damping: 26 });

  const glareBackground = useMotionTemplate`radial-gradient(360px circle at ${mousePercentX}% ${mousePercentY}%, ${glareColor}, transparent 72%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isFinePointer || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    rawRotateY.set((px - 0.5) * 2 * maxTilt);
    rawRotateX.set((0.5 - py) * 2 * maxTilt);
    mousePercentX.set(px * 100);
    mousePercentY.set(py * 100);
    glareOpacity.set(1);
  };

  const handleMouseLeave = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
    glareOpacity.set(0);
  };

  return (
    <div style={isFinePointer ? { perspective } : undefined} className="relative h-full">
      <motion.div
        ref={ref}
        onMouseMove={isFinePointer ? handleMouseMove : undefined}
        onMouseLeave={isFinePointer ? handleMouseLeave : undefined}
        style={
          isFinePointer
            ? {
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }
            : undefined
        }
        className={`relative h-full ${className}`}
      >
        {children}
        {isFinePointer && enableGlare && (
          <motion.div
            aria-hidden="true"
            style={{
              background: glareBackground,
              opacity: smoothGlareOpacity,
            }}
            className="pointer-events-none absolute inset-0 z-20"
          />
        )}
      </motion.div>
    </div>
  );
}

interface MagneticWrapProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticWrap({
  children,
  className = '',
  strength = 0.22,
}: MagneticWrapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isFinePointer = useFinePointer();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 320, damping: 22, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 320, damping: 22, mass: 0.4 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isFinePointer || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);
    rawX.set(offsetX * strength);
    rawY.set(offsetY * strength);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={isFinePointer ? handleMouseMove : undefined}
      onMouseLeave={isFinePointer ? handleMouseLeave : undefined}
      style={isFinePointer ? { x, y } : undefined}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
