import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { PhaseGenesis } from './PhaseGenesis';
import { PhaseScaling } from './PhaseScaling';
import { PhasePandemic } from './PhasePandemic';
import { PhaseLegacy } from './PhaseLegacy';

export function HistoryCircuit() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section 
      ref={containerRef} 
      className="relative bg-brand-bg z-10 w-full overflow-hidden"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"></div>
      
      <div className="relative z-10 w-full">
        {/* Intro Section */}
        <div className="max-w-[1024px] mx-auto px-4 md:px-[60px] pt-32 pb-10 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-syncopate text-[40px] md:text-[60px] font-black uppercase tracking-[-2px] text-white leading-[1]"
          >
            OUR <span className="text-brand-accent">ACHIEVEMENTS !</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-roboto text-brand-muted mt-6 max-w-2xl mx-auto uppercase tracking-widest text-sm"
          >
            Tracking the legacy
          </motion.p>
        </div>

        {/* Phase Components */}
        <PhaseGenesis />
        <PhaseScaling />
        <PhasePandemic />
        <PhaseLegacy />
        
      </div>
    </section>
  );
}
