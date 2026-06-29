import React, { useRef, Suspense, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, OrbitControls } from '@react-three/drei';
import { useCMS } from '../context/CMSContext';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

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

  return (
    <primitive 
      object={scene} 
      scale={scale}
      position={position}
      rotation={rotation}
    />
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

// Liquid Explore Button — same blob-morph mechanic as the Join Us navbar button
function LiquidExploreButton({ onClick }: { onClick: () => void }) {
  const filterId = React.useId().replace(/:/g, '');

  return (
    <>
      <style>{`
        .leb-wrapper {
          position: relative;
          overflow: hidden;
          isolation: isolate;
          outline: none;
          cursor: pointer;
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
          width: 28px;
          height: 28px;
          border-radius: 999px;
          bottom: -36px;
          background: #c8102e;
          transition: transform 700ms cubic-bezier(0.23, 1, 0.32, 1);
          will-change: transform;
        }
        .leb-blob:nth-child(1) { left: calc(50% - 64px); transition-delay: 0ms;   transform: translateX(-50%) translateY(0) scale(0); }
        .leb-blob:nth-child(2) { left: 50%;               transition-delay: 60ms;  transform: translateX(-50%) translateY(0) scale(0); }
        .leb-blob:nth-child(3) { left: calc(50% + 64px);  transition-delay: 120ms; transform: translateX(-50%) translateY(0) scale(0); }
        .leb-wrapper:hover .leb-blob {
          transform: translateX(-50%) translateY(-200%) scale(4);
        }
        .leb-arrow {
          transition: transform 300ms ease;
        }
        .leb-wrapper:hover .leb-arrow {
          transform: translateX(5px);
        }
      `}</style>

      <button
        onClick={onClick}
        className="leb-wrapper group flex items-center gap-3 px-7 py-3 rounded-full border-2 border-white/60 text-white text-[12px] uppercase tracking-[2.5px] hover:border-[#c8102e] hover:text-white transition-colors duration-500 font-sans font-black whitespace-nowrap backdrop-blur-sm bg-white/5"
      >
        <span className="relative z-20">Explore About Us</span>
        <ArrowRight className="leb-arrow w-4 h-4 relative z-20 shrink-0" />
        <span className="leb-bg" aria-hidden="true">
          <span className="leb-blob"></span>
          <span className="leb-blob"></span>
          <span className="leb-blob"></span>
        </span>
      </button>

      <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
        <defs>
          <filter id={filterId}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
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
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, -60]);

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
        className="relative w-full min-h-[100svh] py-24 overflow-hidden flex items-center"
        style={{
          background: 'linear-gradient(to right, #c8102e 0%, #c8102e 40%, #27151b 40%, #27151b 100%)'
        }}
      >
        <div className="absolute inset-0 max-w-[1500px] mx-auto w-full flex items-center px-5 md:px-[60px]">
          
          {/* Right Side: 3D Car Model */}
          <motion.div 
            style={{ y: yImage }}
            className="absolute right-[-10%] md:right-[0%] top-1/2 -translate-y-1/2 w-[65%] md:w-[50%] h-[100%] z-10"
          >
            <Canvas camera={{ position: [0, 2, 10], fov: 45 }} style={{ width: '100%', height: '100%', background: 'transparent' }}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
                <directionalLight position={[-10, 5, -5]} intensity={0.8} color="#c8102e" />
                <Environment preset="city" />
                <ModelErrorBoundary>
                  <CarModel 
                    scale={model3D.scale}
                    position={model3D.position}
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
            className="relative z-10 flex flex-col justify-center pt-10 w-full md:w-[85%] banner-text select-none pointer-events-none text-white"
          >
            <span className="text-[22vw] md:text-[18vw] lg:text-[16vw] whitespace-nowrap block">
              ENDE
              <span className="bg-[#c8102e] text-[#27151b] px-2 py-0.5 mx-1 rounded-sm inline-block align-middle">
                AV
              </span>
              <span className="mix-blend-difference inline-block">OUR</span>
            </span>
            <span className="text-[22vw] md:text-[18vw] lg:text-[16vw] whitespace-nowrap block">
              RO
              <span className="bg-[#27151b] text-[#c8102e] px-2 py-0.5 mx-1 rounded-sm inline-block align-middle">
                BO
              </span>
              TICS
            </span>
          </motion.div>

        </div>

        {/* Explore About Us — liquid button pinned to bottom-right corner of the banner, below 3D car */}
        <div className="absolute bottom-8 right-8 md:bottom-10 md:right-12 z-20">
          <LiquidExploreButton onClick={() => navigate('/about')} />
        </div>
      </section>
    </>
  );
}
