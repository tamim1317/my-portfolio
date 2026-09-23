import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { Separator } from "@/components/ui/separator";
import { CaseStudyHero } from "@/components/case-study/case-study-hero";
import { CaseStudyMeta } from "@/components/case-study/case-study-meta";
import { CaseStudySection } from "@/components/case-study/case-study-section";
import { FeatureList } from "@/components/case-study/feature-list";
import { ChallengeCards } from "@/components/case-study/challenge-cards";
import { DecisionCards } from "@/components/case-study/decision-cards";
import { ResultCards } from "@/components/case-study/result-cards";
import { ImageGallery } from "@/components/case-study/image-gallery";
import { CaseStudyNav } from "@/components/case-study/case-study-nav";
import { ArchitectureBreakdown } from "@/components/case-study/architecture-breakdown";
import {
  getAllProjects,
  getProjectBySlug,
  getAdjacentProjects,
} from "@/lib/projects";
import { siteConfig } from "@/lib/site";

/* ── Static params — pre-render all project pages at build time ── */
export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

/* ── Per-page metadata ── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const title = project.title.includes("[PLACEHOLDER")
    ? "Project Case Study"
    : project.title;
  const description = project.shortDescription.includes("[PLACEHOLDER")
    ? "A project case study by Md Tamim Hossain."
    : project.shortDescription;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.url}/projects/${slug}`,
    },
    openGraph: {
      title: `${title} — Md Tamim Hossain`,
      description,
      url: `${siteConfig.url}/projects/${slug}`,
      images: !project.coverImage.includes("[PLACEHOLDER")
        ? [{ url: project.coverImage, width: 1200, height: 675, alt: `${title} — project screenshot` }]
        : [],
    },
  };
}

/* ── Page component ── */
export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title.includes("[PLACEHOLDER") ? "Project" : project.title,
    description: project.shortDescription.includes("[PLACEHOLDER")
      ? undefined
      : project.shortDescription,
    author: {
      "@type": "Person",
      name: "Md Tamim Hossain",
      url: siteConfig.url,
    },
    url: project.liveUrl?.includes("[PLACEHOLDER") ? undefined : project.liveUrl,
    applicationCategory: "WebApplication",
  };

  return (
    <>
      <Header />

      <main id="main-content">
        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />

        {/* Hero + breadcrumb */}
        <CaseStudyHero project={project} />

        {/* Metadata strip */}
        <CaseStudyMeta project={project} />

        {/* ── Main case study content ── */}
        <Container className="py-14 md:py-20">
          {/* Two-column layout on desktop: content left, sidebar ToC right */}
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_14rem]">

            {/* ── Primary content column ── */}
            <div className="flex flex-col gap-14 min-w-0">

              {/* Overview — target users + purpose (quick context) */}
              {(project.targetUsers || project.purpose) && (
                <section
                  aria-labelledby="cs-overview-heading"
                  className="flex flex-col gap-4"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-eyebrow text-primary">Overview</span>
                    <h2
                      id="cs-overview-heading"
                      className="text-display-lg text-foreground"
                    >
                      About this project
                    </h2>
                  </div>
                  <div className="flex flex-col gap-4 text-body-md text-muted-foreground">
                    {project.targetUsers && (
                      <div className="flex flex-col gap-1">
                        <p className="text-xs font-semibold uppercase tracking-widest text-foreground">
                          Built for
                        </p>
                        <p>{project.targetUsers}</p>
                      </div>
                    )}
                    {project.purpose && (
                      <div className="flex flex-col gap-1">
                        <p className="text-xs font-semibold uppercase tracking-widest text-foreground">
                          Why it was built
                        </p>
                        <p>{project.purpose}</p>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* Problem */}
              {project.problem && (
                <CaseStudySection label="01" title="The Problem">
                  <p>{project.problem}</p>
                </CaseStudySection>
              )}

              {/* Goals */}
              {project.goals && project.goals.length > 0 && (
                <CaseStudySection label="02" title="Goals">
                  <ul className="flex flex-col gap-2 mt-1">
                    {project.goals.map((goal, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span
                          aria-hidden="true"
                          className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0"
                        />
                        {goal}
                      </li>
                    ))}
                  </ul>
                </CaseStudySection>
              )}

              {/* Solution */}
              {project.solution && (
                <CaseStudySection label="03" title="The Solution">
                  <p>{project.solution}</p>
                </CaseStudySection>
              )}

              {/* Features */}
              {project.features && project.features.length > 0 && (
                <section aria-labelledby="cs-features-heading" className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-eyebrow text-primary">04</span>
                    <h2 id="cs-features-heading" className="text-display-lg text-foreground">
                      Key Features
                    </h2>
                  </div>
                  <FeatureList features={project.features} />
                </section>
              )}

              {/* Architecture — prose + structured breakdown */}
              {(project.architecture || project.architectureBreakdown) && (
                <section aria-labelledby="cs-arch-heading" className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1">
                    <span className="text-eyebrow text-primary">05</span>
                    <h2 id="cs-arch-heading" className="text-display-lg text-foreground">
                      Technical Architecture
                    </h2>
                  </div>
                  {project.architecture && (
                    <p className="text-body-md text-muted-foreground">
                      {project.architecture}
                    </p>
                  )}
                  {project.architectureBreakdown && (
                    <ArchitectureBreakdown breakdown={project.architectureBreakdown} />
                  )}
                </section>
              )}

              <Separator />

              {/* Technical decisions */}
              {project.technicalDecisions && project.technicalDecisions.length > 0 && (
                <section aria-labelledby="cs-decisions-heading" className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-eyebrow text-primary">06</span>
                    <h2 id="cs-decisions-heading" className="text-display-lg text-foreground">
                      Engineering Decisions
                    </h2>
                  </div>
                  <DecisionCards decisions={project.technicalDecisions} />
                </section>
              )}

              {/* Challenges */}
              {project.challenges && project.challenges.length > 0 && (
                <section aria-labelledby="cs-challenges-heading" className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-eyebrow text-primary">07</span>
                    <h2 id="cs-challenges-heading" className="text-display-lg text-foreground">
                      Challenges
                    </h2>
                  </div>
                  <ChallengeCards challenges={project.challenges} />
                </section>
              )}

              {/* Gallery */}
              {project.images && project.images.length > 0 && (
                <section aria-labelledby="cs-gallery-heading" className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-eyebrow text-primary">08</span>
                    <h2 id="cs-gallery-heading" className="text-display-lg text-foreground">
                      Screenshots
                    </h2>
                  </div>
                  <ImageGallery
                    images={project.images}
                    projectTitle={project.title}
                  />
                </section>
              )}

              <Separator />

              {/* Results */}
              {project.results && project.results.length > 0 && (
                <section aria-labelledby="cs-results-heading" className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-eyebrow text-primary">09</span>
                    <h2 id="cs-results-heading" className="text-display-lg text-foreground">
                      Results
                    </h2>
                  </div>
                  <ResultCards results={project.results} />
                </section>
              )}

              {/* Lessons learned */}
              {project.lessonsLearned && (
                <CaseStudySection label="10" title="Lessons Learned">
                  <p>{project.lessonsLearned}</p>
                </CaseStudySection>
              )}
            </div>

            {/* ── Sidebar — desktop table of contents ── */}
            <aside
              aria-label="Case study contents"
              className="hidden lg:block"
            >
              <div className="sticky top-24 flex flex-col gap-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                  Contents
                </p>
                {[
                  (project.targetUsers || project.purpose) && { id: "cs-overview-heading", label: "Overview" },
                  project.problem && { id: "cs-01", label: "Problem" },
                  project.goals?.length && { id: "cs-02", label: "Goals" },
                  project.solution && { id: "cs-03", label: "Solution" },
                  project.features?.length && { id: "cs-features-heading", label: "Features" },
                  (project.architecture || project.architectureBreakdown) && { id: "cs-arch-heading", label: "Architecture" },
                  project.technicalDecisions?.length && { id: "cs-decisions-heading", label: "Decisions" },
                  project.challenges?.length && { id: "cs-challenges-heading", label: "Challenges" },
                  project.images?.length && { id: "cs-gallery-heading", label: "Screenshots" },
                  project.results?.length && { id: "cs-results-heading", label: "Results" },
                  project.lessonsLearned && { id: "cs-10", label: "Lessons" },
                ]
                  .filter(Boolean)
                  .map((item) => {
                    if (!item) return null;
                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-[150ms] py-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-sm"
                      >
                        {item.label}
                      </a>
                    );
                  })}
              </div>
            </aside>
          </div>
        </Container>
      </main>

      {/* Adjacent project navigation */}
      <CaseStudyNav prev={prev} next={next} />
      <Footer />
    </>
  );
}
