import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";
import { projectsWithFiles, workFiles } from "../data/projects";

export const metadata: Metadata = {
  title: "Work Files",
  description:
    "Open selected decks, analytical models, and browser-ready dashboards from Chotchuang's portfolio.",
};

export default function WorkFilesPage() {
  return (
    <main>
      <div className="shell">
        <SiteHeader />
        <section className="page-hero files-hero">
          <p className="eyebrow">WORK FILES</p>
          <h1>
            Evidence you can
            <span> open and inspect.</span>
          </h1>
          <p>
            A recruiter-ready selection of decks, editable analytical models, and
            browser-based dashboards. Synthetic and public-source work is labeled
            clearly; private data is not published.
          </p>
          <div className="file-summary" aria-label="Work file summary">
            <span>
              <strong>{workFiles.length}</strong> files
            </span>
            <span>
              <strong>{projectsWithFiles.length}</strong> case studies
            </span>
            <span>
              <strong>3</strong> formats
            </span>
          </div>
        </section>

        <section className="files-section">
          {projectsWithFiles.map((project) => (
            <article className="file-group" key={project.slug}>
              <header>
                <div>
                  <p className="eyebrow">{project.category}</p>
                  <h2>{project.shortTitle}</h2>
                  <p>{project.disclosure}</p>
                </div>
                <Link className="text-link" href={`/project/${project.slug}`}>
                  View case study <span aria-hidden="true">↗</span>
                </Link>
              </header>

              <div className="file-grid">
                {project.files?.map((file) => (
                  <div className="file-card" key={file.href}>
                    <div className="file-card-topline">
                      <span className="file-badge">{file.format}</span>
                      <span>{file.size}</span>
                    </div>
                    <h3>{file.title}</h3>
                    <p>{file.description}</p>
                    <a
                      className="button button-primary"
                      href={file.href}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {file.format === "Excel" ? "Download file ↓" : "Open file ↗"}
                    </a>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className="file-integrity">
          <p className="eyebrow">PUBLICATION NOTE</p>
          <h2>Selected for evidence, screened for privacy.</h2>
          <p>
            Published files use synthetic, simulated, historical, or public-source
            evidence as stated in each case study. Personal datasets, credentials,
            and confidential source files remain private.
          </p>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}
