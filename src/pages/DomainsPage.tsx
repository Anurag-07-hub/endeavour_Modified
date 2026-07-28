import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import React, { useRef, useState, useEffect, Suspense } from 'react';
import {
  CheckCircle2,
  Cpu,
  Atom,
  Compass,
  FileText,
  ShieldAlert,
  Eye,
  Layers,
  ChevronRight,
  Database,
  Radio,
  Activity
} from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import { useCMS } from '../context/CMSContext';
import { FAQ } from '../components/FAQ';

// --- 3D Model Renderer ---

class ModelErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: Error | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full bg-white/5 text-red-600 p-4 rounded-3xl flex flex-col items-center justify-center text-center border border-white/10 shadow-sm">
          <span className="font-righteous text-lg mb-1 tracking-wider">3D ENGINE OFFLINE</span>
          <p className="text-[10px] font-mono opacity-60">{this.state.error?.message || 'Render failure'}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

function ModelWrapper({ scene }: { scene: any }) {
  const modelRef = useRef<any>(null);
  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });
  return <primitive ref={modelRef} object={scene} scale={2.2} position={[0.2, 0.4, 0]} rotation={[0.3, 0.6, 0.1]} />;
}

function UGVModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return (
    <Canvas camera={{ position: [0, 0, 7.5], fov: 45 }} className="w-full h-full">
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={1.8} />
      <Environment preset="city" />
      <ModelWrapper scene={scene} />
    </Canvas>
  );
}

// --- Typewriter Heading ---

function TypewriterHeading({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span className={`inline-block ${className}`}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.05, delay: index * 0.03 }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

// --- Sliding Text Block ---

function SlideInText({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ y: 25, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// --- Parallax Stacking Section ---

interface StackingSectionProps {
  domain: SectionData;
  index: number;
  total: number;
  sectionRef: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
  isMobile?: boolean;
}

function StackingSection({ index, total, sectionRef, children, isMobile = false }: StackingSectionProps) {
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const smoothedProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const isLast = index === total - 1;
  const scale = useTransform(smoothedProgress, [0, 1], isMobile || isLast ? [1, 1] : [1, 0.93]);
  const opacity = useTransform(smoothedProgress, [0, 1], isMobile || isLast ? [1, 1] : [1, 0.45]);
  const y = useTransform(smoothedProgress, [0, 1], isMobile || isLast ? [0, 0] : [0, -50]);

  return (
    <motion.div
      ref={sectionRef}
      style={{ zIndex: index + 10, scale, opacity, y }}
      className={`w-full bg-brand-bg border-t border-white/5 flex flex-col justify-center origin-top
        ${isMobile ? 'relative h-auto py-16' : 'sticky top-0 h-screen overflow-hidden shadow-[0_-20px_60px_rgba(0,0,0,0.015)]'}
      `}
    >
      {children}
    </motion.div>
  );
}

// --- Data Types ---

interface ProjectCard {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ComponentType<any>;
  techSpecs: string[];
}

interface SectionData {
  id: string;
  title: string;
  subTitle: string;
  watermark: string;
  description: string;
  accent: string;
  shimmerClass: string;
  glowClass: string;
  stats: { value: string; label: string }[];
  projects: ProjectCard[];
  modelUrl?: string;
  coverImage?: string;
}

const sections: SectionData[] = [
  {
    id: 'uav',
    title: 'Unmanned Aerial Vehicles',
    subTitle: 'Autonomous Aerial Systems',
    watermark: 'ENDEAVOUR UAV',
    description:
      'We design and fabricate state-of-the-art Unmanned Aerial Vehicles capable of autonomous flight, advanced payload delivery, and precision surveillance. Our drones feature custom flight controllers, computer vision obstacle detection, and high-endurance flight structures.',
    accent: '#c41515',
    shimmerClass: 'from-[#c41515] via-[#ff6b6b] to-[#c41515]',
    glowClass: 'shadow-[#c41515]/30 border-[#c41515]/25',
    stats: [
      { value: '30+ MIN', label: 'Flight Endurance' },
      { value: 'LIDAR', label: 'Obstacle Detection' },
      { value: 'SWARM', label: 'Collaborative Flight' },
    ],
    projects: [
      {
        title: 'Autonomous Aerial Systems',
        subtitle: 'Model V10 Quad',
        description: 'UAVs equipped with thermal imagery mapping systems to automate rescue tasks.',
        icon: ShieldAlert,
        techSpecs: ['Autonomous Flight Loops', 'Thermal Camera Feed', 'Fail-Safe RTL Mode'],
      },
    ],
    coverImage: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'ugv',
    title: 'Unmanned Ground Vehicles',
    subTitle: 'All-Terrain Robotics',
    watermark: 'ENDEAVOUR UGV',
    description:
      'Our Unmanned Ground Vehicles are built to conquer any terrain. Featuring robust suspension systems, LiDAR-based SLAM navigation, and modular manipulator arms, they are designed for exploration, search and rescue, and hazardous environment mapping.',
    accent: '#00cc66',
    shimmerClass: 'from-[#00cc66] via-[#22c55e] to-[#00cc66]',
    glowClass: 'shadow-[#00cc66]/30 border-[#00cc66]/25',
    stats: [
      { value: 'SLAM NAV', label: 'LiDAR Navigation' },
      { value: 'MODULAR', label: 'Payload Bays' },
      { value: 'RUGGED', label: 'Suspension & Chassis' },
    ],
    projects: [
      {
        title: 'All-Terrain Navigation',
        subtitle: 'SLAM Point-Cloud Mapping',
        description: 'Intelligent path planning and map building inside unknown, hazardous structures using laser sensor feeds.',
        icon: Layers,
        techSpecs: ['SLAM Point-Cloud Mapping', 'Obstacle Avoidance Logic', 'Autonomous Path Routing'],
      },
    ],
    modelUrl: '/ugv_model.glb',
  },
  {
    id: 'research',
    title: 'Research Projects',
    subTitle: 'Frontier Engineering',
    watermark: 'ENDEAVOUR RESEARCH',
    description:
      'At the bleeding edge of robotics, our Research division explores novel actuation mechanisms, soft robotics, and AI-driven control theory. We focus on publishing groundbreaking papers and developing prototypes that push the boundaries of current engineering.',
    accent: '#9333ea',
    shimmerClass: 'from-[#9333ea] via-[#c084fc] to-[#9333ea]',
    glowClass: 'shadow-[#9333ea]/30 border-[#9333ea]/25',
    stats: [
      { value: 'AI THEORY', label: 'Control Systems' },
      { value: 'SOFT ROBOT', label: 'Pneumatic Actuation' },
      { value: 'PUBLISHED', label: 'IEEE & Springer Output' },
    ],
    projects: [
      {
        title: 'AI-Driven Control Theory',
        subtitle: 'Intelligent Kinematics',
        description: 'Formulating state space models and kinematic path solutions for multi-jointed arms in virtual simulations.',
        icon: Eye,
        techSpecs: ['State-Space Kinematics', 'Reinforcement Learning', 'Real-Time Path Calibrations'],
      },
    ],
    coverImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop',
  },
];

// --- Main Page Component ---

export function DomainsPage() {
  const { domainsConfig, heroLayout } = useCMS();
  const localLayout = heroLayout;

  const [isMobile, setIsMobile] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const exploreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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
  
  const { scrollYProgress: exploreProgress } = useScroll({
    target: exploreRef,
    offset: ["start end", "end start"]
  });
  const smoothedExploreProgress = useSpring(exploreProgress, {
    stiffness: 45,
    damping: 25,
    restDelta: 0.001
  });

  const scannerY = useTransform(smoothedExploreProgress, [0.1, 0.9], ["0%", "100%"]);
  const blueprintScale = useTransform(smoothedExploreProgress, [0.0, 0.45], [0.9, 1.05]);
  const blueprintOpacity = useTransform(smoothedExploreProgress, [0.0, 0.2, 0.8, 1.0], [0.4, 1, 1, 0.3]);
  
  const { scrollYProgress } = useScroll({ 
    target: containerRef, 
    offset: ["start start", "end start"] 
  });

  const heroScrollY = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 25,
    restDelta: 0.001
  });

  const parallaxY = {
    statementBox: useTransform(heroScrollY, [0, 1], [0, -600]),
    blueprintCard: useTransform(heroScrollY, [0, 1], [0, -700]),
  };

  const sectionRefs = {
    uav: useRef<HTMLDivElement>(null),
    ugv: useRef<HTMLDivElement>(null),
    research: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    if (isMobile) return;
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;
      for (const [id, ref] of Object.entries(sectionRefs)) {
        if (ref.current) {
          const offsetTop = ref.current.offsetTop;
          const offsetHeight = ref.current.offsetHeight;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  return (
    <div ref={containerRef} className="min-h-screen bg-brand-bg text-white font-montserrat relative select-none">

      {/* 1. Hero Block */}
      <section 
        data-cursor-system="true"
        data-cursor-hidden="false" 
        className={`relative w-full overflow-hidden bg-brand-bg select-none z-30 flex items-center border-b border-white/5
          ${isMobile ? 'h-auto min-h-screen py-24' : 'h-screen'}
        `}
        style={{
          backgroundImage: 'linear-gradient(to right, var(--color-grid-lines) 1px, transparent 1px), linear-gradient(to bottom, var(--color-grid-lines) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      >
        {/* Grainy Noise Overlay */}
        <div 
          className="absolute inset-0 z-40 opacity-[0.03] pointer-events-none"
          style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=%22128%22 height=%22128%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.95%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22128%22 height=%22128%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
            backgroundSize: '128px 128px'
          }}
        />

        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-20">
          
          {/* Left Column: Heading */}
          <motion.div 
            style={{ y: isMobile ? 0 : parallaxY.blueprintCard }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#c41515] font-bold block">
              01 // SCIENTIFIC DIVISIONS
            </span>
            <h1 className="font-righteous text-[42px] sm:text-[72px] lg:text-[88px] font-black uppercase tracking-[-2px] sm:tracking-[-3px] leading-[0.85] text-white">
              OUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c41515] via-[#ef4444] to-[#f97316]">
                DOMAINS
              </span>
            </h1>
            <p className="text-brand-muted font-sans text-base sm:text-lg max-w-xl leading-relaxed">
              Discover the engineering pillars of Sant Longowal Institute of Engineering & Technology's official robotics team. We bridge the gap between abstract research and real-world mechanical deployment.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {['uav', 'ugv', 'research'].map((d) => (
                <div key={d} className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-brand-muted">
                  <span className="w-2 h-2 rounded-full bg-[#c41515]" />
                  {d} division
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Dynamic Diagnostic Box */}
          <motion.div 
            style={{ y: isMobile ? 0 : parallaxY.statementBox }}
            className="lg:col-span-5 bg-black border border-white/10 p-8 sm:p-10 rounded-3xl shadow-xl relative overflow-hidden text-left"
          >
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#c41515]/5 blur-[60px]" />
            <div className="flex items-center justify-between pb-6 border-b border-white/5">
              <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest font-bold">Diagnostic spec v2.1</span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="font-mono text-[9px] text-emerald-500 font-bold uppercase">Online</span>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <p className="font-clash font-bold text-2xl tracking-tight text-white uppercase">
                {localLayout.statementBox?.line1 || "BUILDING"}
              </p>
              <p className="font-clash font-bold text-2xl tracking-tight text-white uppercase leading-[0.9]">
                {localLayout.statementBox?.line2 || "INTELLIGENT SYSTEMS"}
              </p>
              <p className="font-clash font-bold text-2xl tracking-tight text-white uppercase leading-[0.9]">
                {localLayout.statementBox?.line3 || "FOR THE FUTURE"}
              </p>
            </div>

            <div className="mt-8 flex gap-4 items-stretch">
              <div className="w-1.5 bg-gradient-to-b from-[#c41515] to-[#f97316] rounded-full shrink-0" />
              <div className="space-y-1 py-0.5">
                {localLayout.statementBox?.brandText?.split('\n').map((line, idx) => (
                  <p key={idx} className="font-clash font-semibold text-sm uppercase text-brand-muted tracking-wide m-0">
                    {line}
                  </p>
                )) || (
                  <p className="font-clash font-semibold text-sm uppercase text-brand-muted tracking-wide m-0">
                    ENDEAVOUR ROBOTICS CLUB // SLIET
                  </p>
                )}
              </div>
            </div>
          </motion.div>
          
        </div>
      </section>

      {/* 2. Explore Section */}
      <section
        id="explore-section"
        ref={exploreRef}
        data-cursor-system="true"
        className="relative h-[160vh] w-full bg-brand-bg z-10 border-b border-white/5 flex flex-col justify-start"
      >
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6">
          {/* Subtle Vector Background Grid */}
          <div className="absolute inset-0 z-0 bg-[radial-gradient(var(--color-grid-lines)_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-60" />
          
          {/* Diagnostic Stats Header */}
          <div className="relative z-10 text-center max-w-2xl mb-8 sm:mb-12 pointer-events-none">
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#c41515] font-bold">LIDAR ENVIRONMENT SCANNER</span>
            <h2 className="font-righteous text-2xl sm:text-4xl text-white tracking-tight mt-2 uppercase">
              BLUEPRINT DISCOVERY PHASE
            </h2>
            <p className="text-brand-muted text-xs sm:text-sm mt-2 font-medium">
              Real-time vector structural scans of our technical architecture payload modules.
            </p>
          </div>

          {/* Scanner Blueprint Board */}
          <motion.div 
            style={{ scale: blueprintScale, opacity: blueprintOpacity }}
            className="relative z-10 w-full max-w-4xl h-[360px] sm:h-[480px] bg-black border border-white/10 rounded-[2.5rem] shadow-2xl p-5 sm:p-10 flex flex-col justify-between overflow-hidden"
          >
            {/* Blueprint Grid Lines */}
            <div className="absolute inset-0 border border-dashed border-[#c41515]/10 m-4 rounded-[2rem] pointer-events-none" />
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] border-l border-dashed border-white/5 pointer-events-none" />
            <div className="absolute top-1/2 left-0 right-0 h-[1px] border-t border-dashed border-white/5 pointer-events-none" />

            {/* Sweep Laser Scanner Line */}
            <motion.div 
              style={{ y: scannerY }}
              className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#c41515] to-transparent shadow-[0_0_15px_rgba(196,21,21,0.8)] z-20 pointer-events-none"
            />

            {/* Top Diagnostic Labels */}
            <div className="relative z-10 flex justify-between items-center font-mono text-[8px] sm:text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Activity className="w-3.5 h-3.5 text-[#c41515]" />
                <span>CHASSIS_SCAN: INITIALIZED</span>
              </div>
              <div>COORD: 30.21N // 75.70E</div>
            </div>

            {/* Central Schematic Vector Graphics */}
            <div className="flex-1 flex items-center justify-center relative my-6">
              {/* Spinning Vector Circle */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
                className="w-40 h-40 sm:w-60 sm:h-60 rounded-full border border-dashed border-[#c41515]/25 flex items-center justify-center"
              >
                <div className="w-28 h-28 sm:w-44 sm:h-44 rounded-full border border-white/5 flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-28 sm:h-28 rounded-full border border-dashed border-white/10 flex items-center justify-center">
                    <span className="w-3 h-3 rounded-full bg-[#c41515] shadow-lg shadow-[#c41515]/40" />
                  </div>
                </div>
              </motion.div>

              {/* Floating Blueprint Markers */}
              <div className="absolute top-2 left-2 sm:top-12 sm:left-28 font-mono text-[8px] sm:text-[10px] text-left text-brand-muted bg-brand-bg border border-white/10 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg shadow-sm max-w-[150px] sm:max-w-none">
                <p className="font-bold text-[#c41515]">// UAV_MOD_v10</p>
                <p className="hidden sm:block">PROPELLER COMPLIANCE: 98.4%</p>
              </div>

              <div className="absolute bottom-2 right-2 sm:bottom-8 sm:right-28 font-mono text-[8px] sm:text-[10px] text-left text-brand-muted bg-brand-bg border border-white/10 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg shadow-sm max-w-[150px] sm:max-w-none">
                <p className="font-bold text-[#00cc66]">// UGV_DRIVE_SYSTEM</p>
                <p className="hidden sm:block">HUB MOTOR CONTROLLERS: ACTIVE</p>
              </div>
            </div>

            {/* Bottom Diagnostic Labels */}
            <div className="relative z-10 flex justify-between items-end font-mono text-[8px] sm:text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              <div className="space-y-0.5 sm:space-y-1 text-left">
                <p>TELEM_LINK: STABLE [92.1 kB/s]</p>
                <p className="text-gray-300">RSSI_DBM: -45 DB</p>
              </div>
              <div className="flex gap-4">
                <span className="text-[#c41515]">SCROLL TO EXPLORE</span>
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* 3. Stacking Sections */}
      <div 
        data-cursor-hidden="false" 
        className="relative bg-brand-bg z-20 shadow-[0_-20px_60px_rgba(0,0,0,0.015)]"
      >
        {sections.map((domain, index) => {
          const sectionRef = sectionRefs[domain.id as keyof typeof sectionRefs];
          const cfg = domainsConfig[domain.id as keyof typeof domainsConfig];

          return (
            <StackingSection key={domain.id} domain={domain} index={index} total={sections.length} sectionRef={sectionRef} isMobile={isMobile}>

              {/* Static watermark background text */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden select-none">
                <div className="relative w-full h-full flex items-center justify-center">
                  <h2
                    style={{
                      transform: `translate(${cfg?.part2X ?? 0}px, ${cfg?.part2Y ?? 0}px)`,
                      opacity: cfg?.opacity ?? 0.04,
                    }}
                    className="absolute font-righteous text-[11vw] leading-none tracking-tighter uppercase whitespace-nowrap text-white select-none"
                  >
                    {domain.watermark.split(' ')[1] || ''}
                  </h2>
                </div>
              </div>

              {/* Grid content */}
              <div data-cursor-hidden="false" className="max-w-6xl mx-auto px-6 relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">

                {/* Left Column */}
                <div className="lg:col-span-6 space-y-4 sm:space-y-6 text-left">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-gray-400">0{index + 1} // SECTION</span>
                    <span className="font-mono text-xs uppercase tracking-widest font-bold" style={{ color: domain.accent }}>
                      {domain.id}
                    </span>
                  </div>

                  <h3 className={`font-righteous text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-none uppercase bg-gradient-to-r ${domain.shimmerClass} bg-clip-text text-transparent animate-text-shimmer`}>
                    {domain.title}
                  </h3>

                  <div className="h-6 sm:h-10">
                    <TypewriterHeading text={domain.subTitle} className="text-brand-muted font-playfair font-bold text-base sm:text-xl" />
                  </div>

                  <SlideInText>
                    <p className="text-brand-muted text-sm md:text-base leading-relaxed max-w-lg">{domain.description}</p>
                  </SlideInText>

                  <div className="flex flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4">
                    {domain.stats.map((stat, sIdx) => (
                      <div key={sIdx} className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl flex flex-col justify-center min-w-[125px] sm:min-w-[140px]">
                        <span className="font-righteous text-sm sm:text-lg tracking-wider" style={{ color: domain.accent }}>{stat.value}</span>
                        <span className="text-[8px] sm:text-[9px] tracking-wide uppercase font-bold text-brand-muted">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-6 flex flex-col justify-center relative mt-6 lg:mt-0">

                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full h-[280px] sm:h-[400px] bg-black border border-white/15 rounded-[2.5rem] p-4 flex flex-col overflow-hidden shadow-2xl hover:border-white/20 transition-colors duration-500"
                  >
                    <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] opacity-5" style={{ backgroundColor: domain.accent }} />
                    <div className="relative z-10 flex justify-between items-center p-3 border-b border-white/5">
                      <span className="font-mono text-[9px] text-gray-400 tracking-[0.2em] uppercase font-bold">Showcase Specimen V1</span>
                      <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: domain.accent }} />
                    </div>
                    <div className="flex-1 w-full relative min-h-0 flex items-center justify-center p-4">
                      {domain.modelUrl ? (
                        <div className="w-full h-full relative z-20">
                          <ModelErrorBoundary>
                            <Suspense fallback={
                              <div className="w-full h-full flex items-center justify-center text-brand-muted font-mono text-xs bg-white/5 rounded-2xl border border-white/10">
                                Launching Interactive WebGL...
                              </div>
                            }>
                              <UGVModel url={domain.modelUrl} />
                            </Suspense>
                          </ModelErrorBoundary>
                        </div>
                      ) : (
                        <div className="w-full h-full overflow-hidden rounded-2xl border border-white/10 relative z-20 group">
                          <img src={domain.coverImage} alt={domain.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>

              </div>
            </StackingSection>
          );
        })}
      </div>

      <div className="mt-20 border-t border-white/5 pt-20 relative z-30">
        <FAQ theme={isLight ? 'light' : 'dark'} />
      </div>

    </div>
  );
}
