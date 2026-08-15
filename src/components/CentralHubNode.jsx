import React from 'react';
import { Radio, ArrowRight, Sparkles } from 'lucide-react';
import { bioSynthesizer } from '../audio/bioSynthesizer';

export default function CentralHubNode({ onExploreFirst }) {
  return (
    <div 
      className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto"
      style={{ left: 0, top: 0 }}
    >
      {/* Subtle architectural ambient elevation */}
      <div className="absolute -inset-4 rounded-3xl bg-black/5 blur-2xl pointer-events-none"></div>

      {/* Main Crisp High-Contrast Pure White Centerpiece Card */}
      <div className="relative w-[340px] sm:w-[420px] bg-white text-zinc-950 p-7 sm:p-9 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-[#111111] text-center flex flex-col items-center">
        
        {/* Top Status Pill */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-300 font-mono text-[10px] text-zinc-800 mb-5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-bold tracking-wider">ROOT NODE ORIGIN (0,0)</span>
        </div>

        {/* Official Technosomatic Logo Frame */}
        <div className="relative mb-5 group cursor-pointer" onClick={onExploreFirst}>
          <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-xl overflow-hidden border border-[#111111] bg-white p-2 shadow-sm group-hover:scale-102 transition-all duration-300">
            <img 
              src="/technosomatic_logo.jpg" 
              alt="The Technosomatic Architecture" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Subtitle / Description */}
        <h2 className="text-sm font-mono font-bold text-zinc-900 tracking-wider uppercase mb-1">
          Technosomatic Architecture
        </h2>
        <p className="text-xs text-zinc-600 leading-relaxed font-body mb-5 max-w-xs">
          Embodied computational graph connecting the 7 live spatial environments across biological, cybernetic, and architectural systems.
        </p>

        {/* Action Bar */}
        <div className="w-full pt-3.5 border-t border-zinc-200 flex items-center justify-between font-mono text-[10px] text-zinc-600">
          <div>
            <span className="font-bold text-black">7 TERMINAL NODES</span>
          </div>

          <button
            onClick={() => {
              bioSynthesizer.triggerSynapticImpulse();
              if (onExploreFirst) onExploreFirst();
            }}
            className="px-4 py-2 rounded-full bg-black text-white hover:bg-zinc-800 font-heading font-bold text-xs flex items-center gap-2 transition-all shadow-sm hover:scale-105"
          >
            <span>EXPLORE GRAPH</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Corner Coordinate Watermark */}
        <div className="absolute top-3.5 right-4 font-mono text-[9px] text-zinc-400 font-semibold">
          COORD [0,0]
        </div>

      </div>
    </div>
  );
}
