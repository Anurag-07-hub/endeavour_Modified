import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue, AnimatePresence } from "motion/react";
import { X } from 'lucide-react';
import { useParticlesBackground } from '../hooks/useParticlesBackground';
import { useCMS } from '../context/CMSContext';
import ScrollExpandMedia from '../components/ui/scroll-expansion-hero';

export type AnimationPhase = "scatter" | "line" | "circle" | "bottom-strip";

interface FlipCardProps {
    item: { id: string; type: 'image'|'video'|'empty'; url: string };
    index: number;
    total: number;
    phase: AnimationPhase;
    target: { x: number; y: number; rotation: number; scale: number; opacity: number };
    onClick: () => void;
}

const IMG_WIDTH = 60;
const IMG_HEIGHT = 85;

function FlipCard({
    item,
    index,
    total,
    phase,
    target,
    onClick,
}: FlipCardProps) {
    return (
        <motion.div
            animate={{
                x: target.x,
                y: target.y,
                rotate: target.rotation,
                scale: target.scale,
                opacity: target.opacity,
            }}
            transition={{
                type: "spring",
                stiffness: 40,
                damping: 15,
            }}
            style={{
                position: "absolute",
                width: IMG_WIDTH,
                height: IMG_HEIGHT,
                transformStyle: "preserve-3d",
                zIndex: Math.round(target.scale * 100),
            }}
            className={`group ${item.type === 'empty' ? 'cursor-default' : 'cursor-pointer'}`}
            onClick={() => {
                if (item.type !== 'empty') onClick();
            }}
        >
            <motion.div
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
            >
                {/* Front Face */}
                <div
                    className="absolute inset-0 h-full w-full overflow-hidden rounded-xl shadow-lg bg-gray-200"
                    style={{ backfaceVisibility: "hidden" }}
                >
                    {item.type === 'video' && item.url ? (
                        <video src={item.url} autoPlay loop muted playsInline className="h-full w-full object-cover pointer-events-none" />
                    ) : item.type === 'image' && item.url ? (
                        <img src={item.url} alt={`gallery-${index}`} className="h-full w-full object-cover pointer-events-none" />
                    ) : (
                        <div className="h-full w-full flex flex-wrap gap-1 p-2 bg-[#050505] overflow-hidden justify-center items-center pointer-events-none" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", Helvetica, sans-serif' }}>
                            {Array.from({ length: 45 }).map((_, i) => (
                                <span key={i} className="text-[#a40505] opacity-30 font-black uppercase tracking-[2px] leading-none" style={{ fontSize: `${Math.random() * 10 + 6}px`, transform: `rotate(${Math.random() * 60 - 30}deg)`, textShadow: '0 0 10px rgba(164, 5, 5, 0.9)' }}>
                                    ENDEAVOUR
                                </span>
                            ))}
                        </div>
                    )}
                    <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/60" />
                    
                    {/* View Full Overlay */}
                    {item.type !== 'empty' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <div className="border border-brand-accent/50 bg-black/60 backdrop-blur-sm rounded-lg p-3 text-center shadow-[0_0_15px_rgba(164,5,5,0.5)] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <p className="text-[8px] font-bold text-brand-accent uppercase tracking-widest mb-1">View</p>
                                <p className="text-xs font-medium text-white">Full</p>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}

const TOTAL_IMAGES = 20;
const MAX_SCROLL = 3000;

const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

export function GalleryPage() {
    const { gallery } = useCMS();
    const displayGallery = Array.from({ length: TOTAL_IMAGES }).map((_, i) => gallery[i] || { id: `empty-${i}`, type: 'empty', url: '' } as const);
    
    const [introPhase, setIntroPhase] = useState<AnimationPhase>("scatter");
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedItem, setSelectedItem] = useState<{ type: 'image'|'video'; url: string } | null>(null);

    // Hide Navbar when lightbox is open
    useEffect(() => {
        const navbar = document.getElementById('main-navbar');
        if (navbar) {
            if (selectedItem) {
                navbar.style.opacity = '0';
                navbar.style.pointerEvents = 'none';
            } else {
                navbar.style.opacity = '1';
                navbar.style.pointerEvents = 'auto';
            }
        }
    }, [selectedItem]);

    // New Particles Hook
    const canvasRef = useParticlesBackground();

    // --- Container Size ---
    useEffect(() => {
        if (!containerRef.current) return;

        const handleResize = (entries: ResizeObserverEntry[]) => {
            for (const entry of entries) {
                setContainerSize({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                });
            }
        };

        const observer = new ResizeObserver(handleResize);
        observer.observe(containerRef.current);

        setContainerSize({
            width: containerRef.current.offsetWidth,
            height: containerRef.current.offsetHeight,
        });

        return () => observer.disconnect();
    }, []);

    // --- Virtual Scroll Logic ---
    const virtualScroll = useMotionValue(0);
    const scrollRef = useRef(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            const newScroll = Math.min(Math.max(scrollRef.current + e.deltaY, 0), MAX_SCROLL);
            scrollRef.current = newScroll;
            virtualScroll.set(newScroll);
        };

        let touchStartY = 0;
        const handleTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
        };
        const handleTouchMove = (e: TouchEvent) => {
            e.preventDefault();
            const touchY = e.touches[0].clientY;
            const deltaY = touchStartY - touchY;
            touchStartY = touchY;

            const newScroll = Math.min(Math.max(scrollRef.current + deltaY, 0), MAX_SCROLL);
            scrollRef.current = newScroll;
            virtualScroll.set(newScroll);
        };

        container.addEventListener("wheel", handleWheel, { passive: false });
        container.addEventListener("touchstart", handleTouchStart, { passive: false });
        container.addEventListener("touchmove", handleTouchMove, { passive: false });

        return () => {
            container.removeEventListener("wheel", handleWheel);
            container.removeEventListener("touchstart", handleTouchStart);
            container.removeEventListener("touchmove", handleTouchMove);
        };
    }, [virtualScroll]);

    // Morph Progress: 0 (Circle) -> 1 (Bottom Arc)
    const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1]);
    const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });

    // Scroll Rotation
    const scrollRotate = useTransform(virtualScroll, [600, 3000], [0, 360]);
    const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 });

    // Mouse Parallax
    const mouseX = useMotionValue(0);
    const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const relativeX = e.clientX - rect.left;
            const normalizedX = (relativeX / rect.width) * 2 - 1;
            mouseX.set(normalizedX * 100);
        };
        container.addEventListener("mousemove", handleMouseMove);
        return () => container.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX]);

    // Intro Sequence
    useEffect(() => {
        const timer1 = setTimeout(() => setIntroPhase("line"), 500);
        const timer2 = setTimeout(() => setIntroPhase("circle"), 2500);
        return () => { clearTimeout(timer1); clearTimeout(timer2); };
    }, []);

    // Random Scatter Positions
    const scatterPositions = useMemo(() => {
        return displayGallery.map(() => ({
            x: (Math.random() - 0.5) * 1500,
            y: (Math.random() - 0.5) * 1000,
            rotation: (Math.random() - 0.5) * 180,
            scale: 0.6,
            opacity: 0,
        }));
    }, [displayGallery.length]);

    const [morphValue, setMorphValue] = useState(0);
    const [rotateValue, setRotateValue] = useState(0);
    const [parallaxValue, setParallaxValue] = useState(0);

    useEffect(() => {
        const unsubscribeMorph = smoothMorph.on("change", setMorphValue);
        const unsubscribeRotate = smoothScrollRotate.on("change", setRotateValue);
        const unsubscribeParallax = smoothMouseX.on("change", setParallaxValue);
        return () => {
            unsubscribeMorph();
            unsubscribeRotate();
            unsubscribeParallax();
        };
    }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

    // --- Content Opacity ---
    // Fade in content when arc is formed (morphValue > 0.8)
    const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
    const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0]);

    return (
        <div data-cursor-system="true" ref={containerRef} className="force-dark relative w-full h-[100svh] bg-brand-bg overflow-hidden pt-[80px]">
            <style>{`
                @keyframes load {  
                    0% { opacity: 0;}    
                    100% { opacity: 1;}    
                }
                @keyframes loadrot {
                    0% { transform: scaleY(0); opacity: 0; }
                    100% { transform: scaleY(1); opacity: 1; }
                }
                @keyframes spotlight {
                    0% { opacity: 0.7; filter: blur(15px); }
                    50% { opacity: 1; filter: blur(25px); }    
                    100% { opacity: 0.7; filter: blur(15px); }    
                }
            `}</style>

            {/* Glowing Spotlight Effects positioned above the circle */}
            <div
                className="pointer-events-none"
                style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    margin: "0 auto",
                    zIndex: 0, // Behind the gallery cards
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        top: "-2em",
                        left: 0,
                        right: 0,
                        margin: "0 auto",
                        width: "15em",
                        height: "4em",
                        borderRadius: "50%",
                        background: "rgba(164, 5, 5, 0.8)",
                        boxShadow: "0 0 5em 2em #a40505",
                        filter: "blur(10px)",
                    }}
                />
                
                {/* Linear Light Beam extending downwards */}
                <div
                    style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: 0,
                        margin: "0 auto",
                        width: "100%", // Covers the region fully horizontally
                        height: "85vh", // Reaches down beautifully over the circle
                        backgroundImage: "linear-gradient(90deg, transparent 10%, rgba(164, 5, 5, 0.1) 30%, rgba(164, 5, 5, 0.4) 50%, rgba(164, 5, 5, 0.1) 70%, transparent 90%)",
                        WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 20%, transparent 100%)",
                        maskImage: "linear-gradient(to bottom, black 0%, black 20%, transparent 100%)",
                        transformOrigin: "50% 0",
                        animation: "loadrot 4s ease-out forwards, spotlight 8s ease-in-out infinite",
                        zIndex: -1,
                    }}
                />
            </div>

            {/* Sparkle Particles Canvas */}
            <canvas
                ref={canvasRef}
                style={{
                    position: "absolute",
                    pointerEvents: "none",
                    animation: "load 0.4s ease-in-out forwards",
                    zIndex: 0,
                    width: "100%",
                    height: "100%",
                    opacity: 0.8,
                }}
            />

            {/* Container */}
            <div className="flex h-full w-full flex-col items-center justify-center perspective-1000 z-10">

                {/* Intro Text (Fades out) */}
                <div className="absolute z-0 flex flex-col items-center justify-center text-center pointer-events-none top-1/2 -translate-y-1/2">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={introPhase === "circle" && morphValue < 0.5 ? { opacity: 0.5 - morphValue } : { opacity: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="mt-4 text-xs font-bold tracking-[0.2em] text-gray-400"
                    >
                        SCROLL TO EXPLORE
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={introPhase === "circle" && morphValue < 0.5 ? { opacity: 1 - morphValue * 2, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="mt-2 text-2xl md:text-3xl font-black tracking-[0.1em] text-brand-accent uppercase font-sans select-none"
                    >
                        OUR MEMORIES
                    </motion.h2>
                </div>

                {/* Arc Active Content (Fades in) */}
                <motion.div
                    style={{ opacity: contentOpacity, y: contentY }}
                    className={`absolute top-[15%] z-10 flex flex-col items-center justify-center text-center pointer-events-none px-4 transition-opacity duration-500 ${selectedItem ? 'opacity-0' : ''}`}
                >
                    <h2 
                        className="text-5xl md:text-7xl font-semibold tracking-tight mb-4 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
                        style={{ color: "#FFFFFF" }}
                    >
                        Explore Our Vision
                    </h2>
                    <p className="text-lg md:text-2xl text-gray-100 max-w-2xl leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-bold">
                        Discover a world where technology meets creativity. <br className="hidden md:block" />
                        Scroll through our curated collection of innovations designed to shape the future.
                    </p>
                </motion.div>

                {/* Main Container */}
                <div className={`relative flex items-center justify-center w-full h-full mt-4 transition-opacity duration-500 ${selectedItem ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                    {displayGallery.map((item, i) => {
                        let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

                        if (introPhase === "scatter") {
                            target = scatterPositions[i];
                        } else if (introPhase === "line") {
                            const lineSpacing = 70;
                            const lineTotalWidth = TOTAL_IMAGES * lineSpacing;
                            const lineX = i * lineSpacing - lineTotalWidth / 2;
                            target = { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 };
                        } else {
                            const isMobile = containerSize.width < 768;
                            const minDimension = Math.min(containerSize.width, containerSize.height);

                            const circleRadius = Math.min(minDimension * 0.35, 350);
                            const circleAngle = (i / TOTAL_IMAGES) * 360;
                            const circleRad = (circleAngle * Math.PI) / 180;
                            const circlePos = {
                                x: Math.cos(circleRad) * circleRadius,
                                y: Math.sin(circleRad) * circleRadius,
                                rotation: circleAngle + 90,
                            };

                            const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5);
                            const arcRadius = baseRadius * (isMobile ? 1.4 : 1.1);
                            const arcApexY = containerSize.height * (isMobile ? 0.35 : 0.25);
                            const arcCenterY = arcApexY + arcRadius;

                            const spreadAngle = isMobile ? 100 : 130;
                            const startAngle = -90 - (spreadAngle / 2);
                            const step = spreadAngle / (TOTAL_IMAGES - 1);

                            const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1);
                            const maxRotation = spreadAngle * 0.8;
                            const boundedRotation = -scrollProgress * maxRotation;

                            const currentArcAngle = startAngle + (i * step) + boundedRotation;
                            const arcRad = (currentArcAngle * Math.PI) / 180;

                            const arcPos = {
                                x: Math.cos(arcRad) * arcRadius + parallaxValue,
                                y: Math.sin(arcRad) * arcRadius + arcCenterY,
                                rotation: currentArcAngle + 90,
                                scale: isMobile ? 1.4 : 1.8,
                            };

                            target = {
                                x: lerp(circlePos.x, arcPos.x, morphValue),
                                y: lerp(circlePos.y, arcPos.y, morphValue),
                                rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                                scale: lerp(1, arcPos.scale, morphValue),
                                opacity: 1,
                            };
                        }

                        return (
                            <FlipCard
                                key={item.id}
                                item={item}
                                index={i}
                                total={displayGallery.length}
                                phase={introPhase}
                                target={target}
                                onClick={() => { if (item.type !== 'empty') setSelectedItem({ type: item.type, url: item.url }) }}
                            />
                        );
                    })}
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100]"
                    >
                        <ScrollExpandMedia
                            mediaType={selectedItem.type === 'video' ? 'video' : 'image'}
                            mediaSrc={selectedItem.url}
                            bgImageSrc={selectedItem.type === 'image' ? selectedItem.url : 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1920&auto=format&fit=crop'}
                            title="ENDEAVOUR GALLERY"
                            date="Memories"
                            scrollToExpand="Scroll to Expand"
                            onClose={() => setSelectedItem(null)}
                        >
                            <div className="max-w-4xl mx-auto text-center mt-[20vh] md:mt-[30vh]">
                                <h2 className="text-3xl font-bold mb-6 text-white font-bebas tracking-wider uppercase">
                                    About This Memory
                                </h2>
                                <p className="text-lg text-white/80 font-sans leading-relaxed">
                                    Our gallery showcases the journey of Endeavour. 
                                    Every component, every event, and every memory is carefully preserved.
                                    Scroll to fully expand and immerse yourself in the moment.
                                </p>
                            </div>
                        </ScrollExpandMedia>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
