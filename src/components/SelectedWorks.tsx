import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import {
  ProjectFilterCategory,
  ProjectItem,
} from '../data/portfolioData';
import { TiltSurface } from './MotionPrimitives';
import { ResilientImage } from './ResilientImage';
import { SplitText } from './SplitText';

interface SelectedWorksProps {
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
}

const FILTER_OPTIONS: Array<'Barchasi' | ProjectFilterCategory> = [
  'Barchasi',
  'Avtomobil',
  'Texnologiya',
  'Brend tajribasi',
];

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface ProjectSlideProps {
  key?: string | number;
  project: ProjectItem;
  index: number;
  total: number;
  onSelectProject: (project: ProjectItem) => void;
  isPinnedMode: boolean;
}

function ProjectSlide({
  project,
  index,
  total,
  onSelectProject,
  isPinnedMode,
}: ProjectSlideProps) {
  const slideRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(slideRef, { once: true, margin: '100px 0px' });
  const shouldReveal = Boolean(isInView || prefersReducedMotion);

  const isDark =
    project.surfaceBg === '#101014' ||
    project.surfaceBg === '#17171C' ||
    project.surfaceBg === '#4C5BFF' ||
    project.surfaceBg === '#FF654F';

  const getRevealVariant = () => {
    if (project.id === 'tesla-digital') {
      return {
        initial: { clipPath: 'inset(0% 100% 0% 0%)', scale: 1.07 },
        animate: { clipPath: 'inset(0% 0% 0% 0%)', scale: 1 },
      };
    }
    if (project.id === 'xiaomi-commerce') {
      return {
        initial: { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.05 },
        animate: { clipPath: 'inset(0% 0% 0% 0%)', scale: 1 },
      };
    }
    if (project.id === 'snickers-experience') {
      return {
        initial: {
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
          rotate: -2.5,
          scale: 0.94,
        },
        animate: {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          rotate: 0,
          scale: 1,
        },
      };
    }
    if (index % 2 === 1) {
      return {
        initial: { clipPath: 'inset(0% 0% 0% 100%)', scale: 1.04 },
        animate: { clipPath: 'inset(0% 0% 0% 0%)', scale: 1 },
      };
    }
    return {
      initial: { clipPath: 'inset(10% 10% 10% 10%)', scale: 0.96 },
      animate: { clipPath: 'inset(0% 0% 0% 0%)', scale: 1 },
    };
  };

  const reveal = getRevealVariant();

  return (
    <article
      ref={slideRef}
      style={{
        backgroundColor: project.surfaceBg,
        color: project.surfaceText,
      }}
      className={`relative shrink-0 border border-[#101014]/20 ${
        isPinnedMode
          ? 'w-[80vw] xl:w-[68vw] h-full flex flex-col justify-between p-6 lg:p-8'
          : 'w-full flex flex-col justify-between p-5 sm:p-8'
      }`}
    >
      <TiltSurface
        maxTilt={3.2}
        perspective={1200}
        glareColor={isDark ? 'rgba(199, 255, 61, 0.12)' : 'rgba(76, 91, 255, 0.08)'}
        className="flex flex-col justify-between h-full"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono mb-4">
          <span className="tabular-nums opacity-80">
            {project.index} / {String(total).padStart(2, '0')} · {project.category}
          </span>
          <span className="opacity-70">{project.visualCharacter}</span>
        </div>

        <div className="relative flex-1 flex flex-col justify-center min-h-0 my-1">
          <motion.div
            initial={prefersReducedMotion ? false : reveal.initial}
            animate={shouldReveal ? reveal.animate : reveal.initial}
            transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
            data-cursor="KO‘RISH"
            className="relative w-full overflow-hidden flex items-center justify-center"
            style={
              !prefersReducedMotion && project.id === 'tesla-digital'
                ? { filter: 'url(#tesla-liquid-filter)' }
                : undefined
            }
          >
            <button
              type="button"
              onClick={() => onSelectProject(project)}
              aria-label={`${project.title} loyihasini ko‘rish`}
              className="group relative block w-full cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C7FF3D]"
            >
              <ResilientImage
                src={project.imageUrl}
                alt={project.imageAlt}
                loading="eager"
                fallbackBg={project.surfaceBg}
                fallbackTitle={project.title}
                className={`w-full block mx-auto transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02] ${
                  isPinnedMode
                    ? 'max-h-[46vh] xl:max-h-[50vh] w-auto max-w-full object-contain shadow-xl'
                    : 'h-auto object-contain shadow-lg'
                }`}
              />

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#101014]/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4"
              >
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#C7FF3D] text-[#101014] text-xs font-bold rounded-md">
                  <span>Batafsil ko‘rish</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </button>
          </motion.div>
        </div>

        <div className="mt-5 pt-4 border-t border-current/15 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl tracking-[-0.03em] leading-none">
              {project.title}
            </h3>
            <p
              className={`mt-2 text-xs sm:text-sm max-w-[56ch] leading-relaxed ${
                isDark ? 'text-[#F3F0E8]/80' : 'text-[#101014]/78'
              }`}
            >
              {project.subtitle}
            </p>
          </div>

          <motion.button
            type="button"
            onClick={() => onSelectProject(project)}
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold whitespace-nowrap shrink-0 pb-0.5 border-b-2 border-current/40 hover:border-current transition-colors cursor-pointer self-start sm:self-end"
          >
            <span>Ko‘rish</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </motion.button>
        </div>
      </TiltSurface>
    </article>
  );
}

export function SelectedWorks({
  projects,
  onSelectProject,
}: SelectedWorksProps) {
  const [activeFilter, setActiveFilter] = useState<'Barchasi' | ProjectFilterCategory>(
    'Barchasi'
  );
  const trackContainerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [maxScrollX, setMaxScrollX] = useState(0);

  const filteredProjects =
    activeFilter === 'Barchasi'
      ? projects
      : projects.filter((project) => project.filterKey === activeFilter);

  useEffect(() => {
    const measure = () => {
      if (!viewportRef.current || !trackRef.current) return;
      const diff = trackRef.current.scrollWidth - viewportRef.current.clientWidth;
      setMaxScrollX(Math.max(0, diff));
    };

    measure();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (viewportRef.current) ro?.observe(viewportRef.current);
    if (trackRef.current) ro?.observe(trackRef.current);
    window.addEventListener('resize', measure);

    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [filteredProjects.length]);

  const { scrollYProgress } = useScroll({
    target: trackContainerRef,
    offset: ['start start', 'end end'],
  });

  const totalSlides = Math.max(1, filteredProjects.length);
  const horizontalX = useTransform(scrollYProgress, [0, 1], [0, -maxScrollX]);
  const trackProgressWidth = useTransform(scrollYProgress, [0, 1], [0.06, 1]);

  const handleJumpToSlide = (idx: number) => {
    if (!trackContainerRef.current) return;
    const containerTop = trackContainerRef.current.offsetTop;
    const scrollableDistance =
      trackContainerRef.current.offsetHeight - window.innerHeight;
    const ratio = totalSlides > 1 ? idx / (totalSlides - 1) : 0;
    window.scrollTo({
      top: containerTop + scrollableDistance * ratio,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <section
      id="loyihalar"
      className="relative bg-[#F3F0E8] border-b border-[#101014]/12"
    >
      {/* Subtle SVG Displacement Filter Definition for Tesla Cinematic Reveal */}
      <svg className="sr-only" aria-hidden="true">
        <defs>
          <filter id="tesla-liquid-filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012"
              numOctaves="2"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="2"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Desktop Pinned Horizontal Scroll Gallery (lg+) */}
      <div
        ref={trackContainerRef}
        style={{
          height:
            filteredProjects.length <= 1
              ? 'auto'
              : `${Math.max(185, filteredProjects.length * 64)}vh`,
        }}
        className="hidden lg:block relative"
      >
        <div className="sticky top-16 h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden py-6 xl:py-8">
          {/* Pinned Header + Filter Controls */}
          <div className="max-w-[1400px] w-full mx-auto px-8 lg:px-12 flex items-end justify-between gap-6 shrink-0">
            <div>
              <p className="text-xs font-mono text-[#4C5BFF] mb-1.5">
                01 · Tanlangan ishlar · Gorizontal galereya
              </p>
              <SplitText
                as="h2"
                text="Loyihalar"
                mode="char"
                className="font-display font-extrabold tracking-[-0.035em] leading-[1.0] text-[#101014] block text-[clamp(2rem,3.4vw,3rem)]"
                stagger={0.03}
              />
            </div>

            <div className="flex items-center gap-6">
              <div
                role="group"
                aria-label="Loyihalarni tur bo‘yicha saralash"
                className="flex items-center gap-1 p-1 bg-[#E5E0D5] rounded-lg"
              >
                {FILTER_OPTIONS.map((option) => {
                  const isActive = activeFilter === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setActiveFilter(option)}
                      aria-pressed={isActive}
                      className={`relative px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        isActive ? 'text-[#101014]' : 'text-[#101014]/70 hover:text-[#101014]'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="projects-filter-desktop"
                          transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                          aria-hidden="true"
                          className="absolute inset-0 bg-[#C7FF3D] rounded-md"
                        />
                      )}
                      <span className="relative z-10">{option}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Horizontal Scroll Track */}
          <div ref={viewportRef} className="flex-1 min-h-0 flex items-center overflow-hidden my-4">
            <motion.div
              ref={trackRef}
              style={
                prefersReducedMotion || filteredProjects.length <= 1
                  ? undefined
                  : { x: horizontalX }
              }
              className="flex items-stretch gap-8 pl-8 lg:pl-12 pr-12 h-full"
            >
              {filteredProjects.map((project, idx) => (
                <ProjectSlide
                  key={project.id}
                  project={project}
                  index={idx}
                  total={filteredProjects.length}
                  onSelectProject={onSelectProject}
                  isPinnedMode
                />
              ))}
            </motion.div>
          </div>

          {/* Pinned Bottom Timeline Scrubber + Quick-Jump Links */}
          <div className="max-w-[1400px] w-full mx-auto px-8 lg:px-12 shrink-0 flex items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              {filteredProjects.map((project, idx) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => handleJumpToSlide(idx)}
                  className="px-2 py-1 font-mono text-xs text-[#101014]/65 hover:text-[#4C5BFF] hover:bg-[#101014]/5 rounded transition-colors cursor-pointer"
                >
                  {project.index} · {project.title}
                </button>
              ))}
            </div>

            <div className="w-44 h-[3px] bg-[#101014]/15 overflow-hidden">
              <motion.div
                style={{
                  scaleX: prefersReducedMotion ? 1 : trackProgressWidth,
                  transformOrigin: 'left center',
                }}
                className="h-full w-full bg-[#4C5BFF]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet Responsive Vertical Editorial Stack (< lg) */}
      <div className="lg:hidden py-14 px-5 sm:px-8 space-y-10">
        <div className="space-y-5">
          <div>
            <p className="text-xs font-mono text-[#4C5BFF] mb-2">
              01 · Tanlangan ishlar
            </p>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-[#101014]">
              Loyihalar
            </h2>
          </div>

          <div
            role="group"
            aria-label="Loyihalarni tur bo‘yicha saralash"
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#E5E0D5] rounded-lg"
          >
            {FILTER_OPTIONS.map((option) => {
              const isActive = activeFilter === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setActiveFilter(option)}
                  aria-pressed={isActive}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#101014] text-[#C7FF3D]'
                      : 'text-[#101014]/70 hover:text-[#101014]'
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-7">
          {filteredProjects.map((project, idx) => (
            <ProjectSlide
              key={project.id}
              project={project}
              index={idx}
              total={filteredProjects.length}
              onSelectProject={onSelectProject}
              isPinnedMode={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
