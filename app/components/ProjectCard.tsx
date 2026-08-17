import Image from "next/image";
import Link from "next/link";
import type { Project } from "../data/projects";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <article className="project-card">
      {project.coverImage ? (
        <div className="card-cover">
          <Image
            alt=""
            fill
            sizes="(max-width: 760px) 100vw, (max-width: 1180px) 50vw, 33vw"
            src={project.coverImage}
            unoptimized
          />
        </div>
      ) : null}
      <div className="card-topline">
        <span className="card-index">{String(index + 1).padStart(2, "0")}</span>
        <span className={`status status-${project.status.toLowerCase().replace(" ", "-")}`}>
          {project.status}
        </span>
      </div>
      <p className="eyebrow">{project.category}</p>
      <h3>{project.shortTitle}</h3>
      <p className="card-summary">{project.summary}</p>
      <p className="disclosure">{project.disclosure}</p>
      <div className="chip-row" aria-label="Tools and methods">
        {project.tech.slice(0, 4).map((item) => (
          <span className="chip" key={item}>
            {item}
          </span>
        ))}
      </div>
      <Link className="text-link" href={`/project/${project.slug}`}>
        View case study <span aria-hidden="true">↗</span>
      </Link>
    </article>
  );
}
