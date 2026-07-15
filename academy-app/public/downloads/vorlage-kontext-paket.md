# Vorlage: Kontext-Paket (Markdown)

Die Vorlage aus der Lektion „Eigene Assistenten". Das Kontext-Paket ist das eine Dokument, das du in ein Custom GPT oder Claude Project lädst, damit dein Assistent dein Business kennt – statt dass du jeden Kontext in jedem Chat neu erklärst. Ziel: unter 500 Wörter, konkret statt vollständig.

## Die Vorlage (Platzhalter ersetzen, Rest löschen)

```markdown
# Kontext: [FIRMENNAME]

## Über uns
[2–4 SÄTZE: Was macht ihr, für wen, seit wann, wo? Teamgrösse.
Nur Fakten, die der Assistent für Texte und Antworten wirklich braucht.]

## Angebot & Preise
- [LEISTUNG 1]: [KURZBESCHREIBUNG, PREIS ODER PREISSPANNE in CHF]
- [LEISTUNG 2]: [...]
- [LEISTUNG 3]: [...]
- Was wir NICHT anbieten: [WICHTIG – verhindert, dass der Assistent
  Leistungen erfindet]

## Zielgruppe
[WER SIND EURE KUNDEN? 2–3 SÄTZE: Branche, Grösse, Region, typische
Situation, was ihnen wichtig ist. Gern als konkrete Person beschrieben.]

## Tonalität
[3 ADJEKTIVE, z. B. "sachlich, direkt, ohne Superlative"] – und so
klingt das konkret:
1. "[ECHTER BEISPIELSATZ AUS EINEM EURER TEXTE]"
2. "[ZWEITER BEISPIELSATZ, ANDERE TEXTSORTE – z. B. Mail statt Website]"
3. "[DRITTER BEISPIELSATZ]"

## Do's & Don'ts
Do:
- [z. B. "Sie-Form gegenüber Kunden, Du intern"]
- [z. B. "Preise immer als 'ab CHF X' formulieren"]
Don't:
- [z. B. "Nie Superlative ('der beste', 'einzigartig')"]
- [z. B. "Keine Zusagen zu Terminen oder Verfügbarkeit"]
- [z. B. "Konkurrenz nie namentlich erwähnen"]

## FAQ (die 5 häufigsten Kundenfragen + eure Standard-Antwort)
1. [FRAGE] → [ANTWORT IN 1–2 SÄTZEN]
2. [FRAGE] → [ANTWORT]
3. [FRAGE] → [ANTWORT]
4. [FRAGE] → [ANTWORT]
5. [FRAGE] → [ANTWORT]

## Aktuelle Schwerpunkte (Stand: [MONAT/JAHR])
- [WAS GERADE WICHTIG IST: Aktion, neues Angebot, Kapazität, Fokus-Thema]
- [ZWEITER PUNKT]
```

**Merksatz:** Der Abschnitt „Aktuelle Schwerpunkte" ist der Grund, warum oben ein Datum steht – ihn aktualisierst du alle 1–2 Monate, der Rest bleibt stabil.

## Kurz-Beispiel: Hausblick AG (fiktive Immobilienverwaltung, Zürich)

So sieht ein ausgefülltes Paket aus – gekürzt auf die Kernabschnitte:

```markdown
# Kontext: Hausblick AG

## Über uns
Die Hausblick AG verwaltet seit 2011 rund 90 Mehrfamilienhäuser im Raum
Zürich und Winterthur. 12 Mitarbeitende, drei Bewirtschafterinnen als
feste Ansprechpersonen pro Liegenschaft.

## Angebot & Preise
- Liegenschaftsverwaltung: ab 4.5 % der Netto-Mietzinseinnahmen
- Erstvermietung: 1 Monatsmiete pauschal
- Stockwerkeigentum-Verwaltung: ab CHF 350 pro Einheit/Jahr
- Was wir NICHT anbieten: Makler-Dienstleistungen beim Verkauf

## Tonalität
Sachlich, zugewandt, lösungsorientiert – so klingt das:
1. "Wir haben Ihre Meldung erhalten und den Sanitär bereits aufgeboten –
   er meldet sich heute bei Ihnen für einen Termin."
2. "Die Nebenkostenabrechnung 2025 liegt bei. Zwei Positionen sind höher
   als im Vorjahr, wir erklären sie Ihnen auf Seite 2."

## Do's & Don'ts
Do: Sie-Form. Bei Mieteranliegen immer den nächsten Schritt + Zeitrahmen
nennen.
Don't: Keine rechtsverbindlichen Auskünfte zu Kündigungen oder
Mietzinserhöhungen – immer an die zuständige Bewirtschafterin verweisen.

## Aktuelle Schwerpunkte (Stand: Juli 2026)
- Heizungsersatz-Projekte in 6 Liegenschaften: Mieterkommunikation läuft
- Neu: Online-Schadenmeldung über das Mieterportal bewerben
```

Damit beantwortet der Assistent eine Mieter-Mail im richtigen Ton, erfindet keine Makler-Leistung und verweist bei Kündigungsfragen korrekt an den Menschen.

## Einrichten & pflegen

- [ ] Paket schreiben (oder von der KI erfragen lassen – Prompt „Kontext-Paket für dein Business" aus der Prompt-Bibliothek)
- [ ] Als `kontext-firma.md` speichern – Markdown können ChatGPT und Claude sauber lesen
- [ ] In Custom GPT (Wissen/Knowledge) oder Claude Project (Projektwissen) hochladen
- [ ] Testfrage stellen, die NUR mit dem Paket beantwortbar ist (z. B. eine FAQ) – kommt eure Antwort?
- [ ] Erinnerung alle 2 Monate: „Aktuelle Schwerpunkte" und Preise prüfen

---
*AI Academy — academy.madkourmedia.com*
