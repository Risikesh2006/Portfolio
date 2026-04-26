"use client";

import { useEffect, useRef, useState } from "react";

const items = [
  {
    part: "11th Std — School",
    title: "Started Coding",
    desc: "Began my coding journey in 11th standard during my schooling — exploring the fundamentals and the world of programming for the first time.",
  },
  {
    part: "College — Year 1",
    title: "Hard Coding the Web",
    desc: "Started understanding programming deeply in college. First focused on hand-coding websites end-to-end so I could truly grasp how a website actually works under the hood.",
  },
  {
    part: "College — Year 2",
    title: "Smart Campus Application",
    desc: "Built a smart student campus application where students can view their attendance, marks, and the activities happening around the campus — my first end-to-end product.",
  },
  {
    part: "Now",
    title: "Jumped Into AI",
    desc: "Once confident with the web fundamentals, I jumped into AI. It was difficult at first, but I learned it — and now I focus on building AI-powered applications and training my own models.",
  },
];

export function Experience() {
  const [visible, setVisible] = useState(Array(items.length).fill(false));
  const refs = useRef([]);

  useEffect(() => {
    const observers = refs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible((prev) => {
              const next = [...prev];
              next[i] = true;
              return next;
            });
          }
        },
        { threshold: 0.2 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <section
      id="experience"
      style={{
        minHeight: "100vh",
        background: "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 20px",
        fontFamily: "'Figtree', 'Inter', sans-serif",
        boxSizing: "border-box",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;600;700;900&display=swap');
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(32px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes spinOrbit {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes counterSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        .orbit-ring {
          animation: spinOrbit 18s linear infinite;
          transform-origin: center;
        }
        .orbit-ring-2 {
          animation: spinOrbit 28s linear infinite reverse;
          transform-origin: center;
        }
        .timeline-item {
          opacity: 0;
          transform: translateX(32px);
        }
        .timeline-item.visible {
          animation: fadeSlideIn 0.6s ease forwards;
        }
        .icon-circle {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .icon-circle:hover {
          transform: scale(1.12);
          box-shadow: 0 0 0 4px hsl(var(--foreground) / 0.12);
        }
        @media (max-width: 768px) {
          .orbital-wrapper { display: none !important; }
          .arc-line-wrapper { display: none !important; }
          .timeline-list { 
            border-left: 1px solid hsl(var(--foreground) / 0.1); 
            padding-left: 24px !important;
            margin-left: 8px;
          }
          .icon-circle-wrapper {
            margin-left: -45px;
          }
        }
      `}</style>

      <div
        style={{
          width: "100%",
          maxWidth: 980,
          display: "flex",
          flexDirection: "column",
          gap: 40,
        }}
      >
        <div className="md:hidden">
          <p className="text-xs font-mono text-muted-foreground mb-3">04 — Experience</p>
          <h2 className="text-[clamp(28px,7vw,52px)] font-bold tracking-tight leading-[1.1] text-foreground">
            The <span className="gradient-text">journey so far.</span>
          </h2>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 0,
          }}
        >
          {/* ── Left: Orbital circle (Hidden on mobile) ── */}
          <div
            className="orbital-wrapper"
            style={{
              flexShrink: 0,
              width: 260,
              height: 260,
              position: "relative",
              marginRight: 32,
            }}
          >
            {/* Outer orbit ring 1 */}
            <svg
              className="orbit-ring"
              style={{ position: "absolute", inset: -40, width: "calc(100% + 80px)", height: "calc(100% + 80px)" }}
              viewBox="0 0 340 340"
              fill="none"
            >
              <circle cx="170" cy="170" r="160" stroke="hsl(var(--foreground) / 0.1)" strokeWidth="1" strokeDasharray="6 10" />
              <circle cx="170" cy="10" r="5" fill="hsl(var(--foreground) / 0.4)" />
              <circle cx="330" cy="170" r="3" fill="hsl(var(--foreground) / 0.2)" />
            </svg>

            {/* Inner orbit ring 2 */}
            <svg
              className="orbit-ring-2"
              style={{ position: "absolute", inset: -16, width: "calc(100% + 32px)", height: "calc(100% + 32px)" }}
              viewBox="0 0 292 292"
              fill="none"
            >
              <circle cx="146" cy="146" r="136" stroke="hsl(var(--foreground) / 0.06)" strokeWidth="1" strokeDasharray="3 14" />
              <rect x="140" y="6" width="12" height="12" rx="2" fill="hsl(var(--foreground) / 0.25)" transform="rotate(45 146 12)" />
            </svg>

            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background: "hsl(var(--background))",
                border: "1.5px solid hsl(var(--foreground) / 0.15)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 60px hsl(var(--foreground) / 0.04), inset 0 0 40px hsl(var(--background) / 0.6)",
              }}
            >
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "hsl(var(--muted-foreground))", marginBottom: 6 }}>The Journey</span>
              <span style={{ fontSize: 32, fontWeight: 900, color: "hsl(var(--foreground))", letterSpacing: "-0.02em" }}>Experience</span>
              <span style={{ marginTop: 8, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "hsl(var(--muted-foreground) / 0.5)" }}>so far.</span>
            </div>
          </div>

          {/* ── Connecting arc line (Hidden on mobile) ── */}
          <div className="arc-line-wrapper" style={{ position: "relative", flexShrink: 0, width: 48, alignSelf: "stretch" }}>
            <svg
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
              viewBox="0 0 48 400"
              preserveAspectRatio="none"
              fill="none"
            >
              <path d={`M 48 50 Q 8 100 8 200 Q 8 300 48 350`} stroke="hsl(var(--foreground) / 0.12)" strokeWidth="1" fill="none" />
            </svg>
          </div>

          {/* ── Right: Timeline items ── */}
          <div className="timeline-list" style={{ flex: 1, display: "flex", flexDirection: "column", gap: 36 }}>
            {items.map((item, i) => (
              <div
                key={i}
                ref={(el) => { refs.current[i] = el; }}
                className={`timeline-item${visible[i] ? " visible" : ""}`}
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: 18 }}>
                  <div
                    className="icon-circle-wrapper"
                    style={{
                      flexShrink: 0,
                      width: 42,
                      height: 42,
                      borderRadius: "50%",
                      background: "hsl(var(--foreground))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 2,
                      cursor: "default",
                      zIndex: 10,
                    }}
                  >
                    <IconFor index={i} />
                  </div>

                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "hsl(var(--muted-foreground))", marginBottom: 4 }}>{item.part}</div>
                    <h3 style={{ margin: "0 0 6px", fontSize: 20, fontWeight: 700, color: "hsl(var(--foreground))", letterSpacing: "-0.01em", lineHeight: 1.2 }}>{item.title}</h3>
                    <p style={{ margin: 0, fontSize: 14, color: "hsl(var(--muted-foreground))", lineHeight: 1.65, maxWidth: 460 }}>{item.desc}</p>
                  </div>
                </div>

                {i < items.length - 1 && (
                  <div style={{ marginTop: 28, height: "1px", background: "linear-gradient(90deg, hsl(var(--foreground) / 0.08) 0%, transparent 80%)" }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Different icon per step
function IconFor({ index }) {
  const icons = [
    // Code / terminal
    <svg key={0} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--background))" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>,
    // Globe / web
    <svg key={1} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--background))" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>,
    // Layers / app
    <svg key={2} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--background))" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
    </svg>,
    // CPU / AI
    <svg key={3} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--background))" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
    </svg>,
  ];
  return icons[index] ?? icons[0];
}
