import React, { useState } from 'react';
import { ExternalLink, Sparkles, Activity, Layers } from 'lucide-react';
import { bioSynthesizer } from '../audio/bioSynthesizer';

export default function ProjectNodeCard({ project, onSelect }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto cursor-pointer group"
      style={{ left: project.coords.x, top: project.coords.y }}
      onMouseEnter={() => {
        setHovered(true);
        bioSynthesizer.triggerSynapticImpulse();
      }}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect(project)}
    >
      {/* Floating Node Card */}
      <div 
        className={`w-[300px] sm:w-[340px] p-6 rounded-2xl glass-panel transition-all duration-300 ${
          hovered 
            ? 'scale-105 border-emerald-400 shadow-[0_0_40px_rgba(0,245,160,0.25)] -translate-y-2' 
            : 'border-white/10 hover:border-white/30'
        }`}
        style={{
          borderColor: hovered ? project.accentColor : undefined
        }}
      >
        {/* Top Metadata Header */}
        <div className="flex items-center justify-between text-xs font-mono mb-4">
          <span 
            className="px-2.5 py-1 rounded-full text-[10px] uppercase font-bold border"
            style={{ 
              backgroundColor: `${project.accentColor}15`, 
              color: project.accentColor,
              borderColor: `${project.accentColor}40`
            }}
          >
            {project.status}
          </span>

          <span className="text-[10px] text-slate-500 font-mono">
            LOC [{project.coords.x}, {project.coords.y}]
          </span>
        </div>

        {/* Title & Category */}
        <h3 className="text-xl font-bold font-heading text-white group-hover:text-emerald-400 transition-colors mb-1">
          {project.title}
        </h3>
        
        <div className="text-xs font-mono text-slate-400 mb-3">
          // {project.category}
        </div>

        {/* Summary Description */}
        <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-5 font-body">
          {project.summary}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map((t, idx) => (
            <span key={idx} className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">
              #{t}
            </span>
          ))}
        </div>

        {/* Action Footer */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
          <span className="text-slate-500 flex items-center gap-1.5">
            <Activity className="w-3 h-3 text-emerald-400" />
            {Object.values(project.stats)[0]}
          </span>

          <span 
            className="flex items-center gap-1 font-semibold transition-all group-hover:translate-x-1"
            style={{ color: project.accentColor }}
          >
            INSPECT NODE <ExternalLink className="w-3.5 h-3.5" />
          </span>
        </div>

      </div>
    </div>
  );
}
