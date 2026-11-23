import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { PROFILE } from '../data/portfolioData';

interface IntroCurtainProps {
  onComplete: () => void;
}

const EASE_SHUTTER: [number, number, number, number] = [0.76, 0, 0.24, 1];
const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function IntroCurtain({ onComplete }: IntroCurtainProps) {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(!prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 980);

    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion, onComplete]);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          key="intro-curtain-root"
          className="fixed inset-0 z-[100] pointer-events-auto select-none overflow-hidden"
          aria-hidden="true"
        >
          {/* Upper Split Shutter */}
          <motion.div
            initial={{ y: '0%' }}
            exit={{ y: '-100%', transition: { duration: 0.68, ease: EASE_SHUTTER } }}
            className="absolute inset-x-0 top-0 h-1/2 bg-[#101014] border-b border-[#F3F0E8]/12"
          />

          {/* Lower Split Shutter */}
          <motion.div
            initial={{ y: '0%' }}
            exit={{ y: '100%', transition: { duration: 0.68, ease: EASE_SHUTTER } }}
            className="absolute inset-x-0 bottom-0 h-1/2 bg-[#101014] border-t border-[#F3F0E8]/12"
          />

          {/* Center SD Architectural Monogram + Kinetic Line Sequence */}
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.25 } }}
            className="relative z-10 h-full w-full flex flex-col justify-between p-6 sm:p-10 lg:p-14 text-[#F3F0E8]"
          >
            <div className="flex items-center justify-between text-xs font-mono text-[#F3F0E8]/55">
              <span>{PROFILE.location}</span>
              <span className="text-[#C7FF3D]">Portfolio</span>
            </div>

            <div className="max-w-[1400px] mx-auto w-full flex flex-col sm:flex-row sm:items-end justify-between gap-8">
              <div className="flex items-center gap-6">
                {/* Drawing SVG SD Monogram */}
                <svg viewBox="0 0 112 80" className="w-20 sm:w-28 h-auto shrink-0">
                  <motion.path
                    d="M44 16 H18 C11 16 8 20 8 26 C8 32 11 36 18 36 H34 C41 36 44 40 44 47 C44 55 40 60 32 60 H8"
                    fill="none"
                    stroke="#C7FF3D"
                    strokeWidth="5"
                    strokeLinecap="square"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.72, ease: EASE_OUT_EXPO }}
                  />
                  <motion.path
                    d="M62 16 V60 H82 C96 60 104 51 104 38 C104 25 96 16 82 16 Z"
                    fill="none"
                    stroke="#F3F0E8"
                    strokeWidth="5"
                    strokeLinejoin="miter"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.75, delay: 0.1, ease: EASE_OUT_EXPO }}
                  />
                </svg>

                <div>
                  <div className="overflow-hidden">
                    <motion.div
                      initial={{ y: '105%' }}
                      animate={{ y: '0%' }}
                      transition={{ duration: 0.55, delay: 0.12, ease: EASE_OUT_EXPO }}
                      className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-[-0.04em]"
                    >
                      {PROFILE.fullName}
                    </motion.div>
                  </div>
                  <div className="overflow-hidden mt-1.5">
                    <motion.div
                      initial={{ y: '105%' }}
                      animate={{ y: '0%' }}
                      transition={{ duration: 0.5, delay: 0.22, ease: EASE_OUT_EXPO }}
                      className="font-display text-sm sm:text-lg text-[#C7FF3D]"
                    >
                      {PROFILE.role}
                    </motion.div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setVisible(false)}
                className="self-start sm:self-end font-mono text-xs text-[#F3F0E8]/60 hover:text-[#C7FF3D] transition-colors cursor-pointer"
              >
                O‘tkazib yuborish
              </button>
            </div>

            <div className="w-full h-[2px] bg-[#F3F0E8]/12 overflow-hidden">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.88, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: 'left center' }}
                className="h-full w-full bg-gradient-to-r from-[#C7FF3D] via-[#4C5BFF] to-[#FF654F]"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
