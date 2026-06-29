import React, { useRef, Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Environment, OrbitControls } from '@react-three/drei';

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

function CarModel() {
  const { scene } = useGLTF('/textured_mesh.glb');

  return (
    <primitive 
      object={scene} 
      scale={2.6}
      position={[1.6, -1.2, 0]}
      rotation={[0.2, 0.78, 0]}
    />
  );
}

export function EndeavourBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Subtle parallax effect for depth
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Text moves slightly slower than the image
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
      
      {/* 
        Full page height (min-h-[100svh]) to prevent overflow
        Split background: Red (#c8102e) on the left (approx 40%), Maroon (#27151b) on the right (approx 60%).
      */}
      <section 
        ref={containerRef}
        className="relative w-full min-h-[100svh] py-24 overflow-hidden flex items-center"
        style={{
          background: 'linear-gradient(to right, #c8102e 0%, #c8102e 40%, #27151b 40%, #27151b 100%)'
        }}
      >
        <div className="absolute inset-0 max-w-[1500px] mx-auto w-full flex items-center px-5 md:px-[60px]">
          
          {/* 
            Right Side: 3D Car Model
            Takes up the maroon side where the logo used to be.
          */}
          <motion.div 
            style={{ y: yImage }}
            className="absolute right-[-10%] md:right-[0%] top-1/2 -translate-y-1/2 w-[65%] md:w-[50%] h-[100%] z-0"
          >
            <Canvas camera={{ position: [0, 2, 10], fov: 45 }} style={{ width: '100%', height: '100%', pointerEvents: 'none', background: 'transparent' }}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
                <directionalLight position={[-10, 5, -5]} intensity={0.8} color="#c8102e" />
                <Environment preset="city" />
                <ModelErrorBoundary>
                  <CarModel />
                </ModelErrorBoundary>
                <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
              </Suspense>
            </Canvas>
          </motion.div>

          {/* 
            Left Side: Animated Typography 
            z-10 so it overlays cleanly.
          */}
          <motion.div 
            style={{ y: yText }}
            className="relative z-10 flex flex-col justify-center pt-10 w-full md:w-[85%] banner-text select-none"
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
      </section>
    </>
  );
}
