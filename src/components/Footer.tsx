import { Mail, MapPin, Phone, Linkedin, Instagram, Facebook } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { Link } from 'react-router-dom';
import { useCMS } from '../context/CMSContext';

export function Footer() {
  const { contactInfo } = useCMS();
  return (
    <footer id="contact" className="bg-brand-bg border-t border-white/10 pt-[36px] pb-[24px]">
      <div className="max-w-[1024px] mx-auto px-5 md:px-[60px]">
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
            <h4 className="font-sans font-bold text-white mb-5 md:mb-6 uppercase tracking-[2px] text-[12px]">Contact Us</h4>
            <div className="space-y-[12px] md:space-y-[15px]">
              <div className="flex items-start gap-[12px] md:gap-[15px] text-brand-muted">
                <MapPin className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                <p className="font-sans text-[13px] md:text-[14px] leading-[1.6] whitespace-pre-line">
                  {contactInfo.address}
                </p>
              </div>
              <div className="flex items-center gap-[12px] md:gap-[15px] text-brand-muted">
                <Mail className="w-5 h-5 text-brand-accent shrink-0" />
                <a href={`mailto:${contactInfo.email}`} className="font-sans text-[13px] md:text-[14px] hover:text-brand-accent transition-colors break-all">
                  {contactInfo.email}
                </a>
              </div>
              <div className="flex items-start gap-[12px] md:gap-[15px] text-brand-muted">
                <Phone className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                <div className="flex flex-col gap-2">
                  {contactInfo.phone && (
                    <a href={`tel:${contactInfo.phone}`} className="font-sans text-[13px] md:text-[14px] hover:text-brand-accent transition-colors block">
                      {contactInfo.phone}
                    </a>
                  )}
                  {contactInfo.contacts?.map((contact, idx) => (
                    contact.name && contact.phone ? (
                      <div key={idx} className="flex gap-2 items-center">
                        <span className="font-black text-[13px] text-white tracking-[0.5px]">{contact.name}:</span>
                        <a href={`tel:${contact.phone}`} className="font-sans text-[13px] md:text-[14px] hover:text-brand-accent transition-colors block">
                          {contact.phone}
                        </a>
                      </div>
                    ) : null
                  ))}
                </div>
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
