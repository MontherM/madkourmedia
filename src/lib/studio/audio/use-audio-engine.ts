'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { AudioEngine, type PlaybackEffects } from './engine';
import type { Project } from '@/types/studio';

function toEffects(project: Project): PlaybackEffects {
  const { mix, effects } = project;
  return {
    beatVolume: mix.beat_volume,
    vocalVolume: mix.vocal_volume,
    beatPan: mix.beat_pan,
    vocalPan: mix.vocal_pan,
    eq: effects.eq?.enabled
      ? { low: effects.eq.low_gain, mid: effects.eq.mid_gain, high: effects.eq.high_gain }
      : null,
    compressor: effects.compressor?.enabled
      ? {
          threshold: effects.compressor.threshold,
          ratio: effects.compressor.ratio,
          attack: effects.compressor.attack,
          release: effects.compressor.release,
          makeup: effects.compressor.makeup_gain,
        }
      : null,
    reverb: effects.reverb?.enabled
      ? { decay: effects.reverb.decay, wet: effects.reverb.wet_level }
      : null,
  };
}

export function useAudioEngine(project: Project | null) {
  const engineRef = useRef<AudioEngine | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [beatLoaded, setBeatLoaded] = useState(false);
  const [vocalLoaded, setVocalLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    engineRef.current = new AudioEngine();
    return () => {
      engineRef.current?.dispose();
    };
  }, []);

  const loadAudio = useCallback(async (proj: Project) => {
    const engine = engineRef.current;
    if (!engine) return;
    setLoading(true);
    try {
      if (proj.beat?.file_url) {
        await engine.loadBeat(proj.beat.file_url);
        setBeatLoaded(true);
      }
      if (proj.vocal?.file_url) {
        await engine.loadVocal(proj.vocal.file_url);
        setVocalLoaded(true);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const play = useCallback(() => {
    if (!project || !engineRef.current) return;
    engineRef.current.play(project.vocal?.offset_ms ?? 0, toEffects(project), () => {
      setIsPlaying(false);
    });
    setIsPlaying(true);
  }, [project]);

  const pause = useCallback(() => {
    engineRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const stop = useCallback(() => {
    engineRef.current?.stop();
    setIsPlaying(false);
  }, []);

  const renderToWav = useCallback(
    (durationSec?: number) => {
      if (!project || !engineRef.current) throw new Error('No project');
      return engineRef.current.renderToWav(
        project.vocal?.offset_ms ?? 0,
        toEffects(project),
        durationSec
      );
    },
    [project]
  );

  return { isPlaying, beatLoaded, vocalLoaded, loading, loadAudio, play, pause, stop, renderToWav };
}
