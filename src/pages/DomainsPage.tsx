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
} from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import { useCMS } from '../context/CMSContext';

// --- 3D Model Renderer (no particle background) ---

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
        <div className="w-full h-full bg-[#161a22] text-[#c41515]/90 p-4 rounded-3xl flex flex-col items-center justify-center text-center border border-white/5 shadow-xl backdrop-blur-md">
          <span className="font-righteous text-lg mb-1 tracking-wider">3D ENGINE OFFLINE</span>
          <p className="text-[10px] font-mono opacity-60">{this.state.error?.message || 'Render failure'}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

function UGVModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return (
    <Canvas camera={{ position: [0, 0, 7.5], fov: 45 }} className="w-full h-full">
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={1.8} />
      <Environment preset="city" />
      <primitive object={scene} scale={2.2} position={[0.2, 0.4, 0]} rotation={[0.3, 0.6, 0.1]} />
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



// --- Dust Particles Animation ---
function DustParticles() {
  const [particles, setParticles] = useState<{ id: number; left: number; size: number; delay: number; duration: number; xOffset: number; maxOpacity: number }[]>([]);
  useEffect(() => {
    const newParticles = Array.from({ length: 80 }).map((_, i) => {
      const duration = Math.random() * 20 + 15;
      return {
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 4 + 1.5,
        delay: Math.random() * duration,
        duration: duration,
        xOffset: (Math.random() - 0.5) * 15,
        maxOpacity: Math.random() * 0.4 + 0.2,
      };
    });
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none mix-blend-screen">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-[#FF4500]"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            bottom: '-5%',
            opacity: 0,
            animation: `dust-float ${p.duration}s linear infinite`,
            animationDelay: `-${p.delay}s`,
            WebkitAnimationDelay: `-${p.delay}s`,
            '--x-offset': `${p.xOffset}vw`,
            '--max-opacity': p.maxOpacity,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

// --- Parallax Stacking Section ---

interface StackingSectionProps {
  domain: SectionData;
  index: number;
  total: number;
  sectionRef: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
}

function StackingSection({ index, total, sectionRef, children }: StackingSectionProps) {
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const isLast = index === total - 1;
  const scale = useTransform(scrollYProgress, [0, 1], isLast ? [1, 1] : [1, 0.93]);
  const opacity = useTransform(scrollYProgress, [0, 1], isLast ? [1, 1] : [1, 0.45]);
  const y = useTransform(scrollYProgress, [0, 1], isLast ? [0, 0] : [0, -50]);

  return (
    <motion.div
      ref={sectionRef}
      style={{ zIndex: index + 10, scale, opacity, y }}
      className="sticky top-0 h-screen w-full bg-brand-bg overflow-hidden border-t border-white/5 shadow-[0_-20px_60px_rgba(0,0,0,0.8)] flex flex-col justify-center origin-top"
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
        subtitle: 'Multirotor Platform',
        description: 'UAVs equipped with advanced flight controllers and thermal imaging systems to automate surveillance paths.',
        icon: ShieldAlert,
        techSpecs: ['Autonomous Flight Loops', 'Thermal Camera Feed', 'Fail-Safe RTL Mode'],
      },
      {
        title: 'Custom Flight Firmware',
        subtitle: 'Flight stabilization control',
        description: 'Design and implementation of PID loops on STM32 microprocessors, optimizing response timings and sensor fusion.',
        icon: Cpu,
        techSpecs: ['PID Loops & Tuning', 'High-RPM Coreless Drives', 'Telemetry Linkage'],
      },
      {
        title: 'IDRL Competitive Quadcopters',
        subtitle: 'FPV High-Speed Racing',
        description: 'Highly maneuverable carbon fiber multirotors built for national speed-trial leagues.',
        icon: Compass,
        techSpecs: ['Carbon Fiber Chassis', '150+ km/h Max Speed', 'Analog Low-Latency FPV'],
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
    shimmerClass: 'from-[#00cc66] via-[#aaffaa] to-[#00cc66]',
    glowClass: 'shadow-[#00cc66]/30 border-[#00cc66]/25',
    stats: [
      { value: 'SLAM NAV', label: 'LiDAR Navigation' },
      { value: 'MODULAR', label: 'Payload Bays' },
      { value: 'RUGGED', label: 'Suspension & Chassis' },
    ],
    projects: [
      {
        title: 'All-Terrain Navigation',
        subtitle: 'LiDAR SLAM Mapping',
        description: 'Intelligent path planning and map building inside unknown, hazardous structures using laser sensor feeds.',
        icon: Layers,
        techSpecs: ['SLAM Point-Cloud Mapping', 'Obstacle Avoidance Logic', 'Autonomous Path Routing'],
      },
      {
        title: 'Heavy Duty Chassis',
        subtitle: 'Torsion Bar Mechanics',
        description: 'Modular ground platform with high-torque hub motor drives, designed for search and rescue operations.',
        icon: Compass,
        techSpecs: ['Torsion Bar Suspension', 'High-Torque Hub Drives', 'Hazard-Avoidance Mapping'],
      },
      {
        title: 'High-Speed PID Liners',
        subtitle: 'Micro-Robotics Engineering',
        description: 'Highly responsive miniature rovers utilizing high-resolution sensor arrays and fine-tuned PID control algorithms for track navigation.',
        icon: Cpu,
        techSpecs: ['8-Channel Sensor Arrays', 'PID Loop Tuning', 'High-RPM Coreless Motors'],
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
    shimmerClass: 'from-[#9333ea] via-[#e879f9] to-[#9333ea]',
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
      {
        title: 'Soft Robotics & Actuation',
        subtitle: 'Biomimetic compliance',
        description: 'Explorations into flexible pneumatic grippers and responsive composite shells for delicate object manipulation.',
        icon: Atom,
        techSpecs: ['Flexible Elastomer Shells', 'Pneumatic Pressure Control', 'Compliant Object Gripping'],
      },
      {
        title: 'Scientific Publications',
        subtitle: 'IEEE Academic Output',
        description: 'Authoring and presenting research papers detailing novel joint mechanisms and swarm algorithms at international conferences.',
        icon: FileText,
        techSpecs: ['IEEE / Springer Papers', 'Patent Filing Support', 'IIT Joint Collaborations'],
      },
    ],
    coverImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop',
  },
];

// --- Parallax Floating Card ---

interface ParallaxCardProps {
  proj: ProjectCard;
  index: number;
  parentScrollYProgress: any;
}

function ParallaxCard({ proj, index, parentScrollYProgress }: ParallaxCardProps) {
  const speed = index % 3 === 0 ? 1.6 : index % 3 === 1 ? 0.9 : 1.3;
  const initialOffset = index % 3 === 0 ? -50 : index % 3 === 1 ? 70 : 15;
  const y = useTransform(parentScrollYProgress, [0, 1], [initialOffset, -240 * speed + initialOffset]);
  const opacity = useTransform(parentScrollYProgress, [0, 0.18, 0.82, 1], [0.35, 1, 1, 0]);
  const scale = useTransform(parentScrollYProgress, [0, 0.15, 0.85, 1], [0.93, 1, 1, 0.94]);
  const Icon = proj.icon;

  return (
    <motion.div
      style={{ y, opacity, scale }}
      className="group bg-brand-bg border border-white/10 p-6 rounded-3xl hover:border-white/25 transition-colors duration-300 flex flex-col justify-between hover:shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
    >
      <div className="space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-white/5 text-[#c41515] border border-white/10 flex items-center justify-center shadow-lg group-hover:bg-[#c41515] group-hover:text-white group-hover:border-[#c41515] transition-all duration-300">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[10px] font-mono font-bold tracking-wider text-brand-muted uppercase">{proj.subtitle}</span>
          <h4 className="font-righteous text-lg text-white mt-1 group-hover:text-[#c41515] transition-colors duration-300">{proj.title}</h4>
        </div>
        <p className="text-brand-muted text-xs leading-relaxed font-sans font-medium">{proj.description}</p>
      </div>
      <div className="mt-6 pt-4 border-t border-white/5 space-y-2">
        {proj.techSpecs.map((spec, sIdx) => (
          <div key={sIdx} className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-[#c41515]" />
            <span className="font-mono text-[10px] text-brand-muted leading-tight font-medium">{spec}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// --- Project Portfolio Section ---

function ProjectPortfolioSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });

  return (
    <section ref={containerRef} data-cursor-hidden="false" className="relative py-36 bg-brand-bg border-t border-white/5 z-20 overflow-hidden animate-opacity">
      <div className="max-w-6xl mx-auto px-6 relative min-h-[900px]">
        <div className="mb-20 text-center md:text-left relative z-30 pointer-events-none">
          <span className="font-mono text-xs uppercase tracking-widest text-[#c41515] font-bold drop-shadow-md">PROJECT PORTFOLIO</span>
          <h3 className="font-righteous text-4xl md:text-5xl text-white tracking-tight mt-2 uppercase bg-gradient-to-r from-white via-[#d1d5db] to-white bg-clip-text text-transparent animate-text-shimmer drop-shadow-lg">
            Updated Technical Cards
          </h3>
          <p className="text-brand-muted text-sm max-w-lg mt-2 drop-shadow-md font-medium">
            Select key initiatives mapping directly to the UAV, UGV, and Research Divisions.
          </p>
        </div>
        <div className="pt-24 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {sections.flatMap((sec) => sec.projects).map((proj, idx) => (
            <ParallaxCard key={idx} proj={proj} index={idx} parentScrollYProgress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Main Page Component ---

export function DomainsPage() {
  const { domainsConfig, heroLayout } = useCMS();

  const localLayout = heroLayout;

  const [activeSection, setActiveSection] = useState('uav');
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({ 
    target: containerRef, 
    offset: ["start start", "end start"] 
  });

  const heroScrollY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const parallaxY = {
    ourText: useTransform(heroScrollY, [0, 1], [0, -1200]),
    rksText: useTransform(heroScrollY, [0, 1], [0, -1200]),
    centerWO: useTransform(heroScrollY, [0, 1], [0, -1200]),
    statementBox: useTransform(heroScrollY, [0, 1], [0, -800]),
    categoriesBlock: useTransform(heroScrollY, [0, 1], [0, -800]),
    phase1: useTransform(heroScrollY, [0, 1], [0, -1200]),
    phase2: useTransform(heroScrollY, [0, 1], [0, -1200]),
    phase3: useTransform(heroScrollY, [0, 1], [0, -1200]),
    phase4: useTransform(heroScrollY, [0, 1], [0, -1200]),
  };

  // Phase 1 scroll-linked parallax animations (used globally for all phases)
  const phase1ScaleY = useTransform(heroScrollY, [0.0, 0.025, 0.05, 0.1], [1.0, 0.6, 0.2, 0.2]);
  const orangeScaleY = useTransform(heroScrollY, [0.0, 0.015, 0.03, 0.05], [1.0, 0.5, 0.1, 0.1]);
  const phase1TextOpacity = useTransform(heroScrollY, [0.0, 0.025, 0.05, 0.1], [1.0, 0.5, 0.1, 0.1]);
  const phase1TextY = useTransform(heroScrollY, [0.0, 0.025, 0.05, 0.1], [0, -7.5, -15, -15]);
  const phase1TopGhostY = useTransform(heroScrollY, [0.0, 0.025, 0.05, 0.1], [0, -15.5, -15, -15]);
  const phase1BottomGhostY = useTransform(heroScrollY, [0.0, 0.025, 0.05, 0.1], [0, 0.5, -15, -15]);

  // Scroll-linked synchronized horizontal hide transforms for brandText
  const brandTextX0 = useTransform(heroScrollY, [0.0, 0.03], [0, -80]);
  const brandTextOpacity0 = useTransform(heroScrollY, [0.0, 0.03], [1, 0]);
  const brandTextX1 = useTransform(heroScrollY, [0.0, 0.03], [0, -80]);
  const brandTextOpacity1 = useTransform(heroScrollY, [0.0, 0.03], [1, 0]);

  // Scroll-linked staggered horizontal hide transforms for categoriesBlock lines
  const catX0 = useTransform(heroScrollY, [0.0, 0.025], [0, -120]);
  const catOpacity0 = useTransform(heroScrollY, [0.0, 0.025], [1, 0]);
  const catX1 = useTransform(heroScrollY, [0.008, 0.033], [0, -120]);
  const catOpacity1 = useTransform(heroScrollY, [0.008, 0.033], [1, 0]);
  const catX2 = useTransform(heroScrollY, [0.016, 0.041], [0, -120]);
  const catOpacity2 = useTransform(heroScrollY, [0.016, 0.041], [1, 0]);
  const catX3 = useTransform(heroScrollY, [0.024, 0.049], [0, -120]);
  const catOpacity3 = useTransform(heroScrollY, [0.024, 0.049], [1, 0]);
  const catX4 = useTransform(heroScrollY, [0.032, 0.057], [0, -120]);
  const catOpacity4 = useTransform(heroScrollY, [0.032, 0.057], [1, 0]);

  const sectionRefs = {
    uav: useRef<HTMLDivElement>(null),
    ugv: useRef<HTMLDivElement>(null),
    research: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;
      for (const [id, ref] of Object.entries(sectionRefs)) {
        if (ref.current) {
          const offsetTop = ref.current.offsetTop;
          const offsetHeight = ref.current.offsetHeight;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const targetRef = sectionRefs[id as keyof typeof sectionRefs];
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  };

  return (
    <div ref={containerRef} className="force-dark min-h-screen bg-[#000000] text-white font-montserrat relative select-none">



      {/* 1. Hero Block (Framer Design) */}
      <section className="relative h-screen w-full overflow-hidden bg-[#000000] select-none">
        {/* Grainy Noise Overlay */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.25] mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
        />

        {/* Dust Mist Animation */}
        <DustParticles />



        {/* Large Typography Background */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          {/* Top Left OUR */}
          <motion.div style={{ y: parallaxY.ourText }} className="absolute inset-0">
            <motion.div 
              animate={{ opacity: 1, x: localLayout.ourText?.x || 0, y: localLayout.ourText?.y || 0, scale: localLayout.ourText?.scale || 1 }}
              transition={{ duration: 0.8 }}
              className="absolute top-[15%] left-[5%] text-[24vw] leading-[0.8] font-clash font-bold text-[#FF4500] opacity-100 tracking-tighter whitespace-pre uppercase"
            >
              {localLayout.ourText?.text || 'OUR'}
            </motion.div>
          </motion.div>
          
          {/* Bottom Right RKS */}
          <motion.div style={{ y: parallaxY.rksText }} className="absolute inset-0">
            <motion.div 
              animate={{ opacity: 1, x: localLayout.rksText?.x || 0, y: localLayout.rksText?.y || 0, scale: localLayout.rksText?.scale || 1 }}
              transition={{ duration: 0.8 }}
              className="absolute bottom-[5%] right-[5%] text-[24vw] leading-[0.8] font-clash font-bold text-[#FF4500] opacity-100 tracking-tighter whitespace-pre uppercase"
            >
              {localLayout.rksText?.text || 'RKS'}
            </motion.div>
          </motion.div>

          {/* Center WO Shadow */}
          <motion.div style={{ y: parallaxY.centerWO }} className="absolute inset-0">
            <motion.div 
              animate={{ opacity: 1, x: localLayout.centerWOShadow?.x || 0, y: localLayout.centerWOShadow?.y || 0, scale: localLayout.centerWOShadow?.scale || 1 }}
              transition={{ duration: 0.8 }}
              className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 mt-[2vw] ml-[2vw] text-[26vw] leading-none font-clash font-bold text-[#FF4500] tracking-tighter whitespace-pre uppercase"
            >
              {localLayout.centerWOShadow?.text || 'WO'}
            </motion.div>
          </motion.div>

          {/* Center WO */}
          <motion.div style={{ y: parallaxY.centerWO }} className="absolute inset-0">
            <motion.div 
              animate={{ opacity: 1, x: localLayout.centerWO?.x || 0, y: localLayout.centerWO?.y || 0, scale: localLayout.centerWO?.scale || 1 }}
              transition={{ duration: 0.8 }}
              className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 text-[26vw] leading-none font-clash font-bold text-white tracking-tighter whitespace-pre uppercase drop-shadow-2xl"
            >
              {localLayout.centerWO?.text || 'WO'}
            </motion.div>
          </motion.div>
        </div>

        {/* Statement Box */}
        <motion.div style={{ y: parallaxY.statementBox }} className="absolute inset-0 z-20 pointer-events-none">
          <motion.div 
            animate={{ opacity: 1, x: localLayout.statementBox?.x || 0, y: localLayout.statementBox?.y || 0, scale: localLayout.statementBox?.scale || 1 }}
            transition={{ duration: 0.8 }}
            className="absolute top-[15%] right-[5%] flex flex-col items-start text-left max-w-[700px] overflow-hidden"
          >
            <motion.div style={{ y: useTransform(heroScrollY, [0, 1], [0, -400]) }}>
              <p className="font-clash font-bold text-[2.5rem] md:text-[3.5rem] tracking-tighter opacity-100 uppercase m-0 leading-[1.15] text-white [text-shadow:3px_3px_0px_#FF4500] whitespace-nowrap">{localLayout.statementBox?.line1}</p>
              <p className="font-clash font-bold text-[2.5rem] md:text-[3.5rem] tracking-tighter opacity-100 uppercase m-0 leading-[1.15] text-white mt-2.5 whitespace-nowrap">{localLayout.statementBox?.line2}</p>
              <p className="font-clash font-bold text-[2.5rem] md:text-[3.5rem] tracking-tighter opacity-100 uppercase m-0 leading-[1.15] text-white mt-2.5 whitespace-nowrap">{localLayout.statementBox?.line3}</p>
              
              <div className="flex items-stretch justify-start gap-3 mt-4 ml-1 relative">
                <motion.div 
                  style={{ 
                    scaleY: orangeScaleY,
                    opacity: useTransform(orangeScaleY, [0.1, 1.0], [0.25, 1.0]),
                    transformOrigin: 'top',
                    y: useTransform(heroScrollY, [0, 1], [0, -180])
                  }}
                  className="w-2 bg-[#FF4500] shrink-0 self-stretch" 
                />
                <div className="flex flex-col">
                  {localLayout.statementBox?.brandText?.split('\n').map((line, idx) => {
                    const x = idx === 0 ? brandTextX0 : brandTextX1;
                    const opacity = idx === 0 ? brandTextOpacity0 : brandTextOpacity1;
                    const textColor = idx === 0 ? 'text-[#FF4500]' : 'text-white';
                    return (
                      <div key={idx} className="overflow-hidden">
                        <motion.p
                          style={{ x, opacity }}
                          className={`font-clash font-bold text-xl md:text-2xl tracking-tight leading-none uppercase m-0 py-0.5 ${textColor}`}
                        >
                          {line}
                        </motion.p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Categories Block */}
        <motion.div style={{ y: parallaxY.categoriesBlock }} className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
          <motion.div 
            animate={{ opacity: 1, x: localLayout.categoriesBlock?.x || 0, y: localLayout.categoriesBlock?.y || 0, scale: localLayout.categoriesBlock?.scale || 1 }}
            transition={{ duration: 0.8 }}
            className="absolute bottom-[10%] left-[10%] flex items-stretch overflow-hidden"
          >
            {/* Both line and text share the faster parallax to sync the masking */}
            <motion.div 
              style={{ y: useTransform(heroScrollY, [0, 1], [0, -400]) }} 
              className="flex items-stretch"
            >
              <div className="w-2 bg-white/30 mr-4 shrink-0" />
              <div className="flex flex-col justify-between py-1">
                {localLayout.categoriesBlock?.text?.split('\n').map((cat, i) => {
                  let x = catX0;
                  let opacity = catOpacity0;
                  if (i === 1) { x = catX1; opacity = catOpacity1; }
                  else if (i === 2) { x = catX2; opacity = catOpacity2; }
                  else if (i === 3) { x = catX3; opacity = catOpacity3; }
                  else if (i === 4) { x = catX4; opacity = catOpacity4; }

                  return (
                    <div key={i} className="overflow-hidden">
                      <motion.p 
                        style={{ x, opacity }}
                        className="font-clash text-lg md:text-2xl font-bold tracking-tight uppercase text-white m-0 leading-none mb-2 last:mb-0"
                      >
                        {cat}
                      </motion.p>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Timeline Phases */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {[
            { id: 'phase1', num: '001', defaultLabel: 'PHASE/BREAK', left: '10%', top: '45%' },
            { id: 'phase2', num: '002', defaultLabel: 'PHASE/THINK', left: '25%', top: '45%' },
            { id: 'phase3', num: '003', defaultLabel: 'PHASE/BUILD', left: '70%', top: '45%' },
            { id: 'phase4', num: '004', defaultLabel: 'PHASE/RELEASE', left: '85%', top: '45%' }
          ].map(({ id, num, defaultLabel, left, top }) => {
            const phaseKey = id as 'phase1' | 'phase2' | 'phase3' | 'phase4';
            const layout = localLayout[phaseKey] || { x: 0, y: 0, scale: 1, text: defaultLabel };

            // Choose the correct MotionValues for each phase (all phases behave exactly like Phase 1)
            const scaleY = phase1ScaleY;
            const textOpacity = phase1TextOpacity;
            const textY = phase1TextY;
            const topGhostY = phase1TopGhostY;
            const bottomGhostY = phase1BottomGhostY;

            return (
              <motion.div key={id} style={{ y: parallaxY[phaseKey] }} className="absolute inset-0">
                <motion.div
                  animate={{ opacity: 1, x: layout.x, y: layout.y, scale: layout.scale }}
                  transition={{ duration: 0.8 }}
                  style={{ left, top }}
                  className="absolute flex flex-col items-start pointer-events-auto"
                >
                  <span className="font-clash font-bold text-xl opacity-100 uppercase text-white mb-2 ml-1">{num}</span>
                  <motion.div 
                    style={{ scaleY: scaleY, opacity: useTransform(scaleY, [0.2, 1.0], [0.25, 1.0]), transformOrigin: 'top' }} 
                    className="w-[1px] h-[100px] bg-white ml-3" 
                  />
                  <div className="relative mt-2 h-5 w-full pointer-events-none">
                    {/* Top Ghost */}
                    <motion.span
                      style={{ y: topGhostY, opacity: useTransform(textOpacity, o => o * 0.25) }}
                      className="absolute left-0 top-0 font-clash text-[10px] md:text-[12px] font-bold tracking-widest whitespace-nowrap uppercase text-[#7F0303]"
                    >
                      {layout.text || defaultLabel}
                    </motion.span>
                    
                    {/* Main Text */}
                    <motion.span
                      style={{ y: textY, opacity: textOpacity }}
                      className="absolute left-0 top-0 font-clash text-[10px] md:text-[12px] font-bold tracking-widest whitespace-nowrap uppercase text-white"
                    >
                      {layout.text || defaultLabel}
                    </motion.span>

                    {/* Bottom Ghost */}
                    <motion.span
                      style={{ y: bottomGhostY, opacity: useTransform(textOpacity, o => o * 0.25) }}
                      className="absolute left-0 top-0 font-clash text-[10px] md:text-[12px] font-bold tracking-widest whitespace-nowrap uppercase text-[#7F0303]"
                    >
                      {layout.text || defaultLabel}
                    </motion.span>
                  </div>
                  <div className="flex items-center gap-1 mt-1 ml-1">
                    <div className="w-1.5 h-1.5 bg-[#FF4500] animate-blink" />
                    <div className="w-[3px] h-1.5 bg-white/25" />
                    <div className="w-[3px] h-1.5 bg-white/25" />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Marquee Ticker */}
        <div className="absolute bottom-[4%] left-0 w-full z-20 overflow-hidden opacity-70 flex">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
            className="flex whitespace-nowrap"
          >
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex">
                <span className="font-montserrat text-xs font-semibold tracking-[0.2em] uppercase px-4 flex items-center">
                  PUSHING THE BOUNDARIES <span className="mx-4 text-[#FD3C00]">·</span> 
                  CUSTOM SOLUTIONS <span className="mx-4 text-[#FD3C00]">·</span> 
                  COLLABORATIVE TEAM <span className="mx-4 text-[#FD3C00]">·</span> 
                  CORE TECHNICAL DIVISION <span className="mx-4 text-[#FD3C00]">·</span> 
                  INFINITE POSSIBILITIES
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 2. Stacking Sections */}
      <div className="relative bg-brand-bg cursor-none">
        {sections.map((domain, index) => {
          const sectionRef = sectionRefs[domain.id as keyof typeof sectionRefs];
          const cfg = domainsConfig[domain.id as keyof typeof domainsConfig];

          return (
            <StackingSection key={domain.id} domain={domain} index={index} total={sections.length} sectionRef={sectionRef}>

              {/* Static watermark background text */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden select-none">
                <div className="relative w-full h-full flex items-center justify-center">
                  <h2
                    style={{
                      transform: `translate(${cfg?.part1X ?? 0}px, ${cfg?.part1Y ?? 0}px)`,
                      opacity: cfg?.opacity ?? 0.10,
                    }}
                    className="absolute font-righteous text-[11vw] leading-none tracking-tighter uppercase whitespace-nowrap text-white select-none"
                  >
                    {domain.watermark.split(' ')[0]}
                  </h2>
                  <h2
                    style={{
                      transform: `translate(${cfg?.part2X ?? 0}px, ${cfg?.part2Y ?? 0}px)`,
                      opacity: cfg?.opacity ?? 0.10,
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
                <div className="lg:col-span-6 space-y-6 text-left">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-white/40">0{index + 1} // SECTION</span>
                    <span className="font-mono text-xs uppercase tracking-widest font-bold" style={{ color: domain.accent }}>
                      {domain.id}
                    </span>
                  </div>

                  <h3 className={`font-righteous text-4xl md:text-5xl lg:text-6xl tracking-tight leading-none uppercase bg-gradient-to-r ${domain.shimmerClass} bg-clip-text text-transparent animate-text-shimmer`}>
                    {domain.title}
                  </h3>

                  <div className="h-10">
                    <TypewriterHeading text={domain.subTitle} className="text-brand-muted font-playfair font-bold text-lg md:text-xl" />
                  </div>

                  <SlideInText>
                    <p className="text-brand-muted text-sm md:text-base leading-relaxed max-w-lg">{domain.description}</p>
                  </SlideInText>

                  <div className="flex flex-wrap gap-4 pt-4">
                    {domain.stats.map((stat, sIdx) => (
                      <div key={sIdx} className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl flex flex-col justify-center min-w-[140px]">
                        <span className="font-righteous text-base md:text-lg tracking-wider" style={{ color: domain.accent }}>{stat.value}</span>
                        <span className="text-[9px] tracking-wide uppercase font-bold text-brand-muted">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column */}
                <div className="lg:col-span-6 flex flex-col justify-center relative">

                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative w-full h-[360px] md:h-[400px] bg-brand-bg border border-white/15 rounded-[2.5rem] p-4 flex flex-col overflow-hidden shadow-2xl hover:border-white/20 transition-colors duration-500"
                  >
                    <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] opacity-20" style={{ backgroundColor: domain.accent }} />
                    <div className="relative z-10 flex justify-between items-center p-3 border-b border-white/5">
                      <span className="font-mono text-[9px] text-brand-muted tracking-[0.2em] uppercase font-bold">Showcase Specimen V1</span>
                      <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: domain.accent }} />
                    </div>
                    <div className="flex-1 w-full relative min-h-0 flex items-center justify-center p-4">
                      {domain.modelUrl ? (
                        <div className="w-full h-full relative z-20 cursor-none">
                          <ModelErrorBoundary>
                            <Suspense fallback={
                              <div className="w-full h-full flex items-center justify-center text-brand-muted font-mono text-xs bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
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

      {/* 3. Sub-projects Showcase Grid with padding-bottom for curtain reveal */}
      <div className="pb-[320px] sm:pb-[480px]">
        <ProjectPortfolioSection />
      </div>



    </div>
  );
}
