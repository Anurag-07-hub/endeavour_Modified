import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, useTransform, MotionValue } from "framer-motion";

interface HeroExploreProps {
  heroScrollY: MotionValue<number>;
}

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export function HeroExplore({ heroScrollY }: HeroExploreProps) {
  // Scroll-linked overlay collapse
  const overlayOpacity  = useTransform(heroScrollY, [0, 0.06, 0.14], [1, 0.7, 0]);
  const overlayY        = useTransform(heroScrollY, [0, 0.14], [0, -55]);
  const exploreY        = useTransform(heroScrollY, [0, 0.14], [0, -110]);
  const exploreScale    = useTransform(heroScrollY, [0, 0.14], [1, 0.90]);
  const photoY          = useTransform(heroScrollY, [0, 0.14], [0, -90]);
  const photoScale      = useTransform(heroScrollY, [0, 0.14], [1, 0.93]);
  const headlineOpacity = useTransform(heroScrollY, [0, 0.05, 0.12], [1, 0.5, 0]);

  const l1ScaleY = useTransform(heroScrollY, [0.00, 0.045, 0.09], [1, 0.35, 0]);
  const l1Op     = useTransform(heroScrollY, [0.00, 0.040, 0.08], [1, 0.40, 0]);
  const l2ScaleY = useTransform(heroScrollY, [0.01, 0.055, 0.10], [1, 0.35, 0]);
  const l2Op     = useTransform(heroScrollY, [0.01, 0.050, 0.09], [1, 0.40, 0]);
  const l3ScaleY = useTransform(heroScrollY, [0.02, 0.060, 0.11], [1, 0.35, 0]);
  const l3Op     = useTransform(heroScrollY, [0.02, 0.055, 0.10], [1, 0.40, 0]);

  // Liquid-wave state
  const [hovered, setHovered] = useState(false);
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const dispRef = useRef<SVGFEDisplacementMapElement>(null);
  const rafRef  = useRef<number>(0);
  const t       = useRef(0);

  const animateWave = useCallback(() => {
    if (!turbRef.current || !dispRef.current) return;
    t.current += 0.022;
    const fx = (0.011 + Math.sin(t.current * 1.4) * 0.008).toFixed(5);
    const fy = (0.007 + Math.cos(t.current * 0.9) * 0.006).toFixed(5);
    turbRef.current.setAttribute("baseFrequency", `${fx} ${fy}`);
    dispRef.current.setAttribute("scale", String(Math.round(20 + Math.sin(t.current * 2) * 5)));
    rafRef.current = requestAnimationFrame(animateWave);
  }, []);

  useEffect(() => {
    if (hovered) {
      t.current = 0;
      rafRef.current = requestAnimationFrame(animateWave);
    } else {
      cancelAnimationFrame(rafRef.current);
      if (turbRef.current) turbRef.current.setAttribute("baseFrequency", "0 0");
      if (dispRef.current) dispRef.current.setAttribute("scale", "0");
    }
    return () => cancelAnimationFrame(rafRef.current);
  }, [hovered, animateWave]);

  const LINES: { text: string; scaleY: MotionValue<number>; opacity: MotionValue<number> }[] = [
    { text: "WORK.",   scaleY: l1ScaleY, opacity: l1Op },
    { text: "BUILD.",  scaleY: l2ScaleY, opacity: l2Op },
    { text: "LAUNCH.", scaleY: l3ScaleY, opacity: l3Op },
  ];

  return (
    <motion.section
      className="fixed inset-0 z-[60] bg-[#080808] overflow-hidden"
      style={{ opacity: overlayOpacity, y: overlayY }}
      aria-hidden="true"
    >
      {/* Heavy grain texture */}
      <div
        className="absolute inset-0 z-[70] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: NOISE_SVG, opacity: 0.52 }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 85% 80% at 50% 50%, transparent 55%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      {/* Dark silhouette / photo placeholder – top right */}
      <motion.div
        className="absolute top-0 right-0 w-[48%] h-[88%] pointer-events-none z-[10]"
        style={{ y: photoY, scale: photoScale, transformOrigin: "top right" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(165deg, #252525 0%, #151515 35%, #0a0a0a 70%, transparent 100%)",
          }}
        />
        <div
          className="absolute bottom-0 left-[12%] right-[-5%] h-[95%]"
          style={{
            background:
              "radial-gradient(ellipse 52% 75% at 50% 88%, #2c2c2c 0%, #191919 30%, #0d0d0d 58%, transparent 80%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            maskImage:
              "linear-gradient(to left, rgba(0,0,0,0.92) 30%, rgba(0,0,0,0.4) 65%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to left, rgba(0,0,0,0.92) 30%, rgba(0,0,0,0.4) 65%, transparent 100%)",
            background: "rgba(0,0,0,0.18)",
          }}
        />
      </motion.div>

      {/* Giant "explore" dark-on-dark watermark */}
      <motion.div
        className="absolute inset-x-0 bottom-[8%] z-[15] pointer-events-none overflow-hidden"
        style={{ y: exploreY, scale: exploreScale, transformOrigin: "bottom center" }}
      >
        <span
          className="block font-clash font-bold uppercase select-none whitespace-nowrap px-3"
          style={{
            fontSize: "clamp(80px, 17vw, 260px)",
            lineHeight: 0.82,
            letterSpacing: "-0.04em",
            color: "#171717",
            WebkitTextStrokeWidth: "1px",
            WebkitTextStrokeColor: "#222",
          }}
        >
          explore
        </span>
      </motion.div>

      {/* Vertical collapsing headline lines */}
      <motion.div
        className="absolute left-6 md:left-14 top-[20%] z-[20] pointer-events-none flex flex-col"
        style={{ opacity: headlineOpacity }}
      >
        {LINES.map(({ text, scaleY, opacity }) => (
          <div key={text} className="overflow-hidden" style={{ lineHeight: 0 }}>
            <motion.div
              style={{
                scaleY,
                opacity,
                transformOrigin: "bottom",
                fontSize: "clamp(60px, 9vw, 138px)",
                lineHeight: 0.88,
                letterSpacing: "-0.03em",
                fontWeight: 900,
                fontFamily: "inherit",
                textTransform: "uppercase",
                color: "white",
              }}
            >
              {text}
            </motion.div>
          </div>
        ))}
      </motion.div>

      {/* Top nav labels */}
      <div className="absolute top-8 right-8 z-[30] flex gap-6 md:gap-10 pointer-events-none">
        {["DOMAINS", "ABOUT", "CONTACT"].map((label) => (
          <span
            key={label}
            className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] font-mono text-white/30"
          >
            {label}
          </span>
        ))}
      </div>

      {/* Top-left brand mark */}
      <div className="absolute top-8 left-6 md:left-10 z-[30] pointer-events-none">
        <span className="text-[11px] uppercase tracking-[0.25em] font-mono text-white/30">
          endeavour
        </span>
      </div>

      {/* SVG filter for liquid wave */}
      <svg
        className="absolute pointer-events-none"
        style={{ width: 0, height: 0, overflow: "hidden" }}
        aria-hidden="true"
      >
        <defs>
          <filter id="liquid-wave" x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence
              ref={turbRef}
              type="turbulence"
              baseFrequency="0 0"
              numOctaves="3"
              seed="2"
              result="turb"
            />
            <feDisplacementMap
              ref={dispRef}
              in="SourceGraphic"
              in2="turb"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Explore CTA button */}
      <div className="absolute bottom-9 left-6 md:left-14 z-[30] flex items-center gap-5 pointer-events-auto">
        <button
          className="group flex items-center gap-4 cursor-pointer bg-transparent border-none p-0"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() =>
            window.scrollBy({
              top: Math.max(120, window.innerHeight * 0.22),
              behavior: "smooth",
            })
          }
          aria-label="Explore Domains"
        >
          <span
            className="font-clash font-bold uppercase text-white select-none"
            style={{
              fontSize: "clamp(28px, 3.5vw, 52px)",
              letterSpacing: "-0.02em",
              filter: hovered ? "url(#liquid-wave)" : "none",
              transition: hovered ? "none" : "filter 0.35s ease",
            }}
          >
            Explore
          </span>
          <span
            className="flex items-center justify-center rounded-full border border-white/25 text-white/70 transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:border-white flex-shrink-0"
            style={{ width: 40, height: 40, fontSize: 18 }}
          >
            ↓
          </span>
        </button>

        {/* Vertical scroll indicator */}
        <div className="hidden md:flex flex-col items-center gap-1.5 ml-2">
          <div className="w-px h-10 bg-white/15" />
          <span
            className="text-[9px] uppercase tracking-[0.25em] text-white/25 font-mono"
            style={{ writingMode: "vertical-rl" }}
          >
            scroll
          </span>
        </div>
      </div>

      {/* Bottom edge fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-28 z-[25] pointer-events-none"
        style={{
          background: "linear-gradient(to top, #080808 0%, transparent 100%)",
        }}
      />
    </motion.section>
  );
}
