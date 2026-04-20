# State — Tugkan Website

**Zuletzt aktualisiert:** 2026-04-20 (Session 3)

## Aktueller Focus
Website für Invicta Kabelverlegung — One-Pager mit Scroll-Animation, deployed auf GitHub Pages.
Master-Workflow konsolidiert und von Next.js-Altlasten befreit.

## Was funktioniert
- [x] Kompletter One-Pager (Hero, Services, About, Stats, Referenzen, CTA, Kontakt, Footer)
- [x] Scroll-driven Frame-Sequence-Animation (121 Frames, Canvas-basiert, GSAP ScrollTrigger)
- [x] INVICTA Schriftzug erscheint bei ~85% Scroll-Fortschritt
- [x] Annotation Cards (3 Stück) mit Progress-basiertem Show/Hide
- [x] Mobile-Responsive Design (Cover-Fit, Gradient-Overlays, 260vh Scroll-Höhe)
- [x] Navigation mit Burger-Menu (Mobile)
- [x] GSAP Scroll-Animationen (Fade-up, Fade-right, Fade-left, Counter)
- [x] Kontaktformular (Frontend-Validierung)
- [x] GitHub Pages Deployment via Actions Workflow
- [x] AI-generierte Prompts für 2 Video-Varianten (Cable Connection + Construction Site)

## Offene Blocker
_Nichts bekannt_

## Nächste Schritte
1. Tugkan-Feedback abwarten
2. Echte Bilder/Assets einpflegen (About-Sektion Placeholder ersetzen)
3. Kontakt-Email / Telefonnummer eintragen (aktuell Platzhalter)
4. Optional: Custom Domain

---
## Handoff (letzter Stand für nächste Session)

**Stand 2026-04-20 (Session 3 — V3/V4 Prompts + Consistency-Workflow):**
- **prompts-variation-3.html**: 9:16 Top-Down, 90° Bird's Eye, H-Shape Trench-Layout, weißer #FFFFFF Void Background. A: 2322 chars, B: 2186 chars, C: 2415 chars.
- **prompts-variation-4.html**: 16:9 Cinematic Drone (~40° tilt high-right). Facility jetzt als **Premium Automotive Campus (BMW/Audi-Style)** — Glasfassade + Alucobond-Paneele + Ribbon Windows + Concrete Plinth + Canopy. Pflaster ist Anthrazit-Slabs/Basalt (nicht Asphalt). Hausanschluss-Szenario direkt an der Wand mit Kernbohrung → Mauerdichtflansch. A: 2262, B: 2468, C: 2432.
- **Prompt B in V3+V4**: komplett als **Img2Img-Edit-Prompt** umgeschrieben — "WORKFLOW: Generate A first, upload into Edit Image tool" + nummerierte Deltas + "DO NOT change"-Liste. Panel-Tag jetzt "Img2Img Edit on A".
- **Consistency-Problem erklärt**: Higgs Field's "Edit Image" ist schwach für Scene-Consistency. Empfohlener Workflow: A in Higgs Field → B in **Nano Banana (Gemini 2.5 Flash Image via gemini.google.com / aistudio.google.com)** oder Seedream 4 / Flux Kontext → beide zurück in Higgs Field als Start/End-Frame für Video (Prompt C). Alternativ Higgs Field mit Strength 0.25–0.35 + Maske.
- **User-Feedback-Iterationen**: 1) "nicht fertig genug" → End-State komplett gereinigt mit Schachtdeckel/Anschlusskasten/Mauerdichtflansch. 2) "zu weit von Fabrik" → direkt an Wand verlegt. 3) "Before/After matcht nicht" → B als Img2Img umformuliert. 4) "zu industriell" → Premium Automotive Campus.
- Offen: User testet neue Prompts in Higgs Field + Nano Banana. Danach Frames extrahieren für 2. Deploy-Variante.

**Stand 2026-04-20 (Session 2):**
- Firecrawl-API-Key aktualisiert + getestet (Scrape von example.com erfolgreich, 1 Credit)
- `Webseiten-Builder/CLAUDE.md` aufgeräumt: Next.js-Altlasten raus, Master-Workflow + stackunabhängige Guardrails + Screenshot-Workflow (Port 8080) + ImageMagick + "Kommentare auf Deutsch" behalten
- `~/.claude/skills/website-builder/SKILL.md` gefixt:
  - `allowed-tools` um Firecrawl-MCP-Tools erweitert (war kritischer Bug — Skill konnte Firecrawl nicht aufrufen)
  - PREFLIGHT-Section ergänzt (Sprache, `.ai-state/`-Check, Firecrawl-Fallback, Output-Ordner)
  - README-Widerspruch zur globalen Regel entfernt
  - Screenshot-Workflow referenziert (Port 8080, 2-Runden-Regel)
  - Security-&-Privacy-Audit-Block in Phase 5 ergänzt (noopener, XSS, Secrets, DSGVO, robots.txt)
  - Description: 4→5 Phasen korrigiert
- **Guardrails komplett in Skill migriert** — Design-Regeln, Screenshot-Workflow, ImageMagick, Plugin-Skill-Tabelle sind jetzt alle im SKILL.md. Parent `Webseiten-Builder/CLAUDE.md` auf Minimal-Stub reduziert (nur Verweis auf den Skill). Master-Workflow greift jetzt ortsunabhängig.

**Stand 2026-04-16:**
- Website live: https://kaanix1907.github.io/invicta-kabelverlegung/
- Repo: https://github.com/Kaanix1907/invicta-kabelverlegung (public)
- Stack: Vanilla HTML/CSS/JS + GSAP ScrollTrigger (kein Next.js)
- Server lokal: Python HTTP auf Port 8080 (aus site/ Ordner)
- 121 Frames im site/frames/ Ordner (JPEGs, ~20MB)
- Scroll-Höhe Animation: 220vh (Desktop), 190vh (Tablet), 260vh (Mobile)
- Background Animation: #FFFFFF (reines Weiß, passend zum Video-Hintergrund)
- Gradient-Overlays oben/unten (120px) für nahtlosen Übergang dunkel → weiß → dunkel
- Cover-Fit auf allen Viewports (kein contain-fit mehr auf Mobile)
- INVICTA Schriftzug: position absolute im sticky Wrapper, scrollt mit weg
- Video-Prompts: prompts-variation-1.html + prompts-variation-2.html (je max 2500 Zeichen)
- Desktop .command: /Users/test/Desktop/Invicta Website öffnen.command (Port 8080)
- Letzter Fix: Weißton-Unterschied zwischen Video und Hintergrund behoben (#eaeaea → #FFFFFF)
