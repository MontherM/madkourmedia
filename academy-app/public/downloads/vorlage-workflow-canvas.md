# Vorlage: Workflow-Canvas

Das Arbeitsblatt aus der Lektion „Workflow-Design". Damit zerlegst du einen wiederkehrenden Prozess in einzelne Schritte und findest den einen Schritt, mit dem sich die Automatisierung zuerst lohnt. Pro Prozess eine Kopie dieses Canvas – von Hand ausfüllen, bevor du irgendein Tool anfasst.

## Das Canvas (leere Vorlage)

**Prozessname:** _____________________________________________

**Auslöser:** Was startet den Prozess? (Eine Mail kommt rein / jeden Montag / Kunde ruft an / …)

_____________________________________________

**Wie oft?** ______ × pro Woche · **Dauer pro Durchlauf heute:** ______ Minuten

### Schritte

| # | Schritt | Input | Entscheidung? | Output | Wer macht's heute | Mensch, KI oder Regel? | Automatisierbarkeit 1–5 |
|---|---------|-------|---------------|--------|-------------------|------------------------|-------------------------|
| 1 |         |       |               |        |                   |                        |                         |
| 2 |         |       |               |        |                   |                        |                         |
| 3 |         |       |               |        |                   |                        |                         |
| 4 |         |       |               |        |                   |                        |                         |
| 5 |         |       |               |        |                   |                        |                         |
| 6 |         |       |               |        |                   |                        |                         |

**So füllst du die Spalten aus:**

- **Input:** Was liegt vor, bevor der Schritt beginnt? (Mail, PDF, Zuruf, Tabellenzeile)
- **Entscheidung?:** Wird hier etwas entschieden – und nach welcher Regel? „Betrag über CHF 500 → Chef fragen" ist eine Regel. „Kommt drauf an" ist ein Warnsignal: nachbohren, bis die Regel explizit ist.
- **Output:** Was existiert nach dem Schritt, das vorher nicht da war?
- **Mensch, KI oder Regel?:** Braucht der Schritt Urteilsvermögen (Mensch), Sprache/Interpretation (KI) oder ist er stur regelbasiert (Regel – dafür brauchst du keine KI, ein simples Wenn-dann reicht)?
- **Automatisierbarkeit 1–5:** 1 = nur ein Mensch kann das · 3 = KI mit menschlicher Prüfung · 5 = läuft heute schon fast ohne Nachdenken

### Der erste Kandidat

Automatisiere **nicht** den ganzen Prozess. Such den einen Schritt, der alle drei Kriterien erfüllt:

- [ ] **Häufig:** kommt mindestens mehrmals pro Woche vor (sonst lohnt der Aufwand nicht)
- [ ] **Regelbasiert:** du kannst einem neuen Mitarbeiter in 2 Sätzen erklären, was richtig ist
- [ ] **Geringes Fehlerrisiko:** wenn's schiefgeht, kostet es Minuten – nicht Geld, Kunden oder Ruf

**Mein erster Kandidat ist Schritt Nr. ____ , weil:** _____________________________________________

**Was passiert im schlimmsten Fall, wenn dieser Schritt falsch läuft?** _____________________________________________

## Ausgefülltes Beispiel: Eingehende Rechnungen verarbeiten

**Prozessname:** Lieferantenrechnungen erfassen und zur Zahlung freigeben

**Auslöser:** Rechnung kommt per Mail an buchhaltung@… (oder auf Papier per Post)

**Wie oft?** ca. 25 × pro Woche · **Dauer pro Durchlauf heute:** 8 Minuten

| # | Schritt | Input | Entscheidung? | Output | Wer macht's heute | Mensch, KI oder Regel? | Automatisierbarkeit 1–5 |
|---|---------|-------|---------------|--------|-------------------|------------------------|-------------------------|
| 1 | Rechnung aus Mail-Anhang ablegen | Mail mit PDF | Nein | PDF im Ordner „Eingang" | Sachbearbeiterin | Regel | 5 |
| 2 | Rechnungsdaten auslesen (Lieferant, Betrag, Datum, Fälligkeit) | PDF | Nein | Datensatz in Buchhaltungs-Tabelle | Sachbearbeiterin (abtippen) | KI | 4 |
| 3 | Gegen Bestellung/Lieferschein prüfen | Datensatz + Bestellung | Ja: stimmen Menge und Preis überein? | Status „geprüft" oder „Abweichung" | Sachbearbeiterin | KI mit Prüfung | 3 |
| 4 | Kontieren (Kostenstelle zuordnen) | geprüfter Datensatz | Ja: welche Kostenstelle? Meist wie beim letzten Mal | kontierter Buchungssatz | Buchhalterin | KI mit Prüfung | 3 |
| 5 | Freigabe zur Zahlung | kontierter Satz | Ja: unter CHF 1'000 → Buchhaltung, darüber → Geschäftsführer | Freigabe erteilt | Buchhalterin / GF | Regel + Mensch | 2 |
| 6 | Zahlung ausführen (QR-Rechnung im E-Banking) | freigegebener Satz | Nein | Zahlung terminiert | Buchhalterin | Regel | 4 |

**Der erste Kandidat ist Schritt Nr. 2**, weil: Er passiert 25 × pro Woche (häufig ✓), das Auslesen von Betrag, Datum und Lieferant folgt immer demselben Muster (regelbasiert ✓), und ein Fehler fällt spätestens in Schritt 3 beim Abgleich auf, bevor Geld fliesst (geringes Fehlerrisiko ✓).

**Schlimmster Fall:** Ein Betrag wird falsch ausgelesen → die Prüfung in Schritt 3 meldet eine Abweichung → 2 Minuten manuelle Korrektur. Kein Geldschaden möglich, weil Freigabe (Schritt 5) beim Menschen bleibt.

**Bewusst NICHT automatisiert:** Schritt 5. Die Zahlungsfreigabe bleibt beim Menschen – genau dieses Muster (KI arbeitet vor, Mensch gibt frei) siehst du in der Lektion „Dein erster KI-Agent" wieder.

---
*AI Academy — academy.madkourmedia.com*
