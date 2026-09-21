import Link from "next/link";
import { ProjectCard } from "./components/ProjectCard";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import {
  completedProjects,
  conceptProjects,
  projectBySlug,
  projects,
  projectsInProgress,
} from "./data/projects";

export default function Home() {
  const productOperationsCase = projectBySlug("travel-product-analytics");

  return (
    <main>
      <div className="shell">
        <SiteHeader />

        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow hero-kicker">BUSINESS ANALYTICS × PRODUCT × FINANCE</p>
            <h1>
              I turn complex data into
              <span> decisions people can act on.</span>
            </h1>
            <p className="hero-lede">
              I&apos;m Chotchuang, a business-minded analyst and builder working across
              growth, product, fintech, market intelligence, and data systems.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/project/travel-product-analytics">
                View Product Operations case
              </Link>
              <Link className="button button-secondary" href="/project">
                Explore all work
              </Link>
              <a className="button button-secondary" href="mailto:chotchuang.cc@gmail.com">
                Start a conversation
              </a>
            </div>
          </div>

          <div className="hero-system" aria-label="Portfolio overview">
            <div className="signal-orbit orbit-one" />
            <div className="signal-orbit orbit-two" />
            <div className="signal-core">
              <span>DECISION</span>
              <strong>INTELLIGENCE</strong>
              <small>evidence → action</small>
            </div>
            <div className="signal-label signal-label-one">GROWTH</div>
            <div className="signal-label signal-label-two">PRODUCT</div>
            <div className="signal-label signal-label-three">FINANCE</div>
            <div className="signal-label signal-label-four">SYSTEMS</div>
          </div>
        </section>

        <section className="proof-strip" aria-label="Portfolio summary">
          <div>
            <strong>{projects.length}</strong>
            <span>projects curated</span>
          </div>
          <div>
            <strong>{completedProjects.length}</strong>
            <span>completed cases</span>
          </div>
          <div>
            <strong>{projectsInProgress.length}</strong>
            <span>active builds</span>
          </div>
          <div>
            <strong>{conceptProjects.length}</strong>
            <span>concepts & research</span>
          </div>
        </section>

        {productOperationsCase ? (
          <section className="role-path" aria-labelledby="product-operations-path">
            <div className="role-path-intro">
              <p className="eyebrow">PRODUCT OPERATIONS PATH</p>
              <h2 id="product-operations-path">From an operational gap to a measured weekly cadence.</h2>
              <p>
                Start with the travel marketplace case: prioritize content gaps, test an
                intervention, and use a weekly brief to surface exceptions and next actions.
              </p>
              <Link className="button button-primary" href={`/project/${productOperationsCase.slug}`}>
                Open the case study
              </Link>
            </div>
            <div className="role-path-evidence">
              <p className="eyebrow">WHAT TO INSPECT</p>
              <ol>
                <li>
                  <strong>Decision:</strong> which property-content gaps should be fixed first?
                </li>
                <li>
                  <strong>Evidence:</strong> public listings and synthetic clickstream, with proxy and
                  simulated impact labelled.
                </li>
                <li>
                  <strong>Operating output:</strong> a ranked backlog, experiment readout, and weekly
                  Product Ops brief.
                </li>
              </ol>
              <p className="role-path-disclosure">{productOperationsCase.disclosure}</p>
            </div>
          </section>
        ) : null}

        <section className="section" id="work">
          <div className="section-heading">
            <div>
              <p className="eyebrow">COMPLETED WORK</p>
              <h2>Every completed case, ready to inspect.</h2>
            </div>
            <Link className="text-link section-link" href="/project">
              Browse all {projects.length} projects <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="project-grid featured-grid">
            {completedProjects.map((project, index) => (
              <ProjectCard index={index} key={project.slug} project={project} />
            ))}
          </div>
        </section>

        <section className="section" id="builds">
          <div className="section-heading">
            <div>
              <p className="eyebrow">BUILD IN PROGRESS</p>
              <h2>Work being completed with the same evidence standard.</h2>
            </div>
          </div>
          <div className="project-grid">
            {projectsInProgress.map((project, index) => (
              <ProjectCard index={index} key={project.slug} project={project} />
            ))}
          </div>
        </section>

        <section className="section" id="research">
          <div className="section-heading">
            <div>
              <p className="eyebrow">CONCEPT & RESEARCH</p>
              <h2>Proposals and research, clearly separate from completed builds.</h2>
            </div>
          </div>
          <div className="project-grid">
            {conceptProjects.map((project, index) => (
              <ProjectCard index={index} key={project.slug} project={project} />
            ))}
          </div>
        </section>

        <section className="section about-section" id="about">
          <div className="about-title">
            <p className="eyebrow">HOW I WORK</p>
            <h2>Commercial judgment, analytical depth, and honest evidence.</h2>
          </div>
          <div className="principles">
            <article>
              <span>01</span>
              <h3>Frame the decision</h3>
              <p>
                Start with who must choose what—not with a tool, model, or
                pre-selected chart.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>Build the evidence</h3>
              <p>
                Connect data models, analysis, experiments, and economics into one
                inspectable argument.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>Label the limits</h3>
              <p>
                Separate observed results from simulations, proxies, estimates, and
                concept proposals.
              </p>
            </article>
          </div>
        </section>

        <section className="section work-experience" aria-labelledby="work-experience-title">
          <div className="work-experience-copy">
            <p className="eyebrow">MY RECENT WORK EXPERIENCE</p>
            <h2 id="work-experience-title">Building partnerships in a technology team.</h2>
            <p>
              In 2025, I was listed as Director, Business Development, Thailand at
              ParallelChain Lab. The profile and team directory below document that
              role and the broader group I worked alongside.
            </p>
          </div>
          <div className="work-experience-media">
            <figure>
              <img
                alt="ParallelChain Lab profile listing Chotchuang Chotnapalai as Director, Business Development, Thailand"
                height={475}
                src="/about/parallelchain-profile.png"
                width={820}
              />
              <figcaption>Role profile from the former ParallelChain Lab team site.</figcaption>
            </figure>
            <figure>
              <img
                alt="ParallelChain Lab team directory with the logo and all visible team members, including Chotchuang"
                height={1176}
                src="/about/parallelchain-team.png"
                width={570}
              />
              <figcaption>Team directory from the former ParallelChain Lab site.</figcaption>
            </figure>
          </div>
        </section>

        <section className="section capability-section">
          <p className="eyebrow">CAPABILITIES</p>
          <div className="capability-grid">
            <div>
              <h3>Analytics</h3>
              <p>SQL · Python · statistics · experimentation · visualization</p>
            </div>
            <div>
              <h3>Business</h3>
              <p>Growth · unit economics · partner strategy · KPI design</p>
            </div>
            <div>
              <h3>Product</h3>
              <p>Funnels · prioritization · automation · operating cadence</p>
            </div>
            <div>
              <h3>Finance & AI</h3>
              <p>Portfolio analytics · fintech · ML research · agent systems</p>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}
