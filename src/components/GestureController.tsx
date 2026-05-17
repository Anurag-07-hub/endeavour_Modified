import React, { useEffect, useRef } from 'react';
import { useGesture } from '../context/GestureContext';

export function GestureController() {
  const { isGestureEnabled, turnOffGestures } = useGesture();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isGestureEnabled) return;

    // VERY IMPORTANT: Disable native CSS smooth scrolling!
    // Otherwise, window.scrollTo at 60fps fights with CSS transitions and causes massive jitter.
    document.documentElement.style.scrollBehavior = 'auto';

    let targetScrollVelocity = 0;
    let currentScrollVelocity = 0;
    const SCROLL_SPEED = 18;
    let currentScrollY = window.scrollY;
    let animationFrameId: number;

    const updateScroll = () => {
      if (targetScrollVelocity === 0) {
        currentScrollVelocity = 0; // Instant stop
      } else {
        // Smoothly interpolate the velocity when accelerating
        currentScrollVelocity = currentScrollVelocity + (targetScrollVelocity - currentScrollVelocity) * 0.15;
      }
      
      if (Math.abs(currentScrollVelocity) > 0.1) {
        currentScrollY += currentScrollVelocity;
        
        // Clamp to document bounds
        if (currentScrollY < 0) { currentScrollY = 0; currentScrollVelocity = 0; }
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (currentScrollY > maxScroll) { currentScrollY = maxScroll; currentScrollVelocity = 0; }

        window.scrollTo(0, currentScrollY);
      } else {
        // Sync if idle to avoid fighting native manual scroll
        currentScrollY = window.scrollY;
        currentScrollVelocity = 0;
      }
      animationFrameId = requestAnimationFrame(updateScroll);
    };
    animationFrameId = requestAnimationFrame(updateScroll);

    const handleManualScroll = () => {
      if (Math.abs(currentScrollVelocity) < 1) {
        currentScrollY = window.scrollY;
      }
    };
    window.addEventListener('scroll', handleManualScroll);

    function dist(p1: any, p2: any) {
      return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    }

    const analyzeHand = (landmarks: any) => {
      const wrist = landmarks[0];
      
      // A finger is extended if its tip is significantly further from the wrist than its MCP
      const indexUp = dist(landmarks[8], wrist) > dist(landmarks[5], wrist) * 1.25;
      const middleUp = dist(landmarks[12], wrist) > dist(landmarks[9], wrist) * 1.25;
      const ringUp = dist(landmarks[16], wrist) > dist(landmarks[13], wrist) * 1.25;
      const pinkyUp = dist(landmarks[20], wrist) > dist(landmarks[17], wrist) * 1.25;
      const thumbOut = dist(landmarks[4], landmarks[17]) > dist(landmarks[5], landmarks[17]) * 1.2;

      // Continuous Scrolling logic
      const isPointingUp = indexUp && !middleUp && !ringUp && !pinkyUp;
      const isPeaceSign = indexUp && middleUp && !ringUp && !pinkyUp;
      const isTurnOffGesture = indexUp && middleUp && ringUp && pinkyUp && !thumbOut;

      if (isTurnOffGesture) {
        turnOffGestures();
      } else if (isPointingUp) {
        targetScrollVelocity = SCROLL_SPEED; // Scroll Down
      } else if (isPeaceSign) {
        targetScrollVelocity = -SCROLL_SPEED; // Scroll Up
      } else {
        targetScrollVelocity = 0; // Stop Scrolling
      }
    };

    const onResults = (results: any) => {
      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        // Just take the first detected hand
        const landmarks = results.multiHandLandmarks[0];
        analyzeHand(landmarks);
      } else {
        targetScrollVelocity = 0; // Stop scrolling if hand leaves camera
      }
    };

    // Initialize MediaPipe
    const hands = new (window as any).Hands({
      locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });
    hands.onResults(onResults);

    const camera = new (window as any).Camera(videoRef.current, {
      onFrame: async () => {
        if (videoRef.current) {
          await hands.send({ image: videoRef.current });
        }
      },
      width: 320,
      height: 240
    });

    camera.start();

    return () => {
      document.documentElement.style.scrollBehavior = ''; // Restore original CSS behavior
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleManualScroll);
      camera.stop();
      hands.close();
    };
  }, [isGestureEnabled]);

  // Completely hidden elements required for camera/processing
  return (
    <div style={{ display: 'none' }}>
      <video ref={videoRef} playsInline></video>
      <canvas ref={canvasRef} width="320" height="240"></canvas>
    </div>
  );
}
