import { Code2, Server, Database, ShieldCheck, Wrench, Rocket, Sparkles } from "lucide-react";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { skillGroups, skillLevelMeta, type Skill, type SkillGroup } from "@/lib/skills";
import { cn } from "@/lib/utils";

/* ── Category icon lookup ── */
const categoryIcons: Record<string, React.ComponentType<{ size?: number; className?: string; "aria-hidden"?: boolean }>> = {
  "Frontend":        Code2,
  "Backend":         Server,
  "Database":        Database,
  "Auth & Security": ShieldCheck,
  "Tools":           Wrench,
  "Deployment":      Rocket,
};

/* ── Level dots ── */
const levelFill: Record<Skill["level"], number> = {
  proficient: 3,
  familiar:   2,
  learning:   1,
};

function LevelDots({ level }: { level: Skill["level"] }) {
  const filled = levelFill[level];
  const meta = skillLevelMeta[level];
  return (
    <span
      className="flex items-center gap-[3px]"
      aria-label={meta.label}
      title={`${meta.label} — ${meta.description}`}
    >
      {[1, 2, 3].map((n) => (
        <span
          key={n}
          aria-hidden="true"
          className={cn(
            "block h-1 w-1 rounded-full transition-colors duration-200",
            n <= filled ? "bg-primary" : "bg-border"
          )}
        />
      ))}
    </span>
  );
}

/* ── Skill badge ── */
export function SkillBadge({ skill }: { skill: Skill }) {
  return (
    <div
      title={skill.note}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-background/80",
        "px-2.5 py-1.5",
        "hover:border-primary/40 hover:bg-accent/60 hover:-translate-y-[1px]",
        "hover:shadow-sm",
        "transition-all duration-200 ease-out"
      )}
    >
      <span className="text-[12px] font-medium text-foreground leading-none">
        {skill.name}
      </span>
      <LevelDots level={skill.level} />
    </div>
  );
}

/* ── Legend ── */
function Legend() {
  return (
    <div
      className="flex flex-wrap items-center gap-x-5 gap-y-1.5"
      role="note"
      aria-label="Skill level legend"
    >
      {(["proficient", "familiar", "learning"] as const).map((l) => (
        <span key={l} className="flex items-center gap-1.5">
          <LevelDots level={l} />
          <span className="text-[12px] text-muted-foreground">
            {skillLevelMeta[l].label}
          </span>
        </span>
      ))}
    </div>
  );
}

/* ── Skill group card ── */
function SkillGroup({ group }: { group: SkillGroup }) {
  const headingId = `skill-group-${group.title
    .toLowerCase()
    .replace(/[\s&/]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")}`;
  const Icon = categoryIcons[group.title] ?? Sparkles;

  return (
    <article
      aria-labelledby={headingId}
      className={cn(
        "group flex flex-col gap-4 rounded-2xl border border-border/70 bg-card/80 p-5",
        "shadow-sm hover:shadow-md",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-1 hover:border-primary/30"
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
            "bg-primary/10 text-primary ring-1 ring-primary/15",
            "transition-all duration-300 ease-out group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground"
          )}
          aria-hidden="true"
        >
          <Icon size={16} aria-hidden={true} />
        </div>
        <div>
          <h3
            id={headingId}
            className="text-[15px] font-semibold text-foreground leading-tight"
          >
            {group.title}
          </h3>
          <p className="mt-0.5 text-[12px] text-muted-foreground">
            {group.description}
          </p>
        </div>
      </div>

      <div
        className="flex flex-wrap gap-1.5"
        role="list"
        aria-label={`${group.title} skills`}
      >
        {group.skills.map((skill) => (
          <div key={skill.name} role="listitem">
            <SkillBadge skill={skill} />
          </div>
        ))}
      </div>
    </article>
  );
}

/* ── SkillsSection ── */
export function SkillsSection() {
  const mainGroups = skillGroups.filter((g) => g.title !== "Currently Learning");
  const learningGroup = skillGroups.find((g) => g.title === "Currently Learning");

  return (
    <Section id="skills" aria-labelledby="skills-heading" background="muted">
      <Container>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            id="skills-heading"
            label="Skills"
            title="Technologies I work with"
            description="Grouped by category. Dot indicators show familiarity — no fake percentages."
          />
          <div className="shrink-0">
            <Legend />
          </div>
        </div>

        <div
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
          aria-label="Skill categories"
        >
          {mainGroups.map((group) => (
            <div
              key={group.title}
              role="listitem"
              className={group.title === "Frontend" ? "sm:col-span-2 lg:col-span-2" : ""}
            >
              <SkillGroup group={group} />
            </div>
          ))}
        </div>

        {/* Currently Learning */}
        {learningGroup && (
          <div
            className={cn(
              "mt-5 rounded-2xl border border-primary/20 bg-primary/[0.04] p-5",
              "transition-all duration-300 ease-out hover:bg-primary/[0.07]"
            )}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-8">
              <div className="flex shrink-0 items-center gap-2.5 sm:w-40">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary animate-pulse"
                />
                <div>
                  <p className="text-[14px] font-semibold text-primary leading-tight">
                    {learningGroup.title}
                  </p>
                  <p className="mt-0.5 text-[12px] text-muted-foreground">
                    {learningGroup.description}
                  </p>
                </div>
              </div>

              <div
                className="flex flex-wrap gap-1.5"
                role="list"
                aria-label="Currently learning skills"
              >
                {learningGroup.skills.map((skill) => (
                  <div key={skill.name} role="listitem">
                    <SkillBadge skill={skill} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}