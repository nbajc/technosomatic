import React, { useRef, useEffect, useState } from 'react';
import { bioSynthesizer } from '../audio/bioSynthesizer';
import { ShieldAlert, ArrowRight, Zap, RefreshCw, Radio } from 'lucide-react';

export default function HeroCanvas({ nodeDensity, frequency, onNodeCountUpdate }) {
  const canvasRef = useRef(null);
  const [interactiveMode, setInteractiveMode] = useState('gravitate'); // 'gravitate', 'repel', 'synapse'
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 180 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const setCanvasSize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Initialize Nodes
    const count = Math.floor(nodeDensity || 60);
    const nodes = [];
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2.5 + 1.5,
        baseColor: i % 5 === 0 ? '#00d8ff' : (i % 3 === 0 ? '#9d4edf' : '#00f5a0'),
        pulse: Math.random() * Math.PI * 2
      });
    }

    if (onNodeCountUpdate) onNodeCountUpdate(nodes.length);

    // Mouse listeners
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    const handleClick = () => {
      bioSynthesizer.triggerSynapticImpulse();
      // Impulse burst
      nodes.forEach(node => {
        const dx = node.x - mouseRef.current.x;
        const dy = node.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 250) {
          const force = (250 - dist) / 10;
          const angle = Math.atan2(dy, dx);
          node.vx += Math.cos(angle) * force * 0.5;
          node.vy += Math.sin(angle) * force * 0.5;
        }
      });
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleClick);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update & draw nodes
      nodes.forEach((node, i) => {
        // Move
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.03;

        // Friction & Boundary Bounce
        node.vx *= 0.98;
        node.vy *= 0.98;

        if (Math.abs(node.vx) < 0.2) node.vx += (Math.random() - 0.5) * 0.1;
        if (Math.abs(node.vy) < 0.2) node.vy += (Math.random() - 0.5) * 0.1;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Interactive mouse dynamics
        const dx = mouseRef.current.x - node.x;
        const dy = mouseRef.current.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseRef.current.radius) {
          const angle = Math.atan2(dy, dx);
          const force = (mouseRef.current.radius - dist) / mouseRef.current.radius;
          
          if (interactiveMode === 'gravitate') {
            node.vx += Math.cos(angle) * force * 0.4;
            node.vy += Math.sin(angle) * force * 0.4;
          } else if (interactiveMode === 'repel') {
            node.vx -= Math.cos(angle) * force * 0.8;
            node.vy -= Math.sin(angle) * force * 0.8;
          }
        }

        // Draw connections to nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const ndx = other.x - node.x;
          const ndy = other.y - node.y;
          const nDist = Math.sqrt(ndx * ndx + ndy * ndy);

          if (nDist < 120) {
            const alpha = (1 - nDist / 120) * 0.25;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(0, 245, 160, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Draw Node
        const currentRadius = node.radius + Math.sin(node.pulse) * 0.6;
        ctx.beginPath();
        ctx.arc(node.x, node.y, Math.max(0.5, currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = node.baseColor;
        ctx.shadowBlur = 10;
        ctx.shadowColor = node.baseColor;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Mouse Glow Effect
      if (mouseRef.current.x > 0) {
        const grad = ctx.createRadialGradient(
          mouseRef.current.x, mouseRef.current.y, 0,
          mouseRef.current.x, mouseRef.current.y, mouseRef.current.radius
        );
        grad.addColorStop(0, 'rgba(0, 245, 160, 0.15)');
        grad.addColorStop(0.5, 'rgba(0, 216, 255, 0.05)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(mouseRef.current.x, mouseRef.current.y, mouseRef.current.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [nodeDensity, interactiveMode]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-grid-pattern">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none"></div>

      {/* Interactive 60fps Canvas */}
      <div className="absolute inset-0 w-full h-full cursor-crosshair">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pointer-events-none">
        
        {/* Top Status Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-emerald-500/30 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(0,245,160,0.15)] pointer-events-auto">
          <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span className="text-xs font-mono text-emerald-300 uppercase tracking-widest">
            Somatic Node Matrix v3.6 Active
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
          Where Embodied Consciousness <br className="hidden sm:block" />
          <span className="text-gradient-emerald">Meets Architectural Computing</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-300 mb-10 font-normal leading-relaxed">
          Root Node Technosomatic merges biological nervous systems, spatial computing, and sub-millisecond interfaces into a unified bio-cybernetic architecture.
        </p>

        {/* CTA Button Group */}
        <div className="flex flex-wrap items-center justify-center gap-4 pointer-events-auto">
          <a 
            href="#lab" 
            className="btn-primary group"
            onClick={() => bioSynthesizer.triggerSynapticImpulse()}
          >
            <span>Launch Somatic Lab</span>
            <Zap className="w-4 h-4 text-slate-950 group-hover:rotate-12 transition-transform" />
          </a>
          
          <a 
            href="#vault" 
            className="btn-secondary group"
          >
            <span>Explore Publications</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Canvas Dynamic Mode Selector */}
        <div className="mt-14 inline-flex items-center gap-3 p-2 rounded-2xl glass-panel pointer-events-auto">
          <span className="text-xs font-mono text-slate-400 px-3 flex items-center gap-1.5">
            <RefreshCw className="w-3 h-3 text-emerald-400" /> MATRIX DYNAMICS:
          </span>
          {['gravitate', 'repel', 'synapse'].map((mode) => (
            <button
              key={mode}
              onClick={() => {
                setInteractiveMode(mode);
                bioSynthesizer.triggerSynapticImpulse();
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono capitalize transition-all ${
                interactiveMode === mode 
                  ? 'bg-emerald-400 text-slate-950 font-semibold shadow-[0_0_12px_#00f5a0]' 
                  : 'text-slate-300 hover:bg-white/5'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
