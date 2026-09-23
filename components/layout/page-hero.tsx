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
    <div className={cn("border-b border-border py-10 md:py-14", className)}>
      <Container>
        <div className="flex flex-col gap-3 max-w-2xl">
          {eyebrow && (
            <span className="text-eyebrow text-primary" aria-hidden="true">
              {eyebrow}
            </span>
          )}
          <h1 className="text-display-xl text-foreground">{title}</h1>
          {description && (
            <p className="text-body-lg text-muted-foreground">{description}</p>
          )}
          {children && <div className="mt-2">{children}</div>}
        </div>
      </Container>
    </div>
  );
}
