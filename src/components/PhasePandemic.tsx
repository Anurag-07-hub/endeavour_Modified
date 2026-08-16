import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function PhasePandemic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });

  return (
    <div ref={containerRef} className="min-h-screen flex items-center justify-center py-20 relative w-full overflow-hidden bg-[#020202]">
      {/* Deep dark glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,100,0.03)_0%,transparent_70%)] pointer-events-none"></div>
      
      <div className="max-w-[1200px] mx-auto w-full px-4 md:px-8 relative z-10">
        
        {/* Phase Header */}
        <div className="mb-12 text-center">
          <motion.h4 
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="font-syncopate text-[#00ff66] uppercase tracking-[10px] text-sm md:text-base font-bold drop-shadow-[0_0_8px_rgba(0,255,102,0.6)]"
          >
            Phase 3 // 2020-2021
          </motion.h4>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-michroma text-[40px] md:text-[80px] leading-none mt-4 text-[#ffffff] uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          >
            Resilient Victory
          </motion.h2>
          <motion.p
             initial={{ opacity: 0 }}
             animate={isInView ? { opacity: 1 } : { opacity: 0 }}
             transition={{ delay: 0.2 }}
             className="font-roboto text-[#ffffff]/70 mt-4 max-w-2xl mx-auto"
             style={{ color: 'rgba(255, 255, 255, 0.7)' }}
          >
            When the world stalled, progress didn't. Transitioning from hardware to heavy software simulation, the team kept building.
          </motion.p>
        </div>

        {/* Glow Layout */}
        <div className="flex flex-col md:flex-row gap-8 items-center mt-16">
          
          {/* Left Text Content */}
          <div className="flex-1 space-y-8 w-full">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6 }}
              className="border-l-2 border-[#00ff66] pl-6 py-2 relative group"
            >
              <div className="absolute -left-[5px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#00ff66] shadow-[0_0_10px_#00ff66]"></div>
              <div className="font-mono text-xs text-[#00ff66] font-bold mb-1">5TH RANK // NATIONAL FINALISTS</div>
              <h3 className="font-space text-2xl font-bold text-[#ffffff] mb-2 group-hover:text-[#00ff66] transition-colors">E-yantra 2020 (IIT Bombay / MHRD)</h3>
              <p className="font-roboto text-[#ffffff] text-sm leading-relaxed" style={{ color: '#ffffff' }}>
                Secured 5th rank in the final round of the EYRC robotics competition, excelling in system design and remote software simulations.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="border-l-2 border-brand-accent pl-6 py-2 relative group"
            >
              <div className="absolute -left-[5px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-accent shadow-[0_0_10px_#a40505]"></div>
              <div className="font-mono text-xs text-brand-accent font-bold mb-1">21 PODIUM POSITIONS</div>
              <h3 className="font-space text-2xl font-bold text-[#ffffff] mb-2 group-hover:text-brand-accent transition-colors">Techfest'21 SLIET</h3>
              <p className="font-roboto text-[#ffffff] text-sm leading-relaxed" style={{ color: '#ffffff' }}>
                Dominated the virtual fests by winning a record-breaking 21 podium positions across all major robotic and circuital events.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="border-l-2 border-[#00a2ff] pl-6 py-2 relative group"
            >
              <div className="absolute -left-[5px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#00a2ff] shadow-[0_0_10px_#00a2ff]"></div>
              <div className="font-mono text-xs text-[#00a2ff] font-bold mb-1">1ST, 2ND & 3RD PLACE</div>
              <h3 className="font-space text-2xl font-bold text-[#ffffff] mb-2 group-hover:text-[#00a2ff] transition-colors">Technex'20 (IIT BHU) & Advitiya'20 (IIT Ropar)</h3>
              <p className="font-roboto text-[#ffffff] text-sm leading-relaxed" style={{ color: '#ffffff' }}>
                Secured 1st place in Axelerate & Hydrac, and 3rd in Momentum at Technex'20. Secured 2nd place in Aqua Rocket, and 4th place in Off Road Asphalt at Advitiya'20.
              </p>
            </motion.div>
          </div>

          {/* Right Image Collage */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8 }}
            className="flex-1 w-full relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-[#ffffff]/10 shadow-[0_0_50px_rgba(0,255,102,0.1)]">
               {/* Scanline overlay for that techy monitor feel */}
               <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[size:100%_4px] pointer-events-none z-10"></div>
               
               <img 
                 src="/images/achievements/phase3_pandemic.webp" 
                 alt="Technex'23 Victory" 
                 className="w-full h-auto object-cover opacity-90"
               />
               
               <div className="absolute bottom-4 right-4 z-20 flex gap-2">
                 <div className="px-3 py-1 bg-[#00ff66]/20 border border-[#00ff66]/50 rounded text-[#00ff66] font-roboto text-xs backdrop-blur-md">
                   SYS.ONLINE
                 </div>
                 <div className="px-3 py-1 bg-brand-accent/20 border border-brand-accent/50 rounded text-brand-accent font-roboto text-xs backdrop-blur-md">
                   REC
                 </div>
               </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </div>
  );
}
