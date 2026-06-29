import type { Ref } from 'react';
import type { Project } from './types';
import GalleryMarquee from './GalleryMarquee';

interface ProjectRowProps {
  project: Project;
  /** Ref callback wiring this row's marquee track into the GSAP tweens. */
  trackRef: Ref<HTMLDivElement>;
}

export default function ProjectRow({ project, trackRef }: ProjectRowProps) {
  return (
    <article className="work-row border-t border-white/10 pt-8 md:pt-10">
      {/* Title row */}
      <div className="flex items-start justify-between gap-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight tracking-tight">
          {project.title}
        </h2>
      </div>

      {/* Tags */}
      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/15 px-3 py-1 text-xs sm:text-sm text-neutral-300"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Description + collaboration */}
      <div className="mt-6 max-w-md">
        <p className="text-sm sm:text-base leading-relaxed text-neutral-300">
          {project.description}
        </p>
        {project.collaboration && (
          <p className="mt-5 text-xs text-neutral-500">
            In collaboration with
            <br />
            <span className="tracking-[0.18em] text-neutral-400">
              {project.collaboration}
            </span>
          </p>
        )}
      </div>

      <GalleryMarquee gallery={project.gallery} trackRef={trackRef} />
    </article>
  );
}
