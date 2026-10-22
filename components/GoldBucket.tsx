import React from 'react';

export const GoldBucket: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`relative ${className} animate-float`} title="Yaeger's Bucket">
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full filter drop-shadow-[0_0_15px_rgba(234,179,8,0.4)]"
      >
        <defs>
          <linearGradient id="isoSide" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FACC15" />
            <stop offset="50%" stopColor="#CA8A04" />
            <stop offset="100%" stopColor="#854D0E" />
          </linearGradient>
          <linearGradient id="isoTop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="100%" stopColor="#FACC15" />
          </linearGradient>
          <linearGradient id="isoInside" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#713F12" />
            <stop offset="100%" stopColor="#A16207" />
          </linearGradient>
        </defs>

        {/* Isometric Projection approx 30deg */}
        
        {/* Back handle */}
        <path d="M60 50 C 60 20, 140 20, 140 50" stroke="#94a3b8" strokeWidth="8" strokeLinecap="round" />

        {/* Bucket Body - Main Shape */}
        <path 
          d="M40 60 L 60 160 C 60 175, 140 175, 140 160 L 160 60" 
          fill="url(#isoSide)" 
        />
        
        {/* Inner shadow/depth */}
        <ellipse cx="100" cy="60" rx="60" ry="20" fill="url(#isoInside)" />
        
        {/* Top Rim */}
        <path 
          d="M 160 60 A 60 20 0 0 1 40 60 A 60 20 0 0 1 160 60" 
          fill="none" 
          stroke="#FDE047" 
          strokeWidth="4" 
        />
        
        {/* Front Lip Highlight */}
        <path 
          d="M 42 62 C 42 75, 158 75, 158 62" 
          fill="none" 
          stroke="white" 
          strokeOpacity="0.4" 
          strokeWidth="2" 
        />

        {/* Specular Highlight on Body */}
        <path 
          d="M 45 70 L 60 150" 
          stroke="white" 
          strokeOpacity="0.3" 
          strokeWidth="4" 
          strokeLinecap="round" 
        />

        {/* Front handle connection */}
        <circle cx="40" cy="55" r="4" fill="#cbd5e1" />
        <circle cx="160" cy="55" r="4" fill="#cbd5e1" />

      </svg>
    </div>
  );
};