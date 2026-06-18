import { motion } from 'motion/react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
  splitBy?: 'word' | 'character';
}

export function AnimatedText({ text, className = '', once = true, delay = 0, splitBy = 'word' }: AnimatedTextProps) {
  // Split text into words or characters for animation
  const items = splitBy === 'word' ? text.split(' ') : text.split('');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: splitBy === 'word' ? 0.08 : 0.03, delayChildren: delay },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 40,
      transition: {
        type: 'spring' as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className={`flex ${splitBy === 'word' ? 'flex-wrap' : 'flex-nowrap whitespace-nowrap'} ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-50px' }}
    >
      {items.map((item, index) => (
        <span 
          key={index} 
          className="overflow-visible" 
          style={{ 
            display: 'inline-flex',
            marginRight: splitBy === 'word' ? '0.25em' : '0em',
            paddingBottom: '0.1em' 
          }}
        >
          <motion.span variants={child} style={{ display: 'inline-block' }}>
            {item === ' ' ? '\u00A0' : item}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}
