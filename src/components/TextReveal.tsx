"use client";

import React, { useMemo, useState, type ElementType, type CSSProperties } from "react";

export interface TextRevealProps {
  text: string;
  as?: ElementType;
  href?: string;
  target?: string;
  className?: string;
  style?: CSSProperties;
  fontSize?: string;
  staggerDelay?: number;
  duration?: number;
  easing?: string;
  color?: string;
  hoverColor?: string;
  direction?: "up" | "down";
  onClick?: (e: React.MouseEvent) => void;
  autoPlay?: boolean;
}

const TextReveal = React.memo(function TextReveal({
  text,
  as: Component = "span",
  href,
  target,
  className = "",
  style,
  fontSize = "inherit",
  staggerDelay = 25,
  duration = 250,
  easing = "ease-in-out",
  color = "inherit",
  hoverColor = "#ef4444",
  direction = "up",
  onClick,
  autoPlay = false,
}: TextRevealProps) {
  const [hovered, setHovered] = useState(false);

  const chars = useMemo(() => {
    if (typeof Intl !== "undefined" && Intl.Segmenter) {
      const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
      return Array.from(segmenter.segment(text), (s) => s.segment);
    }
    return [...text];
  }, [text]);

  React.useEffect(() => {
    if (autoPlay) {
      // Small delay to ensure component is mounted and visible
      const startTimer = setTimeout(() => {
        setHovered(true);
        const totalDuration = duration + chars.length * staggerDelay;
        const endTimer = setTimeout(() => {
          setHovered(false);
        }, totalDuration + 200);
        return () => clearTimeout(endTimer);
      }, 500);
      return () => clearTimeout(startTimer);
    }
  }, [autoPlay, duration, chars.length, staggerDelay]);

  const sign = direction === "up" ? 1 : -1;

  const rootProps: Record<string, unknown> = {
    className: `inline-block relative no-underline cursor-pointer select-none ${className}`.trim(),
    style: {
      fontSize,
      color: hovered ? hoverColor : color,
      transition: "color 0.35s ease",
      lineHeight: 1,
      ...style,
    },
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onClick,
    "aria-label": text,
  };

  if (Component === "a") {
    rootProps.href = href ?? "#";
    if (target) rootProps.target = target;
    if (target === "_blank") rootProps.rel = "noopener noreferrer";
  }

  const CustomComponent = Component as any;

  return (
    <CustomComponent {...rootProps}>
      <span
        className="inline-flex overflow-hidden relative"
        style={{ height: "1.1em", paddingBottom: "0.1em" }}
        aria-hidden="true"
      >
        {chars.map((char, i) => (
          <span
            key={i}
            className="inline-block relative will-change-transform"
          >
            {/* Original character */}
            <span
              className="inline-block transition-transform"
              style={{
                transition: `transform ${duration}ms ${easing}`,
                transitionDelay: `${i * staggerDelay}ms`,
                transform: hovered
                  ? `translateY(${-sign * 100}%)`
                  : "translateY(0%)",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
            {/* Hover character */}
            <span
              className="absolute left-0 top-0 inline-block transition-transform"
              style={{
                transition: `transform ${duration}ms ${easing}`,
                transitionDelay: `${i * staggerDelay}ms`,
                transform: hovered
                  ? "translateY(0%)"
                  : `translateY(${sign * 100}%)`,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          </span>
        ))}
      </span>
    </CustomComponent>
  );
});

TextReveal.displayName = "TextReveal";
export { TextReveal };
