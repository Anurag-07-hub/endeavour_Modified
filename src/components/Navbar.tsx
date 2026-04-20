import { motion, useScroll } from 'motion/react';
import { Bot } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const navLinks = [
    { name: 'Home', href: '/', isRouterLink: true },
    { name: 'About', href: '/about', isRouterLink: true },
    { name: 'Team', href: '/team', isRouterLink: true },
    { name: 'Events', href: '/#events', isRouterLink: false },
    { name: 'Gallery', href: '/#gallery', isRouterLink: false },
    { name: 'Contact', href: '#contact', isRouterLink: false },
    { name: 'Documentation', href: '/documentation', isRouterLink: true },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${isScrolled ? 'bg-brand-bg/90 backdrop-blur-md border-b border-white/10' : 'bg-brand-bg/60 backdrop-blur-sm border-b border-white/5'
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="max-w-[1024px] mx-auto px-[15px] py-[30px] flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4 group -ml-[30px] md:-ml-[90px]">
          <motion.img
            src="https://www.endeavoursliet.in/images/mainlogo.png"
            alt="Endeavour Logo"
            className="w-[80px] h-auto object-contain drop-shadow-[0_0_5px_rgba(164,5,5,0.5)]"
            animate={{
              y: [-3, 3, -3],
              rotate: [-2, 2, -2],
              scale: [1, 1.05, 1]
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut"
            }}
            referrerPolicy="no-referrer"
          />
          <span className="font-sans font-black text-[20px] uppercase tracking-[4px] text-brand-accent">
            ENDEAVOUR
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-[28px]">
          {navLinks.map((link) => (
            link.isRouterLink ? (
              <Link
                key={link.name}
                to={link.href}
                className={`text-[13px] uppercase tracking-[1.5px] font-bold transition-opacity relative ${location.pathname === link.href ? 'text-brand-accent' : 'text-brand-muted hover:text-white'}`}
              >
                {link.name}
              </Link>
            ) : (
              <a
                key={link.name}
                href={link.href}
                className="text-[13px] uppercase tracking-[1.5px] font-bold text-brand-muted hover:text-white transition-opacity relative"
              >
                {link.name}
              </a>
            )
          ))}
          <a
            href="#contact"
            className="hidden lg:inline-block px-[30px] py-[12px] border border-brand-accent text-brand-accent text-[12px] uppercase tracking-[2px] hover:bg-brand-accent hover:text-brand-bg transition-colors duration-300"
          >
            Join Us
          </a>
        </nav>
      </div>
    </motion.header>
  );
}

