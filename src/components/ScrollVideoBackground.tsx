import { useEffect, useRef } from 'react';

export function ScrollVideoBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const frameCount = 210;
    // Helper to get frame path: /frames/ezgif-frame-001.png
    const currentFrame = (index: number) => {
      const paddedIndex = index.toString().padStart(3, '0');
      return `/frames/ezgif-frame-${paddedIndex}.png`;
    };

    // Preload images
    const images: HTMLImageElement[] = [];
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    // Initial draw
    const img = new Image();
    img.src = currentFrame(1);
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };

    let animationFrameId: number;
    let currentScroll = window.scrollY;
    let targetScroll = window.scrollY;

    const handleScroll = () => {
      targetScroll = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const updateImage = () => {
      // smooth lerping for that buttery feel
      currentScroll += (targetScroll - currentScroll) * 0.08;
      
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      if (maxScroll > 0) {
        const scrollProgress = currentScroll / maxScroll;
        // Map 0 -> 1 progress to 1 -> 192 frames
        const frameIndex = Math.min(
          Math.max(Math.floor(scrollProgress * frameCount) + 1, 1),
          frameCount
        );
        
        const frameImage = images[frameIndex - 1];
        if (frameImage && frameImage.complete && frameImage.naturalWidth > 0) {
           ctx.drawImage(frameImage, 0, 0, canvas.width, canvas.height);
        }
      }
      
      animationFrameId = requestAnimationFrame(updateImage);
    };

    animationFrameId = requestAnimationFrame(updateImage);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-50 bg-black pointer-events-none">
      {/* Dark overlay to make sure text is still perfectly legible over the frames */}
      <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none"></div>
      
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      />
    </div>
  );
}
