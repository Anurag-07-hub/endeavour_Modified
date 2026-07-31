import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Compass, Users, Calendar, Image, UserPlus, Sun, Moon, Menu as MenuIcon, X } from 'lucide-react';
import { LiquidMorphButton } from './LiquidMorphButton';
import { LetsBeginTransition } from './LetsBeginTransition';

const navItems = [
  { name: 'Home', url: '/', icon: Home, isRouterLink: true },
  { name: 'About', url: '/about', icon: Compass, isRouterLink: true },
  { name: 'Team', url: '/team', icon: Users, isRouterLink: true },
  { name: 'Domains', url: '/domains', icon: Calendar, isRouterLink: true },
  { name: 'Gallery', url: '/gallery', icon: Image, isRouterLink: true },
];


export function Navbar() {
  const [activeTab, setActiveTab] = useState(navItems[0].name);
  const location = useLocation();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    setIsDarkMode(!isLight);
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  };

  useEffect(() => {
    const current = navItems.find(item => item.url === location.pathname || item.url === location.hash);
    if (current) {
      setActiveTab(current.name);
    } else if (location.pathname === '/join-us') {
      setActiveTab('Register');
    }
  }, [location]);

  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const isIntersectingMap = {
      'endeavour-banner': false,
      'endeavour-scene': false,
      'explore-section': false,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target.id in isIntersectingMap) {
          isIntersectingMap[entry.target.id as keyof typeof isIntersectingMap] = entry.isIntersecting;
        }
      });
      handleScroll();
    }, {
      rootMargin: '-1px 0px -1px 0px'
    });

    const ids = ['endeavour-banner', 'endeavour-scene', 'explore-section'];

    const observeElements = () => {
      ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    };

    observeElements();

    const handleScroll = () => {
      let shouldHide = false;
      const vh = window.innerHeight;
      const scrollY = window.scrollY;

      if (location.pathname === '/') {
        if (scrollY > vh * 0.85 && scrollY < vh * 2.0) {
          shouldHide = true;
        }
      } else if (location.pathname === '/about') {
        if (scrollY > vh * 0.85 && scrollY < vh * 3.0) {
          shouldHide = true;
        }
      } else if (location.pathname === '/domains') {
        if (scrollY > vh * 0.85 && scrollY < vh * 2.8) {
          shouldHide = true;
        }
      }

      if (isIntersectingMap['endeavour-banner'] || 
          isIntersectingMap['endeavour-scene'] || 
          isIntersectingMap['explore-section']) {
        shouldHide = true;
      }

      setIsHidden(shouldHide);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Slight delay to ensure elements are mounted and can be observed
    const timer = setTimeout(() => {
      observeElements();
      handleScroll();
    }, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [location.pathname]);

  const handleMobileNavClick = (tabName: string, path: string) => {
    setActiveTab(tabName);
    setIsDrawerOpen(false);
    
    if (tabName === 'About') {
      setIsTransitioning(true);
    } else {
      navigate(path);
    }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'instant' });

  return (
    <>
      {/* Desktop Glassmorphic Navbar (Hidden on mobile) */}
      <motion.div 
        id="main-navbar" 
        data-cursor-system="true" 
        initial={{ y: -80, x: "-50%", opacity: 0 }}
        animate={{ 
          y: isHidden ? -80 : 0, 
          x: "-50%", 
          opacity: isHidden ? 0 : 1,
          pointerEvents: isHidden ? 'none' : 'auto'
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 30,
          mass: 0.8
        }}
        className="fixed top-4 sm:top-6 left-1/2 z-50 w-max max-w-[calc(100%-16px)] sm:max-w-none hidden md:flex justify-center"
      >
        <div className="flex items-center gap-0.5 sm:gap-3 lg:gap-5 bg-brand-bg/40 dark:bg-black/25 border border-white/10 dark:border-white/5 backdrop-blur-3xl py-1.5 px-1.5 sm:py-2 sm:px-4 rounded-full shadow-[0_8px_32px_0_rgba(196,21,21,0.06),0_1px_1px_rgba(255,255,255,0.05)_inset,0_0_40px_rgba(0,0,0,0.1)] overflow-x-auto overflow-y-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] relative">
          
          {/* Logo */}
          <Link 
            to="/" 
            onClick={() => { setActiveTab('Home'); }} 
            className="flex items-center justify-center h-8 sm:h-auto px-2 sm:px-3 lg:px-4 shrink-0 rounded-full hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-300 group mr-1 sm:mr-2 cursor-pointer"
          >
             <motion.img 
               whileHover={{ scale: 1.1, rotate: 5 }}
               transition={{ type: "spring", stiffness: 400, damping: 10 }}
               src="https://www.endeavoursliet.in/images/mainlogo.png" 
               alt="Endeavour" 
               className="w-7 sm:w-[34px] h-auto object-contain filter brightness-125 saturate-110 drop-shadow-[0_0_10px_rgba(200,16,46,0.9)] z-10" 
             />
             <motion.div
               initial={{ width: 0, opacity: 0, marginLeft: 0 }}
               animate={{ width: "auto", opacity: 1, marginLeft: 12 }}
               transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
               className="hidden lg:flex overflow-hidden items-center shrink-0"
             >
                <motion.span 
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                  className="font-sans font-black text-[15px] uppercase tracking-[3px] text-brand-accent group-hover:text-black dark:group-hover:text-white transition-colors duration-300 whitespace-nowrap"
                >
                  ENDEAVOUR
                </motion.span>
             </motion.div>
          </Link>

          {/* Divider */}
          <div className="w-px h-6 sm:h-8 bg-white/10 shrink-0 hidden sm:block"></div>

          {/* Nav Items Container */}
          <div className="relative flex items-center shrink-0">
            
            {/* Background Gooey Layer */}
            <div className="absolute inset-0 pointer-events-none -z-10 overflow-visible" style={{ filter: 'url(#gooey-nav)' }}>
              <div className="flex items-center shrink-0 h-full">
                {navItems.map((item, index) => {
                  const isActive = activeTab === item.name;
                  const isHovered = hoveredIndex === index;

                  return (
                    <div 
                      key={`bg-${item.name}`} 
                      className="relative flex items-center justify-center px-1 py-1 md:px-5 md:py-2.5 select-none text-transparent"
                    >
                      <span className="hidden md:inline font-display text-[12px] lg:text-[13px] font-bold uppercase tracking-[2px] whitespace-nowrap">
                        {item.name}
                      </span>
                      <span className="md:hidden flex items-center justify-center w-6 h-6 shrink-0">
                        <item.icon size={12} />
                      </span>

                      {/* Active Liquid Blob */}
                      {isActive && (
                        <motion.div
                          layoutId="liquidActive"
                          className="absolute inset-0 bg-brand-accent rounded-full shadow-[0_0_15px_rgba(196,21,21,0.3)]"
                          transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 26
                          }}
                        />
                      )}

                      {/* Hover Liquid Blob */}
                      {isHovered && (
                        <motion.div
                          layoutId="liquidHover"
                          className="absolute inset-0 bg-brand-accent/20 dark:bg-white/15 rounded-full"
                          initial={{ scale: 0.85, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.85, opacity: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 24
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Foreground Interactive Text Layer */}
            <div 
              className="flex items-center shrink-0"
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeTab === item.name;

                const content = (
                  <>
                    <span className="hidden md:inline font-display text-[12px] lg:text-[13px] font-bold uppercase tracking-[2px] whitespace-nowrap relative z-10">
                      {item.name}
                    </span>
                    <span className="md:hidden flex items-center justify-center w-6 h-6 shrink-0 relative z-10">
                      <Icon size={12} strokeWidth={isActive ? 2.5 : 2} />
                    </span>
                  </>
                );

                const className = `relative flex items-center justify-center cursor-pointer px-1 py-1 md:px-5 md:py-2.5 rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'text-white font-bold' 
                    : 'text-brand-muted hover:text-white font-medium'
                }`;

                return (
                  <div
                    key={item.name}
                    onMouseEnter={() => setHoveredIndex(index)}
                    className="relative flex items-center"
                  >
                    {item.isRouterLink ? (
                      item.name === 'About' ? (
                        <button
                          onClick={() => {
                            setActiveTab(item.name);
                            setIsTransitioning(true);
                          }}
                          className={className}
                        >
                          {content}
                        </button>
                      ) : (
                        <Link to={item.url} onClick={() => { setActiveTab(item.name); }} className={className}>
                          {content}
                        </Link>
                      )
                    ) : (
                      <a href={item.url} onClick={() => { setActiveTab(item.name); }} className={className}>
                        {content}
                      </a>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

          {/* Divider */}
          <div className="w-px h-6 sm:h-8 bg-white/10 shrink-0 hidden sm:block"></div>

          {/* Actions */}
          <div className="flex items-center gap-1.5 sm:pl-1 sm:pr-2 shrink-0">
            <div className="flex items-center gap-1.5 mr-1 shrink-0">
              <motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 shrink-0 rounded-full bg-white/5 border border-white/10 dark:bg-white/5 dark:border-white/5 text-brand-muted hover:border-brand-accent/30 hover:text-brand-accent hover:bg-brand-accent/5 transition-all duration-300 cursor-pointer"
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {isDarkMode ? <Sun className="w-3 h-3 sm:w-[16px] sm:h-[16px]" /> : <Moon className="w-3 h-3 sm:w-[16px] sm:h-[16px]" />}
              </motion.button>
            </div>
            
            <LiquidMorphButton onClick={scrollToTop} />
          </div>

        </div>
      </motion.div>

      {/* Mobile Top Navigation Header Bar (< md) */}
      <div 
        className="md:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-brand-bg/85 border-b border-white/10 flex items-center justify-between px-4 transition-colors duration-500 backdrop-blur-md"
        style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.03)" }}
      >
        {/* Logo */}
        <Link 
          to="/" 
          onClick={() => { setActiveTab('Home'); }} 
          className="flex items-center gap-2 cursor-pointer"
        >
          <img 
            src="https://www.endeavoursliet.in/images/mainlogo.png" 
            alt="Endeavour" 
            className="w-8 h-auto object-contain filter brightness-110 saturate-110" 
          />
          <span className="font-sans font-black text-[14px] uppercase tracking-wider text-brand-accent">
            ENDEAVOUR
          </span>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Liquid Glassmorphic Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-[var(--color-glass-bg)] border border-[var(--color-glass-border)] text-[var(--color-glass-text)] shadow-[0_2px_8px_rgba(0,0,0,0.05)] backdrop-blur-md active:scale-95 transition-all duration-300 cursor-pointer"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          
          {/* Liquid Glassmorphic Hamburger Menu Toggle */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-[var(--color-glass-bg)] border border-[var(--color-glass-border)] text-[var(--color-glass-text)] shadow-[0_2px_8px_rgba(0,0,0,0.05)] backdrop-blur-md active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <MenuIcon size={16} />
          </button>
        </div>
      </div>

      {/* Slide-out Navigation Drawer (Mobile) */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Dark Dim Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-[55]"
            />

            {/* Slide Drawer Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 32 }}
              className="fixed inset-y-0 right-0 w-[280px] bg-brand-bg z-[60] border-l border-white/10 shadow-2xl flex flex-col justify-between py-6 px-6 transition-colors duration-500 pb-[calc(1.5rem+safe-area-inset-bottom)]"
            >
              {/* Top Section */}
              <div className="flex flex-col gap-6">
                
                {/* Header */}
                <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                  <div className="flex items-center gap-2">
                    <img 
                      src="https://www.endeavoursliet.in/images/mainlogo.png" 
                      alt="Endeavour Logo" 
                      className="w-8 h-auto filter brightness-110" 
                    />
                    <span className="font-sans font-black text-[14px] uppercase tracking-wider text-brand-accent">
                      ENDEAVOUR
                    </span>
                  </div>
                  <button 
                    onClick={() => setIsDrawerOpen(false)}
                    className="p-1 rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Navigation Links (Large Touch Targets) */}
                <nav className="flex flex-col gap-2">
                  <button
                    onClick={() => handleMobileNavClick('Home', '/')}
                    className={`flex items-center gap-4 px-4 py-3.5 rounded-xl w-full text-left font-sans font-bold text-[14px] tracking-wide uppercase transition-colors duration-200 ${
                      activeTab === 'Home' 
                        ? 'bg-brand-accent/10 text-brand-accent' 
                        : 'text-brand-muted hover:bg-white/5'
                    }`}
                  >
                    <Home size={18} />
                    Home
                  </button>

                  <button
                    onClick={() => handleMobileNavClick('About', '/about')}
                    className={`flex items-center gap-4 px-4 py-3.5 rounded-xl w-full text-left font-sans font-bold text-[14px] tracking-wide uppercase transition-colors duration-200 ${
                      activeTab === 'About' 
                        ? 'bg-brand-accent/10 text-brand-accent' 
                        : 'text-brand-muted hover:bg-white/5'
                    }`}
                  >
                    <Compass size={18} />
                    About
                  </button>

                  <button
                    onClick={() => handleMobileNavClick('Domains', '/domains')}
                    className={`flex items-center gap-4 px-4 py-3.5 rounded-xl w-full text-left font-sans font-bold text-[14px] tracking-wide uppercase transition-colors duration-200 ${
                      activeTab === 'Domains' 
                        ? 'bg-brand-accent/10 text-brand-accent' 
                        : 'text-brand-muted hover:bg-white/5'
                    }`}
                  >
                    <Calendar size={18} />
                    Domains
                  </button>

                  <button
                    onClick={() => handleMobileNavClick('Team', '/team')}
                    className={`flex items-center gap-4 px-4 py-3.5 rounded-xl w-full text-left font-sans font-bold text-[14px] tracking-wide uppercase transition-colors duration-200 ${
                      activeTab === 'Team' 
                        ? 'bg-brand-accent/10 text-brand-accent' 
                        : 'text-brand-muted hover:bg-white/5'
                    }`}
                  >
                    <Users size={18} />
                    Team
                  </button>

                  <button
                    onClick={() => handleMobileNavClick('Gallery', '/gallery')}
                    className={`flex items-center gap-4 px-4 py-3.5 rounded-xl w-full text-left font-sans font-bold text-[14px] tracking-wide uppercase transition-colors duration-200 ${
                      activeTab === 'Gallery' 
                        ? 'bg-brand-accent/10 text-brand-accent' 
                        : 'text-brand-muted hover:bg-white/5'
                    }`}
                  >
                    <Image size={18} />
                    Gallery
                  </button>

                  <button
                    onClick={() => handleMobileNavClick('Register', '/join-us')}
                    className={`flex items-center gap-4 px-4 py-3.5 rounded-xl w-full text-left font-sans font-bold text-[14px] tracking-wide uppercase transition-colors duration-200 ${
                      activeTab === 'Register' 
                        ? 'bg-brand-accent/10 text-brand-accent' 
                        : 'text-brand-muted hover:bg-white/5'
                    }`}
                  >
                    <UserPlus size={18} />
                    Register
                  </button>
                </nav>
              </div>

              {/* Bottom Actions inside Drawer */}
              <div className="flex flex-col gap-4 border-t border-neutral-100 pt-4">
                <button
                  onClick={toggleTheme}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-neutral-50 text-neutral-700 hover:bg-neutral-100 hover:text-black transition-colors cursor-pointer"
                >
                  <span className="font-sans font-semibold text-[13px] uppercase tracking-wide">
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                  </span>
                  {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {isTransitioning && (
        <LetsBeginTransition
          onComplete={() => {
            setIsTransitioning(false);
            navigate('/about', { state: { fromLetsBegin: true } });
          }}
        />
      )}

      {/* SVG Gooey Filter Definition */}
      <svg width="0" height="0" className="absolute animate-pulse" aria-hidden="true" focusable="false" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
        <defs>
          <filter id="gooey-nav">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -11" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
    </>
  );
}
