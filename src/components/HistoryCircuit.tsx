import { motion, useScroll, useSpring, useTransform, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Trophy } from 'lucide-react';

const phases = [
  {
    id: 1,
    tag: "PHASE 1 // 2015-2016",
    title: "The Rise",
    photo: "/images/achievements/phase1_genesis.jpg",
    photoLabel: "2014: FOUNDED ENDEAVOUR",
    description: "Founded in 2014, Endeavour was built as SLIET's official robotics society. The team immediately proved its technical excellence by winning several SLIET and national robotics competitions.",
    achievements: [
      { event: "Metamorphosis'16", position: "Winner", desc: "Won in Robo exhibition and Robo race events at SLIET.", metric: "ROBORACE" },
      { event: "Optimus 1.0", position: "Combat Bot", desc: "Built the Optimus 1.0, a hybrid combat robot with applied pneumatics designed to fight in the ROBOWAR.", metric: "COMBAT BOT" },
      { event: "Techfest'16 (IIT Bombay)", position: "1st (Zonals)", desc: "Secured zonal first position with UNIMATE, a high-precision line following robot.", metric: "UNIMATE" },
      { event: "BITS Pilani (Apogee'17)", position: "Project", desc: "GLADIATOR: Air pocket hovercraft mechanism with high speed propellers.", metric: "HOVERCRAFT" }
    ]
  },
  {
    id: 2,
    tag: "PHASE 2 // 2017-2018",
    title: "Stepping Up",
    photo: "/images/achievements/phase2_scaling.jpg",
    photoLabel: "2017-18: SECURING LEADERSHIP",
    description: "Expanding operations, the team dominated regional fests, achieving over 11 positions in a single fest, and won first place in several major events at BITS Pilani and MNNIT.",
    achievements: [
      { event: "Apogee'17 (BITS Pilani)", position: "1st Place (x2)", desc: "Won first prize in the Robowars and Arduino challenge events.", metric: "ROBOWARS" },
      { event: "Kweizar'18 (SLIET)", position: "11+ Positions", desc: "Dominated the entire technical festival by securing more than 11 top positions.", metric: "FEST DOMINANCE" },
      { event: "Avishkar'18 (MNNIT)", position: "1st Place (x3)", desc: "Won 1st prize in Aerial Vehicle Challenge, Any Terrain Vehicle, & Pump it Up; 3rd in Infinity Crusade.", metric: "TRIPLE GOLD" },
      { event: "Technex'18 (IIT BHU)", position: "2nd & 3rd Place", desc: "Won 2nd prize in Hydracs, 3rd in Momentum, and 3rd in D'Aero-Glisseur.", metric: "IIT BHU" }
    ]
  },
  {
    id: 3,
    tag: "PHASE 3 // 2019",
    title: "Conquering",
    photo: "/images/achievements/phase2_scaling.jpg",
    photoLabel: "2019: UNPRECEDENTED PEAKS",
    description: "Endeavour dominated SLIET's techFEST and various national fests, qualifying for final rounds in major industry competitions like Smart India Hackathon and Enginx.",
    achievements: [
      { event: "techFEST'19 (SLIET)", position: "10+ Positions", desc: "Dominated with 1st in Hydraload, Trussload, and Reconnaissance; 2nd in Drone+; 3rd in Final Redemption.", metric: "CLEAN SWEEP" },
      { event: "Techinvent'19", position: "1st, 2nd & 3rd", desc: "First position in Drone for Defense, 2nd in Quadcopter race, 3rd in Acrobatic flyer.", metric: "AEROMODELLING" },
      { event: "Smart India Hackathon", position: "Qualifiers", desc: "Qualified for the first round of SIH under the Hardware Category.", metric: "SIH QUALIFIERS" },
      { event: "E-yantra & Enginx", position: "Finalists", desc: "Reached the semi-final round of E-yantra 2018 (IIT Bombay) and qualified for Enginx finals.", metric: "MHRD & TCS" }
    ]
  },
  {
    id: 4,
    tag: "PHASE 4 // 2020-2021",
    title: "Pandemic Victory",
    photo: "/images/IIT_Gandhinagar.webp",
    photoLabel: "2020-21: RESILIENT DOMINANCE",
    description: "IIT Gandhinagar 2023 Finalist Qualifying for final rounds",
    achievements: [
      { event: "E-yantra 2020 (IIT Bombay)", position: "5th Rank", desc: "Secured 5th rank in the national final round of EYRC conducted by IIT Bombay with MHRD.", metric: "EYRC FINALS" },
      { event: "techFEST'21 (SLIET)", position: "21 Positions", desc: "Set a record by winning 21 podium finishes in virtual technical competitions.", metric: "RECORD WINS" },
      { event: "Technex'20 (IIT BHU)", position: "1st Place (x2)", desc: "Secured 1st position in Axelerate and Hydrac; 3rd in Momentum.", metric: "IIT BHU CHAMP" },
      { event: "Advitiya'20 (IIT Ropar)", position: "2nd & 4th Place", desc: "Secured 2nd position in Aqua Rocket, 4th in Off Road Asphalt.", metric: "IIT ROPAR" }
    ]
  },
  {
    id: 5,
    tag: "PHASE 5 // 2022-2023",
    title: "Performance",
    photo: "/images/achievements/phase4_legacy.webp",
    photoLabel: "2021-23: INSTITUTIONAL PERFORMANCE",
    description: "Secured numerous podium finishes at IIT BHU and SLIET while hosting offline aeromodelling workshops and developing social benefit projects under the Institute Innovation Cell (IIC).",
    achievements: [
      { event: "Technex'23 (IIT BHU)", position: "1st Place (x3)", desc: "1st in Build It, Momentum, and Bridge the Gap; 2nd in Maze X; 3rd in Robowar (15kg).", metric: "IIT BHU CHAMP" },
      { event: "techFEST SLIET", position: "34 Positions", desc: "Secured 21 positions in techFEST'22 and 13 positions in techFEST'23.", metric: "SLIET DOMINANCE" },
      { event: "Skyclan Aeromodelling", position: "80+ Trained", desc: "Conducted a physical hands-on RC Plane design and fabrication workshop.", metric: "AEROMODELLING" },
      { event: "Innovation Projects (IIC)", position: "Developed", desc: "Built projects like Earth's Docker, coconut harvester, PID line follower, and crop protection drone.", metric: "IIC R&D" }
    ]
  },
  {
    id: 6,
    tag: "PHASE 6 // 2024-2025",
    title: "Horizon & Beyond",
    photo: "/images/achievements/phase5_current.webp",
    photoLabel: "2024-25: FUTURE STACK",
    description: "Today, Endeavour continues to pioneer in robotics education, research publications, and advanced hardware prototyping, setting new benchmarks in drone racing, UGV deployment, and AI-driven control systems.",
    achievements: [
      { event: "Cognizance 25'", position: "1st Place", desc: "First Prize in Plasma Pull in Techfest 25' (IIT Roorkee)", metric: "TECH MASTER" },
      { event: "Technex'24 (IIT BHU)", position: "2nd & 3rd Place", desc: "2nd in Maze X & Reconnaissance, 3rd in Momentum.", metric: "TECH MASTER" },
    ]
  },
  {
    id: 7,
    tag: "PHASE 7 // 2025-2026",
    title: "CHAMPIONS AGAIN",
    photo: "/website_gallery/Technex_26/IMG_20260315_113338796_HDR (1).jpg",
    photoLabel: "2025-26: CHAMPIONS AGAIN",
    description: "Today, Endeavour dominates national-level tech fests, integrating full ROS autonomy and deep learning frameworks into our UAV and UGV fleets, scaling new heights in design and control systems.",
    achievements: [
      { event: "Cognizance 26' (IIT Roorkee)", position: "1st Place", desc: "First Prize in Plasma Pull.", metric: "TUG OF WAR CHAMP" },
      { event: "Technex'26 (IIT BHU)", position: "1st Place (x2)", desc: "Secured 2nd place in Rocketry and 3rd place in Maze X.", metric: "DOUBLE PODIUM" },
      { event: "PEC-FEST' 25", position: "1st & 2nd Place", desc: "1st in Hovermania & 2nd in LFR.", metric: "HOVERMANIA&LFR CHAMPS" }
    ]
  }
];

const PhaseSection = ({ phase, isEven }: { phase: typeof phases[0]; isEven: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <div ref={ref} className="relative z-10 w-full pl-8 md:pl-0">
      {/* Centered Phase Header Node */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.6 }}
        className="flex justify-start md:justify-center items-center relative z-10 mb-10 md:mb-16 mt-8"
      >
        <div className="bg-[#0b0507] border border-brand-accent/30 backdrop-blur-xl px-5 py-2.5 rounded-full shadow-[0_0_20px_rgba(164,5,5,0.15)] text-left md:text-center relative">
          {/* Mobile connector dot */}
          <div className="absolute left-[-12px] md:hidden top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-brand-accent border border-brand-bg shadow-[0_0_8px_#a40505] z-20 animate-pulse" />
          {/* Mobile connector line branch */}
          <div className="absolute left-[-12px] w-[12px] h-[0.5px] bg-brand-accent/50 md:hidden top-1/2 -translate-y-1/2" />

          {/* Desktop Stem connector dot */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-[20px] w-3 h-3 rounded-full bg-brand-accent shadow-[0_0_8px_#a40505] hidden md:block" />
          
          <span className="font-mono text-[9px] uppercase tracking-[4px] text-brand-accent font-black block leading-none">{phase.tag}</span>
          <h3 className="font-syncopate text-[13px] sm:text-base font-black text-white text-left md:text-center mt-1.5 uppercase tracking-tight leading-none">{phase.title}</h3>
        </div>
      </motion.div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start relative z-10 mb-20 md:mb-32">
        {/* Left Column (Photo Card) */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -40 : 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -40 : 40 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 45 }}
          className={`order-1 ${isEven ? 'md:order-1' : 'md:order-2'}`}
        >
          <div className="bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-5 shadow-2xl relative group hover:border-brand-accent/40 transition-all duration-300">
            <div className="relative rounded-2xl overflow-hidden h-[200px] sm:h-[280px]">
              <img
                src={phase.photo}
                alt={phase.title}
                className="w-full h-full object-cover opacity-90 group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>
            </div>
            <p className="font-sans text-brand-muted text-xs sm:text-sm leading-relaxed mt-4">
              {phase.description}
            </p>
          </div>
        </motion.div>

        {/* Right Column (Achievements Card) */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? 40 : -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? 40 : -40 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 45 }}
          className={`order-2 ${isEven ? 'md:order-2' : 'md:order-1'}`}
        >
          <div className="bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-3xl p-5 sm:p-6 shadow-2xl relative group hover:border-brand-accent/40 transition-all duration-300">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-brand-accent mb-6 font-bold flex items-center gap-2">
              <Trophy className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
              ACHIEVEMENTS // METRICS
            </h4>
            <div className="space-y-4">
              {phase.achievements.map((item, idx) => (
                <div key={idx} className="border-l-2 border-brand-accent/40 pl-4 py-1 relative hover:border-brand-accent transition-colors duration-300 group/item">
                  <div className="absolute -left-[5.5px] top-[14px] w-2 h-2 rounded-full bg-brand-bg border border-brand-accent group-hover/item:bg-brand-accent transition-colors duration-300"></div>
                  <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 mb-1">
                    <h5 className="font-sans font-extrabold text-white text-xs sm:text-sm tracking-tight">{item.event}</h5>
                    <span className="bg-brand-accent/15 border border-brand-accent/30 rounded-full px-2.5 py-0.5 text-[8.5px] font-mono font-bold text-brand-accent whitespace-nowrap shadow-[0_0_8px_rgba(164,5,5,0.15)] uppercase">
                      {item.position}
                    </span>
                  </div>
                  <p className="font-sans text-brand-muted text-[11px] sm:text-xs leading-normal">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export function HistoryCircuit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  return (
    <section
      ref={containerRef}
      className="relative bg-brand-bg z-10 w-full overflow-hidden"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"></div>

      <div className="relative z-10 w-full">
        {/* Intro Section */}
        <div className="max-w-[1024px] mx-auto px-4 md:px-[60px] pt-32 pb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-syncopate text-[28px] sm:text-[40px] md:text-[60px] font-black uppercase tracking-[-1px] sm:tracking-[-2px] text-white leading-[1.1]"
          >
            OUR <span className="text-brand-accent">ACHIEVEMENTS</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-roboto text-brand-muted mt-5 max-w-2xl mx-auto uppercase tracking-[4px] text-xs"
          >
            Tracking the legacy
          </motion.p>
        </div>

        {/* Tree Timeline Container */}
        <div className="relative max-w-[1100px] mx-auto px-5 sm:px-10 pb-20 overflow-visible">

          {/* Central Stem line (Desktop only) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-white/10 hidden md:block z-0">
            <motion.div
              className="w-full bg-gradient-to-b from-brand-accent via-red-500 to-brand-accent origin-top absolute top-0 bottom-0 shadow-[0_0_8px_#a40505]"
              style={{ scaleY }}
            />
          </div>

          {/* Left Stem line (Mobile only) */}
          <div className="absolute left-[20px] top-0 bottom-0 w-0.5 bg-white/10 block md:hidden z-0">
            <motion.div
              className="w-full bg-gradient-to-b from-brand-accent to-red-500 origin-top absolute top-0 bottom-0 shadow-[0_0_8px_#a40505]"
              style={{ scaleY }}
            />
          </div>

          {/* Phases timeline nodes */}
          <div className="flex flex-col w-full relative">
            {phases.slice().reverse().map((phase, idx) => (
              <PhaseSection
                key={phase.id}
                phase={phase}
                isEven={idx % 2 === 0}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
