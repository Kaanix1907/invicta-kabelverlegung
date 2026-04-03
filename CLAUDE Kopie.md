# Webseiten-Builder — Gemeinsame Frontend-Regeln

Gilt für alle Projekte in diesem Ordner (Nachhilfe, Hoeherr, Tugkan Webseite, etc.).

---

## Tech Stack (Standard)
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Sprache:** TypeScript
- **Deployment:** Vercel
- **Paketmanager:** npm

### Neues Projekt starten
```bash
npx create-next-app@latest [projektname] --typescript --tailwind --app --src-dir
```
Danach: `gh repo create [projektname] --public --push --source=.`

### Dev-Server starten
```bash
npm run dev   # → http://localhost:3000
```

---

## Frontend Design Guardrails

### Was ich IMMER mache
- **Shadows:** Nie flaches `shadow-md`. Layered, color-tinted via inline style:
  `boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 8px 32px rgba(0,0,0,0.08)"`
- **Typography:** Heading-Tracking `-0.03em`, Body line-height `1.7`
- **Gradients:** Mehrere radiale Overlays übereinanderlegen. SVG-Grain für Textur.
- **Animations:** Nur `transform` und `opacity`. Nie `transition-all`.
- **Interactive states:** Jedes klickbare Element braucht `hover:`, `focus-visible:`, `active:`
- **Colors:** Nie Default-Tailwind-Blau/Indigo. Immer Brand-Farben aus dem Projekt.
- **Depth:** Layering-System: base → elevated → floating. Nie alles auf einer Ebene.
- **Fonts:** Nie gleiche Font für Heading und Body. Display/Serif + Clean Sans pairen.
- **Icons:** SVG Icons — keine Emojis in Production UI.

### Was ich NIE mache
- `transition-all` → immer spezifisch: `transition-[color,transform,opacity]`
- Default `shadow-md/lg` ohne Color-Tint
- Emojis als Icons
- `README.md` ohne explizite Anfrage
- Externe UI-Libs (shadcn etc.) ohne Absprache

---

## Screenshot-Workflow (PFLICHT nach jeder UI-Änderung)

**Ablauf — kein Schritt darf übersprungen werden:**
1. Dev-Server muss laufen: `npm run dev`
2. Screenshot aufnehmen: `node screenshot.mjs http://localhost:3000 [label]`
3. Screenshot mit Read-Tool öffnen und **kritisch analysieren**:
   - Spacing & Padding korrekt?
   - Fonts geladen? Größe/Gewicht stimmt?
   - Farben exakt (kein falsches Blau/Indigo)?
   - Schatten sichtbar und color-tinted?
   - Alle Borders/Rings sichtbar?
   - Hover-States visuell vollständig?
   - Mobile-Layout (viewport 390px testen)?
4. Fehler fixen → neuen Screenshot → erneut analysieren
5. **Mindestens 2 Runden.** Stopp erst wenn keine sichtbaren Mängel mehr da sind.

**Script liegt in jedem Projekt unter:** `./screenshot.mjs`
**Screenshots landen in:** `./screenshots/screenshot-N-[label].png`
**Viewport Standard:** 1440×900 (Desktop), optional 390×844 (Mobile)

## Bilder & Assets
- Alle Assets in `/public/`
- Immer `next/image` mit `alt`-Text
- Logo freistellen: `magick input.jpg -fuzz 15% -transparent white output.png`
- JPEG → WebP: `magick input.jpg -quality 85 output.webp`

## SEO & Barrierefreiheit
- Jede Seite bekommt Metadata via `generateMetadata`
- Semantisches HTML, ARIA-Labels wo nötig
- Mobile-first

## Code-Regeln
- Business-Daten zentral in `/lib/data.ts` — nie hardcoden
- Jede Sektion = eigene Komponente in `/components`
- Kommentare auf Deutsch
