import React, { useState, useEffect, useRef } from 'react';
import { 
  Smartphone, 
  RotateCw, 
  RefreshCw, 
  ArrowLeft, 
  ChevronRight,
  Compass,
  FileText,
  Users,
  Image as ImageIcon,
  Home,
  UserPlus
} from 'lucide-react';

export function SimulatorPage() {
  const [scale, setScale] = useState<number>(0.8);
  const [isPortrait, setIsPortrait] = useState<boolean>(true);
  const [showBezel, setShowBezel] = useState<boolean>(true);
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [time, setTime] = useState<string>('10:20');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Update clock in status bar
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      setTime(`${hours}:${minutes} ${ampm}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 60000);
    return () => clearInterval(interval);
  }, []);

  // Update scaling based on window height automatically if needed
  useEffect(() => {
    const handleResize = () => {
      const viewportHeight = window.innerHeight;
      const deviceHeight = isPortrait ? 918 : 412;
      const margin = 120; // safe area for panels/headers
      if (viewportHeight - margin < deviceHeight * scale) {
        const optimalScale = Math.max(0.4, Math.min(1, (viewportHeight - margin) / deviceHeight));
        setScale(Number(optimalScale.toFixed(2)));
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isPortrait]);

  const handleRefresh = () => {
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  const handleGoBack = () => {
    if (iframeRef.current?.contentWindow) {
      try {
        iframeRef.current.contentWindow.history.back();
      } catch (e) {
        console.warn("Iframe history navigation failed", e);
      }
    }
  };

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    if (iframeRef.current) {
      iframeRef.current.src = `${window.location.origin}${path}`;
    }
  };

  // Sync route selection if user clicks links inside iframe (same origin)
  useEffect(() => {
    const checkIframeRoute = () => {
      if (iframeRef.current?.contentWindow) {
        try {
          const path = iframeRef.current.contentWindow.location.pathname;
          if (path !== currentPath) {
            setCurrentPath(path);
          }
        } catch (e) {
          // Cross-origin issues (shouldn't happen on localhost)
        }
      }
    };
    const interval = setInterval(checkIframeRoute, 1000);
    return () => clearInterval(interval);
  }, [currentPath]);

  const previewRoutes = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About', path: '/about', icon: Compass },
    { name: 'Team', path: '/team', icon: Users },
    { name: 'Domains', path: '/domains', icon: FileText },
    { name: 'Gallery', path: '/gallery', icon: ImageIcon },
    { name: 'Join Us', path: '/join-us', icon: UserPlus },
  ];

  // Samsung Galaxy M33 5G viewport dimensions: 412px x 918px
  const screenWidth = isPortrait ? 412 : 918;
  const screenHeight = isPortrait ? 918 : 412;

  // Outer bezel adds styling: 12px sides/top, 18px bottom (M33 chin)
  const bezelTop = showBezel ? (isPortrait ? 12 : 12) : 0;
  const bezelBottom = showBezel ? (isPortrait ? 20 : 12) : 0;
  const bezelLeft = showBezel ? (isPortrait ? 12 : 20) : 0;
  const bezelRight = showBezel ? (isPortrait ? 12 : 12) : 0;

  const totalWidth = screenWidth + bezelLeft + bezelRight;
  const totalHeight = screenHeight + bezelTop + bezelBottom;

  return (
    <div className="min-h-screen bg-[#080808] text-[#ffffff] flex flex-col lg:flex-row overflow-x-hidden font-sans select-none">
      
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#a40505]/[0.08] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#a40505]/[0.08] blur-[120px] rounded-full pointer-events-none" />

      {/* Sidebar Controls - Left Panel */}
      <div className="w-full lg:w-[380px] shrink-0 bg-[#0d0d0f] border-b lg:border-b-0 lg:border-r border-[#ffffff]/10 p-6 flex flex-col justify-between z-10">
        <div className="space-y-8">
          
          {/* Header info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Smartphone className="text-brand-accent w-6 h-6 animate-pulse" />
              <span className="font-mono text-[11px] tracking-[3px] text-brand-accent font-black uppercase">
                VIRTUAL DEVICE
              </span>
            </div>
            <h1 className="font-bebas text-3xl sm:text-4xl tracking-wide text-[#ffffff] uppercase leading-none">
              Samsung Galaxy M33 5G
            </h1>
            <p className="text-xs text-[#ffffff]/50 leading-relaxed">
              Active viewport simulated at exact 20:9 scale. Test and fine-tune mobile spacing, animations, and touch states in real time.
            </p>
          </div>

          <hr className="border-[#ffffff]/10" />

          {/* Simulator Controls */}
          <div className="space-y-4">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#ffffff]/40 font-bold">Simulator Tuning</h3>
            
            {/* Scale Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[#ffffff]/70">Viewport Scaling</span>
                <span className="text-brand-accent">{Math.round(scale * 100)}%</span>
              </div>
              <input 
                type="range" 
                min="0.4" 
                max="1.2" 
                step="0.05" 
                value={scale} 
                onChange={(e) => setScale(parseFloat(e.target.value))}
                className="w-full h-1 bg-[#ffffff]/10 rounded-lg appearance-none cursor-pointer accent-brand-accent"
              />
              <div className="flex gap-2 justify-between">
                <button 
                  onClick={() => setScale(0.65)} 
                  className="px-2 py-1 bg-[#ffffff]/5 rounded text-[10px] text-[#ffffff]/70 hover:bg-[#ffffff]/10 hover:text-[#ffffff] transition-colors"
                >
                  65% (Laptop)
                </button>
                <button 
                  onClick={() => setScale(0.8)} 
                  className="px-2 py-1 bg-[#ffffff]/5 rounded text-[10px] text-[#ffffff]/70 hover:bg-[#ffffff]/10 hover:text-[#ffffff] transition-colors"
                >
                  80% (Medium)
                </button>
                <button 
                  onClick={() => setScale(1)} 
                  className="px-2 py-1 bg-[#ffffff]/5 rounded text-[10px] text-[#ffffff]/70 hover:bg-[#ffffff]/10 hover:text-[#ffffff] transition-colors"
                >
                  100% (Exact)
                </button>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button 
                onClick={() => setIsPortrait(!isPortrait)} 
                className="flex items-center justify-center gap-2 px-3 py-2 bg-[#ffffff]/5 border border-[#ffffff]/10 rounded-lg text-xs font-bold hover:bg-[#ffffff]/10 transition-colors"
              >
                <RotateCw size={13} className="text-[#ffffff]/60" />
                <span>{isPortrait ? 'Landscape' : 'Portrait'}</span>
              </button>
              
              <button 
                onClick={() => setShowBezel(!showBezel)} 
                className="flex items-center justify-center gap-2 px-3 py-2 bg-[#ffffff]/5 border border-[#ffffff]/10 rounded-lg text-xs font-bold hover:bg-[#ffffff]/10 transition-colors"
              >
                <Smartphone size={13} className="text-[#ffffff]/60" />
                <span>{showBezel ? 'Hide Bezel' : 'Show Bezel'}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={handleGoBack} 
                className="flex items-center justify-center gap-2 px-3 py-2 bg-[#ffffff]/5 border border-[#ffffff]/10 rounded-lg text-xs font-bold hover:bg-[#ffffff]/10 transition-colors"
              >
                <ArrowLeft size={13} className="text-[#ffffff]/60" />
                <span>Go Back</span>
              </button>

              <button 
                onClick={handleRefresh} 
                className="flex items-center justify-center gap-2 px-3 py-2 bg-[#a40505] hover:bg-[#c00606] rounded-lg text-xs font-bold shadow-[0_0_15px_rgba(164,5,5,0.3)] transition-colors"
              >
                <RefreshCw size={13} />
                <span>Reload view</span>
              </button>
            </div>

          </div>

          <hr className="border-[#ffffff]/10" />

          {/* Path Navigation panel */}
          <div className="space-y-3">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#ffffff]/40 font-bold">Route Navigator</h3>
            <div className="grid grid-cols-1 gap-2">
              {previewRoutes.map((route) => {
                const RouteIcon = route.icon;
                const isCurrent = currentPath === route.path;
                return (
                  <button
                    key={route.path}
                    onClick={() => handleNavigate(route.path)}
                    className={`flex items-center justify-between p-2.5 rounded-lg border text-left transition-all ${
                      isCurrent 
                        ? 'bg-brand-accent/10 border-brand-accent text-brand-accent font-bold' 
                        : 'bg-[#ffffff]/5 border-transparent text-[#ffffff]/70 hover:border-[#ffffff]/10 hover:bg-[#ffffff]/10 hover:text-[#ffffff]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 text-xs">
                      <RouteIcon size={14} className={isCurrent ? 'text-brand-accent' : 'text-[#ffffff]/40'} />
                      <span>{route.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-[#ffffff]/40 font-mono">
                      <span>{route.path}</span>
                      <ChevronRight size={10} />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer info specs */}
        <div className="pt-8 lg:pt-0">
          <div className="bg-[#ffffff]/5 p-4 rounded-xl border border-[#ffffff]/10 space-y-2">
            <h4 className="font-mono text-[10px] tracking-wider text-[#ffffff]/50 font-bold uppercase">M33 5G Virtual Display Specs</h4>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-[11px] font-mono text-[#ffffff]/80">
              <div>Aspect Ratio:</div>
              <div className="text-right font-semibold text-[#ffffff]">20:9</div>
              <div>Physical Res:</div>
              <div className="text-right font-semibold text-[#ffffff]">1080 x 2408 px</div>
              <div>Viewport size:</div>
              <div className="text-right font-semibold text-[#ffffff]">412 x 918 px</div>
              <div>Refresh Rate:</div>
              <div className="text-right font-semibold text-[#ffffff]">120 Hz</div>
            </div>
            <div className="pt-2 text-[10px] text-[#ffffff]/40 text-center leading-relaxed">
              Hot Module Replacement (HMR) is enabled. Saving CSS edits or code updates will instantly refresh this view.
            </div>
          </div>
        </div>

      </div>

      {/* Simulator Workspace - Center Screen */}
      <div className="flex-1 bg-[#101012] flex items-center justify-center p-6 min-h-[500px] lg:min-h-screen relative overflow-hidden">
        
        {/* Dotted background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] bg-[size:30px_30px]" />
        </div>

        {/* Simulator Container */}
        <div 
          style={{ 
            width: `${totalWidth}px`, 
            height: `${totalHeight}px`,
            transform: `scale(${scale})`,
            transition: 'transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
            transformOrigin: 'center center'
          }} 
          className="relative transition-shadow duration-500 shrink-0"
        >
          {/* Physical Phone Frame / Bezels */}
          {showBezel && (
            <div 
              className="absolute inset-0 rounded-[44px] bg-[#1a1a1c] border-2 border-[#333336] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_80px_rgba(164,5,5,0.15)] flex flex-col overflow-hidden pointer-events-none z-30"
              style={{
                paddingTop: `${bezelTop}px`,
                paddingBottom: `${bezelBottom}px`,
                paddingLeft: `${bezelLeft}px`,
                paddingRight: `${bezelRight}px`,
              }}
            >
              {/* Inner screen container matching viewport */}
              <div className="w-full h-full rounded-[32px] border border-white/5 shadow-[inset_0_0_8px_rgba(0,0,0,0.8)] overflow-hidden" />
              
              {/* Teardrop Notch (V-cut camera) for M33 5G */}
              {isPortrait && (
                <div 
                  className="absolute left-1/2 -translate-x-1/2 top-[12px] w-[26px] h-[18px] bg-[#1a1a1c] rounded-b-[14px] flex items-start justify-center z-50 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.4)] pointer-events-auto"
                >
                  <div className="w-[8px] h-[8px] rounded-full bg-[#070b14] mt-[3px] border border-white/10 shadow-[inset_0_0_2px_rgba(255,255,255,0.6)] relative overflow-hidden">
                    <div className="absolute top-[1px] left-[1px] w-[2px] h-[2px] rounded-full bg-blue-500/50" />
                  </div>
                </div>
              )}

              {/* Physical side buttons */}
              {isPortrait && (
                <>
                  <div className="absolute right-[-2.5px] top-[180px] w-[3px] h-[55px] bg-[#222225] rounded-l border-y border-l border-[#3a3a3d]" />
                  <div className="absolute right-[-2.5px] top-[260px] w-[3px] h-[75px] bg-[#1f1f21] rounded-l border border-r-0 border-[#3a3a3d]" />
                </>
              )}
            </div>
          )}

          {/* Interactive Screen viewport */}
          <div 
            style={{
              top: `${bezelTop}px`,
              bottom: `${bezelBottom}px`,
              left: `${bezelLeft}px`,
              right: `${bezelRight}px`,
              width: `${screenWidth}px`,
              height: `${screenHeight}px`,
            }}
            className={`absolute bg-[#080808] rounded-[32px] overflow-hidden flex flex-col z-20`}
          >
            
            {/* High-Fidelity Samsung M33 Status Bar */}
            {isPortrait && (
              <div className="h-[28px] bg-black text-white px-6 flex items-center justify-between text-[11px] font-semibold tracking-wide select-none z-40 relative shrink-0">
                <div>{time}</div>
                
                <div className="flex items-center gap-2 text-[10px]">
                  <span className="font-black text-[9px] tracking-tighter text-white/95 px-1 py-[0.5px] rounded bg-white/10 border border-white/10 scale-90">5G</span>
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M2 22h20V2z" />
                  </svg>
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 21l-12-12a17 17 0 0 1 24 0z" />
                  </svg>
                  <span className="text-[10px] text-white/90">88%</span>
                  <div className="w-5 h-2.5 border border-white/60 rounded-[3px] p-[1.5px] flex items-center">
                    <div className="h-full w-[88%] bg-white rounded-[1px]" />
                  </div>
                </div>
              </div>
            )}

            {/* Simulated browser viewport area containing iframe */}
            <div className="flex-1 w-full relative overflow-hidden bg-[#ffffff]">
              <iframe
                ref={iframeRef}
                src={`${window.location.origin}${currentPath}`}
                className="absolute inset-0 w-full h-full border-none select-none bg-[#ffffff]"
                title="Galaxy M33 Viewport"
              />
            </div>

            {/* Android Navigation Gesture Line at bottom */}
            {isPortrait && (
              <div className="h-[14px] bg-black flex items-center justify-center select-none z-40 relative shrink-0">
                <div className="w-[120px] h-[4px] bg-white/40 hover:bg-white/60 active:bg-white rounded-full transition-colors cursor-pointer" onClick={() => handleNavigate('/')} />
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
