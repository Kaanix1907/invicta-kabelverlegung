# Build Brief — Invicta Kabelverlegung

**Erstellt:** 2026-04-16
**Basiert auf:** 01-client-brand.md + 02-competitor-analysis.md

---

## Design Direction

### Farbpalette

| Rolle | Hex | CSS Variable | Verwendung |
|-------|-----|-------------|------------|
| Primary | #1A2B3D | `--color-primary` | Hero-Background, Nav, Footer, Headlines |
| Secondary | #E8A630 | `--color-secondary` | CTAs, Hover-States, Highlights, Akzente |
| Accent | #2C91BC | `--color-accent` | Links, sekundäre Buttons, Badges |
| Dark BG | #0D1117 | `--color-dark` | Hero-Sektion, Dark-Sections |
| Light BG | #F8F9FA | `--color-light` | Helle Content-Sektionen |
| White | #FFFFFF | `--color-white` | Karten, erhöhte Elemente |
| Text Light | #E5E7EB | `--color-text-light` | Text auf dunklem Grund |
| Text Dark | #1A2B3D | `--color-text-dark` | Text auf hellem Grund |
| Muted | #6B7280 | `--color-muted` | Beschreibungen, Labels |

### Typography Pairing

```css
/* Headings */
font-family: 'Montserrat', sans-serif;
font-weight: 700; /* 800 für Display */
letter-spacing: -0.03em;

/* Body */
font-family: 'Inter', sans-serif;
font-weight: 400;
line-height: 1.7;
letter-spacing: 0;
```

### Photography & Asset Style
- **Industrielle Ästhetik:** Echte Baustellen-Bilder, kein Stock
- **Color Grading:** Leicht entsättigt mit warmen Highlights (passend zu Gold-Akzent)
- **Perspektive:** Vogelperspektive für Baustellen, Close-ups für Kabel/Technik
- **Platzhalter:** Clearly markierte Bereiche für Nano Banana 3D Assets
- **Keine:** generische Handschlag-Bilder, clipart-Icons, Emojis

### Animation-Empfehlungen
- **Hero:** Parallax-Hintergrund + Fade-in Text mit GSAP Timeline
- **Sektionsübergänge:** ScrollTrigger fade+slide von unten (stagger für mehrere Elemente)
- **Counter:** Zahl-Animation bei Scroll-in-View (GSAP CountUp)
- **Karten:** Hover-Scale (1.02) + Shadow-Elevation + Farb-Shift
- **Navigation:** Transparenter Nav → Solid bei Scroll
- **Buttons:** Scale 0.98 bei :active, Color-Shift bei :hover
- **Bilder:** Reveal-Animation von links/rechts mit Mask

### Was VERMEIDEN
- Slider/Carousels (kein Slider Revolution)
- Parallax auf Mobile (Performance)
- `transition-all` — immer spezifisch
- Bounce/Elastic Easing (zu verspielt für Industrie)
- Zu viele gleichzeitige Animationen

---

## Site Architecture

### Seiten & Zweck

| Seite | Pfad | Zweck | Primäres CTA |
|-------|------|-------|-------------|
| Homepage | `/` | Gesamtüberblick, Vertrauen aufbauen, Kontakt generieren | "Jetzt Anfrage senden" |
| Leistungen | `/leistungen` | Detaillierte Leistungsbeschreibung | "Projekt besprechen" |
| Über uns | `/ueber-uns` | Vertrauen, Team, Zertifizierungen, Fuhrpark | "Kontakt aufnehmen" |
| Referenzen | `/referenzen` | Social Proof, Projektbilder | "Ihr Projekt starten" |
| Kontakt | `/kontakt` | Kontaktformular, Telefon, Standort | Formular-Submit |

### Navigation
```
[INVICTA Logo] — Leistungen — Über uns — Referenzen — Kontakt — [CTA Button: Anfrage]
```
- Sticky Nav, transparent über Hero, solid beim Scrollen
- Mobile: Hamburger mit Fullscreen-Overlay (GSAP Reveal)
- Telefonnummer im Header sichtbar (Desktop)

### Homepage — Sektion-für-Sektion

| # | Sektion | Inhalt | Animation |
|---|---------|--------|-----------|
| 1 | **Hero** | Headline + Subline + CTA + Hintergrundbild/Video | Parallax BG, Text fade-in stagger |
| 2 | **Leistungen** (3-4 Karten) | Icon + Titel + Kurztext pro Leistung | ScrollTrigger stagger cards |
| 3 | **Über Invicta** | Kurztext + Bild | Text/Bild split-reveal |
| 4 | **Zahlen** (Counter) | Projekte, Jahre, km Kabel, Mitarbeiter | CountUp Animation |
| 5 | **Referenzen/Logos** | Kundenlogos oder Projektbilder | Horizontal scroll oder Grid |
| 6 | **Zertifizierungen** | SCC, ISO etc. als Badges | Fade-in |
| 7 | **CTA-Banner** | "Ihr nächstes Projekt?" + Kontakt-Button | Parallax Background |
| 8 | **Footer** | Kontakt, Links, Social, Copyright | — |

---

## Content Framework

### Homepage Headlines — 3 Optionen

1. **"Kabelverlegung. Ohne Kompromisse."**
   → Direkt, selbstbewusst, kurz. Passt zum Markennamen Invicta.

2. **"Industrielle Präzision — von Duisburg bis Europa."**
   → Zeigt Reichweite und Anspruch. Lokaler Anker + international.

3. **"Wo Kabel laufen, läuft Ihr Projekt."**
   → Ergebnisorientiert. Fokus auf den Kundennutzen.

**Empfehlung:** Option 1 als H1, Option 2 als Subline.

### Value Proposition Struktur
```
Invicta Kabelverlegung steht für [Kernwert].
Wir [konkreter Service] für [Zielgruppe].
[Differenzierung gegenüber Wettbewerb].
```

→ "Invicta Kabelverlegung steht für industrielle Präzision. Wir verlegen, montieren und demontieren Kabel jeder Art — für Industrie, Gewerbe und Infrastruktur. Mit einem Team, das Qualität nicht verspricht, sondern liefert."

### SEO Keywords (basierend auf Konkurrenz-Ranking)
- Kabelverlegung Duisburg
- Kabelverlegung NRW
- Industrielle Kabelverlegung
- Kabelmontage Duisburg
- Kabelverlegung Deutschland
- SCC-zertifizierte Kabelverlegung
- Kabeldemontage NRW

---

## Conversion Playbook

### Primäres Conversion Goal
**Kontaktanfrage** via Formular oder Telefon

### Lead Capture
- Kontaktformular auf jeder Seite (eingebettet oder CTA zu /kontakt)
- Telefonnummer immer sichtbar (Header + Footer + mobile Sticky-Bar)
- E-Mail als Fallback

### Social Proof Plan
| Element | Platzierung | Priorität |
|---------|-------------|-----------|
| Kundenlogos | Homepage Sektion 5 | Hoch |
| Zertifizierungen (SCC etc.) | Homepage + Über uns | Hoch |
| Projekt-Counter (km, Projekte) | Homepage Sektion 4 | Hoch |
| Testimonials | Über uns oder Referenzen | Mittel |
| Projektbilder | Referenzen-Seite | Mittel |

### Trust Signals Checklist
- [ ] SCC-Zertifizierung Badge
- [ ] Kundenlogos (min. 4-6)
- [ ] Statistiken (Jahre, Projekte, Kilometer)
- [ ] Telefonnummer prominent sichtbar
- [ ] Adresse + Google Maps
- [ ] Impressum + Datenschutz
- [ ] SSL-Zertifikat

---

## Technische Anforderungen

### Stack
- **HTML5** — Semantisch, kein Div-Soup
- **CSS3** — Custom Properties, Grid, Flexbox, keine Frameworks
- **JavaScript** — Vanilla + GSAP/ScrollTrigger
- **Fonts:** Google Fonts (Montserrat + Inter)
- **Build:** Kein Build-Tool nötig für statische Seite

### Performance-Ziele
- Lighthouse Performance: 90+
- Lighthouse Accessibility: 95+
- Lighthouse SEO: 100
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s

### SEO-Minimum
- Unique `<title>` + `<meta description>` pro Seite
- Eine H1 pro Seite
- Schema.org LocalBusiness Markup
- Open Graph + Twitter Cards
- XML Sitemap
- robots.txt
- Canonical URLs
