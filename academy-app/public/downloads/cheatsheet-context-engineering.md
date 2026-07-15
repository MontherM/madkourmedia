# Cheatsheet: Context Engineering

Das Spickblatt zur Lektion „Context Engineering". Kernidee: Ob ein Agent zuverlässig oder zufällig arbeitet, entscheidet nicht die Frage – sondern was er **weiss**, was er **kann**, was er **darf** und wie er **antworten muss**. Das sind die 4 Hebel.

## Hebel 1: Wissen

**Leitfrage:** Was muss der Agent wissen, um diese eine Aufgabe zu lösen – und zwar aktuell, relevant und kompakt?

| Gut | Schlecht |
|-----|----------|
| Ein Kontext-Paket unter 500 Wörter: Angebot, Preise, Tonalität mit Beispielsätzen, FAQ – Stand Juli 2026 | 40 Seiten Firmenbroschüre von 2023, die alte Website als PDF und „zur Sicherheit" noch das Leitbild |

**Typischer Fehler:** Alles reinkippen, was man findet. Mehr Kontext ist nicht besser – irrelevanter Kontext verdrängt relevanten und der Agent zitiert dann die Preisliste von vorletztem Jahr. Faustregel: Jeder Absatz im Kontext muss eine Frage beantworten, die der Agent tatsächlich gestellt bekommt. Und: Wissen mit Datum versehen („Stand: 07/2026"), sonst erkennst du veraltete Pakete nie.

## Hebel 2: Werkzeuge

**Leitfrage:** Welche Zugriffe braucht der Agent für genau diese Aufgabe – und keinen einzigen mehr?

| Gut | Schlecht |
|-----|----------|
| Briefing-Agent: darf einen definierten RSS-Feed lesen und eine Mail an dich senden. Punkt. | „Kann ja nicht schaden": Websuche, Kalender-Zugriff, Mail-Versand an beliebige Adressen und Schreibzugriff auf die Kundendatenbank |

**Typischer Fehler:** Werkzeuge auf Vorrat geben. Jedes Tool ist eine Tür – und ein Agent mit zehn Türen macht irgendwann eine falsche auf. Ein Agent mit Websuche „recherchiert" plötzlich, statt deinen Feed zu lesen; einer mit Mail-Versand an beliebige Adressen ist ein Prompt-Injection-Ziel. Starte mit Nur-Lesen, gib Schreibrechte einzeln und erst nach bewährtem Betrieb dazu.

## Hebel 3: Grenzen

**Leitfrage:** Was darf der Agent **nie** tun – so formuliert, dass es testbar ist?

| Gut | Schlecht |
|-----|----------|
| „Nenne nie Preise, die nicht im Kontext-Paket stehen. Versende nie an andere Adressen als du@firma.ch. Bei Rechtsfragen: an einen Menschen verweisen, keine eigene Auskunft." | „Sei vorsichtig und professionell und mach nichts Falsches." |

**Typischer Fehler:** Grenzen als vage Tugenden formulieren statt als harte Regeln. „Sei vorsichtig" kann ein Modell nicht prüfen – „nenne nie Preise ausserhalb des Kontext-Pakets" schon. Zweiter Fehler: Grenzen nur in den Prompt schreiben, wo sie technisch erzwingbar wären. Der Mail-Empfänger gehört fest in den Workflow-Node verdrahtet, nicht in den Prompt – Prompts kann man überreden, Konfiguration nicht.

## Hebel 4: Format

**Leitfrage:** Wie muss die Antwort aussehen, damit sie der nächste Schritt (Mensch oder Maschine) direkt verwenden kann?

| Gut | Schlecht |
|-----|----------|
| „Genau 5 Meldungen. Pro Meldung: fetter Titel, 2 Sätze Zusammenfassung, 1 Zeile ‚Warum es dich betrifft'. Keine Einleitung. Weniger als 5 relevante? Sag es explizit." | „Fasse die News schön übersichtlich zusammen." |

**Typischer Fehler:** Das Format der Fantasie des Modells überlassen. Dann ist der Slack-Post am Montag eine Tabelle, am Dienstag ein Essay – und jeder nachgelagerte Automatisierungsschritt bricht. Formate zähl- und prüfbar machen („genau 5", „max. 2 Sätze") und immer den Sonderfall regeln: Was schreibt der Agent, wenn es nichts zu berichten gibt?

## Debugging-Reihenfolge: wenn der Agent Mist baut

Nicht sofort am Prompt schrauben und schon gar nicht sofort das Modell wechseln. In dieser Reihenfolge prüfen – die häufigste Ursache zuerst:

1. **Kontext prüfen:** Was hat der Agent in diesem Lauf tatsächlich gesehen? (In n8n: Execution öffnen, Input des KI-Nodes lesen.) Meist ist die Antwort ernüchternd: Der Feed war leer, das Kontext-Paket veraltet, die entscheidende Info war nie drin. Falsches Wissen rein → falsches Ergebnis raus.
2. **Prompt prüfen:** Ist die Aufgabe eindeutig, das Format zählbar, der Sonderfall („nichts gefunden") geregelt? Widerspricht sich etwas zwischen System-Prompt und Kontext-Paket?
3. **Werkzeuge prüfen:** Hat der Agent das falsche Tool benutzt oder ein Tool, das er gar nicht bräuchte? Oft löst ein Tool weniger das Problem.
4. **Grenzen prüfen:** Hat er etwas getan, das nie erlaubt sein sollte? Dann fehlt eine harte Regel – idealerweise in der Konfiguration, nicht nur im Prompt.
5. **Modell prüfen – erst jetzt:** Wenn Kontext, Prompt, Werkzeuge und Grenzen sauber sind und die Qualität trotzdem nicht reicht, teste ein stärkeres Modell. In der Praxis landen 8 von 10 Problemen bei Schritt 1 und 2.

**Merksatz:** Ein mittelmässiger Prompt mit perfektem Kontext schlägt einen perfekten Prompt mit Kontext-Müll – jedes Mal.

## Die 4 Hebel auf einen Blick

| Hebel | Leitfrage | Faustregel |
|-------|-----------|------------|
| Wissen | Was muss er wissen? | Aktuell, relevant, kompakt – unter 500 Wörter, mit Datum |
| Werkzeuge | Was braucht er wirklich? | Starte mit Nur-Lesen, Schreibrechte einzeln dazu |
| Grenzen | Was darf er nie? | Testbar formulieren, kritische Grenzen in die Konfiguration |
| Format | Wie muss die Antwort aussehen? | Zählbar, prüfbar, Sonderfall „nichts gefunden" geregelt |

---
*AI Academy — academy.madkourmedia.com*
