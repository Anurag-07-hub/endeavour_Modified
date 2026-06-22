import { Mail, MapPin, Phone, Linkedin, Instagram, Facebook } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { Link } from 'react-router-dom';
import { useCMS } from '../context/CMSContext';
import { useRef } from 'react';
import { useInView } from 'motion/react';
import { motion } from 'framer-motion';

export function Footer() {
  const { contactInfo } = useCMS();
  const contactRef = useRef(null);
  const isContactInView = useInView(contactRef, { once: false, amount: 0.5 });
  return (
    <footer id="contact" className="relative bg-brand-bg border-t border-white/10 pt-[36px] pb-[24px] overflow-hidden">
      
      {/* Animated Motion Graphics Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center">
        {/* Animated glowing orbs */}
        <motion.div
          animate={{
            x: ['-20%', '20%', '-10%', '-20%'],
            y: ['-10%', '20%', '10%', '-10%'],
            scale: [1, 1.2, 0.9, 1],
            opacity: [0.15, 0.25, 0.15, 0.15],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 left-0 w-[40vw] h-[40vw] bg-brand-accent rounded-full blur-[120px] mix-blend-screen"
        />
        <motion.div
          animate={{
            x: ['20%', '-20%', '10%', '20%'],
            y: ['20%', '-10%', '-20%', '20%'],
            scale: [0.9, 1.1, 1, 0.9],
            opacity: [0.1, 0.2, 0.1, 0.1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-0 right-0 w-[50vw] h-[50vw] bg-rose-600 rounded-full blur-[140px] mix-blend-screen"
        />
        {/* Subtle moving grid */}
        <motion.div
          animate={{
            backgroundPosition: ['0px 0px', '40px 40px'],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1024px] mx-auto px-5 md:px-[60px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[32px] md:gap-[40px] mb-[28px]">

          {/* Brand column */}
          <FadeIn direction="up" delay={0.3}>
            <div className="flex items-center gap-[12px] mb-5">
              <img
                src="https://www.endeavoursliet.in/images/mainlogo.png"
                alt="Endeavour Logo"
                referrerPolicy="no-referrer"
                className="w-[44px] md:w-[48px] h-auto object-contain drop-shadow-[0_0_6px_rgba(164,5,5,0.4)]"
              />
              <span className="font-sans font-black text-[14px] md:text-M uppercase tracking-[1px] text-brand-accent">
                ENDEAVOUR
              </span>
            </div>
            <p className="font-sans text-brand-muted text-[13px] md:text-[14px] leading-[1.6] mb-5">
              The official robotics club of Sant Longowal Institute of Engineering and Technology. Building the future, one robot at a time.
            </p>
            <div className="flex gap-[12px]">
              <a href="https://www.instagram.com/endeavoursliet/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-white/10 flex items-center justify-center hover:bg-brand-accent hover:text-brand-bg hover:border-brand-accent transition-colors text-brand-muted shrink-0">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://www.facebook.com/endeavoursliet" target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-white/10 flex items-center justify-center hover:bg-brand-accent hover:text-brand-bg hover:border-brand-accent transition-colors text-brand-muted shrink-0">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/company/endeavoursliet/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-white/10 flex items-center justify-center hover:bg-brand-accent hover:text-brand-bg hover:border-brand-accent transition-colors text-brand-muted shrink-0">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </FadeIn>

          {/* Quick Links */}
          <FadeIn direction="up" delay={0.3}>
            <h4 className="font-sans font-bold text-white mb-5 md:mb-6 uppercase tracking-[2px] text-[12px]">Quick Links</h4>
            <ul className="space-y-[12px] md:space-y-[15px] text-brand-muted text-[12px] uppercase tracking-[1px] font-medium">
              <li><Link to="/about" className="hover:text-brand-accent transition-colors">About Us</Link></li>
              <li><a href="#events" className="hover:text-brand-accent transition-colors">Techfest</a></li>
              <li><a href="#events" className="hover:text-brand-accent transition-colors">Competitions</a></li>
              <li><a href="#gallery" className="hover:text-brand-accent transition-colors">Our Gallery</a></li>
            </ul>
          </FadeIn>

          {/* Contact — spans full width on mobile, 2 cols on lg */}
          <FadeIn direction="up" delay={0.5} className="sm:col-span-2 lg:col-span-2">
            <div ref={contactRef} className="relative group/contact">
              {/* Subtle animated background glow */}
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-brand-accent/0 via-brand-accent/5 to-brand-accent/0 rounded-2xl blur-xl opacity-0 group-hover/contact:opacity-100 transition-opacity duration-1000"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                style={{ backgroundSize: '200% 200%' }}
              />
              
              <h4 className="relative font-sans font-bold text-white mb-5 md:mb-6 uppercase tracking-[2px] text-[12px]">Contact Us</h4>
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                
                {/* Address Card */}
                <motion.div 
                  whileHover={{ y: -2, scale: 1.01 }}
                  className="col-span-1 md:col-span-2 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-brand-accent/30 hover:bg-white/[0.04] transition-all duration-300 group/card flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-accent/10 flex items-center justify-center shrink-0 group-hover/card:bg-brand-accent/20 transition-colors">
                    <MapPin className="w-4 h-4 text-brand-accent" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-1">Location</div>
                    <p className="font-sans text-[13px] leading-[1.6] whitespace-pre-line text-white/90">
                      {contactInfo.address}
                    </p>
                  </div>
                </motion.div>

                {/* Email Card */}
                <motion.div 
                  whileHover={{ y: -2, scale: 1.02 }}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-brand-accent/30 hover:bg-white/[0.04] transition-all duration-300 group/card flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-brand-accent/10 flex items-center justify-center shrink-0 group-hover/card:bg-brand-accent/20 transition-colors">
                    <Mail className="w-4 h-4 text-brand-accent" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-1">Email</div>
                    <a href={`mailto:${contactInfo.email}`} className="font-sans text-[13px] text-white/90 hover:text-brand-accent transition-colors truncate block">
                      {contactInfo.email}
                    </a>
                  </div>
                </motion.div>

                {/* Phone Card */}
                {contactInfo.phone && (
                  <motion.div 
                    whileHover={{ y: -2, scale: 1.02 }}
                    className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-brand-accent/30 hover:bg-white/[0.04] transition-all duration-300 group/card flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-brand-accent/10 flex items-center justify-center shrink-0 group-hover/card:bg-brand-accent/20 transition-colors">
                      <Phone className="w-4 h-4 text-brand-accent" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-1">Phone</div>
                      <a href={`tel:${contactInfo.phone}`} className="font-sans text-[13px] text-white/90 hover:text-brand-accent transition-colors block">
                        {contactInfo.phone}
                      </a>
                    </div>
                  </motion.div>
                )}

                {/* Additional Contacts */}
                {contactInfo.contacts?.map((contact, idx) => (
                  contact.name && contact.phone ? (
                    <motion.div 
                      key={idx}
                      whileHover={{ y: -2, scale: 1.02 }}
                      className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-brand-accent/30 hover:bg-white/[0.04] transition-all duration-300 group/card flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded-lg bg-brand-accent/10 flex items-center justify-center shrink-0 group-hover/card:bg-brand-accent/20 transition-colors">
                        <Phone className="w-4 h-4 text-brand-accent" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-1">
                          {contact.name}
                        </div>
                        <a href={`tel:${contact.phone}`} className="font-sans text-[13px] text-white/90 hover:text-brand-accent transition-colors block">
                          {contact.phone}
                        </a>
                      </div>
                    </motion.div>
                  ) : null
                ))}

              </div>
            </div>
          </FadeIn>

        </div>

        <div className="h-px w-full bg-white/10 mb-[24px]"></div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-[14px] text-[11px] md:text-[12px] text-brand-muted uppercase tracking-[1px]">
          <p>&copy; {new Date().getFullYear()} Endeavour SLIET. All rights reserved.</p>
          <div className="flex gap-[16px] md:gap-[20px]">
            <a href="#" className="hover:text-brand-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
