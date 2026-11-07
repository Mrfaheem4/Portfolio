# Faheem Ahmed — Portfolio

A responsive personal portfolio built with React and Vite. The design pairs ink blue and deep teal with warm rose and pale mint accents, bold Manrope typography, and shaped imagery. Each section has a distinct solid background. A bright scroll-drawn ribbon starts in a soft, near-white mint green and moves through gold, mint, and sky blue. The supplied paper image adds a faint texture behind the content.

## Development

Use Node.js 22.12 or later and install dependencies with `npm ci`.

```sh
npm run dev
npm run build
npm run preview
npm run lint
```

On Windows, use `npm.cmd` if PowerShell blocks the `npm.ps1` launcher. Production output is written to `dist/`.

## Editing content

- `src/data/projects.js`: project descriptions, images, technologies, and destinations.
- `src/components/Hero.jsx` and `About.jsx`: introduction and biography.
- `src/components/Skills.jsx`: toolkit groups.
- `src/components/Experience.jsx`: internship dates, company logo, and outcomes.
- `src/components/Contact.jsx`: contact details.
- `src/components/ScrollRibbon.jsx`: scroll ribbon, curve spacing, and section colors.
- `src/lib/ribbonPath.js`: broad, rounded ribbon sweeps fitted to section heights.
- `src/lib/useContactReveal.js`: staggered contact headline, arrow entrance, and drawn underline.
- `src/assets/optimized/`: responsive WebP images and the compressed paper texture; original source images are retained.
- `src/tokens.css`: palette, typography, spacing, and ribbon colors.
- `src/base.css`: shared element styles and accessibility defaults.
- `src/index.css`: component styles, animation, and responsive layouts.
- `index.html`: page title, description, and social metadata.

Content is visible immediately. The hero settles into view once, and section headings gently reveal as they enter view. The decorative SVG ribbon draws and retracts with scrolling behind the content, at 60px on desktop and 40px on phones. Text containers stay transparent and images remain above it. Body copy, metadata, lists, and text links use difference blending to change color exactly where the ribbon passes beneath them. Headings, project titles, names, and opaque controls keep their original colors. Selecting body text temporarily suspends its blending so the selection remains readable. The optimized paper texture in `src/assets/optimized/paper.webp` repeats at a fixed scale on a faint screen-blended background layer below the ribbon and content; its strength is controlled by `--texture-opacity`. The sections retain separate solid colors. Project screenshots use their natural proportions with no padded mounts or rounded frames, and toolkit labels share a blue surface. Responsive WebP images reduce downloads on phones; the portrait and texture preload from the document head. The contact section blends into the preceding section and reveals its headline, arrow, underline, and supporting copy on entry, with a static presentation for reduced motion. The ribbon recalculates when the layout resizes and becomes complete and static for reduced-motion preferences. Smooth scrolling, text reveals, and hover transitions also honor reduced motion. Navigation includes a mobile disclosure menu, Escape-key focus restoration, keyboard focus styles, and a skip link.

Google Fonts are optional external resources; local system font fallbacks remain available. Styling uses plain CSS, and the ribbon uses native SVG and browser APIs without animation dependencies.

## Before deployment

Run the build and lint commands. Check desktop and mobile layouts in a browser, including mobile navigation, keyboard focus, zoom, and project links. If deploying under a subdirectory, configure Vite’s `base` and the favicon path for that location. Add the final public URL and a social preview image to the metadata when a deployment domain is selected.
