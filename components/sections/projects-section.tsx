import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { ProjectCard } from "@/components/ui/project-card";
import { getFeaturedProjects } from "@/lib/projects";
import { cn } from "@/lib/utils";

/**
 * ProjectsSection — home page featured projects.
 * Server Component — reads data at build time.
 * Shows up to 3 featured projects with a "See all" CTA.
 */
export function ProjectsSection() {
  const featured = getFeaturedProjects().slice(0, 3);

  return (
    <Section
      id="projects"
      aria-labelledby="projects-heading"
      background="muted"
    >
      <Container>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            id="projects-heading"
            label="Work"
            title="Featured projects"
            description="Selected work demonstrating full stack development across different problem domains."
          />
          <Link
            href="/projects"
            className={cn(
              "inline-flex items-center gap-1.5 shrink-0",
              "text-sm font-medium text-primary hover:text-primary/80",
              "transition-colors duration-[150ms]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-sm",
              "pb-1 self-end"
            )}
          >
            All projects
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

        {featured.length > 0 ? (
          <div
            className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            role="list"
            aria-label="Featured projects"
          >
            {featured.map((project) => (
              <div key={project.slug} role="listitem">
                <ProjectCard project={project} className="h-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-xl border border-dashed border-border p-12 text-center">
            <p className="text-muted-foreground text-sm">
              Projects coming soon.
            </p>
          </div>
        )}
      </Container>
    </Section>
  );
}
