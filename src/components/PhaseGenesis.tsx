import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function PhaseGenesis() {
  const containerRef = useRef<HTMLDivElement>(null);
  // Trigger when 10% of the section is visible in the viewport
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 50 },
    show: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 50 } }
  };

  return (
    <div ref={containerRef} className="min-h-screen flex items-center justify-center py-20 relative w-full">
      <div className="max-w-[1200px] mx-auto w-full px-4 md:px-8 relative z-10">
        
        {/* Phase Header */}
        <div className="mb-12">
          <motion.h4 
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="font-syncopate text-brand-accent uppercase tracking-[8px] text-sm md:text-base font-bold"
          >
            Phase 1 // 2014-2016
          </motion.h4>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-michroma text-[40px] md:text-[80px] leading-none mt-4 text-white uppercase"
          >
            The Genesis
          </motion.h2>
          <motion.div 
             initial={{ opacity: 0, scaleX: 0 }}
             animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
             transition={{ duration: 0.5, delay: 0.2 }}
             className="h-1 w-24 bg-brand-accent mt-6 origin-left"
          />
        </div>

        {/* Split Screen Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Left: Huge Image & Founded Text */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] md:h-[600px] w-full border border-white/20 p-2 bg-white/[0.07] backdrop-blur-xl group shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
          >
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-20"></div>
            
            <img 
              src="/images/achievements/phase1_genesis.jpg" 
              alt="Alumni Visit" 
              className="w-full h-full object-cover opacity-90"
            />
            
            {/* Neon Data Overlays */}
            <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/[0.07] backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
              <h3 className="font-syncopate text-xl md:text-2xl text-white font-bold leading-relaxed">2014: FOUNDED <br/><span className="text-brand-accent">ENDEAVOUR</span></h3>
              <p className="font-roboto text-brand-muted mt-2 text-xs md:text-sm">INITIALIZING CORE DIRECTIVE...</p>
            </div>
          </motion.div>

          {/* Right: Achievements Cards */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="flex flex-col gap-6"
          >
            {[
              { 
                event: "Techfest'16 (IIT Bombay)",
                position: "1st Place (Zonals)",
                desc: "Secured zonal first position with UNIMATE, a high-precision line following robot.", 
                metric: "UNIMATE" 
              },
              { 
                event: "Metamorphosis'16 (SLIET)",
                position: "1st Place",
                desc: "Won first prize in Roborace with BLUE CAR, a custom Bluetooth-controlled vehicle.", 
                metric: "BLUE CAR" 
              },
              { 
                event: "Metamorphosis'16 (SLIET)",
                position: "Winner",
                desc: "Secured winning positions across both the Robo Exhibition and Robo Race events.", 
                metric: "ROBO EXHIBITION" 
              }
            ].map((project, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className="bg-white/[0.07] backdrop-blur-xl border border-white/20 p-6 rounded-md hover:border-brand-accent transition-colors relative overflow-hidden group shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
              >
                {/* Circuit accent line */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-accent/20 group-hover:bg-brand-accent transition-colors"></div>
                <div className="absolute right-4 top-4 font-mono text-xs text-brand-accent font-bold tracking-wider">
                  {project.position}
                </div>

                <h4 className="font-space text-xs font-bold text-brand-accent/70 group-hover:text-brand-accent transition-colors uppercase tracking-[2px]">{project.event}</h4>
                <div className="font-michroma text-lg font-bold text-white mt-1 mb-2">
                  {project.metric}
                </div>
                <p className="font-roboto text-brand-muted text-sm leading-relaxed">
                  {project.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
          
        </div>
      </div>
    </div>
  );
}
