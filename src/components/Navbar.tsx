import { useEffect, useState } from 'react';
import { ArrowDownRight, Menu, X } from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from 'motion/react';
import { PROFILE } from '../data/portfolioData';
import { MagneticWrap } from './MotionPrimitives';

const NAV_LINKS = [
  { label: 'Loyihalar', href: '#loyihalar', id: 'loyihalar', num: '01' },
  { label: 'Xizmatlar', href: '#xizmatlar', id: 'xizmatlar', num: '02' },
  { label: 'Men haqimda', href: '#haqimda', id: 'haqimda', num: '03' },
];

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('');
  const [scrolled, setScrolled] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 24);
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  useEffect(() => {
    const sectionIds = ['top', 'loyihalar', 'xizmatlar', 'haqimda', 'aloqa'];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          const id = visible[0].target.id;
          setActiveId(id === 'top' || id === 'aloqa' ? '' : id);
        }
      },
      {
        rootMargin: '-28% 0px -50% 0px',
        threshold: [0.08, 0.25, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-colors duration-300 border-b ${
          scrolled
            ? 'bg-[#F3F0E8]/96 backdrop-blur-md border-[#101014]/15 shadow-[0_8px_28px_-18px_rgba(16,16,20,0.22)]'
            : 'bg-[#F3F0E8]/90 backdrop-blur-md border-[#101014]/10'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-element Brand Wordmark */}
          <motion.a
            href="#top"
            whileHover={{ x: 2 }}
            transition={{ duration: 0.18, ease: EASE_OUT_EXPO }}
            className="font-display text-xl font-bold tracking-tight text-[#101014] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4C5BFF]"
          >
            {PROFILE.fullName}
          </motion.a>

          {/* Zone 2: Clean Single-line Navigation Links */}
          <nav aria-label="Asosiy navigatsiya" className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`group relative text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 py-1.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4C5BFF] ${
                    isActive ? 'text-[#101014]' : 'text-[#101014]/70 hover:text-[#101014]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active-indicator"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      aria-hidden="true"
                      className="absolute left-0 right-0 bottom-0 h-[2.5px] bg-[#4C5BFF]"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#FF654F] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action + Mobile Full-Screen Menu Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <MagneticWrap strength={0.2} className="hidden sm:inline-block">
              <motion.a
                href="#aloqa"
                whileHover={{ y: -1.5 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.16, ease: EASE_OUT_EXPO }}
                className="group inline-flex items-center gap-1.5 px-4 py-2 bg-[#101014] text-[#F3F0E8] text-sm font-medium rounded-lg hover:bg-[#4C5BFF] transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4C5BFF]"
              >
                <span>Aloqa</span>
                <ArrowDownRight
                  className="w-4 h-4 text-[#C7FF3D] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </motion.a>
            </MagneticWrap>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Menyuni yopish' : 'Menyuni ochish'}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#101014]/15 text-[#101014] hover:bg-[#101014]/5 transition-colors cursor-pointer"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Scroll Reading Progress Hairline */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX: smoothProgress, transformOrigin: 'left center' }}
          className="h-[2.5px] w-full bg-gradient-to-r from-[#C7FF3D] via-[#4C5BFF] to-[#FF654F] pointer-events-none"
        />
      </header>

      {/* Full-Screen Animated Curtain Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="fullscreen-mobile-menu"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(100% 0% 0% 0%)' }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 md:hidden bg-[#101014] text-[#F3F0E8] flex flex-col justify-between p-6"
          >
            <div className="flex items-center justify-between">
              <span className="font-display font-bold text-lg">{PROFILE.fullName}</span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Menyuni yopish"
                className="inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#F3F0E8]/20 text-[#F3F0E8] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav aria-label="Mobil navigatsiya" className="flex flex-col space-y-5 my-auto">
              {NAV_LINKS.map((link, idx) => (
                <div key={link.href} className="overflow-hidden">
                  <motion.a
                    href={link.href}
                    onClick={handleNavClick}
                    initial={{ y: '105%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    transition={{
                      duration: 0.45,
                      delay: 0.1 + idx * 0.06,
                      ease: EASE_OUT_EXPO,
                    }}
                    className="flex items-baseline gap-4 font-display font-extrabold text-3xl tracking-tight text-[#F3F0E8] hover:text-[#C7FF3D] transition-colors"
                  >
                    <span className="font-mono text-xs text-[#C7FF3D]">{link.num}</span>
                    <span>{link.label}</span>
                  </motion.a>
                </div>
              ))}
            </nav>

            <div className="pt-6 border-t border-[#F3F0E8]/15 space-y-4">
              <div className="text-xs font-mono text-[#F3F0E8]/60">{PROFILE.location}</div>
              <a
                href="#aloqa"
                onClick={handleNavClick}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#C7FF3D] text-[#101014] text-sm font-bold rounded-lg cursor-pointer"
              >
                <span>Aloqa</span>
                <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
