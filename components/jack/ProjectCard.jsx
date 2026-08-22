'use client'

import { forwardRef } from 'react'
import { Github } from 'lucide-react'
import { LiveProjectButton } from './LiveProjectButton'

export const ProjectCard = forwardRef(function ProjectCard({ project, index }, ref) {
  return (
    <div
      ref={ref}
      className="scroll-stack-card relative mb-6 h-auto min-h-[70vh] sm:h-[82vh] md:h-[85vh]"
      style={{ zIndex: index + 1, transformOrigin: 'top center', willChange: 'transform, opacity' }}
    >
      <article className="flex h-full w-full flex-col gap-5 rounded-[32px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:gap-6 sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <span
              className="font-black leading-none text-[#0C0C0C]"
              style={{ fontSize: 'clamp(2.5rem, 9vw, 130px)', WebkitTextStroke: '2px #D7E2EA' }}
            >
              {project.number}
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/60 sm:text-sm">
                {project.category}
              </span>
              <span
                className="font-medium uppercase leading-tight text-[#D7E2EA]"
                style={{ fontSize: 'clamp(1.15rem, 3vw, 2.25rem)' }}
              >
                {project.title}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on GitHub`}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] transition-colors hover:bg-[#D7E2EA]/10"
            >
              <Github className="h-5 w-5" />
            </a>
            <LiveProjectButton href={project.liveUrl} />
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-2xl text-sm leading-relaxed text-[#D7E2EA]/70 sm:text-base">
            {project.description}
          </p>
          {project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-[#D7E2EA]/30 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-[#D7E2EA]/80 sm:text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.mainImage}
            alt={`${project.title} main preview`}
            className="h-48 w-full rounded-[24px] bg-[#161616] object-cover sm:h-full sm:rounded-[40px] md:rounded-[50px]"
          />
        </div>
      </article>
    </div>
  )
})
