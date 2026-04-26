import { FadeIn } from './FadeIn';
import { AnimatedText } from './AnimatedText';
import { Calendar, Trophy, Zap, Cpu } from 'lucide-react';
import { useState } from 'react';

function EventCard({ event }: { event: any }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <FadeIn key={event.title} delay={event.delay} direction="up">
      <div
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
        onTouchStart={() => setIsActive(true)}
        onTouchEnd={() => setIsActive(false)}
        className={`relative p-6 md:p-[40px] bg-brand-accent/20 backdrop-blur-md border transition-all duration-500 overflow-hidden h-full cursor-pointer select-none
          ${isActive ? 'border-brand-accent' : 'border-white/10'}`}
      >
        <div className="relative z-10 flex flex-col gap-4 md:gap-[20px]">
          <div className="inline-flex border border-white/10 border-l-brand-accent border-l-2 bg-black/30 p-[12px] md:p-[15px] self-start">
            {event.icon}
          </div>
          <h3 className={`font-sans font-black text-[20px] md:text-[24px] uppercase tracking-tight transition-colors duration-300 ${isActive ? 'text-brand-accent' : 'text-white'}`}>
            {event.title}
          </h3>
          <p className="font-sans text-brand-muted text-[14px] md:text-[16px] leading-[1.6]">
            {event.description}
          </p>
        </div>
      </div>
    </FadeIn>
  );
}

export function Events() {
  const events = [
    {
      title: 'Techfest',
      description: 'Our flagship technical festival featuring national-level robotics competitions, hackathons, and guest lectures.',
      icon: <Zap className="w-6 h-6 text-brand-accent" />,
      delay: 0.1,
    },
    {
      title: 'Madhuram',
      description: 'The cultural extravaganza where technology meets art, showcasing the vibrant life at SLIET.',
      icon: <Calendar className="w-6 h-6 text-brand-accent" />,
      delay: 0.2,
    },
    {
      title: 'Workshops',
      description: 'Hands-on sessions on IoT, Machine Learning, Embedded Systems, and Robot Operating System (ROS).',
      icon: <Cpu className="w-6 h-6 text-brand-accent" />,
      delay: 0.3,
    },
    {
      title: 'Competitions',
      description: 'Representing SLIET at global platforms like IIT Bombay Techfest, e-Yantra, and Smart India Hackathon.',
      icon: <Trophy className="w-6 h-6 text-brand-accent" />,
      delay: 0.4,
    },
  ];

  return (
    <section id="events" className="py-[60px] md:py-[100px] bg-white/[0.02] relative border-t border-white/10">
      <div className="max-w-[1024px] mx-auto px-4 min-[390px]:px-5 md:px-[60px]">
        <div className="mb-12 md:mb-20">
          <FadeIn direction="up">
            <span className="font-sans font-bold text-brand-muted text-[10px] uppercase tracking-[2px] mb-4 block">
              Our Initiatives
            </span>
          </FadeIn>
          <AnimatedText
            text="EVENTS & COMPETITIONS"
            className="text-[28px] min-[390px]:text-[34px] sm:text-[48px] md:text-[64px] font-sans font-black tracking-[-2px] text-white leading-[0.9]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-[40px]">
          {events.map((event) => (
            <EventCard key={event.title} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}
