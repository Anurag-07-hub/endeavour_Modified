import React, { useRef, Suspense, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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

// Liquid Explore Button — fixed gap by adding more blobs + full-width coverage + magnetic mouse wobble
function LiquidExploreButton({ onClick }: { onClick: () => void }) {
  const filterId = React.useId().replace(/:/g, '');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Calculate distance from center (constrained to -1 to 1)
    const x = ((e.clientX - centerX) / width) * 2;
    const y = ((e.clientY - centerY) / height) * 2;
    
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <>
      <style>{`
        .leb-wrapper {
          position: relative;
          overflow: hidden;
          isolation: isolate;
          outline: none;
          cursor: pointer;
          color: #ffffff !important;
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
        .leb-wrapper:hover .leb-blob {
          transform: translateX(-50%) translateY(-190%) scale(5.5);
        }
        .leb-arrow {
          transition: transform 300ms ease;
        }
        .leb-wrapper:hover .leb-arrow {
          transform: translateX(5px);
        }
      `}</style>

      <motion.button
        ref={buttonRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          x: position.x * 12,
          y: position.y * 12,
          rotateX: position.y * -10,
          rotateY: position.x * 10,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
        className="leb-wrapper group flex items-center gap-1 sm:gap-3 px-2 py-1 sm:px-7 sm:py-3 rounded-full border-2 uppercase tracking-[0.5px] sm:tracking-[2.5px] transition-colors duration-500 font-sans font-black whitespace-nowrap backdrop-blur-sm text-[7.5px] sm:text-[13px] perspective-1000"
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
        `}
      </style>
      
      <section 
        ref={containerRef}
        className="relative w-full h-[240px] sm:h-auto sm:min-h-[100svh] py-0 sm:py-24 overflow-hidden flex items-center"
      >
        {/* Parallax Background */}
        <motion.div
          style={{ 
            y: yBg,
            background: 'linear-gradient(to right, #c8102e 0%, #c8102e 40%, #27151b 40%, #27151b 100%)'
          }}
          className="absolute top-[-20%] left-0 w-full h-[140%] z-0"
        />

        <div className="absolute inset-0 max-w-[1500px] mx-auto w-full flex items-center px-5 md:px-[60px]">
          
          {/* Right Side: 3D Car Model with wobble, wheel spin & smoke */}
          <motion.div 
            style={{ y: yImage }}
            className="absolute right-[0%] sm:right-[0%] top-1/2 -translate-y-1/2 w-[55%] sm:w-[50%] h-[100%] z-10"
          >
            {/* Scroll Zone Overlay: Prevents the right thumb edge from rotating the car, allowing normal page scrolling */}
            <div className="absolute right-0 top-0 w-[40%] md:w-[20%] h-full z-20" style={{ touchAction: "pan-y" }} />
            
            <Canvas camera={{ position: [0, 2, 10], fov: 45 }} style={{ width: '100%', height: '100%', background: 'transparent' }}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
                <directionalLight position={[-10, 5, -5]} intensity={0.8} color="#c8102e" />
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
            className="relative z-10 flex flex-col justify-center pt-0 sm:pt-10 w-full md:w-[85%] banner-text select-none pointer-events-none text-white"
          >
            <span className="text-[15vw] sm:text-[18vw] lg:text-[16vw] whitespace-nowrap block">
              ENDE
              <span className="bg-[#c8102e] text-[#27151b] px-1 sm:px-2 py-0.5 mx-0.5 sm:mx-1 rounded-sm inline-block align-middle">
                AV
              </span>
              <span className="mix-blend-difference inline-block">OUR</span>
            </span>
            <span className="text-[15vw] sm:text-[18vw] lg:text-[16vw] whitespace-nowrap block">
              RO
              <span className="bg-[#27151b] text-[#c8102e] px-1 sm:px-2 py-0.5 mx-0.5 sm:mx-1 rounded-sm inline-block align-middle">
                BO
              </span>
              TICS
            </span>
          </motion.div>

        </div>

        {/* Explore About Us — liquid button pinned to bottom-right corner of the banner */}
        <div className="absolute bottom-4 right-4 sm:bottom-10 sm:right-12 z-20">
          <LiquidExploreButton onClick={() => setIsTransitioning(true)} />
        </div>

        {/* Let's Begin Transition Animation */}
        {isTransitioning && (
          <LetsBeginTransition onComplete={() => navigate('/about', { state: { fromLetsBegin: true } })} />
        )}
      </section>
    </>
  );
}
