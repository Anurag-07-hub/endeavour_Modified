import { useEffect, useRef, useState } from 'react';

interface NetworkNode {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  isBrainCore: boolean;
  homeX: number; // For brain core coordinates mapping
  homeY: number;
  phase: number; // Organic vibration phase
  vibrationSpeed: number;
}

interface NetworkConnection {
  nodeA: NetworkNode;
  nodeB: NetworkNode;
  distance: number;
}

interface NetworkPulse {
  id: string;
  fromNode: NetworkNode;
  toNode: NetworkNode;
  progress: number; // 0 to 1
  speed: number;
  color: string;
}

export function InteractiveCircuitBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Track interactive states in refs for smooth animation loops
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const timeRef = useRef(0);
  const growthRef = useRef(0); // Slowly grow connection threshold on load (0 to 1)
  const themeRef = useRef({
    brandAccent: '#c41515',
    circuitStroke: 'rgba(255, 255, 255, 0.07)',
    circuitFill: 'rgba(255, 255, 255, 0.12)',
    isDark: true,
  });

  const nodesRef = useRef<NetworkNode[]>([]);
  const connectionsRef = useRef<NetworkConnection[]>([]);
  const pulsesRef = useRef<NetworkPulse[]>([]);
  const dimensionsRef = useRef({ width: 0, height: 0 });

  const [isDark, setIsDark] = useState(true);

  // Read theme colors from CSS variables
  const updateThemeColors = () => {
    if (typeof window === 'undefined') return;
    const style = getComputedStyle(document.documentElement);
    const brandAccent = style.getPropertyValue('--color-brand-accent').trim() || '#c41515';
    let circuitStroke = style.getPropertyValue('--color-circuit-stroke').trim();
    let circuitFill = style.getPropertyValue('--color-circuit-fill').trim();
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';

    // Boost light theme visibility for better UX on canvas
    if (!circuitStroke) {
      circuitStroke = isLight ? 'rgba(0, 0, 0, 0.14)' : 'rgba(255, 255, 255, 0.07)';
    } else if (isLight && circuitStroke === 'rgba(0, 0, 0, 0.08)') {
      circuitStroke = 'rgba(0, 0, 0, 0.14)';
    }

    if (!circuitFill) {
      circuitFill = isLight ? 'rgba(0, 0, 0, 0.22)' : 'rgba(255, 255, 255, 0.12)';
    } else if (isLight && circuitFill === 'rgba(0, 0, 0, 0.15)') {
      circuitFill = 'rgba(0, 0, 0, 0.22)';
    }

    setIsDark(!isLight);

    themeRef.current = {
      brandAccent,
      circuitStroke,
      circuitFill,
      isDark: !isLight,
    };
  };

  // Generate Neural Network Nodes
  const buildNeuralNetwork = (width: number, height: number) => {
    dimensionsRef.current = { width, height };
    
    const nodes: NetworkNode[] = [];
    let idCounter = 0;

    const ambientCount = Math.min(45, Math.floor((width * height) / 22000));
    const brainCoreCount = 20; // Reduced from 45 for better text readability

    const cx = width / 2;
    const cy = height / 2 - 20; // Align slightly above center to match logo

    // 1. Generate Brain Core Nodes (Double-lobed abstract brain - spread outward to frame the title)
    for (let i = 0; i < brainCoreCount; i++) {
      const isLeftLobe = Math.random() > 0.5;
      const lobeCenterX = isLeftLobe ? cx - 220 : cx + 220; // Spread lobes further out
      const lobeCenterY = cy;

      // Elliptical distribution
      const angle = Math.random() * Math.PI * 2;
      const rx = (0.2 + Math.random() * 0.8) * 120;
      const ry = (0.2 + Math.random() * 0.8) * 90;

      let homeX = lobeCenterX + Math.cos(angle) * rx;
      let homeY = lobeCenterY + Math.sin(angle) * ry;

      // Exclusion Zone: Push particles out of the central headline bounding box
      const textHalfWidth = 360; // Expanded exclusion width
      const textHalfHeight = 95; // Expanded exclusion height
      if (Math.abs(homeX - cx) < textHalfWidth && Math.abs(homeY - cy) < textHalfHeight) {
        if (homeX < cx) {
          homeX -= 180; // Push further left
        } else {
          homeX += 180; // Push further right
        }
      }

      nodes.push({
        id: `node-${idCounter++}`,
        x: homeX,
        y: homeY,
        vx: 0,
        vy: 0,
        radius: 1.6 + Math.random() * 1.4, // Increased size
        alpha: 0.12 + Math.random() * 0.18,
        isBrainCore: true,
        homeX,
        homeY,
        phase: Math.random() * Math.PI * 2,
        vibrationSpeed: 0.015 + Math.random() * 0.02,
      });
    }

    // 2. Generate Ambient Drifting Nodes
    for (let i = 0; i < ambientCount; i++) {
      nodes.push({
        id: `node-${idCounter++}`,
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: 1.0 + Math.random() * 1.2, // Increased size
        alpha: 0.08 + Math.random() * 0.14,
        isBrainCore: false,
        homeX: 0,
        homeY: 0,
        phase: 0,
        vibrationSpeed: 0,
      });
    }

    nodesRef.current = nodes;
    pulsesRef.current = [];
    connectionsRef.current = [];
    growthRef.current = 0; // Reset growth
  };

  // Handle window resizing
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const parent = canvas.parentElement;
      const w = parent ? parent.clientWidth : window.innerWidth;
      const h = parent ? parent.clientHeight : window.innerHeight;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }

      buildNeuralNetwork(w, h);
    };

    handleResize();
    updateThemeColors();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Listen for Mouse Movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Initial theme detection and observation
    updateThemeColors();
    const observer = new MutationObserver(updateThemeColors);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
    };
  }, []);

  // Spawn dynamic data pulses along connection lines
  const spawnPulse = (connections: NetworkConnection[]) => {
    const theme = themeRef.current;
    if (connections.length === 0) return;

    const randomConn = connections[Math.floor(Math.random() * connections.length)];
    
    // Choose direction randomly
    const reverse = Math.random() > 0.5;
    const fromNode = reverse ? randomConn.nodeB : randomConn.nodeA;
    const toNode = reverse ? randomConn.nodeA : randomConn.nodeB;

    // Check if pulse already traveling between these two nodes to avoid duplication
    const exists = pulsesRef.current.some(
      p => (p.fromNode.id === fromNode.id && p.toNode.id === toNode.id) ||
           (p.fromNode.id === toNode.id && p.toNode.id === fromNode.id)
    );
    if (exists) return;

    pulsesRef.current.push({
      id: `pulse-${Math.random()}`,
      fromNode,
      toNode,
      progress: 0,
      speed: 0.008 + Math.random() * 0.012, // Progress increment per frame
      color: theme.brandAccent
    });
  };

  // Animation Loop
  useEffect(() => {
    let animationId: number;

    const animate = () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      const { width, height } = dimensionsRef.current;
      const mouse = mouseRef.current;
      const theme = themeRef.current;
      const nodes = nodesRef.current;

      // Increment clock and slowly grow connection web on load
      timeRef.current += 0.02;
      growthRef.current = Math.min(1.0, growthRef.current + 0.006); // takes ~2.7 seconds to grow fully

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      // Connection distance threshold and spotlight radius
      const maxConnDist = 150; // Increased from 125 for longer connection paths
      const connectionDist = maxConnDist * growthRef.current;
      const spotlightRadius = 150;

      // 1. UPDATE NODE POSITIONS & VIBRATION
      nodes.forEach(node => {
        if (node.isBrainCore) {
          // Brain core vibrates/pulsates organically around its home coordinates
          const offsetSpeed = timeRef.current * 0.8;
          node.x = node.homeX + Math.sin(offsetSpeed + node.phase) * 8;
          node.y = node.homeY + Math.cos(offsetSpeed * 0.9 + node.phase) * 8;
        } else {
          // Ambient nodes drift randomly
          node.x += node.vx;
          node.y += node.vy;

          // Boundary bounce / wrap around with soft margins
          if (node.x < -10) node.x = width + 10;
          if (node.x > width + 10) node.x = -10;
          if (node.y < -10) node.y = height + 10;
          if (node.y > height + 10) node.y = -10;
        }
      });

      // 2. COMPUTE CONNECTIONS
      const connections: NetworkConnection[] = [];
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dist = Math.hypot(n2.x - n1.x, n2.y - n1.y);
          if (dist < connectionDist) {
            connections.push({ nodeA: n1, nodeB: n2, distance: dist });
          }
        }
      }
      connectionsRef.current = connections;

      // Spawn pulses along active connection lines
      if (Math.random() < 0.05 && pulsesRef.current.length < 18) {
        spawnPulse(connections);
      }

      // 3. DRAW CONNECTIONS (With Spotlight Glow)
      connections.forEach(conn => {
        const { nodeA, nodeB, distance } = conn;

        // Calculate opacity based on distance (boosted for clear visibility)
        const baseAlpha = (1 - distance / connectionDist) * (theme.isDark ? 0.18 : 0.14);
        let spotlightIntensity = 0;

        if (mouse.active) {
          // Find closest point on segment to mouse, or just measure distances to nodes
          const distToA = Math.hypot(mouse.x - nodeA.x, mouse.y - nodeA.y);
          const distToB = Math.hypot(mouse.x - nodeB.x, mouse.y - nodeB.y);
          const minMouseDist = Math.min(distToA, distToB);

          if (minMouseDist < spotlightRadius) {
            spotlightIntensity = 1 - minMouseDist / spotlightRadius;
          }
        }

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(nodeA.x, nodeA.y);
        ctx.lineTo(nodeB.x, nodeB.y);

        if (spotlightIntensity > 0) {
          // Draw spotlight boosted connection
          ctx.strokeStyle = theme.brandAccent;
          ctx.globalAlpha = baseAlpha + spotlightIntensity * (theme.isDark ? 0.7 : 0.5);
          ctx.lineWidth = 1.0 + spotlightIntensity * 1.0;
          ctx.shadowBlur = spotlightIntensity * 15;
          ctx.shadowColor = theme.brandAccent;
        } else {
          // Draw ambient connection
          ctx.strokeStyle = theme.circuitStroke;
          ctx.globalAlpha = baseAlpha;
          ctx.lineWidth = 0.9; // Slightly thicker
          ctx.shadowBlur = 0;
        }

        ctx.stroke();
        ctx.restore();
      });

      // 4. UPDATE AND DRAW PULSES
      const activePulses: NetworkPulse[] = [];
      pulsesRef.current.forEach(pulse => {
        pulse.progress += pulse.speed;

        // Check if connection is still valid (or complete the pulse regardless for clean flow)
        if (pulse.progress < 1.0) {
          const { fromNode, toNode, progress } = pulse;
          const px = fromNode.x + (toNode.x - fromNode.x) * progress;
          const py = fromNode.y + (toNode.y - fromNode.y) * progress;

          // Pulse spotlight check
          let pulseGlow = 0;
          if (mouse.active) {
            const mouseDist = Math.hypot(mouse.x - px, mouse.y - py);
            if (mouseDist < spotlightRadius) {
              pulseGlow = 1 - mouseDist / spotlightRadius;
            }
          }

          ctx.save();
          ctx.beginPath();
          ctx.arc(px, py, 2.0 + pulseGlow * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = theme.brandAccent;
          ctx.globalAlpha = 0.85;
          ctx.shadowBlur = 10 + pulseGlow * 12;
          ctx.shadowColor = theme.brandAccent;
          ctx.fill();
          ctx.restore();

          activePulses.push(pulse);
        } else {
          // Chain reaction hop: 30% chance to jump to another node connected to the target node
          if (Math.random() < 0.3) {
            const nextNodeCandidates = connections
              .filter(c => c.nodeA.id === pulse.toNode.id || c.nodeB.id === pulse.toNode.id)
              .map(c => c.nodeA.id === pulse.toNode.id ? c.nodeB : c.nodeA)
              .filter(n => n.id !== pulse.fromNode.id); // don't go backwards

            if (nextNodeCandidates.length > 0) {
              const nextNode = nextNodeCandidates[Math.floor(Math.random() * nextNodeCandidates.length)];
              pulsesRef.current.push({
                id: `pulse-${Math.random()}`,
                fromNode: pulse.toNode,
                toNode: nextNode,
                progress: 0,
                speed: 0.008 + Math.random() * 0.012,
                color: theme.brandAccent
              });
            }
          }
        }
      });
      pulsesRef.current = activePulses;

      // 5. DRAW NODES (With Spotlight Glow)
      nodes.forEach(node => {
        let spotlightIntensity = 0;

        if (mouse.active) {
          const dist = Math.hypot(mouse.x - node.x, mouse.y - node.y);
          if (dist < spotlightRadius) {
            spotlightIntensity = 1 - dist / spotlightRadius;
          }
        }

        // Draw node aura/halo
        if (spotlightIntensity > 0) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * (1.8 + spotlightIntensity * 1.5), 0, Math.PI * 2);
          ctx.fillStyle = theme.brandAccent;
          ctx.globalAlpha = spotlightIntensity * (theme.isDark ? 0.35 : 0.25);
          ctx.shadowBlur = spotlightIntensity * 15;
          ctx.shadowColor = theme.brandAccent;
          ctx.fill();
          ctx.restore();
        }

        // Draw node center dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + (spotlightIntensity * 1.5), 0, Math.PI * 2);
        
        if (spotlightIntensity > 0) {
          ctx.fillStyle = theme.brandAccent;
          ctx.strokeStyle = theme.brandAccent;
        } else {
          ctx.fillStyle = theme.circuitFill;
          ctx.strokeStyle = theme.circuitStroke;
        }
        
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300 opacity-90"
      style={{ mixBlendMode: isDark ? 'screen' : 'normal' }}
    />
  );
}
