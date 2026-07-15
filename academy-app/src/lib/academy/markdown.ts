"use client"

// Markdown export for the prompt library — Obsidian/Notion-friendly files.

import type { Prompt } from "./types"

export function promptToMarkdown(p: Prompt): string {
  const lines = [
    `# ${p.title}`,
    "",
    `> Kategorie: ${p.category} · Tags: ${p.tags.join(", ")}` +
      (p.recommendedModel ? ` · Empfohlen: ${p.recommendedModel}` : ""),
    "",
    "```text",
    p.body,
    "```",
    "",
    "---",
    "*Aus der AI Academy Prompt-Bibliothek — academy.madkourmedia.com/prompts*",
    "",
  ]
  return lines.join("\n")
}

export function libraryToMarkdown(prompts: Prompt[]): string {
  const byCategory = new Map<string, Prompt[]>()
  for (const p of prompts) {
    byCategory.set(p.category, [...(byCategory.get(p.category) ?? []), p])
  }

  const parts = [
    "# AI Academy — Prompt-Bibliothek",
    "",
    `${prompts.length} kopierfertige Prompts, gruppiert nach Kategorie.`,
    "",
  ]
  for (const [category, items] of Array.from(byCategory.entries())) {
    parts.push(`## ${category}`, "")
    for (const p of items) {
      parts.push(
        `### ${p.title}`,
        "",
        `Tags: ${p.tags.join(", ")}` + (p.recommendedModel ? ` · Empfohlen: ${p.recommendedModel}` : ""),
        "",
        "```text",
        p.body,
        "```",
        "",
      )
    }
  }
  parts.push("---", "*academy.madkourmedia.com/prompts*", "")
  return parts.join("\n")
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[äöüß]/g, (c) => ({ ä: "ae", ö: "oe", ü: "ue", ß: "ss" })[c] ?? c)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")

export function downloadMarkdown(filenameBase: string, content: string) {
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `${slugify(filenameBase)}.md`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}
