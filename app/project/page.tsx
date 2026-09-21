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
          <p className="eyebrow">PORTFOLIO LIBRARY</p>
          <h1>
            Work organized around
            <span> decisions and evidence.</span>
          </h1>
          <p>
            Start with the selected cases and current builds. Earlier coursework,
            concepts, and focused research remain available in the supporting archive,
            each with an explicit evidence label.
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
