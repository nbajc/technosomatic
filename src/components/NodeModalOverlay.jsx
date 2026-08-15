import React, { useEffect, useState } from 'react';
import { X, ExternalLink, Activity, ShieldCheck, Tag, Sparkles, Terminal, RefreshCw } from 'lucide-react';
import { bioSynthesizer } from '../audio/bioSynthesizer';

export default function NodeModalOverlay({ project, onClose }) {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div 
        className="glass-panel w-full max-w-5xl h-[88vh] flex flex-col overflow-hidden shadow-2xl border-emerald-400/40 relative"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header Bar */}
        <div className="p-4 sm:p-5 border-b border-white/10 bg-slate-900/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span 
              className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase border"
              style={{ 
                backgroundColor: `${project.accentColor}15`, 
                color: project.accentColor,
                borderColor: `${project.accentColor}40`
              }}
            >
              {project.status}
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold font-heading text-white flex items-center gap-2">
                {project.title}
              </h2>
              <div className="text-[11px] font-mono text-emerald-400">
                {project.url}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs py-1.5 px-4 flex items-center gap-2"
              onClick={() => bioSynthesizer.triggerSynapticImpulse()}
            >
              <span>LAUNCH FULL APP</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => {
                bioSynthesizer.triggerSynapticImpulse();
                onClose();
              }}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-400/20 text-slate-300 hover:text-emerald-400 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / Embedded Live Iframe */}
        <div className="flex-1 bg-slate-950 relative overflow-hidden flex flex-col">
          {!iframeLoaded && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950 text-slate-400 font-mono text-xs gap-3">
              <RefreshCw className="w-6 h-6 text-emerald-400 animate-spin" />
              <span>ESTABLISHING SYNAPTIC CONNECTION TO {project.url}...</span>
            </div>
          )}

          <iframe 
            src={project.url} 
            title={project.title}
            className="w-full h-full border-none"
            onLoad={() => setIframeLoaded(true)}
          />
        </div>

        {/* Modal Footer */}
        <div className="p-3 border-t border-white/10 bg-slate-900/90 flex items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-4">
            <span>COORD [{project.coords.x}, {project.coords.y}]</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">{project.category}</span>
          </div>
          <button
            onClick={onClose}
            className="btn-secondary text-xs py-1 px-3"
          >
            CLOSE OVERLAY (ESC)
          </button>
        </div>

      </div>
    </div>
  );
}
