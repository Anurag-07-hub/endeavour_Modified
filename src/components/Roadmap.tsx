import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const roadmapData = [
  {
    year: "2015-16",
    title: "The Rise",
    events: [
      { side: "left", title: "Founded ENDEAVOUR", text: "2014" },
      { side: "right", title: "More Projects", text: "UNIMATE : An LFR that Participated and won in zonals for IIT BOMBAY (Techfest'16)\n\nGLADIATOR : Air pocket mechanism with high speed propellers Participated in HOVERCRAFT in BITS Pilani (Apogee'17)\n\nHOPPER : Four wheeled wired car with high torque motors Participated in HURDLEMANIA held at IIT BHU (Technex'17)\n\nBLUE CAR : Four wheeled Bluetooth controlled car Participated and won in ROBORACE in SLIET (Metamorphosis'16)" },
      { side: "left", title: "METAMORPHOSIS'16", text: "Participated in several events of S.L.I.E.T Metamorphosis'16 and Won in Robo exhibition and Robo race events." },
      { side: "left", title: "Optimus 1.0", text: "Built the Optimus 1.0, a hybrid combat robot with applied pneumatics and advanced mechanical design destined to fight in the ROBOWAR." },
    ]
  },
  {
    year: "2017-18",
    title: "Stepping Up",
    events: [
      { side: "left", title: "Apogee'17 BITS", text: "Participated in APOGEE'17 BITS Pilani and won in Robowar and Arduino challenge Events." },
      { side: "right", title: "Avishkar'18", text: "Participated in AVISHKAR'18 MNNIT and won 1st in Aerial Vehicle Challenge,\nAny terrain vehicle competition & Pump it Up\nand third in Infinity Crusade event." },
      { side: "left", title: "KWEIZAR'18", text: "Dominated the whole fest with more than 11 postions won by team Endeavour at various competitions." },
      { side: "right", title: "TECHNEX'18", text: "1. Won Second prize in Hydracs\n2. Third Prize in Momentum\n3. Third Prize in D'Aero-Glisseur." },
    ]
  },
  {
    year: "2019",
    title: "Conquering",
    events: [
      { side: "left", title: "Techfest'19 SLIET", text: "Dominated techFEST19 of SLIET with more than 10 positions including.\n\n1. 1st in HYDRALOAD - Pick & Place Bot\n2. 1st in TRUSSLOAD - Bridge Making\n3. 1st in RECONISSANCE - Hovercraft\n4. 2nd in DRONE+\n5. 3rd in FINAL REDEMPTION - Robowar" },
      { side: "right", title: "Techinvent'19", text: "1. First position in Drone for Defense\n2. Second position in Quadcopter race\n3. Third position in Acrobatic flyer" },
      { side: "right", title: "TECHNEX'19", text: "1. 4th position in Axelarate.\n2. 4th position in Hydracs." },
      { side: "left", title: "More", text: "1. Two teams in the Semi - final round of E-yantra 2018.\n2. Qualified first round of Smart India Hackathon in Hardware category andCurrently working on it.\n3. Secured 6th Position in Indian Drone Racing League.\n4. Qualified for Final round of Enginx" },
    ]
  },
  {
    year: "2020-21",
    title: "Victory",
    events: [
      { side: "left", title: "E-yantra 20", text: "Our team Secured 5th rank in final round of E-yantra 2020 conducted by IITB with MHRD" },
      { side: "right", title: "TECHNEX'20", text: "1. Secured 1st position in Axelerate.\n2. Secured 1st position in Hydrac.\n3. Secured 3rd position in Momentum." },
      { side: "left", title: "Techfest'21 SLIET", text: "Dominated techFEST'21 of SLIET with a whooping 21 positions." },
      { side: "right", title: "Advitiya'20", text: "1. Secured 2nd position in Aqua Rocket\n2. Secured 4th position in Off Road Asphalt" },
    ]
  },
  {
    year: "2021-2023",
    title: "Performance",
    events: [
      { side: "left", title: "Skyclan RC plane workshop", text: "Team endeavour conducted a workshop on Aeromodelling in collaboration with Skyclan RC in offline mode in SLIET on the 27th and 28th of April 2022" },
      { side: "right", title: "Technex'23 IIT BHU", text: "1.BUILD IT: 1st position\n2.MOMENTUM: 1st position\n3.MAZE X: 2nd position\n4.BRIDGE THE GAP: 1st & 3rd position\n5.ROBOWAR ( 15Kg category): 3rd position" },
      { side: "left", title: "Tryst'23 IIT Delhi:", text: "The team participated in several events at Tryst'23 IIT Delhi.\nTeam Members got the opportunity to meet the founders of the team. Who are currently pursuing their PhD from IIT DELHI." },
      { side: "right", title: "Institute Innovation Cell (IIC)", text: "Earth's Docker, Advanced PID controlled high speed line following robot, Advanced coconut harvester and Protection of crops against wildlife invasion using multirotor Drone." },
      { side: "left", title: "techFEST SLIET", text: "1.Every Year the team participates in the technical fest organised by the institute\n2. Secured 21 positions in the techFEST'22\n3. Secured 13 positions in the techFEST'23." }
    ]
  }
];

function TimelineEvent({ event }: { event: any; key?: string | number }) {
  const isLeft = event.side === 'left';
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50, x: isLeft ? -30 : 30 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
      className={`relative flex w-full my-12 md:my-8 justify-end md:${isLeft ? 'justify-start' : 'justify-end'}`}
    >
      {/* Desktop connector line */}
      <div className={`hidden md:block absolute top-[24px] w-[48px] h-[2px] bg-white/10 -translate-y-1/2 ${isLeft ? 'right-[50%]' : 'left-[50%]'}`}></div>

      {/* Mobile connector line */}
      <div className="block md:hidden absolute top-[24px] left-[32px] w-[32px] h-[2px] bg-white/10 -translate-y-1/2"></div>

      {/* The Dot */}
      <div className={`absolute top-[24px] left-[32px] md:left-1/2 w-4 h-4 rounded-full bg-brand-bg border-4 border-brand-accent shadow-[0_0_15px_rgba(164,5,5,0.8)] z-10 -translate-x-1/2 -translate-y-1/2`}></div>

      {/* The Card */}
      <div className={`w-[calc(100%-64px)] md:w-[calc(50%-48px)] ${isLeft ? 'md:mr-auto' : 'md:ml-auto ml-auto'}`}>
        <div className="bg-white/[0.03] border border-white/10 hover:border-brand-accent/50 transition-all p-6 md:p-8 flex flex-col gap-4 group relative overflow-hidden backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/0 to-brand-accent/5 group-hover:from-brand-accent/10 transition-colors duration-500"></div>
          
          <h3 className="font-sans font-black text-white text-xl tracking-wide uppercase relative z-10 group-hover:text-brand-accent transition-colors">{event.title}</h3>
          <div className="text-brand-muted text-lg leading-relaxed font-sans whitespace-pre-wrap relative z-10">
            {event.text}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function Roadmap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-20 mt-20 border-t border-white/10 bg-brand-bg relative z-10 overflow-hidden" ref={containerRef}>
      <div className="max-w-[1024px] mx-auto px-4 md:px-[60px]">
        <div className="mb-24 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans text-[40px] md:text-[60px] font-black uppercase tracking-[-2px] text-white leading-[1]"
          >
            OUR <span className="text-brand-accent">ACHIEVEMENTS !</span>
          </motion.h2>
        </div>

        <div className="relative pt-10 pb-20">
          {/* Background Line */}
          <div className="absolute top-0 bottom-0 left-[32px] md:left-1/2 w-[2px] bg-white/5 -translate-x-1/2" />
          
          {/* Animated Line */}
          <motion.div 
            className="absolute top-0 left-[32px] md:left-1/2 w-[2px] bg-gradient-to-b from-brand-accent to-[#ff4b4b] origin-top -translate-x-1/2 shadow-[0_0_10px_rgba(164,5,5,0.8)]"
            style={{ height: lineHeight }}
          />

          {roadmapData.map((section) => (
            <div key={section.year} className="mb-20">
              <div className="flex relative justify-start md:justify-center mb-16 z-10">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="bg-brand-bg border-l-4 border-l-brand-accent border border-white/10 px-8 py-3 shadow-[0_0_20px_rgba(164,5,5,0.15)] ml-[48px] md:ml-0"
                >
                  <div className="text-brand-muted text-[10px] md:text-xs font-bold tracking-[2px] mb-1">{section.year}</div>
                  <div className="text-brand-accent font-black text-lg md:text-xl uppercase tracking-wider">{section.title}</div>
                </motion.div>
                {/* Year connector for mobile */}
                <div className="block md:hidden absolute top-1/2 left-[32px] w-[16px] h-[2px] bg-brand-accent -translate-y-1/2 -z-10"></div>
              </div>
              
              <div className="relative">
                {section.events.map((ev, i) => (
                   <TimelineEvent key={i} event={ev} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
