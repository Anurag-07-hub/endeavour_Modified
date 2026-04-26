import { motion } from 'motion/react';
import { useEffect } from 'react';
import { Roadmap } from '../components/Roadmap';

export function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-[90px] md:pt-[150px] pb-[60px] md:pb-[100px] bg-black/30 min-h-screen">
      <div className="max-w-[1024px] mx-auto px-5 md:px-[60px]">
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ type: 'spring', damping: 20, stiffness: 50 }}
            className="mb-6"
          >
            <h2 className="font-sans text-[40px] md:text-[60px] font-black uppercase tracking-[-2px] text-white leading-[1]">
              About <span className="text-brand-accent">Us</span>
            </h2>
          </motion.div>
          <div className="h-[2px] w-[60px] bg-brand-accent mb-12"></div>
          
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ type: 'spring', damping: 20, stiffness: 50 }}
          >
            <p className="text-[16px] md:text-[18px] text-brand-muted leading-[1.8] font-sans md:pl-20 border-l border-white/10 md:border-transparent">
              Endeavour is a robotics team based in SLIET, Punjab. It has had its presence in the national robotics scene for the past half a decade, over years the team has worked on projects such as E-yantra (Bombay), TEQIP (GOI &amp; World bank), SAE Aero Design Challenge, and other projects for social welfare, the team has also participated in several prestigious events held at premier institutions in our country, the team has participated at Techfest (IIT Bombay), ABU ROBOCON, Indian drone racing league (IIT Delhi &amp; VIT Vellore), APOGEE (BITS Pilani), Technex (IIT BHU), Techkriti (IIT Kanpur) and Advitya (IIT Ropar) to name a few. The team has brought many laurels to the college proving its excellence. The team provides a platform where one can bridge the gap between theoretical and practical knowledge. When the world stalled, we were still able to make progress with our continued efforts and hard work. We strive to create a difference.
            </p>
          </motion.div>
        </div>

        <div>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ type: 'spring', damping: 20, stiffness: 50 }}
            className="mb-6"
          >
            <h2 className="font-sans text-[40px] md:text-[60px] font-black uppercase tracking-[-2px] text-white leading-[1]">
              Our <span className="text-brand-accent">Mission</span>
            </h2>
          </motion.div>
          <div className="h-[2px] w-[60px] bg-brand-accent mb-12"></div>
          
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
  );
}
