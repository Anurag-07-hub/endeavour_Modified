import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function PhaseScaling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });

  // Separate trigger for the bottom achievements row so it animates exactly when scrolled into view
  const bottomRef = useRef<HTMLDivElement>(null);
  const isBottomInView = useInView(bottomRef, { once: false, amount: 0.15 });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 60 } }
  };

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col justify-center py-20 relative w-full">
      <div className="max-w-[1200px] mx-auto w-full px-4 md:px-8 relative z-10">
        
        {/* Phase Header - Right Aligned for dynamic flow */}
        <div className="mb-16 md:text-right">
          <motion.h4 
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="font-syncopate text-brand-accent uppercase tracking-[8px] text-sm md:text-base font-bold"
          >
            Phase 2 // 2017-2019
          </motion.h4>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-michroma text-[40px] md:text-[80px] leading-none mt-4 text-white uppercase"
          >
            Scaling Up
          </motion.h2>
          <motion.div 
             initial={{ opacity: 0, scaleX: 0 }}
             animate={isInView ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
             transition={{ duration: 0.5, delay: 0.2 }}
             className="h-1 w-24 bg-brand-accent mt-6 origin-left md:origin-right md:ml-auto"
          />
        </div>

        {/* Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Image Dashboard Panel */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 relative h-[300px] md:h-[500px] border border-white/10 p-2 bg-black/40 backdrop-blur-sm group overflow-hidden rounded-lg"
          >
            <img 
              src="/phase2_drone.png" 
              alt="Custom RC Drone" 
              className="w-full h-full object-cover opacity-90"
            />
            {/* Overlay Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,150,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,150,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>
            
            <div className="absolute top-4 left-4 font-roboto text-[#00a2ff] text-xs font-bold tracking-[2px] bg-black/50 px-3 py-1 border border-[#00a2ff]/30">
              DRONE CAM ONLINE // ACTIVE TRACKING
            </div>
          </motion.div>

          {/* Stats Column */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="lg:col-span-4 flex flex-col gap-4"
          >
            {/* Stat Box 1 */}
            <motion.div variants={itemVariants} className="bg-black/60 border border-white/10 p-6 flex flex-col justify-center hover:border-[#00a2ff]/50 transition-colors rounded-lg group">
              <h3 className="font-syncopate text-5xl md:text-6xl text-[#00a2ff] font-bold group-hover:scale-110 origin-left transition-transform duration-300">11+</h3>
              <h4 className="font-space text-white text-xl font-bold mt-2 uppercase">Positions at Kweizar'18</h4>
              <p className="font-roboto text-brand-muted text-xs mt-2">Dominated the entire fest across multiple competitions.</p>
            </motion.div>

            {/* Stat Box 2 */}
            <motion.div variants={itemVariants} className="bg-black/60 border border-white/10 p-6 flex flex-col justify-center hover:border-brand-accent/50 transition-colors rounded-lg group">
              <h3 className="font-syncopate text-5xl md:text-6xl text-brand-accent font-bold group-hover:scale-110 origin-left transition-transform duration-300">1st</h3>
              <h4 className="font-space text-white text-xl font-bold mt-2 uppercase">Hydraload (Techfest'19)</h4>
              <p className="font-roboto text-brand-muted text-xs mt-2">Pick & Place Bot champion at Techfest SLIET.</p>
            </motion.div>

            {/* Stat Box 3 */}
            <motion.div variants={itemVariants} className="bg-black/60 border border-white/10 p-6 flex flex-col justify-center hover:border-white/50 transition-colors rounded-lg group">
              <h3 className="font-syncopate text-5xl md:text-6xl text-white font-bold group-hover:scale-110 origin-left transition-transform duration-300">10+</h3>
              <h4 className="font-space text-white text-xl font-bold mt-2 uppercase">Techfest SLIET Podiums</h4>
              <p className="font-roboto text-brand-muted text-xs mt-2">Trussload, Reconissance, Drone+, Final Redemption.</p>
            </motion.div>
          </motion.div>

        </div>

        {/* Bottom Achievement Row - Animated on scroll when actually visible */}
        <motion.div 
          ref={bottomRef}
          variants={containerVariants}
          initial="hidden"
          animate={isBottomInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 gap-y-8 mt-8"
        >
          <motion.div variants={itemVariants} className="border-t-2 border-white/20 pt-4">
            <h5 className="font-syncopate text-white text-sm sm:text-base md:text-lg font-black mb-1.5 uppercase">Avishkar'18 (MNNIT)</h5>
            <p className="font-roboto text-white font-extrabold text-sm sm:text-base leading-relaxed">1st in Aerial Vehicle Challenge, Any terrain vehicle & Pump it Up.</p>
          </motion.div>
          <motion.div variants={itemVariants} className="border-t-2 border-white/20 pt-4">
            <h5 className="font-syncopate text-brand-accent text-sm sm:text-base md:text-lg font-black mb-1.5 uppercase">Technex'19</h5>
            <p className="font-roboto text-white font-extrabold text-sm sm:text-base leading-relaxed">4th position in Axelarate and Hydracs.</p>
          </motion.div>
          <motion.div variants={itemVariants} className="border-t-2 border-[#00a2ff]/50 pt-4">
            <h5 className="font-syncopate text-[#00a2ff] text-sm sm:text-base md:text-lg font-black mb-1.5 uppercase">E-Yantra 2018</h5>
            <p className="font-roboto text-white font-extrabold text-sm sm:text-base leading-relaxed">Two teams advanced to the Semi-Final round.</p>
          </motion.div>

          <motion.div variants={itemVariants} className="border-t-2 border-white/20 pt-4">
            <h5 className="font-syncopate text-white text-sm sm:text-base md:text-lg font-black mb-1.5 uppercase">Apogee'17 BITS</h5>
            <p className="font-roboto text-white font-extrabold text-sm sm:text-base leading-relaxed">Won in Robowar and Arduino challenge events.</p>
          </motion.div>
          <motion.div variants={itemVariants} className="border-t-2 border-white/20 pt-4">
            <h5 className="font-syncopate text-brand-accent text-sm sm:text-base md:text-lg font-black mb-1.5 uppercase">Technex'18</h5>
            <p className="font-roboto text-white font-extrabold text-sm sm:text-base leading-relaxed">2nd in Hydracs, 3rd in Momentum and D'Aero-Glisseur.</p>
          </motion.div>
          <motion.div variants={itemVariants} className="border-t-2 border-[#00a2ff]/50 pt-4">
            <h5 className="font-syncopate text-[#00a2ff] text-sm sm:text-base md:text-lg font-black mb-1.5 uppercase">Techinvent'19</h5>
            <p className="font-roboto text-white font-extrabold text-sm sm:text-base leading-relaxed">1st in Drone for Defense, 2nd Quadcopter race, 3rd Acrobatic flyer.</p>
          </motion.div>

          <motion.div variants={itemVariants} className="border-t-2 border-[#00ff66]/50 pt-4 md:col-span-3 mt-2 text-center">
            <h5 className="font-syncopate text-[#00ff66] text-sm sm:text-base md:text-lg font-black mb-2 uppercase">More Historic Milestones</h5>
            <p className="font-roboto text-white font-extrabold inline-flex gap-4 justify-center flex-wrap text-sm sm:text-base">
              <span>[ Smart India Hackathon Qualified ]</span>
              <span>[ 6th in Indian Drone Racing League ]</span>
              <span>[ Qualified for Final round of Enginx ]</span>
            </p>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}
