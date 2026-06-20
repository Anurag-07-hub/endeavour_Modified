import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Props {
  onComplete: () => void;
}

export function LetsBeginTransition({ onComplete }: Props) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 500);  // 1 dot -> 9 dots
    const t2 = setTimeout(() => setPhase(2), 1200); // Rotate and line up horizontally
    const t3 = setTimeout(() => setPhase(3), 1800); // Morph into "Let's Begin" text
    const t4 = setTimeout(() => setPhase(4), 2400); // Turn into wireframe, zoom, and pan left (instantly after morph)
    const t5 = setTimeout(() => onComplete(), 3200); // Finish and route exactly as zoom finishes
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  // We use 9 dots because "LetsBegin" has 9 letters
  const dots = Array.from({ length: 9 }, (_, i) => i);

  return (
    <motion.div 
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden pointer-events-none"
      style={{ backgroundColor: '#000000' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative flex items-center justify-center w-full h-full">
        
        {/* Phase 1 & 2: 9 Dots Animation */}
        <AnimatePresence>
          {phase < 3 && (
            <motion.div 
              className="absolute flex justify-center items-center gap-3"
              style={{ 
                width: phase === 2 ? '400px' : '100px', // 3x3 grid vs horizontal line
                flexWrap: phase === 2 ? 'nowrap' : 'wrap',
              }}
              initial={{ scale: 0 }}
              animate={{ 
                scale: 1, 
                rotate: phase === 1 ? 90 : (phase === 2 ? 180 : 0)
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {dots.map((i) => (
                <motion.div
                  key={i}
                  className="rounded-full shadow-[0_0_15px_rgba(227,251,70,0.5)] shrink-0"
                  style={{ backgroundColor: '#e3fb46', width: '20px', height: '20px' }}
                  initial={{ scale: i === 4 ? 1 : 0 }} // Start with center dot of 3x3
                  animate={{ scale: phase >= 1 || i === 4 ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phase 3 & 4: Text Animation */}
        <AnimatePresence>
          {phase >= 3 && (
            <motion.h1
              className="absolute whitespace-nowrap font-sans font-black uppercase tracking-[-4px] md:tracking-[-8px] italic"
              style={{ 
                color: phase >= 4 ? 'transparent' : '#e3fb46',
                WebkitTextStroke: phase >= 4 ? '2px #e3fb46' : '0px',
                fontSize: 'clamp(3rem, 8vw, 8rem)',
              }}
              initial={{ scale: 0.5, opacity: 0, filter: 'blur(10px)', x: 0 }}
              animate={{ 
                scale: phase >= 4 ? 40 : 1, 
                x: phase >= 4 ? '-150vw' : 0, // Slide out completely to the left
                opacity: 1,
                filter: 'blur(0px)'
              }}
              transition={{ 
                duration: phase >= 4 ? 0.8 : 0.6, 
                ease: phase >= 4 ? [0.6, 0.05, -0.01, 0.9] : "backOut" // Dramatic zoom and slide
              }}
            >
              Let's Begin
            </motion.h1>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
}
