import React, { useRef, Suspense, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, OrbitControls } from '@react-three/drei';
import { useCMS } from '../context/CMSContext';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { LetsBeginTransition } from './LetsBeginTransition';
import * as THREE from 'three';

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
        <div className="w-full h-full bg-red-100/90 text-red-900 p-4 flex flex-col items-center justify-center text-center">
          <span className="font-black text-xl mb-2">3D Engine Error</span>
          <p className="text-sm font-medium">{this.state.error?.message || "Unknown error"}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

interface CarModelProps {
  scale: number;
  position: [number, number, number];
  rotation: [number, number, number];
}

function CarModel({ scale, position, rotation }: CarModelProps) {
  const { scene } = useGLTF('/textured_mesh.glb');
  const groupRef = useRef<THREE.Group>(null);
  const timeRef  = useRef(0);

  useFrame((_, delta) => {
    timeRef.current  += delta;

    // Suspension wobble
    if (groupRef.current) {
      groupRef.current.position.y =
        position[1] + Math.sin(timeRef.current * 2.5) * 0.12;
      groupRef.current.rotation.z =
        rotation[2] + Math.sin(timeRef.current * 2.5 + 0.5) * 0.018;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <primitive object={scene} scale={scale} />
    </group>
  );
}



// Custom OrbitControls wrapper that smoothly snaps back to default camera angle when released
function InteractiveControls() {
  const controlsRef = useRef<any>(null);
  const isInteracting = useRef(false);

  const defaultCamPos = [0, 2, 10];
  const defaultTarget = [0, 0, 0];

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    const handleStart = () => { isInteracting.current = true; };
    const handleEnd = () => { isInteracting.current = false; };

    controls.addEventListener('start', handleStart);
    controls.addEventListener('end', handleEnd);

    return () => {
      controls.removeEventListener('start', handleStart);
      controls.removeEventListener('end', handleEnd);
    };
  }, []);

  useFrame(() => {
    if (controlsRef.current && !isInteracting.current) {
      const camera = controlsRef.current.object;
      camera.position.x += (defaultCamPos[0] - camera.position.x) * 0.06;
      camera.position.y += (defaultCamPos[1] - camera.position.y) * 0.06;
      camera.position.z += (defaultCamPos[2] - camera.position.z) * 0.06;
      controlsRef.current.target.x += (defaultTarget[0] - controlsRef.current.target.x) * 0.06;
      controlsRef.current.target.y += (defaultTarget[1] - controlsRef.current.target.y) * 0.06;
      controlsRef.current.target.z += (defaultTarget[2] - controlsRef.current.target.z) * 0.06;
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls 
      ref={controlsRef} 
      enableZoom={false} 
      enablePan={false} 
      enableRotate={true}
      rotateSpeed={0.8}
    />
  );
}

function LiquidExploreButton({ onClick }: { onClick: () => void }) {
  const filterId = React.useId().replace(/:/g, '');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || clicked) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Calculate distance from center (constrained to -1 to 1)
    const x = ((e.clientX - centerX) / width) * 2;
    const y = ((e.clientY - centerY) / height) * 2;
    
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    if (!clicked) setPosition({ x: 0, y: 0 });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setClicked(true);
    setPosition({ x: 0, y: 0 });
    onClick?.();
    setTimeout(() => setClicked(false), 800);
  };

  return (
    <>
      <style>{`
        .leb-wrapper {
          position: relative;
          overflow: hidden;
          isolation: isolate;
          outline: none;
        }
        .leb-wrapper::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 999px;
          border: 2px solid transparent;
          background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
        /* Default solid white border fallback */
        .leb-wrapper {
          border-color: #ffffff !important;
        }
        .leb-bg {
          position: absolute;
          inset: 0;
          z-index: -1;
          filter: url(#${filterId});
          pointer-events: none;
        }
        .leb-blob {
          position: absolute;
          width: 32px;
          height: 32px;
          border-radius: 999px;
          bottom: -40px;
          background: #c8102e;
          transition: transform 600ms cubic-bezier(0.23, 1, 0.32, 1);
          will-change: transform;
        }
        /* 7 blobs evenly spread so there are no gaps across the full button width */
        .leb-blob:nth-child(1) { left: 5%;   transition-delay: 0ms;   transform: translateX(-50%) translateY(0) scale(0); }
        .leb-blob:nth-child(2) { left: 20%;  transition-delay: 40ms;  transform: translateX(-50%) translateY(0) scale(0); }
        .leb-blob:nth-child(3) { left: 35%;  transition-delay: 80ms;  transform: translateX(-50%) translateY(0) scale(0); }
        .leb-blob:nth-child(4) { left: 50%;  transition-delay: 120ms; transform: translateX(-50%) translateY(0) scale(0); }
        .leb-blob:nth-child(5) { left: 65%;  transition-delay: 80ms;  transform: translateX(-50%) translateY(0) scale(0); }
        .leb-blob:nth-child(6) { left: 80%;  transition-delay: 40ms;  transform: translateX(-50%) translateY(0) scale(0); }
        .leb-blob:nth-child(7) { left: 95%;  transition-delay: 0ms;   transform: translateX(-50%) translateY(0) scale(0); }
        .leb-wrapper:not(.clicked):hover .leb-blob {
          transform: translateX(-50%) translateY(-190%) scale(5.5);
        }
        .leb-wrapper.clicked .leb-blob {
          transform: translateX(-50%) translateY(-190%) scale(10) !important;
          transition-duration: 300ms !important;
          transition-delay: 0ms !important;
        }
        .leb-arrow {
          transition: transform 300ms ease;
        }
        .leb-wrapper:not(.clicked):hover .leb-arrow {
          transform: translateX(5px);
        }
      `}</style>

      <motion.button
        ref={buttonRef}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          x: position.x * 12,
          y: position.y * 12,
          rotateX: position.y * -10,
          rotateY: position.x * 10,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
        className={`leb-wrapper group flex items-center gap-1 sm:gap-3 px-2 py-1 sm:px-7 sm:py-3 rounded-full border-2 uppercase tracking-[0.5px] sm:tracking-[2.5px] transition-colors duration-500 font-sans font-black whitespace-nowrap backdrop-blur-sm text-[7.5px] sm:text-[13px] perspective-1000 ${clicked ? 'clicked' : ''}`}
        style={{ color: '#ffffff', borderColor: '#ffffff', backgroundColor: 'rgba(255,255,255,0.05)' }}
      >
        <span className="relative z-20">Explore About Us</span>
        <ArrowRight className="leb-arrow w-2.5 h-2.5 sm:w-4 sm:h-4 relative z-20 shrink-0" />
        <span className="leb-bg" aria-hidden="true">
          <span className="leb-blob" />
          <span className="leb-blob" />
          <span className="leb-blob" />
          <span className="leb-blob" />
          <span className="leb-blob" />
          <span className="leb-blob" />
          <span className="leb-blob" />
        </span>
      </motion.button>

      <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
        <defs>
          <filter id={filterId}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
    </>
  );
}

export function EndeavourBanner() {
  const { model3D } = useCMS();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Spotlight mouse tracking with motion value springs
  const [isHovered, setIsHovered] = useState(false);
  const spotlightX = useMotionValue(0);
  const spotlightY = useMotionValue(0);
  
  const springConfig = { stiffness: 60, damping: 20, mass: 0.6 };
  const smoothX = useSpring(spotlightX, springConfig);
  const smoothY = useSpring(spotlightY, springConfig);
  
  const spotlightBg = useMotionTemplate`radial-gradient(circle 350px at ${smoothX}px ${smoothY}px, rgba(255, 255, 255, 0.08) 0%, rgba(200, 16, 46, 0.04) 50%, transparent 100%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    spotlightX.set(e.clientX - rect.left);
    spotlightY.set(e.clientY - rect.top);
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const yImage = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  // Shrink the 3D car model by 28% and adjust position on mobile to show the full car
  const finalScale = isMobile ? model3D.scale * 0.72 : model3D.scale;
  const finalPosition: [number, number, number] = isMobile
    ? [model3D.position[0] - 0.3, model3D.position[1] - 0.2, model3D.position[2] - 0.8]
    : model3D.position;

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
          .banner-text {
            font-family: 'Bebas Neue', Impact, sans-serif;
            color: #ffffff !important;
            line-height: 0.85;
            text-transform: uppercase;
            letter-spacing: 0.02em;
          }
          .grain-overlay {
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          }
          .editorial-text-gradient {
            background: linear-gradient(135deg, #ffffff 10%, #e11d48 60%, #1c0a10 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            display: inline-block;
          }
        `}
      </style>
      
      <section 
        id="endeavour-banner"
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-full h-[320px] sm:h-auto sm:min-h-[100svh] py-0 sm:py-24 overflow-hidden flex items-center bg-[#12090c]"
      >
        {/* Parallax Background */}
        <motion.div
          style={{ 
            y: yBg
          }}
          className="absolute top-[-20%] left-0 w-full h-[140%] z-0"
        >
          {/* Base Split Background with rich lighting gradients based on original brand colors */}
          <div className="absolute inset-0 flex">
            {/* Left side: Premium Crimson Red Gradient using #c8102e */}
            <div 
              className="w-[40%] h-full relative"
              style={{
                background: 'radial-gradient(circle at 100% 30%, #e31837 0%, #c8102e 45%, #7a0618 100%)'
              }}
            >
              {/* Fine vertical boundary divider glow */}
              <div className="absolute right-0 top-0 w-[1px] h-full bg-gradient-to-b from-white/15 via-white/5 to-transparent z-1" />
            </div>
            {/* Right side: Deep Luxury Brown/Maroon Dark Gradient using #27151b */}
            <div 
              className="w-[60%] h-full"
              style={{
                background: 'radial-gradient(circle at 20% 70%, #301a21 0%, #27151b 50%, #12090c 100%)'
              }}
            />
          </div>

          {/* Ambient Backlight behind the 3D car model to lift it from the dark background */}
          <div 
            className="absolute right-[5%] top-1/2 -translate-y-1/2 w-[55%] h-[60%] pointer-events-none z-1 mix-blend-screen opacity-60"
            style={{
              background: 'radial-gradient(circle at 55% 50%, rgba(200, 16, 46, 0.25) 0%, rgba(200, 16, 46, 0.05) 55%, transparent 80%)'
            }}
          />
        </motion.div>

        {/* Vintage Film Grain Overlay */}
        <div className="absolute inset-0 pointer-events-none z-20 mix-blend-overlay opacity-[0.20] grain-overlay" />

        {/* Studio Lighting Vignette Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: 'radial-gradient(circle at center, transparent 35%, rgba(0, 0, 0, 0.65) 100%)'
          }}
        />

        {/* Dynamic Cursor-Tracking Spotlight */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 11,
            opacity: isHovered ? 1 : 0,
            background: spotlightBg,
            transition: 'opacity 0.4s ease-in-out'
          }}
        />

        {/* Editorial Framing Layout Details */}
        {/* Left Monospace Metadata Frame */}
        <div className="absolute left-6 md:left-[60px] top-8 md:top-[120px] hidden md:flex flex-col text-[11px] tracking-[0.22em] text-white/40 font-mono gap-1.5 uppercase select-none pointer-events-none z-15">
          <span className="text-white/70 font-bold tracking-[0.25em] mb-1">// SYSTEM ARCHITECTURE</span>
          <span>AUTONOMOUS SYSTEMS</span>
          <span>ROBOTIC SENSORS</span>
          <span>ESTABLISHED 2026</span>
        </div>



        <div className="absolute inset-0 max-w-[1500px] mx-auto w-full flex items-center px-5 md:px-[60px]">
          
          {/* Right Side: 3D Car Model with wobble, wheel spin & smoke */}
          <motion.div 
            style={{ y: yImage }}
            className="absolute right-[0%] sm:right-[0%] top-1/2 -translate-y-1/2 w-[55%] sm:w-[50%] h-[100%] z-20"
          >
            {/* Scroll Zone Overlay: Prevents the right thumb edge from rotating the car, allowing normal page scrolling */}
            <div className="absolute right-0 top-0 w-[40%] md:w-[20%] h-full z-25" style={{ touchAction: "pan-y" }} />
            
            <Canvas camera={{ position: [0, 2, 10], fov: 45 }} style={{ width: '100%', height: '100%', background: 'transparent' }}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.65} />
                <directionalLight position={[10, 10, 5]} intensity={1.8} color="#ffffff" />
                <directionalLight position={[-10, 5, -5]} intensity={1.0} color="#c8102e" />
                <Environment preset="city" />
                <ModelErrorBoundary>
                  <CarModel 
                    scale={finalScale}
                    position={finalPosition}
                    rotation={model3D.rotation}
                  />
                </ModelErrorBoundary>
                <InteractiveControls />
              </Suspense>
            </Canvas>
          </motion.div>

          {/* Left Side: Animated Typography */}
          <motion.div 
            style={{ y: yText }}
            className="relative z-20 flex flex-col justify-center pt-0 sm:pt-10 w-full md:w-[85%] banner-text select-none pointer-events-none text-white"
          >
            <span className="text-[15vw] sm:text-[18vw] lg:text-[16vw] whitespace-nowrap block">
              ENDE
              <span 
                style={{ background: 'linear-gradient(to right, rgba(200, 16, 46, 0) 0%, rgba(200, 16, 46, 1) 20%)' }}
                className="text-[#27151b] px-1 sm:px-2 py-0.5 mx-0.5 sm:mx-1 rounded-sm inline-block align-middle select-none"
              >
                AV
              </span>
              <span className="mix-blend-difference inline-block">OUR</span>
            </span>
            <span className="text-[15vw] sm:text-[18vw] lg:text-[16vw] whitespace-nowrap block">
              RO
              <span className="bg-[#27151b] text-[#c8102e] px-1 sm:px-2 py-0.5 mx-0.5 sm:mx-1 rounded-sm inline-block align-middle select-none">
                BO
              </span>
              TICS
            </span>
          </motion.div>

        </div>

        {/* Explore About Us — liquid button pinned to bottom-right corner of the banner with scroll reveal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.2 }}
          className="absolute bottom-6 right-6 sm:bottom-12 sm:right-[60px] z-30"
        >
          <LiquidExploreButton onClick={() => setIsTransitioning(true)} />
        </motion.div>

        {/* Let's Begin Transition Animation */}
        {isTransitioning && (
          <LetsBeginTransition onComplete={() => navigate('/about', { state: { fromLetsBegin: true } })} />
        )}
      </section>
    </>
  );
}
