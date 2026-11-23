import { useRef } from 'react';
import { Briefcase, Globe, GraduationCap, MapPin, Sparkles, Target } from 'lucide-react';
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import {
  ABOUT_PARAGRAPHS,
  ABOUT_SCULPTURE,
  FUTURE_GOALS,
  PERSONAL_QUALITIES,
  PROFILE,
  SPOKEN_LANGUAGES,
  WORK_EXPERIENCE_ITEMS,
} from '../data/portfolioData';
import { TiltSurface, useFinePointer } from './MotionPrimitives';
import { ResilientImage } from './ResilientImage';
import { SplitText } from './SplitText';

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const sculptureRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useReducedMotion();
  const isFinePointer = useFinePointer();

  const bioInView = useInView(bioRef, { once: true, margin: '80px 0px' });
  const sculptureInView = useInView(sculptureRef, { once: true, margin: '100px 0px' });
  const timelineInView = useInView(timelineRef, { once: true, margin: '80px 0px' });

  const { scrollYProgress: sectionScroll } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const { scrollYProgress: sculptureScroll } = useScroll({
    target: sculptureRef,
    offset: ['start end', 'end start'],
  });

  const { scrollYProgress: timelineScroll } = useScroll({
    target: timelineRef,
    offset: ['start 85%', 'center 55%'],
  });

  const headlineParallaxX = useTransform(sectionScroll, [0, 1], [-18, 22]);
  const svgDrawProgress = useTransform(sectionScroll, [0.08, 0.52], [0, 1]);
  const limePlaneY = useTransform(sculptureScroll, [0, 1], [-22, 24]);
  const cobaltPlaneY = useTransform(sculptureScroll, [0, 1], [32, -22]);
  const mainFrameY = useTransform(sculptureScroll, [0, 1], [20, -20]);
  const timelineSpineScale = useTransform(timelineScroll, [0, 1], [0.15, 1]);

  const shouldRevealBio = Boolean(bioInView || prefersReducedMotion);
  const shouldRevealSculpture = Boolean(sculptureInView || prefersReducedMotion);
  const shouldRevealTimeline = Boolean(timelineInView || prefersReducedMotion);

  return (
    <section
      ref={sectionRef}
      id="haqimda"
      className="relative py-16 sm:py-24 lg:py-28 bg-[#EBE6DA] border-b border-[#101014]/12 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Top Interactive Digital Poster Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Moving-Speed Oversized Headline + Masked Copy */}
          <div ref={bioRef} className="lg:col-span-7">
            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, x: -12 }}
              animate={shouldRevealBio ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
              transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
              className="text-xs sm:text-sm font-mono text-[#4C5BFF] mb-4"
            >
              04 · Men haqimda · Raqamli poster
            </motion.p>

            {/* Oversized Type Moving at Different Scroll Speed */}
            <motion.div
              style={prefersReducedMotion ? undefined : { x: headlineParallaxX }}
              className="will-change-transform"
            >
              <h2
                className="font-display font-extrabold tracking-[-0.035em] leading-[1.01] text-[#101014] text-balance"
                style={{ fontSize: 'clamp(2.15rem, 4.2vw, 3.75rem)' }}
              >
                <SplitText
                  text="G‘oyalarni qulay va funksional raqamli mahsulotga aylantirish."
                  stagger={0.045}
                />
              </h2>
            </motion.div>

            {/* Paragraph Blocks Revealed Through Moving Masks */}
            <div className="mt-9 space-y-5 text-base leading-relaxed text-[#101014]/80 max-w-[62ch]">
              {ABOUT_PARAGRAPHS.map((paragraph, index) => (
                <motion.div
                  key={index}
                  initial={
                    prefersReducedMotion
                      ? false
                      : { clipPath: 'inset(0% 0% 100% 0%)', y: 18 }
                  }
                  animate={
                    shouldRevealBio
                      ? { clipPath: 'inset(0% 0% 0% 0%)', y: 0 }
                      : { clipPath: 'inset(0% 0% 100% 0%)', y: 18 }
                  }
                  transition={{
                    duration: 0.72,
                    delay: 0.1 + index * 0.14,
                    ease: EASE_OUT_EXPO,
                  }}
                >
                  <p>{paragraph}</p>
                </motion.div>
              ))}
            </div>

            {/* Verified Personal Details Strip */}
            <div className="mt-10 pt-8 relative grid grid-cols-1 sm:grid-cols-3 gap-6">
              <motion.div
                aria-hidden="true"
                initial={prefersReducedMotion ? false : { scaleX: 0 }}
                animate={shouldRevealBio ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT_EXPO }}
                style={{ transformOrigin: 'left center' }}
                className="absolute top-0 left-0 right-0 h-[1px] bg-[#101014]/18"
              />

              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                animate={shouldRevealBio ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.5, delay: 0.25, ease: EASE_OUT_EXPO }}
              >
                <span className="block text-xs font-mono text-[#101014]/55 mb-1">Manzil</span>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#101014]">
                  <MapPin className="w-3.5 h-3.5 text-[#4C5BFF]" aria-hidden="true" />
                  {PROFILE.location}
                </span>
              </motion.div>

              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                animate={shouldRevealBio ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.5, delay: 0.33, ease: EASE_OUT_EXPO }}
              >
                <span className="block text-xs font-mono text-[#101014]/55 mb-1">Ta’lim</span>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#101014]">
                  <GraduationCap className="w-3.5 h-3.5 text-[#FF654F]" aria-hidden="true" />
                  {PROFILE.education}
                </span>
              </motion.div>

              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                animate={shouldRevealBio ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.5, delay: 0.41, ease: EASE_OUT_EXPO }}
              >
                <span className="block text-xs font-mono text-[#101014]/55 mb-1">Tajriba</span>
                <span className="text-sm font-semibold text-[#101014]">
                  {PROFILE.experienceSummary}
                </span>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Scroll-Drawn Architectural SVG Poster + 3D Layered Composition */}
          <div
            ref={sculptureRef}
            style={isFinePointer ? { perspective: 1100 } : undefined}
            className="lg:col-span-5 relative py-6"
          >
            {/* Scroll-Drawn Vector Framing Diagram */}
            <svg
              viewBox="0 0 420 520"
              aria-hidden="true"
              className="hidden sm:block absolute -inset-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)] pointer-events-none z-20"
            >
              <motion.path
                d="M 24 64 L 24 24 L 140 24"
                fill="none"
                stroke="#101014"
                strokeWidth="2"
                style={prefersReducedMotion ? undefined : { pathLength: svgDrawProgress }}
              />
              <motion.path
                d="M 396 456 L 396 496 L 260 496"
                fill="none"
                stroke="#4C5BFF"
                strokeWidth="2.5"
                style={prefersReducedMotion ? undefined : { pathLength: svgDrawProgress }}
              />
              <motion.circle
                cx="374"
                cy="58"
                r="24"
                fill="none"
                stroke="#FF654F"
                strokeWidth="2"
                style={prefersReducedMotion ? undefined : { pathLength: svgDrawProgress }}
              />
            </svg>

            {/* Layer 1: Electric Lime Offset Plane */}
            <motion.div
              aria-hidden="true"
              style={prefersReducedMotion ? undefined : { y: limePlaneY }}
              className="hidden sm:block absolute top-1 -left-4 w-3/5 h-3/5 bg-[#C7FF3D] -z-10"
            />

            {/* Layer 2: Cobalt Blue Corner Anchor */}
            <motion.div
              aria-hidden="true"
              style={prefersReducedMotion ? undefined : { y: cobaltPlaneY }}
              className="hidden sm:block absolute bottom-1 -right-3 w-2/3 h-1/2 bg-[#4C5BFF] -z-10"
            />

            {/* Layer 3: Sculptural Focal Composition */}
            <motion.div style={prefersReducedMotion ? undefined : { y: mainFrameY }}>
              <TiltSurface
                maxTilt={5}
                perspective={1000}
                glareColor="rgba(199, 255, 61, 0.16)"
                className="relative p-4 sm:p-6 bg-[#FF654F] shadow-xl border border-[#101014]"
              >
                <motion.div
                  initial={
                    prefersReducedMotion
                      ? false
                      : { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' }
                  }
                  animate={
                    shouldRevealSculpture
                      ? { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }
                      : { clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' }
                  }
                  transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
                  className="relative overflow-hidden aspect-[3/4] bg-[#F3F0E8]"
                >
                  <ResilientImage
                    src={ABOUT_SCULPTURE.src}
                    alt={ABOUT_SCULPTURE.alt}
                    fallbackBg="#F3F0E8"
                    fallbackTitle="Shakl va Rang"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.04]"
                  />
                </motion.div>
                <div className="mt-4 flex items-baseline justify-between gap-4 text-[#F3F0E8]">
                  <span className="font-display font-bold text-base">
                    Geometrik kompozitsiya
                  </span>
                  <span className="font-mono text-xs opacity-90">{PROFILE.location}</span>
                </div>
              </TiltSurface>
            </motion.div>
          </div>
        </div>

        {/* Experience Timeline & Editorial Poster Details */}
        <div
          ref={timelineRef}
          className="mt-20 lg:mt-24 pt-14 border-t border-[#101014]/15 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10"
        >
          {/* 1. Animated Experience Vertical Timeline */}
          <div className="bg-[#F3F0E8] border border-[#101014]/15 p-6">
            <div className="flex items-center gap-2.5 text-[#4C5BFF] mb-5">
              <Briefcase className="w-4 h-4" aria-hidden="true" />
              <h3 className="font-display font-bold text-lg text-[#101014]">
                Ish tajribasi
              </h3>
            </div>

            <div className="relative pl-5">
              <motion.div
                aria-hidden="true"
                style={{
                  scaleY: prefersReducedMotion ? 1 : timelineSpineScale,
                  transformOrigin: 'top center',
                }}
                className="absolute left-[5px] top-1.5 bottom-2 w-[2px] bg-[#4C5BFF]/35"
              />

              <ul className="space-y-4 text-sm text-[#101014]/85">
                {WORK_EXPERIENCE_ITEMS.map((item, idx) => (
                  <motion.li
                    key={item}
                    initial={prefersReducedMotion ? false : { opacity: 0, x: -10 }}
                    animate={
                      shouldRevealTimeline
                        ? { opacity: 1, x: 0 }
                        : { opacity: 0, x: -10 }
                    }
                    transition={{
                      duration: 0.45,
                      delay: 0.1 + idx * 0.08,
                      ease: EASE_OUT_EXPO,
                    }}
                    className="relative leading-snug"
                  >
                    <motion.span
                      aria-hidden="true"
                      initial={prefersReducedMotion ? false : { scale: 0 }}
                      animate={shouldRevealTimeline ? { scale: 1 } : { scale: 0 }}
                      transition={{
                        type: 'spring',
                        stiffness: 420,
                        damping: 22,
                        delay: 0.14 + idx * 0.08,
                      }}
                      className="absolute -left-5 top-1.5 w-3 h-3 rounded-full bg-[#C7FF3D] border-2 border-[#101014]"
                    />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* 2. Personal Qualities Editorial Column */}
          <div className="border-t-2 border-[#FF654F] pt-5">
            <div className="flex items-center gap-2.5 text-[#FF654F] mb-5">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <h3 className="font-display font-bold text-lg text-[#101014]">
                Shaxsiy fazilatlar
              </h3>
            </div>
            <ul className="space-y-3 text-sm text-[#101014]/80">
              {PERSONAL_QUALITIES.map((item, idx) => (
                <motion.li
                  key={item}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                  animate={shouldRevealTimeline ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.4, delay: 0.12 + idx * 0.05 }}
                  className="flex items-baseline gap-2.5 pb-2 border-b border-[#101014]/10 last:border-b-0"
                >
                  <span className="font-mono text-[11px] text-[#FF654F] tabular-nums">
                    0{idx + 1}
                  </span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* 3. Future Goals Editorial Column */}
          <div className="border-t-2 border-[#4C5BFF] pt-5">
            <div className="flex items-center gap-2.5 text-[#4C5BFF] mb-5">
              <Target className="w-4 h-4" aria-hidden="true" />
              <h3 className="font-display font-bold text-lg text-[#101014]">
                Kelajakdagi maqsadlar
              </h3>
            </div>
            <ul className="space-y-4 text-sm text-[#101014]/85">
              {FUTURE_GOALS.map((item, idx) => (
                <motion.li
                  key={item}
                  initial={prefersReducedMotion ? false : { opacity: 0, x: 10 }}
                  animate={shouldRevealTimeline ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
                  transition={{ duration: 0.45, delay: 0.18 + idx * 0.08 }}
                  className="flex items-baseline gap-2.5"
                >
                  <span className="w-2 h-2 bg-[#4C5BFF] shrink-0" aria-hidden="true" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* 4. Languages & Education Milestone Bridge */}
          <div className="bg-[#C7FF3D] border border-[#101014] p-6 flex flex-col justify-between text-[#101014]">
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <Globe className="w-4 h-4" aria-hidden="true" />
                <h3 className="font-display font-bold text-lg">Tillar</h3>
              </div>
              <ul className="space-y-2.5 text-sm font-semibold">
                {SPOKEN_LANGUAGES.map((lang) => (
                  <li key={lang} className="border-b border-[#101014]/15 pb-2 last:border-b-0">
                    {lang}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-5 border-t border-[#101014]/20">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#101014]/70 mb-2">
                <span>Hozirgi ta’lim</span>
                <span className="tabular-nums">~5 yil</span>
              </div>
              <div className="flex items-center gap-1.5 mb-2" aria-hidden="true">
                <span className="w-2 h-2 rounded-full bg-[#101014] shrink-0" />
                <motion.span
                  initial={prefersReducedMotion ? false : { scaleX: 0 }}
                  animate={shouldRevealTimeline ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.7, delay: 0.3, ease: EASE_OUT_EXPO }}
                  style={{ transformOrigin: 'left center' }}
                  className="h-[1.5px] flex-1 bg-[#101014]/50"
                />
                <span className="w-2 h-2 rounded-full bg-[#4C5BFF] shrink-0" />
              </div>
              <span className="font-display font-bold text-base block">
                {PROFILE.education}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
