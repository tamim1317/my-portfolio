/**
 * lib/site.ts — Site-wide configuration and content.
 *
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  SINGLE SOURCE OF TRUTH for all personal information.           ║
 * ║  Every page and component reads from this file.                 ║
 * ║  To update personal info, change it HERE — nowhere else.        ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * Replace every [PLACEHOLDER: ...] value with real information.
 * TypeScript surfaces missing or mistyped fields at build time.
 */

/* ══════════════════════════════════════════════════════════════════════
   SITE CONFIGURATION
   ══════════════════════════════════════════════════════════════════════ */
export const siteConfig = {
  /* ── Identity ─────────────────────────────────────────────────── */
  name:       "Md Tamim Hossain",
  shortName:  "Tamim",
  role:       "Aspiring Full Stack Web Developer",
  location:   "Bangladesh",
  locationNote: "Open to remote opportunities worldwide",

  /* ── Contact & social ─────────────────────────────────────────── */
  /**
   * Primary contact email.
   * Shown in footer, contact page, resume, and JSON-LD.
   * Example: tamim@example.com
   */
  email: "[PLACEHOLDER: your@email.com]",

  /** Canonical site URL — set via NEXT_PUBLIC_SITE_URL in production. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://localhost:3000",

  social: {
    /**
     * Full GitHub profile URL.
     * Example: https://github.com/yourusername
     */
    github: "[PLACEHOLDER: https://github.com/username]",

    /**
     * Full LinkedIn profile URL.
     * Example: https://linkedin.com/in/yourprofile
     */
    linkedin: "[PLACEHOLDER: https://linkedin.com/in/username]",

    /**
     * Full Twitter/X profile URL.
     * Leave as empty string "" to hide everywhere.
     * Example: https://twitter.com/yourhandle
     */
    twitter: "",
  },

  /* ── Availability ─────────────────────────────────────────────── */
  /** Set to false to hide the pulsing availability badge in the hero. */
  availableForWork: true,

  /**
   * Short phrase shown inside the hero availability badge.
   * Example: "Open to remote opportunities"
   * Example: "Available from July 2025"
   */
  availabilityBadge: "Open to Remote Opportunities",

  /** Shown in the contact page sidebar and About section. */
  availabilityNote: "Open to remote junior & full-stack roles",

  /**
   * Expected email response time. Shown in the contact page sidebar.
   * Example: "I typically respond within 24–48 hours."
   */
  responseTime: "Feel free to reach out about opportunities or collaborations.",

  /* ── Hero bio ─────────────────────────────────────────────────── */
  /**
   * 1–2 sentences shown in the home page hero section.
   * Answer: what you build, who for, and what drives you.
   * Example: "I build fast, accessible web applications with React and
   *   Next.js — focused on clean code and real user value."
   */
  heroBio:
    "Mathematics Honours student and aspiring full stack web developer from Bangladesh, " +
    "building real-world applications with React, Next.js, Node.js, and TypeScript.",

  /* ── SEO metadata ─────────────────────────────────────────────── */
  /**
   * Default page <title> and template.
   * Used in app/layout.tsx. Individual pages add their own title via
   * the "%s — Md Tamim Hossain" template.
   */
  metaTitle: "Md Tamim Hossain — Aspiring Full Stack Web Developer",

  /**
   * Default meta description — used as the root fallback.
   * Individual pages can override with their own description.
   */
  metaDescription:
    "Aspiring Full Stack Web Developer from Bangladesh. " +
    "Building real-world applications with React, Next.js, TypeScript, Node.js, and MongoDB. " +
    "Open to remote junior and full-stack opportunities worldwide.",

  /* ── Resume ───────────────────────────────────────────────────── */
  /** Internal route to the web resume page. Do not change. */
  resumeUrl: "/resume",

  /**
   * Path to the downloadable PDF resume file.
   * Steps:
   *   1. Place your resume PDF at: public/resume.pdf
   *   2. Change this value to: "/resume.pdf"
   */
  resumePdfUrl: "[PLACEHOLDER: /resume.pdf]",

  /**
   * Professional summary paragraph shown at the top of the resume.
   * 2–4 sentences. Honest, specific, first-person.
   * Example: "Aspiring full stack developer from Bangladesh with
   *   hands-on project experience in React and Node.js..."
   */
  resumeSummary:
    "Aspiring full stack web developer from Bangladesh, currently in the first year of a " +
    "Mathematics Honours programme at Satkhira Government College, National University. " +
    "Self-taught in React, Next.js, TypeScript, Node.js, Express.js, and MongoDB through " +
    "structured self-study and hands-on project work. " +
    "Seeking a remote junior or full-stack role where I can apply my skills, " +
    "contribute from day one, and continue growing as an engineer.",
} as const;

/* ══════════════════════════════════════════════════════════════════════
   EXPERIENCE
   Add real employment entries only. Do not invent roles.
   Leave the array empty [] if you have no employment history yet.
   ══════════════════════════════════════════════════════════════════════ */
export interface ExperienceEntry {
  /** Job title / role name */
  title: string;
  /** Company or organisation name */
  company: string;
  /** Employment type */
  type: "full-time" | "part-time" | "contract" | "freelance" | "internship" | "volunteer";
  /** Start date — month and year, e.g. "January 2024" */
  startDate: string;
  /** End date — or undefined if current role */
  endDate?: string;
  /** Set to true if this is your current role */
  current?: boolean;
  /** Location or "Remote" */
  location?: string;
  /** 2–4 bullet points describing responsibilities and achievements */
  highlights: string[];
  /** Technologies used in this role */
  technologies?: string[];
}

/**
 * Employment history.
 * Add entries as verified experience becomes available.
 * The resume page renders this list; an empty array shows the placeholder.
 */
export const experience: ExperienceEntry[] = [
  // Example structure — delete this comment block and add your real entries:
  // {
  //   title: "Junior Frontend Developer",
  //   company: "Company Name",
  //   type: "full-time",
  //   startDate: "[PLACEHOLDER: Month Year]",
  //   endDate: "[PLACEHOLDER: Month Year]",
  //   current: false,
  //   location: "Remote",
  //   highlights: [
  //     "[PLACEHOLDER: What you built or maintained]",
  //     "[PLACEHOLDER: Impact or outcome]",
  //   ],
  //   technologies: ["React", "TypeScript"],
  // },
];

/* ══════════════════════════════════════════════════════════════════════
   CERTIFICATIONS & ACHIEVEMENTS
   Add only verified entries. Do not invent certifications.
   Leave the array empty [] if you have none yet.
   ══════════════════════════════════════════════════════════════════════ */
export interface CertificationEntry {
  /** Certificate or achievement name */
  title: string;
  /** Issuing organisation */
  issuer: string;
  /** Month and year issued, e.g. "March 2024" */
  date?: string;
  /** Verification URL — credential link if available */
  url?: string;
  /** Brief description of what it covers */
  description?: string;
}

/**
 * Certifications and achievements.
 * Examples: freeCodeCamp certificates, course completions, competition awards.
 * An empty array shows the placeholder on the resume page.
 */
export const certifications: CertificationEntry[] = [
  // Example structure — delete this comment block and add your real entries:
  // {
  //   title: "Responsive Web Design",
  //   issuer: "freeCodeCamp",
  //   date: "[PLACEHOLDER: Month Year]",
  //   url: "[PLACEHOLDER: https://freecodecamp.org/certification/...]",
  // },
];

/* ══════════════════════════════════════════════════════════════════════
   EDUCATION
   Only real, verified information.
   ══════════════════════════════════════════════════════════════════════ */
export interface Education {
  institution: string;
  degree: string;
  field: string;
  status: "completed" | "in-progress";
  /** Graduation year or expected year. Set undefined if not yet known. */
  year?: string;
  /** CGPA, class, division, or grade. Set undefined to hide. */
  grade?: string;
  /** Notable courses relevant to software engineering (optional) */
  relevantCourses?: string[];
}

export const education: Education[] = [
  {
    institution: "Satkhira Government College, National University, Bangladesh",
    degree: "Bachelor of Science (Honours)",
    field: "Mathematics",
    status: "in-progress",
    year: "2029",
    grade: undefined,
    relevantCourses: [
      // Add mathematics courses relevant to engineering when available.
      // Examples: "Real Analysis", "Linear Algebra", "Numerical Methods",
      //           "Statistics", "Discrete Mathematics"
    ],
  },
];

/* ══════════════════════════════════════════════════════════════════════
   VALUES
   3–4 items. Specific to how you work — not generic platitudes.
   ══════════════════════════════════════════════════════════════════════ */
export interface Value {
  title: string;
  description: string;
}

export const values: Value[] = [
  {
    title: "Clarity over cleverness",
    description:
      "Code is read far more than it is written. I prefer the obvious solution " +
      "over the elegant one when clarity is at stake.",
  },
  {
    title: "Build to understand",
    description:
      "I don't consider something learned until I've implemented it myself. " +
      "Building is how I convert documentation into durable knowledge.",
  },
  {
    title: "Ship, then improve",
    description:
      "A working v1 in front of users teaches more than a perfect v0 sitting in a branch. " +
      "I bias toward shipping and iterating.",
  },
  {
    title: "Details matter",
    description:
      "A misaligned margin, an unclear error message, or an inaccessible button " +
      "all signal the same thing: the work isn't finished yet.",
  },
];

/* ══════════════════════════════════════════════════════════════════════
   ABOUT PAGE CONTENT
   Written from verified facts only. No exaggerated claims.
   Edit to reflect your own voice and exact experience.
   ══════════════════════════════════════════════════════════════════════ */
export const aboutContent = {
  /**
   * Lead paragraph — shown at the top of the About section.
   * Honest, specific, first-person.
   */
  lead:
    "I'm an aspiring full stack web developer from Bangladesh, " +
    "currently in the first year of a Mathematics Honours degree at Satkhira Government College, " +
    "National University. " +
    "I taught myself web development because I wanted to build things — " +
    "real products that solve real problems — and I've been obsessed with it ever since.",

  /** Journey — how you got into software development. */
  journey:
    "My path into software started through self-study. " +
    "I began with the fundamentals — HTML, CSS, and JavaScript — " +
    "then worked my way through React, Node.js, and the broader full stack ecosystem. " +
    "Every project has been a structured learning exercise: " +
    "I set a goal, research what I need, build it, break it, and rebuild it better.",

  /** Engineering mindset — what drives how you write code. */
  mindset:
    "Studying mathematics shapes how I think about software. " +
    "I'm drawn to clean abstractions, precise naming, and code that reads like reasoning. " +
    "I care about the 'why' behind every decision — " +
    "not just making something work, but understanding why it works that way " +
    "and what trade-offs were made.",

  /** Interests — specific areas of web development you care about. */
  interests:
    "I'm particularly interested in full stack JavaScript, " +
    "developer experience, and building UIs that are both functional and refined. " +
    "I enjoy the intersection of design and engineering — " +
    "the part where a good component API meets a thoughtful visual system.",

  /** Learning philosophy — how you approach growth as a developer. */
  learningPhilosophy:
    "I learn by building. Reading documentation is where I start, " +
    "but I only retain things when I've implemented them myself, " +
    "made the mistakes, and debugged the results. " +
    "I keep a list of things I want to understand properly — " +
    "not just how to use them, but how they work.",

  /** Career direction — honest about being early-career. */
  careerDirection:
    "I'm looking for a remote junior or entry-level full stack role " +
    "where I can contribute from day one while continuing to grow rapidly. " +
    "I want to work with a team that cares about code quality and ships things that matter.",
} as const;

/* ══════════════════════════════════════════════════════════════════════
   DERIVED HELPERS
   Computed values and guards — callers should not replicate this logic.
   ══════════════════════════════════════════════════════════════════════ */

/** Returns true if a config value has been filled in (is not a placeholder). */
export function isConfigured(value: string): boolean {
  return !value.includes("[PLACEHOLDER");
}

/**
 * Returns only the social links that have real values configured.
 * Safe to map directly — skips unconfigured and empty entries.
 */
export function getConfiguredSocialLinks() {
  const { social, email } = siteConfig;
  return [
    isConfigured(social.github)
      ? { label: "GitHub",   href: social.github,         type: "github"   as const }
      : null,
    isConfigured(social.linkedin)
      ? { label: "LinkedIn", href: social.linkedin,        type: "linkedin" as const }
      : null,
    social.twitter
      ? { label: "Twitter",  href: social.twitter,         type: "twitter"  as const }
      : null,
    isConfigured(email)
      ? { label: "Email",    href: `mailto:${email}`,      type: "email"    as const }
      : null,
  ].filter((link): link is NonNullable<typeof link> => link !== null);
}
