import type { Project } from "@data/projects";
import ProjectCard from "./projects/ProjectCard.tsx";
import "./ProjectCardGrid.css";

export default function ProjectCardGrid({ projects }: { projects: Project[] }) {
  if (!projects?.length) return null;

  return (
    <div className="gallery-grid stagger-children">
      {projects.map((project, i) => (
        <ProjectCard key={project.id} project={project} index={i} />
      ))}
    </div>
  );
}
