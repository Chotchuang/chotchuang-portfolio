import type { Metadata } from "next";
import { ProjectExplorer } from "../components/ProjectExplorer";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore Chotchuang's work across analytics, product, fintech, automation, and data systems.",
};

export default function ProjectIndex() {
  return (
    <main>
      <div className="shell">
        <SiteHeader />
        <section className="page-hero">
          <p className="eyebrow">PROJECT ARCHIVE</p>
          <h1>
            Work organized around
            <span> decisions and evidence.</span>
          </h1>
          <p>
            Flagship builds, capstones, engineering labs, and focused research—each
            labeled so you can see what is observed, simulated, proposed, or still in
            progress.
          </p>
        </section>
        <section className="project-index-section">
          <ProjectExplorer />
        </section>
        <SiteFooter />
      </div>
    </main>
  );
}
