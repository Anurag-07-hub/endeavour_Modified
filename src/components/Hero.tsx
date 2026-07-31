import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { LetsBeginTransition } from './LetsBeginTransition';

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


      {/* High-density Elegant Circuit Vector Backdrop Pattern */}
      <svg className="absolute inset-0 w-full h-full stroke-[var(--color-circuit-stroke)] fill-none z-0 pointer-events-none transition-colors duration-500" xmlns="http://www.w3.org/2000/svg">
        {/* Left Top Cluster */}
        <path d="M 0 150 L 150 150 L 220 220 L 220 380 L 180 420 L 50 420" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 120 150 L 120 280 L 80 320" strokeWidth="1.2" strokeDasharray="4 4" />
        <circle cx="220" cy="220" r="3.5" className="fill-[var(--color-circuit-fill)] stroke-[var(--color-circuit-stroke)] transition-colors duration-500" strokeWidth="1" />
        <circle cx="50" cy="420" r="3" className="fill-[var(--color-circuit-fill)] transition-colors duration-500" />
        
        {/* Resistor symbol integrated into Left Top trace */}
        <path d="M 80 320 L 80 330 L 76 333 L 84 336 L 76 339 L 84 342 L 76 345 L 84 348 L 80 351 L 80 370" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="80" cy="370" r="2.5" className="fill-[var(--color-circuit-fill)] transition-colors duration-500" />
        
        {/* Right Top Cluster */}
        <path d="M 1400 150 L 1200 150 L 1120 230 L 1120 400 L 1180 460" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="1120" cy="230" r="3.5" className="fill-[var(--color-circuit-fill)] stroke-[var(--color-circuit-stroke)] transition-colors duration-500" strokeWidth="1" />
        
        {/* Center Top Trace */}
        <path d="M 450 0 L 450 80 L 500 130 L 700 130 L 750 80 L 750 0" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="500" cy="130" r="2.5" className="fill-[var(--color-circuit-fill)] transition-colors duration-500" />
        <circle cx="700" cy="130" r="2.5" className="fill-[var(--color-circuit-fill)] transition-colors duration-500" />

        {/* Left Bottom Cluster */}
        <path d="M 0 650 L 120 650 L 200 570 L 450 570 L 520 640" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="200" cy="570" r="3.5" className="fill-[var(--color-circuit-fill)] stroke-[var(--color-circuit-stroke)] transition-colors duration-500" strokeWidth="1" />
        <circle cx="520" cy="640" r="3" className="fill-[var(--color-circuit-fill)] transition-colors duration-500" />
        
        {/* Right Bottom Cluster */}
        <path d="M 1400 680 L 1250 680 L 1150 580 L 850 580 L 780 650" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="1150" cy="580" r="3.5" className="fill-[var(--color-circuit-fill)] transition-colors duration-500" />
        <circle cx="780" cy="650" r="3.5" className="fill-[var(--color-circuit-fill)] transition-colors duration-500" />

        {/* Abstract Micro IC Chip on Right Margin */}
        <g transform="translate(1250, 300)" className="opacity-60 text-[var(--color-circuit-stroke)] transition-colors duration-500">
          <rect x="0" y="0" width="40" height="60" fill="none" stroke="currentColor" strokeWidth="1.5" rx="3" />
          <line x1="-8" y1="12" x2="0" y2="12" stroke="currentColor" strokeWidth="1.5" />
          <line x1="-8" y1="24" x2="0" y2="24" stroke="currentColor" strokeWidth="1.5" />
          <line x1="-8" y1="36" x2="0" y2="36" stroke="currentColor" strokeWidth="1.5" />
          <line x1="-8" y1="48" x2="0" y2="48" stroke="currentColor" strokeWidth="1.5" />
          <line x1="40" y1="12" x2="48" y2="12" stroke="currentColor" strokeWidth="1.5" />
          <line x1="40" y1="24" x2="48" y2="24" stroke="currentColor" strokeWidth="1.5" />
          <line x1="40" y1="36" x2="48" y2="36" stroke="currentColor" strokeWidth="1.5" />
          <line x1="40" y1="48" x2="48" y2="48" stroke="currentColor" strokeWidth="1.5" />
        </g>
      </svg>

      {/* Soft Radial Glow behind the Title */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[500px] max-h-[500px] bg-[#c41515]/[0.04] rounded-full blur-[90px] pointer-events-none z-0" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[1100px] flex flex-col items-center justify-center">

        {/* Title ENDEAVOUR with Premium Editorial Rotations */}
        <div className="w-full flex justify-center py-8 md:py-16 overflow-visible">
          <div className="flex items-center justify-center gap-1.5 sm:gap-3 lg:gap-5 font-display font-black tracking-tight select-none relative z-10 w-full flex-nowrap overflow-visible">
            {letters.map((char, index) => {
              // Alternating black/white and crimson letters
              const isRed = index % 2 === 1;
              const colorClass = isRed ? "text-brand-accent" : "text-white transition-colors duration-500";
              
              const isN = index === 1;
              const isE2 = index === 3;
              const isV = index === 5;
              const isU = index === 7;
              
              let letterStyle = "";
              if (isN) {
                letterStyle = "rotate-[15deg] scale-[1.03] translate-y-[-2px] mx-0.5";
              } else if (isE2) {
                letterStyle = "rotate-[-8deg] translate-y-[1px]";
              } else if (isV) {
                letterStyle = "rotate-[6deg] translate-y-[-1px]";
              } else if (isU) {
                letterStyle = "rotate-[-12deg] scale-[1.03] translate-y-[2px] mx-0.5";
              }

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
                    className={`text-[10vw] sm:text-[8vw] lg:text-[110px] font-bebas font-black tracking-normal ${colorClass} inline-block ${letterStyle}`}
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
