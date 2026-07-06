import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { FadeIn } from './FadeIn';

export function About() {
  const [titleNumber, setTitleNumber] = useState(0);
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
    <section id="about" data-cursor-hidden="true" className="py-8 md:py-[100px] bg-black/30 border-t border-white/10 relative z-10">
      <div className="max-w-[1024px] mx-auto px-5 md:px-[60px] flex flex-col items-center">
        
        {/* Centered Text Content */}
        <div className="w-full text-center flex flex-col items-center">

          <h2 
            className="font-boska uppercase tracking-[1px] md:tracking-[2px] mb-6 md:mb-8 leading-[1.1] text-white flex flex-col sm:flex-row sm:items-center sm:flex-wrap justify-center gap-x-2.5 select-none -translate-y-[10px]"
            style={{ fontSize: 'clamp(38px, 6vw, 61px)' }}
          >
            <span>Empowering the innovators of tomorrow in</span>
            <span className="relative flex overflow-hidden text-brand-accent h-[1.1em] justify-center min-w-[9.5em]">
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
          <FadeIn direction="up" delay={0.2}>
            <p className="text-brand-muted text-[16px] md:text-[18px] leading-[1.8] mb-6 font-sans max-w-4xl mx-auto">
              Team Endeavour is the official robotics club of Sant Longowal Institute of Engineering and Technology (SLIET), Longowal. We are a passionate community of engineers, designers, and visionaries dedicated to pushing the boundaries of technology.
            </p>
            <p className="text-brand-muted text-[16px] md:text-[18px] leading-[1.8] mb-10 font-sans max-w-4xl mx-auto">
              From organizing the grand Techfest to participating at IIT Bombay, IIT Delhi, and other CFTIs, we foster a culture of hands-on learning, teamwork, and technical excellence.
            </p>
          </FadeIn>
          
          {/* Centered stats grid */}
          <FadeIn direction="up" delay={0.3} className="w-full max-w-3xl grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 border border-white/10 bg-brand-accent/20 backdrop-blur-md p-6 sm:p-8 rounded-2xl mx-auto mt-4">
            <div className="flex flex-col gap-1 sm:gap-2">
              <h3 className="font-mono text-[24px] sm:text-[28px] md:text-[32px] font-bold text-brand-accent">15+</h3>
              <p className="font-sans text-brand-muted text-[8px] sm:text-[10px] uppercase tracking-[1.5px] sm:tracking-[2px] font-bold">Years of Legacy</p>
            </div>
            <div className="flex flex-col gap-1 sm:gap-2">
              <h3 className="font-mono text-[24px] sm:text-[28px] md:text-[32px] font-bold text-brand-accent">50+</h3>
              <p className="font-sans text-brand-muted text-[8px] sm:text-[10px] uppercase tracking-[1.5px] sm:tracking-[2px] font-bold">Active Members</p>
            </div>
            <div className="flex flex-col gap-1 sm:gap-2">
              <h3 className="font-mono text-[24px] sm:text-[28px] md:text-[32px] font-bold text-brand-accent">12</h3>
              <p className="font-sans text-brand-muted text-[8px] sm:text-[10px] uppercase tracking-[1.5px] sm:tracking-[2px] font-bold">National Trophies</p>
            </div>
            <div className="flex flex-col gap-1 sm:gap-2">
              <h3 className="font-mono text-[24px] sm:text-[28px] md:text-[32px] font-bold text-brand-accent">120+</h3>
              <p className="font-sans text-brand-muted text-[8px] sm:text-[10px] uppercase tracking-[1.5px] sm:tracking-[2px] font-bold">Projects Built</p>
            </div>
          </FadeIn>
        </div>

        {/* Centered Image collage — visible on md+ only */}
        <div className="relative h-[300px] md:h-[450px] w-full max-w-4xl mx-auto hidden md:block mt-12">
          <FadeIn direction="right" delay={0.2} className="absolute top-0 left-0 w-[55%] h-[350px] border border-white/10 z-10 bg-black/30 rounded-2xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?q=80&w=1470&auto=format&fit=crop" 
              alt="Robotics Team" 
              className="w-full h-full object-cover transition-all duration-700 hover:scale-105" 
            />
          </FadeIn>
          <FadeIn direction="up" delay={0.4} className="absolute bottom-0 right-0 w-[50%] h-[280px] border border-brand-accent z-20 bg-black/30 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-brand-accent/20 mix-blend-overlay z-10 pointer-events-none"></div>
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1470&auto=format&fit=crop" 
              alt="Engineering Workshop" 
              className="w-full h-full object-cover transition-all duration-700 hover:scale-105" 
            />
          </FadeIn>
        </div>

        {/* Mobile-only single image */}
        <div className="block md:hidden w-full h-[220px] border border-white/10 overflow-hidden mt-10 rounded-2xl">
          <img
            src="https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?q=80&w=1470&auto=format&fit=crop"
            alt="Robotics Team"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
