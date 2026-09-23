import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProjectFeature } from "@/lib/projects";

interface FeatureListProps {
  features: ProjectFeature[];
}

export function FeatureList({ features }: FeatureListProps) {
  if (!features.length) return null;

  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      role="list"
      aria-label="Project features"
    >
      {features.map((feature) => (
        <div
          key={feature.title}
          role="listitem"
          className={cn(
            "flex gap-3",
            "rounded-xl border border-border bg-card p-4"
          )}
        >
          <CheckCircle2
            size={16}
            className="text-primary shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-foreground leading-snug">
              {feature.title}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
