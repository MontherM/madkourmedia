# Vorlage: KI-Formel-Helfer

Vier kopierbare Prompt-Vorlagen für die häufigsten Tabellen-Probleme: Formel bauen, Formel verstehen, Fehler finden, Daten aufräumen. Aus der Lektion „Excel & Tabellen mit KI" – funktioniert mit ChatGPT, Claude und Gemini.

**Wichtig vorab:** Beschreibe immer deine Spaltenstruktur (`A: Datum, B: Betrag, …`). Das ist der eine Unterschied zwischen einer Formel, die sofort läuft, und dreimal Hin und Her.

## 1. Formel aus Beschreibung

```
Ich arbeite mit [Excel auf Deutsch / Google Sheets auf Deutsch].
Meine Spalten: [z. B. A: Datum, B: Kundenname, C: Betrag in CHF, D: Status ("bezahlt"/"offen")].
Ich möchte: [ZIEL in einem Satz].
Gib mir: 1) die fertige Formel zum Kopieren, 2) eine Erklärung in einem Satz,
3) eine robustere Variante, falls Zellen leer oder falsch formatiert sein können.
```

**Mini-Beispiel:** Spalten `A: Datum, B: Kundenname, C: Betrag in CHF, D: Status`. Ziel: „Summe aller offenen Beträge aus dem Juni 2026." Ergebnis der KI:

```
=SUMMEWENNS(C:C; D:D; "offen"; A:A; ">=01.06.2026"; A:A; "<=30.06.2026")
```

## 2. Bestehende Formel erklären

Ideal für geerbte Dateien vom Vorgänger, in denen niemand mehr durchblickt:

```
Erkläre mir diese Formel Schritt für Schritt, als wäre ich Excel-Anfänger:
[FORMEL EINFÜGEN]
Meine Spalten: [A: …, B: …].
Sag mir auch: Was passiert, wenn eine Zelle leer ist? Gibt es einen einfacheren Weg?
```

**Mini-Beispiel:** `=WENN(ISTFEHLER(SVERWEIS(B2;Kunden!A:C;3;FALSCH));"neu";SVERWEIS(B2;Kunden!A:C;3;FALSCH))` – die KI erklärt dir, dass hier ein Kundenname im Blatt „Kunden" nachgeschlagen wird und „neu" erscheint, wenn er fehlt. Und schlägt das kürzere `WENNFEHLER` vor.

## 3. Fehler finden (#BEZUG!, #WERT!, #NV …)

```
Diese Formel gibt den Fehler [#BEZUG! / #WERT! / #NV / #DIV/0!] zurück:
[FORMEL EINFÜGEN]
Meine Spalten: [A: …, B: …]. In der Fehlerzelle steht: [was du siehst].
Beispielwerte aus der Zeile: [z. B. A2 = 15.07.2026, B2 = "1'250.00"].
Nenne mir: 1) die wahrscheinlichste Ursache, 2) die korrigierte Formel,
3) wie ich denselben Fehler künftig vermeide.
```

**Mini-Beispiel:** `=A2*B2` gibt `#WERT!` zurück, Spalten `A: Menge, B: Preis`. Häufige Ursache in der Schweiz: `B2` enthält `1'250.00` als **Text** mit Tausender-Apostroph, nicht als Zahl. Die KI erkennt das an deinen Beispielwerten – deshalb immer mitgeben.

## 4. Daten-Bereinigungsplan

Für chaotische Exporte aus Buchhaltung, CRM oder Webshop – erst planen, dann anfassen:

```
Ich habe eine Tabelle mit unsauberen Daten. Spalten und typische Probleme:
[z. B. A: Datum (gemischt "15.07.2026" und "2026-07-15"), B: Betrag (teils mit "CHF" im Feld),
C: E-Mail (teils GROSSBUCHSTABEN, teils Leerzeichen am Ende), D: PLZ (teils 4-, teils 5-stellig)].
Erstelle einen Bereinigungsplan als Tabelle: Schritt | Problem | Lösung (Formel oder Funktion) | Risiko.
Reihenfolge so, dass kein Schritt einen späteren kaputt macht. Keine Makros.
```

**Mini-Beispiel:** Für Spalte C schlägt die KI etwa `=KLEIN(GLÄTTEN(C2))` vor – und warnt dich, das Ergebnis erst in eine Hilfsspalte zu schreiben und die Originalspalte erst nach Kontrolle zu ersetzen.

## Hinweis: Excel vs. Google Sheets, Deutsch vs. Englisch

Funktionsnamen unterscheiden sich je nach Programm **und** Sprache – die häufigste Ursache für „die Formel geht bei mir nicht":

| Deutsch (Excel/Sheets DE) | Englisch (EN) |
|---|---|
| `SUMMEWENNS` | `SUMIFS` |
| `SVERWEIS` | `VLOOKUP` |
| `WENNFEHLER` | `IFERROR` |
| `GLÄTTEN` | `TRIM` |
| `TEXTVERKETTEN` | `TEXTJOIN` |

Auch die Trennzeichen wechseln: Deutsch nutzt Semikolon (`=SUMME(A1;B1)`), Englisch Komma (`=SUM(A1,B1)`). Sag der KI deshalb im ersten Satz immer, welches Programm in welcher Sprache du nutzt – und falls eine gelieferte Formel einen `#NAME?`-Fehler wirft, frag einfach nach: „Übersetze die Formel in deutsche Excel-Funktionsnamen."

## Sicherheits-Check vor dem Einfügen

- [ ] Formel erst in einer Kopie oder Hilfsspalte testen, nie direkt im Original.
- [ ] Ergebnis an 2–3 Zeilen von Hand nachrechnen (Stichprobe reicht).
- [ ] Bei Bereinigungen: Originalspalte behalten, bis alles geprüft ist.
- [ ] Keine echten Kundendaten in öffentliche KI-Tools – Spaltennamen und erfundene Beispielwerte reichen völlig.

---
*AI Academy — academy.madkourmedia.com*
