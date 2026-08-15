import React, { useState } from 'react';
import { ArrowUpRight, Globe, Maximize2 } from 'lucide-react';
import NodeThumbnail from './NodeThumbnail';
import { bioSynthesizer } from '../audio/bioSynthesizer';

export default function ProjectNodeCard({ project, onSelect, onHover, onHoverEnd }) {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
    bioSynthesizer.triggerSynapticImpulse();
    if (onHover) onHover(project.id);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (onHoverEnd) onHoverEnd();
  };

  const handleCardClick = (e) => {
    e.stopPropagation();
    bioSynthesizer.triggerSynapticImpulse();
    onSelect(project);
  };

  const handleDirectPopout = (e) => {
    e.stopPropagation();
    bioSynthesizer.triggerSynapticImpulse();
    const w = Math.min(1360, Math.round(window.screen.width * 0.88));
    const h = Math.min(900, Math.round(window.screen.height * 0.85));
    const left = Math.max(0, Math.round((window.screen.width - w) / 2));
    const top = Math.max(0, Math.round((window.screen.height - h) / 2));
    window.open(
      project.url,
      `technosomatic_win_${project.id}`,
      `width=${w},height=${h},top=${top},left=${left},resizable=yes,scrollbars=yes,status=yes`
    );
  };

  return (
    <div
      data-node-card="true"
      className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto cursor-pointer group"
      style={{ left: project.coords.x, top: project.coords.y }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
    >
      {/* High-Contrast Pure White Minimalist Anchor Card */}
      <div 
        className={`w-[300px] sm:w-[330px] p-4 rounded-xl bg-white text-zinc-950 border border-[#111111] transition-all duration-300 ease-out ${
          hovered 
            ? 'scale-105 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.2)] -translate-y-2 border-black' 
            : 'shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-black'
        }`}
      >
        {/* Visual Preview Frame with Fine 1px Solid #111111 Border */}
        <div className="mb-3 rounded-lg overflow-hidden border border-[#111111]">
          <NodeThumbnail 
            nodeId={project.id} 
            title={project.title} 
            coords={project.coords} 
            isHovered={hovered} 
          />
        </div>

        {/* Index Tag & Coordinate Status */}
        <div className="flex items-center justify-between text-xs font-mono mb-2">
          <span className="text-[10px] font-bold tracking-widest text-zinc-900 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-300">
            {project.indexTag || `${project.index} // PORTAL`}
          </span>

          <span className="text-[10px] text-zinc-500 font-mono font-semibold">
            LOC [{project.coords.x}, {project.coords.y}]
          </span>
        </div>

        {/* Project Title */}
        <h3 className="text-base sm:text-lg font-bold font-heading text-black group-hover:text-zinc-800 transition-colors mb-1 leading-snug">
          {project.title}
        </h3>
        
        {/* Category */}
        <div className="text-[11px] font-mono text-zinc-500 mb-2">
          // {project.category}
        </div>

        {/* Summary Description */}
        <p className="text-xs text-zinc-600 leading-relaxed line-clamp-2 mb-3.5 font-body">
          {project.summary}
        </p>

        {/* Action Buttons Footer */}
        <div className="pt-2.5 border-t border-zinc-200 flex items-center justify-between text-xs font-mono">
          <button
            onClick={handleDirectPopout}
            className="p-1.5 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-800 flex items-center gap-1 text-[10px] font-bold border border-zinc-300 transition-colors"
            title="Open Standalone Pop-up Window"
          >
            <Globe className="w-3 h-3 text-black" />
            <span>POP-OUT</span>
          </button>

          <button
            onClick={handleCardClick}
            className="flex items-center gap-1.5 font-bold text-black group-hover:underline text-xs bg-black text-white px-3 py-1 rounded-full hover:bg-zinc-800 transition-all shadow-sm"
          >
            <span>OPEN POP-UP</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
