# Cheatsheet: KI-Grundbegriffe

Die 20 Begriffe, die dir in jeder KI-Diskussion begegnen – erklärt in Alltagssprache, mit je einem Beispiel. Gehört zur Lektion „Was ist KI – und was nicht?". Drucke es aus oder leg es in Obsidian/Notion ab und schlag nach, wenn dir ein Begriff über den Weg läuft.

| Begriff | Was es bedeutet | Beispiel |
|---|---|---|
| **KI (Künstliche Intelligenz)** | Sammelbegriff für Software, die Aufgaben löst, für die man bisher menschliches Denken brauchte. Kein Bewusstsein, keine Absicht – nur Statistik und Muster. | Die Rechtschreibkorrektur auf deinem Handy ist KI. ChatGPT auch. Beides rät auf Basis von Mustern. |
| **LLM (Large Language Model)** | Ein Sprachmodell, das aus riesigen Textmengen gelernt hat, welches Wort wahrscheinlich als Nächstes kommt. ChatGPT, Claude und Gemini sind LLMs. | Du tippst „Sehr geehrte Damen und" – das LLM weiß: Mit 99 % kommt „Herren". Genau so schreibt es ganze Offerten. |
| **Token** | Die Häppchen, in die ein LLM Text zerlegt – meist Wortteile, keine ganzen Wörter. Modelle rechnen und „denken" in Tokens. | „Unverständlich" wird intern zu etwa „Un-ver-ständ-lich" – vier Tokens statt einem Wort. |
| **Kontextfenster** | Das Kurzzeitgedächtnis eines Chats: alles, was das Modell in diesem Gespräch gleichzeitig „sehen" kann. Ist es voll, vergisst das Modell den Anfang. | Du fügst ein 80-seitiges Sitzungsprotokoll ein und fragst nach Seite 2 – ob die Antwort stimmt, hängt davon ab, ob Seite 2 noch ins Fenster passt. |
| **Prompt** | Deine Eingabe an die KI: Frage, Anweisung, Kontext. Die Qualität des Prompts bestimmt die Qualität der Antwort. | „Schreib eine Mail" vs. „Schreib eine Absage an einen Lieferanten, freundlich, max. 5 Sätze, Grund: Budget" – der zweite Prompt gewinnt. |
| **System-Prompt** | Die unsichtbare Grundanweisung, die vor deinem Prompt gilt und Rolle, Ton und Grenzen festlegt. | In einem Custom GPT steht z. B.: „Du bist Sachbearbeiter einer Schweizer Versicherung. Antworte immer per Sie." |
| **Halluzination** | Das Modell erfindet Fakten, die plausibel klingen, aber falsch sind – weil es Wahrscheinlichkeiten liefert, keine Wahrheit. | Du fragst nach einem Bundesgerichtsentscheid und bekommst ein Aktenzeichen, das perfekt aussieht – aber nicht existiert. |
| **Training** | Die Lernphase: Das Modell wird einmalig mit riesigen Textmengen gefüttert und stellt dabei seine internen „Verbindungen" ein. Danach lernt es nicht mehr weiter. | ChatGPT merkt sich nicht, was du ihm gestern erzählt hast – das Training war lange vorher abgeschlossen. |
| **Inferenz** | Die Nutzungsphase: Das fertig trainierte Modell erzeugt aus deinem Prompt eine Antwort. Das passiert bei jedem Chat. | Jede Antwort, die du in Claude siehst, ist Inferenz – das Modell wendet an, was es im Training gelernt hat. |
| **Wissensstand (Cutoff)** | Der Zeitpunkt, bis zu dem die Trainingsdaten reichen. Alles danach kennt das Modell nicht – außer es hat Websuche. | Du fragst nach dem aktuellen Hypothekarzins – ohne Websuche bekommst du den Stand von vor Monaten, selbstbewusst präsentiert. |
| **Temperatur** | Ein Regler für Zufall: niedrig = vorhersehbar und nüchtern, hoch = kreativ und riskanter. In den Chat-Apps meist fest eingestellt, in APIs wählbar. | Für eine QR-Rechnungs-Beschreibung willst du Temperatur tief; für 10 Slogan-Ideen darf sie hoch. |
| **Multimodal** | Das Modell versteht nicht nur Text, sondern auch Bilder, Audio oder PDFs – und kann teils selbst welche erzeugen. | Du fotografierst eine handgeschriebene Offerte und lässt sie als Tabelle ausgeben. |
| **Agent** | Eine KI, die nicht nur antwortet, sondern in mehreren Schritten selbstständig handelt: plant, Werkzeuge nutzt, Zwischenergebnisse prüft. | Ein n8n-Agent liest jeden Morgen deine Mails, fasst sie zusammen und postet das Ergebnis in Slack – ohne dass du etwas tippst. |
| **RAG (Retrieval-Augmented Generation)** | Das Modell bekommt vor der Antwort passende Ausschnitte aus deinen Dokumenten mitgeliefert, statt nur aus dem Training zu raten. | Dein Firmen-Chatbot beantwortet Fragen zum Personalreglement korrekt, weil ihm das echte Reglement mitgegeben wird. |
| **Fine-Tuning** | Nachtraining eines fertigen Modells mit eigenen Beispielen, damit es einen Stil oder eine Spezialaufgabe besser beherrscht. Aufwendig – für die meisten reicht ein gutes Kontext-Dokument. | Ein Verlag trainiert ein Modell mit 5'000 eigenen Artikeln, damit es exakt den Haus-Stil trifft. |
| **Embedding** | Text wird in Zahlenreihen übersetzt, die Bedeutung abbilden – so findet die KI inhaltlich Ähnliches, auch ohne gleiche Wörter. | Die Suche findet „Ferienantrag" auch, wenn im Dokument „Urlaubsgesuch" steht. Das ist Embeddings zu verdanken. |
| **Kontext (im Chat)** | Alles, was du dem Modell in diesem Gespräch mitgegeben hast: Verlauf, Dateien, Anweisungen. Mehr relevanter Kontext = bessere Antworten. | Gibst du deine Preisliste mit, stimmen die Zahlen in der Offerte. Ohne sie erfindet das Modell welche. |
| **Open-Source-Modell** | Ein Modell, dessen Gewichte frei verfügbar sind – du kannst es auf eigener Hardware betreiben, z. B. wenn Daten das Haus nicht verlassen dürfen. | Eine Treuhand-Firma lässt ein offenes Modell lokal laufen, damit Mandantendaten intern bleiben. |
| **API** | Die technische Schnittstelle, über die Programme (statt Menschen) mit dem Modell sprechen. Grundlage jeder Automatisierung. | Dein n8n-Workflow schickt jedes Meeting-Transkript per API an Claude und bekommt das Protokoll zurück. |
| **Deep Research** | Ein Modus, in dem die KI minutenlang selbstständig recherchiert, viele Quellen liest und einen belegten Bericht schreibt – statt sofort zu antworten. | Statt 2 Stunden googeln: Du gibst „Marktübersicht Wärmepumpen Schweiz" in Auftrag und bekommst 20 Minuten später einen Bericht mit Quellen. |

## Die drei Begriffe, die du wirklich verinnerlichen solltest

- [ ] **Token & Kontextfenster** – erklären, warum lange Chats „vergesslich" werden.
- [ ] **Halluzination** – erklärt, warum du Zahlen, Namen und Paragraphen immer prüfst.
- [ ] **Training vs. Inferenz** – erklärt, warum das Modell nichts über dich lernt, nur weil du mit ihm chattest.

---
*AI Academy — academy.madkourmedia.com*
