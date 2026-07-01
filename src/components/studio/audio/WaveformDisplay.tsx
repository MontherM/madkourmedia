'use client';

import { useEffect, useRef } from 'react';

interface WaveformDisplayProps {
  peaks: number[];
  color?: string;
  height?: number;
  progress?: number; // 0-1
}

export function WaveformDisplay({ peaks, color = '#6DBB7D', height = 60, progress = 0 }: WaveformDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || peaks.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const w = canvas.offsetWidth;
    const h = height;
    const barW = Math.max(1, w / peaks.length - 0.5);
    const mid = h / 2;

    ctx.clearRect(0, 0, w, h);

    peaks.forEach((peak, i) => {
      const x = (i / peaks.length) * w;
      const barH = peak * h * 0.9;
      const isPast = x / w < progress;
      ctx.fillStyle = isPast ? color : `${color}55`;
      ctx.fillRect(x, mid - barH / 2, barW, barH);
    });
  }, [peaks, color, height, progress]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height }}
      className="rounded"
    />
  );
}
