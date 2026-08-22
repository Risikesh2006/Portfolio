'use client'

// Repeat the set enough times that the track is always wider than two
// screens' worth of content, so the loop never exposes blank space on
// wide viewports.
const REPEAT = 6

export function TechRow({ index, category, skills, direction = 'left' }) {
  const track = Array.from({ length: REPEAT }, () => skills).flat()
  const shiftPct = -100 / REPEAT
  // Duration is tied to the unique-item count only (REPEAT just adds
  // width for seamless looping, it doesn't change distance traveled).
  const duration = Math.max(14, skills.length * 2.4)

  return (
    <div className="flex flex-col gap-3 border-t border-[#D7E2EA]/10 py-6 first:border-t-0 sm:flex-row sm:items-center sm:gap-6 sm:py-7 md:py-8">
      <div className="flex shrink-0 items-baseline gap-2.5 pl-5 sm:w-[180px] sm:pl-8 md:w-[210px] md:pl-10">
        <span className="font-mono text-[11px] text-[#D7E2EA]/35 sm:text-xs">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="text-base font-semibold uppercase tracking-wide text-[#D7E2EA] sm:text-lg">
          {category}
        </span>
      </div>

      <div
        className="marquee-row relative min-w-0 flex-1 overflow-hidden"
        style={{
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 48px, black calc(100% - 48px), transparent)',
          maskImage:
            'linear-gradient(to right, transparent, black 48px, black calc(100% - 48px), transparent)',
        }}
      >
        <div
          className={`marquee-track flex items-center gap-3 sm:gap-4 ${
            direction === 'right' ? 'marquee-track--right' : 'marquee-track--left'
          }`}
          style={{ animationDuration: `${duration}s`, '--marquee-shift': `${shiftPct}%` }}
        >
          {track.map(({ name, Icon, color }, i) => (
            <div
              key={`${name}-${i}`}
              className="flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-2xl border border-[#D7E2EA]/15 bg-[#111214] px-4 py-2.5 transition-all duration-300 hover:-translate-y-1 hover:border-[#D7E2EA]/40 hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)] sm:px-5 sm:py-3"
            >
              <Icon className="h-[18px] w-[18px] shrink-0 sm:h-5 sm:w-5" style={{ color }} />
              <span className="text-xs font-medium text-[#D7E2EA]/85 sm:text-sm">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
