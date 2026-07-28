import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

// Corner brackets to give an industrial diagnostic panel look
const CornerBrackets = () => (
  <>
    <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/20 group-hover:border-brand-accent transition-colors duration-300" />
    <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/20 group-hover:border-brand-accent transition-colors duration-300" />
    <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/20 group-hover:border-brand-accent transition-colors duration-300" />
    <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/20 group-hover:border-brand-accent transition-colors duration-300" />
  </>
);

export function PhaseCurrent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 35, scale: 0.96 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 70, damping: 15 } }
  };

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col justify-center py-20 relative w-full bg-black/60">
      
      <div className="max-w-[1200px] mx-auto w-full px-4 md:px-8 relative z-10">
        
        {/* Phase Header */}
        <div className="mb-12 text-center md:text-left">
          <motion.h4 
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="font-syncopate text-brand-accent uppercase tracking-[8px] text-sm md:text-base font-bold"
          >
            Phase 5 // 2024-2025
          </motion.h4>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-michroma text-[40px] md:text-[80px] leading-none mt-4 text-white uppercase"
          >
            Horizon & Beyond
          </motion.h2>
          <motion.div 
             initial={{ opacity: 0, scaleX: 0 }}
             animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
             transition={{ duration: 0.5, delay: 0.2 }}
             className="h-1 w-24 bg-brand-accent mt-6 origin-left"
          />
        </div>

        {/* Corporate Tech Layout */}
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Left: Premium Image Card */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl shadow-2xl relative group">
              <CornerBrackets />
              <div className="relative rounded-xl overflow-hidden h-[400px] md:h-[550px]">
                <img 
                  src="/images/achievements/phase5_current.webp" 
                  alt="Competition Team Photo" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <div className="text-[10px] font-mono text-brand-accent tracking-widest uppercase mb-1">PROG: HORIZON</div>
                  <h3 className="font-space font-bold text-white text-xl">Scaling Innovation</h3>
                  <p className="font-roboto font-medium text-gray-200 text-sm mt-1">Expanding Technical Horizons & Engineering Excellence</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Achievements Panels */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="w-full lg:w-1/2 flex flex-col gap-6"
          >
            {/* Technex'24 Card */}
            <motion.div 
              variants={itemVariants}
              className="bg-black/55 backdrop-blur-md border border-white/10 p-8 rounded-xl transition-all duration-300 group relative overflow-hidden hover:border-brand-accent/60 hover:shadow-[0_0_20px_rgba(164,5,5,0.25)] flex flex-col justify-between"
            >
              <CornerBrackets />
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="inline-block px-3 py-1 bg-brand-accent/10 rounded font-mono font-bold text-[10px] text-brand-accent tracking-widest uppercase border border-brand-accent/30">
                    CAMPUS MATCH // IIT BHU
                  </span>
                  <span className="font-mono text-xs text-[#00ff66] tracking-wider font-bold shadow-[0_0_10px_rgba(0,255,102,0.3)]">
                    1ST PLACE (X2)
                  </span>
                </div>

                <h4 className="font-michroma text-2xl font-bold text-white mb-2 uppercase tracking-wide">Technex'24</h4>
                <p className="font-roboto text-brand-muted text-sm leading-relaxed mb-6">
                  Secured multiple podium finishes at the prestigious national technical festival at IIT BHU.
                </p>
              </div>

              <ul className="font-roboto text-gray-300 font-medium text-sm space-y-3 border-l-2 border-brand-accent/30 pl-6 py-1">
                <li><span className="text-brand-accent font-bold">1ST PLACE</span> // Robowar (Combat category)</li>
                <li><span className="text-brand-accent font-bold">1ST PLACE</span> // Hurdlemania (Maneuver challenge)</li>
                <li><span className="text-brand-accent font-bold">2ND PLACE</span> // Maze Solver (Autonomous navigation)</li>
              </ul>
            </motion.div>

            {/* Cognizance & techFEST Card */}
            <motion.div 
              variants={itemVariants}
              className="bg-black/55 backdrop-blur-md border border-white/10 p-8 rounded-xl transition-all duration-300 group relative overflow-hidden hover:border-[#00a2ff]/60 hover:shadow-[0_0_20px_rgba(0,162,255,0.25)] flex flex-col justify-between"
            >
              <CornerBrackets />
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="inline-block px-3 py-1 bg-[#00a2ff]/10 rounded font-mono font-bold text-[10px] text-[#00a2ff] tracking-widest uppercase border border-[#00a2ff]/30">
                    NATIONALS & HOST STATE
                  </span>
                  <span className="font-mono text-xs text-[#00a2ff] tracking-wider font-bold shadow-[0_0_10px_rgba(0,162,255,0.3)]">
                    35+ PODIUMS TOTAL
                  </span>
                </div>

                <h4 className="font-michroma text-2xl font-bold text-white mb-2 uppercase tracking-wide">Cognizance & techFEST</h4>
                <p className="font-roboto text-brand-muted text-sm leading-relaxed mb-6">
                  Continued dominant winning streaks at premier CFTIs fests and state-level championships.
                </p>
              </div>

              <ul className="font-roboto text-gray-300 font-medium text-sm space-y-3 border-l-2 border-[#00a2ff]/30 pl-6 py-1">
                <li><span className="text-[#00a2ff] font-bold">1ST PLACE</span> // Armageddon Robowar at Cognizance'24 (IIT Roorkee)</li>
                <li><span className="text-[#00a2ff] font-bold">1ST PLACE</span> // UAV Drone Racing at Cognizance'24 (IIT Roorkee)</li>
                <li><span className="text-white font-bold">35+ Podium Positions</span> // techFEST'24 & techFEST'25</li>
              </ul>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
