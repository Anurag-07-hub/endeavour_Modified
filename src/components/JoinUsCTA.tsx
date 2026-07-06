import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function JoinUsCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"]
  });

  const clipSize = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const clipPath = useTransform(clipSize, (v) => `circle(${v}% at 50% 50%)`);

  const textY = useTransform(scrollYProgress, [0.5, 1], [100, 0]);
  const textOpacity = useTransform(scrollYProgress, [0.5, 1], [0, 1]);

  const pY = useTransform(scrollYProgress, [0.6, 1], [60, 0]);
  const pOpacity = useTransform(scrollYProgress, [0.6, 1], [0, 1]);

  const btnY = useTransform(scrollYProgress, [0.7, 1], [40, 0]);
  const btnOpacity = useTransform(scrollYProgress, [0.7, 1], [0, 1]);

  return (
    <div ref={containerRef} className="relative h-[150vh] z-0 bg-transparent">
      <motion.section 
        style={{ clipPath }}
        data-cursor="enroll"
        onClick={() => window.location.href = '/join-us'}
        className="sticky top-0 h-screen w-full bg-white text-center border-t border-black/5 z-0 flex flex-col justify-center overflow-hidden cursor-none"
      >
        {/* Subtle grey shade background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-black/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="w-full max-w-[1400px] mx-auto px-4 relative z-10 flex flex-col items-center">
          <motion.h2 
            style={{ y: textY, opacity: textOpacity }}
            className="font-sans text-[12vw] md:text-[9vw] font-black tracking-[-0.05em] text-black leading-[0.85] lowercase mb-8"
          >
            let's become the part of us
          </motion.h2>
          
          <motion.p 
            style={{ y: pY, opacity: pOpacity }}
            className="text-xl md:text-4xl text-black/60 max-w-4xl mx-auto leading-[1.1] font-medium tracking-tight mb-12"
          >
            Perfectly aligned creative and technical expertise to increase digital impact. join our team to become future endeavour
          </motion.p>
        </div>
      </motion.section>
    </div>
  );
}
