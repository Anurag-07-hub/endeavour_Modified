import React, { useRef, Suspense, useState } from 'react';
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

export function EndeavourBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Real-time states for model positioning
  const [scale, setScale] = useState<number>(2.6);
  const [posX, setPosX] = useState<number>(1.6);
  const [posY, setPosY] = useState<number>(-1.2);
  const [posZ, setPosZ] = useState<number>(0);
  const [rotX, setRotX] = useState<number>(0.2);
  const [rotY, setRotY] = useState<number>(0.78);
  const [rotZ, setRotZ] = useState<number>(0);
  
  const [showControls, setShowControls] = useState<boolean>(true);

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
          
          /* Custom Slider Styling to match UI/UX */
          .custom-slider {
            -webkit-appearance: none;
            width: 100%;
            height: 4px;
            border-radius: 2px;
            background: #282c37;
            outline: none;
          }
          .custom-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #0077ff;
            cursor: pointer;
            transition: transform 0.1s ease;
          }
          .custom-slider::-webkit-slider-thumb:hover {
            transform: scale(1.2);
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
                  <CarModel 
                    scale={scale}
                    position={[posX, posY, posZ]}
                    rotation={[rotX, rotY, rotZ]}
                  />
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
            className="relative z-10 flex flex-col justify-center pt-10 w-full md:w-[85%] banner-text select-none text-white"
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

        {/* Real-time 3D Model Control Panel - Toggleable */}
        <div className="absolute top-24 left-6 z-40">
          <button 
            onClick={() => setShowControls(!showControls)}
            className="bg-[#1a1d24]/90 border border-white/10 hover:border-white/20 text-[#ffffff] px-4 py-2 rounded-lg font-mono text-[11px] tracking-wider uppercase transition-all shadow-xl"
          >
            {showControls ? "Hide 3D Settings" : "3D Model Settings"}
          </button>

          {showControls && (
            <div className="mt-2 w-[280px] bg-[#1a1d24]/90 backdrop-blur-md border border-white/10 text-gray-300 font-mono text-[11px] p-4 rounded-xl shadow-2xl space-y-4">
              <div className="text-[12px] font-bold text-white uppercase tracking-wider pb-2 border-b border-white/5 flex justify-between items-center">
                <span>3D Model Settings</span>
                <span className="text-[#0077ff] text-[9px]">Live Edit</span>
              </div>

              {/* Scale Slider */}
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>scale</span>
                  <span className="text-white bg-[#282c37] px-1.5 py-0.5 rounded text-right min-w-[32px]">{scale.toFixed(1)}</span>
                </div>
                <input 
                  type="range" 
                  min="0.5" 
                  max="10" 
                  step="0.1" 
                  value={scale} 
                  onChange={(e) => setScale(parseFloat(e.target.value))} 
                  className="custom-slider"
                />
              </div>

              {/* Position X Slider */}
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>posX</span>
                  <span className="text-white bg-[#282c37] px-1.5 py-0.5 rounded text-right min-w-[32px]">{posX.toFixed(1)}</span>
                </div>
                <input 
                  type="range" 
                  min="-10" 
                  max="10" 
                  step="0.1" 
                  value={posX} 
                  onChange={(e) => setPosX(parseFloat(e.target.value))} 
                  className="custom-slider"
                />
              </div>

              {/* Position Y Slider */}
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>posY</span>
                  <span className="text-white bg-[#282c37] px-1.5 py-0.5 rounded text-right min-w-[32px]">{posY.toFixed(1)}</span>
                </div>
                <input 
                  type="range" 
                  min="-10" 
                  max="10" 
                  step="0.1" 
                  value={posY} 
                  onChange={(e) => setPosY(parseFloat(e.target.value))} 
                  className="custom-slider"
                />
              </div>

              {/* Position Z Slider */}
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>posZ</span>
                  <span className="text-white bg-[#282c37] px-1.5 py-0.5 rounded text-right min-w-[32px]">{posZ.toFixed(1)}</span>
                </div>
                <input 
                  type="range" 
                  min="-20" 
                  max="20" 
                  step="0.1" 
                  value={posZ} 
                  onChange={(e) => setPosZ(parseFloat(e.target.value))} 
                  className="custom-slider"
                />
              </div>

              {/* Rotation X Slider */}
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>rotX</span>
                  <span className="text-white bg-[#282c37] px-1.5 py-0.5 rounded text-right min-w-[32px]">{rotX.toFixed(2)}</span>
                </div>
                <input 
                  type="range" 
                  min="-3.14" 
                  max="3.14" 
                  step="0.01" 
                  value={rotX} 
                  onChange={(e) => setRotX(parseFloat(e.target.value))} 
                  className="custom-slider"
                />
              </div>

              {/* Rotation Y Slider */}
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>rotY</span>
                  <span className="text-white bg-[#282c37] px-1.5 py-0.5 rounded text-right min-w-[32px]">{rotY.toFixed(2)}</span>
                </div>
                <input 
                  type="range" 
                  min="-3.14" 
                  max="3.14" 
                  step="0.01" 
                  value={rotY} 
                  onChange={(e) => setRotY(parseFloat(e.target.value))} 
                  className="custom-slider"
                />
              </div>

              {/* Rotation Z Slider */}
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>rotZ</span>
                  <span className="text-white bg-[#282c37] px-1.5 py-0.5 rounded text-right min-w-[32px]">{rotZ.toFixed(2)}</span>
                </div>
                <input 
                  type="range" 
                  min="-3.14" 
                  max="3.14" 
                  step="0.01" 
                  value={rotZ} 
                  onChange={(e) => setRotZ(parseFloat(e.target.value))} 
                  className="custom-slider"
                />
              </div>

              {/* Print Code Panel */}
              <div className="pt-2 border-t border-white/5 space-y-1 text-[9px] text-gray-500">
                <div className="font-bold text-white uppercase text-[8px] tracking-wider mb-1">Code values:</div>
                <div className="bg-black/40 p-2 rounded border border-white/5 select-all overflow-x-auto text-white/90">
                  {`scale={${scale.toFixed(1)}}`} <br />
                  {`position={[${posX.toFixed(1)}, ${posY.toFixed(1)}, ${posZ.toFixed(1)}]} `} <br />
                  {`rotation={[${rotX.toFixed(2)}, ${rotY.toFixed(2)}, ${rotZ.toFixed(2)}]}`}
                </div>
              </div>

            </div>
          )}
        </div>
      </section>
    </>
  );
}
