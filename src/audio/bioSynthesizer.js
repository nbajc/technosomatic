// Root Node Technosomatic - Web Audio Bio-Synthesizer
// Generates responsive ambient harmonic bio-frequencies

class BioSynthesizer {
  constructor() {
    this.ctx = null;
    this.osc1 = null;
    this.osc2 = null;
    this.gainNode = null;
    this.filterNode = null;
    this.isPlaying = false;
    this.frequency = 144.0; // Base somatic resonance Hz (Solfeggio 144Hz / 432Hz harmonic)
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  toggle() {
    if (!this.ctx) this.init();
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
    return this.isPlaying;
  }

  start() {
    if (!this.ctx) return;
    this.stop(); // reset if running

    const now = this.ctx.currentTime;
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0.001, now);
    this.gainNode.gain.exponentialRampToValueAtTime(0.08, now + 1.5);

    // Low pass filter for soft organic warm sound
    this.filterNode = this.ctx.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.setValueAtTime(320, now);

    // Primary Osc (Sine - Base Somatic Root)
    this.osc1 = this.ctx.createOscillator();
    this.osc1.type = 'sine';
    this.osc1.frequency.setValueAtTime(this.frequency, now);

    // Secondary Osc (Harmonic Fifth for spatial depth)
    this.osc2 = this.ctx.createOscillator();
    this.osc2.type = 'sine';
    this.osc2.frequency.setValueAtTime(this.frequency * 1.5, now);

    // LFO for subtle breathing pulse
    this.lfo = this.ctx.createOscillator();
    this.lfo.type = 'sine';
    this.lfo.frequency.setValueAtTime(0.2, now); // 0.2Hz = 5 second breath cycle
    
    this.lfoGain = this.ctx.createGain();
    this.lfoGain.gain.setValueAtTime(40, now);

    this.lfo.connect(this.lfoGain);
    this.lfoGain.connect(this.filterNode.frequency);

    this.osc1.connect(this.filterNode);
    this.osc2.connect(this.filterNode);
    this.filterNode.connect(this.gainNode);
    this.gainNode.connect(this.ctx.destination);

    this.osc1.start(now);
    this.osc2.start(now);
    this.lfo.start(now);
    this.isPlaying = true;
  }

  stop() {
    if (this.gainNode && this.ctx) {
      const now = this.ctx.currentTime;
      this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, now);
      this.gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
      setTimeout(() => {
        if (this.osc1) { try { this.osc1.stop(); } catch(e){} }
        if (this.osc2) { try { this.osc2.stop(); } catch(e){} }
        if (this.lfo) { try { this.lfo.stop(); } catch(e){} }
        this.isPlaying = false;
      }, 500);
    } else {
      this.isPlaying = false;
    }
  }

  updateFrequency(newFreq) {
    this.frequency = newFreq;
    if (this.isPlaying && this.osc1 && this.ctx) {
      const now = this.ctx.currentTime;
      this.osc1.frequency.setTargetAtTime(newFreq, now, 0.1);
      this.osc2.frequency.setTargetAtTime(newFreq * 1.5, now, 0.1);
    }
  }

  triggerSynapticImpulse() {
    if (!this.isPlaying || !this.ctx) return;
    const now = this.ctx.currentTime;
    const impulseGain = this.ctx.createGain();
    const impulseOsc = this.ctx.createOscillator();
    
    impulseOsc.type = 'sine';
    impulseOsc.frequency.setValueAtTime(this.frequency * 3.5, now);
    impulseOsc.frequency.exponentialRampToValueAtTime(this.frequency * 0.8, now + 0.3);

    impulseGain.gain.setValueAtTime(0.04, now);
    impulseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

    impulseOsc.connect(impulseGain);
    impulseGain.connect(this.ctx.destination);

    impulseOsc.start(now);
    impulseOsc.stop(now + 0.35);
  }
}

export const bioSynthesizer = new BioSynthesizer();
