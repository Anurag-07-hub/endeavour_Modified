import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { FadeIn } from './FadeIn';

const accordionItems = [
  {
    id: 1,
    title: 'Robotics & Mechanics',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Autonomous UAVs',
    imageUrl: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'LiDAR SLAM UGV',
    imageUrl: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Embedded Firmware',
    imageUrl: 'https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Research & Innovation',
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop',
  },
];

interface AccordionItemProps {
  item: typeof accordionItems[0];
  isActive: boolean;
  onMouseEnter: () => void;
  height: number;
  activeWidth: number;
  inactiveWidth: number;
}

function AccordionItem({ item, isActive, onMouseEnter, height, activeWidth, inactiveWidth }: AccordionItemProps) {
  return (
    <div
      className={`
        relative rounded-2xl overflow-hidden cursor-pointer bg-[#12090c]
        transition-all duration-700 ease-in-out border border-white/10 hover:border-brand-accent/50
        ${isActive ? 'shadow-[0_15px_30px_rgba(200,16,46,0.35)]' : ''}
      `}
      style={{
        height: `${height}px`,
        width: isActive ? `${activeWidth}px` : `${inactiveWidth}px`
      }}
      onMouseEnter={onMouseEnter}
    >
      {/* Background Image */}
      <img
        src={item.imageUrl}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none brightness-90 contrast-110 saturate-100"
        onError={(e: any) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x450/12090c/ffffff?text=Image+Error'; }}
      />
      {/* Premium dark gradient overlay - replaces muddy fog overlay */}
      <div 
        className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
        style={{
          background: isActive 
            ? 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%)' 
            : '#000000',
          opacity: isActive ? 0.8 : 0.45
        }}
      />

      {/* Caption Text - Style forced to white to prevent theme overrides */}
      <span
        className={`
          absolute font-sans font-black uppercase tracking-[1px] sm:tracking-[2px] whitespace-nowrap
          transition-all duration-300 ease-in-out select-none pointer-events-none
          ${
            isActive
              ? 'text-[10px] min-[400px]:text-[11px] sm:text-sm bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 rotate-0 opacity-100'
              : 'text-[9px] sm:text-xs bottom-12 sm:bottom-24 left-1/2 -translate-x-1/2 rotate-90 opacity-75'
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

  // Layout parameters (permanently tuned)
  const [frameHeight] = useState(435);
  const [activeWidth] = useState(500);
  const [inactiveWidth] = useState(150);
  const [locationOffset] = useState(0);

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
    <section id="about" className="py-8 md:py-[120px] bg-black/30 border-t border-white/10 relative z-10">
      <div className="max-w-[1400px] mx-auto px-5 md:px-[60px] flex flex-col items-center">
        
        {/* Tomorrow Title - Centered at the top split into 3 lines */}
        <h2 
          className="font-boska uppercase tracking-[1px] md:tracking-[2px] mb-12 md:mb-16 leading-[1.1] text-white flex flex-col items-center select-none text-center"
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

        {/* Side-by-side content columns - centered with tight gap */}
        <div 
          className="flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-12 w-full"
          style={{ 
            '--accordion-mt': `${locationOffset}px`
          } as React.CSSProperties}
        >
          
          {/* Left Column: Text & Stats */}
          <div className="w-full lg:w-[48%] max-w-xl flex flex-col items-center lg:items-start text-center lg:text-left">
            <FadeIn direction="up" delay={0.2} className="flex flex-col items-center lg:items-start">
              <p className="text-brand-muted text-[15px] sm:text-[16px] leading-[1.7] mb-5 font-sans max-w-xl">
                Team Endeavour is the official robotics club of Sant Longowal Institute of Engineering and Technology (SLIET), Longowal. We are a passionate community of engineers, designers, and visionaries dedicated to pushing the boundaries of technology.
              </p>
              <p className="text-brand-muted text-[15px] sm:text-[16px] leading-[1.7] mb-8 font-sans max-w-xl">
                From organizing the grand Techfest to participating at IIT Bombay, IIT Delhi, and other CFTIs, we foster a culture of hands-on learning, teamwork, and technical excellence.
              </p>
            </FadeIn>
            
            {/* Stats Grid (Maroon Box) */}
            <FadeIn direction="up" delay={0.3} className="w-full max-w-xl grid grid-cols-2 gap-4 sm:gap-6 border border-white/10 bg-brand-accent/20 backdrop-blur-md p-5 sm:p-6 rounded-2xl">
              <div className="flex flex-col gap-0.5 sm:gap-1.5">
                <h3 className="font-mono text-[22px] sm:text-[28px] font-bold text-brand-accent">15+</h3>
                <p className="font-sans text-brand-muted text-[8px] sm:text-[9px] uppercase tracking-[1.5px] font-bold">Years of Legacy</p>
              </div>
              <div className="flex flex-col gap-0.5 sm:gap-1.5">
                <h3 className="font-mono text-[22px] sm:text-[28px] font-bold text-brand-accent">50+</h3>
                <p className="font-sans text-brand-muted text-[8px] sm:text-[9px] uppercase tracking-[1.5px] font-bold">Active Members</p>
              </div>
              <div className="flex flex-col gap-0.5 sm:gap-1.5">
                <h3 className="font-mono text-[22px] sm:text-[28px] font-bold text-brand-accent">12</h3>
                <p className="font-sans text-brand-muted text-[8px] sm:text-[9px] uppercase tracking-[1.5px] font-bold">National Trophies</p>
              </div>
              <div className="flex flex-col gap-0.5 sm:gap-1.5">
                <h3 className="font-mono text-[22px] sm:text-[28px] font-bold text-brand-accent">120+</h3>
                <p className="font-sans text-brand-muted text-[8px] sm:text-[9px] uppercase tracking-[1.5px] font-bold">Projects Built</p>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Image Accordion - Pushed down to align top-to-bottom with Stats Grid */}
          <div className="w-full lg:w-[48%] max-w-xl flex justify-center lg:justify-start mt-6 lg:mt-[var(--accordion-mt)]">
            {/* Interactive Image Accordion - Sizing dynamic states */}
            <FadeIn direction="up" delay={0.4} className="flex flex-row items-center justify-center gap-2 sm:gap-4 p-2 w-full">
              {accordionItems.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isActive={index === activeIndex}
                  onMouseEnter={() => setActiveIndex(index)}
                  height={frameHeight}
                  activeWidth={activeWidth}
                  inactiveWidth={inactiveWidth}
                />
              ))}
            </FadeIn>
          </div>

        </div>
      </div>


    </section>
  );
}
