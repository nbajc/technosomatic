import React, { useState } from 'react';
import { bioSynthesizer } from '../audio/bioSynthesizer';

export default function ProjectNodeCard({ project, onSelect, onHover, onHoverEnd }) {
  const [hovered, setHovered] = useState(false);
  const nodeColor = project.dotColor || project.color;

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
      {/* Interactive Color-Coded Rectangular Button */}
      <button
        type="button"
        className="group relative flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2.5 rounded-[6px] transition-all duration-200 ease-out active:scale-95 cursor-pointer"
        style={{
          backgroundColor: hovered ? nodeColor : 'rgba(255, 255, 255, 0.95)',
          border: `1.5px solid ${nodeColor}`,
          color: hovered ? '#FFFFFF' : nodeColor,
          transform: hovered ? 'scale(1.06) translateY(-2px)' : 'scale(1)',
          boxShadow: hovered 
            ? `0 12px 28px -4px ${nodeColor}45, 0 0 0 1px ${nodeColor}` 
            : '0 4px 14px rgba(0,0,0,0.05)'
        }}
      >
        {/* Project Title ONLY in Clean Uppercase Monospace/Heading Typography */}
        <span className="font-heading font-bold text-xs sm:text-sm tracking-wider uppercase whitespace-nowrap">
          {project.title}
        </span>

        {/* Subtle Terminal Docking Ping Glow on Hover */}
        {hovered && (
          <span 
            className="absolute -inset-1 rounded-lg pointer-events-none animate-ping opacity-25"
            style={{ backgroundColor: nodeColor }}
          />
        )}
      </button>
    </div>
  );
}
