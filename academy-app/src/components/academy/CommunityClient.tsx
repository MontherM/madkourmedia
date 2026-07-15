"use client"

// Community forum. Seed threads come from the data layer; likes and replies
// written here live in session state until the Supabase backend lands.

import { useMemo, useState } from "react"
import Link from "next/link"
import Reveal from "@/components/academy/ui/Reveal"
import { Message, Heart, Users, Pin, Check, Flame } from "@/components/academy/ui/Icons"
import { forumCategories, getForumThreads } from "@/lib/academy/data"
import { useAcademy } from "@/lib/academy/store"
import type { ForumReply, ForumThread } from "@/lib/academy/types"

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("de-CH", { day: "numeric", month: "short" })

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")

const leaderboard = [
  { name: "Julia R.", xp: 4310 },
  { name: "Tobias F.", xp: 3980 },
  { name: "Marco B.", xp: 3540 },
  { name: "Sandra K.", xp: 2870 },
  { name: "Deniz A.", xp: 2410 },
]

function Avatar({ name, role }: { name: string; role?: "team" | "member" }) {
  return (
    <span
      className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full text-xs font-bold"
      style={
        role === "team"
          ? { background: "linear-gradient(135deg, var(--ac-primary-2), var(--ac-primary))", color: "#fff" }
          : { background: "var(--ac-surface-2)", color: "var(--ac-ink-2)", border: "1px solid var(--ac-border)" }
      }
      aria-hidden
    >
      {initials(name)}
    </span>
  )
}

function Reply({ reply, liked, onLike }: { reply: ForumReply; liked: boolean; onLike: () => void }) {
  return (
    <div className="flex gap-3 py-4" style={{ borderTop: "1px solid var(--ac-border)" }}>
      <Avatar name={reply.author} role={reply.authorRole} />
      <div className="min-w-0 flex-1">
        <p className="flex flex-wrap items-center gap-2 text-sm">
          <span className="font-medium">{reply.author}</span>
          {reply.authorRole === "team" && (
            <span className="ac-pill !py-0 !px-2 !text-[10px]" style={{ color: "var(--ac-primary)" }}>Team</span>
          )}
          <span className="text-xs" style={{ color: "var(--ac-ink-3)" }}>{fmtDate(reply.createdAt)}</span>
        </p>
        <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "var(--ac-ink-2)" }}>{reply.body}</p>
        <button
          onClick={onLike}
          className="mt-2 inline-flex items-center gap-1.5 text-xs transition-colors"
          style={{ color: liked ? "var(--ac-primary)" : "var(--ac-ink-3)" }}
        >
          <Heart width={13} height={13} /> {reply.likes + (liked ? 1 : 0)}
        </button>
      </div>
    </div>
  )
}

function Thread({ thread, userName }: { thread: ForumThread; userName: string }) {
  const [open, setOpen] = useState(false)
  const [liked, setLiked] = useState(false)
  const [likedReplies, setLikedReplies] = useState<string[]>([])
  const [draft, setDraft] = useState("")
  const [ownReplies, setOwnReplies] = useState<ForumReply[]>([])

  const replies = [...thread.replies, ...ownReplies]

  const submit = () => {
    const body = draft.trim()
    if (!body) return
    setOwnReplies((r) => [
      ...r,
      {
        id: `own-${Date.now()}`,
        author: userName || "Du",
        body,
        createdAt: new Date().toISOString(),
        likes: 0,
      },
    ])
    setDraft("")
  }

  return (
    <div className="ac-card overflow-hidden">
      <button onClick={() => setOpen((o) => !o)} className="w-full p-5 text-left sm:p-6" aria-expanded={open}>
        <div className="flex items-start gap-3.5">
          <Avatar name={thread.author} role={thread.authorRole} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              {thread.pinned && (
                <span className="inline-flex items-center gap-1 text-[11px]" style={{ color: "var(--ac-primary)" }}>
                  <Pin width={12} height={12} /> Angepinnt
                </span>
              )}
              {thread.solved && (
                <span className="inline-flex items-center gap-1 text-[11px]" style={{ color: "#22c55e" }}>
                  <Check width={12} height={12} /> Gelöst
                </span>
              )}
              <span className="ac-pill !py-0 !px-2 !text-[10px]">{thread.category}</span>
            </div>
            <h3 className="mt-1.5 font-semibold leading-snug">{thread.title}</h3>
            <p
              className="mt-1 text-sm leading-relaxed"
              style={{
                color: "var(--ac-ink-3)",
                display: open ? undefined : "-webkit-box",
                WebkitLineClamp: open ? undefined : 2,
                WebkitBoxOrient: "vertical",
                overflow: open ? undefined : "hidden",
              }}
            >
              {thread.body}
            </p>
            <div className="mt-3 flex items-center gap-4 text-xs" style={{ color: "var(--ac-ink-3)" }}>
              <span>{thread.author} · {fmtDate(thread.createdAt)}</span>
              <span className="inline-flex items-center gap-1"><Message width={13} height={13} /> {replies.length}</span>
              <span className="inline-flex items-center gap-1"><Heart width={13} height={13} /> {thread.likes + (liked ? 1 : 0)}</span>
            </div>
          </div>
        </div>
      </button>

      {open && (
        <div className="px-5 pb-5 sm:px-6 sm:pb-6">
          <div className="flex items-center gap-3 pb-1">
            <button
              onClick={() => setLiked((l) => !l)}
              className="inline-flex items-center gap-1.5 text-xs"
              style={{ color: liked ? "var(--ac-primary)" : "var(--ac-ink-3)" }}
            >
              <Heart width={14} height={14} /> {liked ? "Gefällt dir" : "Gefällt mir"}
            </button>
          </div>

          {replies.map((r) => (
            <Reply
              key={r.id}
              reply={r}
              liked={likedReplies.includes(r.id)}
              onLike={() =>
                setLikedReplies((ids) =>
                  ids.includes(r.id) ? ids.filter((i) => i !== r.id) : [...ids, r.id],
                )
              }
            />
          ))}

          <div className="mt-2 flex gap-3 pt-4" style={{ borderTop: "1px solid var(--ac-border)" }}>
            <Avatar name={userName || "Du"} />
            <div className="flex-1">
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Antworte hilfreich und konkret…"
                className="ac-input min-h-[80px] resize-y text-sm"
                aria-label="Antwort schreiben"
              />
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[11px]" style={{ color: "var(--ac-ink-3)" }}>
                  Beta: Antworten werden noch nicht dauerhaft gespeichert.
                </span>
                <button onClick={submit} disabled={!draft.trim()} className="ac-btn ac-btn-primary !py-2 !px-4 !text-[13px] disabled:opacity-40">
                  Antworten
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function CommunityClient() {
  const { user } = useAcademy()
  const [category, setCategory] = useState<string>("Alle")
  const threads = useMemo(() => {
    const all = getForumThreads()
    return category === "Alle" ? all : all.filter((t) => t.category === category)
  }, [category])

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <Reveal>
        <span className="ac-eyebrow">Community</span>
        <h1 className="ac-h2 mt-3">Lerne nie wieder allein.</h1>
        <p className="mt-4 max-w-2xl text-lg" style={{ color: "var(--ac-ink-2)" }}>
          Stelle Fragen, teile Workflows und lerne von Menschen, die dieselben Probleme schon
          gelöst haben – vom ersten Prompt bis zum eigenen Agenten.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.7fr_1fr]">
        <div>
          <Reveal>
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Kategorien">
              {forumCategories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className="ac-pill transition-colors"
                  style={
                    category === c
                      ? { background: "var(--ac-primary)", color: "#fff", borderColor: "var(--ac-primary)" }
                      : undefined
                  }
                  role="tab"
                  aria-selected={category === c}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="mt-6 space-y-4">
            {threads.map((t, i) => (
              <Reveal key={t.id} delay={i * 0.04}>
                <Thread thread={t} userName={user.name} />
              </Reveal>
            ))}
            {threads.length === 0 && (
              <p className="py-12 text-center text-sm" style={{ color: "var(--ac-ink-3)" }}>
                In dieser Kategorie gibt es noch keine Beiträge.
              </p>
            )}
          </div>
        </div>

        <div className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <Reveal>
            <div className="ac-card p-6">
              <h3 className="ac-h3 flex items-center gap-2">
                <Flame width={16} height={16} style={{ color: "var(--ac-primary)" }} /> Top-Lernende
              </h3>
              <ol className="mt-4 space-y-2.5">
                {leaderboard.map((entry, i) => (
                  <li key={entry.name} className="flex items-center gap-3 text-sm">
                    <span className="w-5 text-center font-bold" style={{ color: i < 3 ? "var(--ac-primary)" : "var(--ac-ink-3)" }}>
                      {i + 1}
                    </span>
                    <Avatar name={entry.name} />
                    <span className="min-w-0 flex-1 truncate">{entry.name}</span>
                    <span className="text-xs" style={{ color: "var(--ac-ink-3)" }}>
                      {entry.xp.toLocaleString("de-CH")} XP
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-4 text-xs" style={{ color: "var(--ac-ink-3)" }}>
                Dein Stand: {user.xp.toLocaleString("de-CH")} XP – jede Lektion bringt dich nach oben.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="ac-card p-6">
              <h3 className="ac-h3 flex items-center gap-2">
                <Users width={16} height={16} style={{ color: "var(--ac-primary)" }} /> Spielregeln
              </h3>
              <ul className="mt-3 space-y-2 text-sm" style={{ color: "var(--ac-ink-2)" }}>
                <li>· Respektvoll bleiben, niemand weiß alles.</li>
                <li>· Kontext geben: Tool, Ziel, was du probiert hast.</li>
                <li>· Lösungen markieren, damit andere sie finden.</li>
                <li>· Keine sensiblen Daten in Beispiele kopieren.</li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="ac-card p-6 text-center">
              <p className="text-sm" style={{ color: "var(--ac-ink-2)" }}>
                Live Q&A-Calls und der private Discord sind Teil von <strong>Pro</strong>.
              </p>
              <Link href="/pricing" className="ac-btn ac-btn-primary mt-4 w-full">
                Pro entdecken
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
