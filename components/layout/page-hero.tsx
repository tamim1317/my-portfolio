import { cn } from "@/lib/utils";
import { Container } from "./container";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export function PageHero({ eyebrow, title, description, children, className }: PageHeroProps) {
  return (
    <div className={cn("relative overflow-hidden border-b border-border py-14 md:py-20", className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-[10%] h-[280px] w-[280px] rounded-full opacity-[0.18] blur-[90px]"
        style={{ background: "var(--glow)" }}
      />
      <Container className="relative">
        <div className="flex max-w-2xl flex-col gap-4">
          {eyebrow && (
            <span className="inline-flex items-center gap-2.5 text-eyebrow text-primary" aria-hidden="true">
              <span className="h-px w-6 bg-primary/50" />
              {eyebrow}
            </span>
          )}
          <h1 className="text-display-xl text-balance text-foreground">{title}</h1>
          {description && (
            <p className="text-body-lg text-muted-foreground">{description}</p>
          )}
          {children && <div className="mt-2">{children}</div>}
        </div>
      </Container>
    </div>
  );
}
