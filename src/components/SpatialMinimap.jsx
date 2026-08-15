import React from 'react';
import { Compass, Maximize2 } from 'lucide-react';

export default function SpatialMinimap({ 
  pan, 
  zoom, 
  projects, 
  onJumpTo, 
  onReset 
}) {
  const mapSize = 170;
  const worldRadius = 900;

  const mapX = (x) => (x / worldRadius) * (mapSize / 2) + mapSize / 2;
  const mapY = (y) => (y / worldRadius) * (mapSize / 2) + mapSize / 2;

  const viewWidth = (window.innerWidth / zoom / worldRadius) * (mapSize / 2);
  const viewHeight = (window.innerHeight / zoom / worldRadius) * (mapSize / 2);
  const viewX = mapX(-pan.x) - viewWidth / 2;
  const viewY = mapY(-pan.y) - viewHeight / 2;

  return (
    <div className="fixed bottom-6 right-6 z-40 bg-white/90 backdrop-blur-md p-3 border border-[#111111] rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex flex-col gap-2">
      <div className="flex items-center justify-between font-mono text-[10px] text-zinc-600 border-b border-zinc-200 pb-1.5">
        <span className="flex items-center gap-1 font-bold text-black">
          <Compass className="w-3.5 h-3.5 animate-spin-slow text-black" /> RADAR NAV
        </span>
        <button 
          onClick={onReset}
          className="hover:text-black flex items-center gap-1 transition-colors text-zinc-500 font-semibold"
          title="Recenter Viewport (0,0)"
        >
          <Maximize2 className="w-3 h-3" /> RESET
        </button>
      </div>

      {/* Radar Map Canvas */}
      <div 
        className="relative w-[170px] h-[170px] bg-[#FAFAFA] rounded-lg border border-zinc-300 overflow-hidden cursor-crosshair group shadow-inner"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const clickY = e.clientY - rect.top;

          const worldX = ((clickX - mapSize / 2) / (mapSize / 2)) * worldRadius;
          const worldY = ((clickY - mapSize / 2) / (mapSize / 2)) * worldRadius;

          onJumpTo(-worldX, -worldY);
        }}
      >
        {/* Radar concentric rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-32 h-32 rounded-full border border-zinc-300"></div>
          <div className="w-20 h-20 rounded-full border border-zinc-300 absolute"></div>
          <div className="w-full h-[1px] bg-zinc-200 absolute"></div>
          <div className="h-full w-[1px] bg-zinc-200 absolute"></div>
        </div>

        {/* Center Root Node (0,0) */}
        <div 
          className="absolute w-2.5 h-2.5 rounded-full bg-black shadow-[0_0_6px_rgba(0,0,0,0.5)] transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ left: mapX(0), top: mapY(0) }}
        ></div>

        {/* Color-Coded Project Node Blips */}
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="absolute w-2.5 h-2.5 rounded-full border border-white transform -translate-x-1/2 -translate-y-1/2 transition-transform group-hover:scale-125"
            style={{ 
              left: mapX(proj.coords.x), 
              top: mapY(proj.coords.y),
              backgroundColor: proj.color || '#111111',
              boxShadow: `0 0 6px ${proj.color || '#111111'}60`
            }}
            title={proj.title}
          ></div>
        ))}

        {/* Viewport Box */}
        <div
          className="absolute border-2 border-black bg-black/5 pointer-events-none transition-all duration-75 rounded-sm"
          style={{
            left: Math.max(0, Math.min(mapSize - viewWidth, viewX)),
            top: Math.max(0, Math.min(mapSize - viewHeight, viewY)),
            width: Math.min(mapSize, viewWidth),
            height: Math.min(mapSize, viewHeight)
          }}
        ></div>
      </div>

      <div className="flex items-center justify-between font-mono text-[9px] text-zinc-500 pt-0.5">
        <span>X: {Math.round(-pan.x)} Y: {Math.round(-pan.y)}</span>
        <span>ZOOM: {(zoom).toFixed(2)}x</span>
      </div>
    </div>
  );
}
