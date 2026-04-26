// hooks/useParallax.ts
// Drop-in parallax scroll hook for Next.js
// Does NOT change any content, theme, or components — pure motion layer only.

import { useEffect, useRef } from "react";

/**
 * useParallax
 * Attaches a requestAnimationFrame scroll listener that sets
 * CSS custom properties on targeted elements.
 *
 * Elements opt-in via data attributes:
 *   data-parallax="bg"        → slow background (moves at bgSpeed of scroll)
 *   data-parallax="section"   → section heading float-up on enter
 *   data-parallax="card-img"  → image inside a card moves at imgSpeed
 *
 * No content, class names, or structure changes needed.
 */

interface ParallaxOptions {
  bgSpeed?: number;    // 0–1, how fast bg moves vs scroll. default 0.4
  imgSpeed?: number;   // 0–1, how fast card images move vs scroll. default 0.55
  floatPx?: number;    // max px a section floats up on enter. default 40
}

export function useParallax(options: ParallaxOptions = {}) {
  const { bgSpeed = 0.4, imgSpeed = 0.55, floatPx = 40 } = options;
  const rafRef = useRef<number | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Collect elements once on mount
    const getBg      = () => Array.from(document.querySelectorAll<HTMLElement>("[data-parallax='bg']"));
    const getCardImg = () => Array.from(document.querySelectorAll<HTMLElement>("[data-parallax='card-img']"));
    const getSection = () => Array.from(document.querySelectorAll<HTMLElement>("[data-parallax='section']"));

    function tick() {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      // ── 1. Background layer ────────────────────────────────────
      getBg().forEach((el) => {
        const y = scrollY * bgSpeed;
        el.style.transform = `translateY(${y}px)`;
        el.style.willChange = "transform";
      });

      // ── 2. Card image parallax ─────────────────────────────────
      getCardImg().forEach((el) => {
        const rect = el.getBoundingClientRect();
        // progress: -1 (above viewport) → 0 (centred) → 1 (below viewport)
        const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
        const offsetPx = progress * rect.height * (1 - imgSpeed) * 0.6;
        el.style.transform = `translateY(${offsetPx}px) scale(1.12)`;
        el.style.willChange = "transform";
      });

      // ── 3. Section heading float-up ────────────────────────────
      getSection().forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Visible: 0 → floatPx as it enters from bottom
        const inView = Math.max(0, Math.min(1, (vh - rect.top) / (vh * 0.55)));
        const y = floatPx * (1 - inView);
        el.style.transform = `translateY(${y}px)`;
        el.style.opacity = String(Math.min(1, inView * 1.5));
        el.style.willChange = "transform, opacity";
      });

      lastScrollY.current = scrollY;
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [bgSpeed, imgSpeed, floatPx]);
}
