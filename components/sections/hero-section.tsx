import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { siteConfig, isConfigured } from "@/lib/site";
import { getAllProjects } from "@/lib/projects";
import { cn } from "@/lib/utils";

/**
 * To use a real photo instead of the initials placeholder:
 * 1. Add your photo to /public/images/profile.jpg (square or portrait, ≥ 800px)
 * 2. Set HAS_PROFILE_PHOTO to true below
 */
const HAS_PROFILE_PHOTO = true;

const heroSocialLinks = [
  { label: "GitHub", href: siteConfig.social.github, Icon: GitHubIcon },
  { label: "LinkedIn", href: siteConfig.social.linkedin, Icon: LinkedInIcon },
  { label: "Email", href: `mailto:${siteConfig.email}`, Icon: Mail },
] as const;

const stack = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "MongoDB",
  "Tailwind CSS",
  "Express",
];

export function HeroSection() {
  const projectCount = getAllProjects().length;

  return (
    <Section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden border-b border-border"
      spacing="none"
    >
      {/* Subtle background texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(color-mix(in oklch, var(--border) 70%, transparent) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 75% 65% at 50% 15%, black 15%, transparent 70%)",
        }}
      />

      {/* Soft ambient glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-[8%] h-[480px] w-[480px] rounded-full opacity-[0.18] blur-[130px]"
        style={{
          background: "var(--glow)",
          animation: "mesh-drift 22s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[12%] right-[4%] h-[340px] w-[340px] rounded-full opacity-[0.14] blur-[110px]"
        style={{
          background: "var(--warm)",
          animation: "mesh-drift 28s ease-in-out infinite reverse",
        }}
      />

      <Container className="relative">
        <div className="grid min-h-[min(90svh,52rem)] grid-cols-1 items-center gap-14 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20 lg:py-24">
          
          {/* Left Content */}
          <div className="flex max-w-xl flex-col gap-8">
            {siteConfig.availableForWork && (
              <div
                className={cn(
                  "flex w-fit items-center gap-2.5 rounded-full border border-border/80 bg-background/60 px-4 py-1.5 backdrop-blur-sm",
                  "animate-[fade-in-up_0.5s_ease-out]"
                )}
              >
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 animate-pulse"
                />
                <span className="text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
                  {siteConfig.availabilityBadge}
                </span>
              </div>
            )}

            <div className="flex flex-col gap-5 animate-[fade-in-up_0.5s_ease-out_0.05s_both]">
              <p className="text-[13px] font-medium tracking-[0.12em] text-primary uppercase">
                Hello, I&apos;m
              </p>
              
              <h1
                id="hero-heading"
                className="text-[clamp(2.75rem,6vw,4.25rem)] font-medium leading-[1.05] tracking-tight text-balance"
              >
                <span className="text-gradient">Md Tamim</span>
                <br />
                <span className="italic text-foreground/90">Hossain</span>
              </h1>

              <p className="text-lg font-medium tracking-tight text-muted-foreground sm:text-xl">
                {siteConfig.role}
              </p>
            </div>

            <p className="max-w-md text-[15px] leading-relaxed text-muted-foreground/90 animate-[fade-in-up_0.5s_ease-out_0.1s_both]">
              {siteConfig.heroBio}
            </p>

            <div className="flex items-center gap-2 text-sm text-muted-foreground animate-[fade-in-up_0.5s_ease-out_0.15s_both]">
              <MapPin size={14} className="shrink-0 opacity-70" aria-hidden="true" />
              <span>
                {siteConfig.location} — {siteConfig.locationNote}
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1 animate-[fade-in-up_0.5s_ease-out_0.2s_both]">
              <a
                href="#projects"
                className={cn(
                  "group inline-flex h-11 items-center gap-2 rounded-full px-6 text-sm font-medium",
                  "bg-primary text-primary-foreground",
                  "hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20",
                  "active:scale-[0.98]",
                  "transition-all duration-200 ease-out",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                )}
              >
                View my work
                <ArrowRight
                  size={15}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </a>

              <Link
                href={siteConfig.resumeUrl}
                className={cn(
                  "inline-flex h-11 items-center gap-2 rounded-full border border-border/80 bg-transparent px-6 text-sm font-medium text-foreground",
                  "hover:border-border hover:bg-accent/50",
                  "active:scale-[0.98]",
                  "transition-all duration-200 ease-out",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                )}
              >
                View resume
              </Link>
            </div>

            {/* Social Links */}
            <div
              className="flex items-center gap-1 pt-1 animate-[fade-in-up_0.5s_ease-out_0.25s_both]"
              role="list"
              aria-label="Social links"
            >
              {heroSocialLinks
                .filter(({ href }) => isConfigured(href))
                .map(({ label, href, Icon }) => (
                  <div key={label} role="listitem">
                    <a
                      href={href}
                      aria-label={label}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className={cn(
                        "inline-flex h-10 w-10 items-center justify-center rounded-full",
                        "text-muted-foreground hover:bg-accent hover:text-foreground",
                        "transition-all duration-200 ease-out",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      )}
                    >
                      <Icon size={16} aria-hidden="true" />
                    </a>
                  </div>
                ))}
            </div>
          </div>

          {/* Right Card */}
          <div className="flex justify-center lg:justify-end animate-[fade-in-up_0.6s_ease-out_0.1s_both]">
            <div className="relative w-full max-w-[340px]">
              {/* Soft glow behind card */}
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-[2rem] opacity-60 blur-2xl"
                style={{
                  background:
                    "conic-gradient(from 210deg, var(--primary), transparent 40%, var(--warm), transparent 75%, var(--primary))",
                  animation: "spin-slow 22s linear infinite",
                }}
              />

              <div className="relative overflow-hidden rounded-[1.75rem] border border-border/60 bg-card/80 shadow-xl backdrop-blur-sm">
                <div className="relative aspect-[4/5] w-full">
                  {HAS_PROFILE_PHOTO ? (
                    <Image
                      src="/images/profile.jpg"
                      alt={siteConfig.name}
                      fill
                      sizes="(max-width: 1024px) 320px, 340px"
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div
                      className="flex h-full w-full flex-col items-center justify-center gap-5"
                      style={{
                        background:
                          "linear-gradient(165deg, color-mix(in oklch, var(--primary) 28%, var(--card)) 0%, var(--card) 50%, color-mix(in oklch, var(--warm) 18%, var(--card)) 100%)",
                      }}
                    >
                      <span
                        className="select-none text-7xl tracking-tight text-primary/90 sm:text-8xl"
                        style={{ fontFamily: "var(--font-display, serif)" }}
                      >
                        TH
                      </span>
                      <span className="px-5 text-center text-[11px] font-medium tracking-[0.22em] text-muted-foreground uppercase">
                        Full Stack · Mathematics
                      </span>
                    </div>
                  )}
                </div>

                {/* Stats bar */}
                <dl className="grid grid-cols-3 divide-x divide-border/60 border-t border-border/60 bg-card/50">
                  <div className="px-3 py-4 text-center">
                    <dt className="text-[10px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
                      Projects
                    </dt>
                    <dd className="mt-1.5 text-lg font-semibold tabular-nums tracking-tight text-foreground">
                      {projectCount.toString().padStart(2, "0")}
                    </dd>
                  </div>
                  <div className="px-3 py-4 text-center">
                    <dt className="text-[10px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
                      Focus
                    </dt>
                    <dd className="mt-1.5 text-sm font-semibold text-foreground">
                      Full Stack
                    </dd>
                  </div>
                  <div className="px-3 py-4 text-center">
                    <dt className="text-[10px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
                      Based
                    </dt>
                    <dd className="mt-1.5 text-sm font-semibold text-foreground">
                      BD · Remote
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Tech stack marquee */}
      <div className="relative border-t border-border/60 bg-card/30">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent"
        />
        <div className="overflow-hidden py-3.5" aria-hidden="true">
          <div className="marquee-track gap-10 px-8">
            {[...stack, ...stack].map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="flex shrink-0 items-center gap-10 text-[11px] font-medium tracking-[0.2em] text-muted-foreground/80 uppercase"
              >
                {item}
                <span className="h-1 w-1 rounded-full bg-primary/40" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}