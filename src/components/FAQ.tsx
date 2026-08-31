import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search, HelpCircle, Users, Trophy, BookOpen, Shield, ShieldAlert } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { AnimatedText } from './AnimatedText';

interface FAQItem {
  id: number;
  question: string;
  answer: React.ReactNode;
  category: 'general' | 'joining' | 'competitions' | 'membership' | 'safety';
}

export function FAQ({ theme = 'dark' }: { theme?: 'light' | 'dark' }) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Questions', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'general', label: 'General', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'joining', label: 'Joining the Team', icon: <Users className="w-4 h-4" /> },
    { id: 'competitions', label: 'Competitions & Projects', icon: <Trophy className="w-4 h-4" /> },
    { id: 'membership', label: 'Membership & Commitments', icon: <Shield className="w-4 h-4" /> },
    { id: 'safety', label: 'Safety & Permissions', icon: <ShieldAlert className="w-4 h-4" /> },
  ];

  const faqData: FAQItem[] = useMemo(() => [
    {
      id: 1,
      category: 'general',
      question: 'What is Team Endeavour?',
      answer: (
        <p className="text-brand-muted leading-relaxed">
          Endeavour is the official robotics club of Sant Longowal Institute of Engineering & Technology (SLIET), Punjab. We are a multidisciplinary team of engineering students dedicated to bridging the gap between theoretical knowledge and practical application through robotics.
        </p>
      ),
    },
    {
      id: 2,
      category: 'general',
      question: 'What domains does Team Endeavour work in?',
      answer: (
        <div className="space-y-4 text-brand-muted">
          <p>We focus on several core technical areas, including:</p>
          <ul className="space-y-2 list-disc pl-5">
            <li>
              <strong className="text-white">Competitive Robotics:</strong> Combat robots (Robowar), Line Following Robots (LFR), and custom bots built for national challenges.
            </li>
            <li>
              <strong className="text-white">UAVs (Unmanned Aerial Vehicles):</strong> Drones and acrobatic flyers.
            </li>
            <li>
              <strong className="text-white">UGVs (Unmanned Ground Vehicles):</strong> Autonomous mobile platforms, pick-and-place bots, and rover platforms.
            </li>
            <li>
              <strong className="text-white">Rocketry:</strong> Design, development, simulation, and testing of rockets.
            </li>
            <li>
              <strong className="text-white">Research & Innovation:</strong> Developing real-world solutions like agricultural drones and VTOL.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 3,
      category: 'joining',
      question: 'Who can join Team Endeavour?',
      answer: (
        <div className="space-y-4 text-brand-muted">
          <p>
            We welcome undergraduate students from all engineering branches. Robotics is interdisciplinary, so whether you are from Mechanical, Electronics, Computer Science, or Electrical engineering, there is a place for you.
          </p>
          <div className="overflow-x-auto border border-white/10 rounded-lg bg-black/20">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="p-3 text-[12px] sm:text-[14px] font-bold text-white uppercase tracking-wider">Stream</th>
                  <th className="p-3 text-[12px] sm:text-[14px] font-bold text-white uppercase tracking-wider">Eligible Years</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-3 font-semibold text-white">Diploma</td>
                  <td className="p-3">1st, 2nd, and 3rd Year</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-3 font-semibold text-white">B.E</td>
                  <td className="p-3">1st and 2nd Year</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-3 font-semibold text-white">Dual Degree</td>
                  <td className="p-3">1st and 2nd Year</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      category: 'joining',
      question: 'How can I join Team Endeavour?',
      answer: (
        <p className="text-brand-muted leading-relaxed">
          Recruitments usually happen annually. We look for students who are passionate about learning and have a positive attitude. Keep an eye on our{' '}
          <a
            href="https://www.instagram.com/sliet_robotics/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-accent hover:underline inline-flex items-center gap-1 font-semibold"
          >
            Instagram
          </a>{' '}
          or the college notice boards for recruitment drive announcements.
        </p>
      ),
    },
    {
      id: 5,
      category: 'joining',
      question: 'Do I need prior knowledge of robotics to join?',
      answer: (
        <p className="text-brand-muted leading-relaxed">
          Not necessarily! While interest is mandatory, we provide training through senior-led sessions on CAD designing, programming, and electronics. We value a hunger for learning over pre-existing expertise.
        </p>
      ),
    },
    {
      id: 6,
      category: 'competitions',
      question: 'Which competitions does Team Endeavour participate in?',
      answer: (
        <div className="space-y-3 text-brand-muted">
          <p>The team regularly competes at national-level events, including:</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 list-none pl-0">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
              <span>IIT Techfests (Bombay, Delhi, BHU, Roorkee)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
              <span>E-yantra (IIT Bombay)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
              <span>SAE Aero Design Challenge</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent" />
              <span>SLIET’s own techFEST</span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 7,
      category: 'competitions',
      question: "What are some of Team Endeavour's major achievements?",
      answer: (
        <p className="text-brand-muted leading-relaxed">
          We have a history of excellence, including winning multiple podium positions at{' '}
          <strong className="text-white font-semibold">Technex (IIT BHU)</strong>,{' '}
          <strong className="text-white font-semibold">Techfest (IIT Bombay)</strong>,{' '}
          <strong className="text-white font-semibold">APOGEE (BITS Pilani)</strong>, and dominating{' '}
          <strong className="text-white font-semibold">techFEST SLIET</strong> with over 20+ positions in recent years.
        </p>
      ),
    },

    {
      id: 9,
      category: 'membership',
      question: 'How does the club view academic performance?',
      answer: (
        <p className="text-brand-muted leading-relaxed">
          While robotics is our passion, academics remain the priority. However, committing to a project requires a high degree of responsibility. Members are expected to maintain a healthy balance between their coursework and the club’s workflow. Joining a project means committing to its completion, which may require additional hours during peak competition seasons.
        </p>
      ),
    },
    {
      id: 10,
      category: 'membership',
      question: 'Can I join other technical clubs alongside Team Endeavour?',
      answer: (
        <p className="text-brand-muted leading-relaxed">
          To ensure total dedication to our mission and technical standards and avoid conflict of interest, members of Endeavour are{' '}
          <strong className="text-brand-accent font-semibold">not permitted</strong> to join any other technical club within the institute. You are welcome to participate in non-technical or cultural clubs; however, Endeavour must remain your primary extracurricular priority.
        </p>
      ),
    },

  ], []);

  const filteredFaqs = useMemo(() => {
    return faqData.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      
      let matchesSearch = true;
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const questionMatches = item.question.toLowerCase().includes(query);
        const textContent = item.id === 1 ? 'endeavour official robotics club sliet punjab multidisciplinary' : 
                            item.id === 2 ? 'uav unmanned aerial vehicle ugv unmanned ground vehicle research innovation rocketry' :
                            item.id === 3 ? 'who can join diploma be dual degree engineering branches' :
                            item.id === 4 ? 'how can i join recruitments annual instagram notice boards' :
                            item.id === 5 ? 'prior knowledge cad designing programming electronics training' :
                            item.id === 6 ? 'competitions techfests bombay delhi bhu roorkee e-yantra sae aero techfest' :
                            item.id === 7 ? 'achievements technex cognizance techfest' :
                            item.id === 9 ? 'academic performance priority balance coursework' :
                            item.id === 10 ? 'other technical clubs permission restrict' : '';
        
        matchesSearch = questionMatches || textContent.toLowerCase().includes(query);
      }
      
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, faqData]);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className={`py-20 md:py-32 w-full relative z-10 ${theme === 'light' ? 'bg-[#ffffff] text-[#111827]' : 'bg-brand-bg text-white'}`}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-[60px]">
        
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <FadeIn direction="up">
            <span className="font-sans font-bold text-brand-accent text-[11px] uppercase tracking-[3px] mb-3 block">
              HAVE QUESTIONS?
            </span>
          </FadeIn>
          <AnimatedText
            text="FREQUENTLY ASKED QUESTIONS"
            className={`text-[28px] min-[390px]:text-[34px] sm:text-[46px] md:text-[56px] font-sans font-black tracking-[-2px] leading-[0.95] ${theme === 'light' ? 'text-[#111827]' : 'text-white'}`}
          />
        </div>

        {/* Search & Categories Container */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 md:gap-12 items-start">
          
          {/* Left Column: Categories and Search (lg size) */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full border rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-accent/50 transition-all duration-300 font-sans
                  ${theme === 'light'
                    ? 'bg-[#f9fafb] border-[#e5e7eb] text-[#111827] placeholder-gray-400 focus:bg-[#ffffff]'
                    : 'bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:bg-white/[0.05]'
                  }`}
              />
              <Search className={`absolute left-3.5 top-3.5 w-4.5 h-4.5 ${theme === 'light' ? 'text-gray-400' : 'text-white/30'}`} />
            </div>

            {/* Category selection */}
            <div className="flex lg:flex-col gap-2 overflow-x-auto pb-3 lg:pb-0 scrollbar-none snap-x lg:snap-none">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setExpandedId(null);
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg border text-sm font-semibold tracking-wide whitespace-nowrap transition-all duration-300 snap-start
                    ${activeCategory === cat.id
                      ? 'bg-brand-accent border-brand-accent text-[#ffffff] shadow-lg shadow-brand-accent/20'
                      : theme === 'light'
                        ? 'bg-[#f9fafb] border-[#e5e7eb] text-[#374151] hover:border-gray-300 hover:bg-gray-100/50'
                        : 'bg-white/[0.02] border-white/5 text-brand-muted hover:border-white/20 hover:bg-white/[0.05]'
                    }`}
                >
                  {cat.icon}
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:col-span-3 space-y-4 min-h-[300px]">
            <AnimatePresence mode="popLayout">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq) => {
                  const isExpanded = expandedId === faq.id;
                  return (
                    <motion.div
                      key={faq.id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className={`border rounded-xl transition-all duration-500 overflow-hidden backdrop-blur-sm
                        ${isExpanded 
                          ? theme === 'light'
                            ? 'border-[#c41515]/30 bg-[#f9fafb] shadow-md shadow-[#c41515]/5'
                            : 'border-brand-accent/50 bg-white/[0.04]' 
                          : theme === 'light'
                            ? 'border-[#e5e7eb] bg-[#ffffff] shadow-sm hover:border-gray-300'
                            : 'border-white/5 bg-white/[0.01] hover:border-white/15'
                        }`}
                    >
                      <button
                        onClick={() => toggleExpand(faq.id)}
                        className="w-full text-left p-5 md:p-6 flex items-center justify-between gap-4 focus:outline-none"
                      >
                        <h3 className={`font-sans font-bold text-[15px] sm:text-[18px] tracking-tight transition-colors duration-300
                          ${isExpanded ? 'text-brand-accent' : theme === 'light' ? 'text-[#1f2937]' : 'text-white'}`}
                        >
                          {faq.question}
                        </h3>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className={`flex-shrink-0 border p-1 rounded-full 
                            ${isExpanded 
                              ? 'border-brand-accent/30 text-brand-accent bg-brand-accent/5' 
                              : theme === 'light'
                                ? 'border-[#e5e7eb] text-gray-400 bg-[#f9fafb]'
                                : 'border-white/10 text-white/50'}`}
                        >
                          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                        </motion.div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <div className={`px-5 pb-6 md:px-6 md:pb-8 pt-0 text-sm sm:text-base border-t ${theme === 'light' ? 'border-[#e5e7eb]/80 text-[#374151]' : 'border-white/[0.03]'}`}>
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })
              ) : (
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`flex flex-col items-center justify-center py-12 text-center font-sans border border-dashed rounded-xl
                    ${theme === 'light'
                      ? 'text-gray-400 border-[#e5e7eb] bg-[#f9fafb]'
                      : 'text-white/40 border-white/10 bg-white/[0.005]'
                    }`}
                >
                  <Search className="w-8 h-8 mb-3 opacity-30" />
                  <p className="text-sm font-semibold">No questions found</p>
                  <p className={`text-xs mt-1 ${theme === 'light' ? 'text-gray-400/80' : 'text-white/30'}`}>Try matching another keyword or selecting a different category</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
