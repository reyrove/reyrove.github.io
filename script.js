/* =========================================================
   REYROVE — script.js
   Project data + rendering, filters, nav, reveal, back-to-top,
   structured-data generation.
   ========================================================= */

'use strict';

/* =========================================================
   1. PROJECT DATA
   ---------------------------------------------------------
   Projects are grouped by category for readability. The
   displayed index (01, 02, …) is derived from the array
   position, so filtered views will show gaps in numbering
   (e.g. Tools = 01–09, Generative Art starts at 10). That
   is intentional.

   `tags` is a space-separated list of filter keys, e.g.
     tags: "art"
     tags: "art science"   ← matches BOTH filters
   The filter logic splits on whitespace, so multi-tag
   entries work without extra bookkeeping.
   ========================================================= */

const PROJECTS = [
  /* ---------- TOOLS ---------- */
  {
    title: "Textile Quote<br>Generator",
    category: "TOOLS",
    tags: "tools",
    visual: "visual-thread",
    image: "images/work/textile-quote-generator.jpg",
    alt: "Textile Quote Generator — Reyrove project",
    mark: "TQ",
    desc: "Generates textile-related quotes and wisdom.",
    link: "https://reyrove.github.io/textile-quote-generator",
    cta: "VIEW PROJECT"
  },
  {
    title: "Textile<br>Calculator",
    category: "TOOLS",
    tags: "tools",
    visual: "visual-thread",
    image: "images/work/textile-calculator.jpg",
    alt: "Textile Calculator — Reyrove project",
    mark: "TC",
    desc: "Useful calculations for textile engineering workflows.",
    link: "https://reyrove.github.io/textile-calculator",
    cta: "VIEW PROJECT"
  },
  {
    title: "Yarn Twist<br>Visualizer",
    category: "TOOLS",
    tags: "tools",
    visual: "visual-thread",
    image: "images/work/yarn-twist-visualizer.jpg",
    alt: "Yarn Twist Visualizer — Reyrove project",
    mark: "YT",
    desc: "Visualizes yarn twist direction and textile structure.",
    link: "https://reyrove.github.io/yarn-twist-visualizer",
    cta: "VIEW PROJECT"
  },
  {
    title: "Palindrome<br>Checker",
    category: "TOOLS",
    tags: "tools",
    visual: "visual-lucent",
    image: "images/work/palindrome-checker.jpg",
    alt: "Palindrome Checker — Reyrove project",
    mark: "PC",
    desc: "Classic freeCodeCamp palindrome checker.",
    link: "https://reyrove.github.io/palindrome-checker",
    cta: "VIEW PROJECT"
  },
  {
    title: "Cash Register",
    category: "TOOLS",
    tags: "tools",
    visual: "visual-lucent",
    image: "images/work/cash-register.jpg",
    alt: "Cash Register — Reyrove project",
    mark: "CR",
    desc: "Cash register simulation with change calculation.",
    link: "https://reyrove.github.io/cash-register",
    cta: "VIEW PROJECT"
  },
  {
    title: "Roman Numeral<br>Converter",
    category: "TOOLS",
    tags: "tools",
    visual: "visual-lucent",
    image: "images/work/roman-numeral-converter.jpg",
    alt: "Roman Numeral Converter — Reyrove project",
    mark: "RN",
    desc: "Convert numbers to Roman numerals.",
    link: "https://reyrove.github.io/roman-numeral-converter",
    cta: "VIEW PROJECT"
  },
  {
    title: "Telephone<br>Number Validator",
    category: "TOOLS",
    tags: "tools",
    visual: "visual-lucent",
    image: "images/work/telephone-number-validator.jpg",
    alt: "Telephone Number Validator — Reyrove project",
    mark: "TV",
    desc: "US telephone number validation logic.",
    link: "https://reyrove.github.io/telephone-number-validator",
    cta: "VIEW PROJECT"
  },
  {
    title: "Lucent<br>VS Code Theme",
    category: "TOOLS",
    tags: "tools",
    visual: "visual-lucent",
    image: "images/work/lucent-vscode-theme.jpg",
    alt: "Lucent VS Code Theme — Reyrove project",
    mark: "LU",
    desc: "A luminous coding environment inspired by textiles, generative art and glowing structures.",
    link: "https://marketplace.visualstudio.com/items?itemName=Reyrove.lucent",
    cta: "VIEW PROJECT"
  },
  {
    title: "Social Media<br>Banners",
    category: "TOOLS",
    tags: "tools",
    visual: "visual-lucent",
    image: "images/work/Social Media Banners.jpg",
    alt: "Social Media Banners — Reyrove project",
    mark: "SM",
    desc: "Custom social media banner designs for Reyrove.",
    link: "https://reyrove.github.io/social-media-banners",
    cta: "VIEW PROJECT"
  },

  /* ---------- GENERATIVE ART ---------- */
  {
    title: "Girih 1",
    category: "MOTIF × FASHION",
    tags: "art",
    visual: "visual-girih",
    image: "images/work/Girih 1.jpg",
    alt: "Girih 1 — Reyrove project",
    mark: "G1",
    desc: "Islamic geometry as a source for textile prints, shawl patterns and surface design.",
    link: "https://reyrove.github.io/Girih-1-Generative-Art/",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Fourier 1",
    category: "TEXTURE × FASHION",
    tags: "art",
    visual: "visual-fourier",
    image: "images/work/Fourier 1.jpg",
    alt: "Fourier 1 — Reyrove project",
    mark: "F1",
    desc: "Mathematical waves translated into textile textures and woven surface rhythms.",
    link: "https://reyrove.github.io/Fourier-1-Generative-Art/",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Fourier 2",
    category: "TEXTURE × FASHION",
    tags: "art",
    visual: "visual-fourier",
    image: "images/work/Fourier 2.jpg",
    alt: "Fourier 2 — Reyrove project",
    mark: "F2",
    desc: "Second series of wave-based patterns exploring rhythm, repetition and fabric texture.",
    link: "https://reyrove.github.io/Fourier-2-Generative-Art/",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Digital<br>Pollen",
    category: "SURFACE × FASHION",
    tags: "art",
    visual: "visual-fourier",
    image: "images/work/Digital Pollen.jpg",
    alt: "Digital Pollen — Reyrove project",
    mark: "DP",
    desc: "Scattered particles as inspiration for light, translucent fabric prints.",
    link: "https://reyrove.github.io/Digital-Pollen-Generative-Art/",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Arachne",
    category: "TEXTILE × FASHION",
    tags: "art",
    visual: "visual-thread",
    image: "images/work/Arachne.jpg",
    alt: "Arachne — Reyrove project",
    mark: "AR",
    desc: "Web-like structures inspired by lace, tulle and open-weave fabrics.",
    link: "https://reyrove.github.io/Arachne-Generative-Art/",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Triangulum",
    category: "PATTERN × FASHION",
    tags: "art",
    visual: "visual-girih",
    image: "images/work/Triangulum.jpg",
    alt: "Triangulum — Reyrove project",
    mark: "TRI",
    desc: "Triangular tessellations as textile patterns and cut-and-sew garment structures.",
    link: "https://reyrove.github.io/Triangulum-Generative-Art/",
    cta: "VIEW COLLECTION"
  },
  {
    title: "The Syntax<br>of Taste",
    category: "CONCEPT × FASHION",
    tags: "art",
    visual: "visual-lucent",
    image: "images/work/The Syntax of Taste.jpg",
    alt: "The Syntax of Taste — Reyrove project",
    mark: "ST",
    desc: "Translating sensation into visual language for conceptual fashion storytelling.",
    link: "https://reyrove.github.io/The-Syntax-of-Taste-Generative-Art/",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Spirograph",
    category: "MOTIF × FASHION",
    tags: "art",
    visual: "visual-fourier",
    image: "images/work/Spirograph.jpg",
    alt: "Spirograph — Reyrove project",
    mark: "SP",
    desc: "Spirographic curves as ornamental motifs for embroidery and print.",
    link: "https://reyrove.github.io/Spirograph-Generative-Art/",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Spectrum<br>Dance",
    category: "COLOR × FASHION",
    tags: "art",
    visual: "visual-neon",
    image: "images/work/Spectrum Dance.jpg",
    alt: "Spectrum Dance — Reyrove project",
    mark: "SD",
    desc: "Color choreography as inspiration for fashion palettes and seasonal collections.",
    link: "https://reyrove.github.io/Spectrum-Dance-Generative-Art/",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Socialism<br>of Shapes",
    category: "GEOMETRY × FASHION",
    tags: "art",
    visual: "visual-girih",
    image: "images/work/Socialism of Shapes.jpg",
    alt: "Socialism of Shapes — Reyrove project",
    mark: "SH",
    desc: "Repetition and collective geometry as pattern systems for textile design.",
    link: "https://reyrove.github.io/Socialism-of-Shapes-Generative-Art/",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Pool<br>Wind Sun",
    category: "ATMOSPHERE × FASHION",
    tags: "art",
    visual: "visual-thread",
    image: "images/work/Pool Wind Sun.jpg",
    alt: "Pool Wind Sun — Reyrove project",
    mark: "PW",
    desc: "Light, wind and water as mood boards for resort and summer collections.",
    link: "https://reyrove.github.io/Pool-Wind-Sun-Generative-Art/",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Polite Brownian<br>Motion",
    category: "MOVEMENT × FASHION",
    tags: "art",
    visual: "visual-fourier",
    image: "images/work/Polite Brownian Motion.jpg",
    alt: "Polite Brownian Motion — Reyrove project",
    mark: "PB",
    desc: "Random walks as inspiration for drape, flow and unstructured silhouettes.",
    link: "https://reyrove.github.io/Polite-Brownian-Motion-Generative-Art/",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Pappus",
    category: "ORNAMENT × FASHION",
    tags: "art",
    visual: "visual-girih",
    image: "images/work/Pappus.jpg",
    alt: "Pappus — Reyrove project",
    mark: "PP",
    desc: "Pappus chains as ornamental geometry for embroidery and appliqué.",
    link: "https://reyrove.github.io/Pappus-Generative-Art/",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Game of Seeds",
    category: "CELLULAR AUTOMATON × PATTERN",
    tags: "art",
    visual: "visual-girih",
    image: "images/work/Game-of-Seeds.png",
    alt: "Game of Seeds — Reyrove project",
    mark: "GS",
    desc: "Seed-based generative cellular automaton — a custom 3-cell rule iterated over 30–2030 steps, drawn as glowing dots on a dark ground.",
    link: "https://reyrove.github.io/Game-of-Seeds-Generative-Art/",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Generative Lifeform",
    category: "NETWORK × ORGANIC FORM",
    tags: "art",
    visual: "visual-girih",
    image: "images/work/Generative-Life-form.png",
    alt: "Generative Lifeform — Reyrove project",
    mark: "GF",
    desc: "Seed-based generative networks — glowing nodes and branches in radial, network, and cellular modes.",
    link: "https://reyrove.github.io/Generative-Lifeform-Generative-Art/",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Recursive Grid",
    category: "SUBDIVISION × COLOUR",
    tags: "art",
    visual: "visual-girih",
    image: "images/work/Recursive-Grid.png",
    alt: "Recursive Grid — Reyrove project",
    mark: "RG",
    desc: "Seed-based generative recursive subdivision — a canvas split three levels deep with jitter and saturated colour.",
    link: "https://reyrove.github.io/Recursive-Grid-Generative-Art/",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Organic Shapes",
    category: "FORM × TEXTILE",
    tags: "art",
    visual: "visual-girih",
    image: "images/work/Organic-Shapes.png",
    alt: "Organic Shapes — Reyrove project",
    mark: "OS",
    desc: "Seed-based generative petal forms — a 6 × 6 grid of layered organic shapes in five curated palettes.",
    link: "https://reyrove.github.io/Organic-Shapes-Generative-Art/",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Matrix Rain",
    category: "DIGITAL RAIN × TERMINAL",
    tags: "art",
    visual: "visual-girih",
    image: "images/work/Matrix-Rain.png",
    alt: "Matrix Rain — Reyrove project",
    mark: "MX",
    desc: "Seed-based generative digital rain — 100 × 100 tiled streams in six styles and six terminal palettes.",
    link: "https://reyrove.github.io/Matrix-Rain-Generative-Art/",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Japanese Patterns",
    category: "ORNAMENT × TEXTILE",
    tags: "art",
    visual: "visual-girih",
    image: "images/work/Japanese-Patterns.png",
    alt: "Japanese Patterns — Reyrove project",
    mark: "JP",
    desc: "Seed-based generative Japanese motifs — eight traditional patterns tiled at 60 × 60 in six soft palettes.",
    link: "https://reyrove.github.io/Japanese-Patterns-Generative-Art/",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Layered Diagram",
    category: "LINEWORK × DIAGRAM",
    tags: "art",
    visual: "visual-girih",
    image: "images/work/Layered-Diagram.png",
    alt: "Layered Diagram — Reyrove project",
    mark: "LD",
    desc: "Seed-based generative linework — a grid, organic random-walk curves, and concentric circles layered in black on white.",
    link: "https://reyrove.github.io/Layered-Diagram-Generative-Art/",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Deconstructed Stage",
    category: "SUPREMATISM × GEOMETRY",
    tags: "art",
    visual: "visual-girih",
    image: "images/work/Deconstructed-Stage.png",
    alt: "Deconstructed Stage — Reyrove project",
    mark: "DS",
    desc: "Seed-based generative Suprematist planes — a 2–3 grid of sheared quadrilaterals in red, blue, yellow, black.",
    link: "https://reyrove.github.io/Deconstructed-Stage-Generative-Art/",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Framed Line",
    category: "GESTURE × LINE",
    tags: "art",
    visual: "visual-girih",
    image: "images/work/Framed-Line.png",
    alt: "Framed Line — Reyrove project",
    mark: "FL",
    desc: "Seed-based generative gesture — scattered points connected by curvy Bézier lines with gradient hue and weight.",
    link: "https://reyrove.github.io/Framed-Line-Generative-Art/",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Food Grid",
    category: "ILLUSTRATION × TEXTILE",
    tags: "art",
    visual: "visual-girih",
    image: "images/work/Food-Grid.png",
    alt: "Food Grid — Reyrove project",
    mark: "FG",
    desc: "Seed-based generative illustration — a 16 × 16 grid of small foods in a per-seed harmonic palette.",
    link: "https://reyrove.github.io/Food-Grid-Generative-Art/",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Wandering Tiles",
    category: "LINE × PARITY RULE",
    tags: "art",
    visual: "visual-girih",
    image: "images/work/Wandering-Tiles.png",
    alt: "Wandering Tiles — Reyrove project",
    mark: "WT",
    desc: "Seed-based generative line studies — a grid of wandering curves driven by a parity rule.",
    link: "https://reyrove.github.io/Wandering-Tiles-Generative-Art/",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Wallpaper Groups",
    category: "SYMMETRY × TESSELLATION",
    tags: "art",
    visual: "visual-girih",
    image: "images/work/Wallpaper-Groups.png",
    alt: "Wallpaper Groups — Reyrove project",
    mark: "WG",
    desc: "Seed-based generative wallpaper groups — all 17 crystallographic symmetries tiled as patterns.",
    link: "https://reyrove.github.io/Wallpaper-Groups-Generative-Art/",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Order to Chaos",
    category: "GRADIENT × SURFACE",
    tags: "art",
    visual: "visual-girih",
    image: "images/work/Order-to-Chaos.png",
    alt: "Order to Chaos — Reyrove project",
    mark: "OC",
    desc: "Seed-based generative gradient — an 80 × 80 grid drifting from order to chaos, in harmonic palettes.",
    link: "https://reyrove.github.io/Order-to-Chaos-Generative-Art/",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Gothic Grid",
    category: "MOSAIC × RADIAL FIELD",
    tags: "art",
    visual: "visual-girih",
    image: "images/work/Gothic-Grid.png",
    alt: "Gothic Grid — Reyrove project",
    mark: "GG",
    desc: "Seed-based generative mosaic — an 80 × 80 grid of lit and dark cells decided by a radial threshold field, in gothic palettes.",
    link: "https://reyrove.github.io/Gothic-Grid-Generative-Art/",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Girih 2",
    category: "ISLAMIC GEOMETRY × TESSELLATION",
    tags: "art",
    visual: "visual-girih",
    image: "images/work/Girih-2.png",
    alt: "Girih 2 — Reyrove project",
    mark: "G2",
    desc: "Seed-based generative Islamic geometry — three historic girih patterns drawn over a recursive tree, in historic CSS colour palettes.",
    link: "https://reyrove.github.io/Girih-2-Generative-Art/",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Portrait Series",
    category: "PORTRAIT × CHARACTER",
    tags: "art",
    visual: "visual-girih",
    image: "images/work/Portrait-Series.png",
    alt: "Portrait Series — Reyrove project",
    mark: "PS",
    desc: "Seed-based generative portrait system — infinite faces from a single number, with variable skin, hair, eyes, freckles, accessories, and lighting.",
    link: "https://reyrove.github.io/Portrait-Series-Generative-Art/",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Quilt",
    category: "BLOCKS × GEOMETRY",
    tags: "art",
    visual: "visual-girih",
    image: "images/work/Quilt.png",
    alt: "Quilt — Reyrove project",
    mark: "QU",
    desc: "Seed-based system of rotated blocks — twelve to twenty-one cells, each holding a tilted square, occasionally nested inside a second.",
    link: "https://reyrove.github.io/Quilt-Generative-Art/",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Source",
    category: "CODE × SELF-REFERENCE",
    tags: "art",
    visual: "visual-girih",
    image: "images/work/Source.png",
    alt: "Source — Reyrove project",
    mark: "SR",
    desc: "Seed-based system that renders its own code — an array of source lines drawn as monospace text over mirrored wild ellipses and a radial glow stack.",
    link: "https://reyrove.github.io/Source-Generative-Art/",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Corolla",
    category: "PETALS × SPECTRUM",
    tags: "art",
    visual: "visual-girih",
    image: "images/work/Corolla.png",
    alt: "Corolla — Reyrove project",
    mark: "CO",
    desc: "Seed-based system of layered petals — smooth, spiky and dashed rings accumulating around a radius, tinted from the spectrum over a dark ground.",
    link: "https://reyrove.github.io/Corolla-Generative-Art/",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Mosaic Field",
    category: "THRESHOLD × TILES",
    tags: "art",
    visual: "visual-girih",
    image: "images/work/Mosaic-Field.png",
    alt: "Mosaic Field — Reyrove project",
    mark: "MF",
    desc: "Seed-based system of thresholded tiles — an 80 × 80 grid filled by waves, checkers, blobs, rings, dots or swirls, then masked into shape.",
    link: "https://reyrove.github.io/Mosaic-Field-Generative-Art/",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Skyline Series",
    category: "CITYSCAPE × PATTERN",
    tags: "art",
    visual: "visual-girih",
    image: "images/work/Skyline-Series.png",
    alt: "Skyline Series — Reyrove project",
    mark: "SK",
    desc: "Seed-based system of eight themed cityscapes — buildings with gridded facades, lit windows, spires, and a scatter of stars.",
    link: "https://reyrove.github.io/Skyline-Series-Generative-Art/",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Lattice Field",
    category: "NODES × THREADS",
    tags: "art",
    visual: "visual-girih",
    image: "images/work/Lattice-Field.png",
    alt: "Lattice Field — Reyrove project",
    mark: "LF",
    desc: "Seed-based system of nodes and threads — a 12 × 12 grid drawn as concentric dots, quiet blocks, and connective lines that weave adjacent cells.",
    link: "https://reyrove.github.io/Lattice-Field-Generative-Art/",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Battle Field",
    category: "TWO-FORCE × PATTERN",
    tags: "art",
    visual: "visual-girih",
    image: "images/work/Battle-Field.png",
    alt: "Battle Field — Reyrove project",
    mark: "BF",
    desc: "Seed-based two-force system — yellow and black resolved across checkerboard, wavefront and concentric battlefields.",
    link: "https://reyrove.github.io/Battle-Field-Generative-Art/",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Genuary Word",
    category: "TYPOGRAPHY × PIXEL GRID",
    tags: "art",
    visual: "visual-girih",
    image: "images/work/Genuary-Word.png",
    alt: "Genuary Word — Reyrove project",
    mark: "GW",
    desc: "Seed-based generative system for pixel-grid letterform compositions — a reproducible catalogue of computational typographic studies.",
    link: "https://reyrove.github.io/Genuary-Word-Generative-Art/",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Gradient Grid",
    category: "COLOUR × FIELD",
    tags: "art",
    visual: "visual-girih",
    image: "images/work/Gradient-Grid.png",
    alt: "Gradient Grid — Reyrove project",
    mark: "GD",
    desc: "Seed-based generative system for noisy gradient field compositions — a reproducible catalogue of computational colour studies.",
    link: "https://reyrove.github.io/Gradient-Grid-Generative-Art/",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Fibonacci Circles",
    category: "SERIES × ELLIPSE RINGS",
    tags: "art",
    visual: "visual-girih",
    image: "images/work/Fibonacci-Circles.png",
    alt: "Fibonacci Circles — Reyrove project",
    mark: "FC",
    desc: "Seed-based generative system for Fibonacci-scaled ellipse ring compositions — a reproducible catalogue of computational series studies.",
    link: "https://reyrove.github.io/Fibonacci-Circles-Generative-Art/",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Neon Arcade",
    category: "NEON × LIGHT",
    tags: "art",
    visual: "visual-girih",
    image: "images/work/Neon-Arcade.png",
    alt: "Neon Arcade — Reyrove project",
    mark: "NA",
    desc: "Layered light, seeded — a generative catalogue of wobbling neon arcs, starfields, and lens flares for textile, print, and surface design.",
    link: "https://reyrove.github.io/Neon-Arcade-Generative-Art/",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Squares in Hue",
    category: "HUE × GRID",
    tags: "art",
    visual: "visual-girih",
    image: "images/work/Squares-in-Hue.png",
    alt: "Squares in Hue — Reyrove project",
    mark: "SU",
    desc: "Seed-based generative system for monochromatic square grid compositions — a reproducible catalogue of computational hue studies.",
    link: "https://reyrove.github.io/Squares-in-Hue-Generative-Art/",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Neon Drift",
    category: "AESTHETIC × FASHION",
    tags: "art",
    visual: "visual-neon",
    image: "images/work/Neon Drift.jpg",
    alt: "Neon Drift — Reyrove project",
    mark: "ND",
    desc: "Neon lines as inspiration for streetwear, techno-fashion and nightwear.",
    link: "https://reyrove.github.io/Neon-Drift-Generative-Art/",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Nebula Knight",
    category: "PRINT × FASHION",
    tags: "art",
    visual: "visual-lucent",
    image: "images/work/Nebula Knight.jpg",
    alt: "Nebula Knight — Reyrove project",
    mark: "NK",
    desc: "Cosmic forms as inspiration for celestial prints and evening-wear surfaces.",
    link: "https://reyrove.github.io/Nebula-Knight-Generative-Art/",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Maze of Life",
    category: "SURFACE × FASHION",
    tags: "art",
    visual: "visual-girih",
    image: "images/work/Maze of Life.jpg",
    alt: "Maze of Life — Reyrove project",
    mark: "ML",
    desc: "Labyrinthine structures as texture and surface design for fabric.",
    link: "https://reyrove.github.io/Maze-of-Life-Generative-Art/",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Mad Rooms",
    category: "FORM × FASHION",
    tags: "art",
    visual: "visual-science",
    image: "images/work/Mad Rooms.jpg",
    alt: "Mad Rooms — Reyrove project",
    mark: "MD",
    desc: "Architectural forms as inspiration for structured garments and tailoring.",
    link: "https://reyrove.github.io/Mad-Rooms-Generative-Art/",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Hilbert Pulse",
    category: "RHYTHM × FASHION",
    tags: "art",
    visual: "visual-fourier",
    image: "images/work/Hilbert Pulse.jpg",
    alt: "Hilbert Pulse — Reyrove project",
    mark: "HP",
    desc: "Hilbert curves and pulses as rhythmic pattern systems for textile.",
    link: "https://reyrove.github.io/Hilbert-Pulse-Generative-Art/",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Harmonic<br>Eccentricity",
    category: "MOTION × FASHION",
    tags: "art",
    visual: "visual-thread",
    image: "images/work/Harmonic Eccentricity.jpg",
    alt: "Harmonic Eccentricity — Reyrove project",
    mark: "HE",
    desc: "Harmonic motion as inspiration for movement, flow and kinetic fabric.",
    link: "https://reyrove.github.io/Harmonic-Eccentricity-Generative-Art/",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Hank",
    category: "CHARACTER × FASHION",
    tags: "art",
    visual: "visual-lucent",
    image: "images/work/Hank.jpg",
    alt: "Hank — Reyrove project",
    mark: "HK",
    desc: "Minimal generative character study with fashion illustration potential.",
    link: "https://reyrove.github.io/Hank-Generative-Art/",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Game of Life",
    category: "SYSTEM × FASHION",
    tags: "art",
    visual: "visual-science",
    image: "images/work/Game Of Life.jpg",
    alt: "Game of Life — Reyrove project",
    mark: "GO",
    desc: "Cellular automata as a system for evolving print and pattern design.",
    link: "https://reyrove.github.io/Game-of-Life-Generative-Art/",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Fixed Wave",
    category: "WAVE × FASHION",
    tags: "art",
    visual: "visual-neon",
    image: "images/work/Fixed Wave.jpg",
    alt: "Fixed Wave — Reyrove project",
    mark: "FW",
    desc: "Standing waves as inspiration for pleating, ruffles and structured fabric.",
    link: "https://reyrove.github.io/Fixed-Wave-Generative-Art",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Enigma Sudoku",
    category: "GRID × FASHION",
    tags: "art",
    visual: "visual-girih",
    image: "images/work/Enigma Sudoku.jpg",
    alt: "Enigma Sudoku — Reyrove project",
    mark: "ES",
    desc: "Grid logic as inspiration for structured pattern grids in textile design.",
    link: "https://reyrove.github.io/Enigma-Sudoku-Generative-Art",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Fibonacci<br>Fourier",
    category: "STRUCTURE × FASHION",
    tags: "art",
    visual: "visual-fourier",
    image: "images/work/Fibonacci Fourier.jpg",
    alt: "Fibonacci Fourier — Reyrove project",
    mark: "FF",
    desc: "Fibonacci and Fourier as structural inspiration for woven and knit design.",
    link: "https://reyrove.github.io/Fibonacci-Fourier-Generative-Art",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Eyes",
    category: "MOTIF × FASHION",
    tags: "art",
    visual: "visual-science",
    image: "images/work/Eyes.jpg",
    alt: "Eyes — Reyrove project",
    mark: "EY",
    desc: "Eye motifs as inspiration for surreal prints and statement pieces.",
    link: "https://reyrove.github.io/Eyes-Generative-Art",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Ephemeral<br>Whirls",
    category: "MOVEMENT × FASHION",
    tags: "art",
    visual: "visual-thread",
    image: "images/work/Ephemeral Whirls.jpg",
    alt: "Ephemeral Whirls — Reyrove project",
    mark: "EH",
    desc: "Swirling forms as inspiration for flowing dresses and draped silhouettes.",
    link: "https://reyrove.github.io/Ephemeral-Whirls-Generative-Art",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Ellipses",
    category: "GEOMETRY × FASHION",
    tags: "art",
    visual: "visual-girih",
    image: "images/work/Ellipses.jpg",
    alt: "Ellipses — Reyrove project",
    mark: "EL",
    desc: "Elliptical geometry as inspiration for cuts, panels and structured silhouettes.",
    link: "https://reyrove.github.io/Ellipses-Generative-Art",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Elliott Waves",
    category: "WAVE × FASHION",
    tags: "art",
    visual: "visual-fourier",
    image: "images/work/Elliott Waves.jpg",
    alt: "Elliott Waves — Reyrove project",
    mark: "EW",
    desc: "Wave theory as inspiration for rhythmic pattern and textile movement.",
    link: "https://reyrove.github.io/Elliott-Waves-Generative-Art",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Dreamscape<br>Watercolors",
    category: "PRINT × FASHION",
    tags: "art",
    visual: "visual-lucent",
    image: "images/work/Dreamscape Watercolors.jpg",
    alt: "Dreamscape Watercolors — Reyrove project",
    mark: "DW",
    desc: "Watercolor-like washes as inspiration for artistic fabric prints.",
    link: "https://reyrove.github.io/Dreamscape-Watercolors-Generative-Art",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Draconic<br>Fractals",
    category: "MOTIF × FASHION",
    tags: "art",
    visual: "visual-neon",
    image: "images/work/Draconic Fractals.jpg",
    alt: "Draconic Fractals — Reyrove project",
    mark: "DF",
    desc: "Fractal dragon curves as ornamental motifs for embroidery and print.",
    link: "https://reyrove.github.io/Draconic-Fractals-Generative-Art",
    cta: "VIEW COLLECTION"
  },
  {
    title: "cyPollock",
    category: "PRINT × FASHION",
    tags: "art",
    visual: "visual-thread",
    image: "images/work/cyPollock.jpg",
    alt: "cyPollock — Reyrove project",
    mark: "cP",
    desc: "Abstract expressionism as inspiration for artistic fabric prints and painterly textile.",
    link: "https://reyrove.github.io/cyPollock-Generative-Art",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Crazy Letter",
    category: "TYPOGRAPHY × FASHION",
    tags: "art",
    visual: "visual-girih",
    image: "images/work/Crazy Letter.jpg",
    alt: "Crazy Letter — Reyrove project",
    mark: "CT",
    desc: "Deconstructed typography as inspiration for graphic fashion prints.",
    link: "https://reyrove.github.io/Crazy-Letter-Generative-Art",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Crazy Knight<br>Curve",
    category: "MOTION × FASHION",
    tags: "art",
    visual: "visual-fourier",
    image: "images/work/Crazy Knight Curve.jpg",
    alt: "Crazy Knight Curve — Reyrove project",
    mark: "CK",
    desc: "Knight's tour curves as inspiration for continuous-line embroidery and print.",
    link: "https://reyrove.github.io/Crazy-Knight-Curve-Generative-Art",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Crazy Knight<br>Line",
    category: "LINE × FASHION",
    tags: "art",
    visual: "visual-fourier",
    image: "images/work/Crazy Knight Line.jpg",
    alt: "Crazy Knight Line — Reyrove project",
    mark: "CN",
    desc: "Continuous line paths as inspiration for linear fashion prints and trims.",
    link: "https://reyrove.github.io/Crazy-Knight-Line-Generative-Art",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Citrus Mosaic",
    category: "COLOR × FASHION",
    tags: "art",
    visual: "visual-girih",
    image: "images/work/Citrus Mosaic.jpg",
    alt: "Citrus Mosaic — Reyrove project",
    mark: "CM",
    desc: "Mosaic patterns in citrus hues as inspiration for vibrant print collections.",
    link: "https://reyrove.github.io/Citrus-Mosaic-Generative-Art",
    cta: "VIEW COLLECTION"
  },
  {
    title: "ChaotiColor",
    category: "PALETTE × FASHION",
    tags: "art",
    visual: "visual-neon",
    image: "images/work/ChaotiColor.jpg",
    alt: "ChaotiColor — Reyrove project",
    mark: "CC",
    desc: "Chaotic color systems as inspiration for bold, expressive fashion palettes.",
    link: "https://reyrove.github.io/ChaotiColor-Generative-Art",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Celestial<br>Grove",
    category: "PRINT × FASHION",
    tags: "art",
    visual: "visual-lucent",
    image: "images/work/Celestial Grove.jpg",
    alt: "Celestial Grove — Reyrove project",
    mark: "CG",
    desc: "Organic forms as inspiration for artistic textile prints and surface design.",
    link: "https://reyrove.github.io/Celestial-Grove-Generative-Art",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Bezier 2",
    category: "SILHOUETTE × FASHION",
    tags: "art",
    visual: "visual-thread",
    image: "images/work/Bezier 2.jpg",
    alt: "Bezier 2 — Reyrove project",
    mark: "B2",
    desc: "Bezier curves as inspiration for garment lines, panels and pattern cutting.",
    link: "https://reyrove.github.io/Bezier-2-Generative-Art",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Bezier 1",
    category: "SILHOUETTE × FASHION",
    tags: "art",
    visual: "visual-thread",
    image: "images/work/Bezier 1.jpg",
    alt: "Bezier 1 — Reyrove project",
    mark: "B1",
    desc: "Bezier curve explorations as inspiration for fluid garment design.",
    link: "https://reyrove.github.io/Bezier-1-Generative-Art",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Brownian<br>Graphe",
    category: "STRUCTURE × FASHION",
    tags: "art",
    visual: "visual-science",
    image: "images/work/Brownian Graph.jpg",
    alt: "Brownian Graphe — Reyrove project",
    mark: "BG",
    desc: "Brownian graph structures as inspiration for organic embellishment layouts.",
    link: "https://reyrove.github.io/Brownian-Graphe-Generative-Art",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Fibonacci's<br>Spin",
    category: "STRUCTURE × FASHION",
    tags: "art",
    visual: "visual-girih",
    image: "images/work/fibonaccis spin.jpg",
    alt: "Fibonacci's Spin — Reyrove project",
    mark: "FS",
    desc: "Golden spirals as inspiration for draping, gathering and garment form.",
    link: "https://reyrove.github.io/Fibonaccis-Spin-Generative-Art",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Polar<br>Memories",
    category: "GEOMETRY × FASHION",
    tags: "art",
    visual: "visual-science",
    image: "images/work/Polar Memories.jpg",
    alt: "Polar Memories — Reyrove project",
    mark: "PM",
    desc: "Polar coordinate systems as inspiration for radial prints and rosettes.",
    link: "https://reyrove.github.io/Polar-Memories-Generative-Art",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Symphony<br>of Life",
    category: "RHYTHM × FASHION",
    tags: "art",
    visual: "visual-fourier",
    image: "images/work/Symphony of Life.jpg",
    alt: "Symphony of Life — Reyrove project",
    mark: "SL",
    desc: "Life-like rhythms as inspiration for rhythmic pattern and textile motion.",
    link: "https://reyrove.github.io/Symphony-of-Life-Generative-Art",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Wandering<br>Eyes",
    category: "MOTIF × FASHION",
    tags: "art",
    visual: "visual-science",
    image: "images/work/Wandering Eyes.jpg",
    alt: "Wandering Eyes — Reyrove project",
    mark: "WE",
    desc: "Wandering eye motifs as inspiration for surreal prints and statement pieces.",
    link: "https://reyrove.github.io/Wandering-Eyes-Generative-Art",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Baroque<br>Me Baby",
    category: "ORNAMENT × FASHION",
    tags: "art",
    visual: "visual-lucent",
    image: "images/work/Baroque Me Baby.jpg",
    alt: "Baroque Me Baby — Reyrove project",
    mark: "BB",
    desc: "Baroque ornamentation as inspiration for couture embroidery and appliqué.",
    link: "https://reyrove.github.io/Baroque-Me-Baby-Generative-Art",
    cta: "VIEW COLLECTION"
  },
  {
    title: "Twist 1",
    category: "TWIST × FASHION",
    tags: "art",
    visual: "visual-thread",
    image: "images/work/Twist-1.jpg",
    alt: "Twist 1 — Reyrove project",
    mark: "T1",
    desc: "Geometric twisting as inspiration for yarn structure, knit and woven surface.",
    link: "https://reyrove.github.io/Twist-1-Generative-Geometric-Art",
    cta: "VIEW COLLECTION"
  },
  {
    title: "ASCII Body",
    category: "ASCII × FEMININE FORM",
    tags: "art",
    visual: "visual-thread",
    image: "images/work/Ascii Body.jpg",
    alt: "ASCII Body — Reyrove project",
    mark: "AB",
    desc: "Nine p5.js works transforming body photographs into ASCII art. Sensuality translated into syntax, sculpted in characters and code.",
    link: "https://reyrove.github.io/ASCII-Body-Generative-Art",
    cta: "VIEW COLLECTION"
  },

  /* ---------- AI SYSTEMS ---------- */
  {
    title: "Sparrow Hawk<br>Textile Narrator",
    category: "AI SYSTEMS",
    tags: "ai",
    visual: "visual-hawk",
    image: "images/work/Sparrow Hawk Textile Narrator.jpg",
    alt: "Sparrow Hawk Textile Narrator — Reyrove project",
    mark: "SN",
    desc: "AI companion for textile design prompts and fashion ideas.",
    link: "https://sparrow-hawk-textile-narrator.vercel.app/",
    cta: "VIEW PROJECT"
  },
  {
    title: "Sparrow Hawk<br>CodeArt Generator",
    category: "AI SYSTEMS",
    tags: "ai",
    visual: "visual-neon",
    image: "images/work/Sparrow Hawk Code Art Generator.jpg",
    alt: "Sparrow Hawk CodeArt Generator — Reyrove project",
    mark: "SC",
    desc: "AI creative coding environment for code and SVG art.",
    link: "https://sparrow-hawk-code-art-generator.vercel.app/",
    cta: "VIEW PROJECT"
  },
  {
    title: "Sparrow Hawk<br>NewsSidekick",
    category: "AI SYSTEMS",
    tags: "ai",
    visual: "visual-hawk",
    image: "images/work/Sparrow Hawk News Sidekick.jpg",
    alt: "Sparrow Hawk NewsSidekick — Reyrove project",
    mark: "NS",
    desc: "AI-powered news companion for summarizing and exploring stories.",
    link: "https://sparrow-hawk-news-sidekick.vercel.app/",
    cta: "VIEW PROJECT"
  },
  {
    title: "Baby Hawk<br>Mantra Generator",
    category: "AI SYSTEMS",
    tags: "ai",
    visual: "visual-hawk",
    image: "images/work/Baby Hawk Mantra Generator.jpg",
    alt: "Baby Hawk Mantra Generator — Reyrove project",
    mark: "BM",
    desc: "AI mantra generator for daily inspiration.",
    link: "https://baby-hawk-mantra-generator.vercel.app/",
    cta: "VIEW PROJECT"
  },
  {
    title: "Baby Hawk<br>Crypto Queen",
    category: "AI SYSTEMS",
    tags: "ai",
    visual: "visual-neon",
    image: "images/work/Baby Hawk Crypto Queen.jpg",
    alt: "Baby Hawk Crypto Queen — Reyrove project",
    mark: "BC",
    desc: "AI crypto-art project exploring generative finance aesthetics.",
    link: "https://baby-hawk-crypto-queen.vercel.app/",
    cta: "VIEW PROJECT"
  },
  {
    title: "Devi AI",
    category: "AI SYSTEMS",
    tags: "ai",
    visual: "visual-lounge",
    image: "images/work/Devi AI.jpg",
    alt: "Devi AI — Reyrove project",
    mark: "DV",
    desc: "AI generator for divine feminine sacred art.",
    private: true
  },

  /* ---------- SCIENTIFIC COMPUTING ---------- */
  {
    title: "Molecular<br>Dynamics",
    category: "SCIENTIFIC COMPUTING",
    tags: "science",
    visual: "visual-science",
    image: "images/work/Molecular-Dynamics.png",
    alt: "Molecular Dynamics — Reyrove project",
    mark: "MO",
    desc: "LAMMPS simulations exploring FCC systems, deposition, interactions and GCMC experiments.",
    link: "https://github.com/reyrove/Molecular-Dynamics",
    cta: "VIEW REPOSITORY"
  },
  {
    title: "Fortran",
    category: "SCIENTIFIC COMPUTING",
    tags: "science",
    visual: "visual-science",
    image: "images/work/Fortran.png",
    alt: "Fortran — Reyrove project",
    mark: "FT",
    desc: "Fortran experiments and scientific computing exercises.",
    link: "https://github.com/reyrove/fortran",
    cta: "VIEW REPOSITORY"
  },

  /* ---------- DIGITAL EXPERIENCES ---------- */
  {
    title: "AI<br>Lounge",
    category: "DIGITAL EXPERIENCES",
    tags: "experience",
    visual: "visual-lounge",
    image: "images/work/ai-lounge.jpg",
    alt: "AI Lounge — Reyrove project",
    mark: "AL",
    desc: "A digital nest where code, imagination and AI meet.",
    link: "https://reyrove.github.io/ai-lounge",
    cta: "VIEW PROJECT"
  },
  {
    title: "Frozen<br>Sanctuary",
    category: "DIGITAL EXPERIENCES",
    tags: "experience",
    visual: "visual-sanctuary",
    image: "images/work/frozen-sanctuary.jpg",
    alt: "Frozen Sanctuary — Reyrove project",
    mark: "FS",
    desc: "A frozen nest where textile narration, code and conversation meet.",
    link: "https://reyrove.github.io/Frozen-Sanctuary",
    cta: "VIEW PROJECT"
  },
  {
    title: "Personal<br>Portfolio",
    category: "DIGITAL EXPERIENCES",
    tags: "experience",
    visual: "visual-lucent",
    image: "images/work/Personal Portfolio.jpg",
    alt: "Personal Portfolio — Reyrove project",
    mark: "PO",
    desc: "Personal portfolio page layout.",
    link: "https://reyrove.github.io/personal-portfolio",
    cta: "VIEW PROJECT"
  },
  {
    title: "Product<br>Landing Page",
    category: "DIGITAL EXPERIENCES",
    tags: "experience",
    visual: "visual-lucent",
    image: "images/work/Product Landing Page.jpg",
    alt: "Product Landing Page — Reyrove project",
    mark: "PL",
    desc: "Responsive product landing page.",
    link: "https://reyrove.github.io/product-landing-page",
    cta: "VIEW PROJECT"
  },
  {
    title: "Tribute Page",
    category: "DIGITAL EXPERIENCES",
    tags: "experience",
    visual: "visual-lucent",
    image: "images/work/Tribute Page.jpg",
    alt: "Tribute Page — Reyrove project",
    mark: "TP",
    desc: "Responsive tribute page project.",
    link: "https://reyrove.github.io/tribute-page",
    cta: "VIEW PROJECT"
  },
  {
    title: "Technical<br>Documentation Page",
    category: "DIGITAL EXPERIENCES",
    tags: "experience",
    visual: "visual-lucent",
    image: "images/work/Technical Documentation.jpg",
    alt: "Technical Documentation Page — Reyrove project",
    mark: "TD",
    desc: "Documentation layout with sidebar navigation.",
    link: "https://reyrove.github.io/technical-documentation-page",
    cta: "VIEW PROJECT"
  },
  {
    title: "Survey Form",
    category: "DIGITAL EXPERIENCES",
    tags: "experience",
    visual: "visual-lucent",
    image: "images/work/Survey Form.jpg",
    alt: "Survey Form — Reyrove project",
    mark: "SF",
    desc: "Accessible survey form layout.",
    link: "https://reyrove.github.io/survey-form",
    cta: "VIEW PROJECT"
  },
  {
    title: "Stardust Game",
    category: "DIGITAL EXPERIENCES",
    tags: "experience",
    visual: "visual-neon",
    image: "images/work/Stardust-Game.jpg",
    alt: "Stardust Game — Reyrove project",
    mark: "SD",
    desc: "An interactive dance with light — drift your cursor through the stars, gather glowing motes and paint constellations.",
    link: "https://reyrove.github.io/stardust-game",
    cta: "PLAY GAME"
  },
  {
    title: "Prism Pulse Game",
    category: "DIGITAL EXPERIENCES",
    tags: "experience",
    visual: "visual-neon",
    image: "images/work/Prism-Pulse-Game.jpg",
    alt: "Prism Pulse Game — Reyrove project",
    mark: "PP",
    desc: "A color-matching arcade game — rotate your orbiting shield, absorb matching orbs and survive.",
    link: "https://reyrove.github.io/prism-pulse-game",
    cta: "PLAY GAME"
  },
    {
    title: "Neon Dash Game",
    category: "DIGITAL EXPERIENCES",
    tags: "experience",
    visual: "visual-neon",
    image: "images/work/Neon-Dash-Game.jpg",
    alt: "Neon Dash Game — Reyrove project",
    mark: "ND",
    desc: "A neon-soaked arcade dash — dodge obstacles and chase the light.",
    link: "https://reyrove.github.io/neon-dash-game",
    cta: "PLAY GAME"
  },
  {
    title: "Gizmo Webbook",
    category: "DIGITAL EXPERIENCES",
    tags: "experience",
    visual: "visual-lucent",
    image: "images/work/gizmo-webbook.jpg",
    alt: "Gizmo Webbook — Reyrove project",
    mark: "GZ",
    desc: "7-chapter interactive comic webbook with bookmarks and a forbidden button.",
    link: "https://reyrove.github.io/gizmo-webbook",
    cta: "READ WEBBOOK"
  }
];

/* =========================================================
   2. HELPERS
   ========================================================= */

/**
 * Escape a string for safe use inside an HTML attribute
 * AND text context. The set `& < > "` covers both.
 */
function escapeAttr(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Titles in PROJECTS contain intentional <br> tags, so they
 * are injected raw. This guard only lets through <br>,
 * <br/>, or <br /> (case-insensitive, optional whitespace)
 * and strips every other tag. Anything that isn't a tag
 * is left untouched.
 */
function sanitizeTitle(str) {
  return String(str).replace(/<[^>]*>/g, (match) => {
    return /^<br\s*\/?>$/i.test(match) ? match : '';
  });
}

/**
 * Split a `tags` string into an array of filter keys.
 * Whitespace-separated, so "art science" yields
 * ["art", "science"].
 */
function parseTags(tags) {
  return String(tags || '').trim().split(/\s+/).filter(Boolean);
}

/* =========================================================
   3. RENDER PROJECTS
   ---------------------------------------------------------
   The fixed index (01, 02, 03…) is assigned once here from
   the array position. It stays attached to its card when
   filters are applied, so filtered views show gaps in the
   global numbering (Tools = 01–09, Generative Art = 10–…).
   That is intentional.
   ========================================================= */

function renderProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;

  const html = PROJECTS.map((p, i) => {
    const num = String(i + 1).padStart(2, '0');
    const tags = escapeAttr(p.tags);

    const cta = p.private
      ? `<span class="project-private">PRIVATE PROJECT</span>`
      : `<a href="${escapeAttr(p.link)}" target="_blank" rel="noopener noreferrer">${p.cta} <span aria-hidden="true">↗</span></a>`;

    return `
      <article class="project" data-tags="${tags}">
        <div class="project-visual ${escapeAttr(p.visual)}">
          <img src="${escapeAttr(p.image)}" alt="${escapeAttr(p.alt)}" loading="lazy" decoding="async" />
          <span aria-hidden="true">${escapeAttr(p.mark)}</span>
        </div>
        <div class="project-info">
          <div class="project-index" aria-hidden="true">${num}</div>
          <h3>${sanitizeTitle(p.title)}</h3>
          <p>${escapeAttr(p.category)}</p>
          <small>${escapeAttr(p.desc)}</small>
          ${cta}
        </div>
      </article>
    `;
  }).join('');

  container.innerHTML = html;
}

/* =========================================================
   4. MOBILE NAVIGATION
   ========================================================= */

function initNav() {
  const nav = document.querySelector('.nav');
  const menu = document.querySelector('.menu');
  if (!menu || !nav) return;

  const setExpanded = (state) => {
    menu.setAttribute('aria-expanded', state ? 'true' : 'false');
    menu.setAttribute('aria-label', state ? 'Close menu' : 'Open menu');
  };

  const closeMenu = () => {
    nav.classList.remove('open');
    setExpanded(false);
  };

  menu.addEventListener('click', (event) => {
    event.stopPropagation();
    const open = nav.classList.toggle('open');
    setExpanded(open);
  });

  // Close on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape, return focus to the menu button
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      closeMenu();
      menu.focus();
    }
  });

  // Close on outside click
  document.addEventListener('click', (event) => {
    if (!nav.classList.contains('open')) return;
    if (nav.contains(event.target)) return;
    closeMenu();
  });
}

/* =========================================================
   5. PROJECT FILTERS
   ---------------------------------------------------------
   Delegating on #projects-container means filters keep
   working even if cards are ever re-rendered or paginated.
   A separate #filter-status region announces the count so
   we don't flood a live region with the entire grid.
   ========================================================= */

function initFilters() {
  const filterBar = document.querySelector('.filters');
  const container = document.getElementById('projects-container');
  const status = document.getElementById('filter-status');
  if (!filterBar || !container) return;

  filterBar.addEventListener('click', (event) => {
    const button = event.target.closest('.filter');
    if (!button) return;

    // Update pressed state on all filter buttons.
    filterBar.querySelectorAll('.filter').forEach(btn => {
      btn.classList.remove('active');
      btn.setAttribute('aria-pressed', 'false');
    });
    button.classList.add('active');
    button.setAttribute('aria-pressed', 'true');

    const selected = button.dataset.filter;
    let visible = 0;

    // Toggle visibility on every card currently in the DOM.
    container.querySelectorAll('.project').forEach(project => {
      const tokens = parseTags(project.dataset.tags);
      const show = selected === 'all' || tokens.includes(selected);
      project.classList.toggle('hidden', !show);
      if (show) visible += 1;
    });

    // Announce the result count without re-reading the grid.
    if (status) {
      const label = button.textContent.trim();
      status.textContent = selected === 'all'
        ? `Showing all ${visible} projects.`
        : `Showing ${visible} ${label.toLowerCase()} project${visible === 1 ? '' : 's'}.`;
    }
  });
}

/* =========================================================
   6. REVEAL ANIMATION (respects prefers-reduced-motion)
   ========================================================= */

function initReveal() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const targets = document.querySelectorAll(
    '.project, .timeline > div, .section-head, .manifesto-grid, .about-quote, .contact h2, .contact p, .contact-email, .socials, .onchain'
  );

  if (reduce) {
    targets.forEach(el => el.classList.add('in'));
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}

/* =========================================================
   7. BACK TO TOP
   ========================================================= */

function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  const toggle = () => {
    btn.classList.toggle('visible', window.scrollY > 600);
  };

  window.addEventListener('scroll', toggle, { passive: true });
  toggle();

  btn.addEventListener('click', () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: 0,
      behavior: reduce ? 'auto' : 'smooth'
    });
  });
}

/* =========================================================
   8. STRUCTURED DATA — ItemList generated from PROJECTS
   ---------------------------------------------------------
   Keeps the JSON-LD ItemList in sync with the real data so
   it can never go stale. Private projects are skipped.
   ========================================================= */

function initStructuredData() {
  const listItems = PROJECTS
    .filter(p => !p.private && p.link)
    .map((p, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": p.title.replace(/<br\s*\/?>/gi, ' ').trim(),
      "url": p.link
    }));

  const ld = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Selected Work",
    "numberOfItems": listItems.length,
    "itemListElement": listItems
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(ld);
  document.head.appendChild(script);
}

/* =========================================================
   9. BOOT
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  initFilters();
  initNav();
  initReveal();
  initBackToTop();
  initStructuredData();
});