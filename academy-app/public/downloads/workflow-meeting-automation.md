# Workflow: Meeting-Automation

Der Schritt-für-Schritt-Blueprint aus der Lektion „Meetings & Protokolle automatisieren": vom Meeting zum verteilten Protokoll in unter 5 Minuten. Einmal einrichten, bei jedem Meeting wiederverwenden.

## Überblick

```
Aufnahme → Transkript → KI-Protokoll → Verteilung → (optional) Automatisierung
```

## Schritt 1: Aufnahme & Transkript (~1 Min. Aufwand)

Du brauchst keinen speziellen Recorder – nimm, was schon da ist:

| Situation | Werkzeug | So kommst du ans Transkript |
|---|---|---|
| Teams-Meeting | Teams-Transkription | Im Meeting „Aufzeichnung starten" mit Transkription; danach unter „Zusammenfassung" das Transkript als .docx laden |
| Zoom-Meeting | Zoom Cloud-Aufzeichnung | Audio-Transkript in den Aufzeichnungseinstellungen aktivieren; .vtt-Datei aus dem Portal laden |
| Vor-Ort-Meeting | Handy + Whisper-basierte App (z. B. Aufnahme-App mit Transkription) oder Datei später in ChatGPT/Claude hochladen | Handy in die Tischmitte, danach Audiodatei transkribieren lassen |

**Wichtig (CH/DACH):** Vor der Aufnahme alle Teilnehmenden informieren und Einverständnis einholen – heimliches Aufnehmen ist in der Schweiz strafbar (Art. 179ter StGB), in DE/AT ähnlich. Ein Satz reicht: „Ich zeichne auf, damit die KI das Protokoll schreibt – okay für alle?"

## Schritt 2: Transkript → Protokoll mit KI (~2 Min.)

Transkript in Claude oder ChatGPT einfügen (bei langen Meetings ist Claude wegen des großen Kontextfensters die sichere Wahl), davor diesen Prompt:

```
Du bist mein Assistent für Meeting-Protokolle. Analysiere das folgende Transkript
und erstelle ein Protokoll mit genau dieser Struktur:

1. Entscheidungen: Alle getroffenen Entscheidungen als Liste (max. 1 Satz pro Punkt).
2. Aufgaben: Tabelle mit Aufgabe | Verantwortlich | Deadline.
   Wenn Verantwortlicher oder Deadline im Transkript nicht genannt wurden,
   schreibe "unklar" – erfinde nichts.
3. Offene Fragen: Punkte, die diskutiert, aber nicht entschieden wurden.

Lass Smalltalk und Wiederholungen weg. Wenn dieselbe Sache mehrfach besprochen
wurde, zählt die letzte Aussage. Sprache: Deutsch.

Transkript:
[TRANSKRIPT EINFÜGEN]
```

**Prüf-Minute nicht überspringen:** Namen, Zahlen und Deadlines kurz gegenchecken – Transkripte verwechseln gern ähnlich klingende Namen („Herr Maier" vs. „Herr Meyer").

## Schritt 3: Verteilung (~1 Min.)

- **E-Mail:** Protokoll einfügen, Betreff-Schema festlegen und beibehalten, z. B. `Protokoll: [Meeting-Name] – 15.07.2026`. So findet es später jeder per Suche.
- **Slack/Teams-Kanal:** Nur die Aufgaben-Tabelle posten und die Verantwortlichen mit @ erwähnen – das Vollprotokoll als Datei oder Link anhängen. Niemand liest 2 Bildschirmseiten im Chat.
- **Ablage:** Ein fester Ordner (`/Protokolle/2026/`), ein festes Namensschema (`2026-07-15-projektname.md`). Notion/Obsidian: eine Seite pro Meeting, Aufgaben zusätzlich in die zentrale Aufgabenliste.

## Schritt 4 (optional): Automatisieren mit n8n

Wenn der manuelle Ablauf 2–3 Wochen rund läuft, lohnt sich die Automatisierung (Details in Level 3, Lektion „Dein erster KI-Agent mit n8n"):

1. **Trigger:** Neue Datei im Aufzeichnungs-Ordner (OneDrive/Google Drive-Node) oder Zoom/Teams-Webhook.
2. **KI-Node:** Transkript an Claude/GPT mit exakt dem Protokoll-Prompt aus Schritt 2 als System-Prompt.
3. **Verteilung:** E-Mail-Node an die Teilnehmerliste + Slack-Node in den Projektkanal.
4. **Mensch im Loop:** Erst an dich zur Freigabe schicken (z. B. Slack-Nachricht mit „Freigeben"-Button), dann an alle. Automatisch verschicken ohne Blick drauf – erst, wenn du dem Workflow nach ~20 Läufen vertraust.

## Ausbaustufen

| Stufe | Was du tust | Was automatisch läuft | Zeit pro Meeting | Einrichtung |
|---|---|---|---|---|
| Manuell | Transkript laden, Prompt einfügen, prüfen, verschicken | Nur die Transkription | ~5 Min. | 0 – heute startklar |
| Halbautomatisch | Prompt liegt als Vorlage/Textbaustein bereit; du prüfst und klickst „Senden" | Transkription + Protokoll-Erstellung | ~3 Min. | ~30 Min. |
| Vollautomatisch | Nur noch Freigabe per Klick | Alles: Trigger, Protokoll, Verteilung, Ablage | ~1 Min. | 2–4 Std. mit n8n |

**Empfehlung:** Starte manuell, bleib 2 Wochen dabei, und automatisiere erst dann. Wer Stufe 3 zuerst baut, automatisiert einen Prozess, der noch nicht funktioniert.

## Checkliste: Einmalig einrichten

- [ ] Transkription in Teams/Zoom aktiviert (oft Admin-Einstellung)
- [ ] Protokoll-Prompt als Textbaustein gespeichert (z. B. in der Prompt-Bibliothek der Academy)
- [ ] Einverständnis-Satz für die Aufnahme zurechtgelegt
- [ ] Ablage-Ordner + Namensschema definiert
- [ ] Betreff-Schema für die Protokoll-Mail festgelegt

---
*AI Academy — academy.madkourmedia.com*
