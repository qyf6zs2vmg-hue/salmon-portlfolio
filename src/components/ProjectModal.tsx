import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ProjectItem } from '../data/portfolioData';
import { ResilientImage } from './ResilientImage';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ProjectModal({
  project,
  onClose,
  onPrev,
  onNext,
}: ProjectModalProps) {
  const prefersReducedMotion = useReducedMotion();
  const [direction, setDirection] = useState<1 | -1>(1);
  const prevIndexRef = useRef<string | null>(null);

  useEffect(() => {
    if (!project) return;
    if (prevIndexRef.current && prevIndexRef.current !== project.index) {
      setDirection(Number(project.index) > Number(prevIndexRef.current) ? 1 : -1);
    }
    prevIndexRef.current = project.index;
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        setDirection(-1);
        onPrev();
      }
      if (e.key === 'ArrowRight') {
        setDirection(1);
        onNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [project, onClose, onPrev, onNext]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="project-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 bg-[#101014]/80 backdrop-blur-xs"
          onClick={onClose}
        >
          <motion.div
            key="project-modal-sheet"
            initial={{ opacity: 0, y: 26, scale: 0.975 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.985 }}
            transition={{ duration: 0.36, ease: EASE_OUT_EXPO }}
            className="relative w-full max-w-[1120px] max-h-[92vh] overflow-y-auto bg-[#F3F0E8] text-[#101014] shadow-2xl border border-[#101014]/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky Modal Top Bar */}
            <div className="sticky top-0 z-20 flex items-center justify-between gap-4 px-5 sm:px-8 py-4 bg-[#F3F0E8]/95 backdrop-blur-md border-b border-[#101014]/12">
              <div className="flex items-center gap-3 text-xs font-mono text-[#101014]/65 tabular-nums">
                <span>{project.index}</span>
                <span aria-hidden="true">·</span>
                <span>{project.title}</span>
                <span aria-hidden="true">·</span>
                <span className="hidden sm:inline">{project.category}</span>
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  type="button"
                  onClick={() => {
                    setDirection(-1);
                    onPrev();
                  }}
                  whileHover={{ x: -1.5 }}
                  whileTap={{ scale: 0.92 }}
                  aria-label="Oldingi loyiha"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-[#101014]/20 hover:bg-[#C7FF3D] transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => {
                    setDirection(1);
                    onNext();
                  }}
                  whileHover={{ x: 1.5 }}
                  whileTap={{ scale: 0.92 }}
                  aria-label="Keyingi loyiha"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-[#101014]/20 hover:bg-[#C7FF3D] transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
                <motion.button
                  type="button"
                  onClick={onClose}
                  whileTap={{ scale: 0.92 }}
                  aria-label="Yopish"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-md bg-[#101014] text-[#F3F0E8] hover:bg-[#4C5BFF] transition-colors cursor-pointer ml-1"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Project Details Body */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={project.id}
                custom={direction}
                initial={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, x: direction * 24 }
                }
                animate={{ opacity: 1, x: 0 }}
                exit={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, x: direction * -24 }
                }
                transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                className="p-5 sm:p-8 lg:p-12 space-y-8"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
                  <div className="lg:col-span-8">
                    <p className="text-xs sm:text-sm font-mono text-[#4C5BFF] mb-2">
                      {project.category}
                    </p>
                    <h2
                      id="modal-project-title"
                      className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-[-0.03em] leading-[1.05] text-balance"
                    >
                      {project.title}
                    </h2>
                    <p className="mt-4 text-base sm:text-lg text-[#101014]/80 leading-relaxed max-w-[54ch]">
                      {project.subtitle}
                    </p>
                  </div>

                  <div className="lg:col-span-4 lg:text-right">
                    <span className="block text-xs font-mono text-[#101014]/55 mb-2">
                      Rang palitrasi
                    </span>
                    <div className="inline-flex items-center gap-2">
                      {project.palette.map((hex, idx) => (
                        <motion.div
                          key={hex}
                          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.7 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.35,
                            delay: 0.08 + idx * 0.05,
                            ease: EASE_OUT_EXPO,
                          }}
                          className="flex flex-col items-center gap-1"
                        >
                          <span
                            style={{ backgroundColor: hex }}
                            className="w-8 h-8 border border-[#101014]/20"
                            title={hex}
                          />
                          <span className="font-mono text-[10px] text-[#101014]/60">{hex}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Uncropped Screenshot Stage */}
                <div style={{ backgroundColor: project.surfaceBg }} className="p-4 sm:p-8">
                  <motion.div
                    initial={
                      prefersReducedMotion
                        ? false
                        : { clipPath: 'inset(0% 0% 100% 0%)', scale: 1.03 }
                    }
                    animate={{ clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }}
                    transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
                    className="relative overflow-hidden bg-black/5 flex items-center justify-center"
                  >
                    <ResilientImage
                      src={project.imageUrl}
                      alt={project.imageAlt}
                      fallbackBg={project.surfaceBg}
                      fallbackTitle={project.title}
                      className="w-full h-auto max-h-[680px] object-contain"
                    />
                  </motion.div>
                </div>

                <div className="pt-4 border-t border-[#101014]/12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm">
                  <div className="text-[#101014]/75">
                    <span className="font-mono text-xs text-[#101014]/55 mr-2">
                      Vizual uslub:
                    </span>
                    <span className="font-medium text-[#101014]">{project.visualCharacter}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
