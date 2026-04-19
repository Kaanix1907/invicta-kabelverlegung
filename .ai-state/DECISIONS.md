# Decisions — Tugkan Website

_Append-only. Niemals löschen. Format: Datum | Entscheidung | Begründung_

---

## 2026-04-15 — Projekt initialisiert
**Entscheidung:** .ai-state/ System eingerichtet
**Begründung:** Persistenter Kontext für Claude über Sessions hinweg
**Alternativen:** Nur CLAUDE.md (zu wenig Detail), Session Log (flüchtig)

## 2026-04-20 — Master-Workflow als Single-Source-of-Truth
**Entscheidung:** `Webseiten-Builder/CLAUDE.md` konsolidiert — altes Next.js-basiertes Website-Builder-System gelöscht, Master-Workflow (`~/.claude/skills/website-builder/`) ist jetzt alleinige Build-Pipeline. Stackunabhängige Guardrails (Shadows, Typography, Animations, Interactive States) + Screenshot-Disziplin + ImageMagick-Snippets wurden in CLAUDE.md übernommen.
**Begründung:** Master-Workflow nutzt Vanilla HTML + GSAP (nicht Next.js). Das alte System widersprach dem und verdoppelte Content. Skill-basierter Workflow ist flexibler und projektübergreifend nutzbar.
**Alternativen:** Zwei parallele Systeme (Next.js + Vanilla) — verworfen wegen Duplication und Entscheidungsüberhang.
