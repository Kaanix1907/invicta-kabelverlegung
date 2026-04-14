# Tugkan Website — Claude Context

<!-- Extends ~/.claude/CLAUDE.md — projektspezifische Regeln überschreiben globale -->

## Session Start (PFLICHT — vor jeder anderen Aktion)
1. Lese: `.ai-state/PROJECT.md` → `.ai-state/STATE.md` → `.ai-state/TASKS.md` → `.ai-state/DECISIONS.md`
2. Bestätige: "Kontext geladen. Focus: [X]. Offene Tasks: [N]."

## Session End (PFLICHT — vor letzter Antwort)
- `.ai-state/STATE.md` → Handoff-Sektion aktualisieren
- `.ai-state/TASKS.md` → Status aktualisieren
- Bei Architekturentscheidung → `.ai-state/DECISIONS.md` appenden
- Git commit mit beschreibendem Message

## Projektspezifische Regeln
_Hier projektspezifische Regeln eintragen_

## Stack-Kontext
_Hier relevante Stack-Details für Claude_
