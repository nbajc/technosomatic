import React, { useEffect, useState, useRef } from 'react';
import { X, ExternalLink, ArrowUpRight, RefreshCw, Maximize2, Layers, BookOpen, Globe } from 'lucide-react';
import NodeThumbnail from './NodeThumbnail';
import { bioSynthesizer } from '../audio/bioSynthesizer';

export default function NodeModalOverlay({ project, onClose }) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('iframe'); // 'iframe' | 'dossier'
  const timerRef = useRef(null);

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

  // Reset loader state and auto-dismiss loading overlay after 1.5s so heavy WebGL / canvas apps are never blocked
  useEffect(() => {
    setIframeLoaded(false);
    setActiveTab('iframe');

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
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/40 backdrop-blur-md animate-fade-in select-auto"
      onClick={onClose}
    >
      {/* Sharp Architectural Floating Modal Window */}
      <div 
        className="w-full max-w-6xl h-[92vh] sm:h-[88vh] bg-white text-zinc-950 flex flex-col overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.35)] border border-[#111111] rounded-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header Bar */}
        <div className="px-4 sm:px-6 py-3 border-b border-zinc-200 bg-[#FAFAFA] flex items-center justify-between gap-3 shrink-0">
          
          {/* Title & Coordinate Metadata */}
          <div className="flex items-center gap-3 min-w-0">
            <span className="px-2.5 py-1 rounded bg-zinc-900 text-white text-[10px] font-mono font-bold uppercase shrink-0">
              {project.indexTag || `${project.index} // PORTAL`}
            </span>
            <div className="truncate">
              <h2 className="text-sm sm:text-base font-bold font-heading text-black flex items-center gap-2 truncate">
                {project.title}
              </h2>
              <div className="text-[10px] font-mono text-zinc-500 truncate flex items-center gap-2">
                <span>COORD [{project.coords.x}, {project.coords.y}]</span>
                <span>•</span>
                <span className="text-emerald-600 font-bold">● {project.stats?.status || 'ONLINE'}</span>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
            {/* View Switcher */}
            <div className="hidden md:flex items-center bg-zinc-200/80 p-0.5 rounded-lg text-xs font-mono">
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

            {/* Standalone Floating Pop-up Window Trigger */}
            <button
              onClick={openPopupWindow}
              className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
              title="Open as Standalone Floating Pop-up Window"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">POP-UP WINDOW</span>
            </button>

            {/* Direct External Link */}
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-black text-white hover:bg-zinc-800 text-xs font-heading font-semibold flex items-center gap-1.5 transition-all shadow-sm"
              onClick={() => bioSynthesizer.triggerSynapticImpulse()}
              title="Open Destination in New Tab"
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
              title="Close Modal (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 bg-white relative overflow-hidden flex flex-col">
          
          {activeTab === 'iframe' ? (
            <div className="w-full h-full relative bg-[#FAFAFA] flex flex-col">
              
              {/* Animated Non-Blocking Top Progress Line */}
              {!iframeLoaded && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-zinc-200 overflow-hidden z-20">
                  <div className="h-full bg-black animate-pulse" style={{ width: '100%' }}></div>
                </div>
              )}

              {/* Full Featured Live Iframe */}
              <iframe 
                src={project.url} 
                title={project.title}
                className="w-full h-full border-none flex-1 bg-white"
                allow="fullscreen; accelerometer; autoplay; camera; clipboard-read; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; xr-spatial-tracking"
                loading="eager"
                onLoad={() => setIframeLoaded(true)}
              />

              {/* Bottom Endpoint Telemetry Bar */}
              <div className="px-4 py-2 bg-[#FAFAFA] border-t border-zinc-200 flex items-center justify-between text-[11px] font-mono text-zinc-600 shrink-0">
                <span className="truncate flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <strong className="text-black">LIVE ENDPOINT:</strong> 
                  <span className="text-zinc-700 underline">{project.url}</span>
                </span>

                <div className="flex items-center gap-3 shrink-0 ml-3">
                  <button
                    onClick={openPopupWindow}
                    className="text-black font-bold hover:underline flex items-center gap-1"
                  >
                    <span>DETACH POP-UP</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Project Dossier View */
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
                    <div className="text-zinc-400 text-[10px]">RADIAL DISTANCE</div>
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

                {/* Actions */}
                <div className="pt-4 border-t border-zinc-200 flex items-center justify-end gap-3">
                  <button
                    onClick={openPopupWindow}
                    className="px-5 py-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-black border border-zinc-300 font-heading font-bold text-xs flex items-center gap-2"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>LAUNCH POP-UP WINDOW</span>
                  </button>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full bg-black text-white hover:bg-zinc-800 font-heading font-bold text-xs flex items-center gap-2 shadow-lg"
                  >
                    <span>OPEN IN NEW TAB</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-5 py-2.5 border-t border-zinc-200 bg-[#FAFAFA] flex items-center justify-between text-xs font-mono text-zinc-600 shrink-0">
          <div className="flex items-center gap-4 text-[11px]">
            <span>NODE ID: <strong className="text-black">{project.id}</strong></span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">DESTINATION: <strong className="text-zinc-900">{project.url}</strong></span>
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
