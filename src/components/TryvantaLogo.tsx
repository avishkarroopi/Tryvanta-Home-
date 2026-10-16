import React from 'react';

interface TryvantaLogoProps {
  className?: string;
  size?: number;
  showWordmark?: boolean;
}

export const TryvantaLogo: React.FC<TryvantaLogoProps> = ({
  className = '',
  size = 32,
  showWordmark = false,
}) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Exact Stylized Tryvanta "T" Mark from the images */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
      >
        <defs>
          <linearGradient id="tryvanta-pink-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff4081" />
            <stop offset="50%" stopColor="#e91e63" />
            <stop offset="100%" stopColor="#d81b60" />
          </linearGradient>
          <linearGradient id="tryvanta-accent-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#f48fb1" />
            <stop offset="100%" stopColor="#ff4081" />
          </linearGradient>
          <filter id="logo-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#ff4081" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Stem of the T */}
        <path
          d="M26 22H36V54C36 55.1 35.1 56 34 56H28C26.9 56 26 55.1 26 54V22Z"
          fill="url(#tryvanta-pink-grad)"
          filter="url(#logo-glow)"
        />

        {/* Left top wing */}
        <path
          d="M10 14C10 12.9 10.9 12 12 12H34V22H14C11.8 22 10 20.2 10 18V14Z"
          fill="#FFFFFF"
        />

        {/* Right swooping dynamic wing / flourish */}
        <path
          d="M32 12H50C54.4 12 56 16.5 53 19.5L44 28.5C41 31.5 36.5 32 32 29V12Z"
          fill="url(#tryvanta-pink-grad)"
          filter="url(#logo-glow)"
        />

        {/* Dynamic sweeping ribbon accent */}
        <path
          d="M48 24C53 30 54 39 46 47C42 51 38 49 39 44C40 40 45 35 48 24Z"
          fill="url(#tryvanta-pink-grad)"
          opacity="0.9"
        />
      </svg>

      {showWordmark && (
        <span className="text-xl font-medium tracking-[0.25em] text-white uppercase whitespace-nowrap">
          TRYVANTA
        </span>
      )}
    </div>
  );
};
