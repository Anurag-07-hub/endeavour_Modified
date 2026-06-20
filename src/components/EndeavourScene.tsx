import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function EndeavourScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync animation with scroll: the container is 200vh tall to allow scrolling
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const word = "Endeavour\u00A0\u00A0\u00A0"; 
  const letters = word.split('');

  // 7 rows matching Jitter JSON but with increased movements to span the scroll
  const rows = [
    { id: 1, moveX: 0 },
    { id: 2, moveX: -400 },
    { id: 3, moveX: 300 },
    { id: 4, moveX: -500 }, // Middle row
    { id: 5, moveX: 200 },
    { id: 6, moveX: -400 },
    { id: 7, moveX: 0 },
  ];

  // Global scale that pops up as it enters, then settles
  const groupScale = useTransform(scrollYProgress, [0, 0.4, 0.6], [0.8, 1.2, 1]);

  // Final centered text fades in strongly as the background fades out (synced with 0.6 to 0.8)
  const finalOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  const finalScale = useTransform(scrollYProgress, [0.6, 0.8], [0.9, 1]);
  const finalY = useTransform(scrollYProgress, [0.6, 0.8], [40, 0]);
  const finalBlur = useTransform(scrollYProgress, [0.6, 0.8], ["blur(10px)", "blur(0px)"]);

  return (
    <div ref={containerRef} className="relative w-full h-[150vh] bg-black z-20">
      
      {/* Sticky container holds the animation in the viewport while scrolling the 150vh */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden">
        
        {/* Background Moving Rows */}
        <motion.div
          style={{ scale: groupScale }}
          className="flex flex-col items-center justify-center space-y-[-1vw] absolute inset-0"
        >
          {rows.map((row, rowIndex) => {
            // Calculate dynamic X movement based on scroll
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const dynamicX = useTransform(scrollYProgress, [0, 1], [0, row.moveX]);

            return (
              <motion.div
                key={`row-${row.id}`}
                style={{ x: dynamicX }}
                className="flex flex-row overflow-visible whitespace-nowrap"
              >
                {/* 3 blocks of text per row */}
                {[0, 1, 2].map((blockIndex) => (
                  <div key={`block-${blockIndex}`} className="flex">
                    {letters.map((letter, i) => {
                      // Stagger the fade out slightly based on letter position
                      const staggerOffset = (i % 5) * 0.02 + (rowIndex % 3) * 0.05;
                      // Increased opacity from [1, 0] to start brighter (100% white)
                      // eslint-disable-next-line react-hooks/rules-of-hooks
                      const individualOpacity = useTransform(scrollYProgress, [0.4 + staggerOffset, 0.6 + staggerOffset], [1, 0]);
                      // eslint-disable-next-line react-hooks/rules-of-hooks
                      const individualY = useTransform(scrollYProgress, [0.4 + staggerOffset, 0.6 + staggerOffset], [0, -40]);

                      return (
                        <motion.span
                          key={`letter-${i}`}
                          style={{ opacity: individualOpacity, y: individualY }}
                          className="text-[12vw] sm:text-[14vw] font-sans font-medium tracking-[-0.03em] text-white/90 leading-[0.8] select-none"
                        >
                          {letter}
                        </motion.span>
                      );
                    })}
                  </div>
                ))}
              </motion.div>
            );
          })}
        </motion.div>

        {/* The Final Centered "Endeavour" Text with Original Logo Styling */}
        <motion.div
          style={{ 
            opacity: finalOpacity, 
            scale: finalScale, 
            y: finalY,
            filter: finalBlur
          }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
        >
          <h1 className="text-[12vw] sm:text-[14vw] font-black uppercase text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-300 to-brand-accent tracking-[-0.02em] leading-none select-none text-center">
            Endeavour
          </h1>
        </motion.div>

      </div>
    </div>
  );
}
