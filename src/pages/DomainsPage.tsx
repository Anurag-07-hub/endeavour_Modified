import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef, Suspense } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';

const domains = [
  {
    id: 'uav',
    bgText: 'UAVS',
    bgClass: 'bg-[#eaf3f8]',
    textAccentClass: 'text-[#d9e6ee]',
    title: 'Unmanned Aerial Vehicles',
    description: 'Engineering advanced autonomous drones and aerial systems.',
    btnText: 'Explore UAVs',
    link: 'https://www.endeavoursliet.in/pages/projects/Unmanned-Aerial-Vehicles',
    imgSrc: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=1000&auto=format&fit=crop',
    imgAlt: 'UAV Drone',
    floatOffset: 10,
    activeIndex: 0,
    detailsTitle: 'Autonomous Aerial Systems',
    detailsBody: 'We design and fabricate state-of-the-art Unmanned Aerial Vehicles capable of autonomous flight, advanced payload delivery, and precision surveillance. Our drones feature custom flight controllers, computer vision for obstacle avoidance, and high-endurance battery systems.',
    detailsStats: ['30+ Min Flight Time', 'LiDAR Equipped', 'Swarm Capable']
  },
  {
    id: 'ugv',
    bgText: 'UGVS',
    bgClass: 'bg-[#fcefe8]',
    textAccentClass: 'text-[#f0dfd5]',
    title: 'Unmanned Ground Vehicles',
    description: 'Building robust, all-terrain robotic rovers and navigation.',
    btnText: 'Explore UGVs',
    link: 'https://www.endeavoursliet.in/pages/projects/Unmanned-Ground-Vehicles',
    imgSrc: '/ugv.jpeg',
    modelUrl: '/ugv_model.glb',
    imgAlt: 'UGV Rover',
    floatOffset: 8,
    activeIndex: 1,
    detailsTitle: 'All-Terrain Robotics',
    detailsBody: 'Our Unmanned Ground Vehicles are built to conquer any terrain. Featuring robust suspension systems, LiDAR-based SLAM navigation, and modular manipulator arms, they are designed for exploration, search and rescue, and hazardous environment mapping.',
    detailsStats: ['SLAM Navigation', 'Modular Payloads', 'Rugged Chassis']
  },
  {
    id: 'res',
    bgText: 'RESEARCH',
    bgClass: 'bg-[#f4efe6]',
    textAccentClass: 'text-[#e4ddcf]',
    title: 'Research Projects',
    description: 'Pushing the envelope of novel actuation and advanced materials.',
    btnText: 'Research Dept',
    link: 'https://www.endeavoursliet.in/pages/Research',
    imgSrc: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop',
    imgAlt: 'Mechanical Joint',
    floatOffset: 12,
    activeIndex: 2,
    detailsTitle: 'Frontier Engineering',
    detailsBody: 'At the bleeding edge of robotics, our Research division explores novel actuation mechanisms, soft robotics, and AI-driven control theory. We focus on publishing groundbreaking papers and developing prototypes that push the boundaries of current engineering.',
    detailsStats: ['AI Control Theory', 'Soft Robotics', 'Published Research']
  }
];

class ModelErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full bg-red-100/90 text-red-900 p-4 rounded-xl flex flex-col items-center justify-center text-center overflow-auto border border-red-500 shadow-xl backdrop-blur-md">
          <span className="font-black text-xl mb-2">3D Engine Error</span>
          <p className="text-sm font-medium">{this.state.error?.message || "Unknown error loading 3D model"}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export function DomainsPage() {
  return (
    <div className="w-full flex flex-col">
      {domains.map((domain) => (
        <div key={domain.id}>
          <DomainSection domain={domain} />
          <DomainDetails domain={domain} />
        </div>
      ))}
    </div>
  );
}

function DomainSection({ domain }: { domain: typeof domains[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Optional subtle parallax for the background text
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className={`relative min-h-screen w-full flex flex-col justify-between overflow-hidden ${domain.bgClass} transition-colors duration-500 py-8`}>
      
      {/* Massive Background Typography Canvas (Always visible!) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <motion.h1 
          style={{ y }}
          className={`absolute text-[22vw] font-black leading-none tracking-tighter whitespace-nowrap ${domain.textAccentClass}`}
        >
          {domain.bgText}
        </motion.h1>
      </div>

      {/* Realistic Clouds (Parallax at bottom) */}
      <div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none z-0 opacity-40">
        <div className="absolute bottom-0 left-[-10%] w-[60%] h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/60 via-white/10 to-transparent blur-2xl" />
        <div className="absolute bottom-0 right-[-10%] w-[60%] h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/60 via-white/10 to-transparent blur-2xl" />
      </div>

      {/* Center 3D Assets & Pedestal Layer */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none perspective-[1200px]">
        
        {/* CSS Isometric Pedestal */}
        <div className="absolute top-[55%] w-[350px] h-[350px] opacity-70">
          <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-xl">
            {/* Top Face */}
            <polygon points="200,100 350,175 200,250 50,175" fill="#fcf9f2" />
            {/* Left Face */}
            <polygon points="50,175 200,250 200,380 50,305" fill="#e6dfd1" />
            {/* Right Face */}
            <polygon points="200,250 350,175 350,380 200,305" fill="#d9d0bf" />
          </svg>
        </div>

        {/* Floating Asset */}
        <div className="absolute top-[15%] w-[400px] h-[400px] flex flex-col items-center">
          <motion.div 
            animate={{ y: [-domain.floatOffset, domain.floatOffset, -domain.floatOffset] }} 
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} 
            className="relative w-full h-full"
          >
            {domain.modelUrl ? (
              <div className="w-full h-full z-20 relative pointer-events-none">
                <ModelErrorBoundary>
                  <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-gray-500 font-bold bg-white/50 backdrop-blur-md rounded-3xl border border-white/40 shadow-xl">Loading 3D Model...</div>}>
                    <ModelViewer url={domain.modelUrl} />
                  </Suspense>
                </ModelErrorBoundary>
              </div>
            ) : (
              <img 
                src={domain.imgSrc} 
                alt={domain.imgAlt}
                className="w-full h-full object-contain mix-blend-multiply drop-shadow-2xl relative z-20"
                style={{ clipPath: 'circle(45% at 50% 50%)' }}
              />
            )}
            {/* Dynamic Shadow on Pedestal */}
            <motion.div 
              animate={{ scale: [1, 0.8, 1], opacity: [0.3, 0.1, 0.3] }} 
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} 
              className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-48 h-10 bg-black/30 blur-[20px] rounded-[100%] z-10" 
            />
          </motion.div>
        </div>

      </div>

      {/* Bottom UI Row */}
      <div className="absolute bottom-8 right-8 lg:bottom-12 lg:right-16 z-30 pointer-events-none">
        
        {/* Bottom Right Content Block */}
        <div className="w-[320px] pointer-events-auto flex flex-col items-end text-right">
          <h3 className="font-extrabold text-gray-900 text-[22px] mb-1 tracking-tight">{domain.title}</h3>
          <p className="text-gray-500 text-[14px] leading-snug mb-5 font-medium max-w-[220px]">
            {domain.description}
          </p>
          <a href={domain.link} target="_blank" rel="noopener noreferrer" className="bg-[#e4ddcf] text-gray-800 font-bold text-[13px] px-5 py-2.5 rounded-full flex items-center gap-2 hover:bg-[#d9d1c1] transition-colors shadow-sm">
            {domain.btnText}
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </div>
  );
}

function DomainDetails({ domain }: { domain: typeof domains[0] }) {
  return (
    <div className="w-full bg-white relative py-24 lg:py-32 overflow-hidden">
      {/* Abstract Maroon Background Element */}
      <div className="absolute top-0 right-0 w-[40%] h-full bg-[#800000] rounded-l-[100px] opacity-10 blur-3xl transform translate-x-[20%]" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Animated Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col"
          >
            <h2 className="text-4xl md:text-5xl font-black text-black mb-6 tracking-tight leading-tight">
              {domain.detailsTitle}
            </h2>
            <p className="text-gray-800 text-lg md:text-xl leading-relaxed mb-10 font-medium">
              {domain.detailsBody}
            </p>
            
            <div className="flex flex-col gap-4">
              {domain.detailsStats?.map((stat, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-[#800000] flex items-center justify-center text-white font-bold shrink-0 shadow-lg shadow-[#800000]/20">
                    {idx + 1}
                  </div>
                  <span className="text-xl font-bold text-black tracking-tight">{stat}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Graphical Maroon/White Composition Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative h-[500px] w-full bg-[#800000] rounded-[3rem] p-10 overflow-hidden shadow-2xl flex flex-col justify-between"
          >
            {/* Inner aesthetic details */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
            
            <div className="relative z-10 flex justify-between items-start">
              <span className="text-white/60 uppercase tracking-[0.3em] text-sm font-bold">Deep Dive</span>
              <div className="w-16 h-1 bg-white/30 rounded-full" />
            </div>

            <div className="relative z-10">
              <h3 className="text-white text-5xl font-black uppercase tracking-tighter opacity-20 leading-none">
                {domain.bgText}
              </h3>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

function ModelViewer({ url }: { url: string }) {
  const { scene } = useGLTF(url);

  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 50 }} style={{ width: '100%', height: '100%' }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <Environment preset="city" />
      <primitive 
        object={scene} 
        scale={2.9} 
        position={[0.3, 1.5, 0]} 
        rotation={[0.46, 0.66, 0.06]} 
      />
    </Canvas>
  );
}
