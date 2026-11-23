import { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { SERVICES_LIST, ServiceItem } from '../data/portfolioData';
import { TiltSurface } from './MotionPrimitives';
import { SplitText } from './SplitText';

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

function ServiceBlueprintGraphic({ service }: { service: ServiceItem }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 320 240"
      className="w-full max-w-[300px] h-auto mx-auto"
      aria-hidden="true"
    >
      {/* Background Architectural Frame */}
      <rect
        x="16"
        y="16"
        width="288"
        height="208"
        fill="none"
        stroke="#F3F0E8"
        strokeOpacity="0.16"
        strokeWidth="1"
      />

      {service.iconKey === 'layout' && (
        <g>
          <motion.rect
            x="38"
            y="38"
            width="244"
            height="32"
            fill="#C7FF3D"
            initial={prefersReducedMotion ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            style={{ transformOrigin: 'left center' }}
          />
          <motion.rect
            x="38"
            y="84"
            width="148"
            height="112"
            fill="none"
            stroke="#4C5BFF"
            strokeWidth="3"
            initial={prefersReducedMotion ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.65, ease: EASE_OUT_EXPO }}
          />
          <motion.rect
            x="200"
            y="84"
            width="82"
            height="50"
            fill="#FF654F"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12 }}
          />
          <motion.rect
            x="200"
            y="146"
            width="82"
            height="50"
            fill="#F3F0E8"
            fillOpacity="0.14"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
          />
        </g>
      )}

      {service.iconKey === 'briefcase' && (
        <g>
          {[0, 1, 2].map((step) => (
            <motion.rect
              key={step}
              x={52 + step * 52}
              y={52 + step * 20}
              width="120"
              height="120"
              fill={step === 1 ? '#4C5BFF' : 'none'}
              stroke={step === 2 ? '#C7FF3D' : '#F3F0E8'}
              strokeWidth="2.5"
              initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: step * 0.1, ease: EASE_OUT_EXPO }}
            />
          ))}
        </g>
      )}

      {service.iconKey === 'cart' && (
        <g>
          <motion.circle
            cx="116"
            cy="120"
            r="58"
            fill="#FF654F"
            initial={prefersReducedMotion ? false : { scale: 0.6 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 280, damping: 20 }}
          />
          <motion.rect
            x="148"
            y="72"
            width="116"
            height="96"
            fill="#C7FF3D"
            initial={prefersReducedMotion ? false : { x: 24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          />
          <circle cx="206" cy="120" r="18" fill="#101014" />
        </g>
      )}

      {service.iconKey === 'palette' && (
        <g>
          <motion.path
            d="M44 180 C95 45, 225 195, 276 60"
            fill="none"
            stroke="#C7FF3D"
            strokeWidth="4"
            initial={prefersReducedMotion ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          />
          <circle cx="44" cy="180" r="9" fill="#FF654F" />
          <circle cx="160" cy="120" r="14" fill="#4C5BFF" />
          <circle cx="276" cy="60" r="9" fill="#C7FF3D" />
        </g>
      )}

      {service.iconKey === 'smartphone' && (
        <g>
          <motion.rect
            x="40"
            y="46"
            width="154"
            height="148"
            fill="none"
            stroke="#4C5BFF"
            strokeWidth="3"
            initial={prefersReducedMotion ? false : { scaleX: 0.7 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          />
          <motion.rect
            x="212"
            y="60"
            width="68"
            height="120"
            rx="8"
            fill="#C7FF3D"
            initial={prefersReducedMotion ? false : { y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE_OUT_EXPO }}
          />
        </g>
      )}

      {service.iconKey === 'code' && (
        <g>
          <motion.ellipse
            cx="160"
            cy="120"
            rx="94"
            ry="34"
            fill="none"
            stroke="#C7FF3D"
            strokeWidth="2.5"
            animate={prefersReducedMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
            style={{ originX: '160px', originY: '120px' }}
          />
          <ellipse
            cx="160"
            cy="120"
            rx="94"
            ry="34"
            fill="none"
            stroke="#4C5BFF"
            strokeWidth="2.5"
            transform="rotate(60 160 120)"
          />
          <ellipse
            cx="160"
            cy="120"
            rx="94"
            ry="34"
            fill="none"
            stroke="#FF654F"
            strokeWidth="2.5"
            transform="rotate(120 160 120)"
          />
          <circle cx="160" cy="120" r="14" fill="#F3F0E8" />
        </g>
      )}

      {service.iconKey === 'layers' && (
        <g>
          {[0, 1, 2].map((layer) => (
            <motion.polygon
              key={layer}
              points="160,42 262,84 160,126 58,84"
              transform={`translate(0 ${layer * 34})`}
              fill={layer === 0 ? '#C7FF3D' : layer === 1 ? '#4C5BFF' : '#FF654F'}
              fillOpacity={0.85}
              initial={prefersReducedMotion ? false : { y: -14, opacity: 0 }}
              animate={{ y: 0, opacity: 0.9 }}
              transition={{ duration: 0.45, delay: layer * 0.1 }}
            />
          ))}
        </g>
      )}

      {service.iconKey === 'database' && (
        <g>
          {[0, 1, 2].map((disk) => (
            <motion.g
              key={disk}
              initial={prefersReducedMotion ? false : { y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: disk * 0.1 }}
            >
              <ellipse
                cx="160"
                cy={72 + disk * 44}
                rx="78"
                ry="18"
                fill={disk === 0 ? '#C7FF3D' : disk === 1 ? '#4C5BFF' : '#FF654F'}
              />
            </motion.g>
          ))}
        </g>
      )}

      {service.iconKey === 'refresh' && (
        <g>
          <motion.circle
            cx="160"
            cy="120"
            r="64"
            fill="none"
            stroke="#C7FF3D"
            strokeWidth="8"
            strokeDasharray="150 55"
            animate={prefersReducedMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
            style={{ originX: '160px', originY: '120px' }}
          />
          <rect x="136" y="96" width="48" height="48" fill="#4C5BFF" />
        </g>
      )}

      {service.iconKey === 'sparkles' && (
        <g>
          <motion.polygon
            points="160,36 186,98 250,120 186,142 160,204 134,142 70,120 134,98"
            fill="#C7FF3D"
            initial={prefersReducedMotion ? false : { scale: 0.7, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
            style={{ originX: '160px', originY: '120px' }}
          />
          <circle cx="160" cy="120" r="20" fill="#101014" />
        </g>
      )}
    </svg>
  );
}

export function ServicesSection() {
  const listRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const listInView = useInView(listRef, { once: true, margin: '80px 0px' });
  const [activeIndex, setActiveIndex] = useState(0);

  const shouldReveal = Boolean(listInView || prefersReducedMotion);
  const activeService = SERVICES_LIST[activeIndex] || SERVICES_LIST[0];

  return (
    <section
      id="xizmatlar"
      className="relative py-16 sm:py-24 lg:py-28 bg-[#F3F0E8] border-b border-[#101014]/12"
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <p className="text-xs sm:text-sm font-mono text-[#FF654F] mb-3">
              03 · Xizmatlar
            </p>
            <SplitText
              as="h2"
              text="Taklif etiladigan yo‘nalishlar"
              className="font-display font-extrabold tracking-[-0.035em] leading-[1.02] text-[#101014] text-balance block text-[clamp(2.1rem,3.9vw,3.4rem)]"
              stagger={0.045}
            />
          </div>

          <p className="text-sm sm:text-base text-[#101014]/70 max-w-[42ch]">
            Zamonaviy veb-saytlar, foydalanuvchi interfeyslari va funksional veb-ilovalarni
            yaratish bo‘yicha 10 ta asosiy xizmat.
          </p>
        </div>

        {/* Experimental Editorial Split List + Live Geometric Blueprint Preview */}
        <div ref={listRef} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left: Interactive Horizontal Editorial List (10 Services) */}
          <div className="lg:col-span-7 border-t border-[#101014]/15">
            {SERVICES_LIST.map((service, idx) => {
              const isActive = activeIndex === idx;
              return (
                <motion.div
                  key={service.index}
                  initial={prefersReducedMotion ? false : { opacity: 0, x: -18 }}
                  animate={shouldReveal ? { opacity: 1, x: 0 } : { opacity: 0, x: -18 }}
                  transition={{
                    duration: 0.5,
                    delay: idx * 0.04,
                    ease: EASE_OUT_EXPO,
                  }}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onFocus={() => setActiveIndex(idx)}
                  className="relative border-b border-[#101014]/15"
                >
                  <button
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    aria-expanded={isActive}
                    className="group w-full py-5 sm:py-6 px-2 sm:px-3 flex items-center justify-between gap-4 text-left cursor-pointer relative overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4C5BFF]"
                  >
                    {/* Animated Background Highlight Swipe */}
                    {isActive && (
                      <motion.span
                        layoutId="service-active-row"
                        transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                        aria-hidden="true"
                        className="absolute inset-0 bg-[#101014] -z-10"
                      />
                    )}

                    <div className="flex items-baseline gap-4 sm:gap-6 min-w-0">
                      <span
                        className={`font-mono text-xs sm:text-sm tabular-nums shrink-0 transition-colors ${
                          isActive ? 'text-[#C7FF3D]' : 'text-[#101014]/50'
                        }`}
                      >
                        {service.index}
                      </span>

                      <div className="min-w-0">
                        <h3
                          style={{
                            fontVariationSettings: `"wght" ${isActive ? 800 : 650}, "wdth" ${
                              isActive ? 100 : 90
                            }, "opsz" 48`,
                          }}
                          className={`font-var-kinetic font-display text-xl sm:text-2xl tracking-tight transition-colors ${
                            isActive ? 'text-[#F3F0E8]' : 'text-[#101014] group-hover:text-[#4C5BFF]'
                          }`}
                        >
                          {service.title}
                        </h3>
                        <p
                          className={`mt-1 text-xs sm:text-sm transition-colors ${
                            isActive ? 'text-[#F3F0E8]/75' : 'text-[#101014]/65'
                          }`}
                        >
                          {service.descriptor}
                        </p>
                      </div>
                    </div>

                    <ArrowUpRight
                      className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                        isActive
                          ? 'text-[#C7FF3D] translate-x-0.5 -translate-y-0.5'
                          : 'text-[#101014]/35 group-hover:text-[#101014]'
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {/* Mobile Inline Visual Accordion (< lg) */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden overflow-hidden bg-[#101014] text-[#F3F0E8] px-4 py-6"
                      >
                        <ServiceBlueprintGraphic service={service} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Right: Sticky Live Interactive Blueprint Composition (Desktop lg+) */}
          <div className="hidden lg:block lg:col-span-5 sticky top-24">
            <TiltSurface
              maxTilt={5}
              perspective={1000}
              glareColor="rgba(199, 255, 61, 0.14)"
              className="bg-[#101014] text-[#F3F0E8] p-8 border border-[#101014] shadow-2xl min-h-[460px] flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-xs font-mono text-[#F3F0E8]/60">
                <span>Xizmat modeli</span>
                <span className="text-[#C7FF3D] tabular-nums">
                  {activeService.index} / 10
                </span>
              </div>

              <div className="my-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeService.index}
                    initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
                    transition={{ duration: 0.28, ease: EASE_OUT_EXPO }}
                  >
                    <ServiceBlueprintGraphic service={activeService} />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="pt-5 border-t border-[#F3F0E8]/15">
                <div className="font-display font-bold text-xl text-[#F3F0E8]">
                  {activeService.title}
                </div>
                <p className="mt-1.5 text-sm text-[#F3F0E8]/75">
                  {activeService.descriptor}
                </p>
              </div>
            </TiltSurface>
          </div>
        </div>
      </div>
    </section>
  );
}
