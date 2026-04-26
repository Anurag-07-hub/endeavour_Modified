import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { FadeIn } from './FadeIn';

export function Hero() {
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const textVariants = {
    hidden: { y: '120%', opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', damping: 20, stiffness: 100 },
    },
  };

  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden group">
      <div className="absolute inset-0 z-0 opacity-[0.05] border-l border-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,var(--color-white)_1px,transparent_0)] bg-[size:40px_40px]"></div>
      </div>

      <motion.div
        className="relative z-10 w-full max-w-[1024px] px-5 md:px-[60px] mx-auto flex items-center gap-10 mt-16 md:mt-20"
        style={{ y: y1, opacity }}
      >
        <div className="w-full">
          <FadeIn delay={0.2} direction="down">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-[11px] md:text-[12px] font-semibold tracking-wide mb-5 md:mb-6">
              <span>EST. 2009 — SLIET LONGOWAL</span>
            </div>
          </FadeIn>

          <motion.h1
            className="font-sans text-[44px] sm:text-[56px] lg:text-[88px] leading-[1.05] font-bold tracking-tighter text-white relative whitespace-normal flex flex-wrap gap-x-[10px] md:gap-x-[16px] lg:gap-x-[20px] -ml-[2px]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {['Strive', 'to', 'create', 'difference.'].map((word, i) => (
              <span key={i} className="overflow-hidden inline-block pb-2">
                <motion.span
                  variants={textVariants}
                  className={`inline-block ${
                    word === 'difference.'
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-[#ff4b4b]'
                      : ''
                  }`}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <FadeIn delay={0.8} direction="up">
            <p className="text-[15px] md:text-[18px] lg:text-[20px] text-brand-muted leading-[1.6] max-w-[340px] md:max-w-[500px] mt-6 md:mt-8 font-sans font-medium">
              The premier robotics and innovation body of Sant Longowal Institute of Engineering and Technology. Engineering excellence through collaborative research and competitive building.
            </p>
          </FadeIn>

          <FadeIn delay={1} direction="up" className="mt-8 md:mt-10">
            <div className="relative inline-block w-full sm:w-auto">
              {/* Blurred backdrop */}
              <div className="absolute inset-0 backdrop-blur-sm bg-brand-bg/30 pointer-events-none rounded-sm -inset-[3px]" />
              <Link
                to="/about"
                className="relative block sm:inline-block text-center px-[35px] py-[15px] border-2 border-brand-accent text-brand-accent text-[13px] uppercase tracking-[2px] hover:bg-brand-accent hover:text-brand-bg transition-colors duration-300 font-sans font-black"
              >
                EXPLORE ABOUT US
              </Link>
            </div>
          </FadeIn>
        </div>
      </motion.div>
    </section>
  );
}
