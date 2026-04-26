import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { teamMembers } from '../data/team';
import { Linkedin, Mail } from 'lucide-react';

function TeamMemberCard({ member, delay }: { member: any; delay: number; key?: string | number }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, type: "spring", stiffness: 50 }}
      className="bg-black/30 border border-white/10 group overflow-hidden flex flex-col items-center hover:border-brand-accent transition-all duration-500 backdrop-blur-sm shadow-lg hover:shadow-[0_0_25px_rgba(164,5,5,0.4)] relative hover:-translate-y-2 rounded-2xl"
    >
      <div className="w-full relative pt-[100%] overflow-hidden bg-white/5">
        {/* Skeleton Loader */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite] z-0" />
        )}

        <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/0 to-brand-accent/10 group-hover:opacity-100 opacity-0 transition-opacity duration-500 z-10" />

        <img
          src={member.image}
          alt={member.name}
          onLoad={() => setIsLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ease-out group-hover:scale-105 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(member.name) + '&background=a40505&color=fff&size=512';
            setIsLoaded(true);
          }}
        />
      </div>
      <div className="p-6 w-full text-center relative z-20 bg-gradient-to-t from-brand-bg to-brand-bg/80 border-t border-white/5 group-hover:border-brand-accent/50 transition-colors duration-500">
        <h3 className="text-white font-sans font-bold text-lg mb-1 tracking-wider uppercase group-hover:text-brand-accent transition-colors">{member.name}</h3>
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

  const [activeTab, setActiveTab] = useState('Executives');

  const visibleMembers = activeTab === 'Faculty Advisor'
    ? [teamMembers.find(t => t.name === 'Prof. Surita Maini')]
    : teamMembers.find(t => t.category === activeTab)?.members || [];

  return (
    <div className="pt-[150px] pb-[100px] bg-brand-bg min-h-screen">
      <div className="max-w-[1280px] mx-auto px-[30px] md:px-[60px]">
        <div className="mb-20 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 50 }}
            className="mb-6"
          >
            <h2 className="font-sans text-[40px] md:text-[60px] font-black uppercase tracking-[-2px] text-white leading-[1]">
              OUR STRONGEST <span className="text-brand-accent">PILLARS</span>
            </h2>
          </motion.div>
          <div className="h-[2px] w-[60px] bg-brand-accent mb-12"></div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            {['Faculty Advisor', 'Executives', 'Core Committee', 'Alumni'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 font-sans text-sm tracking-[2px] uppercase font-bold transition-all duration-300 border ${activeTab === tab
                    ? 'bg-brand-accent border-brand-accent text-white shadow-[0_0_15px_rgba(164,5,5,0.4)]'
                    : 'bg-transparent border-white/20 text-brand-muted hover:border-brand-accent hover:text-white'
                  }`}
              >
                {tab}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {visibleMembers.map((member: any, i: number) => (
            member && <TeamMemberCard key={member.name} member={member} delay={i * 0.1} />
          ))}
        </motion.div>

      </div>
    </div>
  );
}
