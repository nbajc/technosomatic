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
  const padding = 60; // Distance from viewport edge

  return (
    <div className="fixed inset-0 pointer-events-none z-30">
      {projects.map((proj) => {
        // Calculate screen coordinates of the node relative to viewport center
        const screenX = halfW + (proj.coords.x + pan.x) * zoom;
        const screenY = halfH + (proj.coords.y + pan.y) * zoom;

        // Check if node is off-screen
        const isOffScreen = 
          screenX < padding || 
          screenX > window.innerWidth - padding || 
          screenY < padding || 
          screenY > window.innerHeight - padding;

        if (!isOffScreen) return null;

        // Calculate angle from center of viewport to node
        const dx = screenX - halfW;
        const dy = screenY - halfH;
        const angle = Math.atan2(dy, dx);

        // Clamp to screen border bounding box
        let edgeX = halfW + Math.cos(angle) * (halfW - padding);
        let edgeY = halfH + Math.sin(angle) * (halfH - padding);

        // Calculate distance in world units
        const dist = Math.round(Math.sqrt(proj.coords.x * proj.coords.x + proj.coords.y * proj.coords.y));

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
            <div className="glass-panel px-3 py-1.5 flex items-center gap-2 border-emerald-400/40 hover:border-emerald-400 hover:scale-105 transition-all shadow-[0_0_15px_rgba(0,245,160,0.2)]">
              <Navigation 
                className="w-3.5 h-3.5 text-emerald-400 transition-transform group-hover:scale-110" 
                style={{ transform: `rotate(${angle * (180 / Math.PI) + 90}deg)` }}
              />
              <div>
                <div className="font-heading font-bold text-xs text-white group-hover:text-emerald-400 transition-colors">
                  {proj.title}
                </div>
                <div className="font-mono text-[9px] text-slate-400 flex items-center gap-1">
                  <span className="text-emerald-400 font-bold">{dist}u</span>
                  <span>// CLICK TO PAN</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
