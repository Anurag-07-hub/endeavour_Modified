import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const [isHidden, setIsHidden] = useState(false);
  const [cursorMode, setCursorMode] = useState<'normal' | 'enroll' | 'red' | 'white' | 'maroon'>('normal');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const lastTargetRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    setIsDarkMode(!isLight);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          const isLight = document.documentElement.getAttribute('data-theme') === 'light';
          setIsDarkMode(!isLight);
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateCursorState = (clientX: number, clientY: number) => {
      if (clientX < 0 || clientY < 0) return;
      const target = document.elementFromPoint(clientX, clientY) as HTMLElement;
      if (!target || !target.matches) return;
      
      const endeavourBanner = target.closest('#endeavour-banner');
      const isSameTarget = target === lastTargetRef.current;
      
      // We must evaluate if we are in the banner because position (clientX) matters.
      if (isSameTarget && !endeavourBanner) return;
      
      lastTargetRef.current = target;

      const isInput = target.matches('input, textarea, select');

      const systemOverride = target.closest('[data-cursor-system="true"]');
      if (systemOverride) {
         setIsHidden(true);
         setCursorMode('normal');
         return;
      }

      const hiddenOverride = target.closest('[data-cursor-hidden]');
      if (hiddenOverride) {
         const shouldHide = hiddenOverride.getAttribute('data-cursor-hidden') === 'true';
         if (shouldHide && !isInput) {
           setIsHidden(true);
           setCursorMode('normal');
           return;
         }
      }

      setIsHidden(isInput);

      let newMode: 'normal' | 'enroll' | 'red' | 'white' | 'maroon' = 'normal';

      if (target.closest('[data-cursor="enroll"]')) {
        newMode = 'enroll';
      } else {
        if (endeavourBanner) {
           const rect = endeavourBanner.getBoundingClientRect();
           const isHoveringRightSide = clientX > rect.left + rect.width * 0.4;
           if (isHoveringRightSide) {
             // Over the #27151B side
             newMode = 'red';
           } else {
             // Over the #C8102E side
             newMode = 'maroon';
           }
        }
      }

      setCursorMode(newMode);
    };

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      updateCursorState(e.clientX, e.clientY);
    };

    const handleScroll = () => {
      updateCursorState(cursorX.get(), cursorY.get());
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [cursorX, cursorY]);

  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null;
  }

  return (
    <>
      <style>{`
        body, *:not(input):not(textarea):not(select) {
          cursor: none !important;
        }
        [data-cursor-system="true"], [data-cursor-system="true"] * {
          cursor: auto !important;
        }
      `}</style>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <motion.div
          style={{ x: "-50%", y: "-50%" }}
          animate={{
            width: cursorMode === 'enroll' ? 100 : 16,
            height: cursorMode === 'enroll' ? 100 : 16,
            backgroundColor: cursorMode === 'enroll' ? (isDarkMode ? "rgba(0, 0, 0, 0.95)" : "rgba(255, 255, 255, 0.95)") : 
                             cursorMode === 'red' ? "#C8102E" :
                             cursorMode === 'maroon' ? "#27151B" :
                             cursorMode === 'white' ? "#ffffff" : "#E7B4B4",
            color: cursorMode === 'enroll' ? (isDarkMode ? "#ffffff" : "#000000") : "#ffffff",
            opacity: isHidden ? 0 : 1,
            scale: isHidden ? 0 : 1
          }}
          transition={{ type: "tween", duration: isHidden ? 0 : 0.35, ease: "easeOut" }}
          className={`rounded-full flex items-center justify-center overflow-hidden whitespace-nowrap font-bold tracking-widest text-xs shadow-xl ${cursorMode === 'white' ? 'shadow-black/20' : 'shadow-[#E7B4B4]/20'}`}
        >
          {cursorMode === 'enroll' && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, delay: 0.1, ease: "easeOut" }}
            >
              Enroll
            </motion.span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
