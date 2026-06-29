import { useEffect, useRef } from 'react';

interface GlitchBlockTransitionProps {
  onComplete: () => void;
}

export function LetsBeginTransition({ onComplete }: GlitchBlockTransitionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const COLS = 24;
    const ROWS = 16;
    const blockW = Math.ceil(canvas.width / COLS);
    const blockH = Math.ceil(canvas.height / ROWS);

    // Palette: brand red, off-white, black, dark maroon
    const palette = ['#c8102e', '#1a0508', '#ffffff', '#27151b', '#e63946', '#0d0d0d', '#ff1a40'];

    // Each cell: { x, y, color, opacity, activated, activateAt }
    const cells = Array.from({ length: COLS * ROWS }, (_, idx) => {
      const col = idx % COLS;
      const row = Math.floor(idx / COLS);
      return {
        x: col * blockW,
        y: row * blockH,
        color: palette[Math.floor(Math.random() * palette.length)],
        opacity: 0,
        activated: false,
        // Stagger activation: cascade + random jitter
        activateAt: 80 + (col / COLS) * 320 + (row / ROWS) * 200 + Math.random() * 120,
      };
    });

    // Final solid fill timing
    const FULL_FILL_AT = 820;
    const NAVIGATE_AT = 1050;

    let startTime: number | null = null;
    let rafId: number;
    let navigated = false;

    function draw(ts: number) {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;

      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      // After full fill, blast solid black and navigate
      if (elapsed >= FULL_FILL_AT) {
        ctx!.fillStyle = '#000000';
        ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

        if (!navigated && elapsed >= NAVIGATE_AT) {
          navigated = true;
          onCompleteRef.current();
          return;
        }
        rafId = requestAnimationFrame(draw);
        return;
      }

      cells.forEach((cell) => {
        if (!cell.activated && elapsed >= cell.activateAt) {
          cell.activated = true;
          cell.opacity = 1;
          // Flicker: pick new color randomly
          cell.color = palette[Math.floor(Math.random() * palette.length)];
        }

        if (cell.activated) {
          // Glitch flicker — random re-color every few frames
          if (Math.random() < 0.18) {
            cell.color = palette[Math.floor(Math.random() * palette.length)];
          }
          ctx!.globalAlpha = cell.opacity;
          ctx!.fillStyle = cell.color;
          ctx!.fillRect(cell.x, cell.y, blockW, blockH);

          // Draw thin glitch-line edge on some cells
          if (Math.random() < 0.08) {
            ctx!.globalAlpha = 0.9;
            ctx!.fillStyle = '#ffffff';
            ctx!.fillRect(cell.x, cell.y, blockW, 1);
          }
        }
      });

      ctx!.globalAlpha = 1;
      rafId = requestAnimationFrame(draw);
    }

    rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ imageRendering: 'pixelated' }}
      />
    </div>
  );
}
