import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { AboutSection } from "@/components/sections/about-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { siteConfig, isConfigured } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: siteConfig.metaTitle,
  description: siteConfig.metaDescription,
  alternates: {
    canonical: siteConfig.url,
  },
};

const heroSocialLinks = [
  { label: "GitHub",   href: siteConfig.social.github,              Icon: GitHubIcon  },
  { label: "LinkedIn", href: siteConfig.social.linkedin,            Icon: LinkedInIcon },
  { label: "Email",    href: `mailto:${siteConfig.email}`,          Icon: Mail         },
] as const;

export default function Home() {
  return (
    <>
      <Header />

      <main id="main-content">
        {/* ── HERO ── */}
        <Section
          id="hero"
          aria-labelledby="hero-heading"
          className="relative overflow-hidden border-b border-border"
          spacing="default"
        >
          {/* Subtle dot grid — purely decorative */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "radial-gradient(var(--border) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          <Container className="relative">
            <div className="max-w-2xl flex flex-col gap-7">

              {/* Availability pill */}
              {siteConfig.availableForWork && (
                <div className="flex items-center gap-2 w-fit">
                  <span
                    aria-hidden="true"
                    className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0"
                  />
                  <span className="text-eyebrow text-muted-foreground tracking-widest">
                    {siteConfig.availabilityBadge}
                  </span>
                </div>
              )}

              {/* Name + role */}
              <div className="flex flex-col gap-2">
                <h1
                  id="hero-heading"
                  className="text-display-2xl text-foreground"
                >
                  {siteConfig.name}
                </h1>
                <p className="text-display-lg text-muted-foreground font-normal">
                  {siteConfig.role}
                </p>
              </div>

              {/* Bio */}
              <p className="text-body-lg text-muted-foreground leading-relaxed max-w-lg">
                {siteConfig.heroBio}
              </p>

              {/* Location */}
              <div className="flex items-center gap-1.5 text-body-sm text-muted-foreground">
                <MapPin size={13} className="shrink-0" aria-hidden="true" />
                <span>{siteConfig.location} &mdash; {siteConfig.locationNote}</span>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 pt-1">
                <a
                  href="#projects"
                  className={cn(
                    "inline-flex items-center gap-2",
                    "h-10 px-5 rounded-lg text-sm font-semibold",
                    "bg-primary text-primary-foreground",
                    "hover:bg-primary/90 active:scale-[0.98]",
                    "transition-colors duration-[120ms]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  )}
                >
                  View My Work
                  <ArrowRight size={15} aria-hidden="true" />
                </a>
                <Link
                  href={siteConfig.resumeUrl}
                  className={cn(
                    "inline-flex items-center gap-2",
                    "h-10 px-5 rounded-lg text-sm font-medium",
                    "border border-border bg-transparent text-foreground",
                    "hover:bg-accent hover:text-accent-foreground hover:border-transparent",
                    "active:scale-[0.98]",
                    "transition-colors duration-[120ms]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  )}
                >
                  View Resume
                </Link>
              </div>

              {/* Social links — only rendered when configured */}
              <div className="flex items-center gap-1 pt-1" role="list" aria-label="Social links">
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
                          "inline-flex items-center justify-center h-9 w-9 rounded-lg",
                          "text-muted-foreground hover:text-foreground hover:bg-accent",
                          "transition-colors duration-[120ms]",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        )}
                      >
                        <Icon size={16} aria-hidden="true" />
                      </a>
                    </div>
                  ))}
              </div>
            </div>
          </Container>
        </Section>

        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
      </main>

      <Footer />
    </>
  );
}
