import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

interface LetsBeginTransitionProps {
  onComplete: () => void;
}

export function LetsBeginTransition({ onComplete }: LetsBeginTransitionProps) {
  const [phase, setPhase] = useState(0);
  const columns = [0, 1, 2, 3, 4];

  useEffect(() => {
    // T=0: Columns slide in
    const t1 = setTimeout(() => setPhase(1), 800);  // Text appears
    const t2 = setTimeout(() => setPhase(2), 1800); // Zoom and pan left
    const t3 = setTimeout(() => onComplete(), 2400); // Route exactly as text leaves
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div data-cursor-hidden="true" className="fixed inset-0 z-[9999] pointer-events-none flex">
      {/* Background: 5 Vertical Columns from Option 1 */}
      {columns.map((i) => (
        <motion.div
          key={i}
          className="h-full bg-black relative"
          style={{ width: '20vw' }}
          initial={{ y: '100vh' }}
          animate={{ y: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.6, 0.05, -0.01, 0.9],
            delay: i * 0.08, // Stagger effect
          }}
        >
          {/* Subtle edge glow */}
          <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-brand-accent/20" />
        </motion.div>
      ))}

      <div className="absolute inset-0 flex items-center justify-center">
        {/* Text Animation */}
        <AnimatePresence>
          {phase >= 1 && (
            <motion.h1
              className={`absolute whitespace-nowrap font-sans font-black uppercase tracking-[-4px] md:tracking-[-8px] italic ${phase >= 2 ? '' : 'text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-red-600'}`}
              style={{ 
                fontSize: 'clamp(3rem, 8vw, 8rem)',
                color: phase >= 2 ? 'transparent' : undefined,
                WebkitTextStroke: phase >= 2 ? '2px #ef4444' : '0px',
              }}
              initial={{ scale: 0.5, opacity: 0, filter: 'blur(10px)', x: 0 }}
              animate={{ 
                scale: phase >= 2 ? 40 : 1, 
                x: phase >= 2 ? '-150vw' : 0, // Slide completely to the left
                opacity: 1,
                filter: 'blur(0px)'
              }}
              transition={{ 
                duration: phase >= 2 ? 0.8 : 0.6, 
                ease: phase >= 2 ? [0.6, 0.05, -0.01, 0.9] : "easeOut" // Smooth slide out
              }}
            >
              Let's Begin
            </motion.h1>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
