import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";
import { projectBySlug, projects } from "../../data/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: project.shortTitle,
    description: project.summary,
  };
}

export default async function ProjectDetail({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projectBySlug(slug);

  if (!project) {
    notFound();
  }

  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <main>
      <div className="shell">
        <SiteHeader />
        <article className="case-study">
          <header className="case-header">
            <Link className="back-link" href="/project">
              ← All projects
            </Link>
            <div className="case-meta">
              <span>{project.category}</span>
              <span>{project.status}</span>
            </div>
            <h1>{project.title}</h1>
            <p className="case-summary">{project.summary}</p>
            <div className="disclosure-banner">
              <span>Evidence label</span>
              <strong>{project.disclosure}</strong>
            </div>
          </header>

          {project.coverImage ? (
            <figure className="case-hero">
              <Image
                alt=""
                fill
                priority
                sizes="(max-width: 1180px) 100vw, 1120px"
                src={project.coverImage}
                unoptimized
              />
            </figure>
          ) : null}

          {project.gallery?.length ? (
            <section aria-label="Project gallery" className="case-gallery">
              {project.gallery.map((image) => (
                <figure className="case-gallery-item" key={image.src}>
                  <div className="case-gallery-media">
                    <Image
                      alt={image.alt}
                      fill
                      sizes="(max-width: 760px) 100vw, 50vw"
                      src={image.src}
                      unoptimized
                    />
                  </div>
                  <figcaption>{image.caption}</figcaption>
                </figure>
              ))}
            </section>
          ) : null}

          <div className="case-layout">
            <aside className="case-sidebar">
              <p className="eyebrow">TOOLKIT</p>
              <div className="chip-row">
                {project.tech.map((item) => (
                  <span className="chip" key={item}>
                    {item}
                  </span>
                ))}
              </div>
              {project.liveUrl ? (
                <a
                  className="button button-primary"
                  href={project.liveUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  Open live project ↗
                </a>
              ) : null}
              {project.githubUrl ? (
                <a
                  className="button button-secondary"
                  href={project.githubUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  View source ↗
                </a>
              ) : null}
              {project.files?.length ? (
                <a className="button button-secondary" href="#work-files">
                  View {project.files.length} work file{project.files.length > 1 ? "s" : ""}
                </a>
              ) : null}
            </aside>

            <div className="case-content">
              {project.role ? (
                <section>
                  <p className="eyebrow">MY ROLE</p>
                  <h2>{project.role}</h2>
                </section>
              ) : null}
              <section>
                <p className="eyebrow">THE DECISION</p>
                <h2>{project.decision}</h2>
              </section>
              {project.travelCases?.length ? (
                <section aria-label="Four equal Travel cases">
                  <p className="eyebrow">FOUR EQUAL CASES</p>
                  <h2>
                    Each case carries its own decision, evidence label, finding,
                    action, and limitation.
                  </h2>
                  <div className="case-file-list">
                    {project.travelCases.map((travelCase, index) => (
                      <article className="case-file" key={travelCase.name}>
                        <div className="file-badge">{index + 1}</div>
                        <div>
                          <h3>{travelCase.name}</h3>
                          <p>
                            <strong>Decision.</strong> {travelCase.decision}
                          </p>
                          <p>
                            <strong>Evidence label.</strong>{" "}
                            {travelCase.evidenceLabel}
                          </p>
                          <p>
                            <strong>Finding.</strong> {travelCase.finding}
                          </p>
                          <p>
                            <strong>Action.</strong> {travelCase.action}
                          </p>
                          <p>
                            <strong>Limitation.</strong> {travelCase.limitation}
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              ) : null}
              <section>
                <p className="eyebrow">APPROACH</p>
                <ol className="case-list">
                  {project.methods.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              </section>
              <section>
                <p className="eyebrow">EVIDENCE & DELIVERABLES</p>
                <ul className="evidence-list">
                  {project.evidence.map((item) => (
                    <li key={item}>
                      <span aria-hidden="true">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
              {project.files?.length ? (
                <section id="work-files">
                  <p className="eyebrow">SELECTED WORK FILES</p>
                  <div className="case-file-list">
                    {project.files.map((file) => (
                      <article className="case-file" key={file.href}>
                        <div className="file-badge">{file.format}</div>
                        <div>
                          <h3>{file.title}</h3>
                          <p>{file.description}</p>
                          <span>{file.size}</span>
                        </div>
                        <a
                          aria-label={`Open ${file.title}`}
                          href={file.href}
                          rel="noreferrer"
                          target="_blank"
                        >
                          Open ↗
                        </a>
                      </article>
                    ))}
                  </div>
                </section>
              ) : null}
              <section className="integrity-note">
                <p className="eyebrow">EVIDENCE INTEGRITY</p>
                <p>
                  This case is presented as <strong>{project.disclosure.toLowerCase()}</strong>.
                  The label distinguishes observed work from simulated impact, proxies,
                  historical comparisons, or proposed architecture.
                </p>
              </section>
            </div>
          </div>
        </article>

        <section className="next-case">
          <p className="eyebrow">NEXT CASE</p>
          <Link href={`/project/${nextProject.slug}`}>
            <span>{nextProject.category}</span>
            <strong>{nextProject.shortTitle}</strong>
            <b aria-hidden="true">→</b>
          </Link>
        </section>
        <SiteFooter />
      </div>
    </main>
  );
}
