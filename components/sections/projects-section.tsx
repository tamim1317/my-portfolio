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
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            id="projects-heading"
            label="Work"
            title="Featured projects"
            description="Selected work demonstrating full stack development across different problem domains."
          />

          <Link
            href="/projects"
            className={cn(
              "group inline-flex items-center gap-1.5 shrink-0",
              "text-sm font-medium text-primary",
              "hover:gap-2.5 transition-all duration-300 ease-out",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-sm",
              "self-start sm:self-end pb-1"
            )}
          >
            All projects
            <ArrowRight
              size={15}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {featured.length > 0 ? (
          <div
            className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3"
            role="list"
            aria-label="Featured projects"
          >
            {featured.map((project, index) => (
              <div
                key={project.slug}
                role="listitem"
                className={cn(
                  index === 0 ? "lg:col-span-3" : "lg:col-span-1",
                  "animate-[fade-in-up_0.5s_ease-out_both]",
                  index === 0 && "delay-0",
                  index === 1 && "delay-100",
                  index === 2 && "delay-200"
                )}
              >
                <ProjectCard
                  project={project}
                  variant={index === 0 ? "featured" : "default"}
                  className="h-full"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-2xl border border-dashed border-border/70 bg-card/40 p-16 text-center">
            <p className="text-sm text-muted-foreground">
              Projects coming soon.
            </p>
          </div>
        )}
      </Container>
    </Section>
  );
}