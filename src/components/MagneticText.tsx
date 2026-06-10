import React, { useRef, useState, useCallback, useEffect } from "react"
import { cn } from "../lib/utils"

interface MagneticTextProps {
  baseContent: React.ReactNode
  hoverText: string
  className?: string
  hoverTextClassName?: string
  bubbleSize?: number
}

export function MagneticText({ 
  baseContent, 
  hoverText, 
  className,
  hoverTextClassName,
  bubbleSize = 250 
}: MagneticTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)
  const innerTextRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

  const mousePos = useRef({ x: 0, y: 0 })
  const currentPos = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        })
      }
    }
    updateSize()
    
    // Give it a small delay to ensure child components (like RevealText) have mounted and sized
    const timer = setTimeout(updateSize, 100)
    window.addEventListener("resize", updateSize)
    return () => {
      clearTimeout(timer)
      window.removeEventListener("resize", updateSize)
    }
  }, [])

  useEffect(() => {
    // Smoother lerp factor for fluid motion
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor

    const animate = () => {
      currentPos.current.x = lerp(currentPos.current.x, mousePos.current.x, 0.1)
      currentPos.current.y = lerp(currentPos.current.y, mousePos.current.y, 0.1)

      if (circleRef.current) {
        circleRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px) translate(-50%, -50%)`
      }

      if (innerTextRef.current) {
        innerTextRef.current.style.transform = `translate(${-currentPos.current.x}px, ${-currentPos.current.y}px)`
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mousePos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }, [])

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    mousePos.current = { x, y }
    currentPos.current = { x, y }
    setIsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
  }, [])

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn("relative inline-flex items-center justify-center cursor-default select-none w-full", className)}
    >
      {/* Base text layer - original content */}
      <div className="relative z-0 w-full flex justify-center">
        {baseContent}
      </div>

      <div
        ref={circleRef}
        className="absolute top-0 left-0 pointer-events-none rounded-full overflow-hidden z-20 shadow-[0_0_30px_rgba(164,5,5,0.8)] bg-maroon-fluid"
        style={{
          width: isHovered ? bubbleSize : 0,
          height: isHovered ? bubbleSize : 0,
          transition: "width 0.6s cubic-bezier(0.22, 1, 0.36, 1), height 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
          willChange: "transform, width, height",
        }}
      >
        <div
          ref={innerTextRef}
          className="absolute flex items-center justify-center"
          style={{
            width: containerSize.width,
            height: containerSize.height,
            top: "50%",
            left: "50%",
            willChange: "transform",
          }}
        >
          {/* Inner hover text - styled to match the base slogan typography proportions */}
          <span className={cn("font-display text-[40px] sm:text-[56px] lg:text-[80px] leading-[1.05] font-bold text-white whitespace-nowrap", hoverTextClassName)}>
            {hoverText}
          </span>
        </div>
      </div>
    </div>
  )
}
