import React, { useEffect, useRef } from 'react';
import { useGesture } from '../context/GestureContext';

export function GestureController() {
  const { isGestureEnabled, turnOffGestures } = useGesture();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isGestureEnabled) return;

    // VERY IMPORTANT: Disable native CSS smooth scrolling!
    document.documentElement.style.scrollBehavior = 'auto';

    let targetScrollVelocity = 0;
    let currentScrollVelocity = 0;
    const SCROLL_SPEED = 18;
    let currentScrollY = window.scrollY;
    let animationFrameId: number;
    let localStream: MediaStream | null = null;
    let isStreamActive = true;

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

    const analyzeHand = (landmarks: any) => {
      // Robust height check: if a tip is higher (smaller y coordinate) than the PIP and MCP joints, it is extended
      const indexUp = landmarks[8].y < landmarks[6].y && landmarks[8].y < landmarks[5].y;
      const middleUp = landmarks[12].y < landmarks[10].y && landmarks[12].y < landmarks[9].y;
      const ringUp = landmarks[16].y < landmarks[14].y && landmarks[16].y < landmarks[13].y;
      const pinkyUp = landmarks[20].y < landmarks[18].y && landmarks[20].y < landmarks[17].y;

      // Gesture mapping
      const isPointingUp = indexUp && !middleUp && !ringUp && !pinkyUp;
      const isPeaceSign = indexUp && middleUp && !ringUp && !pinkyUp;
      const isTurnOffGesture = indexUp && middleUp && ringUp && pinkyUp;

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
        const landmarks = results.multiHandLandmarks[0];
        analyzeHand(landmarks);
      } else {
        targetScrollVelocity = 0;
      }
    };

    // Initialize MediaPipe Hands
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

    // Instantly stop gesture scrolling if the user touches the screen manually
    const handleTouch = () => {
      targetScrollVelocity = 0;
      currentScrollVelocity = 0;
      currentScrollY = window.scrollY;
    };
    window.addEventListener('touchstart', handleTouch, { passive: true });
    window.addEventListener('touchmove', handleTouch, { passive: true });

    // Custom WebRTC getUserMedia implementation for reliable startup & shutdown control
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: 320,
            height: 240,
            facingMode: 'user'
          },
          audio: false
        });

        if (!isStreamActive) {
          stream.getTracks().forEach(track => track.stop());
          return;
        }

        localStream = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(err => console.log("Video playback warning:", err));
        }

        const processFrame = async () => {
          if (!isStreamActive || !videoRef.current) return;
          if (videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
            try {
              await hands.send({ image: videoRef.current });
            } catch (err) {
              console.error("Hands detection frame error:", err);
            }
          }
          if (isStreamActive) {
            animationFrameId = requestAnimationFrame(processFrame);
          }
        };
        animationFrameId = requestAnimationFrame(processFrame);

      } catch (err) {
        console.error("Camera access failed:", err);
      }
    };

    startCamera();

    return () => {
      isStreamActive = false;
      document.documentElement.style.scrollBehavior = ''; // Restore original CSS behavior
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleManualScroll);
      window.removeEventListener('touchstart', handleTouch);
      window.removeEventListener('touchmove', handleTouch);
      
      if (localStream) {
        localStream.getTracks().forEach(track => {
          track.stop();
        });
      }
      try {
        hands.close();
      } catch (err) {
        console.log("Error closing MediaPipe hands:", err);
      }
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
