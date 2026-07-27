"use client";

import { useMemo, useState } from "react";
import { categories, projects } from "../data/projects";
import { ProjectCard } from "./ProjectCard";

export function ProjectExplorer() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");

  const visibleProjects = useMemo(
    () =>
      category === "All"
        ? projects
        : projects.filter((project) => project.category === category),
    [category],
  );

  return (
    <>
      <div className="filter-bar" aria-label="Filter projects by category">
        {categories.map((item) => (
          <button
            className={category === item ? "filter-button is-active" : "filter-button"}
            key={item}
            onClick={() => setCategory(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>
      <p className="result-count" aria-live="polite">
        Showing {visibleProjects.length} of {projects.length} projects
      </p>
      <div className="project-grid all-projects">
        {visibleProjects.map((project, index) => (
          <ProjectCard index={index} key={project.slug} project={project} />
        ))}
      </div>
    </>
  );
}
