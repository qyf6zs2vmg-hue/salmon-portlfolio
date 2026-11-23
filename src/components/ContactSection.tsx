import { useRef } from 'react';
import { ArrowUpRight, MapPin } from 'lucide-react';
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import { PROFILE } from '../data/portfolioData';
import { MagneticWrap, TiltSurface } from './MotionPrimitives';
import { SplitText } from './SplitText';

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const cardInView = useInView(cardRef, { once: true, margin: '80px 0px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end end'],
  });

  const limeBlockX = useTransform(scrollYProgress, [0, 1], [64, 0]);
  const coralBlockY = useTransform(scrollYProgress, [0, 1], [48, 0]);
  const headlineSpacing = useTransform(scrollYProgress, [0, 1], ['0.02em', '-0.04em']);

  const shouldRevealCard = Boolean(cardInView || prefersReducedMotion);

  return (
    <section
      ref={sectionRef}
      id="aloqa"
      className="relative py-20 sm:py-28 lg:py-32 bg-[#4C5BFF] text-[#F3F0E8] overflow-hidden"
    >
      {/* Scroll-Converging Geometric Color Planes */}
      <motion.div
        aria-hidden="true"
        style={prefersReducedMotion ? undefined : { x: limeBlockX }}
        className="hidden lg:block absolute top-0 right-0 w-[34%] h-24 bg-[#C7FF3D]"
      />
      <motion.div
        aria-hidden="true"
        style={prefersReducedMotion ? undefined : { y: coralBlockY }}
        className="hidden lg:block absolute bottom-0 left-0 w-44 h-44 bg-[#FF654F]"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Side: Scroll-Contracting Bold Typographic Finale */}
          <div className="lg:col-span-7">
            <p className="text-xs sm:text-sm font-mono text-[#C7FF3D] mb-4">
              05 · Aloqa · Yakuniy bosqich
            </p>

            <motion.h2
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.4rem)',
                letterSpacing: prefersReducedMotion ? '-0.035em' : headlineSpacing,
              }}
              className="font-display font-extrabold leading-[0.98] text-balance"
            >
              <SplitText text="Aloqa va hamkorlik." mode="char" stagger={0.026} />
            </motion.h2>

            <motion.p
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: 0.14, ease: EASE_OUT_EXPO }}
              className="mt-6 text-base sm:text-lg leading-relaxed text-[#F3F0E8]/85 max-w-[46ch]"
            >
              Web development va UI/UX dizayn bo‘yicha hamkorlikka qiziqish bildirsangiz,
              xizmatlar va loyihalar bo‘limlari bilan tanishib chiqishingiz mumkin.
            </motion.p>
          </div>

          {/* Right Side: Interactive 3D Verified Studio Card */}
          <div ref={cardRef} className="lg:col-span-5">
            <motion.div
              initial={
                prefersReducedMotion
                  ? false
                  : { opacity: 0, y: 28, rotateX: 8, scale: 0.97 }
              }
              animate={
                shouldRevealCard
                  ? { opacity: 1, y: 0, rotateX: 0, scale: 1 }
                  : { opacity: 0, y: 28, rotateX: 8, scale: 0.97 }
              }
              transition={{ duration: 0.72, delay: 0.08, ease: EASE_OUT_EXPO }}
            >
              <TiltSurface
                maxTilt={4.5}
                perspective={1000}
                glareColor="rgba(76, 91, 255, 0.1)"
                className="bg-[#F3F0E8] text-[#101014] p-6 sm:p-10 shadow-2xl border border-[#101014] space-y-6"
              >
                <div className="pb-5 border-b border-[#101014]/15">
                  <div className="font-display font-extrabold text-2xl tracking-tight">
                    {PROFILE.fullName}
                  </div>
                  <div className="mt-1 text-sm text-[#101014]/70">{PROFILE.role}</div>
                </div>

                <div className="flex items-center gap-2.5 text-sm font-medium text-[#101014]">
                  <MapPin className="w-4 h-4 text-[#4C5BFF] shrink-0" aria-hidden="true" />
                  <span>{PROFILE.location}</span>
                </div>

                <p className="text-sm text-[#101014]/70 leading-relaxed">
                  Aloqa ma’lumotlari va ijtimoiy tarmoq havolalari keyinchalik qo‘shiladi.
                </p>

                <div className="pt-2 flex flex-wrap gap-3">
                  <MagneticWrap strength={0.18}>
                    <motion.a
                      href="#loyihalar"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      className="group inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#101014] text-[#F3F0E8] text-xs sm:text-sm font-medium rounded-lg hover:bg-[#4C5BFF] transition-colors whitespace-nowrap"
                    >
                      <span>Loyihalar</span>
                      <ArrowUpRight
                        className="w-4 h-4 text-[#C7FF3D] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </motion.a>
                  </MagneticWrap>
                  <MagneticWrap strength={0.18}>
                    <motion.a
                      href="#xizmatlar"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      className="group inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#C7FF3D] text-[#101014] text-xs sm:text-sm font-bold rounded-lg hover:bg-[#FF654F] hover:text-[#F3F0E8] transition-colors whitespace-nowrap"
                    >
                      <span>Xizmatlar</span>
                      <ArrowUpRight
                        className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </motion.a>
                  </MagneticWrap>
                </div>
              </TiltSurface>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
