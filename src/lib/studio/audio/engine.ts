export interface PlaybackEffects {
  beatVolume: number;
  vocalVolume: number;
  beatPan: number;
  vocalPan: number;
  eq: { low: number; mid: number; high: number } | null;
  compressor: { threshold: number; ratio: number; attack: number; release: number; makeup: number } | null;
  reverb: { decay: number; wet: number } | null;
}

function createImpulse(ctx: AudioContext, decay: number): AudioBuffer {
  const rate = ctx.sampleRate;
  const len = Math.max(1, Math.floor(rate * decay));
  const buf = ctx.createBuffer(2, len, rate);
  for (let c = 0; c < 2; c++) {
    const d = buf.getChannelData(c);
    for (let i = 0; i < len; i++) {
      d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2);
    }
  }
  return buf;
}

function buildVocalChain(
  ctx: AudioContext,
  src: AudioBufferSourceNode,
  effects: PlaybackEffects,
  destination: AudioNode
): void {
  let node: AudioNode = src;

  if (effects.eq) {
    const low = ctx.createBiquadFilter();
    low.type = 'lowshelf';
    low.frequency.value = 250;
    low.gain.value = effects.eq.low;
    const mid = ctx.createBiquadFilter();
    mid.type = 'peaking';
    mid.frequency.value = 1000;
    mid.Q.value = 0.5;
    mid.gain.value = effects.eq.mid;
    const high = ctx.createBiquadFilter();
    high.type = 'highshelf';
    high.frequency.value = 8000;
    high.gain.value = effects.eq.high;
    node.connect(low);
    low.connect(mid);
    mid.connect(high);
    node = high;
  }

  if (effects.compressor) {
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = effects.compressor.threshold;
    comp.ratio.value = effects.compressor.ratio;
    comp.attack.value = effects.compressor.attack / 1000;
    comp.release.value = effects.compressor.release / 1000;
    const makeup = ctx.createGain();
    makeup.gain.value = Math.pow(10, effects.compressor.makeup / 20);
    node.connect(comp);
    comp.connect(makeup);
    node = makeup;
  }

  const vocalGain = ctx.createGain();
  vocalGain.gain.value = Math.max(0, Math.min(2, effects.vocalVolume));
  const vocalPan = ctx.createStereoPanner();
  vocalPan.pan.value = effects.vocalPan;

  if (effects.reverb) {
    const convolver = ctx.createConvolver();
    convolver.buffer = createImpulse(ctx, effects.reverb.decay);
    const wet = ctx.createGain();
    wet.gain.value = effects.reverb.wet;
    const dry = ctx.createGain();
    dry.gain.value = 1 - effects.reverb.wet;
    node.connect(convolver);
    convolver.connect(wet);
    wet.connect(vocalGain);
    node.connect(dry);
    dry.connect(vocalGain);
  } else {
    node.connect(vocalGain);
  }

  vocalGain.connect(vocalPan);
  vocalPan.connect(destination);
}

export class AudioEngine {
  private ctx: AudioContext | null = null;
  private beatBuffer: AudioBuffer | null = null;
  private vocalBuffer: AudioBuffer | null = null;
  private activeSources: AudioBufferSourceNode[] = [];
  private startedAt = 0;
  private pausedAt = 0;
  public isPlaying = false;
  public duration = 0;

  get currentTime(): number {
    if (!this.ctx) return 0;
    if (this.isPlaying) return this.ctx.currentTime - this.startedAt;
    return this.pausedAt;
  }

  private getCtx(): AudioContext {
    if (!this.ctx || this.ctx.state === 'closed') {
      this.ctx = new AudioContext();
    }
    return this.ctx;
  }

  async loadBeat(url: string): Promise<void> {
    const ctx = this.getCtx();
    const res = await fetch(url);
    const ab = await res.arrayBuffer();
    this.beatBuffer = await ctx.decodeAudioData(ab);
    this.duration = this.beatBuffer.duration;
  }

  async loadVocal(url: string): Promise<void> {
    const ctx = this.getCtx();
    const res = await fetch(url);
    const ab = await res.arrayBuffer();
    this.vocalBuffer = await ctx.decodeAudioData(ab);
  }

  play(vocalOffsetMs: number, effects: PlaybackEffects, onEnd?: () => void): void {
    if (!this.beatBuffer) return;
    const ctx = this.getCtx();
    if (ctx.state === 'suspended') ctx.resume();

    this.stopSources();

    const seekTo = this.pausedAt;
    this.startedAt = ctx.currentTime - seekTo;
    this.isPlaying = true;

    const beatSrc = ctx.createBufferSource();
    beatSrc.buffer = this.beatBuffer;
    const beatGain = ctx.createGain();
    beatGain.gain.value = Math.max(0, Math.min(2, effects.beatVolume));
    const beatPan = ctx.createStereoPanner();
    beatPan.pan.value = effects.beatPan;
    beatSrc.connect(beatGain);
    beatGain.connect(beatPan);
    beatPan.connect(ctx.destination);
    beatSrc.start(0, seekTo);
    this.activeSources.push(beatSrc);

    beatSrc.onended = () => {
      this.isPlaying = false;
      this.pausedAt = 0;
      onEnd?.();
    };

    if (this.vocalBuffer) {
      const offsetSec = vocalOffsetMs / 1000;
      const vocalSrc = ctx.createBufferSource();
      vocalSrc.buffer = this.vocalBuffer;
      buildVocalChain(ctx, vocalSrc, effects, ctx.destination);

      if (offsetSec >= seekTo) {
        vocalSrc.start(ctx.currentTime + (offsetSec - seekTo), 0);
      } else {
        const vocalSeek = seekTo - offsetSec;
        if (vocalSeek < this.vocalBuffer.duration) {
          vocalSrc.start(0, vocalSeek);
        }
      }
      this.activeSources.push(vocalSrc);
    }
  }

  pause(): void {
    if (!this.isPlaying || !this.ctx) return;
    this.pausedAt = this.ctx.currentTime - this.startedAt;
    this.stopSources();
    this.isPlaying = false;
  }

  stop(): void {
    this.stopSources();
    this.pausedAt = 0;
    this.isPlaying = false;
  }

  private stopSources(): void {
    for (const src of this.activeSources) {
      try { src.stop(); } catch {}
    }
    this.activeSources = [];
  }

  async renderToWav(
    vocalOffsetMs: number,
    effects: PlaybackEffects,
    durationSec?: number
  ): Promise<ArrayBuffer> {
    if (!this.beatBuffer) throw new Error('No beat loaded');
    const dur = durationSec ?? this.beatBuffer.duration;
    const rate = this.beatBuffer.sampleRate;
    const offCtx = new OfflineAudioContext(2, Math.ceil(dur * rate), rate);

    const beatSrc = offCtx.createBufferSource();
    beatSrc.buffer = this.beatBuffer;
    const beatGain = offCtx.createGain();
    beatGain.gain.value = effects.beatVolume;
    const beatPan = offCtx.createStereoPanner();
    beatPan.pan.value = effects.beatPan;
    beatSrc.connect(beatGain);
    beatGain.connect(beatPan);
    beatPan.connect(offCtx.destination);
    beatSrc.start(0);

    if (this.vocalBuffer) {
      const vocalSrc = offCtx.createBufferSource();
      vocalSrc.buffer = this.vocalBuffer;
      buildVocalChain(offCtx as unknown as AudioContext, vocalSrc, effects, offCtx.destination);
      vocalSrc.start(vocalOffsetMs / 1000);
    }

    const rendered = await offCtx.startRendering();
    return encodeWav(rendered);
  }

  dispose(): void {
    this.stopSources();
    this.ctx?.close();
    this.ctx = null;
  }
}

function encodeWav(buffer: AudioBuffer): ArrayBuffer {
  const numCh = buffer.numberOfChannels;
  const numSamples = buffer.length;
  const bitsPerSample = 16;
  const byteRate = buffer.sampleRate * numCh * (bitsPerSample / 8);
  const blockAlign = numCh * (bitsPerSample / 8);
  const dataSize = numSamples * numCh * (bitsPerSample / 8);
  const ab = new ArrayBuffer(44 + dataSize);
  const view = new DataView(ab);

  const writeStr = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
  };

  writeStr(0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeStr(8, 'WAVE');
  writeStr(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numCh, true);
  view.setUint32(24, buffer.sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);
  writeStr(36, 'data');
  view.setUint32(40, dataSize, true);

  let offset = 44;
  for (let i = 0; i < numSamples; i++) {
    for (let ch = 0; ch < numCh; ch++) {
      const sample = Math.max(-1, Math.min(1, buffer.getChannelData(ch)[i]));
      view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
      offset += 2;
    }
  }
  return ab;
}
