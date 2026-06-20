import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Roadmap } from '../components/Roadmap';
import { TextReveal } from '../components/TextReveal';
import { EndeavourScene } from '../components/EndeavourScene';

export function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const headerY = useTransform(scrollYProgress, [0, 0.5], [0, -200]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      ref={containerRef} 
      className="bg-black/30 relative origin-center"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      
      {/* Sticky Hero */}
      <div className="h-screen sticky top-0 flex flex-col items-center justify-center overflow-hidden z-0 bg-black">

        <motion.div 
          style={{ y: headerY, opacity: headerOpacity }}
          className="text-center px-5 relative z-10 w-full"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <span className="font-mono text-brand-accent uppercase tracking-[4px] text-[14px] md:text-[16px]">Who We Are</span>
          </motion.div>
          
          <h1 className="font-sans text-[60px] md:text-[120px] lg:text-[180px] font-black uppercase tracking-[-3px] md:tracking-[-8px] leading-[0.85] text-white">
            OUR <br /> 
            <TextReveal 
              text="STORY" 
              color="#ef4444"
              hoverColor="#ef4444"
              className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-red-600 italic pr-4" 
            />
          </h1>
        </motion.div>
      </div>

      {/* Big Endeavour Logo */}
      <EndeavourScene />

      {/* Canva Style About Us Content */}
      <div className="relative z-10 bg-black pt-[60px] md:pt-[100px] pb-[60px] md:pb-[100px] overflow-hidden -mt-[50px]">
        
        {/* Scattered Scrapbook Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <motion.img 
            src="/sketch_building_1781800055729.png" 
            alt="Building Sketch"
            animate={{ y: [-20, 20, -20] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[60%] right-[-5%] w-[50vw] max-w-[500px] opacity-[0.85] mix-blend-multiply"
          />
          <motion.img 
            src="/sketch_robotics_1781800069244.png" 
            alt="Robotics Sketch"
            animate={{ y: [20, -20, 20] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-[35%] left-[-10%] w-[45vw] max-w-[450px] opacity-[0.8] mix-blend-multiply"
          />
          <motion.img 
            src="/sketch_trophy_1781800226405.png" 
            alt="Trophy Sketch"
            animate={{ y: [-15, 15, -15], rotate: [-5, 5, -5] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[5%] left-[5%] w-[35vw] max-w-[350px] opacity-[0.9] mix-blend-multiply"
          />
        </div>

        <div className="relative z-10 max-w-[1024px] mx-auto px-5 md:px-[60px]">
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ type: 'spring', damping: 20, stiffness: 50 }}
              className="mb-12"
            >
              <h2 className="font-sans text-[40px] md:text-[60px] font-black uppercase tracking-[-2px] text-white leading-[1]">
                About <span className="text-brand-accent">Us</span>
              </h2>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ type: 'spring', damping: 20, stiffness: 50 }}
            >
              <p className="text-[16px] md:text-[18px] text-brand-muted leading-[1.8] font-sans md:pl-20 border-l border-white/10 md:border-transparent">
                Endeavour is a robotics team based in SLIET, Punjab. It has had its presence in the national robotics scene for the past half a decade, over years the team has worked on projects such as E-yantra (Bombay), TEQIP (GOI &amp; World bank), SAE Aero Design Challenge, and other projects for social welfare. The team has also participated in several prestigious events held at premier institutions in our country, including Techfest (IIT Bombay), ABU ROBOCON, Indian drone racing league (IIT Delhi &amp; VIT Vellore), APOGEE (BITS Pilani), Technex (IIT BHU), Techkriti (IIT Kanpur) and Advitya (IIT Ropar) to name a few. The team has brought many laurels to the college proving its excellence. We provide a platform where one can bridge the gap between theoretical and practical knowledge. When the world stalled, we were still able to make progress with our continued efforts and hard work. We strive to create a difference.
              </p>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ type: 'spring', damping: 20, stiffness: 50 }}
              className="mb-12"
            >
              <h2 className="font-sans text-[40px] md:text-[60px] font-black uppercase tracking-[-2px] text-white leading-[1]">
                Our <span className="text-brand-accent">Mission</span>
              </h2>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ type: 'spring', damping: 20, stiffness: 50 }}
            >
              <p className="text-[16px] md:text-[18px] text-brand-muted leading-[1.8] font-sans md:pr-20 border-r border-white/10 md:border-transparent text-right md:text-left">
                The team was initially started to reinforce the technical prospect of students, enabling them to become refined concocts having knowledge of diverse fields. Following the current trends, everyone is in hunt to become that polymath, who is capable of handling any work assigned. So for this, what will be better than working in the field of robotics. A field that needs no introduction where people from varied backgrounds come and work in harmony, contribute their part and learn in reciprocation. Robotics is the collective implementation of latest technologies &amp; using it for our ease that certainly requires profound technical expertise. According to a survey conducted by a reputed firm, around 80% of engineers are not employable for the industry. These statistics don't need any explanation as such, so our initiative is just a contribution to bring a change &amp; enhance the technical calibre of engineering graduates.
              </p>
            </motion.div>
          </div>
        </div>
        
        <Roadmap />
      </div>
    </motion.div>
  );
}
