'use client'

import { FadeIn } from './FadeIn'

const EXPERIENCE = [
  {
    number: '01',
    category: 'College · Year 1',
    name: 'Software Engineering Foundations',
    description:
      'Built a strong foundation in programming, problem solving, data structures, databases, and web development. Started developing applications from the ground up to understand how frontend interfaces, backend systems, APIs, and databases work together.',
  },
  {
    number: '02',
    category: 'College · Year 2',
    name: 'Full-Stack Product Development',
    description:
      'Moved from individual websites to complete full-stack products. Designed and developed applications with authentication, role-based access, databases, APIs, dashboards, and real-world workflows while focusing on clean architecture and maintainable code.',
  },
  {
    number: '03',
    category: 'College · Year 2',
    name: 'Product & Scalable Systems Engineering',
    description:
      'Started approaching projects as products rather than just development assignments. Built scalable applications around real user problems, designing complete workflows, backend architecture, database structures, integrations, and responsive user experiences.',
  },
  {
    number: '04',
    category: 'College · AI/ML',
    name: 'AI & Model Engineering',
    description:
      'Expanded into AI engineering and machine learning, working on intelligent applications that combine trained models with full-stack systems. Explored model development, data pipelines, AI-powered features, contextual systems, and integrating AI directly into real applications.',
  },
  {
    number: '05',
    category: 'SDE Intern · Chennai',
    name: 'Software Development Engineer Intern',
    date: 'July 2026 — Present',
    description:
      'Develop and maintain production-oriented full-stack applications using React.js, Node.js, Express.js, and SQL, translating client requirements into reliable and scalable software. Collaborate with the development team across the complete development lifecycle — building features, testing, debugging, integrating APIs, managing Git workflows, and supporting deployment while following Agile development practices.',
  },
]

export function ServicesSection() {
  return (
    <section
      id="experience"
      className="rounded-t-[40px] px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
      style={{ background: '#FFFFFF' }}
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="mb-16 text-center font-black uppercase leading-none text-[#0C0C0C] sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Experience
        </h2>
      </FadeIn>

      <div className="mx-auto max-w-5xl border-t" style={{ borderColor: 'rgba(12, 12, 12, 0.15)' }}>
        {EXPERIENCE.map((item, i) => (
          <FadeIn
            key={item.number}
            delay={i * 0.1}
            y={20}
            className="flex items-center gap-6 border-b py-8 sm:py-10 md:gap-10 md:py-12"
            style={{ borderColor: 'rgba(12, 12, 12, 0.15)' }}
          >
            <span
              className="font-black text-[#0C0C0C]"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
            >
              {item.number}
            </span>
            <div className="flex flex-col gap-2 sm:gap-3">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span
                  className="font-medium uppercase tracking-widest text-[#0C0C0C] opacity-50"
                  style={{ fontSize: 'clamp(0.65rem, 1vw, 0.85rem)' }}
                >
                  {item.category}
                </span>
                {item.date && (
                  <span
                    className="rounded-full border px-3 py-1 font-medium uppercase tracking-wide text-[#0C0C0C] opacity-60"
                    style={{ fontSize: 'clamp(0.6rem, 0.9vw, 0.75rem)', borderColor: 'rgba(12, 12, 12, 0.2)' }}
                  >
                    {item.date}
                  </span>
                )}
              </div>
              <h3
                className="font-medium uppercase text-[#0C0C0C]"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
              >
                {item.name}
              </h3>
              <p
                className="max-w-2xl font-light leading-relaxed text-[#0C0C0C] opacity-60"
                style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
              >
                {item.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
