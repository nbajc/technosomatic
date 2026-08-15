import React, { useState, useEffect, useRef } from 'react';
import { bioSynthesizer } from '../audio/bioSynthesizer';
import { Sliders, Volume2, Activity, Play, Pause, RotateCcw, Cpu } from 'lucide-react';

export default function SomaticLab({ 
  nodeDensity, 
  setNodeDensity, 
  frequency, 
  setFrequency 
}) {
  const [damping, setDamping] = useState(0.4);
  const [wavePattern, setWavePattern] = useState('Solfeggio 144Hz');
  const waveCanvasRef = useRef(null);

  // Update audio frequency when slider changes
  const handleFreqChange = (e) => {
    const val = Number(e.target.value);
    setFrequency(val);
    bioSynthesizer.updateFrequency(val);
  };

  // Waveform visualization effect
  useEffect(() => {
    const canvas = waveCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let step = 0;

    const renderWave = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid background in wave canvas
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw Wave
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#00f5a0';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#00f5a0';

      const midY = canvas.height / 2;
      const freqScale = frequency / 60;

      for (let x = 0; x < canvas.width; x++) {
        const angle = (x * 0.02 * freqScale) + step;
        const amplitude = 30 * (1 - damping * 0.5);
        const y = midY + Math.sin(angle) * amplitude * Math.cos(x * 0.005);

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      step += 0.05;
      animId = requestAnimationFrame(renderWave);
    };

    renderWave();
    return () => cancelAnimationFrame(animId);
  }, [frequency, damping]);

  const resetDefaults = () => {
    setFrequency(144);
    setNodeDensity(60);
    setDamping(0.4);
    bioSynthesizer.updateFrequency(144);
  };

  return (
    <section id="lab" className="py-24 relative bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="glass-pill mb-4">
            <Sliders className="w-3.5 h-3.5" />
            INTERACTIVE SOMATIC LABORATORY
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Tune Neuromuscular <span className="text-gradient-emerald">Resonance</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Manipulate core somatic computing parameters in real-time. Adjust frequencies, node densities, and wave damping to observe bio-cybernetic matrix feedback.
          </p>
        </div>

        {/* Lab Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Control Console (5 cols) */}
          <div className="lg:col-span-5 glass-panel p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold font-heading text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-emerald-400" /> Control Parameters
              </h3>
              <button 
                onClick={resetDefaults}
                className="text-xs font-mono text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" /> RESET
              </button>
            </div>

            {/* Slider 1: Base Frequency */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">BASE SOLFEGGIO FREQUENCY</span>
                <span className="text-emerald-400 font-bold">{frequency} Hz</span>
              </div>
              <input 
                type="range" 
                min="100" 
                max="432" 
                step="2"
                value={frequency} 
                onChange={handleFreqChange}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>100Hz (Delta)</span>
                <span>144Hz (Somatic Ground)</span>
                <span>432Hz (Harmonic)</span>
              </div>
            </div>

            {/* Slider 2: Node Density */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">ROOT NODE DENSITY</span>
                <span className="text-cyan-400 font-bold">{nodeDensity} NODES</span>
              </div>
              <input 
                type="range" 
                min="30" 
                max="120" 
                step="5"
                value={nodeDensity} 
                onChange={(e) => setNodeDensity(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>30 (Sparse)</span>
                <span>60 (Nominal)</span>
                <span>120 (High Density)</span>
              </div>
            </div>

            {/* Slider 3: Damping Ratio */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">SYNAPTIC DAMPING RATIO</span>
                <span className="text-violet-400 font-bold">{(damping).toFixed(2)}</span>
              </div>
              <input 
                type="range" 
                min="0.1" 
                max="1.0" 
                step="0.05"
                value={damping} 
                onChange={(e) => setDamping(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>0.10 (Resonant)</span>
                <span>1.00 (Overdamped)</span>
              </div>
            </div>

            {/* Presets */}
            <div className="pt-2">
              <span className="text-xs font-mono text-slate-400 block mb-2">PRESET HARMONICS:</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Grounding', freq: 144, nodes: 60, damp: 0.4 },
                  { label: 'Deep Focus', freq: 216, nodes: 85, damp: 0.25 },
                  { label: 'High Sync', freq: 432, nodes: 110, damp: 0.15 }
                ].map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setFrequency(p.freq);
                      setNodeDensity(p.nodes);
                      setDamping(p.damp);
                      bioSynthesizer.updateFrequency(p.freq);
                      bioSynthesizer.triggerSynapticImpulse();
                    }}
                    className="px-3 py-2 rounded-lg bg-slate-900 border border-white/10 hover:border-emerald-400/50 text-xs font-mono text-slate-300 hover:text-emerald-400 transition-all text-center"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Live Waveform & Telemetry Display (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Real-time Oscilloscope Panel */}
            <div className="glass-panel p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono text-white uppercase tracking-wider">
                    Bio-Dynamic Oscilloscope Output
                  </span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                  REAL-TIME SYNTH
                </span>
              </div>

              {/* Wave Canvas */}
              <div className="w-full h-48 bg-slate-950 rounded-xl border border-white/10 overflow-hidden relative">
                <canvas 
                  ref={waveCanvasRef} 
                  width={600} 
                  height={192} 
                  className="w-full h-full block" 
                />
              </div>

              {/* Live Readings Below Wave */}
              <div className="mt-4 grid grid-cols-3 gap-4 text-center font-mono text-xs border-t border-white/10 pt-4">
                <div>
                  <span className="text-slate-500 block">HARMONIC PHASE</span>
                  <span className="text-emerald-400 font-bold">{(frequency * 0.777).toFixed(1)}°</span>
                </div>
                <div>
                  <span className="text-slate-500 block">VAGAL RECEPTIVITY</span>
                  <span className="text-cyan-400 font-bold">98.4%</span>
                </div>
                <div>
                  <span className="text-slate-500 block">ENCODING DENSITY</span>
                  <span className="text-violet-400 font-bold">{nodeDensity * 12} Bit/s</span>
                </div>
              </div>

            </div>

            {/* Explanatory Callout */}
            <div className="glass-card p-6 border-l-4 border-l-emerald-400 flex items-start gap-4">
              <div className="p-2 rounded-lg bg-emerald-400/10 text-emerald-400">
                <Volume2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">Acousto-Visual Somatic Coupling</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Notice how adjusting frequency directly modulates the oscilloscope carrier wave and the background node particle velocity. When audio is enabled via the top navbar, tone harmonic overtones synthesize live in your browser via the Web Audio API.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
