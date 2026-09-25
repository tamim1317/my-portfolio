import Image from "next/image";
import Link from "next/link";
import { Mail, ExternalLink, ArrowUpRight } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { siteConfig, isConfigured } from "@/lib/site";
import { Container } from "./container";
import { Separator } from "@/components/ui/separator";

const footerNav = [
  {
    label: "Work",
    links: [
      { label: "Projects", href: "/projects" },
      { label: "Resume",   href: siteConfig.resumeUrl },
    ],
  },
  {
    label: "Connect",
    links: [
      { label: "About",   href: "/about"   },
      { label: "Contact", href: "/contact" },
      ...(isConfigured(siteConfig.social.github)
        ? [{ label: "GitHub",   href: siteConfig.social.github,   external: true }]
        : []),
      ...(isConfigured(siteConfig.social.linkedin)
        ? [{ label: "LinkedIn", href: siteConfig.social.linkedin, external: true }]
        : []),
    ],
  },
] as const;

type SocialIcon = {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; "aria-hidden"?: boolean | "true" | "false" }>;
};

function buildSocialIcons(): SocialIcon[] {
  const icons: SocialIcon[] = [];
  if (isConfigured(siteConfig.social.github))
    icons.push({ label: "GitHub", href: siteConfig.social.github, icon: GitHubIcon });
  if (isConfigured(siteConfig.social.linkedin))
    icons.push({ label: "LinkedIn", href: siteConfig.social.linkedin, icon: LinkedInIcon });
  if (isConfigured(siteConfig.email))
    icons.push({ label: "Email", href: `mailto:${siteConfig.email}`, icon: Mail });
  return icons;
}

const currentYear = new Date().getFullYear();

/**
 * Keep this in sync with the flag in components/sections/hero-section.tsx
 * and components/layout/header.tsx.
 */
const HAS_PROFILE_PHOTO = true;

export function Footer() {
  const socialIcons = buildSocialIcons();

  return (
    <footer
      className="relative border-t border-border/60 overflow-hidden"
      role="contentinfo"
    >
      {/* Soft ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-1/4 h-[360px] w-[360px] rounded-full opacity-[0.07] blur-[120px]"
        style={{ background: "var(--primary)" }}
      />

      <Container className="relative">
        <div className="py-14 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">

          {/* Brand */}
          <div className="flex flex-col gap-5 lg:col-span-2">
            <Link
              href="/"
              aria-label={`${siteConfig.name} — Home`}
              className="group inline-flex items-center gap-2.5 w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-lg"
            >
              {HAS_PROFILE_PHOTO ? (
                <span
                  className={cn(
                    "relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full",
                    "ring-1 ring-border/80",
                    "shadow-sm transition-all duration-300 ease-out",
                    "group-hover:scale-105 group-hover:shadow-md"
                  )}
                >
                  <Image
                    src="/images/profile.jpg"
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </span>
              ) : (
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg",
                    "bg-primary text-primary-foreground",
                    "text-[12px] font-medium select-none",
                    "shadow-sm transition-all duration-300 ease-out",
                    "group-hover:-rotate-6 group-hover:scale-105 group-hover:shadow-md"
                  )}
                  style={{ fontFamily: "var(--font-display, serif)" }}
                >
                  TH
                </span>
              )}
              <span className="text-[14px] font-medium tracking-tight text-foreground">
                {siteConfig.shortName} Hossain
              </span>
            </Link>

            <p className="max-w-xs text-[13px] leading-relaxed text-muted-foreground">
              {siteConfig.role} from {siteConfig.location}.
              Building thoughtful digital experiences with React and Next.js.
            </p>

            {socialIcons.length > 0 && (
              <div className="flex items-center gap-1" role="list">
                {socialIcons.map(({ label, href, icon: Icon }) => (
                  <div key={label} role="listitem">
                    <a
                      href={href}
                      aria-label={`${label} (opens in new tab)`}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className={cn(
                        "inline-flex h-9 w-9 items-center justify-center rounded-lg",
                        "text-muted-foreground hover:bg-accent hover:text-foreground hover:-translate-y-[1px]",
                        "transition-all duration-200 ease-out",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      )}
                    >
                      <Icon size={15} aria-hidden="true" />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Nav columns */}
          {footerNav.map((group) => (
            <div key={group.label} className="flex flex-col gap-3.5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {group.label}
              </p>
              <ul className="flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={"external" in link && link.external ? "_blank" : undefined}
                      rel={"external" in link && link.external ? "noopener noreferrer" : undefined}
                      className={cn(
                        "link-underline inline-flex items-center gap-1 text-[13px] text-muted-foreground",
                        "hover:text-foreground",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:rounded-sm"
                      )}
                    >
                      {link.label}
                      {"external" in link && link.external && (
                        <ExternalLink size={11} aria-hidden="true" className="opacity-50" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* CTA Card */}
          <div className="sm:col-span-2 lg:col-span-4">
            <div
              className={cn(
                "card-hover relative overflow-hidden rounded-2xl border border-border/70 p-6 sm:p-8",
                "flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between",
                "shadow-sm hover:shadow-card-hover"
              )}
              style={{
                background:
                  "linear-gradient(120deg, color-mix(in oklch, var(--primary) 12%, var(--card)) 0%, var(--card) 50%, color-mix(in oklch, var(--warm) 10%, var(--card)) 100%)",
              }}
            >
              {/* Subtle rotating glow, echoing the Hero photo card */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-1 opacity-40 blur-2xl"
                style={{
                  background:
                    "conic-gradient(from 140deg, var(--primary), transparent 35%, var(--warm), transparent 80%, var(--primary))",
                  animation: "spin-slow 26s linear infinite",
                }}
              />

              <div className="relative max-w-md">
                <p className="text-lg font-medium tracking-tight text-foreground">
                  Let&apos;s build something careful.
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                  Open to remote junior and full-stack roles. Have a project in mind? I&apos;d love to hear about it.
                </p>
              </div>

              <Link
                href="/contact"
                className={cn(
                  "group relative inline-flex shrink-0 items-center justify-center gap-1.5",
                  "h-10 px-5 rounded-full text-[13px] font-semibold",
                  "bg-primary text-primary-foreground",
                  "shadow-sm hover:shadow-md",
                  "hover:bg-primary/90 hover:-translate-y-[1px]",
                  "transition-all duration-200 ease-out",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                )}
              >
                Get in touch
                <ArrowUpRight
                  size={13}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </div>
        </div>

        <Separator className="opacity-60" />

        <div className="py-5 flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] text-muted-foreground">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-[12px] text-muted-foreground">
            Built with Next.js &amp; Tailwind CSS
          </p>
        </div>
      </Container>
    </footer>
  );
}