# Design System — calendario tech

## Brand

- **Name:** calendario tech
- **Mark:** `/logo-calendario-tech.png` (transparent), used in nav, hero, footer, favicon
- **Do not ship:** `bannerCalendario.png`, `historiaCalendariotech.png` (briefing only)

## Color

| Token | Value | Role |
|-------|-------|------|
| `--color-bg` | `#000000` | Page ground |
| `--color-fg` | `#ffffff` | Primary text |
| `--color-muted` | `#b8b8b8` | Secondary text |
| `--color-accent` | `#e60000` | CTAs, icons, emphasis |
| `--color-accent-deep` | `#8a0000` | Atmosphere depth |
| `--color-line` | `rgba(255,255,255,0.18)` | Dividers |

Strategy: restrained — black + white + one red accent.

## Typography

- **Family:** Satoshi (Fontshare), weight 400 / 500 / 700
- **Display:** bold, tight tracking (~-0.03em), lowercase brand voice
- **Body measure:** ~34–42rem for leads

## Components

- **Logo** — sized variants `nav` / `hero` / `footer`
- **Buttons** — primary (red fill), ghost (hairline border); square corners
- **Value strip** — 4 columns, hairline separators, red linear icons (not cards)
- **Pillars** — 3 columns, red hairlines, uppercase labels
- **Embeds** — bordered shells for Luma + Google Form iframes
- **Wave atmosphere** — CSS bar field inspired by logo motif (decorative)

## Motion

1. Hero: logo + copy entrance
2. Value strip / pillars: staggered `whileInView`
3. Event & form sections: fade/slide into view  
Respects `prefers-reduced-motion`.

## Layout

- Sticky nav; hero fills first viewport below nav
- Section rhythm via `--space-8` vertical padding
- Max content width `--max-w: 72rem`

## Visitor mode

Persuade: understand offer → browse Luma events → submit event form.

## UI research pack (2026-08)

Applied from research-ui-component:

- **Marquee** (Magic UI pattern) — `SupportersMarquee` for partner slots
- **Spotlight** (Aceternity-inspired) — red brand spotlight in hero
- **Soft Aurora** — CSS red/black drifting blobs (no purple)
- **BlurText** (React Bits-inspired) — word-by-word blur reveal on hero headline
- **Shared layout** — polished `layoutId="brand-logo"` spring (Motion)

All ported to CSS modules + Motion; no Tailwind added.
