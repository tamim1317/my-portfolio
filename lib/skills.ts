/**
 * lib/skills.ts — Structured skill data.
 *
 * Design principles:
 * - No fake percentage bars or arbitrary "proficiency" scores.
 * - Each skill has a "level" that communicates real meaning:
 *     "proficient"  — use it confidently day-to-day
 *     "familiar"    — have built real things with it, still growing
 *     "learning"    — actively studying, used in small projects
 * - Categories map to the portfolio's visible skill groups.
 * - Skills are ordered within each group: strongest first.
 *
 * To add a skill: append to the relevant group's `skills` array.
 * No UI code changes required.
 */

export type SkillLevel = "proficient" | "familiar" | "learning";

export interface Skill {
  name: string;
  /** Short description of how/where you use this skill */
  note?: string;
  level: SkillLevel;
}

export interface SkillGroup {
  /** Displayed as the group heading */
  title: string;
  /** Short descriptor shown below the heading */
  description: string;
  skills: Skill[];
}

/* ── Skill level metadata — used to render visual indicators ── */
export const skillLevelMeta: Record<
  SkillLevel,
  { label: string; description: string }
> = {
  proficient: {
    label: "Proficient",
    description: "Use confidently in projects",
  },
  familiar: {
    label: "Familiar",
    description: "Have built real things with it",
  },
  learning: {
    label: "Learning",
    description: "Actively studying and practising",
  },
};

/* ── Skill Groups ──────────────────────────────────────────────────────── */
export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    description: "Languages and frameworks for building user interfaces",
    skills: [
      { name: "HTML5", level: "proficient", note: "Semantic markup, accessibility" },
      { name: "CSS3", level: "proficient", note: "Layouts, animations, responsive design" },
      { name: "JavaScript", level: "proficient", note: "ES2020+, async/await, DOM APIs" },
      { name: "TypeScript", level: "familiar", note: "Type-safe application code" },
      { name: "React", level: "familiar", note: "Hooks, context, component patterns" },
      { name: "Next.js", level: "familiar", note: "App Router, SSR, SSG, Server Components" },
      { name: "Tailwind CSS", level: "familiar", note: "Utility-first styling, responsive design" },
    ],
  },
  {
    title: "Backend",
    description: "Server-side development and API design",
    skills: [
      { name: "Node.js", level: "familiar", note: "REST APIs, server logic" },
      { name: "Express", level: "familiar", note: "Routing, middleware, API endpoints" },
    ],
  },
  {
    title: "Database",
    description: "Data modelling and persistence",
    skills: [
      { name: "MongoDB", level: "familiar", note: "Document modelling, Mongoose ODM" },
      { name: "PostgreSQL", level: "learning", note: "Relational data, SQL queries" },
    ],
  },
  {
    title: "Auth & Security",
    description: "Authentication patterns and secure coding practices",
    skills: [
      { name: "JWT", level: "familiar", note: "Token-based auth flows" },
      { name: "REST API Design", level: "familiar", note: "Stateless APIs, HTTP semantics" },
    ],
  },
  {
    title: "Tools",
    description: "Development workflow and collaboration",
    skills: [
      { name: "Git", level: "proficient", note: "Branching, rebasing, pull requests" },
      { name: "GitHub", level: "proficient", note: "Collaboration, issue tracking" },
      { name: "VS Code", level: "proficient", note: "Primary editor and debugger" },
      { name: "npm", level: "familiar", note: "Dependency and script management" },
    ],
  },
  {
    title: "Deployment",
    description: "Hosting, CI/CD, and production environments",
    skills: [
      { name: "Vercel", level: "familiar", note: "Next.js deployments, preview URLs" },
    ],
  },
  {
    title: "Currently Learning",
    description: "What I'm actively studying right now",
    skills: [
      { name: "PostgreSQL", level: "learning", note: "Relational databases and SQL" },
      { name: "Docker", level: "learning", note: "Containerisation basics" },
      { name: "Testing (Vitest)", level: "learning", note: "Unit and integration testing" },
    ],
  },
];
