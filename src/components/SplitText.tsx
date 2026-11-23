import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  trigger?: 'mount' | 'inView';
  mode?: 'word' | 'char';
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function SplitText({
  text,
  className = '',
  delay = 0,
  stagger = 0.045,
  once = true,
  as = 'span',
  trigger = 'inView',
  mode = 'word',
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const inView = useInView(containerRef, { once, margin: '80px 0px' });

  const shouldAnimate =
    prefersReducedMotion || trigger === 'mount' ? true : inView;

  const words = text.split(' ');
  const Tag = as;

  if (prefersReducedMotion) {
    return (
      <Tag className={className} aria-label={text}>
        {text}
      </Tag>
    );
  }

  let charCounter = 0;

  return (
    <Tag
      ref={containerRef as never}
      className={className}
      aria-label={text}
    >
      {words.map((word, wordIndex) => {
        if (mode === 'char') {
          const chars = Array.from(word);
          return (
            <span
              key={`${word}-${wordIndex}`}
              className="inline-block whitespace-nowrap"
              aria-hidden="true"
            >
              {chars.map((char, charIdx) => {
                const currentDelay = delay + charCounter * stagger;
                charCounter += 1;
                return (
                  <span
                    key={`${char}-${charIdx}`}
                    className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]"
                  >
                    <motion.span
                      className="inline-block will-change-transform"
                      initial={{ y: '112%', rotate: 3, opacity: 0.01 }}
                      animate={
                        shouldAnimate
                          ? { y: '0%', rotate: 0, opacity: 1 }
                          : { y: '112%', rotate: 3, opacity: 0.01 }
                      }
                      transition={{
                        duration: 0.65,
                        delay: currentDelay,
                        ease: EASE_OUT_EXPO,
                      }}
                    >
                      {char}
                    </motion.span>
                  </span>
                );
              })}
              {wordIndex < words.length - 1 ? '\u00A0' : ''}
            </span>
          );
        }

        return (
          <span
            key={`${word}-${wordIndex}`}
            className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em]"
            aria-hidden="true"
          >
            <motion.span
              className="inline-block will-change-transform"
              initial={{ y: '110%', opacity: 0.01 }}
              animate={
                shouldAnimate
                  ? { y: '0%', opacity: 1 }
                  : { y: '110%', opacity: 0.01 }
              }
              transition={{
                duration: 0.72,
                delay: delay + wordIndex * stagger,
                ease: EASE_OUT_EXPO,
              }}
            >
              {word}
              {wordIndex < words.length - 1 ? '\u00A0' : ''}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}
