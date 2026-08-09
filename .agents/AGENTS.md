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
