'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { BrainCircuit, CheckCircle, AlertCircle, Lightbulb, Music } from 'lucide-react';
import { Button } from '@/components/studio/ui/button';
import { Badge } from '@/components/studio/ui/badge';
import { getProject, updateProject } from '@/lib/studio/db/projects';
import type { Project, AIFeedback } from '@/types/studio';

function ScoreRing({ score }: { score: number }) {
  const color = score >= 75 ? 'text-emerald-400' : score >= 50 ? 'text-amber-400' : 'text-red-400';
  return (
    <div className={`flex flex-col items-center ${color}`}>
      <span className="text-4xl font-bold">{score}</span>
      <span className="text-xs text-muted-foreground">/100</span>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-3">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      {children}
    </div>
  );
}

export default function FeedbackPage() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transcribing, setTranscribing] = useState(false);

  useEffect(() => { getProject(id).then(setProject); }, [id]);

  const feedback: AIFeedback | null = project?.ai_feedback ?? null;

  async function transcribeVocal() {
    if (!project?.vocal?.file_url) return;
    setTranscribing(true);
    try {
      const res = await fetch('/api/studio/transcribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectId: id, vocalUrl: project.vocal.file_url }),
      });
      const data = await res.json() as { transcription?: Project['transcription'] };
      if (data.transcription) {
        const updated = await updateProject(id, { transcription: data.transcription });
        setProject(updated);
      }
    } catch { /* Non-fatal */ }
    finally { setTranscribing(false); }
  }

  async function generateFeedback() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/studio/projects/${id}/analyze`, { method: 'POST' });
      if (!res.ok) throw new Error('Analysis failed');
      const data = await res.json() as { feedback?: AIFeedback };
      if (data.feedback) {
        const updated = await updateProject(id, { ai_feedback: data.feedback });
        setProject(updated);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate feedback');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-foreground">AI Feedback</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Get intelligent analysis of your recording quality, timing, and creative suggestions.
        </p>
      </div>

      {/* Transcribe + Analyze buttons */}
      <div className="flex flex-wrap gap-3">
        {project?.vocal?.file_url && (
          <Button variant="outline" size="sm" onClick={transcribeVocal} disabled={transcribing}>
            {transcribing ? 'Transcribing…' : '🎤 Transcribe Vocal'}
          </Button>
        )}
        <Button onClick={generateFeedback} disabled={loading}>
          <BrainCircuit className="h-4 w-4 mr-2" />
          {loading ? 'Analyzing…' : feedback ? 'Re-analyze' : 'Analyze My Demo'}
        </Button>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Transcription */}
      {project?.transcription?.full_text && (
        <Section title="Lyrics / Transcription">
          <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
            {project.transcription.full_text}
          </p>
          <p className="text-xs text-muted-foreground">Language: {project.transcription.language}</p>
        </Section>
      )}

      {feedback && (
        <>
          {/* Scores */}
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-xl border border-border bg-card p-4 text-center">
              <p className="text-xs text-muted-foreground mb-2">Recording</p>
              <ScoreRing score={feedback.recording_quality.score} />
            </div>
            <div className="rounded-xl border border-border bg-card p-4 text-center">
              <p className="text-xs text-muted-foreground mb-2">Timing</p>
              <ScoreRing score={feedback.timing.on_beat_score} />
            </div>
            <div className="rounded-xl border border-border bg-card p-4 text-center">
              <p className="text-xs text-muted-foreground mb-2">Genre Fit</p>
              <ScoreRing score={feedback.genre_fit.fit_score} />
            </div>
          </div>

          {/* Recording Quality */}
          <Section title="Recording Quality">
            {feedback.recording_quality.issues.length > 0 && (
              <div className="space-y-1">
                {feedback.recording_quality.issues.map((issue) => (
                  <div key={issue} className="flex items-center gap-2 text-sm text-amber-400">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    {issue.replace(/_/g, ' ')}
                  </div>
                ))}
              </div>
            )}
            {feedback.recording_quality.positives.length > 0 && (
              <div className="space-y-1">
                {feedback.recording_quality.positives.map((p) => (
                  <div key={p} className="flex items-center gap-2 text-sm text-emerald-400">
                    <CheckCircle className="h-3.5 w-3.5 shrink-0" />
                    {p.replace(/_/g, ' ')}
                  </div>
                ))}
              </div>
            )}
          </Section>

          {/* Mix Suggestions */}
          <Section title="Mix Suggestions">
            <div className="flex flex-wrap gap-2">
              {feedback.mix_suggestions.vocal_too_loud && <Badge variant="warning">Vocal too loud</Badge>}
              {feedback.mix_suggestions.vocal_too_quiet && <Badge variant="warning">Vocal too quiet</Badge>}
              {feedback.mix_suggestions.beat_overpowers_vocal && <Badge variant="warning">Beat overpowers vocal</Badge>}
              {feedback.mix_suggestions.needs_compression && <Badge variant="secondary">Add compression</Badge>}
              {feedback.mix_suggestions.needs_eq && <Badge variant="secondary">Needs EQ</Badge>}
              {!Object.values(feedback.mix_suggestions).some(Boolean) && (
                <p className="text-sm text-muted-foreground">Mix looks balanced ✓</p>
              )}
            </div>
            {feedback.mix_suggestions.notes.length > 0 && (
              <ul className="space-y-1 mt-2">
                {feedback.mix_suggestions.notes.map((n, i) => (
                  <li key={i} className="text-sm text-muted-foreground">• {n}</li>
                ))}
              </ul>
            )}
          </Section>

          {/* Structure */}
          {feedback.structure.suggestions.length > 0 && (
            <Section title="Song Structure">
              <div className="flex flex-wrap gap-2 mb-3">
                {feedback.structure.detected_sections.map((s, i) => (
                  <Badge key={i} variant="outline" className="capitalize">{s.type}</Badge>
                ))}
              </div>
              <ul className="space-y-1">
                {feedback.structure.suggestions.map((s, i) => (
                  <li key={i} className="text-sm text-muted-foreground">• {s}</li>
                ))}
              </ul>
            </Section>
          )}

          {/* Creative Suggestions */}
          <Section title="Creative Suggestions">
            {feedback.creative_suggestions.general_notes.map((n, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-foreground">
                <Lightbulb className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                {n}
              </div>
            ))}
            {feedback.creative_suggestions.doubles_suggested.map((d, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Music className="h-4 w-4 shrink-0 mt-0.5" />
                Double on <strong className="text-foreground">{d.section}</strong>: {d.reason}
              </div>
            ))}
          </Section>

          {/* Timing */}
          {feedback.timing.notes.length > 0 && (
            <Section title="Timing">
              {feedback.timing.notes.map((n, i) => (
                <p key={i} className="text-sm text-muted-foreground">• {n}</p>
              ))}
            </Section>
          )}
        </>
      )}

      {!feedback && !loading && (
        <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card py-16 text-center">
          <BrainCircuit className="h-10 w-10 text-muted-foreground" />
          <div>
            <p className="font-medium text-foreground">No feedback yet</p>
            <p className="mt-1 text-sm text-muted-foreground">Click &quot;Analyze My Demo&quot; to get AI feedback.</p>
          </div>
        </div>
      )}
    </div>
  );
}
