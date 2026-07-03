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

export function PhaseLegacy() {
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

  const projects = [
    { title: "Earth's Docker", tag: "IIC Project", desc: "Advanced PID controlled high-speed line following robot built for precision and speed.", code: "SYS: PID_ACTIVE" },
    { title: "Multi-rotor Drone", tag: "Wildlife Protection", desc: "Drone designed for protection of crops against wildlife invasion.", code: "DRN: WILD_TRK" },
    { title: "Coconut Harvester", tag: "AgriTech", desc: "Advanced mechanical harvester aimed at modernizing agricultural processes.", code: "MCH: HRV_OPR" },
    { title: "Skyclan RC Workshop", tag: "Aeromodelling", desc: "Conducted hands-on RC plane workshop in collaboration with Skyclan RC for the SLIET community.", code: "EDU: SKC_WKP" },
  ];

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
            Phase 4 // 2022-2023
          </motion.h4>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-michroma text-[40px] md:text-[80px] leading-none mt-4 text-white uppercase"
          >
            Legacy & Peak
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
            className="w-full lg:w-5/12"
          >
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-xl shadow-2xl relative group">
              <CornerBrackets />
              <div className="relative rounded-xl overflow-hidden h-[350px] md:h-[480px]">
                <img 
                  src="/phase4_workshop.png" 
                  alt="Student Workshop" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <div className="text-[10px] font-mono text-brand-accent tracking-widest uppercase mb-1">PROG: MENTORSHIP</div>
                  <h3 className="font-space font-bold text-white text-xl">Building the Future</h3>
                  <p className="font-roboto font-medium text-gray-200 text-sm mt-1">Mentorship & Institutional Innovation</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Project Slider/Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="w-full lg:w-7/12 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {projects.map((proj, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className="bg-black/55 backdrop-blur-md border border-white/10 p-6 rounded-xl transition-all duration-300 group relative overflow-hidden hover:border-brand-accent/60 hover:shadow-[0_0_20px_rgba(164,5,5,0.25)] hover:-translate-y-1"
              >
                <CornerBrackets />
                
                {/* Header info bar */}
                <div className="flex justify-between items-center mb-4">
                  <span className="inline-block px-3 py-1 bg-white/10 rounded-full font-roboto font-bold text-[10px] text-gray-900 tracking-widest uppercase border border-white/20">
                    {proj.tag}
                  </span>
                  <span className="font-mono text-[9px] text-brand-accent tracking-wider font-bold">
                    {proj.code}
                  </span>
                </div>

                <h4 className="font-space text-xl font-bold text-white mb-2 group-hover:text-brand-accent transition-colors">{proj.title}</h4>
                <p className="font-inter text-gray-800 font-semibold text-sm leading-relaxed">
                  {proj.desc}
                </p>
              </motion.div>
            ))}
            
            {/* Trophies Row */}
            <motion.div 
              variants={itemVariants}
              className="md:col-span-2 mt-4 flex flex-col md:flex-row gap-6 items-stretch bg-black/55 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden group hover:border-brand-accent/60 hover:shadow-[0_0_25px_rgba(164,5,5,0.25)] transition-all duration-300 relative p-6"
            >
              <CornerBrackets />
              
              {/* Technex Card section */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono text-brand-accent tracking-widest uppercase mb-2 font-bold">CAMPUS MATCH // IIT BHU</div>
                  <h4 className="font-space text-xl font-bold text-white uppercase">Technex'23</h4>
                </div>
                <ul className="font-roboto text-gray-950 font-bold text-sm mt-4 space-y-2 border-l border-white/10 pl-4 py-1">
                  <li><span className="text-brand-accent font-black">1ST PLACE</span> // Build It & Momentum</li>
                  <li><span className="text-brand-accent font-black">2ND PLACE</span> // Maze X</li>
                  <li><span className="text-brand-accent font-black">3RD PLACE</span> // Robowar (15kg)</li>
                </ul>
              </div>

              {/* techFEST Card section */}
              <div className="flex-1 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-6 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono text-[#00a2ff] tracking-widest uppercase mb-2 font-bold">HOST STATE // SLIET</div>
                  <h4 className="font-space text-xl font-bold text-white uppercase">techFEST</h4>
                </div>
                <ul className="font-roboto text-gray-950 font-bold text-sm mt-4 space-y-2 border-l border-white/10 pl-4 py-1">
                  <li>Secured <span className="text-gray-950 font-black">21 positions</span> in techFEST'22</li>
                  <li>Secured <span className="text-gray-950 font-black">13 positions</span> in techFEST'23</li>
                </ul>
              </div>
            </motion.div>

            {/* Legacy Connections Row */}
            <motion.div 
              variants={itemVariants}
              className="md:col-span-2 flex flex-col gap-2 p-6 bg-black/55 backdrop-blur-md border border-white/10 rounded-xl group hover:border-brand-accent/60 hover:shadow-[0_0_20px_rgba(164,5,5,0.25)] transition-all duration-300 relative"
            >
              <CornerBrackets />
              <div className="text-[10px] font-mono text-[#00ff66] tracking-widest uppercase mb-1 font-bold">FOUNDATION LEGACY</div>
              <h4 className="font-space text-xl font-bold text-white uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-pulse"></span>
                Tryst'23 IIT Delhi
              </h4>
              <p className="font-roboto text-gray-800 font-semibold text-sm mt-2 leading-relaxed">
                Participated in several events at Tryst'23. Current team members got the opportunity to meet the founders of the team who were pursuing their PhD from IIT DELHI, representing an unbroken chain of legacy.
              </p>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </div>
  );
}
