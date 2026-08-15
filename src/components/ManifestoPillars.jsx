import React, { useState } from 'react';
import { Cpu, ShieldCheck, Waves, Compass, ChevronRight, Sparkles } from 'lucide-react';
import { bioSynthesizer } from '../audio/bioSynthesizer';

export default function ManifestoPillars() {
  const [activePillar, setActivePillar] = useState(0);

  const pillars = [
    {
      id: "pillar-01",
      number: "01",
      title: "Somatic Grounding",
      subtitle: "The Body as Sovereign Root Node",
      icon: Cpu,
      color: "from-emerald-400 to-teal-500",
      accent: "#00f5a0",
      description: "Traditional computing treats the user as an abstract observer. Somatic Grounding positions biological sensory receptors, neuromuscular equilibrium, and proprioception at the absolute root of system architecture.",
      bullets: [
        "Sub-millisecond perceptual feedback loops",
        "Bi-directional gesture and neuromuscular pressure mapping",
        "Acoustic Solfeggio carrier tuning for vagal calming"
      ],
      quote: "Software must honor the biological substrate that hosts consciousness."
    },
    {
      id: "pillar-02",
      number: "02",
      title: "Bio-Cybernetic Latency",
      subtitle: "Zero-Dissonance Perceptual Alignments",
      icon: Waves,
      color: "from-cyan-400 to-blue-500",
      accent: "#00d8ff",
      description: "System latency is not just a network metric; it is a neurological strain vector. By synchronizing screen updates and spatial telemetry with human saccadic and tactile windows, cognitive fatigue drops to zero.",
      bullets: [
        "Predictive spatial node buffering",
        "Saccade-aware visual frame interpolation",
        "Dynamic refresh alignment with biological motor tremor"
      ],
      quote: "True speed is not higher frame counts—it is total absence of friction."
    },
    {
      id: "pillar-03",
      number: "03",
      title: "Sub-Threshold Interfaces",
      subtitle: "Ambient Non-Intrusive Presence",
      icon: Compass,
      color: "from-violet-400 to-purple-500",
      accent: "#9d4edf",
      description: "Interfaces should materialize only when summoned by intent or spatial proximity. Ambient indicators replace invasive modals, allowing conscious attention to remain centered on deep creative flow.",
      bullets: [
        "Proximity-triggered UI materialization",
        "Chromodynamic background state signaling",
        "Zero-modal notification architecture"
      ],
      quote: "The best interface is the one that disappears until needed."
    },
    {
      id: "pillar-04",
      number: "04",
      title: "Architectural Synthesis",
      subtitle: "Unifying Spatial Data & Hardware",
      icon: ShieldCheck,
      color: "from-amber-400 to-orange-500",
      accent: "#dfb877",
      description: "Bridging spatial computing, custom hardware, and web software into a singular harmonious stack. Data flows seamlessly from spatial sensors to somatic UI nodes without loss of intent.",
      bullets: [
        "Cross-platform WebGL & Web Audio pipelines",
        "Hardware bio-feedback telemetry ingestion",
        "Modular spatial node graphs"
      ],
      quote: "Hardware and software are merely two frequencies of the same continuous medium."
    }
  ];

  return (
    <section id="manifesto" className="py-24 relative bg-slate-900/40 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="glass-pill mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            CORE MANIFESTO & PHILOSOPHY
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            The Four Pillars of <span className="text-gradient-emerald">Technosomatic</span> Design
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Engineering principles developed to align computational systems with biological intelligence.
          </p>
        </div>

        {/* Pillars Layout (Grid + Interactive Detail Card) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Pillar Selector List (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              const isSelected = activePillar === index;
              return (
                <div
                  key={pillar.id}
                  onClick={() => {
                    setActivePillar(index);
                    bioSynthesizer.triggerSynapticImpulse();
                  }}
                  className={`p-5 rounded-2xl glass-card cursor-pointer transition-all duration-300 ${
                    isSelected 
                      ? 'border-emerald-400/60 bg-emerald-400/5 shadow-[0_0_30px_rgba(0,245,160,0.15)] scale-[1.02]' 
                      : 'hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${pillar.color} text-slate-950 font-bold shadow-lg`}>
                        <Icon className="w-5 h-5 text-slate-950" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-emerald-400">{pillar.number}</span>
                          <h3 className="font-heading font-bold text-white text-base">{pillar.title}</h3>
                        </div>
                        <p className="text-xs text-slate-400">{pillar.subtitle}</p>
                      </div>
                    </div>
                    <ChevronRight className={`w-5 h-5 transition-transform ${isSelected ? 'text-emerald-400 translate-x-1' : 'text-slate-600'}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Pillar Full Detail Display (7 cols) */}
          <div className="lg:col-span-7 glass-panel p-8 relative overflow-hidden flex flex-col justify-between">
            {/* Background Glow */}
            <div 
              className="absolute -top-24 -right-24 w-72 h-72 rounded-full filter blur-[80px] opacity-20 pointer-events-none transition-all duration-500"
              style={{ backgroundColor: pillars[activePillar].accent }}
            ></div>

            <div>
              {/* Pillar Header */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xs font-mono text-emerald-400 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30">
                  PILLAR {pillars[activePillar].number}
                </span>
                <span className="text-xs font-mono text-slate-400">SPECIFICATION ARCHITECTURE</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white mb-2">
                {pillars[activePillar].title}
              </h3>
              <p className="text-sm font-mono text-emerald-400 mb-6">
                // {pillars[activePillar].subtitle}
              </p>

              <p className="text-slate-300 text-base leading-relaxed mb-8">
                {pillars[activePillar].description}
              </p>

              {/* Bullet points */}
              <div className="space-y-3 mb-8">
                <span className="text-xs font-mono text-slate-400 block mb-2">KEY IMPLEMENTATION TARGETS:</span>
                {pillars[activePillar].bullets.map((b, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs font-mono text-slate-200 bg-white/5 p-3 rounded-lg border border-white/5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#00f5a0]"></div>
                    {b}
                  </div>
                ))}
              </div>
            </div>

            {/* Quote Block */}
            <blockquote className="p-4 rounded-xl bg-slate-950/80 border-l-4 border-l-emerald-400 italic text-slate-300 text-xs sm:text-sm">
              "{pillars[activePillar].quote}"
            </blockquote>

          </div>

        </div>

      </div>
    </section>
  );
}
