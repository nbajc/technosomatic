import React, { useState } from 'react';
import { ExternalLink, Activity, ArrowUpRight } from 'lucide-react';
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

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto cursor-pointer group"
      style={{ left: project.coords.x, top: project.coords.y }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
    >
      {/* High-Contrast Pure White Minimalist Anchor Card */}
      <div 
        className={`w-[300px] sm:w-[330px] p-4 rounded-xl bg-white text-zinc-950 border border-[#111111] transition-all duration-300 ease-out ${
          hovered 
            ? 'scale-105 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.18)] -translate-y-2 border-black' 
            : 'shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-black'
        }`}
      >
        {/* Visual Preview Frame with Fine 1px Solid #111111 Border */}
        <div className="mb-3.5 rounded-lg overflow-hidden">
          <NodeThumbnail 
            nodeId={project.id} 
            title={project.title} 
            coords={project.coords} 
            isHovered={hovered} 
          />
        </div>

        {/* Index Tag & Status */}
        <div className="flex items-center justify-between text-xs font-mono mb-2">
          <span className="text-[10px] font-bold tracking-widest text-zinc-900 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-300">
            {project.indexTag || `${project.index} // PORTAL`}
          </span>

          <span className="text-[10px] text-zinc-500 font-mono font-semibold">
            LOC [{project.coords.x}, {project.coords.y}]
          </span>
        </div>

        {/* Project Title */}
        <h3 className="text-base sm:text-lg font-bold font-heading text-black group-hover:text-zinc-800 transition-colors mb-1">
          {project.title}
        </h3>
        
        {/* Category Description */}
        <div className="text-[11px] font-mono text-zinc-500 mb-2">
          // {project.category}
        </div>

        {/* Summary Description */}
        <p className="text-xs text-zinc-600 leading-relaxed line-clamp-2 mb-3.5 font-body">
          {project.summary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3.5">
          {project.tags.map((t, idx) => (
            <span key={idx} className="text-[9px] font-mono text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200">
              #{t}
            </span>
          ))}
        </div>

        {/* Action Footer */}
        <div className="pt-2.5 border-t border-zinc-200 flex items-center justify-between text-xs font-mono">
          <span className="text-zinc-500 text-[10px] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            {project.stats?.type || 'Live Node'}
          </span>

          <span className="flex items-center gap-1 font-bold text-black group-hover:underline text-[11px]">
            <span>OPEN PORTAL</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>

      </div>
    </div>
  );
}
