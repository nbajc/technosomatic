import React, { useState, useEffect } from 'react';
import { Activity, Cpu, Wifi, ShieldCheck, Zap } from 'lucide-react';

export default function TelemetryBar({ activeNodes, frequency }) {
  const [fps, setFps] = useState(60);
  const [latency, setLatency] = useState(0.38);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time micro-fluctuations in telemetry
      setFps(Math.floor(58 + Math.random() * 3));
      setLatency((0.35 + Math.random() * 0.08).toFixed(2));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-slate-950/90 border-y border-white/10 py-3 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 items-center font-mono text-xs text-slate-400">
          
          {/* Telemetry 1: Nodes */}
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>ACTIVE ROOT NODES:</span>
            <span className="text-white font-semibold">{activeNodes || 60}</span>
          </div>

          {/* Telemetry 2: FPS */}
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>RENDER SPEED:</span>
            <span className="text-emerald-400 font-semibold">{fps} FPS</span>
          </div>

          {/* Telemetry 3: Solfeggio Hz */}
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>BIO-RESONANCE:</span>
            <span className="text-amber-300 font-semibold">{frequency || 144} Hz</span>
          </div>

          {/* Telemetry 4: Latency */}
          <div className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-violet-400" />
            <span>SYNAPTIC LATENCY:</span>
            <span className="text-violet-300 font-semibold">{latency} ms</span>
          </div>

          {/* Telemetry 5: State */}
          <div className="hidden lg:flex items-center justify-end gap-2 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span className="tracking-wider uppercase text-[11px] bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/30">
              BIO-SYNC NOMINAL
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
