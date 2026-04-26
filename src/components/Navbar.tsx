import { motion, AnimatePresence, useScroll } from 'motion/react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Menu } from 'lucide-react';

export function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', href: '/', isRouterLink: true },
    { name: 'About', href: '/about', isRouterLink: true },
    { name: 'Team', href: '/team', isRouterLink: true },
    { name: 'Events', href: '/#events', isRouterLink: false },
    { name: 'Gallery', href: '/gallery', isRouterLink: true },
    { name: 'Contact', href: '#contact', isRouterLink: false },
    { name: 'Documentation', href: '/documentation', isRouterLink: true },
  ];

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isScrolled ? 'bg-brand-bg/95 backdrop-blur-md border-b border-white/10' : 'bg-brand-bg/60 backdrop-blur-sm border-b border-white/5'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="max-w-[1024px] mx-auto px-5 md:px-6 py-4 md:py-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.img
              src="https://www.endeavoursliet.in/images/mainlogo.png"
              alt="Endeavour Logo"
              className="w-[56px] md:w-[72px] h-auto object-contain drop-shadow-[0_0_5px_rgba(164,5,5,0.5)]"
              animate={{ y: [-3, 3, -3], rotate: [-2, 2, -2], scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
              referrerPolicy="no-referrer"
            />
            <span className="font-sans font-black text-[16px] md:text-[20px] uppercase tracking-[3px] md:tracking-[4px] text-brand-accent">
              ENDEAVOUR
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-[24px] lg:gap-[32px]">
            {navLinks.map((link) =>
              link.isRouterLink ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-[13px] uppercase tracking-[1.5px] font-bold transition-colors relative ${
                    location.pathname === link.href ? 'text-brand-accent' : 'text-brand-muted hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-[13px] uppercase tracking-[1.5px] font-bold text-brand-muted hover:text-white transition-colors relative"
                >
                  {link.name}
                </a>
              )
            )}
            <a
              href="#contact"
              className="hidden lg:inline-block px-[24px] py-[10px] border border-brand-accent text-brand-accent text-[12px] uppercase tracking-[2px] hover:bg-brand-accent hover:text-brand-bg transition-colors duration-300 font-sans font-black whitespace-nowrap"
            >
              Join Us
            </a>
          </nav>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 text-brand-muted hover:text-brand-accent transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide-in panel */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-[75vw] max-w-[320px] bg-brand-bg border-l border-white/10 z-50 flex flex-col md:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 200 }}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <span className="font-sans font-black text-[14px] uppercase tracking-[3px] text-brand-accent">
                  MENU
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-9 h-9 flex items-center justify-center text-brand-muted hover:text-brand-accent transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Links */}
              <nav className="flex flex-col px-6 py-8 gap-1 flex-1">
                {navLinks.map((link, i) =>
                  link.isRouterLink ? (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i }}
                    >
                      <Link
                        to={link.href}
                        className={`block py-4 text-[15px] uppercase tracking-[2px] font-bold border-b border-white/5 transition-colors ${
                          location.pathname === link.href ? 'text-brand-accent' : 'text-brand-muted hover:text-white'
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i }}
                    >
                      <a
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block py-4 text-[15px] uppercase tracking-[2px] font-bold border-b border-white/5 text-brand-muted hover:text-white transition-colors"
                      >
                        {link.name}
                      </a>
                    </motion.div>
                  )
                )}
              </nav>

              {/* Footer of drawer */}
              <div className="px-6 py-6 border-t border-white/10">
                <p className="text-[11px] text-brand-muted uppercase tracking-[1px]">EST. 2009 — SLIET LONGOWAL</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
