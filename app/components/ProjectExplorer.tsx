"use client";

import { useState } from "react";
import {
  categories,
  currentBuilds,
  leadProjects,
  projects,
  supportingProjects,
} from "../data/projects";
import { ProjectCard } from "./ProjectCard";

export function ProjectExplorer() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");

  const matchesCategory = (project: (typeof projects)[number]) =>
    category === "All" || project.category === category;

  const visibleLeadProjects = leadProjects.filter(matchesCategory);
  const visibleCurrentBuilds = currentBuilds.filter(matchesCategory);
  const visibleSupportingProjects = supportingProjects.filter(matchesCategory);
  const visibleCount =
    visibleLeadProjects.length +
    visibleCurrentBuilds.length +
    visibleSupportingProjects.length;

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
        Showing {visibleCount} of {projects.length} projects
      </p>
      {visibleLeadProjects.length ? (
        <section className="project-library-group" aria-labelledby="selected-cases-title">
          <h2 id="selected-cases-title">Selected cases</h2>
          <div className="project-grid all-projects">
            {visibleLeadProjects.map((project, index) => (
              <ProjectCard index={index} key={project.slug} project={project} />
            ))}
          </div>
        </section>
      ) : null}
      {visibleCurrentBuilds.length ? (
        <section className="project-library-group" aria-labelledby="current-builds-title">
          <h2 id="current-builds-title">Current builds</h2>
          <div className="project-grid all-projects">
            {visibleCurrentBuilds.map((project, index) => (
              <ProjectCard index={index} key={project.slug} project={project} />
            ))}
          </div>
        </section>
      ) : null}
      {visibleSupportingProjects.length ? (
        <section className="project-library-group" aria-labelledby="supporting-work-title">
          <h2 id="supporting-work-title">Archive &amp; supporting work</h2>
          <div className="project-grid all-projects">
            {visibleSupportingProjects.map((project, index) => (
              <ProjectCard index={index} key={project.slug} project={project} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
