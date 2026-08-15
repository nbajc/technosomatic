import React from 'react';
import { Radio, ArrowRight, Sparkles } from 'lucide-react';
import { bioSynthesizer } from '../audio/bioSynthesizer';

export default function CentralHubNode({ onExploreFirst }) {
  return (
    <div 
      className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto"
      style={{ left: 0, top: 0 }}
    >
      {/* Outer Glow Halo */}
      <div className="absolute -inset-8 rounded-3xl bg-white/25 blur-3xl animate-pulse-slow pointer-events-none"></div>

      {/* Main Crisp High-Contrast Pure White Architectural Frame */}
      <div className="relative w-[360px] sm:w-[460px] bg-[#FAFAFA] text-slate-950 p-8 sm:p-10 rounded-3xl shadow-[0_25px_80px_rgba(255,255,255,0.3)] border-4 border-white text-center flex flex-col items-center">
        
        {/* Top Status Pill */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-300 font-mono text-[10px] text-slate-700 mb-6">
          <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
          <span>ROOT NODE ORIGIN (0,0)</span>
        </div>

        {/* User-Attached Official Logo Image */}
        <div className="relative mb-6 group cursor-pointer" onClick={onExploreFirst}>
          <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-2 border-slate-200 bg-white p-2 shadow-inner group-hover:scale-105 group-hover:border-slate-900 transition-all duration-300">
            <img 
              src="/technosomatic_logo.jpg" 
              alt="The Technosomatic Architecture" 
              className="w-full h-full object-contain mix-blend-multiply"
            />
          </div>
          <div className="absolute inset-0 rounded-2xl ring-2 ring-emerald-500/0 group-hover:ring-emerald-500/40 transition-all"></div>
        </div>

        {/* Subtitle / Description */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-body mb-6 max-w-sm">
          Spatial hub connecting the 7 technosomatic web environments across biological, cybernetic, and architectural domains.
        </p>

        {/* Action Button */}
        <div className="w-full pt-4 border-t border-slate-200 flex items-center justify-between font-mono text-[10px] text-slate-500">
          <div>
            <span>PORTALS: 7 LIVE</span>
          </div>

          <button
            onClick={() => {
              bioSynthesizer.triggerSynapticImpulse();
              if (onExploreFirst) onExploreFirst();
            }}
            className="px-5 py-2.5 rounded-full bg-slate-950 text-white hover:bg-slate-800 font-heading font-bold text-xs flex items-center gap-2 transition-all shadow-lg hover:scale-105"
          >
            <span>EXPLORE PORTALS</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
          </button>
        </div>

        {/* Corner Coordinate Badge */}
        <div className="absolute top-4 right-5 font-mono text-[9px] text-slate-400">
          COORD [0,0]
        </div>

      </div>
    </div>
  );
}
