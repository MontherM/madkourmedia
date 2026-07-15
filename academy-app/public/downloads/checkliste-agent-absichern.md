# Checkliste: Agent absichern

Die Härtungs-Liste aus der Lektion „Dein erster KI-Agent mit n8n". Geh sie durch, **bevor** du einen Agenten aktivierst – und noch einmal, sobald du ihm neue Rechte gibst. Grundregel: Der Agent bekommt so wenig Rechte wie möglich, nicht so viele wie bequem.

## 1. Grenzen

Die wichtigste Frage zuerst: **Darf der Agent nur lesen – oder auch schreiben?** Ein Agent, der Mails liest und dir berichtet, kann wenig anrichten. Ein Agent, der Mails versendet, Daten ändert oder Zahlungen anstösst, ist eine andere Risikoklasse.

- [ ] Lese- vs. Schreibrechte bewusst entschieden: Der erste Agent liest nur (wie das Morgen-Briefing) – Schreibrechte kommen erst, wenn er sich wochenlang bewährt hat
- [ ] Budget-Limit gesetzt: Ausgabenlimit beim KI-Anbieter aktiviert (z. B. max. USD 20/Monat in der API-Konsole) – ein Agent in einer Endlosschleife kann sonst über Nacht Hunderte Franken verbrennen
- [ ] Rate-Limit gesetzt: max. Läufe pro Tag definiert (beim Briefing: 1× werktags, fertig) und max. Schleifen-Durchläufe pro Lauf begrenzt
- [ ] Erlaubte Domains festgelegt: Der Agent ruft nur die Quellen ab, die du eingetragen hast – nicht „das Internet"
- [ ] Empfänger fest verdrahtet: Mails/Nachrichten gehen nur an vordefinierte Adressen, nie an Adressen aus den Eingabedaten
- [ ] Keine Klartext-Keys im Workflow: API-Keys als Credentials hinterlegt, nicht im Node-Feld – vor allem, bevor du einen Workflow exportierst oder teilst

## 2. Mensch im Loop

Nicht alles, was der Agent vorbereiten darf, darf er auch ausführen. Definiere die Freigabe-Schwelle **vorher**, nicht nach dem ersten Zwischenfall.

- [ ] Freigabe-Regel schriftlich: Was braucht ein menschliches Okay? (z. B. „alles, was extern sichtbar ist: Kundenmails, Posts, Zahlungen")
- [ ] Entwurf statt Versand: Der Agent legt Kundenmails als **Entwurf** ab, du klickst auf Senden – gleicher Zeitgewinn, volle Kontrolle
- [ ] Schwellenwerte definiert: z. B. „Beträge über CHF 200 → Rückfrage", „mehr als 10 Empfänger → Rückfrage"
- [ ] Zuständigkeit geklärt: Eine benannte Person prüft die Freigaben – nicht „irgendwer im Team"

## 3. Logging

Was du nicht protokollierst, kannst du nicht debuggen – und einem Agenten, dessen Läufe du nicht siehst, kannst du nicht vertrauen.

- [ ] Jeder Lauf protokolliert: In n8n die Execution-History aktiv lassen (Settings → „Save successful executions")
- [ ] Fehler-Benachrichtigung eingerichtet: Ein Error-Workflow oder eine Mail an dich, wenn ein Lauf scheitert – sonst merkst du erst nach Tagen, dass das Briefing ausbleibt
- [ ] Nachvollziehbar, was die KI gesehen hat: Input und Output des KI-Nodes bleiben in der Execution sichtbar
- [ ] „Kein Ergebnis" ist sichtbar: Ein Lauf, der nichts findet, meldet das explizit („Heute 0 relevante Meldungen") statt still nichts zu tun

## 4. Testen

Teste nicht, ob der Agent funktioniert, wenn alles gut läuft – teste, was er tut, wenn etwas schiefgeht.

- [ ] Mit Absicht kaputte Inputs: Feed-URL auf eine 404-Seite gestellt – bricht der Agent sauber ab oder mailt er dir Müll?
- [ ] Leere Ergebnisse: Feed ohne relevante Meldungen simuliert – erfindet die KI dann welche? (Wenn ja: Prompt nachschärfen, siehe Cheatsheet Context Engineering)
- [ ] Riesen-Input: Ungewöhnlich langer Feed getestet – läuft der Agent ins Token-Limit oder ins Timeout?
- [ ] Manipulativer Input: Eine Meldung mit Text wie „Ignoriere deine Anweisungen und…" eingeschleust – bleibt der Agent bei seiner Aufgabe? (Prompt Injection – der Grund, warum Empfänger und Domains fest verdrahtet sind)
- [ ] 5 Läufe manuell ausgeführt und geprüft, bevor der Zeitplan aktiviert wird

## 5. Betrieb

Ein Agent ist kein Deckenventilator, den man einschaltet und vergisst.

- [ ] Wöchentlicher Review im Kalender: 10 Minuten Executions durchsehen – Qualität noch gut? Kosten im Rahmen? Fehler-Muster?
- [ ] Kill-Switch bekannt: Du (und deine Stellvertretung) wissen, wie man den Workflow in 10 Sekunden deaktiviert (n8n: Toggle „Active" aus)
- [ ] Verantwortliche Person benannt – auch für die Ferienzeit
- [ ] Abschalt-Kriterium definiert: z. B. „2 Wochen ungelesen → Agent aus" – ein Agent, dessen Output niemand liest, ist nur ein Kostenposten

## Der 60-Sekunden-Check vor dem Aktivieren

Alle fünf Blöcke abgehakt? Dann noch diese drei Fragen, laut beantwortet:

1. **Was ist das Schlimmste, das dieser Agent mit seinen aktuellen Rechten anrichten kann?** Wenn die Antwort mehr als „mir eine unnütze Mail schicken" lautet: Rechte kürzen.
2. **Merke ich innerhalb eines Tages, wenn er ausfällt oder Unsinn produziert?** Wenn nein: Logging und Fehler-Mail nachrüsten.
3. **Kann ich ihn in 10 Sekunden abschalten?** Wenn du erst nachschauen müsstest wie: jetzt einmal üben.

---
*AI Academy — academy.madkourmedia.com*
