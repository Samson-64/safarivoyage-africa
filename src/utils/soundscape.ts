/**
 * African Savanna Ambient Soundscape Synthesizer
 * Uses Web Audio API to create gentle nocturnal savanna sounds,
 * warm wind breeze, crickets and crackling campfire without external audio files.
 */

class SavannaSoundscape {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private noiseSource: AudioBufferSourceNode | null = null;
  private cricketTimer: number | null = null;

  public init() {
    if (!this.ctx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
  }

  public play() {
    this.init();
    if (!this.ctx || this.isPlaying) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isPlaying = true;

    const ctx = this.ctx;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.01, ctx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 2);
    masterGain.connect(ctx.destination);
    this.masterGain = masterGain;

    // Warm Savanna Breeze Generator (filtered brown noise)
    const bufferSize = ctx.sampleRate * 3;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(280, ctx.currentTime);

    noiseSource.connect(filter);
    filter.connect(masterGain);
    noiseSource.start();
    this.noiseSource = noiseSource;

    // Crickets & nocturnal savanna chirps
    const createCricketChirp = () => {
      if (!this.isPlaying || !ctx || !masterGain) return;

      const osc = ctx.createOscillator();
      const chirpGain = ctx.createGain();

      const freq = 4500 + Math.random() * 800;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      chirpGain.gain.setValueAtTime(0.001, ctx.currentTime);
      chirpGain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 0.04);
      chirpGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);

      osc.connect(chirpGain);
      chirpGain.connect(masterGain);

      osc.start();
      osc.stop(ctx.currentTime + 0.16);

      const nextInterval = 200 + Math.random() * 800;
      this.cricketTimer = window.setTimeout(createCricketChirp, nextInterval);
    };

    createCricketChirp();
  }

  public stop() {
    this.isPlaying = false;

    if (this.cricketTimer !== null) {
      window.clearTimeout(this.cricketTimer);
      this.cricketTimer = null;
    }

    // Fade out, then tear down this cycle's nodes so repeated
    // play/stop cycles don't leak disconnected sources or gains.
    const ctx = this.ctx;
    const masterGain = this.masterGain;
    const noiseSource = this.noiseSource;

    this.masterGain = null;
    this.noiseSource = null;

    if (ctx && masterGain) {
      try {
        masterGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1);
      } catch {
        // Safe ignore
      }
      window.setTimeout(() => {
        try {
          noiseSource?.stop();
        } catch {
          // Already stopped
        }
        masterGain.disconnect();
        if (ctx.state === 'running' && !this.isPlaying) {
          ctx.suspend();
        }
      }, 1000);
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    }
    this.play();
    return true;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const savannaAudio = new SavannaSoundscape();
