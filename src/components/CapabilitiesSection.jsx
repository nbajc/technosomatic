import React from 'react';
import { Cpu, Terminal, Shield, Zap, Layers, Network, Activity } from 'lucide-react';
import { bioSynthesizer } from '../audio/bioSynthesizer';

export default function CapabilitiesSection() {
  const capabilities = [
    {
      title: "Somatic HCI Architecture",
      icon: Cpu,
      tag: "INTERFACE DESIGN",
      color: "border-emerald-500/40 text-emerald-400",
      description: "Designing spatial and web interfaces tuned specifically to human neuromuscular latency, reducing cognitive overhead and eye strain."
    },
    {
      title: "Neural Spatial Computing",
      icon: Network,
      tag: "SPATIAL SYSTEMS",
      color: "border-cyan-500/40 text-cyan-400",
      description: "Building 3D particle graphs, WebGL matrix engines, and spatial telemetry layers for immersive real-time environments."
    },
    {
      title: "Bio-Feedback Ingestion",
      icon: Activity,
      tag: "HARDWARE INTEGRATION",
      color: "border-violet-500/40 text-violet-400",
      description: "Connecting wearable sensors, pulse telemetry, and spatial gaze vectors directly into web application state."
    },
    {
      title: "Sub-Millisecond Performance",
      icon: Zap,
      tag: "SYSTEMS OPTIMIZATION",
      color: "border-amber-500/40 text-amber-400",
      description: "Zero-bloat JavaScript, custom Canvas 2D/WebGL engines, and low-latency audio synthesizers running smoothly at 60+ FPS."
    }
  ];

  return (
    <section id="capabilities" className="py-24 relative bg-slate-900/60 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="glass-pill mb-4">
            <Layers className="w-3.5 h-3.5" />
            ENGINEERING & CAPABILITIES
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Architectural <span className="text-gradient-emerald">Capabilities</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            High-performance engineering at the frontier of spatial computing, bio-telemetry, and human-machine resonance.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <div 
                key={idx}
                onClick={() => bioSynthesizer.triggerSynapticImpulse()}
                className="glass-panel p-6 flex flex-col justify-between hover:border-emerald-400/50 transition-all duration-300 group cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-400/10 transition-all">
                      <Icon className={`w-6 h-6 ${cap.color.split(' ')[1]}`} />
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2 py-1 rounded border border-white/5">
                      {cap.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-heading text-white group-hover:text-emerald-400 transition-colors mb-3">
                    {cap.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {cap.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/5 mt-6 flex items-center gap-2 text-[11px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>CAPABILITY ACTIVE</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
