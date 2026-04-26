import { motion, AnimatePresence, useScroll } from 'motion/react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Menu } from 'lucide-react';

export function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'instant' });

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
        <div className="max-w-[1024px] mx-auto px-4 sm:px-5 md:px-6 lg:px-4 py-3 md:py-5 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0 lg:-ml-[60px]">
            <motion.img
              src="https://www.endeavoursliet.in/images/mainlogo.png"
              alt="Endeavour Logo"
              className="w-[40px] sm:w-[48px] md:w-[52px] lg:w-[64px] h-auto object-contain drop-shadow-[0_0_5px_rgba(164,5,5,0.5)]"
              animate={{ y: [-3, 3, -3], rotate: [-2, 2, -2], scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
              referrerPolicy="no-referrer"
            />
            <span className="font-sans font-black text-[13px] sm:text-[14px] lg:text-[18px] uppercase tracking-[2px] lg:tracking-[4px] text-brand-accent hidden sm:inline">
              ENDEAVOUR
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-[16px] lg:gap-[28px]">
            {navLinks.map((link) =>
              link.isRouterLink ? (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={scrollToTop}
                  className={`text-[11px] lg:text-[13px] uppercase tracking-[1px] lg:tracking-[1.5px] font-bold transition-colors relative ${
                    location.pathname === link.href ? 'text-brand-accent' : 'text-brand-muted hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={scrollToTop}
                  className="text-[11px] lg:text-[13px] uppercase tracking-[1px] lg:tracking-[1.5px] font-bold text-brand-muted hover:text-white transition-colors relative"
                >
                  {link.name}
                </a>
              )
            )}
            <a
              href="#contact"
              onClick={scrollToTop}
              className="hidden lg:inline-block px-[20px] py-[9px] border border-brand-accent text-brand-accent text-[11px] uppercase tracking-[2px] hover:bg-brand-accent hover:text-brand-bg transition-colors duration-300 font-sans font-black whitespace-nowrap"
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

      {/* Full-screen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden flex flex-col bg-brand-bg overflow-hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Top bar inside overlay */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 shrink-0">
              <Link
                to="/"
                onClick={() => { scrollToTop(); setMobileOpen(false); }}
                className="flex items-center gap-2"
              >
                <img
                  src="https://www.endeavoursliet.in/images/mainlogo.png"
                  alt="Endeavour Logo"
                  className="w-[36px] h-auto object-contain"
                  referrerPolicy="no-referrer"
                />
                <span className="font-sans font-black text-[13px] uppercase tracking-[3px] text-brand-accent">
                  ENDEAVOUR
                </span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-10 h-10 flex items-center justify-center text-brand-muted hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Nav links — staggered reveal */}
            <nav className="flex flex-col flex-1 justify-center px-8 gap-0">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  className="overflow-hidden border-b border-white/5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                >
                  <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.07, ease: [0.76, 0, 0.24, 1] }}
                  >
                    {link.isRouterLink ? (
                      <Link
                        to={link.href}
                        onClick={() => { scrollToTop(); setMobileOpen(false); }}
                        className={`block py-5 text-[28px] font-black uppercase tracking-[-0.5px] transition-colors leading-none ${
                          location.pathname === link.href ? 'text-brand-accent' : 'text-white'
                        }`}
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        onClick={() => { scrollToTop(); setMobileOpen(false); }}
                        className="block py-5 text-[28px] font-black uppercase tracking-[-0.5px] text-white transition-colors leading-none"
                      >
                        {link.name}
                      </a>
                    )}
                  </motion.div>
                </motion.div>
              ))}

              {/* Join Us CTA */}
              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <a
                  href="#contact"
                  onClick={() => { scrollToTop(); setMobileOpen(false); }}
                  className="inline-block px-8 py-4 border-2 border-brand-accent text-brand-accent text-[13px] uppercase tracking-[3px] font-black hover:bg-brand-accent hover:text-white transition-colors duration-300"
                >
                  Join Us
                </a>
              </motion.div>
            </nav>

            {/* Bottom bar */}
            <div className="px-8 py-6 border-t border-white/10 shrink-0">
              <p className="text-[11px] text-brand-muted uppercase tracking-[2px]">EST. 2009 — SLIET LONGOWAL</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
