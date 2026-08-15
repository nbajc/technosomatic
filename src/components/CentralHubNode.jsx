import React from 'react';

export default function CentralHubNode() {
  return (
    <div 
      className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-10"
      style={{ left: 0, top: 0 }}
    >
      {/* Central Logo / Monogram Hub (50% Opacity, pointer-events: none, <= 1/3 radial diameter) */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Subtle center coordinate reticle */}
        <div className="absolute w-44 h-44 rounded-full border border-black/10 pointer-events-none"></div>
        <div className="absolute w-2 h-2 rounded-full bg-black/40 pointer-events-none"></div>

        {/* 50% Opacity Logo Container */}
        <div 
          className="w-40 h-40 sm:w-44 sm:h-44 rounded-2xl overflow-hidden flex items-center justify-center p-2 transition-opacity duration-300"
          style={{ opacity: 0.5 }}
        >
          <img 
            src="/technosomatic_logo.jpg" 
            alt="Technosomatic" 
            className="w-full h-full object-contain mix-blend-multiply"
          />
        </div>
      </div>
    </div>
  );
}
