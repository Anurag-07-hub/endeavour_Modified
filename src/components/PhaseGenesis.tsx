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
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 50 } }
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
            className="relative h-[400px] md:h-[600px] w-full border border-white/10 p-2 bg-black/40 backdrop-blur-sm group"
          >
            {/* Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-20"></div>
            
            <img 
              src="/phase1_robot.png" 
              alt="Line Following Robot" 
              className="w-full h-full object-cover opacity-90"
            />
            
            {/* Neon Data Overlays */}
            <div className="absolute bottom-6 left-6 right-6 p-6 bg-black/60 backdrop-blur-md border border-brand-accent/30 shadow-[0_0_15px_rgba(164,5,5,0.3)]">
              <h3 className="font-syncopate text-xl md:text-2xl text-white font-bold leading-relaxed">2014: FOUNDED <br/><span className="text-brand-accent">ENDEAVOUR</span></h3>
              <p className="font-roboto text-brand-muted mt-2 text-xs md:text-sm">INITIALIZING CORE DIRECTIVE...</p>
            </div>
          </motion.div>

          {/* Right: Blueprint Cards */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="flex flex-col gap-6"
          >
            {[
              { title: 'UNIMATE', desc: 'An LFR that participated and won in zonals for IIT BOMBAY (Techfest\'16)', metric: 'SPEED: OPTIMIZED' },
              { title: 'GLADIATOR', desc: 'Air pocket mechanism with high speed propellers. Participated in HOVERCRAFT in BITS Pilani (Apogee\'17)', metric: 'AERO: ACTIVE' },
              { title: 'OPTIMUS 1.0', desc: 'Hybrid combat robot with applied pneumatics and advanced mechanical design destined to fight in ROBOWAR.', metric: 'ARMOR: MAX' },
              { title: 'HOPPER', desc: 'Four-wheeled wired car with high torque motors. Participated in HURDLEMANIA held at IIT BHU (Technex\'17)', metric: 'TORQUE: HIGH' },
              { title: 'BLUE CAR', desc: 'Four-wheeled Bluetooth controlled car. Participated and won in ROBORACE in SLIET (Metamorphosis\'16)', metric: 'BLUETOOTH: LINKED' }
            ].map((project, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className="bg-black/40 backdrop-blur-md border border-white/10 p-6 rounded-md hover:border-brand-accent transition-colors relative overflow-hidden group shadow-lg"
              >
                {/* Circuit accent line */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-accent/20 group-hover:bg-brand-accent transition-colors"></div>
                <div className="absolute right-4 top-4 font-roboto text-xs text-brand-accent/50 group-hover:text-brand-accent transition-colors">
                  {project.metric}
                </div>

                <h4 className="font-space text-2xl font-bold text-white mb-2">{project.title}</h4>
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
