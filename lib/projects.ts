/**
 * lib/projects.ts — Project data model and content.
 *
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  SINGLE SOURCE OF TRUTH for all project information.            ║
 * ║  Adding a new project = appending to the `projects` array.      ║
 * ║  No page or component code needs to change.                     ║
 * ╚══════════════════════════════════════════════════════════════════╝
 *
 * HOW TO ADD A PROJECT:
 *   1. Copy the example structure below.
 *   2. Fill in required fields. All optional fields can be omitted entirely.
 *   3. Use [PLACEHOLDER: ...] for anything not yet available.
 *   4. Set `featured: true` to show it on the home page (max 3 recommended).
 *   5. Add cover image: public/images/projects/[slug]/cover.jpg
 *   6. Add screenshots:  public/images/projects/[slug]/screenshot-N.jpg
 *
 * IMAGE CONVENTION:
 *   Cover image:  1200×675px (16:9)  — used in cards, hero, OG image
 *   Screenshots:  Any size           — displayed in the case study gallery
 *   Alt text:     Required for every image (accessibility)
 *
 * The project slug becomes the URL: /projects/[slug]
 */

/* ══════════════════════════════════════════════════════════════════════
   TYPES
   ══════════════════════════════════════════════════════════════════════ */

export type ProjectStatus   = "live" | "in-progress" | "archived";
export type ProjectCategory = "fullstack" | "frontend" | "backend" | "tool" | "open-source";

/** A single key feature of the project */
export interface ProjectFeature {
  title: string;
  description: string;
}

/** A technical challenge encountered during development */
export interface ProjectChallenge {
  title: string;
  /** What made this hard */
  challenge: string;
  /** How it was resolved */
  resolution: string;
}

/** A significant technical decision with its rationale */
export interface TechnicalDecision {
  /** What was chosen */
  decision: string;
  /** What else was considered */
  alternatives: string[];
  /** Why this option was chosen and what trade-offs were accepted */
  rationale: string;
}

/**
 * A project outcome or result.
 * Only use real, verifiable results — no invented metrics.
 */
export interface ProjectResult {
  /** Optional metric label, e.g. "Load time" */
  label?: string;
  /** Optional measured value, e.g. "< 1s" — only if you actually measured it */
  value?: string;
  /** Narrative description of the outcome */
  description: string;
}

/** A screenshot or image in the project gallery */
export interface ProjectImage {
  /**
   * Path under /public, e.g. /images/projects/my-app/screenshot-1.jpg
   * Place files in: public/images/projects/[slug]/
   */
  src: string;
  /** Descriptive alt text — required for accessibility */
  alt: string;
  /** Optional short caption shown below the image */
  caption?: string;
}

/**
 * Technical architecture breakdown.
 * All fields are optional — fill in only what applies to your project.
 * Can be combined with the `architecture` prose field for richer detail.
 */
export interface ProjectArchitecture {
  /** Frontend framework and patterns used */
  frontend?: string;
  /** Backend runtime, framework, and patterns used */
  backend?: string;
  /** Database(s) used and why */
  database?: string;
  /** Authentication and authorisation approach */
  auth?: string;
  /** Where and how the application is deployed */
  deployment?: string;
  /** Notable APIs or third-party services integrated */
  externalServices?: string[];
  /** Security measures implemented in the project */
  security?: string;
}

/* ══════════════════════════════════════════════════════════════════════
   PROJECT INTERFACE
   ══════════════════════════════════════════════════════════════════════ */

export interface Project {
  // ── Required identity fields ────────────────────────────────────
  /** URL-safe identifier — becomes /projects/[slug] */
  slug: string;
  /** Project name as displayed in cards and headings */
  title: string;
  /** One sentence for cards, metadata, and hero tagline */
  shortDescription: string;
  /** 2–3 sentences for the case study overview and OG description */
  description: string;
  category: ProjectCategory;
  status: ProjectStatus;
  /** All technologies used — drives the filter bar and tech stack badges */
  technologies: string[];
  /** Year the project was built or significantly worked on */
  year: number;

  // ── Visibility ──────────────────────────────────────────────────
  /** Show in the home page featured section */
  featured: boolean;
  /** Display order in featured section (lower number = shown first) */
  order?: number;

  // ── Media ───────────────────────────────────────────────────────
  /**
   * Cover image path.
   * Place at: public/images/projects/[slug]/cover.jpg
   * Recommended size: 1200×675px (16:9)
   */
  coverImage: string;
  /**
   * Additional screenshots for the gallery section.
   * Place at: public/images/projects/[slug]/screenshot-N.jpg
   */
  images?: ProjectImage[];

  // ── External links ──────────────────────────────────────────────
  /** Full GitHub repository URL */
  githubUrl?: string;
  /** Full live demo URL */
  liveUrl?: string;

  // ── Case study content ──────────────────────────────────────────
  // All fields below are optional.
  // Sections are only rendered on the case study page if the field is provided.
  // Use [PLACEHOLDER: ...] strings for content you haven't written yet.

  /**
   * The problem this project solves.
   * What was broken, missing, or frustrating before you built it?
   * Who is affected?
   */
  problem?: string;

  /**
   * Who the project is built for — the target users.
   * Example: "Solo developers looking to track learning progress"
   */
  targetUsers?: string;

  /**
   * Why this project exists — your motivation for building it.
   * Distinct from `problem` (which is about the user's pain point).
   */
  purpose?: string;

  /**
   * What you set out to achieve.
   * 2–4 concrete goals you held in mind while building.
   */
  goals?: string[];

  /**
   * How your project solves the problem.
   * High-level explanation of your approach and what makes it work.
   */
  solution?: string;

  /**
   * Key features of the project.
   * Focus on features that demonstrate engineering thought.
   */
  features?: ProjectFeature[];

  /**
   * Prose description of the overall technical architecture.
   * Use this for narrative. Use `architectureBreakdown` for structured detail.
   */
  architecture?: string;

  /**
   * Structured breakdown of the technical stack by layer.
   * Optional complement to the `architecture` prose field.
   */
  architectureBreakdown?: ProjectArchitecture;

  /** Technical challenges encountered and how they were resolved */
  challenges?: ProjectChallenge[];

  /**
   * Significant engineering decisions with alternatives considered.
   * This is the section that most demonstrates engineering judgment.
   */
  technicalDecisions?: TechnicalDecision[];

  /**
   * Project outcomes and results.
   * Real results only — no invented metrics or fake user numbers.
   */
  results?: ProjectResult[];

  /**
   * What you would do differently and what this project taught you.
   * Honest reflection — not a sales pitch.
   */
  lessonsLearned?: string;
}

/* ══════════════════════════════════════════════════════════════════════
   HELPER FUNCTIONS
   ══════════════════════════════════════════════════════════════════════ */

/** Get all projects, ordered by `order` (if set) then by `year` descending */
export function getAllProjects(): Project[] {
  return [...projects].sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) return a.order - b.order;
    if (a.order !== undefined) return -1;
    if (b.order !== undefined) return 1;
    return b.year - a.year;
  });
}

/** Get featured projects for the home page section */
export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((p) => p.featured);
}

/** Get a single project by slug. Returns undefined if not found. */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Get all unique technology names across all projects, sorted alphabetically */
export function getAllTechnologies(): string[] {
  const all = projects.flatMap((p) => p.technologies);
  return [...new Set(all)].sort();
}

/** Get the previous and next project for case study navigation */
export function getAdjacentProjects(slug: string): {
  prev: Project | undefined;
  next: Project | undefined;
} {
  const sorted = getAllProjects();
  const index = sorted.findIndex((p) => p.slug === slug);
  return {
    prev:  index > 0                  ? sorted[index - 1] : undefined,
    next:  index < sorted.length - 1  ? sorted[index + 1] : undefined,
  };
}

/* ══════════════════════════════════════════════════════════════════════
   PROJECTS DATA
   ══════════════════════════════════════════════════════════════════════
   Replace the placeholder projects with your real projects.
   Each placeholder project shows the full structure with prompts for
   every field. Delete the placeholder objects when you add real ones.
   ══════════════════════════════════════════════════════════════════════ */
const projects: Project[] = [

  // ── Project 1: Bachelor's Wallet ───────────────────────────────────
  {
    slug:  "bachelors-wallet",
    title: "Bachelor's Wallet",
    shortDescription:
      "A full stack mess and personal finance management application built for students living in shared accommodation.",
    description:
      "Bachelor's Wallet is a full stack web application that helps students living in shared accommodation (mess) " +
      "track daily meals, split shared expenses, manage individual finances, and generate monthly bills automatically. " +
      "The application supports two roles — Manager and Member — with different levels of access and functionality.",
    category:     "fullstack",
    status:       "live",
    technologies: [
      "React",
      "React Router",
      "Tailwind CSS",
      "Recharts",
      "Vite",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "JWT",
      "bcryptjs",
      "Socket.io",
      "Cloudinary",
      "Vercel",
    ],
    year:     2025,
    featured: true,
    order:    1,

    coverImage: "/images/projects/bachelors-wallet/cover.jpg",
    // Add screenshots to: public/images/projects/bachelors-wallet/
    // Then populate the images array:
    // images: [
    //   {
    //     src:     "/images/projects/bachelors-wallet/dashboard.jpg",
    //     alt:     "Dashboard showing monthly expense summary and meal statistics",
    //     caption: "Dashboard overview",
    //   },
    // ],

    liveUrl:   "https://bachelors-wallet-client.vercel.app",
    githubUrl: "[PLACEHOLDER: https://github.com/username/bachelors-wallet]",

    targetUsers:
      "Students living in shared accommodation (mess) in Bangladesh who need to track " +
      "shared meal costs, split utility and grocery expenses, and manage their personal monthly finances.",

    purpose:
      "Built to solve the common problem of manually calculating shared mess expenses — " +
      "tracking who ate how many meals, dividing shared grocery and utility costs fairly, " +
      "and generating each member's monthly bill. The application replaces paper-based or spreadsheet tracking " +
      "with a structured digital system.",

    problem:
      "Students living together in a mess typically track shared expenses manually — in notebooks or " +
      "WhatsApp groups — which is error-prone and time-consuming. Calculating each member's monthly bill " +
      "requires counting individual meal counts, applying a meal rate formula, and adding shared cost splits. " +
      "This application automates that process.",

    goals: [
      "Automate the monthly mess bill calculation using a meal-rate formula",
      "Support both Manager and Member roles with appropriate access controls",
      "Track both shared mess expenses and individual personal finances in one place",
      "Provide a real-time chat feature so mess members can communicate within the application",
    ],

    solution:
      "A full stack web application with a React frontend and a Node.js/Express REST API backed by MongoDB. " +
      "The Manager role handles member management, meal entry, expense recording, and bill generation. " +
      "Members can view their own meal history, track personal income and expenses, and communicate via the " +
      "built-in real-time chat. Monthly bills are calculated server-side using the formula: " +
      "meal rate = total mess expenses ÷ total mess meals; individual bill = member's meals × meal rate + shared extras.",

    features: [
      {
        title:       "Role-based access control",
        description: "Two roles — Manager and Member — with separate navigation and protected routes. Managers have full access to all features; members see only their own data.",
      },
      {
        title:       "Daily meal tracking",
        description: "Managers can record breakfast, lunch, and dinner attendance for each member per day. Guest meals are also tracked. Each member has one record per day (enforced by a unique compound index).",
      },
      {
        title:       "Automated monthly bill generation",
        description: "Bills are generated server-side per member per month using the mess meal rate formula. Bills record total meals, meal rate, meal cost, shared extra costs, and payment status.",
      },
      {
        title:       "Expense management",
        description: "Tracks two types of expenses — mess (shared: bazar, utility, other) and personal (rent, food, transport, mobile, education, shopping). Personal expenses are linked to a specific member.",
      },
      {
        title:       "Income tracking",
        description: "Members can record personal income by source (tuition, family, freelance, etc.) per month, enabling a personal net balance view.",
      },
      {
        title:       "Budget planning",
        description: "Managers can set a monthly total budget with per-category limits, providing a spending baseline for the mess.",
      },
      {
        title:       "Real-time group chat",
        description: "Built with Socket.io. Members and managers can send messages and see who is currently online within the mess.",
      },
      {
        title:       "Notice board",
        description: "Managers can post notices (general, info, warning, urgent) for all mess members. Notices can be pinned.",
      },
      {
        title:       "Settlement tracking",
        description: "Records financial settlements between members to clear outstanding balances.",
      },
      {
        title:       "Dashboard with charts",
        description: "Overview page showing monthly expense summaries and meal statistics, visualised with Recharts.",
      },
      {
        title:       "Onboarding wizard",
        description: "First-time Manager users are guided through an onboarding flow to set up their mess configuration.",
      },
      {
        title:       "Profile with avatar upload",
        description: "Users can upload a profile photo, stored via Cloudinary.",
      },
      {
        title:       "Invite link system",
        description: "Managers can generate a token-based invite link for new members to join the mess.",
      },
      {
        title:       "Dark mode",
        description: "Application-wide dark/light mode toggle with a custom theme context.",
      },
    ],

    architecture:
      "The application is split into a React single-page application (frontend) and an Express REST API (backend). " +
      "The frontend uses React Router v6 for client-side routing with a protected layout that renders " +
      "role-appropriate navigation. State is managed through React Context (AuthContext, MessContext, " +
      "SettingsContext, SocketContext). The backend is a Node.js/Express server structured around " +
      "controllers, routes, models, and middleware. MongoDB is the database, accessed via Mongoose ODM. " +
      "Real-time features use Socket.io on both client and server.",

    architectureBreakdown: {
      frontend:
        "React 18 with React Router v6. Tailwind CSS v3 for styling. " +
        "Recharts for data visualisation. Axios for HTTP requests. " +
        "Socket.io-client for real-time features. jsPDF for PDF export. " +
        "Built and bundled with Vite.",
      backend:
        "Node.js with Express.js, structured into routes, controllers, models, and middleware. " +
        "17 route modules: auth, members, meals, expenses, income, bills, budget, " +
        "settlement, notices, rooms, mess, prediction, settings, chat, invite, insights, and email.",
      database:
        "MongoDB Atlas (cloud-hosted). Mongoose ODM with 12 defined schemas: " +
        "User, Member, Mess, Meal, Expense, Income, MonthlyBill, Budget, Notice, Room, Message, Settings. " +
        "Compound indexes on performance-critical queries (e.g. Meal: memberId + date unique constraint).",
      auth:
        "JWT-based authentication with bcryptjs password hashing (cost factor 12). " +
        "Tokens verified via a protect middleware applied to all private routes. " +
        "Role-based access via a managerOnly middleware. " +
        "Separate rate limiter on auth endpoints (20 requests / 15 min). " +
        "Security question / password reset flow implemented.",
      deployment:
        "Frontend deployed to Vercel with a vercel.json SPA rewrite rule. " +
        "Backend deployed separately. MongoDB hosted on MongoDB Atlas.",
      externalServices: [
        "MongoDB Atlas — managed cloud database",
        "Cloudinary — profile photo storage and delivery",
        "Socket.io — real-time WebSocket communication",
      ],
      security:
        "Helmet sets secure HTTP response headers. " +
        "express-rate-limit restricts API requests to 200/15 min globally and 20/15 min on auth endpoints. " +
        "express-mongo-sanitize strips NoSQL injection operators from request bodies. " +
        "Passwords are hashed with bcryptjs at cost factor 12. " +
        "JWT tokens are verified on every protected route via the protect middleware. " +
        "Role-based authorization (managerOnly middleware) returns 403 for unauthorized role access. " +
        "JSON body size is limited to 10kb to reduce payload attack surface.",
    },

    challenges: [
      {
        title:      "Designing the meal rate formula and bill generation",
        challenge:
          "The monthly bill calculation requires accuracy: total mess expenses divided by total mess meals " +
          "gives the per-meal rate; each member's bill is their meal count multiplied by that rate plus " +
          "a share of extra costs. Handling edge cases (zero meals in a month = division by zero) " +
          "and ensuring bill generation is idempotent required careful server-side logic.",
        resolution:
          "Bill generation is handled server-side. The endpoint calculates the meal rate with a zero-meal guard, " +
          "and a unique compound index (month + memberId) on the MonthlyBill collection prevents duplicate bill records.",
      },
      {
        title:      "Role-based routing and access control",
        challenge:
          "The application has two user roles with significantly different feature sets. " +
          "Manager-only routes needed protection both on the client (navigation visibility) " +
          "and server (API authorization).",
        resolution:
          "Client-side: ProtectedLayout renders separate navigation arrays based on the isManager flag " +
          "from AuthContext and conditionally renders manager-only routes. " +
          "Server-side: a managerOnly middleware returns 403 for non-manager requests on protected endpoints.",
      },
      {
        title:      "Real-time presence and group chat",
        challenge:
          "Adding real-time features (online user presence and group chat) while keeping the architecture manageable.",
        resolution:
          "Socket.io is configured on the Express HTTP server and exposed globally via global.io. " +
          "An in-memory Map tracks online users per socket connection. " +
          "The React client connects via SocketContext and listens for chat:message and users:online events.",
      },
    ],

    technicalDecisions: [
      {
        decision:     "MongoDB with Mongoose over a relational database",
        alternatives: ["PostgreSQL with Prisma"],
        rationale:
          "The application data (expenses, meals, notices, messages) is document-oriented and does not " +
          "require complex relational joins. MongoDB's flexible schema suited the varied expense categories " +
          "and the evolving data model during development.",
      },
      {
        decision:     "JWT stored as a Bearer token in the Authorization header",
        alternatives: ["httpOnly cookie-based sessions"],
        rationale:
          "Stateless JWT authentication suited the separated frontend/backend deployment. " +
          "The token is stored client-side and sent as a Bearer header on each API request.",
      },
      {
        decision:     "React Context API for global state management",
        alternatives: ["Redux Toolkit", "Zustand"],
        rationale:
          "The application's global state (auth user, mess config, socket connection, settings) is well-defined " +
          "and not deeply nested. Context API handled these requirements without the overhead of a dedicated library.",
      },
      {
        decision:     "Vite as the frontend build tool",
        alternatives: ["Create React App"],
        rationale:
          "Vite provides faster hot module replacement during development and a faster production build " +
          "compared to webpack-based CRA.",
      },
    ],

    results: [
      {
        description:
          "The application implements the full mess management workflow from member onboarding " +
          "through daily meal tracking to automated monthly bill generation. " +
          "The frontend is deployed at https://bachelors-wallet-client.vercel.app.",
      },
    ],

    lessonsLearned:
      "Building a full stack application end-to-end — including JWT authentication, role-based access, " +
      "real-time features with Socket.io, and file uploads via Cloudinary — gave me a concrete understanding " +
      "of how the layers of a web stack fit together. Designing the MongoDB schemas carefully upfront " +
      "(especially the compound index on Meal to enforce one record per member per day) prevented data integrity " +
      "problems later. If I rebuilt this, I would apply input validation middleware more systematically from " +
      "the start rather than adding it incrementally, and I would separate the prediction/AI routes into " +
      "a cleaner service layer.",
  },

  // ── Project 2: FeedHope ───────────────────────────────────────────
  {
    slug:  "feedhope",
    title: "FeedHope",
    shortDescription:
      "A MERN-stack food-sharing web application that connects people with surplus food to those who need it.",
    description:
      "FeedHope is a full stack web application built to reduce food waste by enabling individuals " +
      "to list surplus food for pickup and allowing others to request available items. " +
      "The application includes Firebase-based authentication, a React frontend, " +
      "and a Node.js/Express REST API backed by MongoDB Atlas.",
    category:     "fullstack",
    status:       "in-progress",
    technologies: [
      "React",
      "React Router",
      "Tailwind CSS",
      "Firebase",
      "Vite",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Axios",
      "React Hook Form",
      "Framer Motion",
    ],
    year:     2025,
    featured: true,
    order:    2,

    coverImage: "/images/projects/feedhope/cover.jpg",
    // Add screenshots to: public/images/projects/feedhope/
    // Then populate images array:
    // images: [
    //   {
    //     src:     "/images/projects/feedhope/available-foods.jpg",
    //     alt:     "Available foods listing page showing food cards with pickup location and expiry",
    //     caption: "Available Foods page",
    //   },
    //   {
    //     src:     "/images/projects/feedhope/add-food.jpg",
    //     alt:     "Add food donation form with fields for food name, quantity, pickup location, and expiry",
    //     caption: "Add Food form",
    //   },
    // ],

    githubUrl: "[PLACEHOLDER: https://github.com/username/feedhope]",
    liveUrl:   "[PLACEHOLDER: https://feedhope.vercel.app]",

    targetUsers:
      "Individuals with surplus food who want to donate it locally, " +
      "and people looking for available food items nearby.",

    purpose:
      "Built to reduce household and community food waste by creating a simple platform " +
      "where anyone can list surplus food and anyone in the community can request it. " +
      "The project also served as a practical exercise in building a full MERN-stack " +
      "application with Firebase authentication.",

    problem:
      "Surplus food — from events, households, or restaurants — often goes to waste " +
      "because there is no simple way to connect donors with people who could use it. " +
      "FeedHope addresses this by providing a structured listing and request system " +
      "accessible to anyone with an account.",

    goals: [
      "Allow authenticated users to list surplus food with pickup details and expiry information",
      "Display available food listings to all visitors with donor information",
      "Protect donation management routes behind Firebase authentication",
      "Build a working full stack application using the MERN stack with Firebase auth",
    ],

    solution:
      "A React single-page application fetches food listings from a Node.js/Express REST API " +
      "connected to MongoDB Atlas. Firebase handles user authentication (email/password and Google sign-in). " +
      "Authenticated users can add food donations and access their personal dashboard routes. " +
      "Public visitors can browse all available food listings without logging in.",

    features: [
      {
        title:       "Food donation listings",
        description: "Authenticated users can submit a food item for donation with a name, image URL, quantity, pickup location, expiry date/time, and optional preservation notes. The donator's name and email are automatically attached from the Firebase auth session.",
      },
      {
        title:       "Available foods browse page",
        description: "Public page displaying all food listings fetched from the API. Each card shows the food image, name, quantity badge, pickup location, expiry time, donator profile, and a link to the detail page.",
      },
      {
        title:       "Firebase authentication",
        description: "Email/password registration with client-side validation (minimum 6 characters, uppercase and lowercase requirements). Google sign-in via Firebase popup. Session persisted via Firebase's onAuthStateChanged listener.",
      },
      {
        title:       "Protected dashboard routes",
        description: "Add Food, Manage Foods, and My Requests routes are wrapped in a PrivateRoute component that redirects unauthenticated users to the login page, preserving the intended destination in router state.",
      },
      {
        title:       "Food request system (architecture in place)",
        description: "The server has a /requests API endpoint supporting POST (create request), GET by foodId, and PATCH (update status). The My Requests page is scaffolded and ready to be connected to this endpoint.",
      },
    ],

    architecture:
      "The frontend is a React SPA built with Vite, using React Router v7 for client-side routing. " +
      "Global authentication state is managed by an AuthProvider using React Context and Firebase's onAuthStateChanged. " +
      "The backend is a Node.js/Express server exposing a REST API for foods and food requests. " +
      "MongoDB Atlas is used as the cloud database, accessed via the native MongoDB Node.js driver (no ORM). " +
      "The two collections are 'foods' and 'foodRequests'.",

    architectureBreakdown: {
      frontend:
        "React 19 with React Router v7. Tailwind CSS v4 for styling. " +
        "Vite 8 for bundling. Axios for HTTP requests. " +
        "React Hook Form for form validation. Framer Motion for UI animations.",
      backend:
        "Node.js with Express 5. Single-file server (index.js) with REST endpoints for " +
        "foods (GET all, GET by id, POST, PATCH, DELETE) and food requests (POST, GET by foodId, PATCH status).",
      database:
        "MongoDB Atlas (cloud-hosted) accessed via the MongoDB Node.js native driver. " +
        "Two collections: 'foods' (food listings) and 'foodRequests' (pickup requests). " +
        "ObjectId validation guard prevents invalid hex ID errors.",
      auth:
        "Firebase Authentication handles all auth flows: email/password sign-in and registration, " +
        "Google OAuth via signInWithPopup, and session management via onAuthStateChanged. " +
        "Client-side PrivateRoute component redirects unauthenticated users with state preservation.",
      deployment:
        "[PLACEHOLDER: not yet deployed — no deployment configuration found in the codebase]",
      externalServices: [
        "Firebase Authentication — user identity and session management",
        "MongoDB Atlas — managed cloud database",
      ],
    },

    challenges: [
      {
        title:      "Duplicate key errors on MongoDB inserts",
        challenge:
          "POST requests to /foods were occasionally failing with a duplicate key error " +
          "when the client-side form accidentally sent an _id field in the request body " +
          "(either an empty string or the string 'undefined').",
        resolution:
          "Added a guard in both the POST /foods and POST /requests handlers to delete any " +
          "_id property from the request body before passing it to insertOne(). " +
          "This forces MongoDB to generate a clean ObjectId for every insert.",
      },
      {
        title:      "ObjectId validation for route parameters",
        challenge:
          "Using an invalid or malformed string as a MongoDB ObjectId throws a BSONTypeError " +
          "that caused unhandled 500 errors on routes like GET /foods/:id.",
        resolution:
          "Extracted a getValidObjectId helper function that calls ObjectId.isValid() and " +
          "returns a 400 error response immediately if the id is invalid, before any database query runs.",
      },
    ],

    technicalDecisions: [
      {
        decision:     "Firebase Authentication over a custom JWT implementation",
        alternatives: ["Custom JWT with bcrypt password hashing on the server"],
        rationale:
          "Firebase handles session persistence, token refresh, OAuth providers (Google), " +
          "and client-side state management out of the box. For a project at this scale, " +
          "it significantly reduces the auth-related server code needed.",
      },
      {
        decision:     "MongoDB native driver over Mongoose ODM",
        alternatives: ["Mongoose ODM"],
        rationale:
          "The data model is simple (two collections, no complex relationships or middleware hooks). " +
          "The native driver was sufficient and avoids the schema definition overhead that Mongoose adds.",
      },
      {
        decision:     "Vite over Create React App",
        alternatives: ["Create React App"],
        rationale:
          "Vite provides faster development server startup and hot module replacement, " +
          "and is the current standard for new React projects.",
      },
    ],

    results: [
      {
        description:
          "The core infrastructure is implemented: Firebase authentication works end-to-end " +
          "(email/password and Google sign-in), food donations can be submitted and listed, " +
          "and the REST API handles CRUD operations for foods and requests. " +
          "Several dashboard pages (Manage Foods, My Requests, Food Details) are scaffolded " +
          "but not yet fully connected to the API — this is a project in active development.",
      },
    ],

    lessonsLearned:
      "Integrating Firebase Authentication with a separate Node.js backend introduced a question " +
      "I hadn't considered before: the server README mentions Firebase token verification middleware, " +
      "but the current implementation does not verify Firebase ID tokens server-side on protected routes. " +
      "This is something I would add before deploying — validating the Firebase token on the server " +
      "ensures that API routes cannot be called by unauthenticated requests even if the client-side " +
      "route guard is bypassed. " +
      "Working with the native MongoDB driver (without Mongoose) also gave me a clearer understanding " +
      "of how document queries and ObjectId handling work at a lower level.",
  },
];
