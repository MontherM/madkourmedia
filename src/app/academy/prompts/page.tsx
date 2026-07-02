import Reveal from "@/components/academy/ui/Reveal"
import PromptLibrary from "@/components/academy/PromptLibrary"
import { getPrompts } from "@/lib/academy/data"

export const metadata = {
  title: "Prompt-Bibliothek — AI Academy",
  description: "Geprüfte, kopierfertige Prompts für Büro, Business, Lernen und Content – mit Filter und Suche.",
}

export default function PromptsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <Reveal>
        <span className="ac-eyebrow">Prompt-Bibliothek</span>
        <h1 className="ac-h2 mt-3">Kopierfertige Prompts für jede Aufgabe.</h1>
        <p className="mt-4 max-w-2xl text-lg" style={{ color: "var(--ac-ink-2)" }}>
          Geprüft, kategorisiert und mit Platzhaltern, die du nur noch ausfüllst. Filtern, suchen,
          kopieren – fertig.
        </p>
      </Reveal>
      <PromptLibrary prompts={getPrompts()} />
    </div>
  )
}
