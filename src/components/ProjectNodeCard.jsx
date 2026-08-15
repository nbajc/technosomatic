import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
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

  const handleClick = (e) => {
    e.stopPropagation();
    bioSynthesizer.triggerSynapticImpulse();
    onSelect(project);
  };

  return (
    <div
      data-node-card="true"
      className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto cursor-pointer select-none"
      style={{ left: project.coords.x, top: project.coords.y }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Interactive Color-Coded Rectangular Button Displaying Only Project Title */}
      <button
        type="button"
        className={`group relative flex items-center gap-3 px-5 py-3 sm:px-6 sm:py-3.5 rounded-lg bg-white border text-zinc-950 transition-all duration-200 ease-out active:scale-95 ${
          hovered 
            ? 'scale-108 -translate-y-1 border-transparent shadow-[0_16px_40px_-5px_rgba(0,0,0,0.18)]' 
            : 'border-[#111111] shadow-[0_6px_20px_rgba(0,0,0,0.06)]'
        }`}
        style={{
          boxShadow: hovered 
            ? `0 16px 36px -6px ${project.color}35, 0 0 0 2px ${project.color}` 
            : undefined,
          borderColor: hovered ? project.color : '#111111'
        }}
      >
        {/* Left Color-Coded Accent Indicator */}
        <span 
          className="w-2.5 h-2.5 rounded-sm transition-transform duration-200 group-hover:scale-125 shrink-0"
          style={{ 
            backgroundColor: project.color,
            boxShadow: hovered ? `0 0 10px ${project.color}` : 'none'
          }}
        />

        {/* Project Title ONLY */}
        <span className="font-heading font-bold text-xs sm:text-sm tracking-wide text-black group-hover:text-zinc-900 whitespace-nowrap">
          {project.title}
        </span>

        {/* Hover Arrow Micro-interaction */}
        <ArrowUpRight 
          className="w-3.5 h-3.5 transition-all duration-200 text-zinc-400 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 ml-0.5" 
          style={{ color: hovered ? project.color : undefined }}
        />

        {/* Terminal Docking Ping on Hover */}
        {hovered && (
          <span 
            className="absolute -inset-1 rounded-xl pointer-events-none animate-ping opacity-25"
            style={{ backgroundColor: project.color }}
          />
        )}
      </button>
    </div>
  );
}
