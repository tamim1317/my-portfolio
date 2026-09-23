import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { skillGroups, skillLevelMeta, type Skill, type SkillGroup } from "@/lib/skills";
import { cn } from "@/lib/utils";

/* ── Level dots — three-dot proficiency indicator ── */
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
            "block w-1 h-1 rounded-full",
            n <= filled ? "bg-primary" : "bg-border"
          )}
        />
      ))}
    </span>
  );
}

/* ── Individual skill chip ── */
export function SkillBadge({ skill }: { skill: Skill }) {
  return (
    <div
      title={skill.note}
      className={cn(
        "inline-flex items-center gap-1.5",
        "rounded-md border border-border bg-background",
        "px-2.5 py-1.5",
        "hover:border-primary/25 hover:bg-accent/50",
        "transition-colors duration-[120ms]"
      )}
    >
      <span className="text-xs font-medium text-foreground leading-none">
        {skill.name}
      </span>
      <LevelDots level={skill.level} />
    </div>
  );
}

/* ── Legend ── */
function Legend() {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5" role="note" aria-label="Skill level legend">
      {(["proficient", "familiar", "learning"] as const).map((l) => (
        <span key={l} className="flex items-center gap-1.5">
          <LevelDots level={l} />
          <span className="text-xs text-muted-foreground">{skillLevelMeta[l].label}</span>
        </span>
      ))}
    </div>
  );
}

/* ── Skill group — one category card ── */
function SkillGroup({ group }: { group: SkillGroup }) {
  const headingId = `skill-group-${group.title.toLowerCase().replace(/[\s&/]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "")}`;
  return (
    <article
      aria-labelledby={headingId}
      className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4"
    >
      <div>
        <h3 id={headingId} className="text-sm font-semibold text-foreground">
          {group.title}
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">{group.description}</p>
      </div>
      <div className="flex flex-wrap gap-1.5" role="list" aria-label={`${group.title} skills`}>
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
  const mainGroups    = skillGroups.filter((g) => g.title !== "Currently Learning");
  const learningGroup = skillGroups.find((g)  => g.title === "Currently Learning");

  return (
    <Section id="skills" aria-labelledby="skills-heading" background="muted">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            id="skills-heading"
            label="Skills"
            title="Technologies I work with"
            description="Grouped by category. Dot indicators show familiarity — no fake percentages."
          />
          <div className="shrink-0 pb-0.5">
            <Legend />
          </div>
        </div>

        <div
          className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
          aria-label="Skill categories"
        >
          {mainGroups.map((group) => (
            <div key={group.title} role="listitem">
              <SkillGroup group={group} />
            </div>
          ))}
        </div>

        {/* Currently Learning strip */}
        {learningGroup && (
          <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-8">
              <div className="shrink-0 sm:w-36">
                <p className="text-sm font-semibold text-primary">{learningGroup.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{learningGroup.description}</p>
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
