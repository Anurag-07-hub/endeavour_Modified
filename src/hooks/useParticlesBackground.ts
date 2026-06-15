import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  speed: number;
  opacity: number;
  fadeDelay: number;
  fadeStart: number;
  fadingOut: boolean;
  reset: () => void;
  update: () => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

export function useParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const createParticle = (canvas: HTMLCanvasElement): Particle => {
      const particle = {
        x: 0,
        y: 0,
        speed: 0,
        opacity: 1,
        fadeDelay: 0,
        fadeStart: 0,
        fadingOut: false,
        reset() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.speed = Math.random() / 5 + 0.1;
          this.opacity = 1;
          this.fadeDelay = Math.random() * 600 + 100;
          this.fadeStart = Date.now() + this.fadeDelay;
          this.fadingOut = false;
        },
        update() {
          this.y -= this.speed;
          if (this.y < 0) {
            this.reset();
          }

          if (!this.fadingOut && Date.now() > this.fadeStart) {
            this.fadingOut = true;
          }

          if (this.fadingOut) {
            this.opacity -= 0.008;
            if (this.opacity <= 0) {
              this.reset();
            }
          }
        },
        draw(ctx: CanvasRenderingContext2D) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = `rgba(255, 255, 255, ${this.opacity})`;
          ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
          ctx.fillRect(this.x, this.y, 1.5, Math.random() * 3 + 1.5);
          ctx.shadowBlur = 0;
        },
      };

      particle.reset();
      particle.y = Math.random() * canvas.height;
      particle.fadeDelay = Math.random() * 600 + 100;
      particle.fadeStart = Date.now() + particle.fadeDelay;
      particle.fadingOut = false;

      return particle;
    };

    const initParticles = (canvas: HTMLCanvasElement) => {
      const particleCount = Math.floor((canvas.width * canvas.height) / 6000);
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(createParticle(canvas));
      }
    };

    const animate = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach((particle) => {
        particle.update();
        particle.draw(ctx);
      });
      animationRef.current = requestAnimationFrame(() => animate(canvas, ctx));
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas);
    };

    handleResize();
    animate(canvas, ctx);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return canvasRef;
}
