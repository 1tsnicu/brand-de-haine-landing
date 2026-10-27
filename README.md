# QUIET HOURS — Streetwear Landing Page

> *"Wear it after dark."*
> Dark urban casual / Seoul night streetwear.

## Running the Application

```bash
npm install
npm run dev      # starts dev server at http://localhost:3000
npm run build    # production build (requires network access to download Google Fonts)
npm run lint     # ESLint check
```

---

## Tech Stack

| Tool | Purpose |
| :--- | :--- |
| **Next.js 16** (App Router, Turbopack) | Framework, SSR/SSG, image & font pipelines |
| **React 19 + TypeScript** (strict) | Component model, type safety |
| **Tailwind CSS v4** | Design token system, zero scattered hex values |
| **GSAP + ScrollTrigger** | Cursor flashlight (quickTo), Verlet physics, scroll reveals |
| **Framer Motion** | Isolated exclusively to Radix UI dialog transitions |
| **Zustand** | Client cart store (mock, no real checkout) |
| **Radix UI Dialog** | Accessible Cart Drawer + Quick-View Modal |
| **next/font** | Zero-layout-shift font loading (Unbounded, IBM Plex Mono, Inter) |

---

## Folder Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, fonts, grain overlay, vignette
│   ├── page.tsx            # Main page orchestrator (all 9 sections)
│   └── globals.css         # Tailwind @theme tokens, base resets, 3D utilities
├── config/
│   └── brand.ts            # Brand name, tagline, nav, timezone — single rename point
├── data/
│   ├── products.ts         # 7 typed products (EUR prices, sizes, mono codes)
│   └── lookbook.ts         # 8 editorial lookbook plates with grid spans
├── store/
│   └── useCartStore.ts     # Zustand cart: items, drawer, quick-view state
├── hooks/
│   ├── useReducedMotion.ts # prefers-reduced-motion listener
│   ├── useLiveClock.ts     # 1-second interval clock, timezone-aware
│   └── useSoundEffect.ts   # Web Audio shutter + switch sounds (muted by default)
├── lib/
│   └── utils.ts            # cn() classnames helper + EUR currency formatter
├── components/
│   ├── ui/                 # Atomic primitives
│   │   ├── Button.tsx      # primary / secondary / outline / ghost variants
│   │   ├── Badge.tsx       # Small mono tag (bordo / subtle / default)
│   │   ├── GrainOverlay.tsx# Fixed 4.5% SVG noise overlay, pointer-events-none
│   │   ├── Icons.tsx       # Bespoke handcrafted SVG icons (no icon pack)
│   │   └── Ticker.tsx      # Continuous marquee announcement bar
│   ├── hero/               # Interactive hero ("The Hook Rail") subsystem
│   │   ├── HeroScene.tsx   # Main orchestrator: GSAP quickTo, parallax, state
│   │   ├── HookRail.tsx    # Slim matte metal rail with cast pegs
│   │   ├── FlashlightMask.tsx  # Cursor radial spotlight + ambient oxblood glow
│   │   ├── EarbudsCable.tsx    # Verlet particle chain SVG, off-screen pause
│   │   ├── CameraObject.tsx    # LED blink, flash overlay, shutter sound trigger
│   │   ├── PhotocardObject.tsx # 3D CSS flip with live countdown to drop date
│   │   ├── GarmentObject.tsx   # Hover lift + mono label + quick-view trigger
│   │   ├── LightSwitch.tsx     # Pull-chain toggle, ambient glow switch
│   │   └── HeroWordmark.tsx    # Viewport-cropped QUIET HOURS with parallax
│   ├── sections/           # Page sections (top to bottom)
│   │   ├── Header.tsx      # Sticky transparent nav, live clock, cart badge
│   │   ├── Manifesto.tsx   # GSAP blur + y reveal on scroll
│   │   ├── DropGrid.tsx    # Product grid: pinned photos, rotation, hover-swap
│   │   ├── LookbookGrid.tsx# Asymmetric collage grid with grid-span overrides
│   │   ├── Materials.tsx   # Technical specifications on asphalt cards
│   │   ├── PhotocardSlide.tsx  # Scroll-triggered card sliding out of pocket
│   │   ├── Newsletter.tsx  # Email input, validation, success/error states
│   │   └── Footer.tsx      # Logo, links, dual live clocks (Chișinău + Seoul)
│   └── shop/
│       ├── CartDrawer.tsx  # Radix Dialog + Framer Motion slide-in bag
│       └── QuickViewModal.tsx  # Radix Dialog product inspection modal
```

---

## Design System Tokens

All in `src/app/globals.css` under `@theme`:

| Token | Hex | Role |
| :--- | :--- | :--- |
| `carbon` | `#0B0C0E` | Main background (~90% of visual mass) |
| `asphalt` | `#1A1C1F` | Cards, elevated surfaces, sticky header |
| `fog` | `#D9D6CE` | Primary text (warm off-white, not pure white) |
| `denim` | `#4A5A70` | Cold architectural accent |
| `concrete` | `#7C8083` | Secondary text, hairline borders |
| `bordo` | `#6B1427` | Sole warm accent (~10%), button fill, LED, glow |
| `oxblood` | `#2E0A12` | Ambient glow mesh, vignette gradients |
| `bordo-light` | `#A02A3E` | Hover states, small high-contrast text |

**Rules:** Bordo is only used as a fill with `fog` text. Never as small text directly on `carbon`. Never use orange.

---

## Recommended Production Asset Specifications

> Replace any placeholder by dropping files at the exact paths below — no code changes needed.

### Hero Objects — `public/assets/hero/`

| File | Size | Format | Notes |
| :--- | :--- | :--- | :--- |
| `wall-bg.webp` | 2560×1440 | WebP | Smooth matte black/concrete wall texture |
| `jacket.png` | 800×1100 | Transparent PNG | Washed denim jacket hanging on hook, no model |
| `camera.png` | 480×700 | Transparent PNG | Silver compact digicam with braided olive strap |
| `earbuds.png` | 360×600 | Transparent PNG | White wired earbuds, cable pooling down |
| `cap.png` | 500×420 | Transparent PNG | Washed gray denim cap on hook |
| `photocard-front.png` | 400×600 | Transparent PNG | B&W silver halide photograph with white card border |
| `photocard-back.png` | 400×600 | Transparent PNG | Dark reverse with barcode, coordinates, serial |

### Products — `public/assets/products/`

| File Pattern | Size | Format | Notes |
| :--- | :--- | :--- | :--- |
| `{slug}-1.webp` | 1200×1500 | WebP | Primary object-only flatlay on dark surface |
| `{slug}-2.webp` | 1200×1500 | WebP | Macro: stitching, hardware, label, zipper teeth |

Slugs: `platform-jacket`, `night-shell-parka`, `static-tee`, `hook-hoodie`, `transit-trousers`, `dusk-cap`, `pocket-set`

### Lookbook — `public/assets/lookbook/`

| File | Size | Format | Notes |
| :--- | :--- | :--- | :--- |
| `01.webp` – `08.webp` | 1200×1500 | WebP | Nocturnal editorial plates, object-only, no models |

---

## Accessibility Checklist

- All interactive elements have visible `focus-visible` outlines in `bordo`
- Hero objects use `role="button"`, `tabIndex={0}`, `aria-label` with full descriptions
- Light switch uses `role="switch"` with `aria-checked`
- Cart drawer uses Radix Dialog with focus trap and `aria-label`
- Quick-view modal has `Dialog.Title` for screen reader heading
- Newsletter has `aria-invalid`, `aria-describedby` for error state
- `prefers-reduced-motion` disables physics, parallax, and flash; static layout preserved
- Color contrast: `fog` on `carbon` ≈ 13.8:1 · `fog` on `bordo` ≈ 5.2:1

---

## Performance Targets

- Hero wall background: `priority` preload, `100vw` sizes
- Hero objects: `priority` preload, tight `sizes` attribute
- Product/lookbook images: lazy-loaded below fold
- GSAP ScrollTrigger: reverted on unmount via `gsap.context().revert()`
- Verlet physics loop: paused via `IntersectionObserver` when hero out of view
- Web Audio Context: lazily instantiated on first user gesture
- Fonts: self-hosted via `next/font`, preloaded as `woff2`, zero FOUT

---

## Renaming the Brand

Everything derives from [`src/config/brand.ts`](file:///home/ganenconicoleta/Documents/brand-de-haine-landing/src/config/brand.ts). Changing `name`, `shortName`, `tagline`, `primaryCity`, or `timezone` there propagates automatically throughout the entire application.
