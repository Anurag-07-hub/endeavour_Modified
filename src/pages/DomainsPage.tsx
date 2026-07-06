import { motion, useScroll, useTransform } from 'framer-motion';
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
  const { domainsConfig } = useCMS();

  const [activeSection, setActiveSection] = useState('uav');
  const containerRef = useRef<HTMLDivElement>(null);

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
    <div data-cursor-hidden="true" ref={containerRef} className="force-dark min-h-screen bg-brand-bg text-white font-montserrat relative select-none">



      {/* 1. Hero Block */}
      <section className="relative h-screen w-full flex flex-col justify-center items-center text-center overflow-hidden pt-20">
        <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c41515]/10 border border-[#c41515]/25 mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#c41515] animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest font-bold text-[#c41515] uppercase">LAUNCHED V1.0</span>
          </motion.div>

          <h1 className="font-righteous text-6xl md:text-8xl lg:text-[110px] bg-gradient-to-r from-[#c41515] via-[#ff6b6b] to-[#c41515] bg-clip-text text-transparent animate-text-shimmer tracking-tight leading-none uppercase">
            WORKING DOMAINS
          </h1>

          <div className="h-16 flex items-center justify-center">
            <TypewriterHeading text="Custom Solutions, Infinite Possibilities." className="text-brand-muted font-playfair font-bold text-xl md:text-3xl lg:text-4xl" />
          </div>

          <SlideInText className="max-w-xl mx-auto">
            <p className="text-brand-muted text-sm md:text-base leading-relaxed">
              Explore the core technical divisions of Team Endeavour. Pushing the boundaries of autonomous flight, ground robotics, and advanced scientific research.
            </p>
          </SlideInText>
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

      {/* 3. Sub-projects Showcase Grid */}
      <ProjectPortfolioSection />

    </div>
  );
}
