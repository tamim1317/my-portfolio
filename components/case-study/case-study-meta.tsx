import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/projects";

const categoryLabels: Record<Project["category"], string> = {
  fullstack:     "Full Stack",
  frontend:      "Frontend",
  backend:       "Backend",
  tool:          "Developer Tool",
  "open-source": "Open Source",
};

const statusLabels: Record<Project["status"], string> = {
  live:          "Live",
  "in-progress": "In Progress",
  archived:      "Archived",
};

interface CaseStudyMetaProps {
  project: Project;
}

export function CaseStudyMeta({ project }: CaseStudyMetaProps) {
  return (
    <div className="border-b border-border">
      <div className="container-wide">
        <dl
          className={cn(
            "grid grid-cols-2 sm:grid-cols-4",
            "divide-x-0 sm:divide-x divide-border",
            "border-b-0"
          )}
        >
          {[
            { label: "Category", value: categoryLabels[project.category] },
            { label: "Year",     value: String(project.year) },
            { label: "Status",   value: statusLabels[project.status] },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-0.5 px-0 sm:px-6 py-4 first:pl-0">
              <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {label}
              </dt>
              <dd className="text-sm font-medium text-foreground">{value}</dd>
            </div>
          ))}

          <div className="col-span-2 sm:col-span-1 flex flex-col gap-1.5 px-0 sm:px-6 py-4">
            <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Stack
            </dt>
            <dd>
              <div className="flex flex-wrap gap-1">
                {project.technologies.map((t) => (
                  <Badge key={t} variant="tech">{t}</Badge>
                ))}
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
