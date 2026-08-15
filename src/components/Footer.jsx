import React from 'react';
import { Cpu, ShieldCheck, ArrowUp, Globe, Share2, Disc as Discord } from 'lucide-react';
import { bioSynthesizer } from '../audio/bioSynthesizer';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    bioSynthesizer.triggerSynapticImpulse();
  };

  return (
    <footer className="bg-slate-950 border-t border-white/10 pt-16 pb-12 font-mono text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center font-bold text-slate-950 shadow-[0_0_15px_rgba(0,245,160,0.3)]">
                RN
              </div>
              <span className="font-heading font-bold text-white text-base tracking-wider">
                ROOT NODE <span className="text-emerald-400">//</span> TECHNOSOMATIC
              </span>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed font-body">
              An independent research and spatial computing laboratory developing bio-cybernetic interfaces, somatic latency protocols, and embodied digital architectures.
            </p>

            <div className="flex items-center gap-3 pt-2 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-emerald-400 font-mono text-[11px]">ALL SYSTEMS OPERATIONAL // SOLFEGGIO 144Hz</span>
            </div>
          </div>

          {/* Quick Links (4 cols) */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4">
            <div>
              <span className="text-white font-bold block mb-3 font-heading">// ARCHITECTURE</span>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#lab" className="hover:text-emerald-400 transition-colors">Somatic Lab</a></li>
                <li><a href="#manifesto" className="hover:text-emerald-400 transition-colors">Four Pillars</a></li>
                <li><a href="#vault" className="hover:text-emerald-400 transition-colors">Research Vault</a></li>
              </ul>
            </div>
            <div>
              <span className="text-white font-bold block mb-3 font-heading">// DIRECTORY</span>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#capabilities" className="hover:text-emerald-400 transition-colors">Capabilities</a></li>
                <li><a href="#contact" className="hover:text-emerald-400 transition-colors">Terminal Console</a></li>
                <li><a href="#hero" className="hover:text-emerald-400 transition-colors">Overview</a></li>
              </ul>
            </div>
          </div>

          {/* Action / Back to Top (3 cols) */}
          <div className="md:col-span-3 flex flex-col justify-between items-start md:items-end">
            <button
              onClick={scrollToTop}
              className="glass-panel px-4 py-2.5 flex items-center gap-2 text-xs text-white hover:text-emerald-400 hover:border-emerald-400/50 transition-all group"
            >
              <span>RETURN TO TOP</span>
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform text-emerald-400" />
            </button>

            <div className="text-[11px] text-slate-500 md:text-right pt-4">
              <div>LATENCY: 0.38 MS</div>
              <div>MATRIX VERSION: 3.6.0</div>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px] gap-4">
          <div>
            © {new Date().getFullYear()} ROOT NODE TECHNOSOMATIC. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <span>PRIVACY PROTOCOL</span>
            <span>TERMS OF SYNAPSE</span>
            <span>ISOLATED WORKSPACE</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
