import { ensureAudioContext } from './player';
import type { Project } from '@/types/studio';

export interface ExportOptions {
  format: 'wav' | 'mp3';
  includeBeat: boolean;
  includeVocal: boolean;
}

export type ExportProgressCallback = (stage: string, pct: number) => void;

async function fetchAndDecode(url: string, ctx: OfflineAudioContext | AudioContext): Promise<AudioBuffer> {
  const res = await fetch(url);
  const ab = await res.arrayBuffer();
  return ctx.decodeAudioData(ab);
}

export async function renderMix(
  project: Project,
  options: ExportOptions,
  onProgress: ExportProgressCallback
): Promise<Blob> {
  onProgress('Loading audio…', 10);

  const sampleRate = 44100;
  const beatDuration = project.beat?.duration ?? 0;
  const vocalOffset = (project.vocal?.offset_ms ?? 0) / 1000;
  const totalDuration = Math.max(beatDuration, vocalOffset + (project.vocal?.duration ?? 0)) + 0.5;

  const offline = new OfflineAudioContext(2, Math.ceil(totalDuration * sampleRate), sampleRate);

  // Beat
  if (options.includeBeat && project.beat?.file_url) {
    onProgress('Loading beat…', 20);
    const buf = await fetchAndDecode(project.beat.file_url, offline);
    const src = offline.createBufferSource();
    src.buffer = buf;
    const gain = offline.createGain();
    gain.gain.value = project.mix?.beat_volume ?? 0.8;
    const pan = offline.createStereoPanner();
    pan.pan.value = project.mix?.beat_pan ?? 0;
    src.connect(gain).connect(pan).connect(offline.destination);
    src.start(0);
  }

  // Vocal
  if (options.includeVocal && project.vocal?.file_url) {
    onProgress('Loading vocal…', 40);
    const buf = await fetchAndDecode(project.vocal.file_url, offline);
    const src = offline.createBufferSource();
    src.buffer = buf;
    const gain = offline.createGain();
    gain.gain.value = project.vocal ? (project.mix?.vocal_volume ?? 0.9) : 0;
    const pan = offline.createStereoPanner();
    pan.pan.value = project.mix?.vocal_pan ?? 0;
    src.connect(gain).connect(pan).connect(offline.destination);
    src.start(vocalOffset);
  }

  onProgress('Rendering…', 60);
  const rendered = await offline.startRendering();

  onProgress('Encoding WAV…', 80);
  const wav = audioBufferToWav(rendered);

  onProgress('Done', 100);
  return new Blob([wav], { type: 'audio/wav' });
}

function audioBufferToWav(buffer: AudioBuffer): ArrayBuffer {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const format = 1; // PCM
  const bitDepth = 16;
  const samples = buffer.length;
  const blockAlign = (numChannels * bitDepth) / 8;
  const byteRate = sampleRate * blockAlign;
  const dataSize = samples * blockAlign;
  const ab = new ArrayBuffer(44 + dataSize);
  const view = new DataView(ab);

  function writeStr(o: number, s: string) { for (let i = 0; i < s.length; i++) view.setUint8(o + i, s.charCodeAt(i)); }
  writeStr(0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeStr(8, 'WAVE');
  writeStr(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, format, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitDepth, true);
  writeStr(36, 'data');
  view.setUint32(40, dataSize, true);

  let offset = 44;
  for (let i = 0; i < samples; i++) {
    for (let ch = 0; ch < numChannels; ch++) {
      const s = Math.max(-1, Math.min(1, buffer.getChannelData(ch)[i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
      offset += 2;
    }
  }
  return ab;
}
