'use client';

import WorkHeader from '../components/work/WorkHeader';
import ProjectRow from '../components/work/ProjectRow';
import { projects } from '../components/work/projects';
import { useWorkAnimations } from '../components/work/useWorkAnimations';

export default function WorkPage() {
  const { rootRef, setMarqueeRef } = useWorkAnimations();

  return (
    <div ref={rootRef} className="min-h-screen bg-[#121212] text-[#f1f1f1]">
      <div className="mx-auto max-w-[1728px] px-6 md:px-12 lg:px-24 pt-32 sm:pt-40 pb-28 md:pb-40">
        <WorkHeader />

        {/* Project index */}
        <div className="flex flex-col gap-20 md:gap-28">
          {projects.map((project, projectIndex) => (
            <ProjectRow
              key={project.id}
              project={project}
              trackRef={setMarqueeRef(projectIndex)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
