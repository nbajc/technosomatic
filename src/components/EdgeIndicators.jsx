import React from 'react';
import { Navigation } from 'lucide-react';
import { bioSynthesizer } from '../audio/bioSynthesizer';

export default function EdgeIndicators({ 
  pan, 
  zoom, 
  projects, 
  onJumpTo 
}) {
  const halfW = window.innerWidth / 2;
  const halfH = window.innerHeight / 2;
  const padding = 65;

  return (
    <div className="fixed inset-0 pointer-events-none z-30">
      {projects.map((proj) => {
        const screenX = halfW + (proj.coords.x + pan.x) * zoom;
        const screenY = halfH + (proj.coords.y + pan.y) * zoom;

        const isOffScreen = 
          screenX < padding || 
          screenX > window.innerWidth - padding || 
          screenY < padding || 
          screenY > window.innerHeight - padding;

        if (!isOffScreen) return null;

        const dx = screenX - halfW;
        const dy = screenY - halfH;
        const angle = Math.atan2(dy, dx);

        let edgeX = halfW + Math.cos(angle) * (halfW - padding);
        let edgeY = halfH + Math.sin(angle) * (halfH - padding);

        const dist = Math.round(Math.hypot(proj.coords.x, proj.coords.y));

        return (
          <div
            key={proj.id}
            onClick={() => {
              bioSynthesizer.triggerSynapticImpulse();
              onJumpTo(-proj.coords.x, -proj.coords.y);
            }}
            className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{ left: edgeX, top: edgeY }}
          >
            <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#111111] hover:border-black hover:scale-105 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.1)] flex items-center gap-2">
              <Navigation 
                className="w-3.5 h-3.5 text-black transition-transform group-hover:scale-110" 
                style={{ transform: `rotate(${angle * (180 / Math.PI) + 90}deg)` }}
              />
              <div>
                <div className="font-heading font-bold text-xs text-black truncate max-w-[140px]">
                  {proj.title}
                </div>
                <div className="font-mono text-[9px] text-zinc-500 flex items-center gap-1">
                  <span className="font-bold text-black">{dist}u</span>
                  <span>// JUMP TO NODE</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
