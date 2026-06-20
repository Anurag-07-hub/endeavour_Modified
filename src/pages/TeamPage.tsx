import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { Linkedin, Mail } from 'lucide-react';

function TeamMemberCard({ member, delay }: { member: any; delay: number; key?: string | number }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{ delay, type: "spring", stiffness: 50 }}
      className="group bg-black/30 border border-white/10 overflow-hidden flex flex-col items-center transition-all duration-500 backdrop-blur-sm relative rounded-2xl cursor-pointer select-none hover:border-brand-accent hover:shadow-[0_0_25px_rgba(164,5,5,0.4)] hover:-translate-y-1"
    >
      <div className="w-full relative pt-[80%] overflow-hidden bg-white/5">
        {/* Skeleton Loader */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite] z-0" />
        )}

        <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/0 to-brand-accent/10 transition-opacity duration-500 z-10 opacity-0 group-hover:opacity-100" />

        <img
          src={member.image}
          alt={member.name}
          onLoad={() => setIsLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ease-out scale-100 group-hover:scale-105 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(member.name) + '&background=a40505&color=fff&size=512';
            setIsLoaded(true);
          }}
        />
      </div>
      <div className="p-6 w-full text-center relative z-20 bg-gradient-to-t from-brand-bg to-brand-bg/80 border-t border-white/5 group-hover:border-brand-accent/50 transition-colors duration-500">
        <h3 className="font-sans font-bold text-lg mb-1 tracking-wider uppercase text-white group-hover:text-brand-accent transition-colors">{member.name}</h3>
        <p className="text-brand-muted font-sans text-xs uppercase tracking-[2px]">{member.position}</p>

        <div className="flex items-center justify-center gap-4 mt-5 relative z-30">
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label={`${member.name} LinkedIn Profile`}
              className="text-brand-muted hover:text-[#0a66c2] transition-colors"
            >
              <Linkedin className="w-[20px] h-[20px]" />
            </a>
          )}
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              aria-label={`Email ${member.name}`}
              className="text-brand-muted hover:text-brand-accent transition-colors"
            >
              <Mail className="w-[20px] h-[20px]" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function TeamPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeTab, setActiveTab] = useState('Faculty Advisor');
  const { team } = useCMS();

  const visibleMembers = team.find(t => t.category === activeTab)?.members || [];

  return (
    <div className="pt-[80px] min-[390px]:pt-[90px] md:pt-[150px] pb-[60px] md:pb-[100px] bg-brand-bg min-h-screen">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-[30px] md:px-[60px]">
        <div className="mb-20 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 50 }}
            className="mb-6"
          >
            <h2 className="font-sans text-[28px] min-[390px]:text-[34px] md:text-[60px] font-black uppercase tracking-[-2px] text-white leading-[1]">
              OUR STRONGEST <span className="text-brand-accent">PILLARS</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            {['Faculty Advisor', 'Executives', 'Core Committee', 'Alumni'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`group px-4 min-[390px]:px-6 md:px-8 py-2.5 md:py-3 font-sans text-[11px] min-[390px]:text-[12px] md:text-sm tracking-[2px] uppercase font-bold transition-all duration-300 border flex items-center justify-center ${activeTab === tab
                    ? 'bg-brand-accent border-brand-accent text-white shadow-[0_0_15px_rgba(164,5,5,0.4)]'
                    : 'bg-transparent border-white/20 text-brand-muted hover:border-brand-accent hover:text-white'
                  }`}
              >
                <div className="relative inline-block overflow-hidden h-[1.2em] flex items-center">
                  <div className="flex flex-col transition-transform duration-300 ease-out transform group-hover:-translate-y-1/2">
                    <span className="leading-[1.2em]">{tab}</span>
                    <span className="leading-[1.2em]">{tab}</span>
                  </div>
                </div>
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-4 md:gap-8"
        >
          {visibleMembers.map((member: any, i: number) => (
            <div 
              key={member?.name ?? i} 
              className="w-[calc(50%-8px)] md:w-[calc(33.333%-21.33px)] lg:w-[calc(25%-24px)]"
            >
              <TeamMemberCard member={member} delay={i * 0.05} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
