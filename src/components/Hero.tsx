import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Circle } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { RevealText } from './RevealText';
import { MagneticText } from './MagneticText';
import { LetsBeginTransition } from './LetsBeginTransition';

function ElegantShape({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = "from-brand-accent/[0.4]",
}: {
    className?: string;
    delay?: number;
    width?: number;
    height?: number;
    rotate?: number;
    gradient?: string;
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -1200,
                rotate: rotate - 15,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: rotate,
            }}
            transition={{
                duration: 2.4,
                delay,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className={`absolute ${className || ''}`}
        >
            <motion.div
                animate={{
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
                style={{
                    width,
                    height,
                }}
                className="relative"
            >
                <div
                    className={`absolute inset-0 rounded-full bg-gradient-to-r to-transparent ${gradient} backdrop-blur-[4px] border-2 border-brand-accent/[0.7] shadow-[0_8px_32px_0_rgba(164,5,5,0.65)] after:absolute after:inset-0 after:rounded-full after:bg-[radial-gradient(circle_at_50%_50%,rgba(164,5,5,0.8),transparent_70%)]`}
                />
            </motion.div>
        </motion.div>
    );
}

export function Hero() {
  const { scrollY } = useScroll();
  const smoothedScrollY = useSpring(scrollY, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const y1 = useTransform(smoothedScrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(smoothedScrollY, [0, 400], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const textVariants = {
    hidden: { y: '120%', opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', damping: 20, stiffness: 100 },
    },
  };

  const fadeUpVariants = {
      hidden: { opacity: 0, y: 30 },
      visible: (i: number) => ({
          opacity: 1,
          y: 0,
          transition: {
              duration: 1,
              delay: 0.5 + i * 0.2,
              ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
          },
      }),
  };

  return (
    <section className="relative h-[410px] sm:h-auto sm:min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-brand-bg group">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/[0.05] via-transparent to-[#ff4b4b]/[0.05] blur-3xl z-0" />

      <div className="absolute inset-0 overflow-hidden z-0">
          <ElegantShape
              delay={0.3}
              width={isMobile ? 180 : 600}
              height={isMobile ? 40 : 140}
              rotate={12}
              gradient="from-brand-accent/[0.7]"
              className="left-[-12%] sm:left-[-10%] md:left-[-5%] top-[18%] sm:top-[15%] md:top-[20%]"
          />

          <ElegantShape
              delay={0.5}
              width={isMobile ? 160 : 500}
              height={isMobile ? 36 : 120}
              rotate={-15}
              gradient="from-[#ff4b4b]/[0.7]"
              className="right-[-8%] sm:right-[-5%] md:right-[0%] top-[72%] sm:top-[70%] md:top-[75%]"
          />

          <ElegantShape
              delay={0.4}
              width={isMobile ? 100 : 300}
              height={isMobile ? 26 : 80}
              rotate={-8}
              gradient="from-brand-accent/[0.7]"
              className="left-[0%] sm:left-[5%] md:left-[10%] bottom-[8%] sm:bottom-[5%] md:bottom-[10%]"
          />

          <ElegantShape
              delay={0.6}
              width={isMobile ? 80 : 200}
              height={isMobile ? 22 : 60}
              rotate={20}
              gradient="from-[#ff4b4b]/[0.7]"
              className="right-[6%] sm:right-[15%] md:right-[20%] top-[15%] sm:top-[10%] md:top-[15%]"
          />

          <ElegantShape
              delay={0.7}
              width={isMobile ? 60 : 150}
              height={isMobile ? 16 : 40}
              rotate={-25}
              gradient="from-brand-accent/[0.7]"
              className="left-[8%] sm:left-[20%] md:left-[25%] top-[12%] sm:top-[5%] md:top-[10%]"
          />
      </div>

      <div className="absolute inset-0 z-0 opacity-[0.03] border-l border-white pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,var(--color-white)_1px,transparent_0)] bg-[size:40px_40px]"></div>
      </div>

      <motion.div
        className="relative z-10 w-full max-w-[1024px] px-5 md:px-[60px] mx-auto flex items-center justify-center gap-6 md:gap-10 mt-10 sm:mt-20"
        style={{ y: y1, opacity }}
      >
        <div className="w-full flex flex-col items-center text-center">
          <motion.div
              custom={0}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center select-none"
          >
              <div className="flex items-center gap-3 sm:gap-6 md:gap-8 mb-2 sm:mb-4 md:mb-5">
                  <img 
                    src="/refined_logo_transparent.png" 
                    className="h-18 w-18 sm:h-36 sm:w-36 md:h-48 md:w-48 object-contain drop-shadow-[0_0_15px_rgba(200,16,46,0.35)] hover:scale-105 transition-transform duration-300 pointer-events-auto"
                    alt="Endeavour Logo"
                  />
                  <img 
                    src="/sliet_logo_red.png" 
                    className="h-14 w-14 sm:h-28 sm:w-28 md:h-36 md:w-36 object-contain drop-shadow-[0_0_15px_rgba(200,16,46,0.35)] hover:scale-105 transition-transform duration-300 pointer-events-auto"
                    alt="SLIET Logo"
                  />
              </div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 sm:px-4 sm:py-1.5 rounded-full bg-brand-accent/5 border border-brand-accent/20 mb-2 sm:mb-5 md:mb-10">
                  <Circle className="h-1 w-1 sm:h-1.5 sm:w-1.5 md:h-2 md:w-2 fill-brand-accent/80 text-brand-accent" />
                  <span className="text-[8px] sm:text-[10px] md:text-[12px] text-brand-accent font-semibold tracking-[1.2px] sm:tracking-[2px] uppercase">
                      EST. 2014 — SLIET LONGOWAL
                  </span>
              </div>
          </motion.div>

          <motion.div
            className="font-display leading-[1.05] font-bold tracking-tighter text-white relative whitespace-normal flex justify-center w-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <MagneticText
              hoverText="ENDEAVOUR"
              bubbleSize={280}
              hoverTextClassName="text-[36px] min-[390px]:text-[40px] sm:text-[70px] lg:text-[100px] tracking-[0.12em] sm:tracking-[0.15em] font-bebas font-bold"
              baseContent={
                <RevealText 
                  text="STRIVE TO CREATE DIFFERENCE" 
                  className="justify-center uppercase text-[32px] min-[390px]:text-[36px] sm:text-[56px] lg:text-[80px] font-bebas tracking-[1px] sm:tracking-[2px] font-bold"
                  accentWords={["DIFFERENCE"]} 
                  showImages={false}
                  letterDelay={0.05}
                  overlayDelay={0.03}
                  overlayDuration={0.5}
                  disableRiseAnimation={true}
                />
              }
            />
          </motion.div>

          <motion.div
              custom={2}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
          >
            <p className="text-[10px] sm:text-[16px] md:text-[20px] text-white/95 leading-[1.4] sm:leading-[1.6] max-w-[320px] sm:max-w-[580px] mt-2 sm:mt-4 md:mt-8 font-sans font-bold">
              The premier robotics and innovation body of Sant Longowal Institute of Engineering and Technology. Engineering excellence through collaborative research and competitive building.
            </p>
          </motion.div>

        </div>
      </motion.div>
      
      {/* Base gradient layer to map fade into below content */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-brand-bg/80 pointer-events-none z-0" />

      {isTransitioning && (
        <LetsBeginTransition onComplete={() => navigate('/about', { state: { fromLetsBegin: true } })} />
      )}
    </section>
  );
}
