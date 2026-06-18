import { useState, useEffect, useRef } from 'react';

interface TypeWriterProps {
  text: string;
  speed?: number;   // ms per character
  delay?: number;   // ms before starting
  className?: string;
  cursor?: boolean;
}

export function TypeWriter({ text, speed = 60, delay = 0, className = '', cursor = true }: TypeWriterProps) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Start typing only when element is visible in viewport
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observerRef.current?.disconnect();
          setTimeout(() => setStarted(true), delay);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observerRef.current.observe(ref.current);
    return () => observerRef.current?.disconnect();
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    setDisplayed('');
    setDone(false);
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [started, text, speed]);

  return (
    <span ref={ref} className={className}>
      {displayed}
    </span>
  );
}
