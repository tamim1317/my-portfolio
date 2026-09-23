import { GraduationCap, MapPin, Lightbulb, Target, BookOpen, Code2 } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/motion/fade-in";
import { aboutContent, education, values, siteConfig } from "@/lib/site";

interface IconType {
  size?: number;
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
}

/* ── Content block — a labelled prose paragraph ── */
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
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1.5">
        <Icon size={12} className="text-primary shrink-0" aria-hidden={true} />
        <span className="text-eyebrow text-primary">{label}</span>
      </div>
      <p className="text-body-md text-muted-foreground">{text}</p>
    </div>
  );
}

/* ── Education entry ── */
function EducationEntry() {
  const edu = education[0];
  if (!edu) return null;

  return (
    <div className="flex gap-3">
      <div
        className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary"
        aria-hidden="true"
      >
        <GraduationCap size={14} aria-hidden={true} />
      </div>
      <div className="flex flex-col gap-0.5">
        <p className="text-sm font-semibold text-foreground leading-snug">
          {edu.degree} &mdash; {edu.field}
        </p>
        <p className="text-body-sm text-muted-foreground">{edu.institution}</p>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          {edu.status === "in-progress" && (
            <span className="inline-flex items-center text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-full px-2 py-0.5">
              In progress
            </span>
          )}
          {edu.year && (
            <span className="text-xs text-muted-foreground">
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
    <div className="flex gap-3">
      <div
        className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary"
        aria-hidden="true"
      >
        <Icon size={13} aria-hidden={true} />
      </div>
      <div className="flex flex-col gap-0.5">
        <p className="text-sm font-semibold text-foreground leading-snug">{title}</p>
        <p className="text-body-sm text-muted-foreground">{description}</p>
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

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_22rem] lg:gap-16">

          {/* LEFT — narrative prose */}
          <FadeInStagger className="flex flex-col gap-8">
            <FadeInItem>
              <ContentBlock label="My journey"          icon={Code2}    text={aboutContent.journey} />
            </FadeInItem>
            <FadeInItem>
              <ContentBlock label="How I think about code" icon={Lightbulb} text={aboutContent.mindset} />
            </FadeInItem>
            <FadeInItem>
              <ContentBlock label="What I'm drawn to"   icon={BookOpen} text={aboutContent.interests} />
            </FadeInItem>
            <FadeInItem>
              <ContentBlock label="How I learn"          icon={Target}   text={aboutContent.learningPhilosophy} />
            </FadeInItem>
          </FadeInStagger>

          {/* RIGHT — structured cards */}
          <FadeInStagger className="flex flex-col gap-6" staggerDelay={0.1}>

            {/* Career direction */}
            <FadeInItem>
              <div className="rounded-lg border border-border bg-card p-5 flex flex-col gap-3">
                <div className="flex items-center gap-1.5">
                  <MapPin size={12} className="text-primary shrink-0" aria-hidden="true" />
                  <h3 className="text-eyebrow text-primary">Career direction</h3>
                </div>
                <p className="text-body-sm text-muted-foreground leading-relaxed">
                  {aboutContent.careerDirection}
                </p>
                <p className="text-xs text-muted-foreground">
                  {siteConfig.location} &mdash; {siteConfig.locationNote}
                </p>
              </div>
            </FadeInItem>

            {/* Education */}
            <FadeInItem>
              <div className="rounded-lg border border-border bg-card p-5 flex flex-col gap-3">
                <h3 className="text-eyebrow text-primary">Education</h3>
                <EducationEntry />
              </div>
            </FadeInItem>

            {/* Values */}
            <FadeInItem>
              <div className="flex flex-col gap-4">
                <h3 className="text-eyebrow text-primary">Engineering values</h3>
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
