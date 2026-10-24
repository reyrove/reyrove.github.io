# Reyrove — From Fibers to Functions

> Personal portfolio of **Reyhaneh Daneshdoost (Reyrove)** — textile engineer, creative coder, and generative designer building visual systems, digital tools, and computational experiments where material thinking meets code.

Live site: **[reyrove.github.io](https://reyrove.github.io/)**

---

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Adding or Editing Projects](#adding-or-editing-projects)
- [Editing Content](#editing-content)
- [Design System](#design-system)
- [Accessibility](#accessibility)
- [SEO & Structured Data](#seo--structured-data)
- [Performance](#performance)
- [Deployment](#deployment)
- [License & Rights](#license--rights)

---

## About

This is the source for the Reyrove portfolio — a single-page site that collects:

- **Selected work** across creative tools, generative art, AI systems, scientific computing, and digital experiences
- **Tutorials** — video series and written notes on Fortran, LaTeX, JavaScript, typesetting, HTML/CSS and more (Farsi and English)
- **Writing** — online articles and printed magazine features
- **About** — a short timeline from textile engineering to computational/generative practice
- **Contact** — email, social links, and on-chain (Tezos / objkt) collection

The design language is a dark, gold-on-charcoal palette with a woven/thread-inspired SVG logotype, serif display type, monospaced technical labels, and subtle grain — a visual echo of "fibers → functions."

---

## Features

- **Filterable project grid** — filter by Tools, Generative Art, AI Systems, Scientific Computing, Digital Experiences. Projects can carry multiple tags (`tags: "art science"`) and appear under each matching filter.
- **Data-driven rendering** — all projects live in a single `PROJECTS` array in `script.js`. The grid, project numbering, and JSON-LD `ItemList` are generated from it, so content never drifts out of sync.
- **Responsive** across desktop, tablet, and mobile (down to 359 px), with a dedicated mobile nav drawer.
- **Accessible by default** — skip link, focus-visible outlines, `aria-pressed` on filters, live-region filter status announcements, and `prefers-reduced-motion` support throughout.
- **Lightweight** — no framework, no build step. Vanilla HTML, CSS, and JavaScript.
- **SEO-rich** — canonical URL, Open Graph and Twitter Card metadata, `hreflang`, and Schema.org `Person`, `WebSite`, and `ItemList` structured data.
- **Custom SVG logotype** built from woven thread elements with gold gradients.
- **Botpress webchat** integration for live conversation.

---

## Tech Stack

| Layer | Tool |
|---|---|
| Markup | HTML5 |
| Styles | Vanilla CSS (custom properties, `clamp()`, grid/flex) |
| Behavior | Vanilla JavaScript (ES5-compatible syntax, no bundler) |
| Fonts | Playfair Display, Inter, DM Mono (Google Fonts) |
| Icons/Branding | Inline SVG logotype and favicon |
| Chat | Botpress webchat (CDN embed) |
| Hosting | GitHub Pages (static) |

There is **no build pipeline**. Edit the files and push.

---

## Project Structure

```
.
├── index.html          # Page markup, SEO meta, JSON-LD Person/WebSite
├── styles.css          # All styling, design tokens, responsive rules
├── script.js           # PROJECTS data, rendering, filters, nav, reveal, JSON-LD ItemList
├── Reyrove.png         # Hero image (preloaded)
├── Reyrove-og.png      # Open Graph / Twitter card image (1200×630)
├── favicon.svg         # SVG favicon
├── apple-touch-icon.png
├── site.webmanifest
└── images/
    ├── work/           # Project card images
    └── tutorials/      # Tutorial thumbnail images
```

---

## Getting Started

### Locally

Because the page is fully static, you can open `index.html` directly in a browser. For a more accurate preview (fonts, relative paths, lazy loading), serve it:

```bash
# Python 3
python -m http.server 8000

# or Node
npx serve .
```

Then visit `http://localhost:8000`.

### Editing

1. Clone the repo.
2. Make changes to `index.html`, `styles.css`, or `script.js`.
3. Refresh the browser — no rebuild required.

---

## Adding or Editing Projects

All projects live in the `PROJECTS` array near the top of `script.js`. To add one, append an object:

```js
{
  title: "My New<br>Project",
  category: "GENERATIVE ART",
  tags: "art",                      // space-separated filter keys
  visual: "visual-girih",           // CSS background variant class
  image: "images/work/my-project.jpg",
  alt: "My New Project — Reyrove project",
  mark: "MN",                       // 2–3 letter corner mark
  desc: "Short description shown on the card.",
  link: "https://reyrove.github.io/my-project/",
  cta: "VIEW COLLECTION"
}
```

**Field reference**

| Field | Required | Notes |
|---|---|---|
| `title` | ✅ | May contain `<br>` (only `<br>` tags are preserved). |
| `category` | ✅ | Uppercase label, e.g. `TOOLS`, `GENERATIVE ART`. |
| `tags` | ✅ | Space-separated filter keys: `tools`, `art`, `ai`, `science`, `experience`. |
| `visual` | ✅ | One of the visual variants below. |
| `image` | ✅ | Path to card image. |
| `alt` | ✅ | Alt text for the card image. |
| `mark` | ✅ | Short corner mark (2–3 chars). |
| `desc` | ✅ | Card description. |
| `link` | ⚠️ | Omit for private projects. |
| `cta` | ⚠️ | Required unless `private: true`. |
| `private` | — | Set `true` to render a "PRIVATE PROJECT" badge instead of a link. |

**Visual variants** (map to CSS classes in `styles.css`): `visual-thread`, `visual-lucent`, `visual-girih`, `visual-fourier`, `visual-neon`, `visual-science`, `visual-hawk`, `visual-lounge`, `visual-sanctuary`.

> The display number (01, 02, …) is derived from array position. Filtered views intentionally show gaps in numbering — this preserves the project's stable identity across filters.

---

## Editing Content

| What | Where |
|---|---|
| Hero copy, nav links, section headings | `index.html` |
| Tutorials and written notes | `index.html` (static markup) |
| Writing/printed features | `index.html` (static markup) |
| Timeline and about quote | `index.html` (static markup) |
| Contact email and socials | `index.html` |
| SEO metadata, OG/Twitter tags | `<head>` of `index.html` |
| Structured data (Person, WebSite) | `<head>` of `index.html` |
| Structured data (ItemList of projects) | Auto-generated in `script.js` → `initStructuredData()` |
| Colors, spacing, type scale | `:root` tokens in `styles.css` |

---

## Design System

Design tokens are defined as CSS custom properties at the top of `styles.css`:

```css
:root {
  --bg: #0f0e0c;        /* near-black ground */
  --paper: #e9dfcf;     /* warm off-white text */
  --muted: #9d958a;     /* secondary text */
  --gold: #d4b483;      /* primary accent */
  --gold2: #b89a6d;     /* deeper gold */
  --line: rgba(212, 180, 131, 0.18);
  --card: #151311;
  --serif: "Playfair Display", serif;
  --sans: "Inter", sans-serif;
  --mono: "DM Mono", monospace;
  /* fluid spacing scale: --space-xs … --space-2xl */
  /* section rhythm: --section-pad-x / --section-pad-y */
}
```

**Typography**
- **Display / headings** — Playfair Display (serif, italicized `<em>` for emphasis)
- **Body / UI** — Inter
- **Labels, numbers, CTAs** — DM Mono (uppercase, wide letter-spacing)

**Spacing** uses `clamp()` throughout, so layout scales fluidly between breakpoints rather than jumping at fixed widths.

To retheme, change the six color tokens. Everything else follows.

---

## Accessibility

- Skip-to-content link
- Semantic landmarks (`nav`, `main`, `section`, `footer`, `address`)
- Visible focus outlines (`.logo:focus-visible`, `.filter:focus-visible`, `.back-to-top:focus-visible`)
- `aria-pressed` state on filter buttons
- `aria-controls` linking filters to the project container
- `role="status"` live region announcing filter results without flooding screen readers
- `aria-expanded` and dynamic `aria-label` on the mobile menu button
- Keyboard-closable mobile nav (Escape returns focus to the menu button)
- Full `prefers-reduced-motion` support — reveals, smooth scroll, hover transforms, and filter transitions all degrade gracefully
- Decorative visuals (`grain`, `hero-grid`, rotated frames) marked `aria-hidden="true"`
- SVG logotype has `role="img"` with `<title>` and `<desc>`

---

## SEO & Structured Data

- Canonical URL, `hreflang` (en, x-default)
- Open Graph (1200×630 image, type, site name, locale)
- Twitter Card (`summary_large_image`)
- Theme color, color scheme, application name, mobile web app tags
- **Schema.org JSON-LD:**
  - `Person` — name, alternate names, job title, `knowsAbout`, `sameAs` (all social profiles)
  - `WebSite` — linked to the Person as publisher
  - `ItemList` — generated at runtime from `PROJECTS`, so the project catalogue always mirrors the visible grid
- Copyright and rights meta tags

When you add a new project, its URL is automatically included in the `ItemList` JSON-LD. You only need to manually update `sameAs` in the `Person` block if you add a new social profile.

---

## Performance

- Hero image is `<link rel="preload">`ed with `fetchpriority="high"`
- Project and tutorial images use `loading="lazy"` and `decoding="async"`
- Explicit `width`/`height` on hero and tutorial images to prevent layout shift
- Font preconnects to `fonts.googleapis.com` and `fonts.gstatic.com`
- No JS framework, no CSS framework, no build tooling
- Grain texture is an inline SVG data URI (no extra request)
- IntersectionObserver unobserves elements after their reveal fires

---

## Deployment

This site is designed for **GitHub Pages** at `reyrove.github.io`.

To deploy:

1. Push to the `main` branch of your GitHub Pages repo.
2. In **Settings → Pages**, set the source to the `main` branch, root folder.
3. GitHub publishes at `https://reyrove.github.io/` within a minute or two.

For a custom domain, add a `CNAME` file with your domain and update:
- `link rel="canonical"` in `index.html`
- `og:url` and `twitter:*` URLs
- `Person.url`, `WebSite.url`, and `@id` fields in JSON-LD
- `sameAs` remains unchanged unless social handles move

> The Botpress webchat embeds load from `cdn.botpress.cloud` and `files.bpcontent.cloud`. If you fork the site for another use, remove or replace those two `<script>` tags at the bottom of `index.html`.

---

## License & Rights

**© 2026 Reyhaneh Daneshdoost (Reyrove). All rights reserved.**

Reyrove® is a trademark of Reyhaneh Daneshdoost. The logotype, branding, project images, and written content may not be reproduced or redistributed without permission.

The site's **code structure** (HTML/CSS/JS scaffolding) may be studied for learning. If you adapt it for your own portfolio, please:
- Replace all Reyrove branding, imagery, and content
- Remove the trademark references
- Update the copyright meta tags and footer
- Point canonical/OG URLs to your own domain

If you build on this structure, a credit link back is appreciated but not required.

---

**Contact** — [reyhanehdaneshdoost@gmail.com](mailto:reyhanehdaneshdoost@gmail.com)
**GitHub** — [github.com/reyrove](https://github.com/reyrove)
**X** — [@reyrove](https://x.com/reyrove)
**On-chain** — [objkt.com](https://objkt.com/users/tz1RXsijmPeeF1kPyrhd8Hkm2RskJAeU3si5/)