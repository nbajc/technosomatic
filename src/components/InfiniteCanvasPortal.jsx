import React, { useRef, useState, useEffect, useCallback } from 'react';
import { projectsData } from '../data/projectsData';
import CentralHubNode from './CentralHubNode';
import ProjectNodeCard from './ProjectNodeCard';
import SpatialMinimap from './SpatialMinimap';
import EdgeIndicators from './EdgeIndicators';
import NodeModalOverlay from './NodeModalOverlay';
import { bioSynthesizer } from '../audio/bioSynthesizer';
import { Maximize2, ZoomIn, ZoomOut, Volume2, VolumeX, Sparkles, Navigation, Radio } from 'lucide-react';

export default function InfiniteCanvasPortal() {
  // Pan state (x, y) relative to world origin (0,0)
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(0.85); // 0.6x to 1.2x
  const [selectedNode, setSelectedNode] = useState(null);
  const [audioActive, setAudioActive] = useState(false);

  // Dragging & Kinetic Inertia refs
  const isDragging = useRef(false);
  const startMouse = useRef({ x: 0, y: 0 });
  const startPan = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const lastMouse = useRef({ x: 0, y: 0 });
  const lastTime = useRef(Date.now());
  const animFrameId = useRef(null);

  const canvasRef = useRef(null);

  // Smooth inertial physics loop
  useEffect(() => {
    const updateInertia = () => {
      if (!isDragging.current && (Math.abs(velocity.current.x) > 0.05 || Math.abs(velocity.current.y) > 0.05)) {
        setPan((prev) => ({
          x: prev.x + velocity.current.x,
          y: prev.y + velocity.current.y
        }));
        velocity.current.x *= 0.92; // Damping
        velocity.current.y *= 0.92;
      }
      animFrameId.current = requestAnimationFrame(updateInertia);
    };
    animFrameId.current = requestAnimationFrame(updateInertia);
    return () => cancelAnimationFrame(animFrameId.current);
  }, []);

  // Mouse Drag Handlers
  const handleMouseDown = (e) => {
    // Only drag on canvas background or non-button elements
    if (e.target.closest('button') || e.target.closest('input') || e.target.closest('a')) return;

    isDragging.current = true;
    startMouse.current = { x: e.clientX, y: e.clientY };
    startPan.current = { ...pan };
    lastMouse.current = { x: e.clientX, y: e.clientY };
    lastTime.current = Date.now();
    velocity.current = { x: 0, y: 0 };
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;

    const dx = e.clientX - startMouse.current.x;
    const dy = e.clientY - startMouse.current.y;

    // Convert pixel delta to world delta given current zoom scale
    setPan({
      x: startPan.current.x + dx / zoom,
      y: startPan.current.y + dy / zoom
    });

    // Calculate instantaneous velocity for kinetic release
    const now = Date.now();
    const dt = Math.max(1, now - lastTime.current);
    velocity.current = {
      x: ((e.clientX - lastMouse.current.x) / zoom / dt) * 16,
      y: ((e.clientY - lastMouse.current.y) / zoom / dt) * 16
    };
    lastMouse.current = { x: e.clientX, y: e.clientY };
    lastTime.current = now;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Wheel Zoom & Pan Handler
  const handleWheel = (e) => {
    e.preventDefault();
    if (e.ctrlKey || e.metaKey) {
      // Zoom
      const zoomDelta = e.deltaY * -0.0015;
      setZoom((prev) => Math.min(1.2, Math.max(0.6, prev + zoomDelta)));
    } else {
      // 2-finger pan or wheel translate
      setPan((prev) => ({
        x: prev.x - (e.deltaX / zoom) * 0.8,
        y: prev.y - (e.deltaY / zoom) * 0.8
      }));
    }
  };

  // Canvas Vector Grid & Constellation Tracer Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frameId;
    let pulseStep = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const renderCanvas = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const halfW = canvas.width / 2;
      const halfH = canvas.height / 2;

      // Transform context to center origin (0,0) + pan offset * zoom scale
      ctx.save();
      ctx.translate(halfW + pan.x * zoom, halfH + pan.y * zoom);
      ctx.scale(zoom, zoom);

      // 1. Fine Spatial Vector Grid Lines
      const gridSize = 100;
      const startX = Math.floor((-halfW / zoom - pan.x) / gridSize) * gridSize - gridSize;
      const endX = Math.floor((halfW / zoom - pan.x) / gridSize) * gridSize + gridSize;
      const startY = Math.floor((-halfH / zoom - pan.y) / gridSize) * gridSize - gridSize;
      const endY = Math.floor((halfH / zoom - pan.y) / gridSize) * gridSize + gridSize;

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;

      for (let x = startX; x <= endX; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, startY);
        ctx.lineTo(x, endY);
        ctx.stroke();
      }

      for (let y = startY; y <= endY; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(startX, y);
        ctx.lineTo(endX, y);
        ctx.stroke();
      }

      // 2. Constellation Tracer Lines connecting Origin (0,0) to outer Nodes
      pulseStep += 0.02;

      projectsData.forEach((proj) => {
        // Line from origin (0,0) to node (x, y)
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(proj.coords.x, proj.coords.y);
        ctx.strokeStyle = 'rgba(0, 245, 160, 0.15)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 6]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Pulsing Energy Tracer Dot travelling along line
        const progress = (Math.sin(pulseStep + proj.coords.x * 0.01) + 1) / 2;
        const pulseX = proj.coords.x * progress;
        const pulseY = proj.coords.y * progress;

        ctx.beginPath();
        ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2);
        ctx.fillStyle = proj.accentColor;
        ctx.shadowBlur = 10;
        ctx.shadowColor = proj.accentColor;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      ctx.restore();
      frameId = requestAnimationFrame(renderCanvas);
    };

    renderCanvas();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameId);
    };
  }, [pan, zoom]);

  // Recenter to (0,0)
  const recenter = useCallback(() => {
    setPan({ x: 0, y: 0 });
    setZoom(0.85);
    bioSynthesizer.triggerSynapticImpulse();
  }, []);

  // Jump to specific node coordinates
  const jumpTo = useCallback((x, y) => {
    setPan({ x, y });
  }, []);

  const toggleAudio = () => {
    const isPlaying = bioSynthesizer.toggle();
    setAudioActive(isPlaying);
  };

  return (
    <div 
      className="relative w-screen h-screen overflow-hidden bg-[#050505] text-slate-100 select-none cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
    >
      {/* 2D Background Canvas for Vector Grid & Constellation Tracer Lines */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block pointer-events-none" />

      {/* Spatial World Container with CSS Matrix Transform */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          transform: `translate(${window.innerWidth / 2 + pan.x * zoom}px, ${window.innerHeight / 2 + pan.y * zoom}px) scale(${zoom})`,
          transformOrigin: '0 0'
        }}
      >
        {/* Origin (0,0) Central White Architectural Hub */}
        <CentralHubNode onExploreFirst={() => jumpTo(-projectsData[0].coords.x, -projectsData[0].coords.y)} />

        {/* Orbiting Project Nodes */}
        {projectsData.map((project) => (
          <ProjectNodeCard
            key={project.id}
            project={project}
            onSelect={(proj) => setSelectedNode(proj)}
          />
        ))}
      </div>

      {/* Top Fixed HUD Header */}
      <header className="fixed top-6 left-6 right-6 z-40 flex items-center justify-between pointer-events-none">
        
        {/* Brand Chip */}
        <div className="glass-panel px-4 py-2.5 flex items-center gap-3 pointer-events-auto shadow-2xl">
          <div className="w-8 h-8 rounded-lg bg-white text-slate-950 flex items-center justify-center font-heading font-black text-sm">
            RN
          </div>
          <div>
            <div className="font-heading font-bold text-xs text-white tracking-wider flex items-center gap-2">
              ROOT NODE <span className="text-emerald-400 font-mono">//</span> INFINITE PORTAL
            </div>
            <div className="text-[9px] font-mono text-slate-400">360° SPATIAL CANVAS ENGINE</div>
          </div>
        </div>

        {/* Right HUD Controls */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Quick Node Selector Dropdown */}
          <div className="glass-panel px-3 py-1.5 flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-400 hidden sm:inline">JUMP TO NODE:</span>
            <select
              onChange={(e) => {
                const target = projectsData.find(p => p.id === e.target.value);
                if (target) jumpTo(-target.coords.x, -target.coords.y);
              }}
              className="bg-slate-950 text-emerald-400 border border-white/10 rounded px-2 py-1 text-xs cursor-pointer outline-none"
            >
              <option value="">Origin (0,0)</option>
              {projectsData.map(p => (
                <option key={p.id} value={p.id}>{p.title}</option>
              ))}
            </select>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleAudio}
            className={`glass-pill pointer-events-auto cursor-pointer transition-all ${
              audioActive ? 'border-emerald-400/60 text-emerald-400 bg-emerald-400/10' : 'text-slate-400'
            }`}
          >
            {audioActive ? <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="text-[10px] font-mono hidden sm:inline">{audioActive ? '144Hz SYNTH' : 'MUTED'}</span>
          </button>
        </div>

      </header>

      {/* Bottom-Left Zoom Controls */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center gap-1.5 glass-panel p-1.5 border-white/20 shadow-2xl">
        <button
          onClick={() => setZoom(prev => Math.min(1.2, prev + 0.1))}
          className="p-2 hover:bg-white/10 text-slate-300 hover:text-emerald-400 rounded transition-colors"
          title="Zoom In (Shift+Wheel)"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <span className="text-[10px] font-mono text-slate-400 px-2 font-bold">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={() => setZoom(prev => Math.max(0.6, prev - 0.1))}
          className="p-2 hover:bg-white/10 text-slate-300 hover:text-emerald-400 rounded transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <div className="w-[1px] h-4 bg-white/10 mx-1"></div>
        <button
          onClick={recenter}
          className="px-3 py-1.5 hover:bg-white/10 text-slate-300 hover:text-emerald-400 rounded text-xs font-mono flex items-center gap-1 transition-colors"
          title="Recenter Camera to Origin"
        >
          <Maximize2 className="w-3.5 h-3.5" /> RECENTER
        </button>
      </div>

      {/* Radar Minimap */}
      <SpatialMinimap
        pan={pan}
        zoom={zoom}
        projects={projectsData}
        onJumpTo={jumpTo}
        onReset={recenter}
      />

      {/* Off-Screen Directional Vectors */}
      <EdgeIndicators
        pan={pan}
        zoom={zoom}
        projects={projectsData}
        onJumpTo={jumpTo}
      />

      {/* Non-Destructive Lightbox Overlay */}
      {selectedNode && (
        <NodeModalOverlay
          project={selectedNode}
          onClose={() => setSelectedNode(null)}
        />
      )}

    </div>
  );
}
