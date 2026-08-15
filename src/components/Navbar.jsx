import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Activity, Cpu, BookOpen, Layers, Terminal, Sparkles } from 'lucide-react';
import { bioSynthesizer } from '../audio/bioSynthesizer';

export default function Navbar({ activeSection, setActiveSection }) {
  const [audioActive, setAudioActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAudio = () => {
    const isPlaying = bioSynthesizer.toggle();
    setAudioActive(isPlaying);
    if (isPlaying) {
      bioSynthesizer.triggerSynapticImpulse();
    }
  };

  const navItems = [
    { id: 'hero', label: 'Overview', icon: Sparkles },
    { id: 'lab', label: 'Somatic Lab', icon: Activity },
    { id: 'manifesto', label: 'Manifesto', icon: Cpu },
    { id: 'vault', label: 'Publications', icon: BookOpen },
    { id: 'capabilities', label: 'Capabilities', icon: Layers },
    { id: 'contact', label: 'Terminal', icon: Terminal },
  ];

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel px-4 py-3 flex items-center justify-between">
          
          {/* Logo & Emblem */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => scrollToSection('hero')}
          >
            <div className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400/20 to-cyan-500/20 border border-emerald-400/30 group-hover:border-emerald-400 transition-all duration-300">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse-slow shadow-[0_0_12px_#00f5a0]"></div>
              <div className="absolute inset-0 rounded-xl border border-emerald-400/20 group-hover:scale-110 transition-transform"></div>
            </div>
            <div>
              <div className="font-heading font-bold text-sm tracking-wider text-white group-hover:text-emerald-400 transition-colors flex items-center gap-2">
                ROOT NODE <span className="text-emerald-400 text-xs font-mono">//</span> TECHNOSOMATIC
              </div>
              <div className="text-[10px] font-mono text-slate-400 tracking-widest uppercase">Embodied Computing Labs</div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-full border border-white/5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 text-emerald-400 border border-emerald-400/30 shadow-[0_0_15px_rgba(0,245,160,0.15)]' 
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Soundscape Toggle & System Chip */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleAudio}
              className={`glass-pill cursor-pointer transition-all duration-300 hover:scale-105 ${
                audioActive 
                  ? 'border-emerald-400/60 text-emerald-400 bg-emerald-400/10 shadow-[0_0_20px_rgba(0,245,160,0.25)]' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Toggle Bio-Frequency Audio Synth"
            >
              {audioActive ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-mono">144Hz BIO-SYNTH</span>
                  <span className="flex gap-0.5 items-end h-3">
                    <span className="w-0.5 h-full bg-emerald-400 animate-bounce"></span>
                    <span className="w-0.5 h-2/3 bg-emerald-400 animate-bounce delay-75"></span>
                    <span className="w-0.5 h-4/5 bg-emerald-400 animate-bounce delay-150"></span>
                  </span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-mono">AUDIO MUTED</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
