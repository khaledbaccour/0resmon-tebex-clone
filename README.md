# 0RESMON Tebex Homepage — Creative Rebuild

A frontend assignment for **Crux Studio**, rebuilding the [0resmon.tebex.io](https://0resmon.tebex.io/) homepage with personal design improvements and elevated interactions.

## Live Demo

**[https://assignment-xi-self-80.vercel.app](https://assignment-xi-self-80.vercel.app)**

## About This Project

This is **not** a pixel-perfect copy. The original site serves as structural and content reference — the layout, sections, and general dark-theme gaming aesthetic are preserved, but the visual design, animations, and micro-interactions are my own interpretation.

**What I kept from the reference:**
- Content structure and section order
- Dark theme with red accent color palette
- Product data, review data, FAQ content

**Where I applied my own judgment:**
- Animation design (GSAP scroll-triggered entrances, staggered reveals, parallax effects)
- Card treatments, hover states, and interaction patterns
- Typography rhythm and spacing
- Section transitions and visual hierarchy
- FAQ section with categorized groups, filter chips, and accent borders
- Discord CTA with live widget preview and broken-grid layout
- Eel-style animated dragon mascot in the footer

## Tech Stack

| Tool | Purpose |
|------|---------|
| HTML + CSS | Structure and styling |
| Tailwind CSS v4 (CDN) | Utility-first CSS framework |
| Vanilla JavaScript | Interactivity, no frameworks |
| GSAP + ScrollTrigger | Scroll-triggered animations |
| Swiper | Product carousel |
| Font Awesome 7 | Icons |
| Lucide Icons | Additional icons |

No React, Vue, Angular, or other frontend frameworks — as required by the assignment.

## Project Structure

```
assignment/
├── index.html          # Single-page with all sections
├── css/
│   └── styles.css      # Custom CSS beyond Tailwind utilities
├── js/
│   └── main.js         # Animations, carousels, FAQ, countdown, interactions
├── assets/
│   └── images/         # Local image assets
├── README.md
└── CLAUDE.md           # Development notes
```

## Sections

1. Discount banner with countdown timer
2. Sticky navigation bar
3. Hero section with floating 3D logos
4. Top-selling products carousel
5. Customer reviews marquee
6. Why Choose Us feature cards
7. Achievements counter with animated count-up
8. YouTube video thumbnails
9. FAQ with category filtering and search
10. Recent payments ticker
11. Discord CTA
12. Footer with animated mascot
13. Tebex bottom bar

## Running Locally

Just open `index.html` in a browser — no build step required. All dependencies load from CDN.

## Deployment

Deployed on **Vercel** via Git integration.
