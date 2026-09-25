import type { Metadata } from "next";
import Link from "next/link";
import { Download, Mail, MapPin, ExternalLink } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  siteConfig,
  education,
  experience,
  certifications,
  isConfigured,
} from "@/lib/site";
import { skillGroups } from "@/lib/skills";
import { getFeaturedProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume of Md Tamim Hossain — Aspiring Full Stack Web Developer from Bangladesh. Skills in React, Next.js, TypeScript, Node.js.",
  alternates: {
    canonical: `${siteConfig.url}/resume`,
  },
};

/* ── Resume section wrapper ── */
function ResumeSection({
  title,
  id,
  children,
}: {
  title: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <section
      aria-labelledby={`resume-${id}`}
      className="flex flex-col gap-4 print:gap-3"
    >
      <div className="flex items-center gap-3">
        <h2
          id={`resume-${id}`}
          className="shrink-0 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground"
        >
          {title}
        </h2>
        <div className="h-px flex-1 bg-border/70" aria-hidden="true" />
      </div>
      {children}
    </section>
  );
}

export default function ResumePage() {
  const featuredProjects = getFeaturedProjects();
  const coreSkillGroups = skillGroups.filter(
    (g) => g.title !== "Currently Learning"
  );

  return (
    <>
      {/* Header hidden on print */}
      <div className="print:hidden">
        <Header />
      </div>

      <main id="main-content" className="print:block">
        {/* ── Download bar ── */}
        <div className="print:hidden border-b border-border/60 bg-muted/20">
          <div className="container-wide flex h-14 items-center justify-between gap-4">
            <p className="text-[13px] text-muted-foreground">
              Web resume — readable on any device
            </p>
            {isConfigured(siteConfig.resumePdfUrl) ? (
              <a
                href={siteConfig.resumePdfUrl}
                download
                className={cn(
                  "inline-flex h-9 shrink-0 items-center gap-2 rounded-full px-4 text-[13px] font-semibold",
                  "bg-primary text-primary-foreground",
                  "shadow-sm hover:shadow-md hover:bg-primary/90",
                  "transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                )}
                aria-label="Download PDF resume"
              >
                <Download size={14} aria-hidden="true" />
                Download PDF
              </a>
            ) : (
              <span className="shrink-0 text-[12px] italic text-muted-foreground">
                PDF coming soon
              </span>
            )}
          </div>
        </div>

        {/* ── Resume document ── */}
        <div
          className={cn(
            "container-narrow py-12 md:py-16",
            "print:max-w-none print:px-0 print:py-4"
          )}
        >
          {/* ── Header ── */}
          <header className="mb-10 flex flex-col gap-4 print:mb-6">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-bold tracking-tight text-foreground print:text-2xl">
                {siteConfig.name}
              </h1>
              <p className="text-lg font-medium text-muted-foreground">
                {siteConfig.role}
              </p>
            </div>

            {/* Contact details */}
            <address className="not-italic flex flex-wrap gap-x-5 gap-y-1.5 text-[13px] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin size={13} aria-hidden="true" />
                {siteConfig.location} — {siteConfig.locationNote}
              </span>

              {isConfigured(siteConfig.email) && (
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-1.5 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-sm"
                >
                  <Mail size={13} aria-hidden="true" />
                  {siteConfig.email}
                </a>
              )}

              {siteConfig.social.github &&
                !siteConfig.social.github.includes("[PLACEHOLDER") && (
                  <a
                    href={siteConfig.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-sm"
                  >
                    <GitHubIcon size={13} aria-hidden="true" />
                    GitHub
                  </a>
                )}

              {siteConfig.social.linkedin &&
                !siteConfig.social.linkedin.includes("[PLACEHOLDER") && (
                  <a
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-sm"
                  >
                    <LinkedInIcon size={13} aria-hidden="true" />
                    LinkedIn
                  </a>
                )}

              <a
                href={siteConfig.url}
                className="flex items-center gap-1.5 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-sm"
              >
                <ExternalLink size={13} aria-hidden="true" />
                {siteConfig.url.replace(/^https?:\/\//, "")}
              </a>
            </address>

            <Separator className="opacity-60" />
          </header>

          <div className="flex flex-col gap-10 print:gap-7">
            {/* ── Summary ── */}
            <ResumeSection title="Summary" id="summary">
              <p className="text-[14px] leading-relaxed text-muted-foreground">
                {siteConfig.resumeSummary}
              </p>
            </ResumeSection>

            {/* ── Technical Skills ── */}
            <ResumeSection title="Technical Skills" id="skills">
              <div className="flex flex-col gap-3.5">
                {coreSkillGroups.map((group) => (
                  <div
                    key={group.title}
                    className="flex flex-col gap-1.5 sm:flex-row sm:gap-4"
                  >
                    <dt className="w-28 shrink-0 pt-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      {group.title}
                    </dt>
                    <dd className="flex flex-wrap gap-1.5">
                      {group.skills.map((skill) => (
                        <Badge key={skill.name} variant="tech">
                          {skill.name}
                        </Badge>
                      ))}
                    </dd>
                  </div>
                ))}
              </div>
            </ResumeSection>

            {/* ── Projects ── */}
            <ResumeSection title="Projects" id="projects">
              <div className="flex flex-col gap-6">
                {featuredProjects.length > 0 ? (
                  featuredProjects.map((project) => (
                    <article key={project.slug} className="flex flex-col gap-2">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-[14px] font-semibold text-foreground">
                            {project.title}
                          </h3>
                          <div className="flex items-center gap-2">
                            {project.liveUrl &&
                              !project.liveUrl.includes("[PLACEHOLDER") && (
                                <a
                                  href={project.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[12px] text-primary hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:rounded-sm"
                                >
                                  Live ↗
                                </a>
                              )}
                            {project.githubUrl &&
                              !project.githubUrl.includes("[PLACEHOLDER") && (
                                <a
                                  href={project.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[12px] text-primary hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:rounded-sm"
                                >
                                  GitHub ↗
                                </a>
                              )}
                          </div>
                        </div>
                        <span className="shrink-0 text-[12px] text-muted-foreground">
                          {project.year}
                        </span>
                      </div>
                      <p className="text-[13px] leading-relaxed text-muted-foreground">
                        {project.shortDescription}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 6).map((t) => (
                          <Badge key={t} variant="tech">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </article>
                  ))
                ) : (
                  <p className="text-[13px] italic text-muted-foreground">
                    [PLACEHOLDER: Add your projects to lib/projects.ts]
                  </p>
                )}

                <div className="print:hidden">
                  <Link
                    href="/projects"
                    className="text-[13px] font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-sm"
                  >
                    View all projects with case studies →
                  </Link>
                </div>
              </div>
            </ResumeSection>

            {/* ── Education ── */}
            <ResumeSection title="Education" id="education">
              <div className="flex flex-col gap-4">
                {education.map((edu, i) => (
                  <article key={i} className="flex flex-col gap-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="text-[14px] font-semibold text-foreground">
                          {edu.degree} in {edu.field}
                        </h3>
                        <p className="text-[13px] text-muted-foreground">
                          {edu.institution}
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-1">
                        {edu.year && (
                          <span className="text-[12px] text-muted-foreground">
                            {edu.year}
                          </span>
                        )}
                        {edu.status === "in-progress" && (
                          <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-600 dark:text-amber-400">
                            In progress
                          </span>
                        )}
                      </div>
                    </div>
                    {edu.grade && (
                      <p className="text-[12px] text-muted-foreground">
                        {edu.grade}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            </ResumeSection>

            {/* ── Experience ── */}
            <ResumeSection title="Experience" id="experience">
              {experience.length > 0 ? (
                <div className="flex flex-col gap-6">
                  {experience.map((entry, i) => (
                    <article key={i} className="flex flex-col gap-2">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h3 className="text-[14px] font-semibold text-foreground">
                            {entry.title}
                          </h3>
                          <p className="text-[13px] text-muted-foreground">
                            {entry.company}
                            {entry.location ? ` — ${entry.location}` : ""}
                          </p>
                        </div>
                        <div className="flex shrink-0 flex-col items-end gap-1">
                          <span className="text-[12px] text-muted-foreground">
                            {entry.startDate} —{" "}
                            {entry.current ? "Present" : entry.endDate ?? ""}
                          </span>
                          <span className="text-[11px] capitalize text-muted-foreground">
                            {entry.type}
                          </span>
                        </div>
                      </div>
                      {entry.highlights.length > 0 && (
                        <ul className="flex flex-col gap-1.5 pl-1">
                          {entry.highlights.map((h, j) => (
                            <li
                              key={j}
                              className="flex items-start gap-2 text-[13px] text-muted-foreground"
                            >
                              <span
                                aria-hidden="true"
                                className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground/60"
                              />
                              {h}
                            </li>
                          ))}
                        </ul>
                      )}
                      {entry.technologies && entry.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-0.5">
                          {entry.technologies.map((t) => (
                            <Badge key={t} variant="tech">
                              {t}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              ) : (
                <p className="text-[13px] italic text-muted-foreground">
                  [PLACEHOLDER: Add employment history to the{" "}
                  <code className="text-[12px]">experience</code> array in{" "}
                  <code className="text-[12px]">lib/site.ts</code>. Only add
                  verified roles.]
                </p>
              )}
            </ResumeSection>

            {/* ── Certifications ── */}
            <ResumeSection
              title="Certifications & Achievements"
              id="certifications"
            >
              {certifications.length > 0 ? (
                <div className="flex flex-col gap-4">
                  {certifications.map((cert, i) => (
                    <article key={i} className="flex flex-col gap-0.5">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h3 className="text-[14px] font-semibold text-foreground">
                            {cert.url && isConfigured(cert.url) ? (
                              <a
                                href={cert.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:rounded-sm"
                              >
                                {cert.title} ↗
                              </a>
                            ) : (
                              cert.title
                            )}
                          </h3>
                          <p className="text-[13px] text-muted-foreground">
                            {cert.issuer}
                          </p>
                        </div>
                        {cert.date && (
                          <span className="shrink-0 text-[12px] text-muted-foreground">
                            {cert.date}
                          </span>
                        )}
                      </div>
                      {cert.description && (
                        <p className="text-[12px] text-muted-foreground">
                          {cert.description}
                        </p>
                      )}
                    </article>
                  ))}
                </div>
              ) : (
                <p className="text-[13px] italic text-muted-foreground">
                  [PLACEHOLDER: Add verified certifications to the{" "}
                  <code className="text-[12px]">certifications</code> array in{" "}
                  <code className="text-[12px]">lib/site.ts</code>.]
                </p>
              )}
            </ResumeSection>
          </div>
        </div>
      </main>

      {/* Footer hidden on print */}
      <div className="print:hidden">
        <Footer />
      </div>
    </>
  );
}