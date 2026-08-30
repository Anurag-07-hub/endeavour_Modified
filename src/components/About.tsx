import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { FadeIn } from './FadeIn';

const accordionItems = [
  {
    id: 1,
    title: 'Robotics & Mechanics',
    imageUrl: '/images/warbot.jpeg',
  },
  {
    id: 2,
    title: 'Autonomous UAVs',
    imageUrl: '/images/race_drone.png',
  },
  {
    id: 3,
    title: 'UGV',
    imageUrl: '/images/ugv.jpg',
  },
  {
    id: 4,
    title: 'Embedded Firmware',
    imageUrl: '/images/embbed.jpeg',
  },
  {
    id: 5,
    title: 'Research & Innovation',
    imageUrl: '/images/agriDrone.jpg',
  },
];

interface AccordionItemProps {
  item: typeof accordionItems[0];
  isActive: boolean;
  onMouseEnter: () => void;
}

function AccordionItem({ item, isActive, onMouseEnter }: AccordionItemProps) {
  return (
    <div
      className={`
        relative h-[300px] sm:h-[450px] rounded-2xl overflow-hidden cursor-pointer bg-[#12090c]
        transition-all duration-700 ease-in-out border
        ${isActive 
          ? 'flex-[3.5] sm:flex-[4.5] border-brand-accent/50 shadow-[0_15px_30px_rgba(200,16,46,0.25)]' 
          : 'flex-[1] border-white/10 hover:border-brand-accent/30'
        }
      `}
      onMouseEnter={onMouseEnter}
      onClick={onMouseEnter}
    >
      {/* Background Image */}
      <img
        src={item.imageUrl}
        alt={item.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none brightness-95 contrast-105 saturate-100"
        onError={(e: any) => { 
          e.target.onerror = null; 
          e.target.src = 'https://placehold.co/400x450/12090c/ffffff?text=Image+Error'; 
        }}
      />
      {/* Premium dark gradient overlay */}
      <div 
        className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
        style={{
          background: isActive 
            ? 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)' 
            : '#000000',
          opacity: isActive ? 0.85 : 0.6
        }}
      />

      {/* Caption Text - Style forced to white to prevent theme overrides */}
      <span
        className={`
          absolute font-sans font-black uppercase tracking-[0.5px] sm:tracking-[2px] whitespace-nowrap
          transition-all duration-300 ease-in-out select-none pointer-events-none
          ${
            isActive
              ? 'text-[7.5px] min-[360px]:text-[8.5px] min-[400px]:text-[10px] sm:text-sm bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 translate-y-0 rotate-0 opacity-100'
              : 'text-[9px] sm:text-xs top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 opacity-75'
          }
        `}
        style={{ color: '#ffffff' }}
      >
        {item.title}
      </span>
    </div>
  );
}

export function About() {
  const [titleNumber, setTitleNumber] = useState(0);
  const [activeIndex, setActiveIndex] = useState(2);

  const titles = useMemo(
    () => ["Robotics", "Aeromodelling", "Drone Racing", "Combat Bots", "Innovation"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber((prev) => (prev + 1) % titles.length);
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <section id="about" className="py-[60px] md:py-[120px] bg-brand-bg border-t border-white/10 relative z-10">
      <div className="max-w-[1400px] mx-auto px-5 md:px-[60px] flex flex-col items-center">
        
        {/* Tomorrow Title - Centered at the top split into 3 lines */}
        <h2 
          className="font-sans uppercase tracking-[1px] md:tracking-[2px] mb-12 md:mb-16 leading-[1.9] text-white flex flex-col items-center select-none text-center"
          style={{ fontSize: 'clamp(32px, 4.5vw, 48px)' }}
        >
          <span>Empowering the innovators</span>
          <span className="mt-1">of tomorrow in</span>
          <span className="relative flex overflow-hidden text-brand-accent h-[1.1em] justify-center min-w-[9.5em] mt-2">
            &nbsp;
            {titles.map((title, index) => (
              <motion.span
                key={index}
                className="absolute inset-0 flex items-center justify-center font-black tracking-[1px] uppercase whitespace-nowrap"
                initial={{ opacity: 0, y: '100%' }}
                transition={{ type: "spring", stiffness: 50, damping: 10 }}
                animate={
                  titleNumber === index
                    ? {
                        y: '0%',
                        opacity: 1,
                      }
                    : {
                        y: titleNumber > index ? '-100%' : '100%',
                        opacity: 0,
                      }
                }
              >
                {title}
              </motion.span>
            ))}
          </span>
        </h2>

        {/* Side-by-side content columns */}
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-8 lg:gap-12 w-full">
          
          {/* Left Column: Text & Stats */}
          <div className="w-full lg:w-[48%] max-w-xl flex flex-col items-center lg:items-start justify-between text-center lg:text-left text-white">
            <FadeIn direction="up" delay={0.2} className="flex flex-col items-center lg:items-start w-full">
              <p className="text-brand-muted text-[15px] sm:text-[16px] leading-[1.7] mb-5 font-sans w-full">
                Team Endeavour is the official robotics team of Sant Longowal Institute of Engineering and Technology (SLIET), Longowal. We are a team of passionate students who design, build, and compete with robotic systems across various national platforms.
              </p>
              <p className="text-brand-muted text-[15px] sm:text-[16px] leading-[1.7] mb-8 font-sans w-full">
                Through practical projects and collaborative learning, we strengthen the technical skills of students while actively participating in Techfests, national robotics competitions, and robotics hackathons at IITs and other leading institutions across India.
              </p>
            </FadeIn>
            
            {/* Stats Grid (Premium Glassmorphic Box) */}
            <FadeIn 
              direction="up" 
              delay={0.3} 
              className="w-full grid grid-cols-2 gap-4 sm:gap-6 border border-white/20 bg-white/[0.07] backdrop-blur-xl p-5 sm:p-6 rounded-2xl hover:border-brand-accent/30 hover:bg-white/[0.12] shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] transition-all duration-500"
            >
              <div className="flex flex-col gap-0.5 sm:gap-1.5 text-left">
                <h3 className="font-mono text-[22px] sm:text-[28px] font-bold text-brand-accent">10+</h3>
                <p className="font-sans text-brand-muted text-[8px] sm:text-[9px] uppercase tracking-[1.5px] font-bold">Years of Legacy</p>
              </div>
              <div className="flex flex-col gap-0.5 sm:gap-1.5 text-left">
                <h3 className="font-mono text-[22px] sm:text-[28px] font-bold text-brand-accent">50+</h3>
                <p className="font-sans text-brand-muted text-[8px] sm:text-[9px] uppercase tracking-[1.5px] font-bold">Active Members</p>
              </div>
              <div className="flex flex-col gap-0.5 sm:gap-1.5 text-left">
                <h3 className="font-mono text-[22px] sm:text-[28px] font-bold text-brand-accent">25+</h3>
                <p className="font-sans text-brand-muted text-[8px] sm:text-[9px] uppercase tracking-[1.5px] font-bold">Podium Finishes</p>
              </div>
              <div className="flex flex-col gap-0.5 sm:gap-1.5 text-left">
                <h3 className="font-mono text-[22px] sm:text-[28px] font-bold text-brand-accent">30+</h3>
                <p className="font-sans text-brand-muted text-[8px] sm:text-[9px] uppercase tracking-[1.5px] font-bold">Projects Built</p>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Image Accordion */}
          <div className="w-full lg:w-[48%] max-w-xl flex items-center justify-center">
            {/* Interactive Image Accordion - Sizing dynamic states */}
            <FadeIn direction="up" delay={0.4} className="flex flex-row items-center justify-center gap-2 sm:gap-4 p-2 w-full">
              {accordionItems.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isActive={index === activeIndex}
                  onMouseEnter={() => setActiveIndex(index)}
                />
              ))}
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}
