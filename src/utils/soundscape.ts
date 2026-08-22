/**
 * African Savanna Ambient Soundscape Synthesizer
 * Uses Web Audio API to create gentle nocturnal savanna sounds,
 * warm wind breeze, crickets and crackling campfire without external audio files.
 */

class SavannaSoundscape {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private gainNode: GainNode | null = null;
  private noiseTimer: number | null = null;
  private cricketTimer: number | null = null;

  public init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
  }

  public play() {
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isPlaying = true;
    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0.01, this.ctx.currentTime);
    this.gainNode.gain.exponentialRampToValueAtTime(0.2, this.ctx.currentTime + 2);
    this.gainNode.connect(this.ctx.destination);

    // Warm Savanna Breeze Generator (Brown Noise Filtered)
    const bufferSize = this.ctx.sampleRate * 3;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(280, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(this.gainNode);
    whiteNoise.start();

    // Crickets & nocturnal savanna chirps
    const createCricketChirp = () => {
      if (!this.isPlaying || !this.ctx || !this.gainNode) return;
      const osc = this.ctx.createOscillator();
      const chirpGain = this.ctx.createGain();
      
      const freq = 4500 + Math.random() * 800;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      
      chirpGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      chirpGain.gain.exponentialRampToValueAtTime(0.04, this.ctx.currentTime + 0.04);
      chirpGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.15);

      osc.connect(chirpGain);
      chirpGain.connect(this.gainNode);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.16);

      const nextInterval = 200 + Math.random() * 800;
      this.cricketTimer = window.setTimeout(createCricketChirp, nextInterval);
    };

    createCricketChirp();
  }

  public stop() {
    this.isPlaying = false;
    if (this.gainNode && this.ctx) {
      try {
        this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1);
        setTimeout(() => {
          if (this.ctx && this.ctx.state === 'running') {
            this.ctx.suspend();
          }
        }, 1000);
      } catch {
        // Safe ignore
      }
    }
    if (this.noiseTimer) window.clearTimeout(this.noiseTimer);
    if (this.cricketTimer) window.clearTimeout(this.cricketTimer);
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const savannaAudio = new SavannaSoundscape();
