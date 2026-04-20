import { Mail, MapPin, Phone, Linkedin, Instagram, Facebook } from 'lucide-react';
import { FadeIn } from './FadeIn';
import { Link } from 'react-router-dom';


export function Footer() {
  return (
    <footer id="contact" className="bg-brand-bg border-t border-white/10 pt-[36px] pb-[24px]">
      <div className="max-w-[1024px] mx-auto px-[60px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[40px] mb-[28px]">

          <FadeIn direction="up" delay={0.3}>
            <div className="flex items-center gap-[12px] mb-6">
              <img
                src="https://www.endeavoursliet.in/images/mainlogo.png"
                alt="Endeavour Logo"
                referrerPolicy="no-referrer"
                className="w-[48px] h-auto object-contain drop-shadow-[0_0_6px_rgba(164,5,5,0.4)]"
              />
              <span className="font-sans font-black text-M uppercase tracking-[1px] text-brand-accent">
                ENDEAVOUR
              </span>
            </div>
            <p className="font-sans text-brand-muted text-[14px] leading-[1.6] mb-6">
              The official robotics club of Sant Longowal Institute of Engineering and Technology. Building the future, one robot at a time.
            </p>
            <div className="flex gap-[15px]">
              <a href="https://www.instagram.com/endeavoursliet/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-brand-accent hover:text-brand-bg hover:border-brand-accent transition-colors text-brand-muted shrink-0">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://www.facebook.com/endeavoursliet" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-brand-accent hover:text-brand-bg hover:border-brand-accent transition-colors text-brand-muted shrink-0">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/company/endeavoursliet/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-brand-accent hover:text-brand-bg hover:border-brand-accent transition-colors text-brand-muted shrink-0">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.3}>
            <h4 className="font-sans font-bold text-white mb-6 uppercase tracking-[2px] text-[12px]">Quick Links</h4>
            <ul className="space-y-[15px] text-brand-muted text-[12px] uppercase tracking-[1px] font-medium">
              <li><Link to="/about" className="hover:text-brand-accent transition-colors">About Us</Link></li>
              <li><a href="#events" className="hover:text-brand-accent transition-colors">Techfest</a></li>
              <li><a href="#events" className="hover:text-brand-accent transition-colors">Competitions</a></li>
              <li><a href="#gallery" className="hover:text-brand-accent transition-colors">Our Gallery</a></li>
            </ul>
          </FadeIn>

          <FadeIn direction="up" delay={0.3} className="lg:col-span-2">
            <h4 className="font-sans font-bold text-white mb-6 uppercase tracking-[2px] text-[12px]">Contact Us</h4>
            <div className="space-y-[15px]">
              <div className="flex items-start gap-[15px] text-brand-muted">
                <MapPin className="w-5 h-5 text-brand-accent shrink-0" />
                <p className="font-sans text-[14px] leading-[1.6]">
                  T&amp;P Block, SLIET, Longowal, Sangrur, Punjab 148106, India
                </p>
              </div>
              <div className="flex items-center gap-[15px] text-brand-muted">
                <Mail className="w-5 h-5 text-brand-accent shrink-0" />
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=endeavourinsliet@gmail.com" target="_blank" rel="noopener noreferrer" className="font-sans text-[14px] hover:text-brand-accent transition-colors">
                  endeavourinsliet@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-[15px] text-brand-muted">
                <Phone className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+919027042638" className="font-sans text-[14px] hover:text-brand-accent transition-colors">
                    Ashutosh Mehta : +91 9027042638
                  </a>
                  <a href="tel:+916201957167" className="font-sans text-[14px] hover:text-brand-accent transition-colors">
                    Anmol Ranjan : +91 6201957167
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>


        </div>

        <div className="h-px w-full bg-white/10 mb-[30px]"></div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-[20px] text-[12px] text-brand-muted uppercase tracking-[1px]">
          <p>&copy; {new Date().getFullYear()} Endeavour SLIET. All rights reserved.</p>
          <div className="flex gap-[20px]">
            <a href="#" className="hover:text-brand-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
