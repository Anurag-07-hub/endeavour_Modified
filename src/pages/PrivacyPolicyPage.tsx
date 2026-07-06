import { useEffect } from 'react';
import { motion } from 'framer-motion';

function TypewriterHeading({ text, className = "" }: { text: string; className?: string }) {
  const characters = text.split("");
  return (
    <span className={`inline-block ${className}`}>
      {characters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.05, delay: index * 0.03 }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export function PrivacyPolicyPage() {
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
          <TypewriterHeading text="Privacy Policy" />
        </h1>
        
        <div className="font-sans text-brand-muted leading-relaxed space-y-6">
          <p className="font-bold text-xs tracking-wider uppercase text-brand-accent">
            Effective Date: July 6, 2026 | Last Updated: July 6, 2026
          </p>
          
          <p className="text-base sm:text-lg">
            Welcome to <strong>Endeavour SLIET</strong> ("we," "our," or "us"). We are committed to protecting your privacy and ensuring transparency regarding how we handle your information. This Privacy Policy outlines our practices concerning the collection, use, and disclosure of information when you use our website.
          </p>
          
          <hr className="border-white/10 my-8" />
          
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wider">
              1. Information We Collect
            </h2>
            
            <div className="pl-4 border-l-2 border-brand-accent space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white uppercase tracking-wide">
                  A. Device Permissions (Camera & Hardware)
                </h3>
                <p>
                  To support certain interactive features, technical tasks, or augmented reality (AR) tools built into our platform, our website may request access to your device's <strong>Camera</strong>.
                </p>
                <ul className="list-disc pl-5 space-y-1 mt-1">
                  <li><strong>Purpose:</strong> Camera access is strictly used to process real-time visual data required by specific web applications on our site.</li>
                  <li><strong>Control:</strong> We do not record, store, or transmit your camera feed to our servers. All camera processing happens locally on your device. You can grant or revoke this permission at any time through your browser settings.</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white uppercase tracking-wide">
                  B. Information You Provide Voluntarily
                </h3>
                <p>
                  We collect information that you explicitly send to us, including:
                </p>
                <ul className="list-disc pl-5 space-y-1 mt-1">
                  <li>Contact details (Name, Email, Phone Number) when you use the contact options for club representatives.</li>
                  <li>Recruitment or application data when you submit forms through our "Join Us" portal.</li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white uppercase tracking-wide">
                  C. Automatically Collected Data
                </h3>
                <p>
                  Like most websites, we may collect basic technical data through log files and analytics tools:
                </p>
                <ul className="list-disc pl-5 space-y-1 mt-1">
                  <li>IP address, browser type, operating system, and referring URLs.</li>
                  <li>Interaction data (time spent on pages, buttons clicked).</li>
                </ul>
              </div>
            </div>
          </section>
          
          <hr className="border-white/10 my-8" />
          
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wider">
              2. How We Use Your Information
            </h2>
            <p>
              We use the collected information solely to:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Provide, maintain, and improve our website features.</li>
              <li>Process club applications and communicate with prospective members.</li>
              <li>Respond to inquiries sent to our official contact channels.</li>
            </ul>
          </section>
          
          <hr className="border-white/10 my-8" />
          
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wider">
              3. Data Storage and Security
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Local Processing:</strong> Any data accessed via device permissions (like the camera) is processed entirely client-side and is <strong>never stored</strong> by us.</li>
              <li><strong>General Data Security:</strong> We implement standard security measures to protect the personal information you submit via forms against unauthorized access, alteration, or disclosure.</li>
            </ul>
          </section>
          
          <hr className="border-white/10 my-8" />
          
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wider">
              4. Third-Party Services
            </h2>
            <p>
              Our website may include links to external platforms (such as social media handles or registration forms). We do not control and are not responsible for the privacy practices of third-party websites. We encourage you to review their respective privacy policies.
            </p>
          </section>
          
          <hr className="border-white/10 my-8" />
          
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wider">
              5. Contact Us
            </h2>
            <p>
              If you have any questions or concerns about this Privacy Policy or how your data is handled, please contact us at:
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
