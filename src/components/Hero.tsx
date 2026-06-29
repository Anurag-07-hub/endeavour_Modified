import { motion, useScroll, useTransform } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Circle } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { RevealText } from './RevealText';
import { MagneticText } from './MagneticText';
import { LetsBeginTransition } from './LetsBeginTransition';

// Glitch block reveal — plays on page entry, blocks dissolve away to reveal the hero
function GlitchReveal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const COLS = 24;
    const ROWS = 16;
    const blockW = Math.ceil(canvas.width / COLS);
    const blockH = Math.ceil(canvas.height / ROWS);
    const palette = ['#c8102e', '#1a0508', '#ffffff', '#27151b', '#e63946', '#0d0d0d'];

    const cells = Array.from({ length: COLS * ROWS }, (_, idx) => {
      const col = idx % COLS;
      const row = Math.floor(idx / COLS);
      return {
        x: col * blockW,
        y: row * blockH,
        color: palette[Math.floor(Math.random() * palette.length)],
        opacity: 1,
        // Stagger: dissolve outward from center
        dissolveAt: 100 + (col / COLS) * 300 + (row / ROWS) * 180 + Math.random() * 100,
        dissolved: false,
      };
    });

    const DONE_AT = 900;
    let startTime: number | null = null;
    let rafId: number;
    let finished = false;

    function draw(ts: number) {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;

      if (elapsed >= DONE_AT) {
        if (!finished) {
          finished = true;
          setDone(true);
        }
        return;
      }

      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      cells.forEach((cell) => {
        if (cell.dissolved) return;
        if (elapsed >= cell.dissolveAt) {
          // Flicker briefly then dissolve
          if (Math.random() < 0.3) {
            cell.color = palette[Math.floor(Math.random() * palette.length)];
          }
          cell.opacity = Math.max(0, 1 - (elapsed - cell.dissolveAt) / 180);
          if (cell.opacity <= 0) { cell.dissolved = true; return; }
        }
        ctx!.globalAlpha = cell.opacity;
        ctx!.fillStyle = cell.color;
        ctx!.fillRect(cell.x, cell.y, blockW, blockH);
        if (Math.random() < 0.06) {
          ctx!.globalAlpha = 0.8;
          ctx!.fillStyle = '#ffffff';
          ctx!.fillRect(cell.x, cell.y, blockW, 1);
        }
      });

      ctx!.globalAlpha = 1;
      rafId = requestAnimationFrame(draw);
    }

    rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
  }, []);

  if (done) return null;

  return (
    <div className="fixed inset-0 z-[9998] pointer-events-none">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ imageRendering: 'pixelated' }}
      />
    </div>
  );
}


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
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

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
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-brand-bg group">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/[0.05] via-transparent to-[#ff4b4b]/[0.05] blur-3xl z-0" />

      <div className="absolute inset-0 overflow-hidden z-0">
          <ElegantShape
              delay={0.3}
              width={600}
              height={140}
              rotate={12}
              gradient="from-brand-accent/[0.7]"
              className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
          />

          <ElegantShape
              delay={0.5}
              width={500}
              height={120}
              rotate={-15}
              gradient="from-[#ff4b4b]/[0.7]"
              className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
          />

          <ElegantShape
              delay={0.4}
              width={300}
              height={80}
              rotate={-8}
              gradient="from-brand-accent/[0.7]"
              className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
          />

          <ElegantShape
              delay={0.6}
              width={200}
              height={60}
              rotate={20}
              gradient="from-[#ff4b4b]/[0.7]"
              className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
          />

          <ElegantShape
              delay={0.7}
              width={150}
              height={40}
              rotate={-25}
              gradient="from-brand-accent/[0.7]"
              className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
          />
      </div>

      <div className="absolute inset-0 z-0 opacity-[0.03] border-l border-white pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,var(--color-white)_1px,transparent_0)] bg-[size:40px_40px]"></div>
      </div>

      <motion.div
        className="relative z-10 w-full max-w-[1024px] px-5 md:px-[60px] mx-auto flex items-center justify-center gap-10 mt-16 md:mt-20"
        style={{ y: y1, opacity }}
      >
        <div className="w-full flex flex-col items-center text-center">
          <motion.div
              custom={0}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-accent/5 border border-brand-accent/20 mb-8 md:mb-10"
          >
              <Circle className="h-2 w-2 fill-brand-accent/80 text-brand-accent" />
              <span className="text-[11px] md:text-[12px] text-brand-accent font-semibold tracking-[2px] uppercase">
                  EST. 2009 — SLIET LONGOWAL
              </span>
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
              hoverTextClassName="text-[50px] sm:text-[70px] lg:text-[100px] tracking-[0.15em] font-bebas font-bold"
              baseContent={
                <RevealText 
                  text="STRIVE TO CREATE DIFFERENCE" 
                  className="justify-center uppercase text-[40px] sm:text-[56px] lg:text-[80px] font-bebas tracking-[2px] font-bold"
                  accentWords={["DIFFERENCE"]} 
                  showImages={false}
                  letterDelay={0.05}
                  overlayDelay={0.03}
                  overlayDuration={0.5}
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
            <p className="text-[16px] md:text-[20px] text-brand-muted/80 leading-[1.6] max-w-[500px] mt-6 md:mt-8 font-sans font-medium">
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
      <GlitchReveal />
    </section>
  );
}
