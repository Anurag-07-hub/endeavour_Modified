import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useAnimationFrame, MotionValue } from 'motion/react';
import { FadeIn } from './FadeIn';
import { AnimatedText } from './AnimatedText';

const images = [
  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1580983546416-2432d667c469?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1620712948633-89bd29241bda?q=80&w=1200&auto=format&fit=crop"
];

const ITEM_WIDTH = 300;
const ITEM_GAP = 20;

export function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  const wrapWidth = images.length * (ITEM_WIDTH + ITEM_GAP);
  // Start the motion value at -wrapWidth to ensure smooth bidirectional scrolling immediately
  const x = useMotionValue(-wrapWidth);

  // Continuous scroll speed
  const speed = 1.5;

  useAnimationFrame(() => {
    let newX = x.get() - speed;
    
    // Loop smoothly when scrolling left
    if (newX <= -wrapWidth * 2) {
      newX += wrapWidth;
    } 
    // Loop smoothly when dragging right
    else if (newX > -wrapWidth) {
      newX -= wrapWidth;
    }
    
    x.set(newX);
  });

  // We need 4 copies to ensure we always have content off-screen in both directions
  const totalImages = [...images, ...images, ...images, ...images];

  return (
    <section id="gallery" className="py-[60px] md:py-[120px] bg-black/30 relative border-t border-white/10 overflow-hidden">
      <div className="max-w-[1024px] mx-auto px-5 md:px-[60px] mb-10 md:mb-[60px] text-center relative z-10">
        <FadeIn delay={0.1} direction="up">
          <p className="text-brand-muted text-sm font-bold tracking-widest uppercase mb-4">Today's Pick</p>
        </FadeIn>
        <AnimatedText text="AWARD WINNING CREATORS" className="text-[48px] md:text-[64px] font-sans font-black tracking-[-2px] text-white justify-center pb-4 leading-[0.9]" />
        <FadeIn delay={0.2} direction="up">
          <p className="font-sans text-brand-muted max-w-[500px] mx-auto text-[16px] leading-[1.6]">
            Explore a collection where art and design merge to shape what's next. <span className="text-white">This gallery isn't just about visuals.</span>
          </p>
        </FadeIn>
        <FadeIn delay={0.3} direction="up">
          <button className="mt-8 px-8 py-3 rounded-full bg-white text-black font-bold text-sm tracking-wide hover:scale-105 transition-transform">
            Start for Free
          </button>
        </FadeIn>
      </div>

      <div
        ref={containerRef}
        // Increase container height to allow for scaled up outer elements
        className="w-full relative h-[280px] sm:h-[420px] md:h-[500px] lg:h-[650px] flex items-center overflow-hidden"
        style={{ perspective: '1200px' }}
      >
        <motion.div
          drag="x"
          dragConstraints={{ left: -10000, right: 10000 }}
          onDrag={(e, info) => {
            x.set(x.get() + info.delta.x * 1.5);
          }}
          className="absolute flex items-center gap-[20px]"
          // Set left: 50% so that offsetFromCenter directly translates to distance from the middle of the screen
          style={{ x, left: '50%', transformStyle: 'preserve-3d' }}
        >
          {totalImages.map((src, i) => {
            return (
              <GalleryCard
                key={i}
                index={i}
                src={src}
                parentX={x}
              />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

const GalleryCard: React.FC<{ src: string, index: number, parentX: MotionValue<number> }> = ({ src, index, parentX }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Center of this item relative to the start of the list
  const itemCenter = index * (ITEM_WIDTH + ITEM_GAP) + (ITEM_WIDTH / 2);

  // Since parent has `left: 50%`, `parentX + itemCenter` is exactly the offset from the screen center.
  // When offsetFromCenter is 0, the item is perfectly centered in the viewport.
  const offsetFromCenter = useTransform(parentX, (latestX: number) => latestX + itemCenter);

  // As distance from center increases, scale increases to create a concave cylinder effect
  const scale = useTransform(offsetFromCenter, [-960, 0, 960], [1.5, 1, 1.5]);

  // Rotate items inwards: left items (negative offset) have positive rotateY, right items have negative rotateY
  const rotateY = useTransform(offsetFromCenter, [-960, 0, 960], [60, 0, -55]);

  // Closer to center = higher Z-index, so inner cards overlap outer cards (concave depth)
  const zIndex = useTransform(offsetFromCenter, (offset) => 100 - Math.round(Math.abs(offset) / 10));

  // Slightly dim the outer cards for better depth perception
  const filter = useTransform(offsetFromCenter, [-960, 0, 960], ['brightness(0.4)', 'brightness(1)', 'brightness(0.4)']);

  return (
    <motion.div
      ref={cardRef}
      style={{
        width: ITEM_WIDTH,
        scale,
        rotateY,
        zIndex,
        filter
      }}
      className="h-[380px] flex-shrink-0 overflow-hidden rounded-[24px] border border-white/10 bg-black/30 shadow-2xl"
    >
      <img src={src} alt="Gallery item" className="w-full h-full object-cover pointer-events-none" />
    </motion.div>
  );
}
