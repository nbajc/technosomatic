import React, { useState } from 'react';
import { publicationsData } from '../data/publicationsData';
import { BookOpen, Clock, Tag, ArrowUpRight, X, Bookmark, Share2, Type } from 'lucide-react';
import { bioSynthesizer } from '../audio/bioSynthesizer';

export default function PublicationVault() {
  const [selectedEssay, setSelectedEssay] = useState(null);
  const [fontSize, setFontSize] = useState('base'); // 'sm', 'base', 'lg'
  const [bookmarked, setBookmarked] = useState({});

  const toggleBookmark = (id, e) => {
    e.stopPropagation();
    setBookmarked(prev => ({ ...prev, [id]: !prev[id] }));
    bioSynthesizer.triggerSynapticImpulse();
  };

  const getFontSizeClass = () => {
    if (fontSize === 'sm') return 'text-sm leading-relaxed';
    if (fontSize === 'lg') return 'text-lg leading-relaxed';
    return 'text-base leading-relaxed';
  };

  return (
    <section id="vault" className="py-24 relative bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="glass-pill mb-4">
              <BookOpen className="w-3.5 h-3.5" />
              RESEARCH & ESSAY VAULT
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
              Technosomatic <span className="text-gradient-emerald">Publications</span>
            </h2>
          </div>
          <p className="text-slate-400 text-sm sm:text-base max-w-md">
            Peer-reviewed essays, design frameworks, and architectural papers examining the intersection of biological somatics and computational systems.
          </p>
        </div>

        {/* Essay Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {publicationsData.map((essay) => (
            <div
              key={essay.id}
              onClick={() => {
                setSelectedEssay(essay);
                bioSynthesizer.triggerSynapticImpulse();
              }}
              className="glass-panel p-6 sm:p-8 flex flex-col justify-between cursor-pointer group hover:border-emerald-400/40 transition-all duration-300 relative"
            >
              <div>
                {/* Meta info */}
                <div className="flex items-center justify-between text-xs font-mono mb-4">
                  <span className="text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20">
                    {essay.category}
                  </span>
                  <button 
                    onClick={(e) => toggleBookmark(essay.id, e)}
                    className="text-slate-500 hover:text-emerald-400 transition-colors p-1"
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarked[essay.id] ? 'fill-emerald-400 text-emerald-400' : ''}`} />
                  </button>
                </div>

                <h3 className="text-xl font-bold font-heading text-white group-hover:text-emerald-400 transition-colors mb-3">
                  {essay.title}
                </h3>
                
                <p className="text-xs font-mono text-slate-400 mb-4">
                  {essay.subtitle}
                </p>

                <p className="text-xs text-slate-300 line-clamp-3 mb-6 leading-relaxed">
                  {essay.summary}
                </p>
              </div>

              {/* Footer info */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-mono text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> {essay.readTime}
                </span>
                <span className="flex items-center gap-1 text-emerald-400 font-semibold group-hover:translate-x-1 transition-transform">
                  READ PAPER <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Full Essay Modal Reader */}
        {selectedEssay && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-xl animate-fade-in">
            <div className="glass-panel w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border-emerald-400/30">
              
              {/* Modal Reader Top Bar */}
              <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-slate-900/90">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/30">
                    {selectedEssay.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                    {selectedEssay.date} • {selectedEssay.readTime}
                  </span>
                </div>

                {/* Reader Controls */}
                <div className="flex items-center gap-3">
                  {/* Font Sizer */}
                  <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-white/10 text-xs font-mono">
                    <Type className="w-3.5 h-3.5 text-slate-400 ml-1" />
                    {['sm', 'base', 'lg'].map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setFontSize(sz)}
                        className={`px-2 py-0.5 rounded text-[11px] uppercase ${fontSize === sz ? 'bg-emerald-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedEssay(null)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-400/20 text-slate-300 hover:text-emerald-400 flex items-center justify-center transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body / Essay Content */}
              <div className="p-6 sm:p-10 overflow-y-auto space-y-6">
                <div className="border-b border-white/10 pb-6">
                  <h2 className="text-2xl sm:text-4xl font-bold font-heading text-white mb-2">
                    {selectedEssay.title}
                  </h2>
                  <p className="text-sm font-mono text-emerald-400 mb-4">
                    {selectedEssay.subtitle}
                  </p>
                  <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                    <span>AUTHOR: {selectedEssay.author}</span>
                    <span>•</span>
                    <span>PUBLISHED: {selectedEssay.date}</span>
                  </div>
                </div>

                {/* Main Markdown/HTML Render */}
                <div className={`text-slate-200 ${getFontSizeClass()} space-y-4 font-body`}>
                  {selectedEssay.content.split('\n\n').map((paragraph, index) => {
                    if (paragraph.startsWith('### ')) {
                      return <h3 key={index} className="text-xl font-bold font-heading text-emerald-300 pt-4">{paragraph.replace('### ', '')}</h3>;
                    }
                    if (paragraph.startsWith('> ')) {
                      return (
                        <blockquote key={index} className="p-4 rounded-xl bg-slate-900 border-l-4 border-l-emerald-400 italic text-slate-300 my-4">
                          {paragraph.replace('> ', '')}
                        </blockquote>
                      );
                    }
                    if (paragraph.startsWith('1. ') || paragraph.startsWith('2. ') || paragraph.startsWith('3. ')) {
                      return <div key={index} className="pl-4 font-mono text-xs text-slate-300 bg-white/5 p-3 rounded-lg border border-white/5">{paragraph}</div>;
                    }
                    return <p key={index}>{paragraph}</p>;
                  })}
                </div>
              </div>

              {/* Reader Footer */}
              <div className="p-4 border-t border-white/10 bg-slate-900/90 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>ROOT NODE RESEARCH VAULT</span>
                <button 
                  onClick={() => setSelectedEssay(null)}
                  className="btn-primary text-xs py-1.5 px-4"
                >
                  CLOSE READER
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
