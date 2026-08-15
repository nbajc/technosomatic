import React, { useEffect, useState } from 'react';
import { X, ExternalLink, Activity, ArrowUpRight, RefreshCw, Layers, Compass, BookOpen } from 'lucide-react';
import NodeThumbnail from './NodeThumbnail';
import { bioSynthesizer } from '../audio/bioSynthesizer';

export default function NodeModalOverlay({ project, onClose }) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('iframe'); // 'iframe' | 'dossier'
  const [iframeError, setIframeError] = useState(false);

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

  // Reset states when project changes
  useEffect(() => {
    setIframeLoaded(false);
    setIframeError(false);
    setActiveTab('iframe');
  }, [project]);

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-white/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      {/* Sharp Architectural Floating Modal Window */}
      <div 
        className="w-full max-w-5xl h-[88vh] bg-white text-zinc-950 flex flex-col overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.25)] border border-[#111111] rounded-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header Bar */}
        <div className="px-5 py-3.5 border-b border-zinc-200 bg-[#FAFAFA] flex items-center justify-between gap-4">
          
          {/* Title & Coordinates */}
          <div className="flex items-center gap-3 min-w-0">
            <span className="px-2.5 py-1 rounded bg-zinc-100 text-zinc-900 text-[10px] font-mono font-bold uppercase border border-zinc-300 shrink-0">
              {project.indexTag || `${project.index} // PORTAL`}
            </span>
            <div className="truncate">
              <h2 className="text-base sm:text-lg font-bold font-heading text-black flex items-center gap-2 truncate">
                {project.title}
              </h2>
              <div className="text-[10px] font-mono text-zinc-500 truncate flex items-center gap-2">
                <span>COORD [{project.coords.x}, {project.coords.y}]</span>
                <span>•</span>
                <span>{project.category}</span>
              </div>
            </div>
          </div>

          {/* View Toggles & Actions */}
          <div className="flex items-center gap-2 shrink-0">
            
            {/* View switcher */}
            <div className="hidden sm:flex items-center bg-zinc-200/80 p-0.5 rounded-lg text-xs font-mono">
              <button
                onClick={() => setActiveTab('iframe')}
                className={`px-3 py-1 rounded-md transition-all ${
                  activeTab === 'iframe' 
                    ? 'bg-white text-black font-bold shadow-sm' 
                    : 'text-zinc-600 hover:text-black'
                }`}
              >
                LIVE PORTAL
              </button>
              <button
                onClick={() => setActiveTab('dossier')}
                className={`px-3 py-1 rounded-md transition-all ${
                  activeTab === 'dossier' 
                    ? 'bg-white text-black font-bold shadow-sm' 
                    : 'text-zinc-600 hover:text-black'
                }`}
              >
                DOSSIER
              </button>
            </div>

            {/* Launch External */}
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-full bg-black text-white hover:bg-zinc-800 text-xs font-heading font-semibold flex items-center gap-1.5 transition-all shadow-sm"
              onClick={() => bioSynthesizer.triggerSynapticImpulse()}
              title="Open Destination in New Tab"
            >
              <span className="hidden md:inline">OPEN IN NEW TAB</span>
              <span className="md:hidden">OPEN</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Close Button */}
            <button
              onClick={() => {
                bioSynthesizer.triggerSynapticImpulse();
                onClose();
              }}
              className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 flex items-center justify-center border border-zinc-300 transition-colors"
              title="Close (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 bg-white relative overflow-hidden flex flex-col">
          
          {activeTab === 'iframe' ? (
            <div className="w-full h-full relative bg-[#F4F4F5] flex flex-col">
              {!iframeLoaded && !iframeError && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white text-zinc-600 font-mono text-xs gap-3">
                  <RefreshCw className="w-6 h-6 text-zinc-900 animate-spin" />
                  <span className="font-bold tracking-wider">CONNECTING TO {project.url}</span>
                  <span className="text-[10px] text-zinc-400">Rendering live spatial endpoint...</span>
                </div>
              )}

              <iframe 
                src={project.url} 
                title={project.title}
                className="w-full h-full border-none flex-1 bg-white"
                onLoad={() => setIframeLoaded(true)}
                onError={() => setIframeError(true)}
              />

              {/* Fallback notification bar if site blocks embedding or user prefers new tab */}
              <div className="px-4 py-2 bg-[#FAFAFA] border-t border-zinc-200 flex items-center justify-between text-[11px] font-mono text-zinc-600">
                <span className="truncate">ENDPOINT: <span className="font-semibold text-black">{project.url}</span></span>
                <a 
                  href={project.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-black font-bold underline hover:text-zinc-700 flex items-center gap-1 shrink-0 ml-2"
                >
                  FULLSCREEN APPSITE <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ) : (
            /* Dossier View */
            <div className="w-full h-full overflow-y-auto p-6 sm:p-10 bg-white">
              <div className="max-w-3xl mx-auto flex flex-col gap-6">
                
                {/* Visual Preview Graphic */}
                <div className="w-full rounded-xl overflow-hidden border border-[#111111]">
                  <NodeThumbnail 
                    nodeId={project.id} 
                    title={project.title} 
                    coords={project.coords} 
                    isHovered={true} 
                  />
                </div>

                {/* Dossier Header */}
                <div>
                  <div className="font-mono text-xs text-zinc-500 font-bold tracking-wider uppercase mb-1">
                    {project.indexTag} // DOSSIER SPECIFICATION
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-heading font-bold text-black mb-2">
                    {project.title}
                  </h1>
                  <p className="text-sm font-mono text-zinc-700">
                    Category: <span className="font-semibold text-black">{project.category}</span>
                  </p>
                </div>

                {/* Summary */}
                <div className="p-5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-800 leading-relaxed font-body">
                  {project.summary}
                </div>

                {/* Technical Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
                  <div className="p-3 rounded-lg border border-zinc-200 bg-white">
                    <div className="text-zinc-400 text-[10px]">STATUS</div>
                    <div className="font-bold text-black">{project.status}</div>
                  </div>
                  <div className="p-3 rounded-lg border border-zinc-200 bg-white">
                    <div className="text-zinc-400 text-[10px]">COORDINATES</div>
                    <div className="font-bold text-black">[{project.coords.x}, {project.coords.y}]</div>
                  </div>
                  <div className="p-3 rounded-lg border border-zinc-200 bg-white col-span-2 sm:col-span-1">
                    <div className="text-zinc-400 text-[10px]">DISTANCE FROM ROOT</div>
                    <div className="font-bold text-black">{Math.round(Math.hypot(project.coords.x, project.coords.y))} units</div>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <div className="text-xs font-mono text-zinc-500 font-bold mb-2">ARCHITECTURE TAGS:</div>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((t, idx) => (
                      <span key={idx} className="text-xs font-mono px-3 py-1 bg-zinc-100 text-black border border-zinc-300 rounded-full font-medium">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Launch Action */}
                <div className="pt-4 border-t border-zinc-200 flex justify-end">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-full bg-black text-white hover:bg-zinc-800 font-heading font-bold text-sm flex items-center gap-2 shadow-lg"
                  >
                    <span>LAUNCH PORTAL ENVIRONMENT</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-5 py-2.5 border-t border-zinc-200 bg-[#FAFAFA] flex items-center justify-between text-xs font-mono text-zinc-600">
          <div className="flex items-center gap-4 text-[11px]">
            <span>NODE ID: <strong className="text-black">{project.id}</strong></span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">RADIAL DISTANCE: <strong>{Math.round(Math.hypot(project.coords.x, project.coords.y))}u</strong></span>
          </div>

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
