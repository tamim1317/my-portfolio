import { GraduationCap, MapPin, Lightbulb, Target, BookOpen, Code2 } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/motion/fade-in";
import { aboutContent, education, values, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

interface IconType {
  size?: number;
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
}

/* ── Content block ── */
function ContentBlock({
  label,
  text,
  icon: Icon,
}: {
  label: string;
  text: string;
  icon: React.ComponentType<IconType>;
}) {
  return (
    <div className="group relative flex flex-col gap-2.5 pl-5">
      {/* Accent rail */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-0 top-1 bottom-1 w-[2px] rounded-full bg-border/80",
          "transition-all duration-300 ease-out",
          "group-hover:bg-primary group-hover:w-[2.5px]"
        )}
      />
      <div className="flex items-center gap-2">
        <Icon
          size={13}
          className="text-primary shrink-0 transition-transform duration-300 ease-out group-hover:scale-110"
          aria-hidden={true}
        />
        <span className="text-[12px] font-medium tracking-[0.12em] text-primary uppercase">
          {label}
        </span>
      </div>
      <p className="text-[15px] leading-relaxed text-muted-foreground">
        {text}
      </p>
    </div>
  );
}

/* ── Education entry ── */
function EducationEntry() {
  const edu = education[0];
  if (!edu) return null;

  return (
    <div className="flex gap-3.5">
      <div
        className={cn(
          "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
          "bg-primary/10 text-primary ring-1 ring-primary/15",
          "transition-all duration-300 ease-out group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground"
        )}
        aria-hidden="true"
      >
        <GraduationCap size={16} aria-hidden={true} />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-[15px] font-semibold text-foreground leading-snug">
          {edu.degree} — {edu.field}
        </p>
        <p className="text-sm text-muted-foreground">{edu.institution}</p>
        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
          {edu.status === "in-progress" && (
            <span className="inline-flex items-center text-[11px] font-medium text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-full px-2.5 py-0.5">
              In progress
            </span>
          )}
          {edu.year && (
            <span className="text-[12px] text-muted-foreground">
              Expected {edu.year}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Value item ── */
function ValueItem({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: React.ComponentType<IconType>;
}) {
  return (
    <div
      className={cn(
        "group flex gap-3.5 p-3.5 -mx-1.5 rounded-xl",
        "transition-all duration-300 ease-out",
        "hover:bg-accent/50"
      )}
    >
      <div
        className={cn(
          "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
          "bg-primary/10 text-primary ring-1 ring-primary/15",
          "transition-all duration-300 ease-out",
          "group-hover:bg-primary group-hover:text-primary-foreground group-hover:ring-primary"
        )}
        aria-hidden="true"
      >
        <Icon size={15} aria-hidden={true} />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-[15px] font-semibold text-foreground leading-snug">
          {title}
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}

/* ── AboutSection ── */
export function AboutSection() {
  const valueIcons = [Lightbulb, Target, Code2, BookOpen] as const;

  return (
    <Section id="about" aria-labelledby="about-heading" background="default">
      <Container>
        <FadeIn>
          <SectionHeading
            id="about-heading"
            label="About"
            title="Developer. Mathematician. Lifelong learner."
            description={aboutContent.lead}
          />
        </FadeIn>

        <div className="mt-14 grid grid-cols-1 gap-14 lg:grid-cols-[1fr_21rem] lg:gap-20">

          {/* LEFT — narrative */}
          <FadeInStagger className="flex flex-col gap-9">
            <FadeInItem>
              <ContentBlock
                label="My journey"
                icon={Code2}
                text={aboutContent.journey}
              />
            </FadeInItem>
            <FadeInItem>
              <ContentBlock
                label="How I think about code"
                icon={Lightbulb}
                text={aboutContent.mindset}
              />
            </FadeInItem>
            <FadeInItem>
              <ContentBlock
                label="What I'm drawn to"
                icon={BookOpen}
                text={aboutContent.interests}
              />
            </FadeInItem>
            <FadeInItem>
              <ContentBlock
                label="How I learn"
                icon={Target}
                text={aboutContent.learningPhilosophy}
              />
            </FadeInItem>
          </FadeInStagger>

          {/* RIGHT — cards */}
          <FadeInStagger className="flex flex-col gap-5" staggerDelay={0.08}>

            {/* Career direction */}
            <FadeInItem>
              <div
                className={cn(
                  "group rounded-2xl border border-border/70 bg-card/80 p-5 flex flex-col gap-3.5",
                  "shadow-sm hover:shadow-md",
                  "transition-all duration-300 ease-out",
                  "hover:-translate-y-1 hover:border-primary/30"
                )}
              >
                <div className="flex items-center gap-2">
                  <MapPin
                    size={13}
                    className="text-primary shrink-0 transition-transform duration-300 group-hover:scale-110"
                    aria-hidden="true"
                  />
                  <h3 className="text-[12px] font-medium tracking-[0.12em] text-primary uppercase">
                    Career direction
                  </h3>
                </div>
                <p className="text-[14px] leading-relaxed text-muted-foreground">
                  {aboutContent.careerDirection}
                </p>
                <p className="text-[12px] text-muted-foreground/80">
                  {siteConfig.location} — {siteConfig.locationNote}
                </p>
              </div>
            </FadeInItem>

            {/* Education */}
            <FadeInItem>
              <div
                className={cn(
                  "group rounded-2xl border border-border/70 bg-card/80 p-5 flex flex-col gap-3.5",
                  "shadow-sm hover:shadow-md",
                  "transition-all duration-300 ease-out",
                  "hover:-translate-y-1 hover:border-primary/30"
                )}
              >
                <h3 className="text-[12px] font-medium tracking-[0.12em] text-primary uppercase">
                  Education
                </h3>
                <EducationEntry />
              </div>
            </FadeInItem>

            {/* Values */}
            <FadeInItem>
              <div
                className={cn(
                  "rounded-2xl border border-border/70 bg-card/80 p-5 flex flex-col gap-1",
                  "shadow-sm"
                )}
              >
                <h3 className="text-[12px] font-medium tracking-[0.12em] text-primary uppercase mb-3">
                  Engineering values
                </h3>
                {values.map((v, i) => (
                  <ValueItem
                    key={v.title}
                    title={v.title}
                    description={v.description}
                    icon={valueIcons[i % valueIcons.length]}
                  />
                ))}
              </div>
            </FadeInItem>
          </FadeInStagger>
        </div>
      </Container>
    </Section>
  );
}