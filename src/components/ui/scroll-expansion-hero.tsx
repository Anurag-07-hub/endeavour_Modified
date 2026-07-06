import React, {
  useEffect,
  useRef,
  useState,
  ReactNode,
  TouchEvent,
  WheelEvent,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc?: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
  onClose?: () => void;
}

const ScrollExpandMedia = ({
  mediaType = 'image',
  mediaSrc,
  posterSrc,
  bgImageSrc = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1920&auto=format&fit=crop',
  title = "EXPLORE MEMORIES",
  date = "Gallery",
  scrollToExpand = "Scroll to Expand",
  textBlend = true,
  children,
  onClose,
}: ScrollExpandMediaProps) => {
  const [scrollStep, setScrollStep] = useState<number>(0); // 0, 1, 2
  const [showContent, setShowContent] = useState<boolean>(false);
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const lastInteractionTime = useRef<number>(0);

  // Lock body scroll when modal mounts
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  useEffect(() => {
    setScrollStep(0);
    setShowContent(false);
  }, [mediaType, mediaSrc]);

  useEffect(() => {
    const handleWheel = (e: globalThis.WheelEvent) => {
      const now = Date.now();
      const isAtTop = sectionRef.current ? sectionRef.current.scrollTop <= 5 : true;

      if (scrollStep === 2) {
        if (e.deltaY < 0 && isAtTop) {
          e.preventDefault();
          if (now - lastInteractionTime.current > 500) {
            setScrollStep(1);
            setShowContent(false);
            lastInteractionTime.current = now;
          }
        }
      } else {
        e.preventDefault();
        if (now - lastInteractionTime.current > 500) {
          if (e.deltaY > 10) {
            setScrollStep((s) => {
              const next = s < 2 ? s + 1 : s;
              if (next === 2) setShowContent(true);
              return next;
            });
            lastInteractionTime.current = now;
          } else if (e.deltaY < -10) {
            setScrollStep((s) => {
              const next = s > 0 ? s - 1 : s;
              if (next < 2) setShowContent(false);
              return next;
            });
            lastInteractionTime.current = now;
          }
        }
      }
    };

    const handleTouchStart = (e: globalThis.TouchEvent) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: globalThis.TouchEvent) => {
      if (!touchStartY) return;
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      const now = Date.now();
      const isAtTop = sectionRef.current ? sectionRef.current.scrollTop <= 5 : true;

      if (scrollStep === 2) {
        if (deltaY < -30 && isAtTop) {
          e.preventDefault();
          if (now - lastInteractionTime.current > 500) {
            setScrollStep(1);
            setShowContent(false);
            lastInteractionTime.current = now;
            setTouchStartY(touchY);
          }
        }
      } else {
        e.preventDefault();
        if (Math.abs(deltaY) > 30 && now - lastInteractionTime.current > 500) {
          if (deltaY > 0) {
            setScrollStep((s) => {
              const next = s < 2 ? s + 1 : s;
              if (next === 2) setShowContent(true);
              return next;
            });
            lastInteractionTime.current = now;
          } else {
            setScrollStep((s) => {
              const next = s > 0 ? s - 1 : s;
              if (next < 2) setShowContent(false);
              return next;
            });
            lastInteractionTime.current = now;
          }
          setTouchStartY(touchY);
        }
      }
    };

    const handleTouchEnd = (): void => {
      setTouchStartY(0);
    };

    const container = sectionRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      container.addEventListener('touchstart', handleTouchStart, { passive: false });
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
      container.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [scrollStep, touchStartY]);

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  let mediaWidth = isMobileState ? '350px' : '600px';
  let mediaHeight = isMobileState ? '250px' : '350px';
  let textTranslateX = 0;
  let bgOpacity = 1;

  if (scrollStep === 1) {
    mediaWidth = isMobileState ? '400px' : '780px';
    mediaHeight = isMobileState ? '280px' : '420px';
    textTranslateX = isMobileState ? 25 : 22;
    bgOpacity = 0.85;
  } else if (scrollStep === 2) {
    mediaWidth = '95vw';
    mediaHeight = '85vh';
    textTranslateX = 100;
    bgOpacity = 0;
  }

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div
      ref={sectionRef}
      className="fixed inset-0 z-[100] transition-colors duration-700 ease-in-out overflow-y-auto overflow-x-hidden bg-black"
    >
      {/* Close Button */}
      {onClose && (
        <button
          onClick={onClose}
          className="fixed top-6 right-6 z-[110] p-3 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors backdrop-blur-sm"
        >
          <X className="w-6 h-6" />
        </button>
      )}

      <section className="relative flex flex-col items-center justify-start min-h-[100dvh]">
        <div className="relative w-full flex flex-col items-center min-h-[100dvh]">
            <motion.div
              className="absolute inset-0 z-0 h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: bgOpacity }}
              transition={{ duration: 1.0, ease: [0.25, 1, 0.5, 1] }}
            >
            <img
              src={bgImageSrc}
              alt="Background"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/50" />
          </motion.div>

          <div className="container mx-auto flex flex-col items-center justify-start relative z-10 pointer-events-none">
            <div className="flex flex-col items-center justify-center w-full h-[100dvh] relative">
              <div
                className="absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-[1000ms] ease-[cubic-bezier(0.25,1,0.5,1)] rounded-2xl"
                style={{
                  width: mediaWidth,
                  height: mediaHeight,
                  maxWidth: '95vw',
                  maxHeight: '85vh',
                  boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.5)',
                }}
              >
                {mediaType === 'video' ? (
                  mediaSrc.includes('youtube.com') ? (
                    <div className="relative w-full h-full pointer-events-none">
                      <iframe
                        width="100%"
                        height="100%"
                        src={
                          mediaSrc.includes('embed')
                            ? mediaSrc +
                              (mediaSrc.includes('?') ? '&' : '?') +
                              'autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1'
                            : mediaSrc.replace('watch?v=', 'embed/') +
                              '?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=' +
                              mediaSrc.split('v=')[1]
                        }
                        className="w-full h-full rounded-xl pointer-events-auto transition-all duration-[1000ms]"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                      <div
                        className="absolute inset-0 z-10"
                        style={{ pointerEvents: 'none' }}
                      ></div>
                      <motion.div
                        className="absolute inset-0 bg-black/30 rounded-xl"
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: scrollStep === 2 ? 0 : 0.5 }}
                        transition={{ duration: 1.0, ease: [0.25, 1, 0.5, 1] }}
                      />
                    </div>
                  ) : (
                    <div className="relative w-full h-full pointer-events-none">
                      <video
                        src={mediaSrc}
                        poster={posterSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        className="w-full h-full object-cover rounded-xl pointer-events-auto transition-all duration-[1000ms]"
                        controls={false}
                        disablePictureInPicture
                        disableRemotePlayback
                      />
                      <div
                        className="absolute inset-0 z-10"
                        style={{ pointerEvents: 'none' }}
                      ></div>
                      <motion.div
                        className="absolute inset-0 bg-black/30 rounded-xl"
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: scrollStep === 2 ? 0 : 0.5 }}
                        transition={{ duration: 1.0, ease: [0.25, 1, 0.5, 1] }}
                      />
                    </div>
                  )
                ) : (
                  <div className="relative w-full h-full">
                    <img
                      src={mediaSrc}
                      alt={title || 'Media content'}
                      className="w-full h-full object-cover rounded-xl transition-all duration-[1000ms]"
                    />
                    <motion.div
                      className="absolute inset-0 bg-black/20 rounded-xl pointer-events-none"
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: scrollStep === 2 ? 0 : 0.5 }}
                      transition={{ duration: 1.0, ease: [0.25, 1, 0.5, 1] }}
                    />
                  </div>
                )}

                <div className="flex flex-col items-center text-center relative z-10 mt-4 transition-all duration-[1000ms] ease-[cubic-bezier(0.25,1,0.5,1)]">
                  {date && (
                    <p
                      className="text-2xl text-blue-200 transition-all duration-[1000ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
                      style={{ transform: `translateX(-${textTranslateX}vw)`, opacity: scrollStep === 2 ? 0 : 1 }}
                    >
                      {date}
                    </p>
                  )}
                  {scrollToExpand && (
                    <p
                      className="text-blue-200 font-medium text-center transition-all duration-[1000ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
                      style={{ transform: `translateX(${textTranslateX}vw)`, opacity: scrollStep === 2 ? 0 : 1 }}
                    >
                      {scrollToExpand}
                    </p>
                  )}
                </div>
              </div>

              <div
                className={`flex items-center justify-center text-center gap-4 w-full relative z-10 transition-all duration-[1000ms] ease-[cubic-bezier(0.25,1,0.5,1)] flex-col ${
                  textBlend ? 'mix-blend-difference' : 'mix-blend-normal'
                }`}
              >
                <motion.h2
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white transition-all duration-[1000ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
                  style={{ transform: `translateX(-${textTranslateX}vw)`, opacity: scrollStep === 2 ? 0 : 1 }}
                >
                  {firstWord}
                </motion.h2>
                <motion.h2
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white transition-all duration-[1000ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
                  style={{ transform: `translateX(${textTranslateX}vw)`, opacity: scrollStep === 2 ? 0 : 1 }}
                >
                  {restOfTitle}
                </motion.h2>
              </div>
            </div>

            <motion.section
              className="flex flex-col w-full px-8 py-10 md:px-16 lg:py-20 pointer-events-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;
