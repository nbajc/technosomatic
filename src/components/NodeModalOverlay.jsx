import React, { useEffect, useState, useRef } from 'react';
import { X, ExternalLink, ArrowUpRight, Globe, RefreshCw } from 'lucide-react';
import { bioSynthesizer } from '../audio/bioSynthesizer';

export default function NodeModalOverlay({ project, onClose }) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const timerRef = useRef(null);
  const accentColor = project.dotColor || project.color || '#111111';

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        bioSynthesizer.triggerSynapticImpulse();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    setIframeLoaded(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIframeLoaded(true);
    }, 1500);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [project]);

  const openPopupWindow = () => {
    bioSynthesizer.triggerSynapticImpulse();
    const w = Math.min(1360, Math.round(window.screen.width * 0.88));
    const h = Math.min(900, Math.round(window.screen.height * 0.85));
    const left = Math.max(0, Math.round((window.screen.width - w) / 2));
    const top = Math.max(0, Math.round((window.screen.height - h) / 2));
    window.open(
      project.url,
      `technosomatic_win_${project.id}`,
      `width=${w},height=${h},top=${top},left=${left},resizable=yes,scrollbars=yes,status=yes`
    );
  };

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/40 backdrop-blur-md animate-fade-in select-auto"
      onClick={onClose}
    >
      {/* Floating Pop-Up Window (80vw x 80vh max) with Top Color Accent */}
      <div 
        className="w-full max-w-5xl h-[80vh] bg-white text-zinc-950 flex flex-col overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.3)] border border-[#111111] rounded-2xl relative"
        style={{ borderTop: `4px solid ${accentColor}` }}
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header Bar */}
        <div className="px-5 py-3.5 border-b border-zinc-200 bg-[#FAFAFA] flex items-center justify-between gap-3 shrink-0">
          
          {/* Title & Color Badge */}
          <div className="flex items-center gap-3 min-w-0">
            <span 
              className="w-3 h-3 rounded-full shrink-0 animate-pulse"
              style={{ backgroundColor: accentColor, boxShadow: `0 0 8px ${accentColor}` }}
            />
            <div className="truncate">
              <h2 className="text-sm sm:text-base font-bold font-heading uppercase text-black truncate tracking-wider">
                {project.title}
              </h2>
              <div className="text-[10px] font-mono text-zinc-500 truncate flex items-center gap-2">
                <span>ANGLE {project.angleDeg}°</span>
                <span>•</span>
                <span className="text-zinc-700">{project.url}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Standalone Window */}
            <button
              onClick={openPopupWindow}
              className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
              title="Open Standalone Pop-up Window"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">POP-UP</span>
            </button>

            {/* Breakout / New Tab */}
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg text-white text-xs font-heading font-semibold flex items-center gap-1.5 transition-all shadow-sm"
              style={{ backgroundColor: accentColor }}
              onClick={() => bioSynthesizer.triggerSynapticImpulse()}
              title="Open in New Tab"
            >
              <span>NEW TAB</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Close Button */}
            <button
              onClick={() => {
                bioSynthesizer.triggerSynapticImpulse();
                onClose();
              }}
              className="w-8 h-8 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 flex items-center justify-center border border-zinc-300 transition-colors ml-1"
              title="Close (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body / Live Embedded Frame */}
        <div className="flex-1 bg-white relative overflow-hidden flex flex-col">
          {!iframeLoaded && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-zinc-200 overflow-hidden z-20">
              <div 
                className="h-full animate-pulse" 
                style={{ backgroundColor: accentColor, width: '100%' }}
              />
            </div>
          )}

          <iframe 
            src={project.url} 
            title={project.title}
            className="w-full h-full border-none flex-1 bg-white"
            allow="fullscreen; accelerometer; autoplay; camera; clipboard-read; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; xr-spatial-tracking"
            loading="eager"
            onLoad={() => setIframeLoaded(true)}
          />
        </div>

        {/* Footer */}
        <div className="px-5 py-2.5 border-t border-zinc-200 bg-[#FAFAFA] flex items-center justify-between text-xs font-mono text-zinc-600 shrink-0">
          <span className="truncate text-[11px]">
            DESTINATION: <strong className="text-black">{project.url}</strong>
          </span>

          <button
            onClick={() => {
              bioSynthesizer.triggerSynapticImpulse();
              onClose();
            }}
            className="px-3 py-1 rounded bg-zinc-200 hover:bg-zinc-300 text-zinc-800 text-[11px] font-mono font-bold transition-colors"
          >
            CLOSE (ESC)
          </button>
        </div>

      </div>
    </div>
  );
}
