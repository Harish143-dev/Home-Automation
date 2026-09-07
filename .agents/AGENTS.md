# SmartHome OS Typography Design Rules

## Heading Typography (Global CSS)

**CRITICAL RULE:** DO NOT apply inline Tailwind typography utility classes (like `text-4xl`, `font-light`, `tracking-wide`, `leading-[1.2]`) to heading tags. 

All standard heading sizes, font weights, letter spacing, and line heights are strictly defined in `styles/globals.css` under `@layer base`.

When creating headings or eyebrows:
- **H1-H4 (Titles):** Use standard HTML tags (`<h1>` for Hero, `<h2>` for Sections, `<h3>` for Cards/Components) with NO typography sizing/weight classes.
- **H5 (Eyebrows / Labels / Minor Steps):** Use the `<h5>` tag instead of `<span>` or `<p>`. It will automatically inherit the global eyebrow styling (`tracking-[0.1em] text-xs sm:text-sm md:text-base`).
- You may still apply layout, alignment, or color classes (e.g., `text-foreground`, `mb-8`, `text-balance`, `text-center`) directly to the headings as needed.

## Button Standardization Rules

When adding or modifying buttons anywhere in the project, you must adhere to the following strict variant hierarchy and styling rules. **Never** use hardcoded utility classes (like `px-8`, `bg-accent`, custom hover gradients, or manually nested `<ArrowRight />` SVGs) for buttons. Always use the central `<Button>` component.

1. **Hero Sections (Dark Backgrounds):**
   - **Primary Action:** `<Button variant="interactive" size="lg">`
   - **Secondary Action:** `<Button variant="shiny" size="lg">`

2. **CTA & Content Sections (Light/Solid Backgrounds):**
   - **Primary Action:** `<Button variant="interactive" size="lg">`
   - **Secondary Action:** `<Button variant="outline" size="lg">` (or `variant="green"` if a specific aesthetic is required)

3. **Clean Code Requirements:**
   - Remove bloated configurations (e.g., `shape="full"`, complex `group-hover` rules) from button invocations.
   - The `<Button variant="interactive">` component handles hover expansions and animated arrow icons globally. Do not manually nest SVG icons into this variant.

## Section Padding & Layout Rules

1. **Standard Section Padding:**
   - Always apply standard vertical padding to standard sections: `py-16 md:py-24` (or `py-12 md:py-16` if tighter spacing is required).
   
2. **Sticky/Fullscreen Sections:**
   - If a section relies on sticky scrolling (e.g., `sticky top-0`) and occupies the full viewport height (`min-h-screen`), DO NOT apply the standard `py-16 md:py-24` padding to its wrapper. Handle spacing within the sticky contents.

## Design Aesthetic & Theme Rules

1. **Theme Restriction:**
   - DO NOT design or implement dark themes. The aesthetic of the site is Light Luxury Editorial. Stick to light backgrounds (`bg-background`, `bg-panel`) and dark text (`text-foreground`).
   
2. **Eyebrow Typography:**
   - DO NOT use capital letters (ALL CAPS) or `uppercase` utility classes for eyebrow text. Always use Title Case (e.g., "The ATPL Advantage", not "THE ATPL ADVANTAGE").
