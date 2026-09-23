import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProjectResult } from "@/lib/projects";

interface ResultCardsProps {
  results: ProjectResult[];
}

export function ResultCards({ results }: ResultCardsProps) {
  if (!results.length) return null;

  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      role="list"
      aria-label="Project results"
    >
      {results.map((r, i) => (
        <div
          key={i}
          role="listitem"
          className={cn(
            "rounded-xl border border-border bg-card p-5",
            "flex flex-col gap-3"
          )}
        >
          <TrendingUp
            size={16}
            className="text-primary"
            aria-hidden="true"
          />
          {r.label && r.value && (
            <div className="flex flex-col gap-0.5">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {r.label}
              </p>
              <p className="text-2xl font-bold text-foreground tracking-tight">
                {r.value}
              </p>
            </div>
          )}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {r.description}
          </p>
        </div>
      ))}
    </div>
  );
}
