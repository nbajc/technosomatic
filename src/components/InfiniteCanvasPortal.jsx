import React, { useRef, useState, useEffect, useCallback } from 'react';
import { technosomaticNodes } from '../data/technosomaticNodes';
import CentralHubNode from './CentralHubNode';
import ProjectNodeCard from './ProjectNodeCard';
import SpatialMinimap from './SpatialMinimap';
import EdgeIndicators from './EdgeIndicators';
import NodeModalOverlay from './NodeModalOverlay';
import { bioSynthesizer } from '../audio/bioSynthesizer';
import { Maximize2, ZoomIn, ZoomOut, Volume2, VolumeX, Sparkles, Navigation, Layers } from 'lucide-react';

export default function InfiniteCanvasPortal() {
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(0.85); // 0.6x to 1.2x
  const [selectedNode, setSelectedNode] = useState(null);
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [audioActive, setAudioActive] = useState(false);

  const isDragging = useRef(false);
  const startMouse = useRef({ x: 0, y: 0 });
  const startPan = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const lastMouse = useRef({ x: 0, y: 0 });
  const lastTime = useRef(Date.now());
  const animFrameId = useRef(null);

  const canvasRef = useRef(null);
  const hoveredNodeRef = useRef(null);
  hoveredNodeRef.current = hoveredNodeId;

  // Smooth inertial physics loop
  useEffect(() => {
    const updateInertia = () => {
      if (!isDragging.current && (Math.abs(velocity.current.x) > 0.05 || Math.abs(velocity.current.y) > 0.05)) {
        setPan((prev) => ({
          x: prev.x + velocity.current.x,
          y: prev.y + velocity.current.y
        }));
        velocity.current.x *= 0.92;
        velocity.current.y *= 0.92;
      }
      animFrameId.current = requestAnimationFrame(updateInertia);
    };
    animFrameId.current = requestAnimationFrame(updateInertia);
    return () => cancelAnimationFrame(animFrameId.current);
  }, []);

  // Mouse Drag Handlers - exclude all cards and interactive controls from canvas drag
  const handleMouseDown = (e) => {
    if (
      e.target.closest('button') || 
      e.target.closest('input') || 
      e.target.closest('select') || 
      e.target.closest('a') || 
      e.target.closest('[data-node-card]')
    ) return;

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

    setPan({
      x: startPan.current.x + dx / zoom,
      y: startPan.current.y + dy / zoom
    });

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
      const zoomDelta = e.deltaY * -0.0015;
      setZoom((prev) => Math.min(1.2, Math.max(0.6, prev + zoomDelta)));
    } else {
      setPan((prev) => ({
        x: prev.x - (e.deltaX / zoom) * 0.8,
        y: prev.y - (e.deltaY / zoom) * 0.8
      }));
    }
  };

  // Canvas Vector Grid & Extension Rays Render Loop
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
      ctx.fillStyle = '#FAFAFA';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const halfW = canvas.width / 2;
      const halfH = canvas.height / 2;

      ctx.save();
      ctx.translate(halfW + pan.x * zoom, halfH + pan.y * zoom);
      ctx.scale(zoom, zoom);

      // 2. Subtle Coordinate Vector Grid (Light grey)
      const gridSize = 100;
      const startX = Math.floor((-halfW / zoom - pan.x) / gridSize) * gridSize - gridSize;
      const endX = Math.floor((halfW / zoom - pan.x) / gridSize) * gridSize + gridSize;
      const startY = Math.floor((-halfH / zoom - pan.y) / gridSize) * gridSize - gridSize;
      const endY = Math.floor((halfH / zoom - pan.y) / gridSize) * gridSize + gridSize;

      ctx.strokeStyle = 'rgba(0, 0, 0, 0.04)';
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

      // Subtle Major Axis Lines
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.lineWidth = 1.25;
      ctx.beginPath();
      ctx.moveTo(startX, 0);
      ctx.lineTo(endX, 0);
      ctx.moveTo(0, startY);
      ctx.lineTo(0, endY);
      ctx.stroke();

      // 3. Radial Extension Lines Connecting Origin (0,0) to Terminal Nodes
      pulseStep += 0.015;

      technosomaticNodes.forEach((node) => {
        const isHovered = hoveredNodeRef.current === node.id;
        const targetX = node.coords.x;
        const targetY = node.coords.y;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(targetX, targetY);
        
        if (isHovered) {
          ctx.strokeStyle = '#111111';
          ctx.lineWidth = 2;
          ctx.setLineDash([8, 4]);
        } else {
          ctx.strokeStyle = 'rgba(17, 17, 17, 0.22)';
          ctx.lineWidth = 1.25;
          ctx.setLineDash([5, 5]);
        }
        ctx.stroke();
        ctx.setLineDash([]);

        // Terminal Docking Ring at Node Coordinates
        ctx.beginPath();
        ctx.arc(targetX, targetY, isHovered ? 8 : 5, 0, Math.PI * 2);
        ctx.strokeStyle = isHovered ? '#111111' : 'rgba(17, 17, 17, 0.4)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Traveling Energy Pulse Dot
        const phase = (pulseStep * (isHovered ? 2.5 : 1) + Math.abs(targetX) * 0.005) % 1;
        const pulseX = targetX * phase;
        const pulseY = targetY * phase;

        ctx.beginPath();
        ctx.arc(pulseX, pulseY, isHovered ? 4.5 : 3, 0, Math.PI * 2);
        ctx.fillStyle = '#111111';
        ctx.fill();

        if (isHovered) {
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 8, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
          ctx.fill();
        }
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
      className="relative w-screen h-screen overflow-hidden bg-[#FAFAFA] text-zinc-950 select-none cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
    >
      {/* 2D Background Canvas for Vector Grid & Extension Rays */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block pointer-events-none" />

      {/* Spatial World Container with CSS Matrix Transform */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          transform: `translate(${window.innerWidth / 2 + pan.x * zoom}px, ${window.innerHeight / 2 + pan.y * zoom}px) scale(${zoom})`,
          transformOrigin: '0 0'
        }}
      >
        {/* Origin (0,0) Central Architectural Hub */}
        <CentralHubNode onExploreFirst={() => jumpTo(-technosomaticNodes[0].coords.x, -technosomaticNodes[0].coords.y)} />

        {/* Orbiting Terminal Nodes */}
        {technosomaticNodes.map((node) => (
          <ProjectNodeCard
            key={node.id}
            project={node}
            onSelect={(proj) => setSelectedNode(proj)}
            onHover={(id) => setHoveredNodeId(id)}
            onHoverEnd={() => setHoveredNodeId(null)}
          />
        ))}
      </div>

      {/* Top Fixed HUD Header */}
      <header className="fixed top-5 left-5 right-5 z-40 flex items-center justify-between pointer-events-none">
        
        {/* Brand Chip */}
        <div className="bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-[#111111] flex items-center gap-3 pointer-events-auto shadow-[0_8px_25px_rgba(0,0,0,0.06)]">
          <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-heading font-black text-xs">
            RN
          </div>
          <div>
            <div className="font-heading font-bold text-xs text-black tracking-wider flex items-center gap-1.5">
              ROOT NODE <span className="text-zinc-400 font-mono">//</span> TECHNOSOMATIC GRAPH
            </div>
            <div className="text-[9px] font-mono text-zinc-500 font-semibold">360° SPATIAL VECTOR ENGINE</div>
          </div>
        </div>

        {/* Right HUD Controls */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Quick Node Selector Dropdown */}
          <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#111111] flex items-center gap-2 text-xs font-mono shadow-[0_8px_25px_rgba(0,0,0,0.06)]">
            <span className="text-zinc-500 font-semibold hidden sm:inline text-[11px]">PORTAL:</span>
            <select
              onChange={(e) => {
                const target = technosomaticNodes.find(p => p.id === e.target.value);
                if (target) {
                  jumpTo(-target.coords.x, -target.coords.y);
                  setSelectedNode(target);
                } else if (e.target.value === 'origin') {
                  recenter();
                }
              }}
              className="bg-white text-black font-semibold border border-zinc-300 rounded px-2 py-1 text-xs cursor-pointer outline-none hover:border-black"
            >
              <option value="">Jump & Open Modal...</option>
              <option value="origin">Origin [0, 0]</option>
              {technosomaticNodes.map(p => (
                <option key={p.id} value={p.id}>{p.indexTag || p.title}</option>
              ))}
            </select>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleAudio}
            className={`bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#111111] pointer-events-auto cursor-pointer transition-all shadow-[0_8px_25px_rgba(0,0,0,0.06)] flex items-center gap-2 ${
              audioActive ? 'bg-black text-white' : 'text-zinc-700 hover:text-black'
            }`}
            title="Toggle 144Hz Harmonic Bio-Synthesizer"
          >
            {audioActive ? <Volume2 className="w-3.5 h-3.5 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="text-[10px] font-mono font-bold hidden sm:inline">{audioActive ? '144Hz SYNTH' : 'MUTED'}</span>
          </button>
        </div>

      </header>

      {/* Bottom-Left Zoom Controls */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center gap-1.5 bg-white/90 backdrop-blur-md p-1.5 border border-[#111111] rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
        <button
          onClick={() => setZoom(prev => Math.min(1.2, prev + 0.1))}
          className="p-2 hover:bg-zinc-100 text-zinc-800 hover:text-black rounded-lg transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <span className="text-[10px] font-mono text-zinc-700 px-2 font-bold">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={() => setZoom(prev => Math.max(0.6, prev - 0.1))}
          className="p-2 hover:bg-zinc-100 text-zinc-800 hover:text-black rounded-lg transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <div className="w-[1px] h-4 bg-zinc-300 mx-1"></div>
        <button
          onClick={recenter}
          className="px-3 py-1.5 hover:bg-zinc-100 text-zinc-800 hover:text-black rounded-lg text-xs font-mono font-bold flex items-center gap-1 transition-colors"
          title="Recenter Viewport to Origin"
        >
          <Maximize2 className="w-3.5 h-3.5" /> RECENTER
        </button>
      </div>

      {/* Radar Minimap */}
      <SpatialMinimap
        pan={pan}
        zoom={zoom}
        projects={technosomaticNodes}
        onJumpTo={jumpTo}
        onReset={recenter}
      />

      {/* Off-Screen Directional Indicators */}
      <EdgeIndicators
        pan={pan}
        zoom={zoom}
        projects={technosomaticNodes}
        onJumpTo={jumpTo}
      />

      {/* Non-Destructive Floating Modal Window System */}
      {selectedNode && (
        <NodeModalOverlay
          project={selectedNode}
          onClose={() => setSelectedNode(null)}
        />
      )}

    </div>
  );
}
