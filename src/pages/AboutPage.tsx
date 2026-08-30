import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { HistoryCircuit } from '../components/HistoryCircuit';
import { TextReveal } from '../components/TextReveal';
import { EndeavourScene } from '../components/EndeavourScene';
import GradientWaveText from '../components/GradientWaveText';
import { LetsBeginTransition } from '../components/LetsBeginTransition';
import { FAQ } from '../components/FAQ';

export function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const fromLetsBegin = location.state?.fromLetsBegin;
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLight, setIsLight] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const headerY = useTransform(scrollYProgress, [0, 0.5], [0, -200]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const checkTheme = () => setIsLight(document.documentElement.getAttribute('data-theme') === 'light');
    checkTheme();
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          checkTheme();
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div 
      ref={containerRef} 
      className="bg-black/30 relative origin-center"
      initial={fromLetsBegin ? { x: '100vw' } : { y: 50, opacity: 0 }}
      animate={fromLetsBegin ? { x: 0 } : { y: 0, opacity: 1 }}
      transition={{ duration: fromLetsBegin ? 0.8 : 0.4, ease: fromLetsBegin ? [0.16, 1, 0.3, 1] : "easeOut" }}
    >
      
      {/* Sticky Hero */}
      <div className="h-screen sticky top-0 flex flex-col items-center justify-center overflow-hidden z-0 bg-black">

        <motion.div 
          style={{ y: headerY, opacity: headerOpacity }}
          className="text-center px-5 relative z-10 w-full cursor-pointer hover:opacity-90 transition-opacity select-none pointer-events-auto"
          onClick={() => setIsTransitioning(true)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <span className="font-mono text-brand-accent uppercase tracking-[4px] text-[14px] md:text-[16px] pl-4 sm:pl-12">Who We Are</span>
          </motion.div>
          
          <h1 className="font-sans text-[60px] md:text-[120px] lg:text-[180px] font-black uppercase tracking-[-3px] md:tracking-[-8px] leading-[0.85] text-white">
            OUR <br /> 
            <TextReveal 
              text="STORY" 
              color="#ef4444"
              hoverColor="#ef4444"
              autoPlay={true}
              className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-red-600 italic pr-4" 
            />
          </h1>
        </motion.div>
      </div>

      {/* Big Endeavour Logo */}
      <EndeavourScene />

      {/* Canva Style About Us Content */}
      <div className="relative z-35 overflow-hidden w-full">
        <motion.div 
          initial={{ x: "100%" }}
          whileInView={{ x: 0 }}
          viewport={{ once: false, margin: "0px 2000px 0px 0px", amount: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-black pt-16 md:pt-24 pb-[60px] md:pb-[100px] w-full"
        >
          
          {/* Scattered Scrapbook Background Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <motion.img 
              src="/sketch_building_1781800055729.png" 
              alt="Building Sketch"
              animate={{ y: [-20, 20, -20] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[60%] right-[-5%] w-[50vw] max-w-[500px] opacity-[0.85] mix-blend-multiply"
            />
            <motion.img 
              src="/sketch_robotics_1781800069244.png" 
              alt="Robotics Sketch"
              animate={{ y: [20, -20, 20] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-[35%] left-[-10%] w-[45vw] max-w-[450px] opacity-[0.8] mix-blend-multiply"
            />
          </div>

          <div className="relative z-10 max-w-[1024px] mx-auto px-5 md:px-[60px]">
            <div className="mb-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ type: 'spring', damping: 20, stiffness: 50 }}
                className="mb-8 text-center"
              >
                <h2 className="font-sans text-[40px] md:text-[60px] font-black uppercase tracking-[-2px] text-white leading-[1]">
                  About <span className="text-brand-accent">Us</span>
                </h2>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ type: 'spring', damping: 20, stiffness: 50 }}
              >
                <GradientWaveText
                  inView={true}
                  once={false}
                  className="text-[14px] sm:text-[16px] md:text-[18px] text-brand-muted leading-[1.8] font-sans text-justify mx-auto max-w-4xl"
                >
                  {`Endeavour is a robotics team based at Sant Longowal Institute of Engineering and Technology (SLIET), Punjab, with a legacy spanning more than a decade in robotics, innovation, and technological development. Over the years, the team has undertaken several projects and initiatives, including e-Yantra (IIT Bombay), TEQIP (Government of India & World Bank), SAE Aero Design Challenge, and projects focused on social welfare.

The team has represented SLIET at several prestigious national-level events hosted by premier institutions, including Techfest (IIT Bombay), ABU ROBOCON, Indian Drone Racing League (IIT Delhi & VIT Vellore), APOGEE (BITS Pilani), Technex (IIT BHU), Techkriti (IIT Kanpur), Advitya (IIT Ropar) and ISRO Robotics Competition, among others. Through its consistent efforts, Endeavour has earned numerous accolades and brought recognition to the institute.

Beyond competitions, Endeavour provides students with a platform to bridge the gap between theoretical knowledge and practical application, encouraging hands-on learning, innovation, teamwork, and problem-solving. Despite challenging times, the team has remained committed to continuous learning and development, upholding its legacy of excellence through dedication and perseverance.`}
                </GradientWaveText>
              </motion.div>
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ type: 'spring', damping: 20, stiffness: 50 }}
                className="mb-8 text-center"
              >
                <h2 className="font-sans text-[40px] md:text-[60px] font-black uppercase tracking-[-2px] text-white leading-[1]">
                  Our <span className="text-brand-accent">Mission</span>
                </h2>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ type: 'spring', damping: 20, stiffness: 50 }}
              >
                <GradientWaveText
                  inView={true}
                  once={false}
                  className="text-[16px] md:text-[18px] text-brand-muted leading-[1.8] font-sans text-justify mx-auto max-w-4xl"
                >
                  The team was initially started to reinforce the technical prospect of students, enabling them to become refined concocts having knowledge of diverse fields. Following the current trends, everyone is in hunt to become that polymath, who is capable of handling any work assigned. So for this, what will be better than working in the field of robotics. A field that needs no introduction where people from varied backgrounds come and work in harmony, contribute their part and learn in reciprocation. Robotics is the collective implementation of latest technologies &amp; using it for our ease that certainly requires profound technical expertise.
                </GradientWaveText>
              </motion.div>
            </div>
          </div>

          {/* Full-Width Staggered Typography Slogan - Redesigned */}
          <div className="relative py-10 md:py-16 my-10 overflow-hidden max-w-[1024px] mx-auto select-none">
            {/* Large background watermark text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
              <span 
                className="font-syncopate text-[9vw] sm:text-[70px] md:text-[100px] lg:text-[120px] font-black uppercase tracking-widest text-transparent leading-none"
                style={{ WebkitTextStroke: isLight ? '1px rgba(0, 0, 0, 0.04)' : '1px rgba(255, 255, 255, 0.035)' }}
              >
                TEAMWORK
              </span>
            </div>

            {/* Slogan Content Container */}
            <div className="relative z-10 flex flex-col items-center justify-center space-y-4 px-4">
              {/* Small indicator */}
              <div className="flex items-center gap-3 mb-2">
                <span className="h-[1px] w-8 bg-brand-accent/50" />
                <span className="font-mono text-[9px] uppercase tracking-[3px] text-brand-accent font-bold">
                  Core Belief
                </span>
                <span className="h-[1px] w-8 bg-brand-accent/50" />
              </div>

              {/* Staggered Editorial Typography */}
              <div className="font-syncopate font-black uppercase leading-[1.2] text-center w-full max-w-4xl">
                {/* Line 1 */}
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                  className={`text-[20px] sm:text-[34px] md:text-[44px] tracking-[-1px] sm:tracking-[-2px] ${isLight ? 'text-[#0b0507]' : 'text-white'}`}
                >
                  BEST TEAMWORK
                </motion.div>
                {/* Line 2 */}
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className={`text-[12px] sm:text-[20px] md:text-[26px] tracking-[2px] sm:tracking-[4px] my-1 sm:my-2 ${isLight ? 'text-black/50' : 'text-brand-muted/70'}`}
                >
                  CAN ACHIEVE
                </motion.div>
                {/* Line 3 with Neon Glow */}
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className={`text-[28px] sm:text-[48px] md:text-[64px] text-brand-accent tracking-[-2px] sm:tracking-[-3px] ${isLight ? 'drop-shadow-[0_0_12px_rgba(164,5,5,0.25)]' : 'drop-shadow-[0_0_20px_rgba(164,5,5,0.7)]'}`}
                >
                  ANYTHING
                </motion.div>
              </div>
            </div>
          </div>
          <div>
            <HistoryCircuit />
          </div>
          
          <div className="mt-20 border-t border-white/10 pt-20">
            <FAQ theme={isLight ? 'light' : 'dark'} />
          </div>
        </motion.div>
      </div>
      {isTransitioning && (
        <LetsBeginTransition onComplete={() => setIsTransitioning(false)} />
      )}
    </motion.div>
  );
}
