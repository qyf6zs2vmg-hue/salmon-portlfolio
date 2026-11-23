import { useRef, useState } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react';
import { HERO_HIGHLIGHTS, PROFILE, ProjectItem } from '../data/portfolioData';
import { MagneticWrap, useFinePointer } from './MotionPrimitives';
import { ResilientImage } from './ResilientImage';
import { SplitText } from './SplitText';

interface HeroSectionProps {
  projects: ProjectItem[];
  introReady: boolean;
  onSelectProject: (project: ProjectItem) => void;
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function HeroSection({
  projects,
  introReady,
  onSelectProject,
}: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isFinePointer = useFinePointer();
  const stripInView = useInView(stripRef, { once: true, margin: '80px 0px' });

  const [hoveredWord, setHoveredWord] = useState<number | null>(null);
  const [fontStretch, setFontStretch] = useState(94);

  const { scrollY, scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { stiffness: 180, damping: 32 });
  const marqueeSkew = useTransform(smoothVelocity, [-1800, 1800], [-3.5, 3.5]);

  const backdropParallaxY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const cobaltParallaxY = useTransform(scrollYProgress, [0, 1], [0, -24]);
  const teslaCardY = useTransform(scrollYProgress, [0, 1], [0, -32]);
  const xiaomiCardY = useTransform(scrollYProgress, [0, 1], [0, -56]);
  const snickersCardY = useTransform(scrollYProgress, [0, 1], [0, 24]);

  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const springMouseX = useSpring(rawMouseX, { stiffness: 120, damping: 24 });
  const springMouseY = useSpring(rawMouseY, { stiffness: 120, damping: 24 });

  const stageRotateY = useTransform(springMouseX, [-1, 1], [-4.5, 4.5]);
  const stageRotateX = useTransform(springMouseY, [-1, 1], [3.5, -3.5]);
  const fieldOffsetX = useTransform(springMouseX, [-1, 1], [-12, 12]);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!isFinePointer || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rawMouseX.set(px * 2 - 1);
    rawMouseY.set(py * 2 - 1);
    setFontStretch(Math.round(78 + px * 22));
  };

  const handleHeroMouseLeave = () => {
    rawMouseX.set(0);
    rawMouseY.set(0);
    setFontStretch(94);
    setHoveredWord(null);
  };

  const tesla = projects[0];
  const xiaomi = projects[1];
  const snickers = projects[2];

  const baseDelay = introReady ? 0.04 : 0.72;

  return (
    <section
      ref={heroRef}
      id="top"
      onMouseMove={isFinePointer ? handleHeroMouseMove : undefined}
      onMouseLeave={isFinePointer ? handleHeroMouseLeave : undefined}
      className="relative overflow-hidden bg-[#F3F0E8] border-b border-[#101014]/12"
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pt-8 sm:pt-12 lg:pt-16 pb-12 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Variable Font Kinetic Typography + Editorial Line Breaks */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, delay: baseDelay, ease: EASE_OUT_EXPO }}
                className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-mono text-[#101014]/75 mb-6"
              >
                <motion.span
                  initial={prefersReducedMotion ? false : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.55, delay: baseDelay + 0.05, ease: EASE_OUT_EXPO }}
                  style={{ transformOrigin: 'left center' }}
                  className="inline-block w-8 h-[3px] bg-[#4C5BFF]"
                  aria-hidden="true"
                />
                <span>{PROFILE.role}</span>
                <span aria-hidden="true">/</span>
                <span>{PROFILE.location}</span>
              </motion.div>

              {/* Oversized Variable-Axis Kinetic Headline */}
              <h1
                className="font-display tracking-[-0.04em] leading-[0.96] text-[#101014]"
                style={{ fontSize: 'clamp(2.6rem, 5.4vw, 4.95rem)' }}
              >
                <span
                  onMouseEnter={() => isFinePointer && setHoveredWord(0)}
                  onMouseLeave={() => setHoveredWord(null)}
                  style={{
                    fontVariationSettings: `"wght" ${
                      hoveredWord === 0 ? 800 : 760
                    }, "wdth" ${hoveredWord === 0 ? 100 : fontStretch}, "opsz" 84`,
                  }}
                  className="block font-var-kinetic"
                >
                  <SplitText
                    text="G‘oyalarni"
                    mode="char"
                    trigger="mount"
                    delay={baseDelay + 0.06}
                    stagger={0.022}
                  />
                </span>

                <span
                  onMouseEnter={() => isFinePointer && setHoveredWord(1)}
                  onMouseLeave={() => setHoveredWord(null)}
                  style={{
                    fontVariationSettings: `"wght" ${
                      hoveredWord === 1 ? 800 : 700
                    }, "wdth" ${hoveredWord === 1 ? 100 : Math.max(78, fontStretch - 6)}, "opsz" 84`,
                  }}
                  className="relative inline-block font-var-kinetic px-2 -mx-2 my-1"
                >
                  <motion.span
                    aria-hidden="true"
                    initial={prefersReducedMotion ? false : { scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.65, delay: baseDelay + 0.24, ease: EASE_OUT_EXPO }}
                    style={{ transformOrigin: 'left center' }}
                    className="absolute inset-0 bg-[#C7FF3D] -z-10"
                  />
                  <SplitText
                    text="zamonaviy dizayn"
                    trigger="mount"
                    delay={baseDelay + 0.18}
                    stagger={0.045}
                  />
                </span>

                <span
                  onMouseEnter={() => isFinePointer && setHoveredWord(2)}
                  onMouseLeave={() => setHoveredWord(null)}
                  style={{
                    fontVariationSettings: `"wght" ${
                      hoveredWord === 2 ? 800 : 780
                    }, "wdth" ${hoveredWord === 2 ? 100 : fontStretch}, "opsz" 84`,
                  }}
                  className="block font-var-kinetic text-[#4C5BFF]"
                >
                  <SplitText
                    text="va funksional kod"
                    trigger="mount"
                    delay={baseDelay + 0.3}
                    stagger={0.045}
                  />
                </span>

                <span
                  onMouseEnter={() => isFinePointer && setHoveredWord(3)}
                  onMouseLeave={() => setHoveredWord(null)}
                  style={{
                    fontVariationSettings: `"wght" ${
                      hoveredWord === 3 ? 800 : 620
                    }, "wdth" ${hoveredWord === 3 ? 100 : Math.min(100, fontStretch + 4)}, "opsz" 84`,
                  }}
                  className="block font-var-kinetic"
                >
                  <SplitText
                    text="orqali jonlantiraman."
                    trigger="mount"
                    delay={baseDelay + 0.4}
                    stagger={0.045}
                  />
                </span>
              </h1>

              {/* Masked Biography Intro */}
              <div className="mt-7 overflow-hidden">
                <motion.p
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: baseDelay + 0.48, ease: EASE_OUT_EXPO }}
                  className="text-base sm:text-lg leading-relaxed text-[#101014]/78 max-w-[46ch]"
                >
                  Men <strong className="font-semibold text-[#101014]">{PROFILE.fullName}</strong> —{' '}
                  taxminan 5 yildan beri web development va UI/UX dizayn sohasiga qiziqib,
                  insonlar uchun qulay, chiroyli va funksional raqamli yechimlar yaratish ustida
                  ishlab kelaman.
                </motion.p>
              </div>
            </div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: baseDelay + 0.56, ease: EASE_OUT_EXPO }}
              className="mt-9 lg:mt-12 flex flex-wrap items-center gap-6"
            >
              <MagneticWrap strength={0.2}>
                <motion.a
                  href="#loyihalar"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.18, ease: EASE_OUT_EXPO }}
                  className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#101014] text-[#F3F0E8] font-medium text-sm sm:text-base rounded-lg hover:bg-[#4C5BFF] transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4C5BFF]"
                >
                  <span>Loyihalarni ko‘rish</span>
                  <ArrowDownRight
                    className="w-4 h-4 text-[#C7FF3D] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                    aria-hidden="true"
                  />
                </motion.a>
              </MagneticWrap>

              <motion.a
                href="#haqimda"
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.16 }}
                className="group inline-flex items-center gap-1.5 text-sm sm:text-base font-medium text-[#101014] border-b border-[#101014]/35 pb-0.5 hover:border-[#FF654F] hover:text-[#FF654F] transition-colors duration-150 whitespace-nowrap shrink-0"
              >
                <span>Men haqimda</span>
                <ArrowUpRight
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </motion.a>
            </motion.div>
          </div>

          {/* Right Column: Overlapping Real Project Screenshots Showcase */}
          <motion.div
            style={{ perspective: isFinePointer ? 1200 : undefined }}
            className="lg:col-span-6 relative min-h-[450px] sm:min-h-[530px] lg:min-h-[570px] flex flex-col justify-center"
          >
            {/* Electric Lime & Cobalt Architectural Backing Planes */}
            <motion.div
              aria-hidden="true"
              style={
                prefersReducedMotion
                  ? undefined
                  : { y: backdropParallaxY, x: isFinePointer ? fieldOffsetX : 0 }
              }
              initial={prefersReducedMotion ? false : { clipPath: 'inset(0% 0% 100% 0%)' }}
              animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
              transition={{ duration: 0.85, delay: baseDelay + 0.1, ease: EASE_OUT_EXPO }}
              className="hidden sm:block absolute top-4 right-2 w-[78%] h-[78%] bg-[#C7FF3D] -z-10"
            />
            <motion.div
              aria-hidden="true"
              style={prefersReducedMotion ? undefined : { y: cobaltParallaxY }}
              initial={prefersReducedMotion ? false : { clipPath: 'inset(100% 0% 0% 0%)' }}
              animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
              transition={{ duration: 0.8, delay: baseDelay + 0.2, ease: EASE_OUT_EXPO }}
              className="hidden sm:block absolute bottom-2 left-2 w-[50%] h-[44%] bg-[#4C5BFF] -z-10"
            />

            {/* Interactive 3D Layered Project Collage */}
            <motion.div
              style={
                !prefersReducedMotion && isFinePointer
                  ? {
                      rotateX: stageRotateX,
                      rotateY: stageRotateY,
                      transformStyle: 'preserve-3d',
                    }
                  : undefined
              }
              className="relative w-full h-full flex flex-col justify-center"
            >
              {/* Primary Project 01: Tesla */}
              {tesla && (
                <motion.button
                  type="button"
                  onClick={() => onSelectProject(tesla)}
                  style={prefersReducedMotion ? undefined : { y: teslaCardY }}
                  initial={
                    prefersReducedMotion
                      ? false
                      : { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0.2 }
                  }
                  animate={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
                  transition={{ duration: 0.88, delay: baseDelay + 0.14, ease: EASE_OUT_EXPO }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  whileTap={{ scale: 0.985 }}
                  className="group relative z-10 w-[92%] sm:w-[82%] ml-auto mr-1 sm:mr-4 bg-[#101014] p-2 sm:p-2.5 text-left shadow-2xl cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4C5BFF]"
                >
                  <div className="relative overflow-hidden bg-[#101014]">
                    <ResilientImage
                      src={tesla.imageUrl}
                      alt={tesla.imageAlt}
                      loading="eager"
                      fallbackBg="#101014"
                      fallbackTitle={tesla.title}
                      className="w-full h-auto block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="pt-2.5 pb-0.5 px-1 flex items-baseline justify-between gap-3 text-[#F3F0E8]">
                    <span className="font-display font-bold text-xs sm:text-sm truncate">
                      {tesla.title}
                    </span>
                    <span className="font-mono text-[11px] text-[#C7FF3D] tabular-nums shrink-0">
                      {tesla.index}
                    </span>
                  </div>
                </motion.button>
              )}

              {/* Project 02: Xiaomi */}
              {xiaomi && (
                <motion.button
                  type="button"
                  onClick={() => onSelectProject(xiaomi)}
                  style={prefersReducedMotion ? undefined : { y: xiaomiCardY }}
                  initial={
                    prefersReducedMotion
                      ? false
                      : { clipPath: 'inset(0% 100% 0% 0%)', opacity: 0.2 }
                  }
                  animate={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
                  transition={{ duration: 0.82, delay: baseDelay + 0.28, ease: EASE_OUT_EXPO }}
                  whileHover={{ y: -6, scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  className="group relative sm:absolute sm:top-5 sm:left-0 z-20 mt-4 sm:mt-0 w-[84%] sm:w-[58%] bg-[#F3F0E8] border border-[#101014] p-2 text-left shadow-xl cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4C5BFF]"
                >
                  <div className="relative overflow-hidden bg-[#F4F5F7]">
                    <ResilientImage
                      src={xiaomi.imageUrl}
                      alt={xiaomi.imageAlt}
                      loading="eager"
                      fallbackBg="#C7FF3D"
                      fallbackTitle={xiaomi.title}
                      className="w-full h-auto block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="pt-2 pb-0.5 px-1 flex items-baseline justify-between gap-2 text-[#101014]">
                    <span className="font-display font-bold text-xs sm:text-sm truncate">
                      {xiaomi.title}
                    </span>
                    <span className="font-mono text-[11px] text-[#4C5BFF] font-medium tabular-nums shrink-0">
                      {xiaomi.index}
                    </span>
                  </div>
                </motion.button>
              )}

              {/* Project 03: Snickers */}
              {snickers && (
                <motion.button
                  type="button"
                  onClick={() => onSelectProject(snickers)}
                  style={prefersReducedMotion ? undefined : { y: snickersCardY }}
                  initial={
                    prefersReducedMotion
                      ? false
                      : { clipPath: 'inset(0% 0% 100% 0%)', opacity: 0.2 }
                  }
                  animate={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
                  transition={{ duration: 0.82, delay: baseDelay + 0.4, ease: EASE_OUT_EXPO }}
                  whileHover={{ y: -6, scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  className="group relative sm:absolute sm:bottom-3 sm:left-6 z-20 mt-4 sm:mt-0 w-[86%] sm:w-[62%] ml-auto sm:ml-0 bg-[#FF654F] border border-[#101014] p-2 text-left shadow-2xl cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4C5BFF]"
                >
                  <div className="relative overflow-hidden bg-[#3B1706]">
                    <ResilientImage
                      src={snickers.imageUrl}
                      alt={snickers.imageAlt}
                      loading="eager"
                      fallbackBg="#3B1706"
                      fallbackTitle={snickers.title}
                      className="w-full h-auto block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="pt-2 pb-0.5 px-1 flex items-baseline justify-between gap-2 text-[#F3F0E8]">
                    <span className="font-display font-bold text-xs truncate">
                      {snickers.title}
                    </span>
                    <ArrowUpRight
                      className="w-3.5 h-3.5 text-[#C7FF3D] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </div>
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        </div>

        {/* Truthful 4-Column Overview Strip */}
        <div ref={stripRef} className="mt-16 lg:mt-20 pt-8 relative">
          <motion.div
            aria-hidden="true"
            initial={prefersReducedMotion ? false : { scaleX: 0 }}
            animate={stripInView || prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.85, ease: EASE_OUT_EXPO }}
            style={{ transformOrigin: 'left center' }}
            className="absolute top-0 left-0 right-0 h-[1px] bg-[#101014]/20"
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {HERO_HIGHLIGHTS.map((item, idx) => (
              <div key={item.label} className="flex flex-col overflow-hidden">
                <motion.span
                  initial={prefersReducedMotion ? false : { y: '105%', opacity: 0 }}
                  animate={
                    stripInView || prefersReducedMotion
                      ? { y: '0%', opacity: 1 }
                      : { y: '105%', opacity: 0 }
                  }
                  transition={{ duration: 0.65, delay: idx * 0.08, ease: EASE_OUT_EXPO }}
                  className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-[#101014] tabular-nums inline-block"
                >
                  {item.value}
                </motion.span>
                <span className="mt-1 text-xs sm:text-sm text-[#101014]/68">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Velocity-Driven Dark Marquee Bridge Into Pinned Projects Gallery */}
      <motion.div
        style={prefersReducedMotion ? undefined : { skewX: marqueeSkew }}
        className="bg-[#101014] text-[#F3F0E8] py-3.5 overflow-hidden border-t border-[#101014]"
      >
        <div className="animate-marquee font-display text-xs sm:text-sm tracking-wide font-medium">
          {[0, 1].map((loopIndex) => (
            <div key={loopIndex} className="flex items-center shrink-0">
              <span className="px-4">{PROFILE.fullName}</span>
              <span className="text-[#C7FF3D]" aria-hidden="true">·</span>
              <span className="px-4">Web Development</span>
              <span className="text-[#FF654F]" aria-hidden="true">·</span>
              <span className="px-4">UI/UX Design</span>
              <span className="text-[#4C5BFF]" aria-hidden="true">·</span>
              <span className="px-4">Tesla · Xiaomi · Snickers</span>
              <span className="text-[#C7FF3D]" aria-hidden="true">·</span>
              <span className="px-4">{PROFILE.location}</span>
              <span className="text-[#FF654F]" aria-hidden="true">·</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
