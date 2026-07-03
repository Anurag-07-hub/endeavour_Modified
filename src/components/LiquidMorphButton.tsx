import { Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import React, { useState } from 'react';

export function LiquidMorphButton({ onClick }: { onClick: () => void }) {
  const filterId = React.useId().replace(/:/g, '');
  const [clicked, setClicked] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    setClicked(true);
    onClick?.();
    setTimeout(() => setClicked(false), 800);
  };

  return (
    <>
      <style>
        {`
          .lmb-wrapper {
            position: relative;
            overflow: hidden;
            isolation: isolate;
            outline: none;
          }
          
          .lmb-bg {
            position: absolute;
            inset: 0;
            z-index: -1;
            filter: url(#${filterId});
            pointer-events: none;
          }
          
          .lmb-blob {
            position: absolute;
            width: 24px;
            height: 24px;
            border-radius: 999px;
            bottom: -32px;
            transform: translateY(0) scale(0);
            transition: transform 700ms cubic-bezier(0.23, 1, 0.32, 1);
            will-change: transform;
          }
          
          .lmb-blob:nth-child(1) { left: calc(50% - 56px); transition-delay: 0ms; transform: translateX(-50%) translateY(0) scale(0); }
          .lmb-blob:nth-child(2) { left: 50%; transition-delay: 50ms; transform: translateX(-50%) translateY(0) scale(0); }
          .lmb-blob:nth-child(3) { left: calc(50% + 56px); transition-delay: 100ms; transform: translateX(-50%) translateY(0) scale(0); }
          
          .lmb-wrapper:not(.clicked):hover .lmb-blob {
            transform: translateX(-50%) translateY(-200%) scale(3.5);
          }

          .lmb-wrapper.clicked .lmb-blob {
            transform: translateX(-50%) translateY(-200%) scale(10) !important;
            transition-duration: 300ms !important;
            transition-delay: 0ms !important;
          }
        `}
      </style>
      
      <Link
        to="/join-us"
        onClick={handleClick}
        className={`lmb-wrapper group flex items-center justify-center w-6 h-6 sm:w-10 sm:h-10 md:w-auto md:h-auto md:px-[24px] md:py-[12px] rounded-full border border-brand-accent text-brand-accent text-[13px] uppercase tracking-[2px] transition-colors duration-500 font-sans font-black whitespace-nowrap shrink-0 ${clicked ? 'clicked text-brand-bg' : 'hover:text-brand-bg'}`}
        title="Join Us"
      >
        <span className="hidden md:inline relative z-20">Join Us</span>
        <UserPlus className="w-3 h-3 sm:w-[18px] sm:h-[18px] md:hidden relative z-20" />
        
        {/* Liquid Background */}
        <span className="lmb-bg" aria-hidden="true">
          <span className="lmb-blob bg-brand-accent"></span>
          <span className="lmb-blob bg-brand-accent"></span>
          <span className="lmb-blob bg-brand-accent"></span>
        </span>
      </Link>

      <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
        <defs>
          <filter id={filterId}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
    </>
  );
}
