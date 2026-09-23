import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/ui/icons";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/projects";

const statusConfig = {
  live: { label: "Live", dot: "bg-emerald-500" },
  "in-progress": { label: "In Progress", dot: "bg-amber-500" },
  archived: { label: "Archived", dot: "bg-muted-foreground" },
} satisfies Record<Project["status"], { label: string; dot: string }>;

interface CaseStudyHeroProps {
  project: Project;
}

export function CaseStudyHero({ project }: CaseStudyHeroProps) {
  const status = statusConfig[project.status];
  const hasCover = !project.coverImage.includes("[PLACEHOLDER");

  return (
    <div className="border-b border-border">
      {/* Breadcrumb / back */}
      <div className="border-b border-border bg-muted/30">
        <Container>
          <div className="flex items-center h-11">
            <Link
              href="/projects"
              className={cn(
                "inline-flex items-center gap-1.5 text-sm text-muted-foreground",
                "hover:text-foreground transition-colors duration-[150ms]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-sm"
              )}
            >
              <ArrowLeft size={14} aria-hidden="true" />
              All projects
            </Link>
          </div>
        </Container>
      </div>

      {/* Hero content */}
      <Container>
        <div className="py-12 md:py-16 flex flex-col gap-6 max-w-3xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 text-xs font-medium",
                "rounded-full border px-2.5 py-1",
                project.status === "live"
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                  : project.status === "in-progress"
                  ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                  : "bg-muted text-muted-foreground border-border"
              )}
            >
              <span
                aria-hidden="true"
                className={cn("w-1.5 h-1.5 rounded-full", status.dot)}
              />
              {status.label}
            </span>
            <span className="text-xs text-muted-foreground">{project.year}</span>
          </div>

          <h1 className="text-display-xl text-foreground">{project.title}</h1>
          <p className="text-body-lg text-muted-foreground">{project.description}</p>

          {/* External links */}
          <div className="flex flex-wrap items-center gap-3">
            {project.liveUrl && !project.liveUrl.includes("[PLACEHOLDER") && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center gap-2 h-10 px-4 rounded-lg text-sm font-medium",
                  "bg-primary text-primary-foreground hover:bg-primary/90",
                  "transition-colors duration-[150ms]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                )}
              >
                <ExternalLink size={15} aria-hidden="true" />
                Live demo
              </a>
            )}
            {project.githubUrl && !project.githubUrl.includes("[PLACEHOLDER") && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center gap-2 h-10 px-4 rounded-lg text-sm font-medium",
                  "border border-border bg-transparent text-foreground",
                  "hover:bg-accent hover:text-accent-foreground hover:border-accent",
                  "transition-colors duration-[150ms]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                )}
              >
                <GitHubIcon size={15} aria-hidden="true" />
                View source
              </a>
            )}
          </div>
        </div>
      </Container>

      {/* Cover image */}
      {hasCover && (
        <div className="relative w-full aspect-[16/7] overflow-hidden bg-muted border-t border-border">
          <Image
            src={project.coverImage}
            alt={`${project.title} — cover image`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
}
