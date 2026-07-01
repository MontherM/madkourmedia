let sharedContext: AudioContext | null = null;

export function getAudioContext(): AudioContext {
  if (!sharedContext || sharedContext.state === 'closed') {
    sharedContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  return sharedContext;
}

export async function ensureAudioContext(): Promise<AudioContext> {
  const ctx = getAudioContext();
  if (ctx.state === 'suspended') await ctx.resume();
  return ctx;
}

export async function loadAudioBuffer(url: string): Promise<AudioBuffer> {
  const ctx = await ensureAudioContext();
  const res = await fetch(url);
  const arrayBuffer = await res.arrayBuffer();
  return ctx.decodeAudioData(arrayBuffer);
}

export function generateWaveformPeaks(buffer: AudioBuffer, numPeaks = 200): number[] {
  const data = buffer.getChannelData(0);
  const blockSize = Math.floor(data.length / numPeaks);
  const peaks: number[] = [];
  for (let i = 0; i < numPeaks; i++) {
    let max = 0;
    for (let j = 0; j < blockSize; j++) {
      const v = Math.abs(data[i * blockSize + j]);
      if (v > max) max = v;
    }
    peaks.push(max);
  }
  return peaks;
}
