import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { LetsBeginTransition } from './LetsBeginTransition';
import { InteractiveCircuitBackground } from './InteractiveCircuitBackground';

export function Hero() {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const letters = "ENDEAVOUR".split("");

  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-brand-bg px-4 py-12 md:py-20 z-0 transition-colors duration-500">
      
      {/* Spacious Major-Minor Engineering Blueprint Grid Backdrop */}
      <div 
        className="absolute inset-0 z-0 opacity-100 pointer-events-none" 
        style={{ 
          backgroundImage: `
            linear-gradient(to right, var(--color-grid-lines) 1px, transparent 1px), 
            linear-gradient(to bottom, var(--color-grid-lines) 1px, transparent 1px),
            linear-gradient(to right, var(--color-grid-lines) 0.5px, transparent 0.5px), 
            linear-gradient(to bottom, var(--color-grid-lines) 0.5px, transparent 0.5px)
          `, 
          backgroundSize: '120px 120px, 120px 120px, 20px 20px, 20px 20px'
        }} 
      />
      
      {/* Subtle Dot Grid */}
      <div 
        className="absolute inset-0 z-0 opacity-100 pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(var(--color-grid-dots) 1px, transparent 1px)', 
          backgroundSize: '20px 20px' 
        }} 
      />

      {/* Blueprint Corner Ticks & Coordinates */}
      <div className="absolute top-4 left-6 z-0 pointer-events-none hidden md:flex items-center gap-1.5 font-mono text-[9px] text-brand-muted/40 select-none tracking-widest uppercase transition-colors duration-500">
        <span className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-pulse" />
        <span>SYS_INIT // REF_A1_0204</span>
      </div>
      <div className="absolute top-4 right-6 z-0 pointer-events-none hidden md:block font-mono text-[9px] text-brand-muted/40 select-none tracking-widest uppercase text-right transition-colors duration-500">
        <span>ENDEAVOUR_SYS // V20.26</span>
      </div>
      <div className="absolute bottom-6 left-6 z-0 pointer-events-none hidden md:block font-mono text-[9px] text-brand-muted/40 select-none tracking-widest uppercase transition-colors duration-500">
        <span>SCALE // 1:1 // METRIC</span>
      </div>
      <div className="absolute bottom-6 right-6 z-0 pointer-events-none hidden md:block font-mono text-[9px] text-brand-muted/40 select-none tracking-widest uppercase text-right transition-colors duration-500">
        <span>GRID_UNIT // 20MM</span>
      </div>

      {/* Technical Corner Crosshairs */}
      <svg className="absolute top-4 left-4 w-3.5 h-3.5 text-[var(--color-circuit-stroke)] pointer-events-none hidden md:block z-0 transition-colors duration-500" viewBox="0 0 16 16">
        <line x1="8" y1="0" x2="8" y2="16" stroke="currentColor" strokeWidth="1.2" />
        <line x1="0" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <svg className="absolute top-4 right-4 w-3.5 h-3.5 text-[var(--color-circuit-stroke)] pointer-events-none hidden md:block z-0 transition-colors duration-500" viewBox="0 0 16 16">
        <line x1="8" y1="0" x2="8" y2="16" stroke="currentColor" strokeWidth="1.2" />
        <line x1="0" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <svg className="absolute bottom-6 left-4 w-3.5 h-3.5 text-[var(--color-circuit-stroke)] pointer-events-none hidden md:block z-0 transition-colors duration-500" viewBox="0 0 16 16">
        <line x1="8" y1="0" x2="8" y2="16" stroke="currentColor" strokeWidth="1.2" />
        <line x1="0" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <svg className="absolute bottom-6 right-4 w-3.5 h-3.5 text-[var(--color-circuit-stroke)] pointer-events-none hidden md:block z-0 transition-colors duration-500" viewBox="0 0 16 16">
        <line x1="8" y1="0" x2="8" y2="16" stroke="currentColor" strokeWidth="1.2" />
        <line x1="0" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="1.2" />
      </svg>

      {/* Side Vertical Ruler Scales */}
      <svg className="absolute left-3 top-1/4 bottom-1/4 w-6 h-1/2 text-[var(--color-circuit-stroke)] pointer-events-none hidden lg:block z-0 opacity-60 transition-colors duration-500" viewBox="0 0 24 400" preserveAspectRatio="none">
        <line x1="6" y1="0" x2="6" y2="400" stroke="currentColor" strokeWidth="1.2" />
        <line x1="6" y1="40" x2="14" y2="40" stroke="currentColor" strokeWidth="1.2" />
        <line x1="6" y1="80" x2="14" y2="80" stroke="currentColor" strokeWidth="1.2" />
        <line x1="6" y1="120" x2="14" y2="120" stroke="currentColor" strokeWidth="1.2" />
        <line x1="6" y1="160" x2="14" y2="160" stroke="currentColor" strokeWidth="1.2" />
        <line x1="6" y1="200" x2="14" y2="200" stroke="currentColor" strokeWidth="1.2" />
        <line x1="6" y1="240" x2="14" y2="240" stroke="currentColor" strokeWidth="1.2" />
        <line x1="6" y1="280" x2="14" y2="280" stroke="currentColor" strokeWidth="1.2" />
        <line x1="6" y1="320" x2="14" y2="320" stroke="currentColor" strokeWidth="1.2" />
        <line x1="6" y1="360" x2="14" y2="360" stroke="currentColor" strokeWidth="1.2" />
        <line x1="6" y1="20" x2="10" y2="20" stroke="currentColor" strokeWidth="0.8" />
        <line x1="6" y1="60" x2="10" y2="60" stroke="currentColor" strokeWidth="0.8" />
        <line x1="6" y1="100" x2="10" y2="100" stroke="currentColor" strokeWidth="0.8" />
        <line x1="6" y1="140" x2="10" y2="140" stroke="currentColor" strokeWidth="0.8" />
        <line x1="6" y1="180" x2="10" y2="180" stroke="currentColor" strokeWidth="0.8" />
        <line x1="6" y1="220" x2="10" y2="220" stroke="currentColor" strokeWidth="0.8" />
        <line x1="6" y1="260" x2="10" y2="260" stroke="currentColor" strokeWidth="0.8" />
        <line x1="6" y1="300" x2="10" y2="300" stroke="currentColor" strokeWidth="0.8" />
        <line x1="6" y1="340" x2="10" y2="340" stroke="currentColor" strokeWidth="0.8" />
        <line x1="6" y1="380" x2="10" y2="380" stroke="currentColor" strokeWidth="0.8" />
      </svg>
      <svg className="absolute right-3 top-1/4 bottom-1/4 w-6 h-1/2 text-[var(--color-circuit-stroke)] pointer-events-none hidden lg:block z-0 opacity-60 transition-colors duration-500" viewBox="0 0 24 400" preserveAspectRatio="none">
        <line x1="18" y1="0" x2="18" y2="400" stroke="currentColor" strokeWidth="1.2" />
        <line x1="18" y1="40" x2="10" y2="40" stroke="currentColor" strokeWidth="1.2" />
        <line x1="18" y1="80" x2="10" y2="80" stroke="currentColor" strokeWidth="1.2" />
        <line x1="18" y1="120" x2="10" y2="120" stroke="currentColor" strokeWidth="1.2" />
        <line x1="18" y1="160" x2="10" y2="160" stroke="currentColor" strokeWidth="1.2" />
        <line x1="18" y1="200" x2="10" y2="200" stroke="currentColor" strokeWidth="1.2" />
        <line x1="18" y1="240" x2="10" y2="240" stroke="currentColor" strokeWidth="1.2" />
        <line x1="18" y1="280" x2="10" y2="280" stroke="currentColor" strokeWidth="1.2" />
        <line x1="18" y1="320" x2="10" y2="320" stroke="currentColor" strokeWidth="1.2" />
        <line x1="18" y1="360" x2="10" y2="360" stroke="currentColor" strokeWidth="1.2" />
        <line x1="18" y1="20" x2="14" y2="20" stroke="currentColor" strokeWidth="0.8" />
        <line x1="18" y1="60" x2="14" y2="60" stroke="currentColor" strokeWidth="0.8" />
        <line x1="18" y1="100" x2="14" y2="100" stroke="currentColor" strokeWidth="0.8" />
        <line x1="18" y1="140" x2="14" y2="140" stroke="currentColor" strokeWidth="0.8" />
        <line x1="18" y1="180" x2="14" y2="180" stroke="currentColor" strokeWidth="0.8" />
        <line x1="18" y1="220" x2="14" y2="220" stroke="currentColor" strokeWidth="0.8" />
        <line x1="18" y1="260" x2="14" y2="260" stroke="currentColor" strokeWidth="0.8" />
        <line x1="18" y1="300" x2="14" y2="300" stroke="currentColor" strokeWidth="0.8" />
        <line x1="18" y1="340" x2="14" y2="340" stroke="currentColor" strokeWidth="0.8" />
        <line x1="18" y1="380" x2="14" y2="380" stroke="currentColor" strokeWidth="0.8" />
      </svg>


      {/* Interactive Circuit Background (Canvas) */}
      <InteractiveCircuitBackground />

      {/* Soft Radial Glow behind the Title */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[500px] max-h-[500px] bg-[#c41515]/[0.04] rounded-full blur-[90px] pointer-events-none z-0" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[1100px] flex flex-col items-center justify-center">

        {/* Title ENDEAVOUR with Premium Editorial Rotations */}
        <div className="w-full flex justify-center py-8 md:py-16 overflow-visible">
          <div className="flex items-center justify-center gap-1.5 sm:gap-3 lg:gap-5 font-display font-black tracking-tight select-none relative z-10 w-full flex-nowrap overflow-visible">
            {letters.map((char, index) => {
              const colorClass = "text-brand-accent";
              const letterStyle = "";

              // Simple staggered delay for all letters on entry
              const customDelay = 0.2 + index * 0.08;

              return (
                <div key={`letter-${index}`} className="relative flex items-center justify-center w-8 sm:w-14 lg:w-20 h-16 sm:h-28 lg:h-36 py-2 select-none overflow-visible">
                  <motion.span 
                    initial={{ opacity: 0, scale: 0.9, y: 15 }}
                    animate={{ 
                      opacity: 1, 
                      scale: [0.9, 1.05, 1], 
                      y: 0 
                    }}
                    transition={{
                      delay: customDelay,
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className={`text-[9vw] sm:text-[8vw] lg:text-[100px] font-mandatory tracking-normal ${colorClass} inline-block ${letterStyle}`}
                  >
                    {char}
                  </motion.span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tagline Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
          className="text-center mt-2 sm:mt-2 px-4 whitespace-nowrap overflow-visible"
        >
          <span className="font-display font-black text-[2.2vw] sm:text-[15px] md:text-[18px] tracking-[0.22em] sm:tracking-[0.38em] md:tracking-[0.45em] text-brand-muted uppercase select-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition-colors duration-500 whitespace-nowrap inline-block">
           S T R I V E &nbsp;  T O &nbsp;  C R E A T E &nbsp;  D I F F E R E N C E
          </span>
        </motion.div>

      </div>

      {isTransitioning && (
        <LetsBeginTransition onComplete={() => navigate('/about', { state: { fromLetsBegin: true } })} />
      )}
    </section>
  );
}
