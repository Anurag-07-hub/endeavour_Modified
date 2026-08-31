"use client";

import { cn } from "../lib/utils";

type Align = "left" | "center" | "right";

interface GradientWaveTextProps {
  children?: React.ReactNode;
  align?: Align;
  className?: string;

  speed?: number; 
  paused?: boolean;
  delay?: number;
  repeat?: boolean;
  inView?: boolean;
  once?: boolean;

  radial?: boolean;
  bottomOffset?: number;
  bandGap?: number;
  bandCount?: number;
  customColors?: string[];

  onClick?: (e: React.MouseEvent) => void;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;

  ariaLabel?: string;
}

export function GradientWaveText({
  children,
  align = "center",
  className,
  onClick,
  onMouseEnter,
  onMouseLeave,
  ariaLabel,
}: GradientWaveTextProps) {
  const justifyContent =
    align === "left"
      ? "flex-start"
      : align === "right"
        ? "flex-end"
        : "center";

  return (
    <div
      className={cn("flex w-full h-full items-center", className)}
      style={{ justifyContent } as React.CSSProperties}
      aria-label={ariaLabel || undefined}
      role={ariaLabel ? "img" : undefined}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span
        style={{
          textAlign: align,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          display: "inline-block",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}
      >
        {children}
      </span>
    </div>
  );
}

export default GradientWaveText;
