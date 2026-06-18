import { FadeIn } from './FadeIn';
import { RevealText } from './RevealText';

export function About() {
  return (
    <section id="about" className="py-[60px] md:py-[100px] bg-black/30 border-t border-white/10 relative z-10">
      <div className="max-w-[1024px] mx-auto px-5 md:px-[60px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          
          <div>
            <FadeIn direction="right" delay={0.1}>
              <RevealText 
                text="Empowering the innovators of tomorrow." 
                className="font-sans text-[36px] md:text-[48px] lg:text-[64px] font-black uppercase tracking-[-2px] mb-5 md:mb-6 leading-[0.9]"
              />
            </FadeIn>
            <FadeIn direction="right" delay={0.2}>
              <p className="text-brand-muted text-[15px] md:text-[16px] leading-[1.6] mb-6 md:mb-8 font-sans">
                Team Endeavour is the official robotics club of Sant Longowal Institute of Engineering and Technology (SLIET), Longowal. We are a passionate community of engineers, designers, and visionaries dedicated to pushing the boundaries of technology.
              </p>
              <p className="text-brand-muted text-[15px] md:text-[16px] leading-[1.6] font-sans">
                From organizing the grand Techfest to participating at IIT Bombay, IIT Delhi, and other CFTIs, we foster a culture of hands-on learning, teamwork, and technical excellence.
              </p>
            </FadeIn>
            
            <FadeIn direction="up" delay={0.3} className="mt-10 md:mt-12 grid grid-cols-2 gap-6 md:gap-8 border-t border-white/10 bg-brand-accent/20 backdrop-blur-md p-5 md:p-[30px]">
              <div className="flex flex-col gap-2">
                <h3 className="font-mono text-[28px] md:text-[32px] font-bold text-brand-accent">15+</h3>
                <p className="font-sans text-brand-muted text-[10px] uppercase tracking-[2px] font-bold">Years of Legacy</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-mono text-[28px] md:text-[32px] font-bold text-brand-accent">50+</h3>
                <p className="font-sans text-brand-muted text-[10px] uppercase tracking-[2px] font-bold">Active Members</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-mono text-[28px] md:text-[32px] font-bold text-brand-accent">12</h3>
                <p className="font-sans text-brand-muted text-[10px] uppercase tracking-[2px] font-bold">National Trophies</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-mono text-[28px] md:text-[32px] font-bold text-brand-accent">120+</h3>
                <p className="font-sans text-brand-muted text-[10px] uppercase tracking-[2px] font-bold">Projects Built</p>
              </div>
            </FadeIn>
          </div>

          {/* Image collage — visible on md+ only */}
          <div className="relative h-[400px] md:h-[600px] w-full hidden md:block">
            <FadeIn direction="left" delay={0.2} className="absolute top-0 right-0 w-3/4 h-[400px] border border-white/10 z-10 bg-black/30">
              <img 
                src="https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?q=80&w=1470&auto=format&fit=crop" 
                alt="Robotics Team" 
                className="w-full h-full object-cover transition-all duration-700" 
              />
            </FadeIn>
            <FadeIn direction="up" delay={0.4} className="absolute bottom-10 left-0 w-2/3 h-[300px] border border-brand-accent z-20 bg-black/30">
              <div className="absolute inset-0 bg-brand-accent/20 mix-blend-overlay z-10 pointer-events-none"></div>
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1470&auto=format&fit=crop" 
                alt="Engineering Workshop" 
                className="w-full h-full object-cover transition-all duration-700" 
              />
            </FadeIn>
          </div>

          {/* Mobile-only single image */}
          <div className="block md:hidden w-full h-[220px] border border-white/10 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?q=80&w=1470&auto=format&fit=crop"
              alt="Robotics Team"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
