# SmartHome OS Typography Design Rules

## Heading Sizes (Standardized Scale)

- **H1 (Hero Titles):** `text-4xl sm:text-5xl lg:text-6xl`
- **H2 (Section Titles):** `text-3xl sm:text-4xl lg:text-5xl`
- **H3 (Component / Card Titles):** `text-xl sm:text-2xl lg:text-3xl`
- **H4 (Small Capabilities / Accordions):** `text-lg sm:text-xl lg:text-2xl`
- **H5 (Eyebrows / Labels / Minor Steps):** `tracking-[0.1em] text-xs sm:text-sm md:text-base`

*Note: The H5 size does NOT use uppercase or font-light by default; it strictly follows the `tracking-[0.1em]` and sizing defined above.*

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
