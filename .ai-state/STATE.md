# State — Tugkan Website

**Zuletzt aktualisiert:** 2026-04-16

## Aktueller Focus
Website für Invicta Kabelverlegung — One-Pager mit Scroll-Animation, deployed auf GitHub Pages.

## Was funktioniert
- [x] Kompletter One-Pager (Hero, Services, About, Stats, Referenzen, CTA, Kontakt, Footer)
- [x] Scroll-driven Frame-Sequence-Animation (121 Frames, Canvas-basiert, GSAP ScrollTrigger)
- [x] INVICTA Schriftzug erscheint bei ~85% Scroll-Fortschritt
- [x] Annotation Cards (3 Stück) mit Progress-basiertem Show/Hide
- [x] Mobile-Responsive Design (768px + 480px Breakpoints)
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

**Stand 2026-04-16:**
- Website live: https://kaanix1907.github.io/invicta-kabelverlegung/
- Repo: https://github.com/Kaanix1907/invicta-kabelverlegung (public)
- Stack: Vanilla HTML/CSS/JS + GSAP ScrollTrigger (kein Next.js)
- Server lokal: Python HTTP auf Port 8080 (aus site/ Ordner)
- 121 Frames im site/frames/ Ordner (JPEGs, ~20MB)
- Scroll-Höhe Animation: 220vh (Desktop), 190vh (Tablet), 170vh (Mobile)
- Background Animation: #eaeaea (leicht off-white, NICHT dunkel)
- INVICTA Schriftzug: position absolute im sticky Wrapper, scrollt mit weg
- Video-Prompts: prompts-variation-1.html + prompts-variation-2.html (je max 2500 Zeichen)
- Desktop .command: /Users/test/Desktop/Invicta Website öffnen.command (Port 8080)
- Mobile-Optimierung abgeschlossen und geprüft via Puppeteer Screenshots
