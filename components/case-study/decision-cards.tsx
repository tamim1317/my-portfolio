import { Scale } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TechnicalDecision } from "@/lib/projects";

interface DecisionCardsProps {
  decisions: TechnicalDecision[];
}

export function DecisionCards({ decisions }: DecisionCardsProps) {
  if (!decisions.length) return null;

  return (
    <div className="flex flex-col gap-4" role="list" aria-label="Technical decisions">
      {decisions.map((d, i) => (
        <article
          key={i}
          role="listitem"
          className="rounded-xl border border-border bg-card p-5 flex flex-col gap-4"
        >
          <div className="flex items-start gap-3">
            <Scale
              size={15}
              className="text-primary shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold text-foreground">
                {d.decision}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-6">
            {d.alternatives.length > 0 && (
              <div className="flex flex-col gap-1.5">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Alternatives considered
                </p>
                <ul className="flex flex-col gap-1">
                  {d.alternatives.map((alt, j) => (
                    <li
                      key={j}
                      className={cn(
                        "text-sm text-muted-foreground",
                        "flex items-start gap-1.5"
                      )}
                    >
                      <span aria-hidden="true" className="mt-1.5 w-1 h-1 rounded-full bg-muted-foreground shrink-0" />
                      {alt}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-1.5">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                Rationale
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {d.rationale}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
