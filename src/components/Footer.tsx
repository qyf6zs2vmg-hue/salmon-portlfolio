import { ArrowUp } from 'lucide-react';
import { motion } from 'motion/react';
import { PROFILE } from '../data/portfolioData';

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="bg-[#101014] text-[#F3F0E8] py-10"
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <span className="font-display font-bold text-lg tracking-tight">
            {PROFILE.fullName}
          </span>
          <span className="text-xs sm:text-sm text-[#F3F0E8]/60">
            {PROFILE.role} · {PROFILE.location}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-[#F3F0E8]/75">
          <a href="#loyihalar" className="hover:text-[#C7FF3D] transition-colors">
            Loyihalar
          </a>
          <a href="#xizmatlar" className="hover:text-[#C7FF3D] transition-colors">
            Xizmatlar
          </a>
          <a href="#haqimda" className="hover:text-[#C7FF3D] transition-colors">
            Men haqimda
          </a>
          <motion.a
            href="#top"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.16 }}
            className="group inline-flex items-center gap-1.5 text-[#C7FF3D] hover:text-[#F3F0E8] transition-colors"
          >
            <span>Yuqoriga</span>
            <ArrowUp
              className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </motion.a>
        </div>
      </div>
    </motion.footer>
  );
}
