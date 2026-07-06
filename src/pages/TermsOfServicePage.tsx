import { useEffect } from 'react';
import { motion } from 'framer-motion';

export function TermsOfServicePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      className="min-h-screen bg-brand-bg text-white pt-28 pb-16 px-5 relative z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-[800px] mx-auto">
        <h1 className="font-bebas text-5xl md:text-7xl text-brand-accent tracking-wide mb-8">
          Terms of Service
        </h1>
        
        <div className="font-sans text-brand-muted leading-relaxed space-y-6">
          <p className="font-bold text-xs tracking-wider uppercase text-brand-accent">
            Effective Date: July 6, 2026 | Last Updated: July 6, 2026
          </p>
          
          <p className="text-base sm:text-lg">
            Welcome to <strong>Endeavour SLIET</strong> ("we," "our," or "us"). By accessing or using our website, you agree to comply with and be bound by the following Terms of Service. If you do not agree to these terms, please do not use our website.
          </p>
          
          <hr className="border-white/10 my-8" />
          
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wider">
              1. Use of the Site & Interactive Features
            </h2>
            <p>
              Our website provides information about the robotics club, simulators, events, and recruitment details. You agree to use the site only for lawful purposes and in a manner that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the site.
            </p>
          </section>
          
          <hr className="border-white/10 my-8" />
          
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wider">
              2. Device Permissions (Camera & Hardware)
            </h2>
            <p>
              To support certain interactive features, technical tasks, or augmented reality (AR) tools built into our platform, our website may request access to your device's <strong>Camera</strong>.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Purpose:</strong> Camera access is strictly used to process real-time visual data required by specific web applications on our site.</li>
              <li><strong>Control:</strong> We do not record, store, or transmit your camera feed to our servers. All camera processing happens locally on your device. You can grant or revoke this permission at any time through your browser settings.</li>
            </ul>
          </section>
          
          <hr className="border-white/10 my-8" />
          
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wider">
              3. Information and Data Collection
            </h2>
            <p>
              By using our website, you acknowledge that we collect data in accordance with our Privacy Policy. This includes:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Information you provide voluntarily (e.g. contact forms, application forms).</li>
              <li>Automatically collected technical and interaction data.</li>
            </ul>
          </section>
          
          <hr className="border-white/10 my-8" />
          
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wider">
              4. Intellectual Property
            </h2>
            <p>
              All content on this website, including but not limited to text, graphics, logos, images, code, 3D models, and simulator software, is the property of <strong>Endeavour SLIET</strong> and is protected by copyright and intellectual property laws. You may not reproduce, distribute, or modify any content without explicit written permission.
            </p>
          </section>
          
          <hr className="border-white/10 my-8" />
          
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wider">
              5. Disclaimers & Limitation of Liability
            </h2>
            <p>
              The website and simulator software are provided on an "as is" and "as available" basis without warranties of any kind. We do not guarantee that the site will be error-free, secure, or continuously available. Under no circumstances shall Endeavour SLIET be liable for any damages resulting from the use or inability to use this website.
            </p>
          </section>
          
          <hr className="border-white/10 my-8" />
          
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wider">
              6. Contact Us
            </h2>
            <p>
              If you have any questions or concerns about these Terms of Service, please contact us at:
            </p>
            <div className="bg-brand-accent/5 border border-brand-accent/15 p-5 rounded-2xl mt-4 space-y-3">
              <p><strong>Email:</strong> <a href="mailto:endeavourinsliet@gmail.com" className="text-brand-accent hover:underline">endeavourinsliet@gmail.com</a></p>
              <p><strong>Address:</strong> IIC, T&P Block, SLIET, Longowal, Punjab, 148106</p>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}
