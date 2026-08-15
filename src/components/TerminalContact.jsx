import React, { useState } from 'react';
import { Terminal, Send, CheckCircle2, Sparkles, Shield, CornerDownLeft } from 'lucide-react';
import { bioSynthesizer } from '../audio/bioSynthesizer';

export default function TerminalContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    mandate: 'Somatic HCI Architecture',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isTransmitting, setIsTransmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsTransmitting(true);
    bioSynthesizer.triggerSynapticImpulse();

    setTimeout(() => {
      setIsTransmitting(false);
      setSubmitted(true);
      bioSynthesizer.triggerSynapticImpulse();
    }, 1500);
  };

  const setPresetPrompt = (text) => {
    setFormData(prev => ({ ...prev, message: text }));
    bioSynthesizer.triggerSynapticImpulse();
  };

  return (
    <section id="contact" className="py-24 relative bg-slate-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="glass-pill mb-4">
            <Terminal className="w-3.5 h-3.5" />
            SYNAPTIC CONTACT CONSOLE
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Initiate <span className="text-gradient-emerald">Technosomatic</span> Dialogue
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Connect with our research team for architectural advisory, custom HCI implementations, or collaborative research.
          </p>
        </div>

        {/* Terminal Window Box */}
        <div className="glass-panel overflow-hidden border-emerald-500/30 shadow-[0_0_50px_rgba(0,245,160,0.1)]">
          
          {/* Terminal Window Header Bar */}
          <div className="bg-slate-900 px-4 py-3 border-b border-white/10 flex items-center justify-between font-mono text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              <span className="ml-2 text-slate-300 font-semibold">root_node_console.sh --port 5173</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>ENCRYPTED CHANNEL</span>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 sm:p-10 bg-slate-950/90 font-mono">

            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-400/20 text-emerald-400 border border-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_#00f5a0]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white font-heading">SYNAPTIC HANDSHAKE CONFIRMED</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Your transmission has been ingested into the Root Node queue. A technosomatic architect will contact your node within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-secondary text-xs mt-4"
                >
                  TRANSMIT ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* System Prompt Banner */}
                <div className="p-3 rounded-lg bg-slate-900 border border-white/10 text-xs text-slate-400 space-y-1">
                  <div><span className="text-emerald-400">$</span> init_handshake --protocol=somatic_v3</div>
                  <div><span className="text-cyan-400">&gt;</span> Standard input channel open. Please provide credentials & mandate:</div>
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="text-slate-500 py-1">PRESET COMMANDS:</span>
                  {[
                    "Request HCI Architecture Review",
                    "Inquire for Bio-Feedback Systems",
                    "Join Research Network"
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setPresetPrompt(preset)}
                      className="px-2.5 py-1 rounded bg-slate-900 border border-white/10 hover:border-emerald-400/40 text-slate-300 hover:text-emerald-400 text-[11px] transition-all"
                    >
                      {preset}
                    </button>
                  ))}
                </div>

                {/* Grid Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">// YOUR NAME *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Natasha Vance"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">// DIGITAL NODE EMAIL *</label>
                    <input
                      type="email"
                      required
                      placeholder="natasha@rootnode.tech"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">// ORGANIZATION / INSTITUTION</label>
                    <input
                      type="text"
                      placeholder="e.g. Technosomatic Research Institute"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">// MANDATE DOMAIN</label>
                    <select
                      value={formData.mandate}
                      onChange={(e) => setFormData({ ...formData, mandate: e.target.value })}
                      className="input-field cursor-pointer bg-slate-900"
                    >
                      <option>Somatic HCI Architecture</option>
                      <option>Spatial Node Systems</option>
                      <option>Bio-Feedback Hardware Integration</option>
                      <option>Research Collaboration</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">// TRANSMISSION PAYLOAD / PROJECT MANDATE *</label>
                  <textarea
                    required
                    rows="4"
                    placeholder="Describe your spatial computing project, research inquiry, or somatic interface goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="input-field resize-none"
                  ></textarea>
                </div>

                {/* Submit Action */}
                <div className="flex items-center justify-between pt-2">
                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-emerald-400" />
                    <span>256-BIT BIO-CYBERNETIC ENCRYPTION</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isTransmitting}
                    className="btn-primary text-xs"
                  >
                    {isTransmitting ? (
                      <>
                        <span className="w-3 h-3 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                        <span>TRANSMITTING...</span>
                      </>
                    ) : (
                      <>
                        <span>EXECUTE TRANSMISSION</span>
                        <CornerDownLeft className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
