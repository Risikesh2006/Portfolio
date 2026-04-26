# Parallax Scroll System — Next.js
# Reference: jordangilroy.com style parallax
# ─────────────────────────────────────────────────────────────

## What this does
Replicates the jordangilroy.com parallax effect:
  • Background layer scrolls slower than the page (depth illusion)
  • Card images move at a different speed than their container (classic parallax)
  • Section headings float up + fade in as they enter the viewport

## Files
  hooks/useParallax.ts          ← core rAF scroll engine
  components/ParallaxProvider.tsx ← wrap your layout with this

## Setup (2 steps)

### Step 1 — Add ParallaxProvider to your root layout

```tsx
// app/layout.tsx
import ParallaxProvider from "@/components/ParallaxProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ParallaxProvider bgSpeed={0.4} imgSpeed={0.55} floatPx={40}>
          {children}
        </ParallaxProvider>
      </body>
    </html>
  );
}
```

### Step 2 — Add data attributes to your EXISTING elements
No content, theme, or component changes needed. Just add one attribute.

─────────────────────────────────────────────────────────────
EFFECT 1: Slow-moving background (like the wavy line bg in the video)
─────────────────────────────────────────────────────────────
Add  data-parallax="bg"  to your background element.

```tsx
// Your existing background — just add the attribute
<div
  data-parallax="bg"
  className="your-existing-bg-class"   // ← keep your classes unchanged
  style={{ position: "fixed", inset: 0, zIndex: 0 }}
/>
```

The background will scroll at bgSpeed (default 0.4 = 40% of scroll speed),
creating the depth separation seen on jordangilroy.com.

─────────────────────────────────────────────────────────────
EFFECT 2: Card image parallax (image moves slower than its card)
─────────────────────────────────────────────────────────────
Add  data-parallax="card-img"  to the <img> or image div INSIDE your card.
Wrap it in overflow:hidden so the offset doesn't bleed outside the card.

```tsx
// Your existing card — add overflow hidden to wrapper, attribute to image
<div className="your-card-class" style={{ overflow: "hidden" }}>
  <img
    data-parallax="card-img"
    src={project.image}
    alt={project.title}
    className="your-existing-img-class"  // ← keep your classes unchanged
  />
  <div className="your-card-content">...</div>
</div>
```

The image will shift vertically as you scroll past it, creating the
depth-within-card effect. Scale(1.12) is applied automatically so
the edges never show white gaps.

─────────────────────────────────────────────────────────────
EFFECT 3: Section heading float-up on scroll enter
─────────────────────────────────────────────────────────────
Add  data-parallax="section"  to any heading or section label.

```tsx
// Your existing section heading — just add the attribute
<h2
  data-parallax="section"
  className="your-existing-heading-class"  // ← keep your classes unchanged
>
  Selected Work
</h2>
```

The element starts translated down by floatPx (default 40px) and
fades from opacity 0 → 1 as it enters the viewport. Same effect
as seen on jordangilroy.com section headings.

─────────────────────────────────────────────────────────────
## Tuning the speeds (optional)

```tsx
<ParallaxProvider
  bgSpeed={0.3}    // slower bg = more depth. 0 = fixed, 1 = normal scroll
  imgSpeed={0.5}   // lower = more dramatic card parallax
  floatPx={60}     // larger = more float on section headings
>
```

─────────────────────────────────────────────────────────────
## Example: full section with all three effects

```tsx
export default function ProjectsSection() {
  return (
    <section>
      {/* Background — moves slow */}
      <div data-parallax="bg" className="your-bg" />

      {/* Heading — floats in on scroll */}
      <h2 data-parallax="section" className="your-heading">
        Selected Work
      </h2>

      {/* Cards — image moves at different speed */}
      {projects.map((p) => (
        <div key={p.id} className="your-card" style={{ overflow: "hidden" }}>
          <img
            data-parallax="card-img"
            src={p.image}
            alt={p.title}
            className="your-img"
          />
          <h3>{p.title}</h3>
        </div>
      ))}
    </section>
  );
}
```
