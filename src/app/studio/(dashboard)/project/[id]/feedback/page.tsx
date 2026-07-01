'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  BrainCircuit,
  Loader2,
  Star,
  Clock,
  Music2,
  Sliders,
  Lightbulb,
  Gauge,
  RefreshCw,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/studio/ui/button';
import { getProject, updateProject } from '@/lib/studio/db/projects';
import type { Project, AIFeedback, Section } from '@/types/studio';

function ScoreRing({ score, color = 'text-primary' }: { score: number; color?: string }) {
  const radius = 28;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (score / 100) * circ;
  return (
    <div className="relative flex h-20 w-20 items-center justify-center">
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r={radius} fill="none" stroke="currentColor" strokeWidth="4" className="text-border" />
        <circle
          cx="32" cy="32" r={radius} fill="none"
          stroke="currentColor" strokeWidth="4"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={color}
        />
      </svg>
      <span className={`text-lg font-bold ${color}`}>{score}</span>
    </div>
  );
}

function SectionBadge({ type }: { type: Section['type'] }) {
  const colors: Record<Section['type'], string> = {
    intro: 'bg-blue-500/20 text-blue-300',
    verse: 'bg-purple-500/20 text-purple-300',
    pre_hook: 'bg-amber-500/20 text-amber-300',
    hook: 'bg-primary/20 text-primary',
    bridge: 'bg-pink-500/20 text-pink-300',
    outro: 'bg-slate-500/20 text-slate-300',
  };
  return (
    <span className={`inline-block rounded-md px-2 py-0.5 text-xs font-medium capitalize ${colors[type] ?? ''}`}>
      {type.replace('_', ' ')}
    </span>
  );
}

function fmtTime(sec: number) {
  return `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, '0')}`;
}

export default function FeedbackPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [feedback, setFeedback] = useState<AIFeedback | null>(null);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProject(id).then((p) => {
      if (!p) return;
      setProject(p);
      if (p.ai_feedback) setFeedback(p.ai_feedback);
    });
  }, [id]);

  async function generate() {
    if (!project) return;
    setGenerating(true);
    setError(null);
    try {
      const res = await fetch('/api/studio/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `HTTP ${res.status}`);
      }
      const fb: AIFeedback = await res.json();
      setFeedback(fb);
      const updated = await updateProject(id, { ai_feedback: fb, status: 'ready' });
      setProject(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate feedback');
    } finally {
      setGenerating(false);
    }
  }

  const hasVocal = !!project?.vocal?.file_url;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">AI Feedback</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Intelligent analysis of your recording, timing, mix, and creative direction.
          </p>
        </div>
        <Button onClick={generate} disabled={generating || !hasVocal}>
          {generating ? (
            <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Analyzing…</>
          ) : feedback ? (
            <><RefreshCw className="h-4 w-4 mr-2" />Regenerate</>
          ) : (
            <><BrainCircuit className="h-4 w-4 mr-2" />Generate Feedback</>
          )}
        </Button>
      </div>

      {!hasVocal && (
        <div className="rounded-xl border border-border bg-card p-6 text-center space-y-3">
          <Music2 className="h-10 w-10 text-muted-foreground mx-auto" />
          <p className="text-sm text-muted-foreground">
            Record or upload a vocal first to get AI feedback.
          </p>
          <Button variant="outline" size="sm" onClick={() => router.push(`/studio/project/${id}/record`)}>
            Go to Record <ChevronRight className="h-3.5 w-3.5 ml-1" />
          </Button>
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {generating && (
        <div className="flex flex-col items-center gap-4 py-16">
          <BrainCircuit className="h-12 w-12 text-primary animate-pulse" />
          <p className="text-sm text-muted-foreground">GPT-4o-mini is analyzing your demo…</p>
        </div>
      )}

      {feedback && !generating && (
        <div className="space-y-6">
          {/* Scores overview */}
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-xl border border-border bg-card p-4 flex flex-col items-center gap-2 text-center">
              <ScoreRing score={feedback.recording_quality.score} color="text-primary" />
              <p className="text-xs font-medium text-muted-foreground">Quality</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 flex flex-col items-center gap-2 text-center">
              <ScoreRing score={feedback.timing.on_beat_score} color="text-blue-400" />
              <p className="text-xs font-medium text-muted-foreground">Timing</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-4 flex flex-col items-center gap-2 text-center">
              <ScoreRing score={feedback.genre_fit.fit_score} color="text-amber-400" />
              <p className="text-xs font-medium text-muted-foreground">Genre Fit</p>
            </div>
          </div>

          {/* Recording Quality */}
          <div className="rounded-xl border border-border bg-card p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-primary" />
              <h3 className="font-medium text-foreground">Recording Quality</h3>
            </div>
            {feedback.recording_quality.positives.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Strengths</p>
                <ul className="space-y-1">
                  {feedback.recording_quality.positives.map((p, i) => (
                    <li key={i} className="text-sm text-foreground flex gap-2">
                      <span className="text-primary shrink-0">✓</span>{p}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {feedback.recording_quality.issues.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Issues</p>
                <ul className="space-y-1">
                  {feedback.recording_quality.issues.map((issue, i) => (
                    <li key={i} className="text-sm text-foreground flex gap-2">
                      <span className="text-amber-400 shrink-0">!</span>{issue}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Timing */}
          <div className="rounded-xl border border-border bg-card p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-400" />
              <h3 className="font-medium text-foreground">Timing</h3>
            </div>
            <ul className="space-y-1">
              {feedback.timing.notes.map((n, i) => (
                <li key={i} className="text-sm text-muted-foreground">{n}</li>
              ))}
            </ul>
          </div>

          {/* Structure */}
          {feedback.structure.detected_sections.length > 0 && (
            <div className="rounded-xl border border-border bg-card p-5 space-y-4">
              <div className="flex items-center gap-2">
                <Music2 className="h-4 w-4 text-muted-foreground" />
                <h3 className="font-medium text-foreground">Song Structure</h3>
              </div>
              <div className="space-y-2">
                {feedback.structure.detected_sections.map((sec, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <SectionBadge type={sec.type} />
                    <span className="text-xs text-muted-foreground font-mono">
                      {fmtTime(sec.start_time)} – {fmtTime(sec.end_time)}
                    </span>
                    <div className="flex-1 h-1.5 rounded-full bg-border overflow-hidden">
                      <div
                        className="h-full bg-primary/60 rounded-full"
                        style={{ width: `${Math.round(sec.confidence * 100)}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{Math.round(sec.confidence * 100)}%</span>
                  </div>
                ))}
              </div>
              {feedback.structure.suggestions.length > 0 && (
                <ul className="space-y-1 pt-2 border-t border-border">
                  {feedback.structure.suggestions.map((s, i) => (
                    <li key={i} className="text-sm text-muted-foreground">{s}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Mix suggestions */}
          <div className="rounded-xl border border-border bg-card p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Sliders className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium text-foreground">Mix Suggestions</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {feedback.mix_suggestions.needs_compression && (
                <span className="rounded-md bg-amber-500/20 text-amber-300 px-2 py-0.5 text-xs">Add Compression</span>
              )}
              {feedback.mix_suggestions.needs_eq && (
                <span className="rounded-md bg-amber-500/20 text-amber-300 px-2 py-0.5 text-xs">EQ Needed</span>
              )}
              {feedback.mix_suggestions.vocal_too_loud && (
                <span className="rounded-md bg-red-500/20 text-red-300 px-2 py-0.5 text-xs">Vocal Too Loud</span>
              )}
              {feedback.mix_suggestions.vocal_too_quiet && (
                <span className="rounded-md bg-red-500/20 text-red-300 px-2 py-0.5 text-xs">Vocal Too Quiet</span>
              )}
              {feedback.mix_suggestions.beat_overpowers_vocal && (
                <span className="rounded-md bg-red-500/20 text-red-300 px-2 py-0.5 text-xs">Beat Overpowers Vocal</span>
              )}
            </div>
            <ul className="space-y-1">
              {feedback.mix_suggestions.notes.map((n, i) => (
                <li key={i} className="text-sm text-muted-foreground">{n}</li>
              ))}
            </ul>
          </div>

          {/* Creative */}
          <div className="rounded-xl border border-border bg-card p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-amber-400" />
              <h3 className="font-medium text-foreground">Creative Suggestions</h3>
            </div>
            {feedback.creative_suggestions.doubles_suggested.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Double Tracks</p>
                {feedback.creative_suggestions.doubles_suggested.map((d, i) => (
                  <p key={i} className="text-sm text-foreground"><span className="text-muted-foreground capitalize">{d.section}:</span> {d.reason}</p>
                ))}
              </div>
            )}
            {feedback.creative_suggestions.adlibs_suggested.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Ad-libs</p>
                {feedback.creative_suggestions.adlibs_suggested.map((a, i) => (
                  <p key={i} className="text-sm text-foreground"><span className="text-muted-foreground capitalize">{a.section}:</span> {a.reason}</p>
                ))}
              </div>
            )}
            {feedback.creative_suggestions.harmonies_suggested.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Harmonies</p>
                {feedback.creative_suggestions.harmonies_suggested.map((h, i) => (
                  <p key={i} className="text-sm text-foreground"><span className="text-muted-foreground capitalize">{h.section}:</span> {h.reason}</p>
                ))}
              </div>
            )}
            {feedback.creative_suggestions.general_notes.length > 0 && (
              <ul className="space-y-1 pt-2 border-t border-border">
                {feedback.creative_suggestions.general_notes.map((n, i) => (
                  <li key={i} className="text-sm text-muted-foreground">{n}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Genre fit */}
          <div className="rounded-xl border border-border bg-card p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Gauge className="h-4 w-4 text-amber-400" />
              <h3 className="font-medium text-foreground">Genre Fit — <span className="capitalize">{feedback.genre_fit.genre}</span></h3>
            </div>
            <ul className="space-y-1">
              {feedback.genre_fit.notes.map((n, i) => (
                <li key={i} className="text-sm text-muted-foreground">{n}</li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => router.push(`/studio/project/${id}/mix`)}>
              ← Adjust Mix
            </Button>
            <Button onClick={() => router.push(`/studio/project/${id}/export`)}>
              Next: Export →
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
