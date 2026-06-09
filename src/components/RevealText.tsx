import { motion, useInView } from "motion/react";
import { useState, useEffect, useRef } from "react";

interface RevealTextProps {
  text?: string;
  className?: string;
  textColor?: string;
  overlayColor?: string;
  letterDelay?: number;
  overlayDelay?: number;
  overlayDuration?: number;
  springDuration?: number;
  letterImages?: string[];
  accentWords?: string[];
}

export function RevealText({
  text = "Empowering the innovators of tomorrow.",
  className = "",
  textColor = "text-white",
  overlayColor = "text-brand-accent",
  letterDelay = 0.03, // Faster for long sentences
  overlayDelay = 0.02,
  overlayDuration = 0.4,
  springDuration = 400,
  accentWords = ["tomorrow."],
  letterImages = [
    "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  ]
}: RevealTextProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showRedText, setShowRedText] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.5 });
  
  useEffect(() => {
    if (!isInView) return;
    
    // Calculate when the last letter animation completes
    const totalLetters = text.replace(/\s/g, '').length;
    const lastLetterDelay = (totalLetters - 1) * letterDelay;
    const totalDelay = (lastLetterDelay * 1000) + springDuration;
    
    const timer = setTimeout(() => {
      setShowRedText(true);
    }, totalDelay);
    
    return () => clearTimeout(timer);
  }, [isInView, text, letterDelay, springDuration]);

  const words = text.split(" ");
  let globalLetterIndex = 0;

  return (
    <h2 ref={containerRef} className={`flex flex-wrap ${className}`}>
      {words.map((word, wordIndex) => {
        const isAccent = accentWords.some(aw => word.toLowerCase().includes(aw.toLowerCase()));
        const colorClass = isAccent ? "text-brand-accent" : textColor;

        return (
          <span key={wordIndex} className="inline-flex mr-[0.3em] mb-[0.1em]">
            {word.split("").map((letter, letterIdx) => {
              const index = globalLetterIndex++;
              
              return (
                <motion.span
                  key={index}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="relative overflow-hidden cursor-pointer"
                  initial={{ 
                    y: 20,
                    opacity: 0,
                  }}
                  animate={isInView ? { 
                    y: 0,
                    opacity: 1,
                  } : {
                    y: 20,
                    opacity: 0,
                  }}
                  transition={{
                    delay: index * letterDelay,
                    type: "spring",
                    damping: 20,     // Increased damping to reduce bobble significantly
                    stiffness: 120,  // Lower stiffness for a smoother rise
                    mass: 0.8,
                  }}
                >
                  {/* Base text layer */}
                  <motion.span 
                    className={`block ${colorClass}`}
                    animate={{ 
                      opacity: hoveredIndex === index ? 0 : 1 
                    }}
                    transition={{ duration: 0.1 }}
                  >
                    {letter}
                  </motion.span>
                  
                  {/* Image text layer with background panning */}
                  <motion.span
                    className="absolute inset-0 text-transparent bg-clip-text bg-cover bg-no-repeat"
                    animate={{ 
                      opacity: hoveredIndex === index ? 1 : 0,
                      backgroundPosition: hoveredIndex === index ? "10% center" : "0% center"
                    }}
                    transition={{ 
                      opacity: { duration: 0.1 },
                      backgroundPosition: { 
                        duration: 3,
                        ease: "easeInOut"
                      }
                    }}
                    style={{
                      backgroundImage: `url('${letterImages[index % letterImages.length]}')`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {letter}
                  </motion.span>
                  
                  {/* Overlay text layer that sweeps across each letter */}
                  {showRedText && (
                    <motion.span
                      className={`absolute inset-0 ${overlayColor} pointer-events-none`}
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: [0, 1, 1, 0]
                      }}
                      transition={{
                        delay: index * overlayDelay,
                        duration: overlayDuration,
                        times: [0, 0.1, 0.7, 1],
                        ease: "easeInOut"
                      }}
                    >
                      {letter}
                    </motion.span>
                  )}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </h2>
  );
}
