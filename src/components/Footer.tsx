import { Mail, MapPin, Phone, Linkedin, Instagram, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCMS } from '../context/CMSContext';
import { TiltCard } from './TiltCard';

export function Footer() {
  const { contactInfo } = useCMS();
  
  return (
    <footer id="contact" className="relative bg-[#a40505] pt-16 pb-8 overflow-hidden text-white">
      
      {/* Giant Tech Watermark (Lion/Gear Hybrid Concept) - Darker maroon and more visible */}
      <div className="absolute right-0 bottom-0 top-0 w-full md:w-[50%] opacity-[0.35] pointer-events-none z-0 flex items-center justify-end overflow-hidden">
        <svg viewBox="0 0 100 100" className="w-[140%] h-[140%] translate-x-[25%] md:translate-x-[20%] text-[#3a0000] fill-current">
          <circle cx="50" cy="50" r="32" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <circle cx="50" cy="50" r="18" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M 50 8 L 50 18 M 50 82 L 50 92 M 8 50 L 18 50 M 82 50 L 92 50" stroke="currentColor" strokeWidth="2.5" />
          <path d="M 20 20 L 27 27 M 73 73 L 80 80 M 20 73 L 27 66 M 73 20 L 80 27" stroke="currentColor" strokeWidth="2.5" />
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <path key={deg} d="M 50 14 L 50 5" stroke="currentColor" strokeWidth="3" transform={`rotate(${deg} 50 50)`} />
          ))}
          {/* Diagnostic Circuit Lines extending out of the gear */}
          <path d="M 50 18 A 32 32 0 0 1 82 50 L 95 50" stroke="currentColor" strokeWidth="1" fill="none" />
          <path d="M 50 82 A 32 32 0 0 1 18 50 L 5 50" stroke="currentColor" strokeWidth="1" fill="none" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1024px] mx-auto px-5 md:px-[60px]">
        
        {/* Main Grid split */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-12">

          {/* Left Column: Massive Fontfabric Specimen Header - Spans 5 columns */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              {/* Brand label - Further enlarged logo and text */}
              <div className="flex items-center gap-[18px] mb-6">
                <img
                  src="https://www.endeavoursliet.in/images/mainlogo.png"
                  alt="Endeavour Logo"
                  referrerPolicy="no-referrer"
                  className="w-[64px] h-auto object-contain brightness-0 invert filter drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                />
                <span className="font-sans font-black text-[22px] md:text-[24px] uppercase tracking-[5px] text-[#ffffff]">
                  ENDEAVOUR
                </span>
              </div>

              {/* Massive Bebas Neue Typography */}
              <h2 className="font-bebas text-[70px] sm:text-[95px] md:text-[110px] leading-[0.8] tracking-[-0.03em] font-bold text-[#ffffff] uppercase select-none">
                GET IN<br />
                <span className="text-white/80">TOUCH.</span>
              </h2>
            </div>

            <div>
              <p className="font-sans text-white/70 text-[13px] md:text-[14px] leading-[1.6] max-w-[360px] mb-6">
                The official robotics club of Sant Longowal Institute of Engineering and Technology. Building the future, one robot at a time.
              </p>
              
              {/* Social Channels - Brand colors by default, fades to white on hover/click */}
              <div className="flex gap-[12px]">
                <a 
                  href="https://www.instagram.com/endeavoursliet/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-[#E1306C] border border-[#E1306C] text-[#ffffff] shadow-[0_0_15px_rgba(225,48,108,0.3)] hover:bg-[#ffffff] hover:border-[#ffffff] hover:text-[#a40505] hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] active:bg-[#ffffff]/85 active:scale-95 transition-all duration-300 flex items-center justify-center hover:scale-105 shrink-0"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a 
                  href="https://www.facebook.com/endeavoursliet" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-[#1877F2] border border-[#1877F2] text-[#ffffff] shadow-[0_0_15px_rgba(24,119,242,0.3)] hover:bg-[#ffffff] hover:border-[#ffffff] hover:text-[#a40505] hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] active:bg-[#ffffff]/85 active:scale-95 transition-all duration-300 flex items-center justify-center hover:scale-105 shrink-0"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href="https://www.linkedin.com/company/endeavoursliet/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-[#0077B5] border border-[#0077B5] text-[#ffffff] shadow-[0_0_15px_rgba(0,119,181,0.3)] hover:bg-[#ffffff] hover:border-[#ffffff] hover:text-[#a40505] hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] active:bg-[#ffffff]/85 active:scale-95 transition-all duration-300 flex items-center justify-center hover:scale-105 shrink-0"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Middle Column: Vertical links column with legal links directly below - Spans 3 columns */}
          <div className="md:col-span-3 flex flex-col justify-between py-2 border-l md:border-l border-white/15 pl-6 md:pl-8">
            <div className="space-y-8">
              <div>
                <h4 className="font-mono text-[13px] text-[#ffffff]/45 tracking-widest uppercase mb-4 font-extrabold">EXPLORE</h4>
                <ul className="space-y-4 font-sans font-bold text-[16px] text-[#ffffff] uppercase tracking-wider">
                  <li><Link to="/about" className="hover:text-white/80 transition-colors">About Us</Link></li>
                  <li><a href="#events" className="hover:text-white/80 transition-colors">Techfest</a></li>
                  <li><a href="#events" className="hover:text-white/80 transition-colors">Competitions</a></li>
                  <li><a href="#gallery" className="hover:text-white/80 transition-colors">Our Gallery</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-mono text-[13px] text-[#ffffff]/45 tracking-widest uppercase mb-4 font-extrabold">LEGAL</h4>
                <div className="flex flex-col gap-3 text-[15px] text-[#ffffff]/90 uppercase tracking-wider font-bold">
                  <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean glassmorphic contact list with 3D TiltCard and white glare/blur shadow - Spans 4 columns */}
          <div className="md:col-span-4 flex flex-col gap-4">
            
            {/* Address */}
            <TiltCard className="p-5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_25px_rgba(255,255,255,0.12)] hover:bg-white/15 hover:border-white/40 hover:shadow-[0_0_35px_rgba(255,255,255,0.22)] transition-all duration-300 flex items-start gap-4 cursor-pointer">
              <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-[#ffffff]" />
              </div>
              <div>
                <div className="text-[11px] font-extrabold uppercase tracking-widest text-white/70 mb-1">Location</div>
                <p className="font-sans text-[15px] font-semibold leading-[1.5] text-[#ffffff]">
                  {contactInfo.address}
                </p>
              </div>
            </TiltCard>

            {/* Email */}
            <TiltCard className="p-5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_25px_rgba(255,255,255,0.12)] hover:bg-white/15 hover:border-white/40 hover:shadow-[0_0_35px_rgba(255,255,255,0.22)] transition-all duration-300 flex items-center gap-4 cursor-pointer">
              <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-[#ffffff]" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-extrabold uppercase tracking-widest text-white/70 mb-1">Email</div>
                <a href={`mailto:${contactInfo.email}`} className="font-sans text-[15px] font-semibold text-[#ffffff] hover:underline truncate block">
                  {contactInfo.email}
                </a>
              </div>
            </TiltCard>

            {/* Phone & Secondary Contacts */}
            <div className="flex flex-col gap-3">
              {contactInfo.phone && (
                <TiltCard className="p-5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_25px_rgba(255,255,255,0.12)] hover:bg-white/15 hover:border-white/40 hover:shadow-[0_0_35px_rgba(255,255,255,0.22)] transition-all duration-300 flex items-center gap-4 cursor-pointer">
                  <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-[#ffffff]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-extrabold uppercase tracking-widest text-white/70 mb-1">Phone</div>
                    <a href={`tel:${contactInfo.phone}`} className="font-sans text-[15px] font-semibold text-[#ffffff] hover:underline block">
                      {contactInfo.phone}
                    </a>
                  </div>
                </TiltCard>
              )}

              {contactInfo.contacts?.map((contact, idx) => (
                contact.name && contact.phone ? (
                  <TiltCard key={idx} className="p-5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_25px_rgba(255,255,255,0.12)] hover:bg-white/15 hover:border-white/40 hover:shadow-[0_0_35px_rgba(255,255,255,0.22)] transition-all duration-300 flex items-center gap-4 cursor-pointer">
                    <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-[#ffffff]" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-extrabold uppercase tracking-widest text-white/70 mb-1">
                        {contact.name}
                      </div>
                      <a href={`tel:${contact.phone}`} className="font-sans text-[15px] font-semibold text-[#ffffff] hover:underline block">
                        {contact.phone}
                      </a>
                    </div>
                  </TiltCard>
                ) : null
              ))}
            </div>

          </div>

        </div>

        {/* Footer Sub Bar with Copyright only */}
        <div className="border-t border-white/10 pt-6 mt-8 flex justify-center text-center">
          <p className="text-[12px] text-white/60 uppercase tracking-widest font-medium">
            &copy; {new Date().getFullYear()} Endeavour SLIET. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
