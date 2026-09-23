import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProjectChallenge } from "@/lib/projects";

interface ChallengeCardsProps {
  challenges: ProjectChallenge[];
}

export function ChallengeCards({ challenges }: ChallengeCardsProps) {
  if (!challenges.length) return null;

  return (
    <div className="flex flex-col gap-4" role="list" aria-label="Challenges">
      {challenges.map((c, i) => (
        <article
          key={i}
          role="listitem"
          className={cn(
            "rounded-xl border border-border bg-card overflow-hidden"
          )}
        >
          <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-muted/40">
            <Zap size={15} className="text-primary shrink-0" aria-hidden="true" />
            <h3 className="text-sm font-semibold text-foreground">{c.title}</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border">
            <div className="p-5 flex flex-col gap-1.5">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                The challenge
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {c.challenge}
              </p>
            </div>
            <div className="p-5 flex flex-col gap-1.5">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                How I solved it
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {c.resolution}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
