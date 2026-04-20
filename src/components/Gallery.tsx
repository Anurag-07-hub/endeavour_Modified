import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useAnimationFrame } from 'motion/react';
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

const ITEM_WIDTH = 500;
const ITEM_GAP = 10;

export function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);

  // Continuous scroll speed
  const speed = 2.5;

  // We want to smoothly auto-scroll items wrapped around continually.
  useAnimationFrame(() => {
    // We only rely on x offset that loops cleanly.
    // Length of a single complete set is:
    let wrapWidth = images.length * (ITEM_WIDTH + ITEM_GAP);
    let newX = x.get() - speed;
    if (newX <= -wrapWidth) {
      newX += wrapWidth;
    }
    x.set(newX);
  });

  // Create an array that repeats 3 times for a seamless loop
  const totalImages = [...images, ...images, ...images];

  return (
    <section id="gallery" className="py-[100px] bg-black/30 relative border-t border-white/10 overflow-hidden">
      <div className="max-w-[1024px] mx-auto px-[60px] mb-20 text-center">
        <AnimatedText text="GLIMPSES OF SUCCESS" className="text-[48px] md:text-[64px] font-sans font-black tracking-[-2px] text-white justify-center pb-4 leading-[0.9]" />
        <FadeIn delay={0.2} direction="up">
          <p className="font-sans text-brand-muted max-w-[500px] mx-auto text-[16px] leading-[1.6]">
            A visual documentation of our journey, creations, and the brilliant minds behind Endeavour.
          </p>
        </FadeIn>
      </div>

      <div
        ref={containerRef}
        className="w-full relative h-[450px] flex items-center justify-center overflow-hidden"
      >
        <motion.div
          drag="x"
          dragConstraints={{ left: -10000, right: 10000 }} // Allow infinite theoretical scroll
          onDrag={(e, info) => {
            // Pause autoscroll when dragging isn't easy with pure useAnimationFrame without flags,
            // but we can just let drag shift the offset natively.
            x.set(x.get() + info.delta.x * 2);
          }}
          className="absolute flex items-center gap-[10px]"
          style={{ x }}
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

// Child component that calculates its own scaling based on proximity to center screen
import React from 'react';
import { MotionValue } from 'motion/react';
const GalleryCard: React.FC<{ src: string, index: number, parentX: MotionValue<number> }> = ({ src, index, parentX }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // We need to continuously monitor the parent's X transform to map scaling.
  // Instead of recalculating every frame explicitly, we can tie the scale to the X motion value directly.

  // Calculate this item's theoretical original center position.
  const itemCenter = index * (ITEM_WIDTH + ITEM_GAP) + (ITEM_WIDTH / 2);

  const scale = useTransform(parentX, (latestX: number) => {
    // Current absolute pixel position on the screen, assuming the parent starts centered.
    // Screen center roughly relative to the wrapper:
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const currentAbsolutePosition = latestX + itemCenter;

    // Distance from the exact center of the screen
    // LatestX is negative. So currentAbsolutePosition gives position from left edge.
    const centerScreen = viewportWidth / 2;
    const distanceToCenter = Math.abs(currentAbsolutePosition - centerScreen);

    // If perfectly in center (distance 0), scale = 1.
    // If further away, scale goes down to ~0.8.
    const maxDistance = ITEM_WIDTH * 1.5;
    const progress = Math.min(distanceToCenter / maxDistance, 1);

    return 1 - (progress * 0.2); // Math.max(1 - (distanceToCenter / maxDistance) * 0.2, 0.8)
  });

  const width = useTransform(scale, [0.8, 1], [550, Math.min(600, typeof window !== 'undefined' ? window.innerWidth * 0.8 : 600)]);

  const filter = useTransform(scale, [0.8, 1], ['brightness(0.5)', 'brightness(1)']);

  return (
    <motion.div
      ref={cardRef}
      style={{
        width,
        scale,
        filter
      }}
      className="h-[450px] flex-shrink-0 overflow-hidden rounded-[32px] border border-white/10 bg-black/30 origin-center"
    >
      <img src={src} alt="Gallery item" className="w-full h-full object-cover pointer-events-none" />
    </motion.div>
  );
}
