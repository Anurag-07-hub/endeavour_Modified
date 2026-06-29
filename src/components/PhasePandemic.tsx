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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="font-syncopate text-[#00ff66] uppercase tracking-[10px] text-sm md:text-base font-bold shadow-[0_0_10px_rgba(0,255,102,0.5)] bg-clip-text text-transparent bg-gradient-to-r from-[#00ff66] to-[#00aa44]"
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
             className="font-roboto text-gray-300 mt-4 max-w-2xl mx-auto"
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
              <h3 className="font-space text-2xl md:text-3xl font-bold text-[#ffffff] mb-2 group-hover:text-[#00ff66] transition-colors">E-yantra 2020 (IIT Bombay)</h3>
              <p className="font-roboto text-gray-400 text-sm leading-relaxed">
                Secured 5th rank in the final round conducted by IITB with MHRD. Mastered remote collaboration and heavy simulation environments.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="border-l-2 border-brand-accent pl-6 py-2 relative group"
            >
              <div className="absolute -left-[5px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-accent shadow-[0_0_10px_#a40505]"></div>
              <h3 className="font-space text-2xl md:text-3xl font-bold text-[#ffffff] mb-2 group-hover:text-brand-accent transition-colors">Techfest'21 SLIET</h3>
              <p className="font-roboto text-gray-400 text-sm leading-relaxed">
                Dominated the virtual edition of techFEST'21 with a whopping 21 positions across all major technical events.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="border-l-2 border-[#00a2ff] pl-6 py-2 relative group"
            >
              <div className="absolute -left-[5px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#00a2ff] shadow-[0_0_10px_#00a2ff]"></div>
              <h3 className="font-space text-2xl md:text-3xl font-bold text-[#ffffff] mb-2 group-hover:text-[#00a2ff] transition-colors">TECHNEX & Advitiya</h3>
              <p className="font-roboto text-gray-400 text-sm leading-relaxed">
                1st in Axelerate and Hydrac at Technex'20. 2nd in Aqua Rocket at Advitiya'20.
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
                 src="/phase3_pandemic.png" 
                 alt="ROS Simulation and Hardware" 
                 className="w-full h-auto object-cover opacity-90 mix-blend-screen"
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
