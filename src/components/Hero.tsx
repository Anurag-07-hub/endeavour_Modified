import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import { AnimatedText } from './AnimatedText';
import { FadeIn } from './FadeIn';
export function Hero() {
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section
      className="relative h-[768px] flex flex-col items-center justify-center overflow-hidden group"
    >
      <div className="absolute inset-0 z-0 opacity-[0.05] border-l border-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,var(--color-white)_1px,transparent_0)] bg-[size:40px_40px]"></div>
      </div>

      <motion.div
        className="relative z-10 w-full max-w-[1024px] px-[60px] mx-auto flex items-center gap-10 mt-20"
        style={{ y: y1, opacity }}
      >
        <div>
          <FadeIn delay={0.2} direction="down">
            <div className="text-[13px] uppercase tracking-[2px] text-brand-muted mb-4 font-sans font-bold">
              EST. 2009 — SLIET LONGOWAL
            </div>
          </FadeIn>

          <h1 className="font-sans text-[48px] lg:text-[60px] leading-[0.9] font-black uppercase tracking-[-3px] text-white relative -left-[5px] whitespace-normal">
            <AnimatedText text="STRIVE" className="block" />
            <AnimatedText text="TO CREATE" className="block" delay={0.2} />
            <AnimatedText splitBy="character" text="DIFFERENCE_" className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-[#ff4b4b] flex-nowrap whitespace-nowrap" delay={0.3} />
          </h1>

          <FadeIn delay={0.8} direction="up">
            <p className="text-[16px] text-brand-muted leading-[1.6] max-w-[400px] mt-8 font-sans font-bold">
              The premier robotics and innovation body of Sant Longowal Institute of Engineering and Technology. Engineering excellence through collaborative research and competitive building.
            </p>
          </FadeIn>

          <FadeIn delay={1} direction="up" className="mt-10">
            <div className="relative inline-block">
              {/* Blurred backdrop */}
              <div className="absolute inset-0 backdrop-blur-sm bg-brand-bg/30 pointer-events-none rounded-sm -inset-[3px]" />
              <Link
                to="/about"
                className="relative inline-block px-[35px] py-[15px] border-2 border-brand-accent text-brand-accent text-[13px] uppercase tracking-[2px] hover:bg-brand-accent hover:text-brand-bg transition-colors duration-300 font-sans font-black"
              >
                EXPLORE ABOUT US{/*  */}
              </Link>
            </div>
          </FadeIn>
        </div>
      </motion.div>
    </section>
  );
}
