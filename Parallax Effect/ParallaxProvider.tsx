// components/ParallaxProvider.tsx
// Drop this into your layout. It activates the parallax effect globally.
// Nothing else needs to change — just add data attributes to your existing elements.

"use client";

import { useParallax } from "@/hooks/useParallax";

interface ParallaxProviderProps {
  children: React.ReactNode;
  bgSpeed?: number;   // 0–1, background scroll speed. default 0.4
  imgSpeed?: number;  // 0–1, card image scroll speed. default 0.55
  floatPx?: number;   // px, section heading float amount. default 40
}

export default function ParallaxProvider({
  children,
  bgSpeed = 0.4,
  imgSpeed = 0.55,
  floatPx = 40,
}: ParallaxProviderProps) {
  useParallax({ bgSpeed, imgSpeed, floatPx });
  return <>{children}</>;
}
