import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Info, Users, Calendar, Image, Hand, Info as InfoIcon, UserPlus } from 'lucide-react';
import { useGesture } from '../context/GestureContext';
import { GestureGuideModal } from './GestureGuideModal';

const navItems = [
  { name: 'Home', url: '/', icon: Home, isRouterLink: true },
  { name: 'About', url: '/about', icon: Info, isRouterLink: true },
  { name: 'Team', url: '/team', icon: Users, isRouterLink: true },
  { name: 'Events', url: '/#events', icon: Calendar, isRouterLink: false },
  { name: 'Gallery', url: '/gallery', icon: Image, isRouterLink: true },
];

export function Navbar() {
  const [activeTab, setActiveTab] = useState(navItems[0].name);
  const location = useLocation();
  const { isGestureEnabled, toggleGestures } = useGesture();
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  useEffect(() => {
    const current = navItems.find(item => item.url === location.pathname || item.url === location.hash);
    if (current) setActiveTab(current.name);
  }, [location]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'instant' });

  return (
    <>
      <div id="main-navbar" className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-max max-w-[calc(100%-16px)] sm:max-w-none flex justify-center transition-opacity duration-300">
        <div className="flex items-center gap-1 sm:gap-3 lg:gap-5 bg-brand-bg/80 border border-white/10 backdrop-blur-xl py-2 px-2 sm:px-4 rounded-[40px] shadow-[0_8px_32px_0_rgba(164,5,5,0.15)]">
          
          {/* Logo */}
          <Link to="/" onClick={() => { scrollToTop(); setActiveTab('Home'); }} className="flex items-center justify-center h-10 sm:h-auto sm:px-3 lg:px-4 shrink-0 rounded-full hover:bg-white/5 transition-colors group">
             <img src="https://www.endeavoursliet.in/images/mainlogo.png" alt="Endeavour" className="w-[26px] sm:w-[34px] h-auto object-contain drop-shadow-[0_0_5px_rgba(164,5,5,0.5)] z-10" />
             <motion.div
               initial={{ width: 0, opacity: 0, marginLeft: 0 }}
               animate={{ width: "auto", opacity: 1, marginLeft: 12 }}
               transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
               className="hidden lg:flex overflow-hidden items-center"
             >
               <motion.span 
                 initial={{ x: -20 }}
                 animate={{ x: 0 }}
                 transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                 className="font-sans font-black text-[15px] uppercase tracking-[3px] text-brand-accent whitespace-nowrap"
               >
                 ENDEAVOUR
               </motion.span>
             </motion.div>
          </Link>

          {/* Divider */}
          <div className="w-px h-6 sm:h-8 bg-white/10 hidden sm:block"></div>

          {/* Nav Items */}
          <div className="flex items-center">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;

              const content = (
                <>
                  <span className="hidden md:inline text-[13px] lg:text-[14px] uppercase tracking-[1.5px] whitespace-nowrap">{item.name}</span>
                  <span className="md:hidden flex items-center justify-center w-10 h-10">
                    <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="lamp"
                      className="absolute inset-0 w-full bg-brand-accent/10 rounded-full -z-10"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      <div className="absolute -top-1.5 sm:-top-2 left-1/2 -translate-x-1/2 w-8 md:w-10 h-1.5 bg-brand-accent rounded-t-full">
                        <div className="absolute w-10 md:w-14 h-8 bg-brand-accent/20 rounded-full blur-md -top-2 -left-1 md:-left-2" />
                        <div className="absolute w-8 md:w-10 h-8 bg-brand-accent/20 rounded-full blur-md -top-1" />
                        <div className="absolute w-4 md:w-5 h-4 md:h-5 bg-brand-accent/20 rounded-full blur-sm top-0 left-2 md:left-2.5" />
                      </div>
                    </motion.div>
                  )}
                </>
              );

              const className = `relative flex items-center justify-center cursor-pointer font-bold px-1 py-1 md:px-6 md:py-3 rounded-full transition-colors ${
                    isActive ? 'text-brand-accent' : 'text-brand-muted hover:text-white'
                  }`;

              return item.isRouterLink ? (
                <Link key={item.name} to={item.url} onClick={() => { setActiveTab(item.name); scrollToTop(); }} className={className}>
                  {content}
                </Link>
              ) : (
                <a key={item.name} href={item.url} onClick={() => { setActiveTab(item.name); scrollToTop(); }} className={className}>
                  {content}
                </a>
              );
            })}
          </div>

          {/* Divider */}
          <div className="w-px h-6 sm:h-8 bg-white/10 hidden sm:block"></div>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:pl-1 sm:pr-2">
             <Link
              to="/join-us"
              onClick={scrollToTop}
              className="flex items-center justify-center w-10 h-10 md:w-auto md:h-auto md:px-[24px] md:py-[12px] rounded-full border border-brand-accent text-brand-accent text-[13px] uppercase tracking-[2px] hover:bg-brand-accent hover:text-brand-bg transition-colors duration-300 font-sans font-black whitespace-nowrap"
              title="Join Us"
            >
              <span className="hidden md:inline">Join Us</span>
              <UserPlus className="w-[18px] h-[18px] md:hidden" />
            </Link>
            
            <div className="hidden lg:flex items-center gap-1 ml-1">
              <button
                  onClick={toggleGestures}
                  className={`flex items-center justify-center w-[40px] h-[40px] rounded-full transition-all duration-300 ${
                    isGestureEnabled 
                      ? 'bg-brand-accent border-brand-accent text-brand-bg shadow-[0_0_15px_rgba(164,5,5,0.4)]' 
                      : 'bg-transparent border border-transparent text-brand-muted hover:border-brand-accent/30 hover:text-brand-accent'
                  }`}
                  title={isGestureEnabled ? "Disable Gestures" : "Enable Gestures"}
                >
                  <Hand className="w-[18px] h-[18px]" />
              </button>
              <button
                onClick={() => setIsGuideOpen(true)}
                className="flex items-center justify-center w-[40px] h-[40px] rounded-full border border-transparent text-brand-muted hover:border-brand-accent/30 hover:text-brand-accent transition-all duration-300"
                title="Gesture Guide"
              >
                <InfoIcon className="w-[18px] h-[18px]" />
              </button>
            </div>
          </div>

        </div>
      </div>
      <GestureGuideModal 
        isOpen={isGuideOpen} 
        onClose={() => setIsGuideOpen(false)} 
      />
    </>
  );
}
