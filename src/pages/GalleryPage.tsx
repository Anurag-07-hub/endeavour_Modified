import { useRef, useEffect, useState } from 'react';
import { motion, useSpring, useTransform, useMotionValue, MotionValue, useAnimationFrame } from 'motion/react';
import { FadeIn } from '../components/FadeIn';

const images = [
  "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1580983546416-2432d667c469?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1616423640778-28d1b53229bd?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1620712948633-89bd29241bda?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200&auto=format&fit=crop"
];

const ITEM_WIDTH = 340;
const ITEM_GAP = 50;

function Card({ src, index, parentX }: { src: string, index: number, parentX: MotionValue<number> }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const itemCenter = index * (ITEM_WIDTH + ITEM_GAP) + (ITEM_WIDTH / 2);
  const offsetFromCenter = useTransform(parentX, (latestX: number) => latestX + itemCenter);

  // Deeper and wider 3D properties
  const baseScale = useTransform(offsetFromCenter, [-1400, 0, 1400], [1.4, 0.85, 1.4]);
  const baseRotateY = useTransform(offsetFromCenter, [-1400, 0, 1400], [60, 0, -60]);
  const baseZ = useTransform(offsetFromCenter, [-1400, 0, 1400], [200, -200, 200]);
  const baseZIndexRaw = useTransform(offsetFromCenter, (offset) => 100 - Math.abs(offset) / 10);
  const baseFilterRaw = useTransform(offsetFromCenter, [-1400, 0, 1400], [0.3, 1, 0.3]);

  // Spring to smoothly transition between scrolling state and hover state
  const hoverSpring = useSpring(0, { stiffness: 100, damping: 20 });

  useEffect(() => {
    hoverSpring.set(isHovered ? 1 : 0);
  }, [isHovered, hoverSpring]);

  // Interpolate final properties
  const scale = useTransform(() => {
    const s = baseScale.get();
    const h = hoverSpring.get();
    return s + (1.1 - s) * h;
  });

  const rotateY = useTransform(() => {
    const ry = baseRotateY.get();
    const h = hoverSpring.get();
    return ry * (1 - h); // Flattens to 0 when hovered
  });

  const z = useTransform(() => {
    const bz = baseZ.get();
    const h = hoverSpring.get();
    return bz + (100 - bz) * h; // Brings to front on hover
  });

  const y = useTransform(() => hoverSpring.get() * -40); // Lift up on hover

  const zIndex = useTransform(() => {
    const z = baseZIndexRaw.get();
    const h = hoverSpring.get();
    return Math.round(z + (200 - z) * h); // Bring strictly to front
  });

  const filter = useTransform(() => {
    const b = baseFilterRaw.get();
    const h = hoverSpring.get();
    return `brightness(${b + (1.05 - b) * h})`;
  });

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: ITEM_WIDTH,
        scale,
        rotateY,
        z,
        y,
        zIndex,
        filter,
        transformOrigin: "center center",
      }}
      className="h-[400px] md:h-[500px] flex-shrink-0 overflow-hidden rounded-[24px] cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.2)] relative"
    >
      <img src={src} alt={`Gallery item ${index}`} className="w-full h-full object-cover pointer-events-none" />
      {/* Subtle outer glow overlay using a ring */}
      <div className="absolute inset-0 ring-1 ring-black/5 rounded-[24px] pointer-events-none" />
    </motion.div>
  );
}

export function GalleryPage() {
  const wrapWidth = images.length * (ITEM_WIDTH + ITEM_GAP);
  const x = useMotionValue(-wrapWidth);
  const speed = 2.0; // Gentle continuous auto-scroll speed

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useAnimationFrame(() => {
    let newX = x.get() - speed;
    if (newX <= -wrapWidth * 2) {
      newX += wrapWidth;
    } else if (newX > -wrapWidth) {
      newX -= wrapWidth;
    }
    x.set(newX);
  });

  // Duplicate images multiple times for seamless infinite scroll
  const totalImages = [...images, ...images, ...images, ...images];

  return (
    <div className="pt-[80px] md:pt-[110px] pb-0 bg-[#F9F9F9] h-[100svh] flex flex-col items-center justify-center overflow-hidden">
      {/* Header Section */}
      <div className="max-w-[1024px] mx-auto px-5 md:px-[60px] text-center mb-4 md:mb-6 relative z-40">
        <FadeIn delay={0.3} direction="up">
          <h1 className="text-[20px] sm:text-[26px] md:text-[36px] lg:text-[44px] font-sans font-black tracking-[-1px] pb-2 leading-[1.1]">
            <span className="text-black" style={{ color: 'black' }}>WELCOME </span>
            <span className="text-white relative inline-block px-4 bg-black rounded-lg transform -skew-x-12 mx-2">
              <span className="inline-block transform skew-x-12">TO OUR</span>
            </span>
            <span className="text-brand-accent"> GALLERY</span>
          </h1>
        </FadeIn>
      </div>

      {/* 3D Continuous Gallery Section */}
      <div
        className="w-full relative h-[280px] sm:h-[360px] md:h-[400px] lg:h-[500px]"
        style={{ perspective: "1500px" }}
      >
        <motion.div
          drag="x"
          dragConstraints={{ left: -10000, right: 10000 }}
          onDrag={(e, info) => {
            x.set(x.get() + info.delta.x * 1.5);
          }}
          className="absolute flex items-center w-max top-1/2 -translate-y-1/2"
          style={{ x, left: '50%', transformStyle: 'preserve-3d', gap: `${ITEM_GAP}px` }}
        >
          {totalImages.map((src, i) => (
            <Card key={i} src={src} index={i} parentX={x} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
